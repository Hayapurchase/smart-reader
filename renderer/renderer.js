const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Import PDF.js
let pdfjsLib;

// DOM elements
const openFileBtn = document.getElementById('open-file-btn');
const openFileEmpty = document.getElementById('open-file-empty');
const openSampleFile = document.getElementById('open-sample-file');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const fileName = document.getElementById('file-name');
const emptyState = document.getElementById('empty-state');
const contentArea = document.getElementById('content-area');
const contentContainer = document.getElementById('content-container');
const markdownContent = document.getElementById('markdown-content');
const loadingOverlay = document.getElementById('loading-overlay');

// Side panel elements
const sidePanel = document.getElementById('side-panel');
const sidePanelToggle = document.getElementById('side-panel-toggle');
const docTypeMarkdown = document.getElementById('doc-type-markdown');
const docTypePdf = document.getElementById('doc-type-pdf');

// PDF viewer elements
const markdownViewer = document.getElementById('markdown-viewer');
const pdfViewer = document.getElementById('pdf-viewer');
const pdfCanvas = document.getElementById('pdf-canvas');
const pdfCanvasContainer = document.getElementById('pdf-canvas-container');
const pdfPrevBtn = document.getElementById('pdf-prev');
const pdfNextBtn = document.getElementById('pdf-next');
const pdfPageInfo = document.getElementById('pdf-page-info');
const pdfZoomInBtn = document.getElementById('pdf-zoom-in');
const pdfZoomOutBtn = document.getElementById('pdf-zoom-out');
const pdfZoomLevel = document.getElementById('pdf-zoom-level');
const pdfFitWidthBtn = document.getElementById('pdf-fit-width');

// Settings elements
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const settingsClose = document.getElementById('settings-close');
const settingsSave = document.getElementById('settings-save');
const settingsReset = document.getElementById('settings-reset');

// Font controls
const fontDecrease = document.getElementById('font-decrease');
const fontIncrease = document.getElementById('font-increase');
const fontSizeDisplay = document.getElementById('font-size-display');

// Reading mode
const readingModeToggle = document.getElementById('reading-mode-toggle');

// Settings form elements
const themeSelect = document.getElementById('theme-select');
const fontFamilySelect = document.getElementById('font-family-select');
const readingModeCheckbox = document.getElementById('reading-mode-checkbox');
const autoScrollCheckbox = document.getElementById('auto-scroll-checkbox');
const lineHeightSlider = document.getElementById('line-height-slider');
const lineHeightValue = document.getElementById('line-height-value');
const contentWidthSlider = document.getElementById('content-width-slider');
const contentWidthValue = document.getElementById('content-width-value');

// State
let currentFilePath = null;
let currentFileType = 'markdown';
let currentDocumentType = 'markdown';
let isDarkMode = false;
let currentFontSize = 100;
let isReadingMode = false;
let isFocusMode = false;
let isSidePanelOpen = false;
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let scale = 1.0;
let settings = {
    theme: 'auto',
    fontFamily: 'Inter',
    readingMode: false,
    autoScroll: true,
    lineHeight: 1.6,
    contentWidth: 800,
    fontSize: 100
};

// Initialize the application
document.addEventListener('DOMContentLoaded', async () => {
    await loadPDFJS();
    initializeApp();
    setupEventListeners();
    loadTheme();
});

// Load PDF.js dynamically
async function loadPDFJS() {
    try {
        console.log('Attempting to load PDF.js...');
        // Load PDF.js from node_modules
        const pdfjsModule = await import('../node_modules/pdfjs-dist/build/pdf.min.mjs');
        pdfjsLib = pdfjsModule;
        console.log('PDF.js loaded successfully:', pdfjsLib);
        
        // Test if PDF.js is properly loaded
        if (pdfjsLib.getDocument) {
            console.log('PDF.js getDocument function available');
        } else {
            console.warn('PDF.js getDocument function not found');
        }
    } catch (error) {
        console.error('Failed to load PDF.js:', error);
        // Fallback to global pdfjsLib if available
        if (typeof window.pdfjsLib !== 'undefined') {
            pdfjsLib = window.pdfjsLib;
            console.log('Using global PDF.js');
        } else {
            console.error('PDF.js library could not be loaded and no global fallback available');
            // Don't throw error, just log it - app should still work for markdown
        }
    }
}

function initializeApp() {
    // Configure marked options
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return hljs.highlight(code, { language: lang }).value;
                } catch (err) {
                    console.warn('Error highlighting code:', err);
                }
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true,
        tables: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
    });

    // Enable syntax highlighting
    hljs.highlightAll();
}

function setupEventListeners() {
    // File open buttons
    openFileBtn.addEventListener('click', openFile);
    openFileEmpty.addEventListener('click', openFile);
    openSampleFile.addEventListener('click', openSampleFileHandler);

    // Dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Font controls
    fontDecrease.addEventListener('click', decreaseFontSize);
    fontIncrease.addEventListener('click', increaseFontSize);

    // Reading mode
    readingModeToggle.addEventListener('click', toggleReadingMode);

    // Side panel controls
    sidePanelToggle.addEventListener('click', toggleSidePanel);
    docTypeMarkdown.addEventListener('click', () => switchDocumentType('markdown'));
    docTypePdf.addEventListener('click', () => switchDocumentType('pdf'));

    // PDF controls
    pdfPrevBtn.addEventListener('click', previousPage);
    pdfNextBtn.addEventListener('click', nextPage);
    pdfZoomInBtn.addEventListener('click', zoomIn);
    pdfZoomOutBtn.addEventListener('click', zoomOut);
    pdfFitWidthBtn.addEventListener('click', fitToWidth);

    // Settings
    settingsToggle.addEventListener('click', openSettings);
    settingsClose.addEventListener('click', closeSettings);
    settingsSave.addEventListener('click', saveSettings);
    settingsReset.addEventListener('click', resetSettings);

    // Settings form controls
    themeSelect.addEventListener('change', handleThemeChange);
    fontFamilySelect.addEventListener('change', handleFontFamilyChange);
    readingModeCheckbox.addEventListener('change', handleReadingModeChange);
    autoScrollCheckbox.addEventListener('change', handleAutoScrollChange);
    lineHeightSlider.addEventListener('input', handleLineHeightChange);
    contentWidthSlider.addEventListener('input', handleContentWidthChange);

    // Drag and drop
    document.addEventListener('dragover', handleDragOver);
    document.addEventListener('dragleave', handleDragLeave);
    document.addEventListener('drop', handleDrop);

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Click outside settings panel to close
    settingsPanel.addEventListener('click', (e) => {
        if (e.target === settingsPanel) {
            closeSettings();
        }
    });

    // Click outside side panel to close
    document.addEventListener('click', (e) => {
        if (isSidePanelOpen && !sidePanel.contains(e.target) && !sidePanelToggle.contains(e.target)) {
            closeSidePanel();
        }
    });

    // IPC listeners
    ipcRenderer.on('file-opened', handleFileOpened);
    ipcRenderer.on('toggle-dark-mode', toggleDarkMode);
}

function openFile() {
    ipcRenderer.invoke('open-file-dialog');
}

function handleFileOpened(event, data) {
    const { filePath, content, fileType } = data;
    currentFilePath = filePath;
    currentFileType = fileType || 'markdown';
    
    console.log('File opened:', { filePath, fileType, hasContent: !!content });
    
    // Update UI
    updateFileName(path.basename(filePath));
    
    if (fileType === 'pdf') {
        console.log('Switching to PDF mode');
        currentDocumentType = 'pdf';
        switchDocumentType('pdf');
        loadPDF(filePath);
    } else {
        console.log('Switching to Markdown mode');
        currentDocumentType = 'markdown';
        switchDocumentType('markdown');
        renderMarkdown(content);
    }
    
    showContent();
}

function renderMarkdown(content) {
    try {
        showLoading(true);
        
        // Parse markdown to HTML
        const html = marked.parse(content);
        
        // Update content
        markdownContent.innerHTML = html;
        
        // Re-highlight code blocks
        hljs.highlightAll();
        
        // Add fade-in animation
        markdownContent.classList.add('fade-in');
        
        setTimeout(() => {
            markdownContent.classList.remove('fade-in');
        }, 300);
        
    } catch (error) {
        console.error('Error rendering markdown:', error);
        showError('Failed to render markdown content');
    } finally {
        showLoading(false);
    }
}

function updateFileName(name) {
    fileName.textContent = name;
    fileName.classList.remove('hidden');
}

function showContent() {
    emptyState.classList.add('hidden');
    contentArea.classList.remove('hidden');
}

function showEmptyState() {
    emptyState.classList.remove('hidden');
    contentArea.classList.add('hidden');
    fileName.classList.add('hidden');
    currentFilePath = null;
    currentFileType = 'markdown';
    currentDocumentType = 'markdown';
}

// Side Panel Functions
function toggleSidePanel() {
    if (isSidePanelOpen) {
        closeSidePanel();
    } else {
        openSidePanel();
    }
}

function openSidePanel() {
    isSidePanelOpen = true;
    sidePanel.classList.remove('hidden');
    document.body.classList.add('side-panel-open');
    sidePanel.classList.add('side-panel-enter-active');
}

function closeSidePanel() {
    isSidePanelOpen = false;
    sidePanel.classList.add('side-panel-exit-active');
    setTimeout(() => {
        sidePanel.classList.add('hidden');
        document.body.classList.remove('side-panel-open');
        sidePanel.classList.remove('side-panel-enter-active', 'side-panel-exit-active');
    }, 300);
}

function switchDocumentType(type) {
    currentDocumentType = type;
    
    // Update button states
    docTypeMarkdown.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
    docTypeMarkdown.classList.add('text-gray-600', 'dark:text-gray-400');
    docTypePdf.classList.remove('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
    docTypePdf.classList.add('text-gray-600', 'dark:text-gray-400');
    
    if (type === 'markdown') {
        docTypeMarkdown.classList.remove('text-gray-600', 'dark:text-gray-400');
        docTypeMarkdown.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
        markdownViewer.classList.remove('hidden');
        pdfViewer.classList.add('hidden');
    } else if (type === 'pdf') {
        docTypePdf.classList.remove('text-gray-600', 'dark:text-gray-400');
        docTypePdf.classList.add('bg-blue-100', 'dark:bg-blue-900', 'text-blue-700', 'dark:text-blue-300');
        markdownViewer.classList.add('hidden');
        pdfViewer.classList.remove('hidden');
    }
}

// PDF Functions
async function loadPDF(filePath) {
    showLoading(true);
    
    try {
        // Configure PDF.js
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('PDF.js library not loaded. Please check the console for loading errors.');
        }
        
        // Set worker source
        if (pdfjsLib.GlobalWorkerOptions) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.min.mjs';
        }
        
        console.log('Loading PDF from:', filePath);
        
        // Get PDF data from main process
        const result = await ipcRenderer.invoke('get-pdf-data', filePath);
        
        if (!result.success) {
            throw new Error(result.error);
        }
        
        // Load PDF from ArrayBuffer
        const loadingTask = pdfjsLib.getDocument({
            data: result.data
        });
        
        const pdf = await loadingTask.promise;
        pdfDoc = pdf;
        totalPages = pdf.numPages;
        currentPage = 1;
        
        console.log('PDF loaded successfully:', totalPages, 'pages');
        updatePDFPageInfo();
        renderPDFPage(currentPage);
        showLoading(false);
        
    } catch (error) {
        console.error('Error loading PDF:', error);
        showError('Failed to load PDF: ' + error.message);
        showLoading(false);
        
        // Switch back to markdown mode if PDF fails to load
        currentDocumentType = 'markdown';
        switchDocumentType('markdown');
    }
}

function renderPDFPage(pageNum) {
    if (!pdfDoc) return;
    
    pdfDoc.getPage(pageNum).then(function(page) {
        const canvas = pdfCanvas;
        const ctx = canvas.getContext('2d');
        
        // Calculate viewport
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render page
        const renderContext = {
            canvasContext: ctx,
            viewport: viewport
        };
        
        const renderTask = page.render(renderContext);
        renderTask.promise.then(function() {
            updatePDFControls();
        });
    });
}

function updatePDFPageInfo() {
    pdfPageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function updatePDFControls() {
    pdfPrevBtn.disabled = currentPage <= 1;
    pdfNextBtn.disabled = currentPage >= totalPages;
    pdfZoomLevel.textContent = Math.round(scale * 100) + '%';
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPDFPage(currentPage);
        updatePDFPageInfo();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        renderPDFPage(currentPage);
        updatePDFPageInfo();
    }
}

function zoomIn() {
    scale += 0.25;
    renderPDFPage(currentPage);
}

function zoomOut() {
    if (scale > 0.25) {
        scale -= 0.25;
        renderPDFPage(currentPage);
    }
}

function fitToWidth() {
    if (!pdfDoc) return;
    
    pdfDoc.getPage(currentPage).then(function(page) {
        const canvas = pdfCanvas;
        const containerWidth = pdfCanvasContainer.clientWidth - 32; // Account for padding
        const viewport = page.getViewport({ scale: 1.0 });
        scale = containerWidth / viewport.width;
        renderPDFPage(currentPage);
    });
}

function showLoading(show) {
    if (show) {
        loadingOverlay.classList.remove('hidden');
    } else {
        loadingOverlay.classList.add('hidden');
    }
}

function showError(message) {
    // Create error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // Remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        document.body.classList.add('dark');
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    
    // Save theme preference
    localStorage.setItem('darkMode', isDarkMode);
    settings.theme = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('markdownReaderSettings', JSON.stringify(settings));
}

function loadTheme() {
    const savedSettings = localStorage.getItem('markdownReaderSettings');
    if (savedSettings) {
        settings = { ...settings, ...JSON.parse(savedSettings) };
    }
    
    // Check for legacy dark mode setting
    const legacyDarkMode = localStorage.getItem('darkMode');
    if (legacyDarkMode === 'true') {
        settings.theme = 'dark';
    }
    
    // Apply theme
    if (settings.theme === 'dark' || (settings.theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDarkMode = true;
        document.body.classList.add('dark');
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else {
        isDarkMode = false;
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
    
    // Apply other settings
    applySettings();
}

function applySettings() {
    // Apply font family
    document.body.style.fontFamily = settings.fontFamily;
    
    // Apply font size
    currentFontSize = settings.fontSize;
    updateFontSize();
    
    // Apply line height
    markdownContent.style.lineHeight = settings.lineHeight;
    
    // Apply content width
    contentContainer.style.maxWidth = settings.contentWidth + 'px';
    
    // Apply reading mode
    if (settings.readingMode) {
        document.body.classList.add('reading-mode');
    }
    
    // Update form values
    themeSelect.value = settings.theme;
    fontFamilySelect.value = settings.fontFamily;
    readingModeCheckbox.checked = settings.readingMode;
    autoScrollCheckbox.checked = settings.autoScroll;
    lineHeightSlider.value = settings.lineHeight;
    lineHeightValue.textContent = settings.lineHeight;
    contentWidthSlider.value = settings.contentWidth;
    contentWidthValue.textContent = settings.contentWidth + 'px';
}

// Font size controls
function decreaseFontSize() {
    if (currentFontSize > 50) {
        currentFontSize -= 10;
        updateFontSize();
    }
}

function increaseFontSize() {
    if (currentFontSize < 200) {
        currentFontSize += 10;
        updateFontSize();
    }
}

function updateFontSize() {
    const fontSize = currentFontSize / 100;
    markdownContent.style.fontSize = fontSize + 'rem';
    fontSizeDisplay.textContent = currentFontSize + '%';
    settings.fontSize = currentFontSize;
}

// Reading mode
function toggleReadingMode() {
    isReadingMode = !isReadingMode;
    if (isReadingMode) {
        document.body.classList.add('reading-mode');
        readingModeToggle.classList.add('bg-blue-100', 'dark:bg-blue-900');
    } else {
        document.body.classList.remove('reading-mode');
        readingModeToggle.classList.remove('bg-blue-100', 'dark:bg-blue-900');
    }
    settings.readingMode = isReadingMode;
}

// Settings panel
function openSettings() {
    settingsPanel.classList.remove('hidden');
    settingsPanel.classList.add('settings-panel-enter-active');
}

function closeSettings() {
    settingsPanel.classList.add('settings-panel-exit-active');
    setTimeout(() => {
        settingsPanel.classList.add('hidden');
        settingsPanel.classList.remove('settings-panel-enter-active', 'settings-panel-exit-active');
    }, 150);
}

function saveSettings() {
    settings.theme = themeSelect.value;
    settings.fontFamily = fontFamilySelect.value;
    settings.readingMode = readingModeCheckbox.checked;
    settings.autoScroll = autoScrollCheckbox.checked;
    settings.lineHeight = parseFloat(lineHeightSlider.value);
    settings.contentWidth = parseInt(contentWidthSlider.value);
    settings.fontSize = currentFontSize;
    
    localStorage.setItem('markdownReaderSettings', JSON.stringify(settings));
    applySettings();
    closeSettings();
    showNotification('Settings saved successfully!', 'success');
}

function resetSettings() {
    settings = {
        theme: 'auto',
        fontFamily: 'Inter',
        readingMode: false,
        autoScroll: true,
        lineHeight: 1.6,
        contentWidth: 800,
        fontSize: 100
    };
    applySettings();
    showNotification('Settings reset to defaults', 'info');
}

// Settings form handlers
function handleThemeChange() {
    const theme = themeSelect.value;
    if (theme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark');
        document.documentElement.classList.add('dark');
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
    } else if (theme === 'light') {
        isDarkMode = false;
        document.body.classList.remove('dark');
        document.documentElement.classList.remove('dark');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    } else if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            isDarkMode = true;
            document.body.classList.add('dark');
            document.documentElement.classList.add('dark');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
        } else {
            isDarkMode = false;
            document.body.classList.remove('dark');
            document.documentElement.classList.remove('dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
}

function handleFontFamilyChange() {
    const fontFamily = fontFamilySelect.value;
    document.body.style.fontFamily = fontFamily;
    markdownContent.style.fontFamily = fontFamily;
}

function handleReadingModeChange() {
    if (readingModeCheckbox.checked) {
        document.body.classList.add('reading-mode');
    } else {
        document.body.classList.remove('reading-mode');
    }
}

function handleAutoScrollChange() {
    // This will be used when opening files
}

function handleLineHeightChange() {
    const lineHeight = lineHeightSlider.value;
    lineHeightValue.textContent = lineHeight;
    markdownContent.style.lineHeight = lineHeight;
}

function handleContentWidthChange() {
    const width = contentWidthSlider.value;
    contentWidthValue.textContent = width + 'px';
    contentContainer.style.maxWidth = width + 'px';
}

// Sample file opener
function openSampleFileHandler() {
    const samplePath = path.join(__dirname, '..', 'docs', 'sample.md');
    fs.readFile(samplePath, 'utf-8', (err, content) => {
        if (err) {
            showError('Failed to open sample file: ' + err.message);
            return;
        }
        currentFilePath = samplePath;
        updateFileName('sample.md');
        renderMarkdown(content);
        showContent();
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!e.relatedTarget || !document.body.contains(e.relatedTarget)) {
        document.body.classList.remove('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        const filePath = file.path;
        const ext = path.extname(filePath).toLowerCase();
        
        if (ext === '.pdf') {
            // Handle PDF file
            currentFilePath = filePath;
            currentFileType = 'pdf';
            currentDocumentType = 'pdf';
            updateFileName(path.basename(filePath));
            loadPDF(filePath);
            switchDocumentType('pdf');
            showContent();
        } else if (ext.match(/\.(md|markdown|mdown|mkdn|mdx|mkd|mdwn|mdtxt|mdtext|text)$/)) {
            // Handle Markdown file
            fs.readFile(filePath, 'utf-8', (err, content) => {
                if (err) {
                    showError('Failed to read file: ' + err.message);
                    return;
                }
                
                currentFilePath = filePath;
                currentFileType = 'markdown';
                currentDocumentType = 'markdown';
                updateFileName(path.basename(filePath));
                renderMarkdown(content);
                switchDocumentType('markdown');
                showContent();
            });
        } else {
            showError('Please drop a supported file (.md, .markdown, .pdf)');
        }
    }
}

function handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + O - Open file
    if ((e.ctrlKey || e.metaKey) && e.key === 'o') {
        e.preventDefault();
        openFile();
    }
    
    // Ctrl/Cmd + D - Toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Ctrl/Cmd + , - Open settings
    if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        openSettings();
    }
    
    // Ctrl/Cmd + R - Toggle reading mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        toggleReadingMode();
    }
    
    // Ctrl/Cmd + Plus - Increase font size
    if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
        e.preventDefault();
        if (currentDocumentType === 'pdf') {
            zoomIn();
        } else {
            increaseFontSize();
        }
    }
    
    // Ctrl/Cmd + Minus - Decrease font size
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
        e.preventDefault();
        if (currentDocumentType === 'pdf') {
            zoomOut();
        } else {
            decreaseFontSize();
        }
    }
    
    // Ctrl/Cmd + 0 - Reset font size
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
        e.preventDefault();
        if (currentDocumentType === 'pdf') {
            scale = 1.0;
            renderPDFPage(currentPage);
        } else {
            currentFontSize = 100;
            updateFontSize();
        }
    }
    
    // PDF navigation shortcuts
    if (currentDocumentType === 'pdf') {
        // Left arrow - Previous page
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            previousPage();
        }
        
        // Right arrow - Next page
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextPage();
        }
        
        // Home - First page
        if (e.key === 'Home') {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage = 1;
                renderPDFPage(currentPage);
                updatePDFPageInfo();
            }
        }
        
        // End - Last page
        if (e.key === 'End') {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage = totalPages;
                renderPDFPage(currentPage);
                updatePDFPageInfo();
            }
        }
    }
    
    // Side panel toggle
    if (e.key === '\\' || ((e.ctrlKey || e.metaKey) && e.key === 'b')) {
        e.preventDefault();
        toggleSidePanel();
    }
    
    // F11 - Toggle fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        // This is handled by the main process
    }
    
    // Escape - Close any open modals/overlays
    if (e.key === 'Escape') {
        if (!settingsPanel.classList.contains('hidden')) {
            closeSettings();
        } else if (isSidePanelOpen) {
            closeSidePanel();
        } else {
            showLoading(false);
        }
    }
}

// File watching for live updates
let fileWatcher = null;

function startFileWatching(filePath) {
    if (fileWatcher) {
        fileWatcher.close();
    }
    
    fileWatcher = fs.watch(filePath, (eventType) => {
        if (eventType === 'change') {
            // Debounce file changes
            clearTimeout(fileWatcher.timeout);
            fileWatcher.timeout = setTimeout(() => {
                fs.readFile(filePath, 'utf-8', (err, content) => {
                    if (!err) {
                        renderMarkdown(content);
                    }
                });
            }, 500);
        }
    });
}

function stopFileWatching() {
    if (fileWatcher) {
        fileWatcher.close();
        fileWatcher = null;
    }
}

// Update file watching when a new file is opened
const originalHandleFileOpened = handleFileOpened;
handleFileOpened = function(event, data) {
    originalHandleFileOpened(event, data);
    if (currentFilePath) {
        startFileWatching(currentFilePath);
    }
};

// Clean up on window close
window.addEventListener('beforeunload', () => {
    stopFileWatching();
});

// Handle window focus to refresh content if file was modified externally
window.addEventListener('focus', () => {
    if (currentFilePath) {
        fs.stat(currentFilePath, (err, stats) => {
            if (!err && stats.mtime > (window.lastFileTime || 0)) {
                fs.readFile(currentFilePath, 'utf-8', (err, content) => {
                    if (!err) {
                        renderMarkdown(content);
                        window.lastFileTime = stats.mtime;
                    }
                });
            }
        });
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        renderMarkdown,
        toggleDarkMode,
        openFile,
        handleFileOpened
    };
}

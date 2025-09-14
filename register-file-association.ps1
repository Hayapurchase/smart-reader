# Register Smart Reader file associations
# Run as Administrator

Write-Host "Registering Smart Reader file associations..." -ForegroundColor Green

# Get the current directory
$appPath = Join-Path $PSScriptRoot "win-unpacked\Smart Reader.exe"

# Check if the executable exists
if (-not (Test-Path $appPath)) {
    Write-Host "Error: Smart Reader.exe not found at $appPath" -ForegroundColor Red
    Write-Host "Please build the application first using: npm run build:portable" -ForegroundColor Yellow
    exit 1
}

# File extensions to associate
$extensions = @(
    ".md",
    ".markdown", 
    ".mdown",
    ".mkdn",
    ".mdx",
    ".mkd",
    ".mdwn",
    ".mdtxt",
    ".mdtext",
    ".text",
    ".pdf"
)

try {
    # Create the main application key
    New-Item -Path "HKCU:\Software\Classes\SmartReader" -Force | Out-Null
    Set-ItemProperty -Path "HKCU:\Software\Classes\SmartReader" -Name "(Default)" -Value "Smart Reader Document"
    Set-ItemProperty -Path "HKCU:\Software\Classes\SmartReader" -Name "FriendlyTypeName" -Value "Smart Reader Document"

    # Set the icon
    New-Item -Path "HKCU:\Software\Classes\SmartReader\DefaultIcon" -Force | Out-Null
    Set-ItemProperty -Path "HKCU:\Software\Classes\SmartReader\DefaultIcon" -Name "(Default)" -Value "$appPath,0"

    # Set the open command
    New-Item -Path "HKCU:\Software\Classes\SmartReader\shell\open\command" -Force | Out-Null
    Set-ItemProperty -Path "HKCU:\Software\Classes\SmartReader\shell\open\command" -Name "(Default)" -Value "`"$appPath`" `"%1`""

    # Associate each file extension
    foreach ($ext in $extensions) {
        Write-Host "Associating $ext with Smart Reader..." -ForegroundColor Cyan
        
        # Set the file extension to use SmartReader
        Set-ItemProperty -Path "HKCU:\Software\Classes\$ext" -Name "(Default)" -Value "SmartReader"
        
        # Set content type based on extension
        if ($ext -eq ".pdf") {
            Set-ItemProperty -Path "HKCU:\Software\Classes\$ext" -Name "Content Type" -Value "application/pdf"
        } else {
            Set-ItemProperty -Path "HKCU:\Software\Classes\$ext" -Name "Content Type" -Value "text/markdown"
        }
    }

    Write-Host "File associations registered successfully!" -ForegroundColor Green
    Write-Host "You can now right-click on .md, .pdf, and other supported files to open them with Smart Reader." -ForegroundColor Yellow
    
    # Refresh the shell to update file associations
    Write-Host "Refreshing Windows Explorer..." -ForegroundColor Cyan
    $null = [System.Runtime.InteropServices.Marshal]::GetActiveObject("Shell.Application")
    
} catch {
    Write-Host "Error registering file associations: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please run this script as Administrator" -ForegroundColor Yellow
    exit 1
}

Write-Host "File association setup complete!" -ForegroundColor Green

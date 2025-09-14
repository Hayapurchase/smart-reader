# Setting up Smart Reader on GitHub

Follow these steps to set up your Smart Reader project as a GitHub repository:

## 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `smart-reader`
   - **Description**: `A smart desktop application for reading Markdown and PDF files`
   - **Visibility**: Choose Public or Private
   - **Initialize repository**: Leave unchecked (we'll push existing code)

## 2. Initialize Git in Your SmartReader Project

Open a terminal in your SmartReader project directory and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Smart Reader desktop application"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/smart-reader.git

# Push to GitHub
git push -u origin main
```

## 3. Configure Repository Settings

### Enable GitHub Actions
1. Go to your repository on GitHub
2. Click on "Actions" tab
3. Enable GitHub Actions if prompted

### Set up Branch Protection (Optional)
1. Go to Settings → Branches
2. Add rule for `main` branch
3. Enable "Require pull request reviews before merging"

### Configure Repository Topics
1. Go to your repository main page
2. Click the gear icon next to "About"
3. Add topics: `electron`, `markdown`, `pdf`, `desktop-app`, `reader`

## 4. Create Your First Release

1. Go to "Releases" in your repository
2. Click "Create a new release"
3. Create a tag: `v1.0.0`
4. Release title: `Smart Reader v1.0.0`
5. Add release notes describing the features
6. Upload build artifacts from `dist/` folder

## 5. Set up Continuous Integration

The included GitHub Actions workflow will automatically:
- Build the application on multiple platforms
- Run tests (when you add them)
- Create releases with build artifacts

## 6. Customize for Your Project

### Update README.md
- Replace `yourusername` with your actual GitHub username
- Update the repository URL
- Add your own description and features

### Update package.json
- Update the `author` field with your information
- Update the `repository` field with your GitHub URL
- Update the `homepage` field

### Add Your Own License
- Update the `LICENSE` file with your information
- Or choose a different license if preferred

## 7. Optional: Add More Features

### Add Testing
```bash
npm install --save-dev jest electron
```

### Add Code Quality Tools
```bash
npm install --save-dev eslint prettier
```

### Add Documentation
- Create a `docs/` folder
- Add API documentation
- Add user guides

## 8. Share Your Project

Once set up, you can:
- Share the repository URL
- Create releases for distribution
- Accept contributions from others
- Use GitHub Issues for bug tracking
- Use GitHub Discussions for community

## Repository Structure

Your repository will have this structure:
```
smart-reader/
├── .github/
│   ├── workflows/
│   │   └── build.yml
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── feature_request.md
├── assets/
│   ├── icon.png
│   └── icon_256.png
├── dist/
├── docs/
├── renderer/
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── main.js
├── package.json
└── preload.js
```

## Next Steps

1. **Test the setup** by cloning your repository in a new location
2. **Add collaborators** if working with others
3. **Create issues** for planned features
4. **Start developing** and pushing changes
5. **Create releases** when ready to distribute

Your Smart Reader project is now ready for GitHub! 🎉

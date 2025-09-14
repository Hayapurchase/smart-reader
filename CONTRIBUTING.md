# Contributing to Smart Reader

Thank you for your interest in contributing to Smart Reader! This document provides guidelines and information for contributors.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Development Setup

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/yourusername/smart-reader.git
   cd smart-reader
   ```

3. **Add the upstream remote**:
   ```bash
   git remote add upstream https://github.com/originalowner/smart-reader.git
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Create a new branch** for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow JavaScript/Node.js best practices
- Add comments for complex logic
- Use meaningful variable and function names

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add dark mode toggle
fix: resolve PDF rendering issue
docs: update README with new features
style: format code according to guidelines
refactor: improve file loading performance
```

### Testing

Before submitting a pull request:

1. **Test the application**:
   ```bash
   npm start
   ```

2. **Build the application**:
   ```bash
   npm run build:portable
   ```

3. **Test file associations** (if modified):
   - Run the file association script
   - Test opening files via right-click

## Pull Request Process

1. **Update your branch** with the latest changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Test your changes** thoroughly

3. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on GitHub

### Pull Request Template

When creating a pull request, please include:

- **Description**: What changes were made and why
- **Type**: Bug fix, feature, documentation, etc.
- **Testing**: How the changes were tested
- **Screenshots**: If applicable, include screenshots
- **Breaking Changes**: Any breaking changes should be noted

## Areas for Contribution

### Features
- New file format support
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements

### Bug Fixes
- File rendering issues
- Performance problems
- UI glitches
- Cross-platform compatibility

### Documentation
- README improvements
- Code comments
- API documentation
- User guides

### Testing
- Unit tests
- Integration tests
- End-to-end tests
- Performance testing

## Code Review Process

All pull requests will be reviewed for:

- **Code quality** and style
- **Functionality** and correctness
- **Performance** impact
- **Security** considerations
- **Documentation** completeness

## Reporting Issues

When reporting issues, please include:

- **Operating System** and version
- **Node.js version**
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable

## Questions?

If you have questions about contributing:

1. Check existing [Issues](https://github.com/yourusername/smart-reader/issues)
2. Create a new issue with the "question" label
3. Join our discussions

## License

By contributing to Smart Reader, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉

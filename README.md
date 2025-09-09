# Target Code Manager

A scalable Adobe Target code management tool with linting capabilities for CSS and JavaScript. This project helps teams organize, validate, and bundle Adobe Target experiences efficiently.

## Features

- 🏗️ **Automated Bundling**: Combines HTML, CSS, and JS files into single deployable HTML files
- 🔍 **Code Linting**: ESLint for JavaScript and Stylelint for CSS validation
- 📁 **Scalable Structure**: Organized by Brand/Region/Activity/Experience hierarchy
- 🔄 **Watch Mode**: Real-time rebuilding during development
- 🗜️ **Minification**: Optional code minification for production
- 📊 **Adobe Target Integration**: Built-in support for Adobe Target APIs and tracking

## Project Structure

```
target-code-manager/
│
├── package.json
├── .eslintrc.json          # JS lint rules
├── .stylelintrc.json       # CSS lint rules
├── build.js                # Node.js bundler script
│
├── src/
│   └── [brand]/
│       └── [region]/
│           └── [activity-id]/
│               └── experience-[name]/
│                   ├── script.js
│                   ├── style.css
│                   └── markup.html
│
└── dist/
    └── [brand]-[region]-[activity-id]-experience-[name].html
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd target-code-manager
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Build All Experiences
```bash
npm run build
```

### Development Mode (Watch)
```bash
npm run dev
```

### Linting
```bash
# Run all linting
npm run lint

# Lint JavaScript only
npm run lint:js

# Lint CSS only
npm run lint:css

# Auto-fix linting issues
npm run lint:fix
```

### Clean Build Directory
```bash
npm run clean
```

## Creating New Experiences

1. Create the directory structure:
```
src/[yourbrand]/[yourregion]/[activity-id]/experience-[experiencename]/
```

2. Add your files:
   - `markup.html` - HTML content for the experience
   - `style.css` - CSS styles for the experience
   - `script.js` - JavaScript logic for the experience

3. Run the build process:
```bash
npm run build
```

The bundled file will be generated in the `dist/` directory as:
`[yourbrand]-[yourregion]-[activity-id]-experience-[experiencename].html`

## Example

For the included example:
- **Brand**: dyson
- **Region**: jp
- **Activity**: 7921831
- **Experience**: experience-a

Running `npm run build` generates: `dist/dyson-jp-7921831-experience-a.html`

## Linting Rules

### JavaScript (ESLint)
- ES2021 standards
- Single quotes preferred
- 2-space indentation
- Adobe Target globals defined (adobe, AT, _satellite, digitalData)

### CSS (Stylelint)
- Standard CSS rules
- 2-space indentation
- Single quotes for strings
- BEM naming convention support
- No !important declarations

## Build Options

The build script supports several command-line options:

```bash
# Watch mode for development
node build.js --watch

# Note: Minification is disabled by default for debugging purposes
# The output includes uncompressed CSS, HTML, and JavaScript for easy debugging
```

## Output Format

The generated bundle files contain only the essential Adobe Target code without full HTML document structure:

- Metadata comments with build information
- `<style>` tag with CSS
- HTML markup content
- `<script>` tag with JavaScript

This format is optimized for Adobe Target deployment and debugging.

## Team Collaboration

This project is designed to be scalable for multiple teams:

1. **Brand Teams**: Each brand gets its own directory under `src/`
2. **Regional Teams**: Each region has its own subdirectory
3. **Activity Management**: Activities are clearly numbered and organized
4. **Experience Variants**: Multiple experiences per activity are supported

## Adobe Target Integration

The generated bundles include:
- Proper HTML5 structure
- Embedded CSS and JavaScript
- Adobe Target tracking capabilities
- Metadata comments for easy identification

## Contributing

1. Follow the established directory structure
2. Ensure all code passes linting rules
3. Test your experiences before committing
4. Use descriptive commit messages

## License

MIT License - see LICENSE file for details

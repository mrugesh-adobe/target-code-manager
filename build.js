const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const { minify: minifyHTML } = require('html-minifier-terser');
const { minify: minifyJS } = require('terser');
const CleanCSS = require('clean-css');
const chokidar = require('chokidar');

class TargetCodeBuilder {
  constructor(options = {}) {
    this.srcDir = options.srcDir || 'src';
    this.distDir = options.distDir || 'dist';
    this.watch = options.watch || false;
    this.minify = options.minify !== false;
    
    this.htmlMinifyOptions = {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    };
    
    this.jsMinifyOptions = {
      compress: {
        drop_console: false,
        drop_debugger: true
      },
      mangle: false,
      format: {
        comments: false
      }
    };
  }

  async init() {
    console.log('🚀 Target Code Manager - Build Process Started');
    
    // Ensure dist directory exists
    await fs.ensureDir(this.distDir);
    
    if (this.watch) {
      this.startWatcher();
    } else {
      await this.buildAll();
    }
  }

  async buildAll() {
    try {
      // Clean dist directory
      await fs.emptyDir(this.distDir);
      console.log('🧹 Cleaned dist directory');

      // Find all activity directories
      const activityPaths = await this.findActivityPaths();
      
      if (activityPaths.length === 0) {
        console.log('⚠️  No activities found in src directory');
        return;
      }

      console.log(`📁 Found ${activityPaths.length} activities to build`);

      // Build each activity
      for (const activityPath of activityPaths) {
        await this.buildActivity(activityPath);
      }

      console.log('✅ Build completed successfully!');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  }

  async findActivityPaths() {
    const pattern = path.join(this.srcDir, '**/*/*/experience-*').replace(/\\/g, '/');
    const matches = glob.sync(pattern, { onlyDirectories: true });
    return matches;
  }

  async buildActivity(activityPath) {
    const pathParts = activityPath.split(path.sep);
    const brand = pathParts[1];
    const region = pathParts[2];
    const activity = pathParts[3];
    const experience = pathParts[4];
    
    const outputName = `${brand}-${region}-${activity}-${experience}.html`;
    const outputPath = path.join(this.distDir, outputName);

    console.log(`🔨 Building: ${outputName}`);

    try {
      // Read source files
      const htmlPath = path.join(activityPath, 'markup.html');
      const cssPath = path.join(activityPath, 'style.css');
      const jsPath = path.join(activityPath, 'script.js');

      let htmlContent = '';
      let cssContent = '';
      let jsContent = '';

      // Read HTML
      if (await fs.pathExists(htmlPath)) {
        htmlContent = await fs.readFile(htmlPath, 'utf8');
      }

      // Read CSS
      if (await fs.pathExists(cssPath)) {
        cssContent = await fs.readFile(cssPath, 'utf8');
        if (this.minify) {
          const result = new CleanCSS().minify(cssContent);
          cssContent = result.styles;
        }
      }

      // Read JS
      if (await fs.pathExists(jsPath)) {
        jsContent = await fs.readFile(jsPath, 'utf8');
        if (this.minify) {
          const result = await minifyJS(jsContent, this.jsMinifyOptions);
          jsContent = result.code || jsContent;
        }
      }

      // Create bundled HTML
      const bundledHTML = this.createBundle(htmlContent, cssContent, jsContent, {
        brand,
        region,
        activity,
        experience
      });

      // Minify final HTML if enabled
      let finalHTML = bundledHTML;
      if (this.minify) {
        finalHTML = await minifyHTML(bundledHTML, this.htmlMinifyOptions);
      }

      // Write output file
      await fs.writeFile(outputPath, finalHTML, 'utf8');
      console.log(`✅ Built: ${outputName}`);

    } catch (error) {
      console.error(`❌ Failed to build ${outputName}:`, error.message);
    }
  }

  createBundle(html, css, js, metadata) {
    const timestamp = new Date().toISOString();
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adobe Target - ${metadata.brand} ${metadata.region} ${metadata.activity} ${metadata.experience}</title>
  
  <!-- Target Code Bundle -->
  <!-- Generated: ${timestamp} -->
  <!-- Brand: ${metadata.brand} -->
  <!-- Region: ${metadata.region} -->
  <!-- Activity: ${metadata.activity} -->
  <!-- Experience: ${metadata.experience} -->
  
  ${css ? `<style>\n${css}\n</style>` : ''}
</head>
<body>
  ${html || '<!-- No HTML content -->'}
  
  ${js ? `<script>\n${js}\n</script>` : ''}
</body>
</html>`;
  }

  startWatcher() {
    console.log('👀 Starting file watcher...');
    
    const watcher = chokidar.watch(this.srcDir, {
      ignored: /node_modules/,
      persistent: true
    });

    watcher.on('change', async (filePath) => {
      console.log(`📝 File changed: ${filePath}`);
      
      // Find the activity path for the changed file
      const activityPath = this.findActivityPathForFile(filePath);
      if (activityPath) {
        await this.buildActivity(activityPath);
      }
    });

    watcher.on('add', async (filePath) => {
      console.log(`➕ File added: ${filePath}`);
      
      const activityPath = this.findActivityPathForFile(filePath);
      if (activityPath) {
        await this.buildActivity(activityPath);
      }
    });

    console.log('✅ File watcher started. Press Ctrl+C to stop.');
  }

  findActivityPathForFile(filePath) {
    const parts = filePath.split(path.sep);
    const experienceIndex = parts.findIndex(part => part.startsWith('experience-'));
    
    if (experienceIndex !== -1) {
      return parts.slice(0, experienceIndex + 1).join(path.sep);
    }
    
    return null;
  }
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const watch = args.includes('--watch') || args.includes('-w');
  const noMinify = args.includes('--no-minify');

  const builder = new TargetCodeBuilder({
    watch,
    minify: !noMinify
  });

  await builder.init();
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = TargetCodeBuilder;

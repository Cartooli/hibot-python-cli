# Hi Bot Code

**A privacy-friendly, in-browser HTML/CSS/JS practice lab** for students — part of [Hi, Bot](https://hibot.space/). Grades 6–12 friendly; no account required for core lessons.

Live at: [https://code.hibot.space](https://code.hibot.space)

---

Current version: see [`VERSION`](VERSION) · [changelog](CHANGELOG.md)

## 🎉 Release notes

**Current release:** tracked in [`VERSION`](VERSION) — see [CHANGELOG.md](CHANGELOG.md) for full notes.

**Historical milestone — Version 2.0 (October 2025):** 16 major enhancements shipped, including:

- 🔍 **Template Search & Filter** - Find the perfect template instantly
- 👁️ **Template Preview** - See before you apply
- 💾 **Project Management** - Save/Load up to 10 projects
- 📤 **Import/Export** - Share templates as JSON files
- 📊 **Local progress** - Privacy-first indicators stored in your browser only (no server analytics)
- ♿ **Enhanced Accessibility** - WCAG 2.1 Level AA compliant
- 🎨 **12 Unique Templates** - Each with custom HTML & CSS

**📖 Archived guides** (see also root [CONTRIBUTING.md](CONTRIBUTING.md)):
- 🚀 **[QUICK_START_GUIDE.md](docs/archive/QUICK_START_GUIDE.md)** - How to use features
- 📊 **[README_NEW_FEATURES.md](docs/archive/README_NEW_FEATURES.md)** - What's new summary
- 🎨 **[VISUAL_SUMMARY.md](docs/archive/VISUAL_SUMMARY.md)** - Visual guide with diagrams
- ✅ **[INTEGRATION_SUCCESS.md](docs/archive/INTEGRATION_SUCCESS.md)** - Full technical report

---

## Features

### Core Features
- **100% Client-Side**: Core editing and preview run in your browser with no backend account — no third-party analytics SDKs; fonts and assets ship from this site (see Privacy & Security)
- **Live Preview**: See your changes instantly in a sandboxed iframe
- **Visual Editor**: Edit page content, colors, and typography through an intuitive sidebar panel
- **Code Editor**: Direct access to the generated HTML with line numbers and syntax-aware textarea
- **Educational**: Perfect for beginners learning HTML, CSS, and JavaScript
- **Responsive**: Works beautifully on desktop and mobile devices
- **Privacy-first**: No third-party analytics SDKs; editor progress may use browser **localStorage** only on your device (see Privacy & Security)

### 🆕 New Export & Deployment Features
- **8+ Platform Exports**: CodePen, JSFiddle, Replit, CodeSandbox, Glitch, Carrd, Webflow, Softr, GitHub Gist
- **Step-by-Step Instructions**: Beautiful modals guide you through deployment on each platform
- **Platform-Specific Formatting**: Code automatically formatted for Carrd, Webflow, and Softr
- **One-Click Export**: Copy code and open platforms with a single click

### 🆕 Learning & Educational Features
- **5 Interactive Challenges**: Progressive learning path from colors to responsive design
- **Achievement System**: 6 unlockable badges that track your progress
- **Learning Hints**: Toggle helpful comments in your code to understand structure
- **Layout Helpers**: Instant CSS Grid, Flexbox, 2-column layouts, and card components

### 🆕 Productivity Features
- **Layout Templates**: Insert common CSS patterns with one click
- **12+ Page Templates**: Portfolio, blog, landing page, resume, restaurant, wedding, and more
- **Auto-Save**: Your work is automatically saved in browser localStorage
- **Undo/Redo**: Full history tracking with keyboard shortcuts

## How It Works

1. **Edit Panel** (right sidebar): Change meta tags, headings, colors, and typography
2. **Live Preview** (top): Watch your webpage render in real-time
3. **Code Editor** (bottom): View and manually edit the generated HTML code
4. **Sync Both Ways**: Panel controls → Code → Preview, or edit code directly and sync back to panel

## Quick Start

Simply open `index.html` in any modern web browser. No build process, no dependencies, no installation required.

### Local Development

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js (npx)
npx serve

# Option 3: PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

This is a static single-page application that can be deployed anywhere:

### Traditional Hosting
- **GitHub Pages**: Push to a repo and enable Pages in settings
- **Netlify**: Drag and drop the file
- **Vercel**: Deploy with a single command
- **Cloudflare Pages**: Connect your GitHub repo
- **Any static hosting**: Upload `index.html` and you're done

### 🆕 No-Code Platform Embedding
Export your creations to popular no-code platforms with **one-click formatted code**:
- **Carrd.co**: Perfect for landing pages ($19/year for Pro features)
- **Webflow**: Professional visual builder ($14+/month)
- **Softr**: Build apps without code (Professional plan)

Each export includes step-by-step instructions and platform-specific formatting!

### 🆕 Live Coding Platforms
Continue development on:
- **CodePen** / **JSFiddle**: Instant live coding
- **Replit**: Full development environment
- **CodeSandbox**: Professional web IDE
- **Glitch**: Community-driven development
- **GitHub Gist**: Quick sharing and embedding

### Custom Domain Setup

To use a custom domain like `code.hibot.space`:

1. Deploy to your hosting platform
2. Configure DNS:
   - **A Record**: Point to your hosting provider's IP
   - **CNAME**: Point to your hosting provider's domain
3. Enable HTTPS (most platforms do this automatically)

## Technical Details

- **No dependencies**: Pure HTML, CSS, and JavaScript
- **No build step**: Works immediately in any browser
- **CSP-friendly**: Uses inline scripts (contained in single file)
- **Accessible**: Semantic HTML with ARIA labels
- **Modern CSS**: CSS Grid, Custom Properties, and modern selectors
- **Progressive**: Works on any device with a modern browser

## Browser Support

- Chrome/Edge: ✅ 90+
- Firefox: ✅ 88+
- Safari: ✅ 14+
- Mobile: ✅ All modern browsers

## Educational Use

Perfect for:

- Teaching HTML/CSS/JS basics
- Quick prototyping
- Learning web fundamentals
- Demonstrating web concepts
- Workshops and coding bootcamps

See [NEW_FEATURES.md](docs/archive/NEW_FEATURES.md) for details on the educational features including:
- Interactive challenges with automatic completion detection
- Achievement badges to track learning progress
- Layout helpers to learn CSS Grid, Flexbox, and responsive design
- Learning hints that explain code structure

## Privacy & Security

- **Zero third-party analytics**: No analytics SDKs, no tracking cookies in core flows
- **Sandboxed preview**: Preview runs in a restricted iframe (opaque origin; see CHANGELOG 2.10+)
- **Self-contained app delivery**: Static assets load from the site origin you opened — no third-party font CDNs (fonts are self-hosted under `/assets/fonts/`)
- **No npm/build toolchain required**: Pure HTML, CSS, and JavaScript — no packages to install to run locally

## License

MIT License — see [`LICENSE`](LICENSE) for the full text. Attribution appreciated but not required.

---

**Built for beginners, by developers who remember learning.**

Questions? Issues? Feedback welcome!
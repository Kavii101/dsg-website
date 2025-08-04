# Diaspora Solidarity Group Website

A modern, responsive website for the Diaspora Solidarity Group (DSG) built with Next.js, TypeScript, and Tailwind CSS.

## 🌟 Features

- **Modern Design**: Beautiful, professional design with gradient backgrounds and smooth animations
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Accessibility**: WCAG AA compliant with proper semantic markup
- **Performance**: Optimized for fast loading and smooth interactions
- **PWA Ready**: Progressive Web App capabilities for mobile devices
- **Content Management**: Easy-to-edit JSON-based content system

## 🏗️ Built With

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Playwright** - End-to-end testing

## 🎨 Design Features

- **Hero Carousel**: Dynamic slides showcasing key focus areas
- **Interactive Cards**: Hover effects and smooth animations
- **Gradient Backgrounds**: Beautiful color schemes throughout
- **Mobile Optimization**: Touch-friendly interface for mobile devices
- **Dark Mode Support**: Automatic dark mode detection

## 📱 Pages

- **Homepage**: Hero carousel, mission statement, impact metrics, work overview
- **About**: Mission, vision, values, team, and organizational story
- **Work Overview**: Five pillars of action and interconnected approach
- **Work Pillars**: Individual pages for each focus area:
  - Climate Justice & Climate Migrants
  - Women's Rights & Feminist Solidarity
  - Youth Empowerment
  - Migrant Justice & Anti-Racism
  - Intersectionality & Decolonial Education

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/[username]/dsg-website.git
cd dsg-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:3000` to view the website.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Playwright tests

## 📝 Content Management

The website uses a simple JSON-based content management system. Edit these files to update content:

- `content/hero/slides.json` - Hero carousel slides
- `content/sections/homepage.json` - Homepage sections
- `content/pages/about.json` - About page content
- `content/pages/work-pillars.json` - Work pillar pages
- `content/navigation/menu.json` - Navigation menu
- `content/settings/site.json` - Site settings

Refer to `CONTENT_EDITING_GUIDE.md` for detailed instructions.

## 🚀 Deployment

This website is configured for deployment on GitHub Pages using GitHub Actions.

### Automatic Deployment

The website automatically deploys when changes are pushed to the `main` branch.

### Manual Build

```bash
npm run build
```

The static files will be generated in the `out` directory.

## 🧪 Testing

Comprehensive testing with Playwright:

```bash
# Run all tests
npm run test

# Run specific test suites
npx playwright test tests/android-focused-test.spec.ts
npx playwright test tests/final-validation-test.spec.ts
```

## 📊 Performance

- **Mobile Performance**: Optimized for 3G networks
- **Accessibility**: WCAG AA compliant
- **SEO**: Optimized metadata and semantic markup
- **PWA**: Progressive Web App capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with love for the Diaspora Solidarity Group community
- Designed with accessibility and inclusion in mind
- Optimized for global reach and impact

---

**Diaspora Solidarity Group** - Building Solidarity Across Borders
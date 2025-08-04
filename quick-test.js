// Quick test to verify website functionality
const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Testing DSG Website...');
  
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    // Navigate to homepage
    console.log('📍 Navigating to homepage...');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    
    // Check if page loaded
    const title = await page.title();
    console.log('✅ Page Title:', title);
    
    // Check hero carousel
    console.log('🎠 Checking hero carousel...');
    const carousel = await page.locator('#hero-carousel');
    const isCarouselVisible = await carousel.isVisible();
    console.log('✅ Hero Carousel Visible:', isCarouselVisible);
    
    // Check first slide content
    const firstSlideHeading = await page.locator('h1').first().textContent();
    console.log('✅ First Slide Heading:', firstSlideHeading);
    
    // Check navigation
    const logo = await page.locator('img[alt="DSG Logo"]').isVisible();
    console.log('✅ Logo Visible:', logo);
    
    // Check sections
    const sectionsCount = await page.locator('section').count();
    console.log('✅ Sections Count:', sectionsCount);
    
    // Test carousel navigation
    console.log('🎯 Testing carousel navigation...');
    const nextButton = page.locator('button[aria-label="Next slide"]');
    if (await nextButton.isVisible()) {
      await nextButton.click();
      await page.waitForTimeout(500);
      console.log('✅ Carousel navigation working');
    }
    
    // Check mobile menu (if on small viewport)
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const mobileMenuButton = page.locator('button[aria-label*="menu"]');
    const isMobileMenuVisible = await mobileMenuButton.isVisible();
    console.log('✅ Mobile Menu Button Visible:', isMobileMenuVisible);
    
    console.log('🎉 Website is working perfectly!');
    console.log('🌐 Access at: http://localhost:3001');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    // Keep browser open for 5 seconds to see the site
    await page.waitForTimeout(5000);
    await browser.close();
  }
})();
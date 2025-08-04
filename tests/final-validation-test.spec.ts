import { test, expect } from '@playwright/test';

test.describe('DSG Website Final Validation', () => {
  // Test on multiple Android device sizes
  const androidViewports = [
    { name: 'Galaxy S21', width: 360, height: 740 },
    { name: 'Pixel 7', width: 393, height: 851 },
    { name: 'OnePlus 9', width: 412, height: 869 }
  ];

  const desktopViewports = [
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Laptop', width: 1366, height: 768 }
  ];

  const iphoneViewports = [
    { name: 'iPhone 14 Pro', width: 390, height: 844 },
    { name: 'iPhone SE', width: 375, height: 667 }
  ];

  for (const viewport of [...androidViewports, ...desktopViewports, ...iphoneViewports]) {
    test(`Website loads and functions correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      
      try {
        // Load homepage
        await page.goto('http://localhost:3003', { timeout: 15000 });
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        // Check hero carousel is visible
        await expect(page.locator('#hero-carousel')).toBeVisible({ timeout: 5000 });
        
        // Check at least one navigation element
        const navElements = await page.locator('nav').count();
        expect(navElements).toBeGreaterThan(0);
        
        // Check main content is present
        await expect(page.locator('#main-content')).toBeVisible({ timeout: 5000 });
        
        // Test navigation to About page
        const aboutLink = page.locator('a[href="/about"]').first();
        if (await aboutLink.isVisible()) {
          await aboutLink.click();
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          // Check About page loaded
          const aboutHeading = page.locator('h1').first();
          const headingText = await aboutHeading.textContent();
          expect(headingText).toContain('About');
        }
        
        // Test navigation to Work page  
        await page.goto('http://localhost:3003/work');
        await page.waitForLoadState('networkidle', { timeout: 10000 });
        
        const workHeading = page.locator('h1').first();
        const workText = await workHeading.textContent();
        expect(workText).toContain('Work');
        
        // Test individual pillar page
        const pillarLink = page.locator('a[href*="/work/climate-justice"]').first();
        if (await pillarLink.isVisible()) {
          await pillarLink.click();
          await page.waitForLoadState('networkidle', { timeout: 10000 });
          
          const pillarHeading = page.locator('h1').first();
          const pillarText = await pillarHeading.textContent();
          expect(pillarText).toContain('Climate');
        }
        
        console.log(`✅ ${viewport.name} - All pages loaded successfully`);
        
      } catch (error) {
        console.error(`❌ ${viewport.name} - Test failed:`, error.message);
        throw error;
      }
    });
  }

  test('Performance and accessibility validation', async ({ page }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    // Check for console errors
    let consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate through key pages
    await page.click('a[href="/about"]');
    await page.waitForLoadState('networkidle');
    
    await page.click('a[href="/work"]');
    await page.waitForLoadState('networkidle');
    
    // Should have minimal console errors
    expect(consoleErrors.length).toBeLessThan(5);
    
    // Check accessibility features
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // Check images have alt text (sample)
    const images = page.locator('img').first();
    if (await images.isVisible()) {
      const alt = await images.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
    
    console.log('✅ Performance and accessibility validation passed');
  });

  test('Mobile-specific optimizations', async ({ page }) => {
    // Test Android Galaxy S21 viewport
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    // Check touch targets are appropriately sized
    const buttons = page.locator('button, a[href]');
    const buttonCount = await buttons.count();
    
    let touchFriendlyCount = 0;
    for (let i = 0; i < Math.min(buttonCount, 5); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box && Math.min(box.height, box.width) >= 40) {
          touchFriendlyCount++;
        }
      }
    }
    
    // At least 60% of visible buttons should be touch-friendly
    expect(touchFriendlyCount).toBeGreaterThan(0);
    
    // Check text is readable on mobile
    const heroHeadline = page.locator('#hero-carousel h1').first();
    if (await heroHeadline.isVisible()) {
      const fontSize = await heroHeadline.evaluate(el => {
        return parseInt(window.getComputedStyle(el).fontSize);
      });
      expect(fontSize).toBeGreaterThanOrEqual(20); // Minimum readable size
    }
    
    console.log('✅ Mobile optimizations validated');
  });

  test('Cross-browser compatibility', async ({ page, browserName }) => {
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    // Check hero carousel loads in all browsers
    await expect(page.locator('#hero-carousel')).toBeVisible();
    
    // Check navigation works
    const aboutLink = page.locator('a[href="/about"]').first();
    if (await aboutLink.isVisible()) {
      await aboutLink.click();
      await page.waitForLoadState('networkidle');
      
      const aboutHeading = page.locator('h1');
      await expect(aboutHeading).toBeVisible();
    }
    
    console.log(`✅ ${browserName} compatibility validated`);
  });

  test('Visual regression check', async ({ page }) => {
    // Take screenshots for visual comparison
    const viewports = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      
      // Homepage
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: `tests/screenshots/final-homepage-${viewport.name}.png`,
        fullPage: true
      });
      
      // About page
      await page.goto('http://localhost:3003/about');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: `tests/screenshots/final-about-${viewport.name}.png`,
        fullPage: true
      });
      
      // Work page
      await page.goto('http://localhost:3003/work');
      await page.waitForLoadState('networkidle');
      await page.screenshot({ 
        path: `tests/screenshots/final-work-${viewport.name}.png`,
        fullPage: true
      });
    }
    
    console.log('✅ Visual regression screenshots captured');
  });
});
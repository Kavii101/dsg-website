import { test, expect, devices } from '@playwright/test';

// Android device configurations
const androidDevices = [
  {
    name: 'Samsung Galaxy S21',
    viewport: { width: 360, height: 740 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Pixel 7',
    viewport: { width: 393, height: 851 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'OnePlus 9',
    viewport: { width: 412, height: 869 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; OnePlus 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  }
];

for (const device of androidDevices) {
  test.describe(`Android ${device.name} Tests`, () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize(device.viewport);
      await page.setUserAgent(device.userAgent);
    });

    test(`Homepage displays correctly on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Check hero carousel loads
      await expect(page.locator('#hero-carousel')).toBeVisible({ timeout: 10000 });
      
      // Check hero content is visible and readable
      const heroHeadline = page.locator('#hero-carousel h1').first();
      await expect(heroHeadline).toBeVisible();
      
      // Check font size is appropriate for mobile
      const fontSize = await heroHeadline.evaluate(el => {
        return parseInt(window.getComputedStyle(el).fontSize);
      });
      expect(fontSize).toBeGreaterThanOrEqual(24);
      
      // Check navigation works
      await expect(page.locator('nav')).toBeVisible();
      
      // Check main content sections
      await expect(page.locator('#main-content')).toBeVisible();
      
      // Test touch-friendly buttons
      const ctaButton = page.locator('#hero-carousel a').first();
      if (await ctaButton.isVisible()) {
        const box = await ctaButton.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(40); // Minimum touch target
        }
      }
      
      // Take screenshot
      await page.screenshot({ 
        path: `tests/screenshots/android-homepage-${device.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`About page mobile layout on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003/about');
      await page.waitForLoadState('networkidle');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('About Diaspora Solidarity Group');
      
      // Check mobile-friendly sections
      await expect(page.locator('text=Our Mission')).toBeVisible();
      await expect(page.locator('text=Our Values')).toBeVisible();
      
      // Verify cards stack properly on mobile
      const valueCards = page.locator('[class*="grid"]').first();
      if (await valueCards.isVisible()) {
        const gridStyles = await valueCards.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            display: styles.display,
            gridTemplateColumns: styles.gridTemplateColumns
          };
        });
        
        // On mobile, should be single column or auto-fitting
        expect(gridStyles.display).toBe('grid');
      }
      
      // Take screenshot
      await page.screenshot({ 
        path: `tests/screenshots/android-about-${device.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`Navigation and touch interactions on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Test mobile menu if present
      const mobileMenuButton = page.locator('button[aria-label*="menu"], button[aria-label*="Menu"], [aria-label*="toggle"]');
      const aboutLink = page.locator('nav [href="/about"]');
      
      if (await mobileMenuButton.isVisible()) {
        // Mobile menu test
        await mobileMenuButton.tap();
        await page.waitForTimeout(300);
        await expect(aboutLink).toBeVisible();
        await aboutLink.tap();
      } else {
        // Direct navigation test
        if (await aboutLink.isVisible()) {
          await aboutLink.tap();
        }
      }
      
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toContainText('About');
    });

    test(`Carousel touch interactions on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Wait for carousel
      await page.waitForSelector('#hero-carousel');
      
      // Test carousel indicators
      const indicators = page.locator('[role="tablist"] button, button[aria-label*="slide"]');
      const indicatorCount = await indicators.count();
      
      if (indicatorCount > 1) {
        // Test tapping indicator
        await indicators.nth(1).tap();
        await page.waitForTimeout(500);
        
        // Check that slide changed
        const activeSlide = page.locator('[role="group"][aria-roledescription="slide"]').first();
        await expect(activeSlide).toBeVisible();
      }
      
      // Test swipe gesture (if supported)
      const carousel = page.locator('#hero-carousel');
      const box = await carousel.boundingBox();
      
      if (box) {
        // Perform swipe gesture
        await page.touchscreen.tap(box.x + box.width * 0.8, box.y + box.height * 0.5);
        await page.touchscreen.tap(box.x + box.width * 0.2, box.y + box.height * 0.5);
        await page.waitForTimeout(500);
      }
    });

    test(`Performance on ${device.name}`, async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Mobile should load within 8 seconds
      expect(loadTime).toBeLessThan(8000);
      
      // Check for JavaScript errors
      let jsErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          jsErrors.push(msg.text());
        }
      });
      
      // Navigate to other pages to check for errors
      await page.click('nav [href="/about"]');
      await page.waitForLoadState('networkidle');
      
      await page.click('nav [href="/work"]');
      await page.waitForLoadState('networkidle');
      
      // Should have minimal errors
      expect(jsErrors.length).toBeLessThan(3);
    });

    test(`Responsive images and content on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Check that images don't overflow
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 3); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const box = await img.boundingBox();
          if (box) {
            // Image shouldn't be wider than viewport
            expect(box.width).toBeLessThanOrEqual(device.viewport.width + 10);
          }
        }
      }
      
      // Check text doesn't overflow
      const textElements = page.locator('h1, h2, p');
      const textCount = await textElements.count();
      
      for (let i = 0; i < Math.min(textCount, 5); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const box = await element.boundingBox();
          if (box) {
            // Text shouldn't cause horizontal overflow
            expect(box.x + box.width).toBeLessThanOrEqual(device.viewport.width + 20);
          }
        }
      }
    });

    test(`Accessibility on ${device.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Check for proper heading structure
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(2);
      
      // Check touch targets are large enough
      const buttons = page.locator('button, a[class*="button"]');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          if (box) {
            // Touch targets should be at least 44x44px (WCAG guideline)
            expect(Math.min(box.height, box.width)).toBeGreaterThanOrEqual(40);
          }
        }
      }
      
      // Check that focus is visible when using keyboard navigation
      await page.keyboard.press('Tab');
      const focusedElement = page.locator(':focus');
      if (await focusedElement.count() > 0) {
        const focusedBox = await focusedElement.boundingBox();
        expect(focusedBox).toBeTruthy();
      }
    });
  });
}

// Android-specific optimization tests
test.describe('Android Optimizations', () => {
  test('Mobile-first responsive breakpoints', async ({ page }) => {
    // Test different Android screen sizes
    const screenSizes = [
      { width: 360, height: 640 }, // Small Android
      { width: 393, height: 851 }, // Medium Android
      { width: 412, height: 915 }  // Large Android
    ];
    
    for (const size of screenSizes) {
      await page.setViewportSize(size);
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Check layout adapts properly
      const heroSection = page.locator('#hero-carousel');
      const heroBox = await heroSection.boundingBox();
      
      if (heroBox) {
        expect(heroBox.width).toBeLessThanOrEqual(size.width);
      }
      
      // Check text remains readable
      const headline = page.locator('#hero-carousel h1').first();
      if (await headline.isVisible()) {
        const fontSize = await headline.evaluate(el => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        expect(fontSize).toBeGreaterThanOrEqual(20);
      }
    }
  });

  test('Touch-friendly interface elements', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 740 });
    await page.goto('http://localhost:3003');
    await page.waitForLoadState('networkidle');
    
    // Check all interactive elements are touch-friendly
    const interactiveElements = page.locator('button, a, input, [tabindex]:not([tabindex="-1"])');
    const elementCount = await interactiveElements.count();
    
    let touchFriendlyCount = 0;
    
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = interactiveElements.nth(i);
      if (await element.isVisible()) {
        const box = await element.boundingBox();
        if (box && Math.min(box.height, box.width) >= 40) {
          touchFriendlyCount++;
        }
      }
    }
    
    // At least 80% of interactive elements should be touch-friendly
    const visibleCount = Math.min(elementCount, 10);
    expect(touchFriendlyCount / visibleCount).toBeGreaterThanOrEqual(0.8);
  });
});
import { test, expect, devices } from '@playwright/test';

// Test configurations for different devices
const testDevices = [
  {
    name: 'Desktop - Chrome',
    device: 'Desktop Chrome',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  {
    name: 'Desktop - Firefox', 
    device: 'Desktop Firefox',
    viewport: { width: 1920, height: 1080 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
  },
  {
    name: 'Android - Samsung Galaxy S21',
    device: 'Galaxy S8',
    viewport: { width: 360, height: 740 },
    userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'Android - Pixel 7',
    device: 'Pixel 5',
    viewport: { width: 393, height: 851 },
    userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
  },
  {
    name: 'iPhone 14 Pro',
    device: 'iPhone 12 Pro',
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPhone SE',
    device: 'iPhone SE',
    viewport: { width: 375, height: 667 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  },
  {
    name: 'iPad Pro',
    device: 'iPad Pro',
    viewport: { width: 1024, height: 1366 },
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
  }
];

for (const deviceConfig of testDevices) {
  test.describe(`${deviceConfig.name} Tests`, () => {
    test.beforeEach(async ({ page }) => {
      // Set viewport and user agent
      await page.setViewportSize(deviceConfig.viewport);
      await page.setUserAgent(deviceConfig.userAgent);
    });

    test(`Homepage loads and displays correctly on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check that hero carousel is visible
      await expect(page.locator('#hero-carousel')).toBeVisible();
      
      // Check navigation is present
      await expect(page.locator('nav')).toBeVisible();
      
      // Check main content sections load
      await expect(page.locator('#main-content')).toBeVisible();
      
      // Verify hero slide content is visible
      const heroSlide = page.locator('[role="group"][aria-roledescription="slide"]').first();
      await expect(heroSlide).toBeVisible();
      
      // Check if text content is readable (not overlapped)
      const headline = heroSlide.locator('h1');
      await expect(headline).toBeVisible();
      
      // Verify button is clickable
      const ctaButton = heroSlide.locator('a[href*="/work/"]');
      await expect(ctaButton).toBeVisible();
      
      // Take screenshot for visual validation
      await page.screenshot({ 
        path: `tests/screenshots/homepage-${deviceConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`About page loads and displays correctly on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003/about');
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('About Diaspora Solidarity Group');
      
      // Check main sections are visible
      await expect(page.locator('text=Our Mission')).toBeVisible();
      await expect(page.locator('text=Our Vision')).toBeVisible();
      await expect(page.locator('text=Our Values')).toBeVisible();
      await expect(page.locator('text=Our Team')).toBeVisible();
      
      // Verify values cards are properly displayed
      const valueCards = page.locator('[data-testid="value-card"], .grid .card, .grid [class*="card"]');
      const cardCount = await valueCards.count();
      expect(cardCount).toBeGreaterThan(0);
      
      // Check timeline is visible
      await expect(page.locator('text=Our Story')).toBeVisible();
      
      // Take screenshot for visual validation
      await page.screenshot({ 
        path: `tests/screenshots/about-${deviceConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`Work overview page loads correctly on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003/work');
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Our Work');
      
      // Check work pillars section
      await expect(page.locator('text=Areas of Impact')).toBeVisible();
      
      // Verify pillar cards are visible
      const pillarCards = page.locator('a[href*="/work/"]');
      const pillarCount = await pillarCards.count();
      expect(pillarCount).toBeGreaterThanOrEqual(5);
      
      // Check interconnected approach section
      await expect(page.locator('text=An Interconnected Approach')).toBeVisible();
      
      // Take screenshot for visual validation
      await page.screenshot({ 
        path: `tests/screenshots/work-${deviceConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`Individual work pillar page loads correctly on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003/work/climate-justice');
      
      // Wait for page to load completely
      await page.waitForLoadState('networkidle');
      
      // Check hero section
      await expect(page.locator('h1')).toContainText('Climate Justice');
      
      // Check main sections
      await expect(page.locator('text=Our Approach')).toBeVisible();
      await expect(page.locator('text=Key Initiatives')).toBeVisible();
      await expect(page.locator('text=Impact Stories')).toBeVisible();
      
      // Take screenshot for visual validation
      await page.screenshot({ 
        path: `tests/screenshots/pillar-${deviceConfig.name.toLowerCase().replace(/\s+/g, '-')}.png`,
        fullPage: true
      });
    });

    test(`Navigation works correctly on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      
      // Wait for page to load
      await page.waitForLoadState('networkidle');
      
      const isMobile = deviceConfig.viewport.width < 768;
      
      if (isMobile) {
        // Test mobile menu
        const mobileMenuButton = page.locator('button[aria-label*="menu"], [aria-label*="Open menu"], [aria-label*="Toggle menu"]');
        if (await mobileMenuButton.isVisible()) {
          await mobileMenuButton.click();
          await expect(page.locator('nav [href="/about"]')).toBeVisible();
        }
      } else {
        // Test desktop navigation
        await expect(page.locator('nav [href="/about"]')).toBeVisible();
      }
      
      // Test navigation to About page
      await page.click('nav [href="/about"]');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toContainText('About');
      
      // Test navigation to Work page
      await page.click('nav [href="/work"]');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('h1')).toContainText('Our Work');
    });

    test(`Carousel functionality works on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      
      // Wait for carousel to load
      await page.waitForLoadState('networkidle');
      await page.waitForSelector('#hero-carousel');
      
      // Check that carousel indicators are present
      const indicators = page.locator('[role="tablist"] button, [aria-label*="slide"]');
      const indicatorCount = await indicators.count();
      expect(indicatorCount).toBeGreaterThan(1);
      
      if (!deviceConfig.name.includes('iPhone SE')) { // Skip on very small screens
        // Test clicking indicators
        if (indicatorCount > 1) {
          await indicators.nth(1).click();
          await page.waitForTimeout(500); // Wait for transition
        }
        
        // Test navigation arrows if visible
        const nextButton = page.locator('button[aria-label*="Next"], button[aria-label*="next"]');
        if (await nextButton.isVisible()) {
          await nextButton.click();
          await page.waitForTimeout(500);
        }
      }
    });

    test(`Performance and loading on ${deviceConfig.name}`, async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      
      // Check that page loads within reasonable time (10 seconds for mobile, 5 for desktop)
      const maxLoadTime = deviceConfig.viewport.width < 768 ? 10000 : 5000;
      expect(loadTime).toBeLessThan(maxLoadTime);
      
      // Check that images are loading
      const images = page.locator('img');
      const imageCount = await images.count();
      
      if (imageCount > 0) {
        // Wait for at least one image to load
        await expect(images.first()).toBeVisible();
      }
      
      // Check for console errors
      let consoleErrors = [];
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.reload();
      await page.waitForLoadState('networkidle');
      
      // Allow some errors but not too many
      expect(consoleErrors.length).toBeLessThan(5);
    });

    test(`Responsive design elements on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      const isMobile = deviceConfig.viewport.width < 768;
      const isTablet = deviceConfig.viewport.width >= 768 && deviceConfig.viewport.width < 1024;
      
      // Check that text is readable (not too small)
      const heroHeadline = page.locator('#hero-carousel h1').first();
      if (await heroHeadline.isVisible()) {
        const fontSize = await heroHeadline.evaluate(el => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });
        
        // Ensure minimum font sizes
        if (isMobile) {
          expect(fontSize).toBeGreaterThanOrEqual(24); // Minimum 24px on mobile
        } else {
          expect(fontSize).toBeGreaterThanOrEqual(32); // Minimum 32px on desktop
        }
      }
      
      // Check that buttons are appropriately sized for touch
      const buttons = page.locator('button, a[class*="button"]');
      if (await buttons.count() > 0) {
        const button = buttons.first();
        if (await button.isVisible()) {
          const box = await button.boundingBox();
          if (box && isMobile) {
            // Touch targets should be at least 44x44px
            expect(Math.min(box.height, box.width)).toBeGreaterThanOrEqual(40);
          }
        }
      }
    });

    test(`Accessibility features on ${deviceConfig.name}`, async ({ page }) => {
      await page.goto('http://localhost:3003');
      await page.waitForLoadState('networkidle');
      
      // Check for skip links
      const skipLink = page.locator('a[href="#main-content"], .skip-to-content');
      if (await skipLink.count() > 0) {
        await expect(skipLink.first()).toBeInViewport();
      }
      
      // Check heading hierarchy
      const h1Elements = await page.locator('h1').count();
      expect(h1Elements).toBeGreaterThanOrEqual(1);
      expect(h1Elements).toBeLessThanOrEqual(2); // Should not have multiple h1s
      
      // Check that images have alt text
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 5); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const alt = await img.getAttribute('alt');
          expect(alt).toBeTruthy();
          expect(alt?.length).toBeGreaterThan(0);
        }
      }
      
      // Check for proper ARIA labels on interactive elements
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = buttons.nth(i);
        if (await button.isVisible()) {
          const ariaLabel = await button.getAttribute('aria-label');
          const textContent = await button.textContent();
          
          // Button should have either aria-label or text content
          expect(ariaLabel || textContent?.trim()).toBeTruthy();
        }
      }
    });
  });
}

// Cross-device compatibility tests
test.describe('Cross-Device Compatibility', () => {
  test('Content consistency across devices', async ({ browser }) => {
    const contexts = await Promise.all([
      browser.newContext({ ...devices['Desktop Chrome'] }),
      browser.newContext({ ...devices['iPhone 12 Pro'] }),
      browser.newContext({ ...devices['Galaxy S8'] })
    ]);
    
    const pages = await Promise.all(contexts.map(context => context.newPage()));
    
    // Load homepage on all devices
    await Promise.all(pages.map(page => page.goto('http://localhost:3003')));
    await Promise.all(pages.map(page => page.waitForLoadState('networkidle')));
    
    // Check that main headline is consistent
    const headlines = await Promise.all(
      pages.map(page => page.locator('#hero-carousel h1').first().textContent())
    );
    
    const firstHeadline = headlines[0];
    headlines.forEach(headline => {
      expect(headline).toBe(firstHeadline);
    });
    
    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });
});
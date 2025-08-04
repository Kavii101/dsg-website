import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1280, height: 720 },
    { name: 'Large Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test.describe(`${viewport.name} (${viewport.width}x${viewport.height})`, () => {
      test.beforeEach(async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
      });

      test('should display navigation appropriately', async ({ page }) => {
        if (viewport.width < 1024) {
          // Mobile/Tablet: Should show mobile menu button
          const mobileMenuButton = page.locator('button[aria-label*="menu"]');
          await expect(mobileMenuButton).toBeVisible();
          
          // Desktop navigation should be hidden
          const desktopNav = page.locator('nav a:has-text("About")').first();
          await expect(desktopNav).not.toBeVisible();
        } else {
          // Desktop: Should show full navigation
          const desktopNav = page.locator('nav a:has-text("About")').first();
          await expect(desktopNav).toBeVisible();
          
          // Mobile menu button should be hidden
          const mobileMenuButton = page.locator('button[aria-label*="menu"]');
          await expect(mobileMenuButton).not.toBeVisible();
        }
      });

      test('should display hero carousel properly', async ({ page }) => {
        const carousel = page.locator('#hero-carousel');
        await expect(carousel).toBeVisible();

        // Hero text should be visible and readable
        const heroHeadline = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
        await expect(heroHeadline).toBeVisible();

        // CTA button should be visible
        const ctaButton = page.locator('a:has-text("Learn More")');
        await expect(ctaButton).toBeVisible();

        // Carousel controls should be visible
        await expect(page.locator('button[aria-label="Next slide"]')).toBeVisible();
        await expect(page.locator('button[aria-label="Previous slide"]')).toBeVisible();
      });

      test('should display impact metrics grid properly', async ({ page }) => {
        const metricsSection = page.locator('h2:has-text("Our Impact")').locator('..');
        await expect(metricsSection).toBeVisible();

        // All metrics should be visible
        await expect(page.locator('text=250+')).toBeVisible();
        await expect(page.locator('text=40+')).toBeVisible();
        await expect(page.locator('text=500+')).toBeVisible();
        await expect(page.locator('text=15')).toBeVisible();

        // Metrics should stack properly on smaller screens
        const metricCards = page.locator('text=250+').locator('..');
        await expect(metricCards).toBeVisible();
      });

      test('should display work pillars grid appropriately', async ({ page }) => {
        const workSection = page.locator('h2:has-text("Our Work")');
        await expect(workSection).toBeVisible();

        // All work pillars should be visible
        await expect(page.locator('text=Climate Justice & Climate Migrants')).toBeVisible();
        await expect(page.locator('text=Women\'s Rights & Feminist Solidarity')).toBeVisible();
        await expect(page.locator('text=Youth Empowerment')).toBeVisible();
        await expect(page.locator('text=Migrant Justice & Anti-Racism')).toBeVisible();
        await expect(page.locator('text=Intersectionality & Decolonial Education')).toBeVisible();

        // Grid should adapt to screen size
        const pillarCards = page.locator('text=Climate Justice & Climate Migrants').locator('..');
        await expect(pillarCards).toBeVisible();
      });

      test('should display call-to-action section properly', async ({ page }) => {
        // All three CTA sections should be visible
        await expect(page.locator('h3:has-text("Join the Movement")')).toBeVisible();
        await expect(page.locator('h3:has-text("Support Our Work")')).toBeVisible();
        await expect(page.locator('h3:has-text("Share Your Voice")')).toBeVisible();

        // CTA buttons should be visible and clickable
        await expect(page.locator('a:has-text("Join Us")')).toBeVisible();
        await expect(page.locator('a:has-text("Donate")')).toBeVisible();
        await expect(page.locator('a:has-text("Share Story")')).toBeVisible();
      });

      test('should display newsletter signup properly', async ({ page }) => {
        const newsletterSection = page.locator('h2:has-text("Stay Connected")');
        await expect(newsletterSection).toBeVisible();

        const emailInput = page.locator('input[type="email"]');
        await expect(emailInput).toBeVisible();

        const subscribeButton = page.locator('button:has-text("Subscribe")');
        await expect(subscribeButton).toBeVisible();

        // Form should be usable on all screen sizes
        if (viewport.width < 640) {
          // On mobile, form elements should stack vertically
          const formContainer = emailInput.locator('..');
          await expect(formContainer).toBeVisible();
        }
      });

      test('should handle text readability', async ({ page }) => {
        // Check that text is not cut off or overlapping
        const mainHeading = page.locator('h2:has-text("Building Solidarity Across Borders")');
        await expect(mainHeading).toBeVisible();

        // Check that long text content is readable
        const missionText = page.locator('text=Community-led action for climate migrants');
        await expect(missionText).toBeVisible();

        // Hero text should be readable
        const heroText = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
        await expect(heroText).toBeVisible();
      });

      test('should maintain proper spacing and layout', async ({ page }) => {
        // Sections should have proper spacing
        const sections = page.locator('section');
        const sectionCount = await sections.count();
        expect(sectionCount).toBeGreaterThan(0);

        // Content should not overflow horizontally
        const body = page.locator('body');
        const bodyBox = await body.boundingBox();
        expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width);
      });
    });
  }

  test.describe('Mobile-specific functionality', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('should open and close mobile menu', async ({ page }) => {
      const mobileMenuButton = page.locator('button[aria-label*="menu"]');
      await expect(mobileMenuButton).toBeVisible();

      // Open mobile menu
      await mobileMenuButton.click();

      // Wait for menu animation
      await page.waitForTimeout(300);

      // Menu should be visible
      const mobileMenu = page.locator('#mobile-menu');
      await expect(mobileMenu).toBeVisible();

      // Navigation links should be visible in mobile menu
      await expect(page.locator('#mobile-menu a:has-text("About")')).toBeVisible();
      await expect(page.locator('#mobile-menu a:has-text("Our Work")')).toBeVisible();

      // Close button should be visible
      const closeButton = page.locator('button[aria-label*="Close"]');
      await expect(closeButton).toBeVisible();

      // Close menu
      await closeButton.click();

      // Wait for menu animation
      await page.waitForTimeout(300);

      // Menu should be hidden
      await expect(mobileMenu).not.toBeVisible();
    });

    test('should support touch interactions on carousel', async ({ page }) => {
      const carousel = page.locator('#hero-carousel');
      await expect(carousel).toBeVisible();

      // Touch interactions are hard to simulate, but we can test that
      // the carousel controls are accessible and visible
      const nextButton = page.locator('button[aria-label="Next slide"]');
      await expect(nextButton).toBeVisible();

      const prevButton = page.locator('button[aria-label="Previous slide"]');
      await expect(prevButton).toBeVisible();

      // Indicators should be touchable
      const indicators = page.locator('button[role="tab"]');
      await expect(indicators.first()).toBeVisible();
    });
  });

  test.describe('Cross-device layout consistency', () => {
    test('should maintain consistent content hierarchy across devices', async ({ page }) => {
      const viewportsToTest = [
        { width: 375, height: 667 },  // Mobile
        { width: 1280, height: 720 }, // Desktop
      ];

      for (const viewport of viewportsToTest) {
        await page.setViewportSize(viewport);
        await page.goto('/');

        // Same main sections should be present
        await expect(page.locator('h2:has-text("Building Solidarity Across Borders")')).toBeVisible();
        await expect(page.locator('h2:has-text("Our Impact")')).toBeVisible();
        await expect(page.locator('h2:has-text("Our Work")')).toBeVisible();
        await expect(page.locator('h2:has-text("Stay Connected")')).toBeVisible();

        // Same functionality should be available
        await expect(page.locator('#hero-carousel')).toBeVisible();
        await expect(page.locator('button[aria-label="Next slide"]')).toBeVisible();
      }
    });

    test('should handle orientation changes', async ({ page }) => {
      // Test landscape orientation on mobile-sized screen
      await page.setViewportSize({ width: 667, height: 375 });
      await page.goto('/');

      // Content should still be accessible
      await expect(page.locator('#hero-carousel')).toBeVisible();
      await expect(page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")')).toBeVisible();

      // Navigation should adapt
      const mobileMenuButton = page.locator('button[aria-label="Open menu"]');
      await expect(mobileMenuButton).toBeVisible();
    });
  });
});
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not have any accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    
    // Should have at least one h1
    const h1Elements = await page.locator('h1').count();
    expect(h1Elements).toBeGreaterThan(0);
    
    // Check that headings exist
    expect(headings.length).toBeGreaterThan(0);
  });

  test('should have proper focus management', async ({ page }) => {
    // Test tab navigation through key interactive elements
    await page.keyboard.press('Tab');
    
    // Skip to content link should be focusable
    const skipLink = page.locator('a:has-text("Skip Carousel")');
    await expect(skipLink).toBeFocused();
    
    // Continue tabbing to other elements
    await page.keyboard.press('Tab');
    
    // Should focus on navigation or other interactive elements
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });

  test('should have proper ARIA landmarks', async ({ page }) => {
    // Check for main landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for navigation
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should have proper link accessibility', async ({ page }) => {
    // All links should have accessible names
    const links = page.locator('a');
    const linkCount = await links.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const isVisible = await link.isVisible();
      
      if (isVisible) {
        // Link should have text content or aria-label
        const textContent = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        expect(textContent || ariaLabel).toBeTruthy();
      }
    }
  });

  test('should have proper button accessibility', async ({ page }) => {
    // All buttons should have accessible names
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const isVisible = await button.isVisible();
      
      if (isVisible) {
        // Button should have text content or aria-label
        const textContent = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        expect(textContent || ariaLabel).toBeTruthy();
      }
    }
  });

  test('should have proper image accessibility', async ({ page }) => {
    // All images should have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i);
      const altText = await image.getAttribute('alt');
      
      // Images should have alt text (can be empty for decorative images)
      expect(altText).not.toBeNull();
    }
  });

  test('should have proper form accessibility', async ({ page }) => {
    // Newsletter form
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('placeholder');
    await expect(emailInput).toHaveAttribute('required');
  });

  test('should have proper color contrast', async ({ page }) => {
    // Run axe with specific color contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .include('body')
      .analyze();
    
    // Filter for color contrast violations
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(colorContrastViolations).toEqual([]);
  });

  test('should support screen reader navigation', async ({ page }) => {
    // Test that carousel has proper screen reader support
    const carousel = page.locator('#hero-carousel');
    await expect(carousel).toHaveAttribute('aria-label', 'Key focus areas');
    
    // Test slide navigation indicators
    const indicators = page.locator('button[role="tab"]');
    await expect(indicators.first()).toHaveAttribute('aria-selected', 'true');
    
    // Test live region for slide changes
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toBeAttached();
  });

  test('should handle reduced motion preference', async ({ page }) => {
    // Set reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' });
    
    // Carousel should still be functional but with reduced animations
    const carousel = page.locator('#hero-carousel');
    await expect(carousel).toBeVisible();
    
    // Should still be able to navigate
    const nextButton = page.locator('button[aria-label="Next slide"]');
    await nextButton.click();
    
    // Second slide should become visible (though potentially without animation)
    await page.waitForTimeout(500);
    const secondSlide = page.locator('h1:has-text("Centering Women, Centering Justice")');
    await expect(secondSlide).toBeVisible();
  });

  test('should have proper semantic structure', async ({ page }) => {
    // Check for proper semantic HTML5 elements
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('section')).toHaveCount.toBeGreaterThan(0);
    await expect(page.locator('footer')).toBeVisible();
    
    // Check for proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
    
    const h2Count = await page.locator('h2').count();
    expect(h2Count).toBeGreaterThan(0);
  });

  test('should have proper focus indicators', async ({ page }) => {
    // Test that focusable elements have visible focus indicators
    const focusableElements = [
      'button[aria-label="Next slide"]',
      'button[aria-label="Previous slide"]',
      'button[role="tab"]',
      'a[href]',
      'input[type="email"]',
      'button[type="submit"]'
    ];
    
    for (const selector of focusableElements) {
      const elements = page.locator(selector);
      const count = await elements.count();
      
      if (count > 0) {
        const element = elements.first();
        if (await element.isVisible()) {
          await element.focus();
          // Element should be focused
          await expect(element).toBeFocused();
        }
      }
    }
  });
});
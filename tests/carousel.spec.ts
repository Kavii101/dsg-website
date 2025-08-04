import { test, expect } from '@playwright/test';

test.describe('Hero Carousel Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for carousel to be ready
    await page.waitForSelector('#hero-carousel');
  });

  test('should display first slide initially', async ({ page }) => {
    // First slide should be visible
    const firstSlide = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
    await expect(firstSlide).toBeVisible();

    // First indicator should be selected
    const firstIndicator = page.locator('button[role="tab"]').first();
    await expect(firstIndicator).toHaveAttribute('aria-selected', 'true');
  });

  test('should navigate to next slide when next button is clicked', async ({ page }) => {
    const nextButton = page.locator('button[aria-label="Next slide"]');
    
    // Click next button
    await nextButton.click();
    
    // Wait for transition
    await page.waitForTimeout(500);
    
    // Second slide should be visible
    const secondSlide = page.locator('h1:has-text("Centering Women, Centering Justice")');
    await expect(secondSlide).toBeVisible();
    
    // Second indicator should be selected
    const indicators = page.locator('button[role="tab"]');
    const secondIndicator = indicators.nth(1);
    await expect(secondIndicator).toHaveAttribute('aria-selected', 'true');
  });

  test('should navigate to previous slide when previous button is clicked', async ({ page }) => {
    const nextButton = page.locator('button[aria-label="Next slide"]');
    const prevButton = page.locator('button[aria-label="Previous slide"]');
    
    // Go to second slide first
    await nextButton.click();
    await page.waitForTimeout(500);
    
    // Then go back to first slide
    await prevButton.click();
    await page.waitForTimeout(500);
    
    // First slide should be visible again
    const firstSlide = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
    await expect(firstSlide).toBeVisible();
  });

  test('should navigate using indicator buttons', async ({ page }) => {
    const indicators = page.locator('button[role="tab"]');
    
    // Click third indicator
    await indicators.nth(2).click();
    await page.waitForTimeout(500);
    
    // Third slide should be visible
    const thirdSlide = page.locator('h1:has-text("Youth Voices, Lasting Change")');
    await expect(thirdSlide).toBeVisible();
    
    // Third indicator should be selected
    await expect(indicators.nth(2)).toHaveAttribute('aria-selected', 'true');
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Focus on the carousel
    await page.locator('#hero-carousel').click();
    
    // Press right arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(500);
    
    // Second slide should be visible
    const secondSlide = page.locator('h1:has-text("Centering Women, Centering Justice")');
    await expect(secondSlide).toBeVisible();
    
    // Press left arrow key
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    
    // First slide should be visible again
    const firstSlide = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
    await expect(firstSlide).toBeVisible();
  });

  test('should cycle through all slides with next button', async ({ page }) => {
    const nextButton = page.locator('button[aria-label="Next slide"]');
    const slideHeadlines = [
      'Climate Displacement Isn\'t Inevitable',
      'Centering Women, Centering Justice',
      'Youth Voices, Lasting Change',
      'Justice Without Borders: Stand With Migrants',
      'Unlearn, Relearn, Together'
    ];
    
    // Test each slide
    for (let i = 0; i < slideHeadlines.length; i++) {
      const slideHeadline = page.locator(`h1:has-text("${slideHeadlines[i]}")`);
      await expect(slideHeadline).toBeVisible();
      
      // Click next (except on last slide)
      if (i < slideHeadlines.length - 1) {
        await nextButton.click();
        await page.waitForTimeout(500);
      }
    }
    
    // Click next on last slide should go to first
    await nextButton.click();
    await page.waitForTimeout(500);
    
    const firstSlide = page.locator(`h1:has-text("${slideHeadlines[0]}")`);
    await expect(firstSlide).toBeVisible();
  });

  test('should display correct content for each slide', async ({ page }) => {
    const slideContent = [
      {
        headline: 'Climate Displacement Isn\'t Inevitable',
        cta: 'Learn More',
        badge: 'Ongoing Initiative'
      },
      {
        headline: 'Centering Women, Centering Justice',
        cta: 'Get Involved',
        badge: 'Coming 2025'
      },
      {
        headline: 'Youth Voices, Lasting Change',
        cta: 'Share Your Story',
        badge: 'Youth-Led'
      },
      {
        headline: 'Justice Without Borders: Stand With Migrants',
        cta: 'Take Action',
        badge: 'Rights & Advocacy'
      },
      {
        headline: 'Unlearn, Relearn, Together',
        cta: 'Discover Resources',
        badge: 'Learn & Share'
      }
    ];
    
    const indicators = page.locator('button[role="tab"]');
    
    for (let i = 0; i < slideContent.length; i++) {
      // Navigate to slide
      await indicators.nth(i).click();
      await page.waitForTimeout(500);
      
      // Check content
      const slide = slideContent[i];
      await expect(page.locator(`h1:has-text("${slide.headline}")`)).toBeVisible();
      await expect(page.locator(`a:has-text("${slide.cta}")`)).toBeVisible();
      await expect(page.locator(`text=${slide.badge}`)).toBeVisible();
    }
  });

  test('should pause auto-play on hover', async ({ page }) => {
    // Wait for auto-play to potentially start
    await page.waitForTimeout(1000);
    
    // Hover over carousel
    await page.locator('#hero-carousel').hover();
    
    // Wait longer than auto-play interval
    await page.waitForTimeout(8000);
    
    // Should still be on first slide (auto-play paused)
    const firstSlide = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
    await expect(firstSlide).toBeVisible();
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    const carousel = page.locator('#hero-carousel');
    await expect(carousel).toHaveAttribute('aria-label', 'Key focus areas');
    
    // Check indicators have proper roles
    const indicators = page.locator('button[role="tab"]');
    await expect(indicators).toHaveCount(5);
    
    // Check first indicator is selected
    await expect(indicators.first()).toHaveAttribute('aria-selected', 'true');
    
    // Check slides have proper attributes
    const slides = page.locator('[role="group"][aria-roledescription="slide"]');
    await expect(slides).toHaveCount(5);
  });

  test('should display images with proper alt text', async ({ page }) => {
    // Check that images are present and have alt text
    const carouselImages = page.locator('#hero-carousel img');
    const imageCount = await carouselImages.count();
    
    // Should have at least one image visible
    expect(imageCount).toBeGreaterThan(0);
    
    // Check first image has alt text
    const firstImage = carouselImages.first();
    const altText = await firstImage.getAttribute('alt');
    expect(altText).toBeTruthy();
    expect(altText?.length).toBeGreaterThan(10); // Should have descriptive alt text
  });

  test('should have skip carousel link for accessibility', async ({ page }) => {
    // Skip carousel link should exist (even if hidden)
    const skipLink = page.locator('a:has-text("Skip Carousel")');
    await expect(skipLink).toBeAttached();
    await expect(skipLink).toHaveAttribute('href', '#main-content');
  });
});
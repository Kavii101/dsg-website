import { test, expect } from '@playwright/test';

test.describe('DSG Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct page title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Diaspora Solidarity Group/i);
    
    // Check for SEO meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toBeAttached();
  });

  test('should display navigation header', async ({ page }) => {
    // Check logo
    const logo = page.locator('img[alt="DSG Logo"]');
    await expect(logo).toBeVisible();

    // On desktop, check navigation links are present (they may be hidden on mobile)
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width >= 1024) {
      await expect(page.locator('nav a:has-text("About")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Our Work")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Projects & Events")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Resources")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Get Involved")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Share Your Voice")')).toBeVisible();
      await expect(page.locator('nav a:has-text("Contact")')).toBeVisible();

      // Check CTA buttons on desktop
      await expect(page.locator('a:has-text("Join")')).toBeVisible();
      await expect(page.locator('a:has-text("Support")')).toBeVisible();
    } else {
      // On mobile, check for mobile menu button
      await expect(page.locator('button[aria-label*="menu"]')).toBeVisible();
    }
  });

  test('should display hero carousel', async ({ page }) => {
    // Check carousel container
    const carousel = page.locator('#hero-carousel');
    await expect(carousel).toBeVisible();

    // Check first slide is visible
    const firstSlide = page.locator('h1:has-text("Climate Displacement Isn\'t Inevitable")');
    await expect(firstSlide).toBeVisible();

    // Check carousel controls
    await expect(page.locator('button[aria-label="Previous slide"]')).toBeVisible();
    await expect(page.locator('button[aria-label="Next slide"]')).toBeVisible();

    // Check indicators
    const indicators = page.locator('button[role="tab"]');
    await expect(indicators).toHaveCount(5);
  });

  test('should display mission snapshot section', async ({ page }) => {
    const missionSection = page.locator('text=Building Solidarity Across Borders');
    await expect(missionSection).toBeVisible();

    const missionDescription = page.locator('text=Community-led action for climate migrants');
    await expect(missionDescription).toBeVisible();
  });

  test('should display featured campaign section', async ({ page }) => {
    const campaignTitle = page.locator('h2:has-text("2025: Year of Feminist Futures")');
    await expect(campaignTitle).toBeVisible();

    const campaignBadge = page.locator('text=Current Focus');
    await expect(campaignBadge).toBeVisible();

    const campaignCTA = page.locator('a:has-text("Learn About Our 2025 Initiatives")');
    await expect(campaignCTA).toBeVisible();
    await expect(campaignCTA).toHaveAttribute('href', '/work/feminist-solidarity');
  });

  test('should display impact metrics section', async ({ page }) => {
    const impactTitle = page.locator('h2:has-text("Our Impact")');
    await expect(impactTitle).toBeVisible();

    // Check all impact metrics
    await expect(page.locator('text=250+')).toBeVisible();
    await expect(page.locator('text=Community voices amplified')).toBeVisible();
    
    await expect(page.locator('text=40+')).toBeVisible();
    await expect(page.locator('text=International partners')).toBeVisible();
    
    await expect(page.locator('text=500+')).toBeVisible();
    await expect(page.locator('text=Youth trained')).toBeVisible();
    
    await expect(page.locator('text=15')).toBeVisible();
    await expect(page.locator('text=Toolkits published')).toBeVisible();
  });

  test('should display our work section with all pillars', async ({ page }) => {
    const workTitle = page.locator('h2:has-text("Our Work")');
    await expect(workTitle).toBeVisible();

    // Check all 5 work pillars
    await expect(page.locator('text=Climate Justice & Climate Migrants')).toBeVisible();
    await expect(page.locator('text=Women\'s Rights & Feminist Solidarity')).toBeVisible();
    await expect(page.locator('text=Youth Empowerment')).toBeVisible();
    await expect(page.locator('text=Migrant Justice & Anti-Racism')).toBeVisible();
    await expect(page.locator('text=Intersectionality & Decolonial Education')).toBeVisible();

    // Check explore links
    const exploreLinks = page.locator('a:has-text("Explore")');
    await expect(exploreLinks).toHaveCount(5);
  });

  test('should display call-to-action trio', async ({ page }) => {
    // Check section headings
    await expect(page.locator('h3:has-text("Join the Movement")')).toBeVisible();
    await expect(page.locator('h3:has-text("Support Our Work")')).toBeVisible();
    await expect(page.locator('h3:has-text("Share Your Voice")')).toBeVisible();

    // Check CTA buttons
    await expect(page.locator('a:has-text("Join Us")')).toBeVisible();
    await expect(page.locator('a:has-text("Donate")')).toBeVisible();
    await expect(page.locator('a:has-text("Share Story")')).toBeVisible();

    // Check button links
    await expect(page.locator('a:has-text("Join Us")')).toHaveAttribute('href', '/get-involved/join');
    await expect(page.locator('a:has-text("Donate")')).toHaveAttribute('href', '/get-involved/support');
    await expect(page.locator('a:has-text("Share Story")')).toHaveAttribute('href', '/share-your-voice');
  });

  test('should display newsletter signup section', async ({ page }) => {
    const newsletterTitle = page.locator('h2:has-text("Stay Connected")');
    await expect(newsletterTitle).toBeVisible();

    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await expect(emailInput).toHaveAttribute('placeholder', 'Enter your email');

    const subscribeButton = page.locator('button:has-text("Subscribe")');
    await expect(subscribeButton).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const copyright = page.locator('text=© 2024 Diaspora Solidarity Group');
    await expect(copyright).toBeVisible();
  });

  test('should have proper semantic HTML structure', async ({ page }) => {
    // Check main landmarks
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();

    // Check heading hierarchy
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    
    const h2Elements = page.locator('h2');
    await expect(h2Elements).toHaveCount.toBeGreaterThan(0);
  });
});
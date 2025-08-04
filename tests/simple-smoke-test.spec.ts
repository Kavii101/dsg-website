import { test, expect } from '@playwright/test';

test.describe('DSG Website Smoke Tests', () => {
  test('Homepage loads successfully', async ({ page }) => {
    try {
      await page.goto('http://localhost:3003', { timeout: 15000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check if hero carousel is present
      await expect(page.locator('#hero-carousel')).toBeVisible({ timeout: 5000 });
      
      // Check main navigation
      await expect(page.locator('nav')).toBeVisible();
      
      // Check main content
      await expect(page.locator('#main-content')).toBeVisible();
      
      console.log('✅ Homepage loaded successfully');
      
    } catch (error) {
      console.error('❌ Homepage failed to load:', error.message);
      throw error;
    }
  });

  test('About page loads successfully', async ({ page }) => {
    try {
      await page.goto('http://localhost:3003/about', { timeout: 15000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check page title
      await expect(page.locator('h1')).toContainText('About Diaspora Solidarity Group');
      
      // Check main sections
      await expect(page.locator('text=Our Mission')).toBeVisible();
      await expect(page.locator('text=Our Values')).toBeVisible();
      
      console.log('✅ About page loaded successfully');
      
    } catch (error) {
      console.error('❌ About page failed to load:', error.message);
      throw error;
    }
  });

  test('Work page loads successfully', async ({ page }) => {
    try {
      await page.goto('http://localhost:3003/work', { timeout: 15000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check page title
      await expect(page.locator('h1')).toContainText('Our Work');
      
      // Check work pillars
      await expect(page.locator('text=Areas of Impact')).toBeVisible();
      
      console.log('✅ Work page loaded successfully');
      
    } catch (error) {
      console.error('❌ Work page failed to load:', error.message);
      throw error;
    }
  });

  test('Mobile viewport rendering', async ({ page }) => {
    try {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      await page.goto('http://localhost:3003', { timeout: 15000 });
      await page.waitForLoadState('networkidle', { timeout: 10000 });
      
      // Check hero is visible on mobile
      await expect(page.locator('#hero-carousel')).toBeVisible();
      
      // Check navigation exists
      await expect(page.locator('nav')).toBeVisible();
      
      // Take mobile screenshot
      await page.screenshot({ 
        path: 'tests/screenshots/mobile-smoke-test.png',
        fullPage: true
      });
      
      console.log('✅ Mobile viewport rendered successfully');
      
    } catch (error) {
      console.error('❌ Mobile viewport failed:', error.message);
      throw error;
    }
  });
});
import { test } from '@playwright/test';

test('Take screenshot to check current state', async ({ page }) => {
  try {
    await page.goto('http://localhost:3003', { timeout: 15000 });
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Take screenshot of current state
    await page.screenshot({ 
      path: 'tests/screenshots/current-homepage-state.png',
      fullPage: true
    });
    
    console.log('✅ Screenshot taken successfully');
    
  } catch (error) {
    console.error('❌ Screenshot failed:', error.message);
    throw error;
  }
});
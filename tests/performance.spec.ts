import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('should meet Core Web Vitals thresholds', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Measure Web Vitals using JavaScript
    const webVitals = await page.evaluate(() => {
      return new Promise((resolve) => {
        const vitals: any = {};
        
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          vitals.lcp = lastEntry.startTime;
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay would require actual user interaction
        // We'll measure it differently in a separate test
        
        // Cumulative Layout Shift (CLS)
        let cls = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cls += (entry as any).value;
            }
          }
          vitals.cls = cls;
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Give some time for measurements
        setTimeout(() => {
          resolve(vitals);
        }, 3000);
      });
    });
    
    console.log('Web Vitals:', webVitals);
    
    // Core Web Vitals thresholds (good values)
    // LCP should be < 2.5s (2500ms)
    if ((webVitals as any).lcp) {
      expect((webVitals as any).lcp).toBeLessThan(2500);
    }
    
    // CLS should be < 0.1
    if ((webVitals as any).cls) {
      expect((webVitals as any).cls).toBeLessThan(0.1);
    }
  });

  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const loadTime = Date.now() - startTime;
    
    // Page should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that images are using next/image optimization
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      // Check first few images for optimization attributes
      for (let i = 0; i < Math.min(3, imageCount); i++) {
        const img = images.nth(i);
        const src = await img.getAttribute('src');
        
        // Next.js optimized images should have specific URL patterns
        // or be properly sized
        if (src && !src.startsWith('data:')) {
          const width = await img.getAttribute('width');
          const height = await img.getAttribute('height');
          
          // Images should have dimensions specified for layout stability
          expect(width || height).toBeTruthy();
        }
      }
    }
  });

  test('should minimize layout shifts', async ({ page }) => {
    await page.goto('/');
    
    // Measure CLS specifically
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cumulativeShift = 0;
        
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              cumulativeShift += (entry as any).value;
            }
          }
        }).observe({ entryTypes: ['layout-shift'] });
        
        // Wait for potential layout shifts during initial load
        setTimeout(() => {
          resolve(cumulativeShift);
        }, 5000);
      });
    });
    
    // CLS should be minimal (< 0.1 is good, < 0.05 is excellent)
    expect(cls).toBeLessThan(0.1);
  });

  test('should have fast carousel transitions', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero-carousel');
    
    const nextButton = page.locator('button[aria-label="Next slide"]');
    
    // Measure transition time
    const startTime = Date.now();
    await nextButton.click();
    
    // Wait for the transition to complete
    await page.waitForTimeout(500); // Our transition duration
    
    const transitionTime = Date.now() - startTime;
    
    // Transition should be smooth and quick (< 1 second)
    expect(transitionTime).toBeLessThan(1000);
    
    // Check that the next slide is visible
    const secondSlide = page.locator('h1:has-text("Centering Women, Centering Justice")');
    await expect(secondSlide).toBeVisible();
  });

  test('should handle multiple rapid interactions', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero-carousel');
    
    const nextButton = page.locator('button[aria-label="Next slide"]');
    
    // Click rapidly multiple times
    for (let i = 0; i < 5; i++) {
      await nextButton.click();
      await page.waitForTimeout(100); // Small delay between clicks
    }
    
    // Page should still be responsive
    await expect(page.locator('#hero-carousel')).toBeVisible();
    
    // Should have a valid slide showing
    const slides = [
      'Climate Displacement Isn\'t Inevitable',
      'Centering Women, Centering Justice',
      'Youth Voices, Lasting Change',
      'Justice Without Borders: Stand With Migrants',
      'Unlearn, Relearn, Together'
    ];
    
    let slideFound = false;
    for (const slideText of slides) {
      const slide = page.locator(`h1:has-text("${slideText}")`);
      if (await slide.isVisible()) {
        slideFound = true;
        break;
      }
    }
    
    expect(slideFound).toBe(true);
  });

  test('should have efficient resource loading', async ({ page }) => {
    // Start monitoring network requests
    const resourceTimings: any[] = [];
    
    page.on('response', (response) => {
      resourceTimings.push({
        url: response.url(),
        status: response.status(),
        size: response.headers()['content-length'],
        type: response.headers()['content-type']
      });
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for successful resource loading
    const failedResources = resourceTimings.filter(r => r.status >= 400);
    expect(failedResources.length).toBe(0);
    
    // Check that we're not loading excessive resources
    const totalResources = resourceTimings.length;
    expect(totalResources).toBeLessThan(50); // Reasonable limit for initial page load
  });

  test('should maintain performance on slower networks', async ({ page }) => {
    // Simulate slow 3G connection
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });
    
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForSelector('h1'); // Wait for main content
    
    const loadTime = Date.now() - startTime;
    
    // Even on slow connection, should load core content within reasonable time
    expect(loadTime).toBeLessThan(8000); // 8 seconds for slow connection
    
    // Core content should be visible
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should handle memory efficiently during carousel usage', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('#hero-carousel');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });
    
    // Cycle through carousel multiple times
    const nextButton = page.locator('button[aria-label="Next slide"]');
    
    for (let i = 0; i < 20; i++) {
      await nextButton.click();
      await page.waitForTimeout(300);
    }
    
    // Check memory usage after cycling
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0;
    });
    
    // Memory shouldn't increase dramatically (allowing for reasonable growth)
    if (initialMemory > 0 && finalMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      const percentIncrease = (memoryIncrease / initialMemory) * 100;
      
      // Memory increase should be reasonable (< 50% for this test)
      expect(percentIncrease).toBeLessThan(50);
    }
  });
});
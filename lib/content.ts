// Static content that can be imported directly
// This approach works on both server and client side

import heroSlides from '../content/hero/slides.json';
import homepageContent from '../content/sections/homepage.json';
import navigationMenu from '../content/navigation/menu.json';
import siteSettings from '../content/settings/site.json';
import aboutPageContent from '../content/pages/about.json';
import workPillarsContent from '../content/pages/work-pillars.json';

export function getHeroSlides() {
  return heroSlides.hero_slides || [];
}

export function getHomepageContent() {
  return homepageContent;
}

export function getNavigationMenu() {
  return navigationMenu;
}

export function getSiteSettings() {
  return siteSettings;
}

export function getAboutPageContent() {
  return aboutPageContent;
}

export function getWorkPillarContent(pillar: string) {
  return (workPillarsContent as any)[pillar] || null;
}

// Helper function to safely get nested content
export function getContent(obj: any, path: string, defaultValue: any = '') {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
}
// Content Management System - Automatically loads content from files
import fs from 'fs';
import path from 'path';

const contentDir = path.join(process.cwd(), 'content');

export function loadHeroSlides() {
  try {
    const filePath = path.join(contentDir, 'hero', 'slides.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return data.hero_slides;
  } catch (error) {
    console.error('Error loading hero slides:', error);
    return [];
  }
}

export function loadHomepageContent() {
  try {
    const filePath = path.join(contentDir, 'sections', 'homepage.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading homepage content:', error);
    return {};
  }
}

export function loadNavigationMenu() {
  try {
    const filePath = path.join(contentDir, 'navigation', 'menu.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading navigation menu:', error);
    return { main_navigation: [], cta_buttons: [] };
  }
}

export function loadSiteSettings() {
  try {
    const filePath = path.join(contentDir, 'settings', 'site.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading site settings:', error);
    return {};
  }
}

// Helper function to safely get nested content
export function getContent(obj: any, path: string, defaultValue: any = '') {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : defaultValue;
  }, obj);
}
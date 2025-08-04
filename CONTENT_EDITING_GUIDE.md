# DSG Website Content Editing Guide

## Overview
Your website content is now organized in easy-to-edit JSON files. Simply edit these files to update your website content automatically!

## Content Folders Structure

```
content/
├── hero/           # Carousel slides at top of homepage
├── sections/       # All homepage content sections  
├── navigation/     # Menu items and buttons
├── settings/       # Site information and branding
└── pages/          # Individual page content (About, Work pillars)
```

## How to Edit Content

### 1. Hero Carousel Slides
**File:** `content/hero/slides.json`

Edit the carousel slides that appear at the top of your homepage:

```json
{
  "hero_slides": [
    {
      "id": 1,
      "title": "Climate Justice & Climate Migrants",
      "headline": "Your custom headline here",
      "subtext": "Your description text here",
      "button_text": "Learn More",
      "button_link": "/work/climate-justice",
      "badge": "Ongoing Initiative",
      "story": "Personal story quote here",
      "image": "hero-climate.jpg"
    }
  ]
}
```

**What you can change:**
- `headline`: Main title text
- `subtext`: Description paragraph
- `button_text`: Button label
- `button_link`: Page button links to
- `badge`: Small tag text
- `story`: Personal story quote

**Image specifications:**
- **Size**: 1200x800 pixels minimum
- **Format**: JPG, PNG, or WebP
- **Quality**: High resolution for sharp display
- **Content**: High-contrast images work best with overlay text
- **Accessibility**: Images should have meaningful content that complements the text

### 2. Homepage Sections
**File:** `content/sections/homepage.json`

Edit all the main content sections on your homepage:

#### Mission Section
```json
{
  "mission_section": {
    "title": "Building Solidarity Across Borders",
    "description": "Your mission description here..."
  }
}
```

#### Featured Campaign
```json
{
  "featured_campaign": {
    "badge": "Current Focus",
    "title": "2025: Year of Feminist Futures", 
    "description": "Campaign description...",
    "button_text": "Learn More",
    "button_link": "/work/feminist-solidarity"
  }
}
```

#### Impact Metrics
```json
{
  "impact_metrics": {
    "title": "Our Impact",
    "metrics": [
      {
        "number": "250+",
        "label": "Community voices amplified",
        "icon": "megaphone"
      }
    ]
  }
}
```

Available icons: `megaphone`, `globe`, `users`, `book`

#### Call to Action Sections
```json
{
  "call_to_action": {
    "sections": [
      {
        "icon": "heart",
        "title": "Join the Movement",
        "description": "Be part of our collective...",
        "button_text": "Join Us",
        "button_link": "/get-involved/join"
      }
    ]
  }
}
```

Available icons: `heart`, `users`, `megaphone`

#### Newsletter Section
```json
{
  "newsletter": {
    "title": "Stay Connected",
    "description": "Get updates on our work...",
    "button_text": "Subscribe",
    "placeholder": "Enter your email"
  }
}
```

### 3. Navigation Menu
**File:** `content/navigation/menu.json`

Edit your website menu and buttons:

```json
{
  "main_navigation": [
    {
      "label": "About",
      "link": "/about"
    }
  ],
  "cta_buttons": [
    {
      "type": "secondary",
      "label": "Join", 
      "link": "/get-involved/join"  
    },
    {
      "type": "primary",
      "label": "Support",
      "link": "/get-involved/support"
    }
  ]
}
```

Button types: `primary` (blue), `secondary` (outlined)

### 4. About Page Content
**File:** `content/pages/about.json`

Edit all content on your About page:

```json
{
  "hero_section": {
    "title": "About Diaspora Solidarity Group",
    "subtitle": "Building bridges across borders through community-led action",
    "description": "Your description here..."
  },
  "mission_section": {
    "title": "Our Mission",
    "content": "Your mission statement here..."
  },
  "values_section": {
    "title": "Our Values",
    "values": [
      {
        "title": "Community-Led Action",
        "description": "Your value description...",
        "icon": "users"
      }
    ]
  },
  "team_section": {
    "team_members": [
      {
        "name": "Your Name",
        "role": "Your Role",
        "bio": "Your bio...",
        "image": "team-member.jpg"
      }
    ]
  }
}
```

### 5. Work Pillar Pages
**File:** `content/pages/work-pillars.json`

Edit content for all five work pillar pages (Climate Justice, Feminist Solidarity, Youth Empowerment, Migrant Justice, Decolonial Education):

```json
{
  "climate-justice": {
    "hero": {
      "title": "Climate Justice & Climate Migrants",
      "subtitle": "Your subtitle here...",
      "description": "Your description..."
    },
    "key_initiatives": [
      {
        "title": "Initiative Name",
        "description": "Initiative description...",
        "status": "Ongoing"
      }
    ],
    "impact_stories": [
      {
        "quote": "Your impact story quote...",
        "author": "Story Author",
        "location": "Location"
      }
    ]
  }
}
```

Available work pillars:
- `climate-justice`
- `feminist-solidarity`
- `youth-empowerment`
- `migrant-justice`
- `decolonial-education`

### 6. Site Settings
**File:** `content/settings/site.json`

Edit your basic site information:

```json
{
  "site_info": {
    "name": "Diaspora Solidarity Group",
    "short_name": "DSG", 
    "tagline": "Building Solidarity Across Borders",
    "description": "Community-led action for...",
    "email": "info@diasporasolidarity.org",
    "website": "https://diasporasolidarity.org"
  },
  "social_media": {
    "instagram": "https://www.instagram.com/diasporasolidarity",
    "facebook": "https://www.facebook.com/diasporasolidarity"
  },
  "brand_colors": {
    "primary_blue": "#0099CC",
    "primary_pink": "#E91E63"
  }
}
```

## Quick Editing Tips

### ✅ Do's
- Always use quotes around text values
- Keep the JSON structure intact (brackets, commas)
- Test links to make sure they work
- Keep text concise and impactful
- Save your file after making changes

### ❌ Don'ts  
- Don't remove the commas between items
- Don't remove the quotation marks
- Don't delete the brackets `{}` or `[]`
- Don't use special characters that might break formatting

## Making Changes Take Effect

1. **Edit the JSON file** - Make your changes and save
2. **Refresh your website** - The changes should appear automatically
3. **Check your work** - Make sure everything looks correct

## Getting Help

If you run into issues:
1. Check that your JSON formatting is correct
2. Make sure all quotes and commas are in place  
3. Refresh your browser to see changes
4. Contact your developer if you need assistance with technical issues

## Common Edits

### Updating a Hero Slide Headline
```json
"headline": "Your New Headline Here"
```

### Changing Navigation Menu Item
```json
{
  "label": "New Menu Item",
  "link": "/new-page"
}
```

### Updating Contact Information
```json
{
  "email": "newemail@diasporasolidarity.org"
}
```

### Adding Social Media Links
```json
{
  "twitter": "https://twitter.com/youraccount",
  "linkedin": "https://linkedin.com/company/youraccount"
}
```

---

*This content management system allows you to easily update your website content without touching any code. Simply edit the JSON files and your changes will appear on the website automatically!*
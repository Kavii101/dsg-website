# DSG Website Project Structure

## 📁 Content Files (Edit These!)
These are the files you'll edit to update your website content:

```
content/
├── hero/slides.json          📝 Hero carousel slides
├── sections/homepage.json    📝 Homepage content sections
├── navigation/menu.json      📝 Navigation menu & buttons
└── settings/site.json        📝 Site info & branding
```

## 📁 Website Files (Don't Edit)
These files make your website work - no need to edit these:

```
app/                          🏗️ Website pages
components/                   🧩 Website building blocks
lib/                         ⚙️ Website functionality
public/                      🖼️ Images and static files
styles/                      🎨 Website styling
```

## 🔧 Configuration Files (Don't Edit)
```
package.json                 📦 Project dependencies
next.config.ts              ⚙️ Website configuration
tailwind.config.ts          🎨 Styling configuration
tsconfig.json               🔧 TypeScript configuration
```

## 📚 Documentation Files
```
CONTENT_EDITING_GUIDE.md    📖 How to edit your content
PROJECT_STRUCTURE.md        📋 This file - project overview
README.md                   ℹ️ Technical project information
```

## 🚀 Quick Start Guide

### To Edit Your Website:
1. **Open the `content/` folder**
2. **Edit the JSON files** using any text editor
3. **Save your changes**
4. **Refresh your website** to see updates

### Main Content Files:

#### 🎠 Hero Carousel
**File:** `content/hero/slides.json`
- Edit the rotating slides at the top of your homepage
- Change headlines, descriptions, buttons, and stories

#### 📄 Homepage Sections  
**File:** `content/sections/homepage.json`
- Mission statement
- Featured campaigns
- Impact metrics
- Call-to-action sections
- Newsletter signup

#### 🧭 Navigation
**File:** `content/navigation/menu.json`
- Main menu items
- Header buttons (Join/Support)

#### ⚙️ Site Settings
**File:** `content/settings/site.json`
- Organization name and info
- Contact information
- Social media links
- Brand colors

## 🎯 Common Tasks

| What You Want to Do | File to Edit | Section |
|---------------------|--------------|---------|
| Change hero slide headline | `content/hero/slides.json` | `headline` |
| Update mission statement | `content/sections/homepage.json` | `mission_section` |
| Add new menu item | `content/navigation/menu.json` | `main_navigation` |
| Change contact email | `content/settings/site.json` | `site_info.email` |
| Update impact numbers | `content/sections/homepage.json` | `impact_metrics` |
| Modify call-to-action | `content/sections/homepage.json` | `call_to_action` |

## 📞 Need Help?

1. **For content editing:** See `CONTENT_EDITING_GUIDE.md`
2. **Technical issues:** Contact your developer
3. **Website not updating:** Try refreshing your browser

---

*Your website is now fully set up with an easy content management system. Just edit the JSON files in the `content/` folder and your changes will appear automatically on your website!*
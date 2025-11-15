# Deploy Netlify Site to DirectAdmin

## Overview
Deploy all files from the Netlify site to DirectAdmin. This will solve the 404 API issues since everything will be on the same domain.

## Files to Upload

### ⚠️ IMPORTANT: Correct File Location
**DO NOT use the root `index.html`** - that's for "Tammy's Shades of Curls"!

### Source Location
All TrueSelf files are in: `TrueSelf-GiveBack/TrueSelf-GiveBack/`

**NOT in:** `index.html` (root) - that's the wrong file!

### Upload to DirectAdmin
Upload to: `/domains/trueselfgiveback.com/public_html/`

## Complete File List

### 1. Root Files (Upload to `/public_html/`)
- ✅ `index.html` - Main website page
- ✅ `rules.html` - Competition rules page
- ✅ `favicon.svg` - Site favicon
- ✅ `robots.txt` - SEO robots file
- ✅ `sitemap.xml` - SEO sitemap

### 2. CSS Folder (Upload to `/public_html/css/`)
- ✅ `css/style.css` - All website styles

### 3. JavaScript Folder (Upload to `/public_html/js/`)
- ✅ `js/app.js` - Main JavaScript logic
- ✅ `js/config.js` - API configuration (will need to update)

### 4. Images Folder (Upload to `/public_html/images/`)
- ✅ `images/trueself-logo.png` - TrueSelf logo

## Step-by-Step Upload Instructions

### Step 1: Navigate to DirectAdmin File Manager
1. Log into DirectAdmin
2. Go to **File Manager**
3. Navigate to: `/domains/trueselfgiveback.com/public_html/`

### Step 2: Upload Root Files
Upload these files directly to `/public_html/`:
- `index.html`
- `rules.html`
- `favicon.svg`
- `robots.txt`
- `sitemap.xml`

### Step 3: Upload CSS
1. Make sure `css` folder exists in `/public_html/`
2. If not, create it
3. Upload `css/style.css` to `/public_html/css/`

### Step 4: Upload JavaScript
1. Make sure `js` folder exists in `/public_html/`
2. If not, create it
3. Upload `js/app.js` to `/public_html/js/`
4. Upload `js/config.js` to `/public_html/js/`

### Step 5: Upload Images
1. Make sure `images` folder exists in `/public_html/`
2. If not, create it
3. Upload `images/trueself-logo.png` to `/public_html/images/`

### Step 6: Update API Configuration
After uploading, edit `/public_html/js/config.js`:

**Change from:**
```javascript
const API_BASE_URL = 'https://trueselfgiveback.com/api';
```

**To (relative path - recommended):**
```javascript
const API_BASE_URL = '/api';
```

Or keep absolute URL:
```javascript
const API_BASE_URL = 'https://trueselfgiveback.com/api';
```

### Step 7: Set File Permissions
Set these permissions in DirectAdmin:
- **HTML files:** `644`
- **CSS/JS files:** `644`
- **Image files:** `644`
- **Folders:** `755`

## Final Directory Structure

After upload, your `/public_html/` should look like:

```
/public_html/
├── index.html
├── rules.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   └── config.js
├── images/
│   └── trueself-logo.png
├── api/                    ← Already exists
│   ├── upload.php
│   ├── entries.php
│   ├── stats.php
│   ├── config.php
│   └── payfast-ipn.php
└── uploads/                ← Already exists
    └── selfies/
```

## Testing After Upload

1. **Visit main site:**
   - `https://trueselfgiveback.com/`
   - Should load the homepage

2. **Test API endpoints:**
   - `https://trueselfgiveback.com/api/stats.php`
   - Should return JSON

3. **Test upload:**
   - Try uploading a selfie
   - Should work now since everything is on same domain

## Benefits of This Approach

✅ **No CORS issues** - Everything on same domain
✅ **No 404 errors** - API files accessible
✅ **Simpler configuration** - Can use relative paths
✅ **Better performance** - No cross-domain requests
✅ **Easier debugging** - All files in one place

## Files NOT to Upload

These are for development only:
- ❌ `server.py` - Local development server
- ❌ `netlify.toml` - Netlify configuration
- ❌ `README.md` - Documentation
- ❌ `*.md` files - Documentation files
- ❌ `.gitignore` - Git configuration
- ❌ `attached_assets/` - Development assets

## Quick Upload Checklist

- [ ] Upload `index.html` to root
- [ ] Upload `rules.html` to root
- [ ] Upload `favicon.svg` to root
- [ ] Upload `robots.txt` to root
- [ ] Upload `sitemap.xml` to root
- [ ] Upload `css/style.css` to `css/` folder
- [ ] Upload `js/app.js` to `js/` folder
- [ ] Upload `js/config.js` to `js/` folder
- [ ] Upload `images/trueself-logo.png` to `images/` folder
- [ ] Update `js/config.js` API URL (use `/api` for relative path)
- [ ] Set correct file permissions
- [ ] Test website loads
- [ ] Test API endpoints work
- [ ] Test selfie upload works


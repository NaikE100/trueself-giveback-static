# Fix 404 Error: upload.php Not Found

## Problem
The API endpoint `https://trueselfgiveback.com/api/upload.php` returns **404 (Not Found)**.

This means the file doesn't exist on your server at that location.

## Solution: Upload API Files to DirectAdmin Server

### Step 1: Locate the API Files
The API files are in your project at:
```
Brands/TrueSelfGiveBack/project/api/
├── upload.php
├── entries.php
├── stats.php
├── config.php
└── payfast-ipn.php
```

### Step 2: Upload to DirectAdmin

1. **Log into DirectAdmin** for `trueselfgiveback.com`

2. **Go to File Manager**

3. **Navigate to your domain's public_html directory:**
   - Path: `/domains/trueselfgiveback.com/public_html/`

4. **Create the `api` folder** (if it doesn't exist):
   - Right-click → Create Directory → Name it `api`

5. **Upload these files to `/public_html/api/`:**
   - `upload.php`
   - `entries.php`
   - `stats.php`
   - `config.php`
   - `payfast-ipn.php`

6. **Set file permissions:**
   - All PHP files: `644`
   - The `api` folder: `755`

### Step 3: Create Uploads Directory

1. **Create `uploads` folder** in `/public_html/`:
   - Path: `/public_html/uploads/`

2. **Create `selfies` subfolder**:
   - Path: `/public_html/uploads/selfies/`

3. **Set permissions:**
   - `uploads/`: `755`
   - `uploads/selfies/`: `755`

### Step 4: Verify Database Configuration

1. **Edit `/public_html/api/config.php`**
2. **Update with your database credentials:**
   ```php
   $db_host = 'localhost';
   $db_name = 'lhncwewe_trueself_competition';
   $db_user = 'lhncwewe_trueself_competition';
   $db_pass = 'Mvp305544@';
   ```

### Step 5: Test the Endpoint

After uploading, test in your browser:
- `https://trueselfgiveback.com/api/upload.php`
- You should see JSON (even if it's an error about POST method)
- If you see HTML or 404, the file isn't in the right place

### Step 6: Test Upload Again

Once the file is uploaded, try uploading a selfie again on your Netlify site.

## Alternative: If API is on Different Domain

If your PHP APIs are hosted on a **different domain** (not trueselfgiveback.com), update the API URL:

1. **Edit `js/config.js`** in your Netlify project
2. **Change the API_BASE_URL:**
   ```javascript
   const API_BASE_URL = 'https://your-actual-api-domain.com/api';
   ```
3. **Commit and push** to trigger Netlify deployment

## Quick Checklist

- [ ] API files uploaded to `/public_html/api/`
- [ ] `uploads/selfies/` directory created with correct permissions
- [ ] `config.php` has correct database credentials
- [ ] Test `https://trueselfgiveback.com/api/upload.php` in browser
- [ ] Try uploading selfie again


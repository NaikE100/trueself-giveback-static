# Server Configuration Issue - 404 on All API Endpoints

## Problem
All API endpoints return 404 even though files exist:
- `https://trueselfgiveback.com/api/upload.php` → 404
- `https://trueselfgiveback.com/api/stats.php` → 404
- `https://trueselfgiveback.com/api/entries.php` → 404

## Possible Causes

### 1. Files in Wrong Location
The files might be in `/public_html/api/` but the server is looking elsewhere.

**Check:** In DirectAdmin file manager, verify the exact path:
- Files should be at: `/domains/trueselfgiveback.com/public_html/api/upload.php`
- NOT at: `/domains/trueselfgiveback.com/api/upload.php` (missing public_html)

### 2. PHP Not Enabled for /api/ Directory
The server might not be configured to process PHP files in subdirectories.

**Test:** Create a simple test file:
1. Create `test.php` in `/public_html/` (root) with: `<?php echo "PHP works!"; ?>`
2. Visit: `https://trueselfgiveback.com/test.php`
3. If this works → PHP works, but /api/ has an issue
4. If this also 404s → PHP not configured at all

### 3. .htaccess Blocking Access
The `.htaccess` file might be blocking direct file access.

**Check:** In DirectAdmin, look at `/public_html/api/.htaccess`
- Try temporarily renaming it to `.htaccess.bak`
- Then test: `https://trueselfgiveback.com/api/upload.php`
- If it works → .htaccess is the problem

### 4. Domain Document Root Issue
The domain might be pointing to a different directory.

**Check in DirectAdmin:**
1. Go to **Domain Setup** or **Domain Management**
2. Check **Document Root** setting
3. Should be: `/domains/trueselfgiveback.com/public_html/`
4. If different, that's the issue

### 5. File Permissions
Files might not have correct permissions.

**Check in DirectAdmin:**
- `upload.php` should be `644` or `755`
- `api` folder should be `755`
- If `000` or `600`, that could cause 404

## Diagnostic Steps

### Step 1: Verify File Location
1. In DirectAdmin file manager
2. Navigate to: `/domains/trueselfgiveback.com/public_html/api/`
3. Confirm `upload.php` is there
4. Check the **full path** shown in file manager

### Step 2: Test PHP in Root
1. Create `test.php` in `/public_html/` with:
   ```php
   <?php
   echo "PHP is working!";
   phpinfo();
   ?>
   ```
2. Visit: `https://trueselfgiveback.com/test.php`
3. If this works → PHP works, issue is with /api/ path
4. If this 404s → PHP not configured

### Step 3: Check Server Error Logs
In DirectAdmin:
1. Go to **Error Log** or **Logs**
2. Look for errors related to `/api/upload.php`
3. Check for permission denied or file not found errors

### Step 4: Test Direct File Access
Try accessing via full path (if visible in file manager):
- Check what the actual URL should be
- Some servers use different path structures

## Quick Fixes to Try

### Fix 1: Move Files to Root (Temporary Test)
1. Copy `upload.php` to `/public_html/upload.php` (root)
2. Test: `https://trueselfgiveback.com/upload.php`
3. If this works → Path issue with /api/ directory
4. If this also 404s → PHP configuration issue

### Fix 2: Check .htaccess
1. Rename `/public_html/api/.htaccess` to `.htaccess.bak`
2. Test: `https://trueselfgiveback.com/api/upload.php`
3. If works → .htaccess rewrite rules are broken

### Fix 3: Verify Domain Settings
1. In DirectAdmin, check domain settings
2. Verify document root is correct
3. Check if there are any redirects or aliases

## What to Report Back

Please check and report:
1. **Exact path** shown in DirectAdmin for `upload.php`
2. Does `https://trueselfgiveback.com/test.php` work (if you create it in root)?
3. What do the **error logs** show?
4. What is the **document root** setting for the domain?

This will help identify the exact issue.


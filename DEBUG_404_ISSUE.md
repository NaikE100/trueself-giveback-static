# Debug 404 Issue - Files Exist But Still Getting 404

## Current Status
✅ All API files exist in `/public_html/api/`:
- `upload.php` ✅
- `entries.php` ✅
- `stats.php` ✅
- `config.php` ✅
- `payfast-ipn.php` ✅

❌ But still getting 404 error when accessing `https://trueselfgiveback.com/api/upload.php`

## Possible Causes

### 1. PHP Error in upload.php
The file might have a PHP error that causes the server to return a 404.

**Test:** Visit `https://trueselfgiveback.com/api/upload.php` directly in your browser
- If you see a PHP error message → Fix the error
- If you see 404 → Server configuration issue
- If you see JSON → File is working!

### 2. .htaccess Rewrite Rules
The `.htaccess` file in the `api` folder might be redirecting requests incorrectly.

**Check:** Look at the `.htaccess` file in `/public_html/api/`
- Line 47: `RewriteRule ^upload$ upload.php [L]`
- This might be interfering with direct file access

**Solution:** Try accessing via the rewrite rule:
- `https://trueselfgiveback.com/api/upload` (without .php)

### 3. Server Not Processing PHP
The server might not be configured to process PHP files in the `/api/` directory.

**Test:** Create a simple test file:
1. Create `test.php` in `/public_html/api/` with:
   ```php
   <?php echo "PHP is working!"; ?>
   ```
2. Visit: `https://trueselfgiveback.com/api/test.php`
3. If you see "PHP is working!" → PHP is working
4. If you see 404 or download → PHP not configured

### 4. File Permissions
Files might not have correct permissions.

**Check:** In DirectAdmin, verify:
- `upload.php` permissions should be `644` or `755`
- `api` folder permissions should be `755`

## Quick Tests

### Test 1: Direct File Access
Visit in browser:
- `https://trueselfgiveback.com/api/upload.php`
- `https://trueselfgiveback.com/api/stats.php`
- `https://trueselfgiveback.com/api/entries.php`

**Expected:** Should see JSON response (even if error)

### Test 2: Via Rewrite Rule
Visit in browser:
- `https://trueselfgiveback.com/api/upload` (no .php)
- `https://trueselfgiveback.com/api/stats` (no .php)

**Expected:** Should work if .htaccess rewrite is active

### Test 3: Check Server Logs
In DirectAdmin, check error logs:
- Look for PHP errors related to `upload.php`
- Check Apache/Nginx error logs

## Solution: Update API URL in JavaScript

If the rewrite rules work, update `js/config.js`:

```javascript
const API_ENDPOINTS = {
    stats: `${API_BASE_URL}/stats`,      // Remove .php
    entries: `${API_BASE_URL}/entries`, // Remove .php
    upload: `${API_BASE_URL}/upload`     // Remove .php
};
```

Or if direct access works, keep `.php` extension.

## Next Steps

1. **Test the endpoint directly** in browser
2. **Check server error logs** for PHP errors
3. **Try accessing via rewrite rule** (without .php)
4. **Update JavaScript config** based on what works


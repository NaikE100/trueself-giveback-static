# Troubleshooting: Upload Error

## Error: "Unexpected token '<', \"<!DOCTYPE \"... is not valid JSON"

This error means the API is returning HTML (an error page) instead of JSON.

### Common Causes:

1. **API endpoint doesn't exist**
   - The URL `https://trueselfgiveback.com/api/upload.php` might not exist
   - Check if the file exists on your server

2. **Wrong API URL**
   - The API might be at a different location
   - Check `js/config.js` and verify the `API_BASE_URL`

3. **PHP Error**
   - The PHP file might have an error causing an HTML error page
   - Check server error logs

4. **CORS Issue**
   - Server might be blocking the request
   - Check browser console for CORS errors

## How to Fix:

### Step 1: Verify API URL

1. Open browser console (F12)
2. Check the console for the API connection test message
3. Look for the actual API URL being used

### Step 2: Test API Endpoint Directly

Open these URLs in your browser to test:
- `https://trueselfgiveback.com/api/stats.php` - Should return JSON
- `https://trueselfgiveback.com/api/upload.php` - Will show error (needs POST), but shouldn't show HTML error page

### Step 3: Check API File Location

The PHP API files should be at:
- `Brands/TrueSelfGiveBack/project/api/upload.php`
- `Brands/TrueSelfGiveBack/project/api/entries.php`
- `Brands/TrueSelfGiveBack/project/api/stats.php`

Make sure these are uploaded to your DirectAdmin server at:
- `/domains/trueselfgiveback.com/public_html/api/upload.php`
- Or wherever your API directory is

### Step 4: Update API URL in Config

If your API is at a different location, update `js/config.js`:

```javascript
const API_BASE_URL = 'https://your-actual-domain.com/api';
// Or if API is in a subdirectory:
// const API_BASE_URL = 'https://trueselfgiveback.com/path/to/api';
```

### Step 5: Check Server Logs

Check your DirectAdmin server logs for PHP errors when the upload is attempted.

## Quick Test:

1. Open browser console (F12)
2. Try uploading a selfie
3. Check the Network tab to see:
   - What URL was called
   - What response was returned
   - The status code (404, 500, etc.)

## Expected Behavior:

- Upload endpoint should return JSON like:
  ```json
  {
    "success": true,
    "url": "https://trueselfgiveback.com/uploads/selfie-123.jpg"
  }
  ```

- If you see HTML instead, the endpoint doesn't exist or has an error.


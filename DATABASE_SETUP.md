# Database Integration Setup Guide

## ✅ Yes, You Can Use the Same Database!

The Netlify site can connect to the existing MySQL database (`lhncwewe_trueself_competition`) through the PHP API endpoints on your DirectAdmin server.

## 📋 Setup Steps

### 1. Configure API Endpoint URL

Edit `js/config.js` and update the `API_BASE_URL` to point to your DirectAdmin server:

```javascript
const API_BASE_URL = 'https://trueselfgiveback.com/api';
// Or whatever domain hosts your PHP APIs
```

**Important:** Make sure this URL is accessible from the internet and the `/api/` directory contains:
- `config.php` (database connection)
- `entries.php` (create/get entries)
- `stats.php` (get statistics)
- `upload.php` (upload selfie images)

### 2. Verify CORS is Enabled

The PHP APIs already have CORS headers configured in:
- `Brands/TrueSelfGiveBack/project/api/config.php`
- `Brands/TrueSelfGiveBack/project/api/entries.php`
- `Brands/TrueSelfGiveBack/project/api/stats.php`

These allow requests from any origin (`Access-Control-Allow-Origin: *`), so your Netlify site can call them.

### 3. Test the Connection

1. Deploy your Netlify site
2. Open browser console (F12)
3. Check for any CORS errors when the page loads
4. The stats should automatically load from your database

### 4. How It Works

**Stats Display:**
- On page load, the site fetches real-time stats from `/api/stats.php`
- Shows actual entry count and funds raised from your database
- Falls back to default values if API is unavailable

**Entry Submission:**
1. User fills out form and uploads selfie
2. Selfie is uploaded to `/api/upload.php` (saves to server)
3. Entry is created in database via `/api/entries.php` with `payment_status='pending'`
4. User is redirected to PayFast for payment
5. PayFast calls `/api/payfast-ipn.php` to update payment status when payment completes

## 🔧 Current API Requirements

The `entries.php` API expects:
- **Required fields:** `name`, `email`, `phone`, `age`, `selfie_url`
- **Optional fields:** `instagram` (for social media handle)

**Note:** The current implementation uses a default `age: 18`. If you want to collect age, add an age field to the form in `index.html`.

## ⚠️ Payment ID Handling

**Important:** The current `entries.php` API does not accept `payment_id` during entry creation. However, the PayFast IPN handler (`payfast-ipn.php`) expects to find entries by `payment_id` to update payment status.

**Two options to fix this:**

### Option 1: Update Entry After Creation (Recommended)
After creating the entry, immediately update it with the payment_id. You'll need to modify the API's `updateEntry()` function to allow updating `payment_id`, or create a separate endpoint.

### Option 2: Modify the API
Update `entries.php` to accept `payment_id` and `payment_reference` during entry creation. The database schema supports both fields.

**Current Workaround:** The entry is created without payment_id, and the PayFast IPN handler may not be able to match it. You may need to:
1. Store the entry ID returned from the API
2. Update the entry with payment_id after creation
3. Or modify the PayFast IPN handler to match by email + payment amount instead

## 🚨 Important Notes

1. **API URL:** Make sure `js/config.js` has the correct API base URL
2. **Upload Directory:** Ensure the upload directory exists and is writable on your DirectAdmin server
3. **PayFast Notify URL:** Update the `notify_url` in `index.html` to point to your server's PayFast IPN handler
4. **Payment ID Matching:** The PayFast IPN handler needs to match entries by `m_payment_id`. You may need to update the entry after creation to store the payment ID, or modify the API to accept it during creation.

## 🧪 Testing Checklist

- [ ] API URL is correct in `js/config.js`
- [ ] Stats load correctly on page load
- [ ] Selfie upload works
- [ ] Entry is created in database before payment
- [ ] PayFast payment flow works
- [ ] Payment status updates after PayFast callback

## 📝 Database Schema

The database uses the `entries` table with these key fields:
- `id` - Auto-increment primary key
- `name`, `email`, `phone` - User information
- `instagram` - Social media handle (optional)
- `age` - User age (required, 13-120)
- `selfie_url` - URL to uploaded selfie image
- `payment_status` - 'pending', 'completed', etc.
- `payment_reference` - PayFast payment reference
- `created_at`, `updated_at` - Timestamps

## 🔄 Next Steps

1. Update `js/config.js` with your actual API URL
2. Test the connection from your Netlify site
3. Verify entries are being saved to the database
4. Test the complete payment flow end-to-end

If you encounter any issues, check:
- Browser console for JavaScript errors
- Network tab for API request/response details
- Server logs for PHP errors
- Database to verify entries are being created


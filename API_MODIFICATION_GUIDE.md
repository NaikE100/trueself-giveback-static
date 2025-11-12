# API Modification Guide

## Problem

The PayFast IPN handler expects entries to have a `payment_id` field to match payments, but the `entries.php` API doesn't accept `payment_id` during entry creation.

## Solution: Modify entries.php

Update `Brands/TrueSelfGiveBack/project/api/entries.php` to accept `payment_id` during entry creation.

### Step 1: Update the createEntry() function

Find the `createEntry()` function (around line 29) and modify it:

**Change this:**
```php
$stmt = $pdo->prepare("
    INSERT INTO entries (name, email, phone, instagram, age, selfie_url, payment_status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, 'pending', NOW())
");

$stmt->execute([
    $input['name'],
    $input['email'],
    $input['phone'],
    $input['instagram'] ?? null,
    $input['age'],
    $input['selfie_url']
]);
```

**To this:**
```php
$stmt = $pdo->prepare("
    INSERT INTO entries (name, email, phone, instagram, age, selfie_url, payment_id, payment_status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW())
");

$stmt->execute([
    $input['name'],
    $input['email'],
    $input['phone'],
    $input['instagram'] ?? null,
    $input['age'],
    $input['selfie_url'],
    $input['payment_id'] ?? null  // Add payment_id
]);
```

### Step 2: Update validation (optional but recommended)

Add payment_id to required fields if you want to enforce it:

```php
// Validate required fields
$requiredFields = ['name', 'email', 'phone', 'age', 'selfie_url', 'payment_id'];
```

Or keep it optional:
```php
// Validate payment_id format if provided
if (isset($input['payment_id']) && empty(trim($input['payment_id']))) {
    sendJsonResponse(['error' => 'Payment ID cannot be empty'], 400);
}
```

### Step 3: Update the JavaScript

The JavaScript in `js/app.js` already sends `payment_id` in the entry data, so once you update the API, it will work automatically.

## Alternative: Use payment_reference

If your database uses `payment_reference` instead of `payment_id`, you can:

1. Update the PayFast IPN handler to use `payment_reference` instead of `payment_id`
2. Or store the payment_id in the `payment_reference` field

## Testing

After making these changes:

1. Test creating an entry with payment_id
2. Verify the entry is created in the database with the payment_id
3. Test the PayFast payment flow
4. Verify the IPN handler can find and update the entry


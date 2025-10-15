# Troubleshooting Guide - Campus Lost & Found

## Issue: Lost items not showing in dashboard

### Step 1: Open Browser Developer Tools
1. Open your dashboard page
2. Press `F12` or right-click → "Inspect" → "Console" tab
3. Look for any error messages (red text)

### Step 2: Check Database Connection
1. Open `debug-test.html` in your browser
2. Look for connection test results
3. If you see errors, note them down

### Step 3: Verify Lost Items Exist
1. Go to lost-form.html
2. Try submitting a test lost item:
   - Name: "Test Lost Item"
   - Description: "This is a test item to check if database is working"
   - Location: "Test Location"
   - Date: Today's date
3. Submit the form
4. Check if it redirects to dashboard
5. Look for the test item

### Step 4: Check Browser Console for Errors

Open dashboard.html and look for these console messages:
- ✅ **Good**: "Loading items from database..."
- ✅ **Good**: "Retrieved items: [...]"
- ✅ **Good**: "Items breakdown: X Lost, Y Found"
- ❌ **Problem**: Any red error messages
- ❌ **Problem**: "Failed to load items"

### Step 5: Common Issues and Solutions

#### Issue: "Failed to load items: NetworkError"
**Solution**: Check your internet connection

#### Issue: "Failed to load items: Invalid API key"
**Solution**: Supabase credentials may be expired (this is expected with demo account)

#### Issue: Console shows "Retrieved items: []" (empty array)
**Solution**: No items in database - try adding some test items

#### Issue: Items show in console but not on page
**Solution**: JavaScript rendering issue - check for syntax errors

### Step 6: Manual Verification

1. Open `debug-test.html`
2. Click "Test Database Connection"
3. Click "Test Get Items"
4. Check results

### Step 7: Reset and Test

If nothing works:
1. Clear browser cache (Ctrl+F5)
2. Try in incognito/private browsing mode
3. Submit a new test item
4. Check dashboard again

### Step 8: Check Network Tab

1. Open dashboard.html
2. Open Developer Tools → Network tab
3. Refresh page
4. Look for requests to supabase.co
5. Check if any requests are failing (red status codes)

---

## Quick Fixes

### Fix 1: Clear Browser Cache
```
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### Fix 2: Check JavaScript Errors
1. Open Console (F12)
2. Look for red error messages
3. If you see "Uncaught ReferenceError" or similar, there may be a syntax error

### Fix 3: Test Database Directly
1. Open `debug-test.html`
2. This will test the database connection independently

---

## Expected Console Output (Normal Operation)

When dashboard loads correctly, you should see:
```
Loading items from database...
Retrieved items: [{...}, {...}, ...]
Total items: 5
Items breakdown: 3 Lost, 2 Found
Filtering items with filter: All
All items: [{...}, {...}, ...]
Filtered items (All): [{...}, {...}, ...]
```

## Report Issues

If none of these steps help, please share:
1. Browser console errors (screenshot or copy text)
2. Results from debug-test.html
3. Which browser you're using
4. Whether you can submit new items successfully
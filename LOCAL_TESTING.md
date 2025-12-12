# Testing the Registration System Locally

This guide shows you how to test the registration system on your local development environment before deploying.

## Important Note

The registration system uses Google Apps Script, which requires internet access. You cannot test the full flow completely offline, but you can test the frontend validation and UI.

## What You Can Test Locally

✅ **Registration form UI** - All fields, dropdowns, validation
✅ **Image upload preview** - See how images look before submitting
✅ **Form validation** - Required fields, email format, file size limits
✅ **Open/close status** - How the form responds to Sanity settings
✅ **Responsive design** - How it looks on mobile/tablet/desktop

❌ **Actual submission** - Requires deployed Google Apps Script

## Setup for Local Testing

### Step 1: Start Development Server

```bash
npm run dev
```

The website will be available at: `http://localhost:5173`

### Step 2: Configure Sanity CMS

1. **Make sure you have a `.env` file** with your Sanity credentials:
   ```
   VITE_SANITY_PROJECT_ID=your-project-id
   VITE_SANITY_DATASET=production
   ```

2. **Add Registration Config in Sanity Studio:**
   - Go to your Sanity Studio
   - Create a "Registration Config" document
   - Fill in all fields (even if using dummy values for testing)
   - Example test values:
     ```
     Sheet ID: test-sheet-id-123
     Member Drive Folder ID: test-folder-123
     Event Drive Folder ID: test-folder-456
     Workshop Drive Folder ID: test-folder-789
     Script URL: https://script.google.com/test-url
     Registration Open: ✓ ON
     Member Registration Open: ✓ ON
     Event Registration Open: ✓ ON
     Workshop Registration Open: ✓ ON
     ```
   - Click "Publish"

### Step 3: Test the Frontend

1. **Navigate to Registration Page**
   - Go to: `http://localhost:5173/register`
   - Or click "Registration" in the navbar

2. **Test Form Validation**
   - Try submitting empty form → Should show errors
   - Enter invalid email → Should show error
   - Upload file over 5MB → Should show error
   - Upload non-image file → Should show error

3. **Test Image Preview**
   - Click "Choose File"
   - Select a valid image (under 5MB)
   - Preview should appear above the file input

4. **Test Registration Types**
   - Select "Member Registration"
   - Select "Event Registration"  
   - Select "Workshop Registration"
   - Status message should update accordingly

5. **Test Open/Close Status**
   - In Sanity Studio, turn OFF "Member Registration Open"
   - Refresh the registration page
   - Select "Member Registration"
   - Should show "Registration is currently closed" message
   - Submit button should be disabled

## Mock Submission Test (No Network)

You can test the submission logic without actually sending data:

1. **Open Browser Console** (F12)

2. **Fill the form** with test data:
   - Name: Test User
   - Email: test@example.com
   - Department: Computer Science
   - Year: 2nd Year
   - Registration Type: Member
   - Image: Any valid image file

3. **Click Submit**

4. **Check Console** for logs:
   - You should see the form data being prepared
   - You'll likely see a CORS error (this is expected)
   - In production, this would work because Google Apps Script handles CORS

## Testing with Real Google Apps Script

To test the full flow including Google Sheets and Drive:

### Requirements:
- Completed Google Apps Script setup from `REGISTRATION_SETUP.md`
- Deployed Web App URL
- Real Google Sheet ID and Drive Folder IDs

### Steps:

1. **Update Sanity Config** with real values:
   - Sheet ID → Your actual Google Sheet ID
   - Drive Folder IDs → Your actual folder IDs
   - Script URL → Your deployed Web App URL

2. **Test Submission:**
   - Fill the form
   - Upload a small test image (under 1MB)
   - Click "Submit Registration"

3. **Verify Results:**
   - Check Google Sheet → New row should appear
   - Check Google Drive folder → Image should be uploaded
   - Website should show "Registration Successful" toast

## Common Issues During Local Testing

### Issue: "Configuration Error" message

**Problem:** Sanity is not configured or registration config is missing

**Solution:**
1. Check `.env` file exists and has correct project ID
2. Restart dev server after changing `.env`
3. Verify Registration Config exists in Sanity Studio
4. Check browser console for specific error

### Issue: Form submits but nothing happens

**Problem:** This is expected in local testing without a deployed Apps Script

**Solution:**
- For full testing, deploy the Google Apps Script (see `REGISTRATION_SETUP.md`)
- For UI testing only, check console for validation errors

### Issue: Image preview not showing

**Problem:** File might be too large or wrong format

**Solution:**
1. Try a smaller image (under 1MB)
2. Use JPG or PNG format
3. Check browser console for errors

### Issue: "Registration Closed" even though it's open in Sanity

**Problem:** Sanity config not fetched or cached

**Solution:**
1. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
2. Check browser console for fetch errors
3. Verify config is published in Sanity Studio

## Testing Checklist

Before deploying to production, verify:

- [ ] Registration form loads without errors
- [ ] All form fields accept input
- [ ] Email validation works
- [ ] Image upload preview works
- [ ] File size validation works (try uploading 6MB file)
- [ ] Registration type dropdown works
- [ ] Open/close status displays correctly
- [ ] Submit button is disabled when registration is closed
- [ ] Form is responsive on mobile devices
- [ ] Navigation menu includes "Registration" link
- [ ] Sanity configuration loads correctly
- [ ] Toast notifications appear on success/error

## Next Steps

Once local testing is complete:

1. **Deploy Google Apps Script** (see `REGISTRATION_SETUP.md`)
2. **Update Sanity with production values**
3. **Deploy your website** to a hosting service
4. **Test the full flow** in production
5. **Monitor Google Sheets** for incoming submissions

## Testing Registration Open/Close

To test different scenarios:

### Test 1: All Registration Closed
- In Sanity: Set "Registration Open" to OFF
- Result: Form should show "Registration is currently closed"

### Test 2: Only Members Open
- In Sanity:
  - "Registration Open" → ON
  - "Member Registration Open" → ON
  - "Event Registration Open" → OFF
  - "Workshop Registration Open" → OFF
- Result: Only Member registration should work

### Test 3: Custom Schedules
- Open/close different types at different times
- Test that status updates immediately when changing Sanity settings

## Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Verify all setup steps in `REGISTRATION_SETUP.md`
3. Ensure Sanity is properly configured (`QUICKSTART.md`)
4. Review this guide for common issues
5. Test with a fresh browser session (no cache)

## Related Guides

- **Sanity Setup** → `QUICKSTART.md`
- **Image Issues** → `QUICKSTART_IMAGES.md`
- **Registration Setup** → `REGISTRATION_SETUP.md`
- **Sanity Schemas** → `SANITY_SETUP.md` and `SANITY_REGISTRATION_SCHEMA.md`

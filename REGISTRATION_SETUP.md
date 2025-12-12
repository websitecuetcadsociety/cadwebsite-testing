# CUET CAD Society Registration System Setup Guide

This guide will walk you through setting up the complete registration system with Google Apps Script, Google Sheets, Google Drive, and Sanity CMS.

## Table of Contents
1. [Google Drive Setup](#1-google-drive-setup)
2. [Google Sheets Setup](#2-google-sheets-setup)
3. [Google Apps Script Setup](#3-google-apps-script-setup)
4. [Sanity CMS Setup](#4-sanity-cms-setup)
5. [Testing the System](#5-testing-the-system)
6. [Managing Registrations](#6-managing-registrations)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Google Drive Setup

### Create Folders for Image Storage

1. Go to [Google Drive](https://drive.google.com)
2. Create a main folder called **"CUET CAD Registrations"**
3. Inside this folder, create three subfolders:
   - **Member Photos**
   - **Event Photos**
   - **Workshop Photos**
4. For each folder, note down the **Folder ID**:
   - Open the folder in Google Drive
   - Look at the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`
   - Copy the `FOLDER_ID_HERE` part
   - Save all three folder IDs for later

### Set Folder Permissions (Important!)

For each of the three photo folders:
1. Right-click the folder → "Share"
2. Click "Change to anyone with the link"
3. Set permission to "Viewer"
4. Click "Done"

This allows the submitted photos to be accessible via public links.

---

## 2. Google Sheets Setup

### Create the Registration Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named **"CUET CAD Registrations"**
3. Create three sheets (tabs) at the bottom:
   - **Members**
   - **Events**
   - **Workshops**

### Set Up Sheet Headers

For each sheet, add the following headers in Row 1:

| Timestamp | Name | Email | Department | Year | Image URL | Status |
|-----------|------|-------|------------|------|-----------|--------|

**Example:**
- Cell A1: `Timestamp`
- Cell B1: `Name`
- Cell C1: `Email`
- Cell D1: `Department`
- Cell E1: `Year`
- Cell F1: `Image URL`
- Cell G1: `Status`

### Note the Sheet ID

1. Look at your sheet's URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
2. Copy the `SHEET_ID_HERE` part
3. Save this Sheet ID for later

---

## 3. Google Apps Script Setup

### Create the Apps Script Project

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the code from `GOOGLE_APPS_SCRIPT.js` (see below)
4. Replace the placeholder IDs in the script:
   - `YOUR_MEMBER_FOLDER_ID`
   - `YOUR_EVENT_FOLDER_ID`
   - `YOUR_WORKSHOP_FOLDER_ID`

### Deploy as Web App

1. Click the **Deploy** button (top right)
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Fill in the deployment settings:
   - **Description:** "CUET CAD Registration Handler"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
6. Click **"Deploy"**
7. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...`)
8. Save this URL for later

### Grant Permissions

1. After deployment, you'll be asked to authorize the app
2. Click **"Review Permissions"**
3. Choose your Google account
4. Click **"Advanced"** → **"Go to project (unsafe)"**
5. Click **"Allow"**

---

## 4. Sanity CMS Setup

### Create the Registration Config Schema

1. Go to your Sanity Studio project
2. Navigate to the `schemas` folder
3. Create a new file: `registrationConfig.ts`
4. Copy the schema code from below
5. Add the schema to your `schemas/index.ts` file

### Add Registration Config in Sanity Studio

1. Open your Sanity Studio dashboard
2. You should see a new document type: **"Registration Config"**
3. Click **"Create"** to add a new configuration
4. Fill in the required fields:
   - **Sheet ID:** (from Step 2)
   - **Member Drive Folder ID:** (from Step 1)
   - **Event Drive Folder ID:** (from Step 1)
   - **Workshop Drive Folder ID:** (from Step 1)
   - **Script URL:** (from Step 3)
   - **Registration Open:** Toggle ON to enable registrations
   - **Member Registration Open:** Toggle ON to enable member registration
   - **Event Registration Open:** Toggle ON to enable event registration
   - **Workshop Registration Open:** Toggle ON to enable workshop registration
5. Click **"Publish"**

---

## 5. Testing the System

### Test Registration Flow

1. Open your website and navigate to `/register`
2. Fill out the registration form:
   - Select a registration type
   - Enter your details
   - Upload a test photo (under 5MB)
3. Click **"Submit Registration"**
4. Check for success message

### Verify Data in Google Sheets

1. Open your Google Sheet
2. Go to the appropriate tab (Members/Events/Workshops)
3. You should see a new row with:
   - Timestamp
   - Name, Email, Department, Year
   - Google Drive image link
   - Status = "Pending"

### Verify Image in Google Drive

1. Open the corresponding Google Drive folder
2. You should see the uploaded image
3. The filename includes the timestamp and original filename

---

## 6. Managing Registrations

### Opening/Closing Registrations

**Global Control:**
- In Sanity Studio, edit the Registration Config
- Toggle "Registration Open" ON or OFF
- This controls ALL registration types

**Type-Specific Control:**
- Toggle individual switches:
  - "Member Registration Open"
  - "Event Registration Open"
  - "Workshop Registration Open"
- These override the global setting for specific types

### Reviewing Submissions

1. Open your Google Sheet
2. Each submission appears as a new row
3. You can:
   - Sort by timestamp
   - Filter by department or year
   - Update the "Status" column (e.g., Approved, Rejected, Pending)

### Accessing Uploaded Photos

1. Click the "Image URL" link in the sheet
2. This opens the photo in Google Drive
3. You can download, share, or organize photos as needed

---

## 7. Troubleshooting

### Registration Form Not Showing

**Problem:** Config error message appears

**Solution:**
- Check that Sanity project ID is configured in `.env`
- Verify registration config is published in Sanity Studio
- Check browser console for errors

### Submission Fails

**Problem:** "Submission Failed" error appears

**Solution:**
- Verify the Apps Script URL is correct in Sanity
- Check that the Web App is deployed as "Anyone" access
- Ensure all folder IDs are correct in the Apps Script

### Image Not Uploading

**Problem:** Data appears in sheet but no image URL

**Solution:**
- Check Drive folder IDs in Apps Script
- Verify folder permissions are set to "Anyone with link"
- Check image file size (must be under 5MB)

### "Registration Closed" Message

**Problem:** Form shows closed even though it should be open

**Solution:**
- Check "Registration Open" flag in Sanity
- Check type-specific flags (Member/Event/Workshop)
- Refresh the browser page after changing Sanity settings

### CORS Errors in Console

**Problem:** Console shows CORS errors

**Solution:**
- This is normal when using `mode: 'no-cors'` with Google Apps Script
- As long as data appears in the sheet, the submission worked
- The error can be safely ignored

---

## Adding New Registration Types (Advanced)

To add a new registration type (e.g., "Competition"):

### 1. Update Google Drive
- Create a new folder: "Competition Photos"
- Note the folder ID
- Set sharing permissions

### 2. Update Google Apps Script
- Add the new folder ID constant
- Add case in `uploadImageToDrive` function
- Add case in `appendToSheet` function

### 3. Update Sanity Schema
- Add `competitionDriveFolderId` field
- Add `competitionRegistrationOpen` field

### 4. Update Frontend
- Add new option to the registration type dropdown
- Update `isRegistrationOpen()` logic

---

## Support

For issues or questions:
1. Check this documentation first
2. Review Google Apps Script logs (View → Logs)
3. Check browser console for frontend errors
4. Contact the technical team

---

## Quick Reference

### Important Links
- Google Drive Folders: `https://drive.google.com/drive/folders/YOUR_FOLDER_ID`
- Google Sheet: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
- Apps Script: `https://script.google.com/home`
- Sanity Studio: `https://your-project.sanity.studio`

### File Limits
- Maximum image size: 5MB
- Supported formats: JPG, PNG, WEBP, GIF
- Maximum form submissions: Unlimited

### Security Notes
- Never share your Apps Script deployment URL publicly
- Images are stored with public links (ensure no sensitive content)
- Email addresses are stored in the sheet (handle with care)
- Consider GDPR/privacy compliance for user data

# CUET CAD Society Website - Quick Start Guide

Welcome! This guide will help you get your CUET CAD Society website up and running with Sanity CMS and image support.

## Important: This Guide is for Content Management (CMS) Setup

**For Registration System Setup**, please see the separate guide: `REGISTRATION_SETUP.md`

This guide covers:
- Setting up Sanity CMS for content management (text, images, events, etc.)
- Enabling image fetching from Sanity

The registration system has its own separate setup process with Google Sheets and Google Drive.

---

Your project is **fully integrated** with Sanity CMS! Just follow these steps to get your data flowing:

## Prerequisites

Before you begin, make sure you have:
- Node.js installed (version 16 or higher)
- A code editor (VS Code recommended)
- Basic understanding of the terminal/command line
- A free Sanity account (we'll create this together)

## Step 1: Create Your Sanity Project (5 minutes)

1. Go to [sanity.io](https://www.sanity.io/)
2. Sign up or log in
3. Click "Create New Project"
4. Choose a project name (e.g., "CUET CAD Society")
5. Select a dataset name (use "production")
6. Copy your **Project ID** (you'll need this in the next step)
   - It looks like a random string: `abcd1234`

## Step 2: Add Your Credentials (1 minute)

1. In the root folder, find the file named `.env.example`
2. Create a copy and rename it to `.env`
3. Open the `.env` file and replace the placeholder values:
   ```
   VITE_SANITY_PROJECT_ID=your-actual-project-id
   VITE_SANITY_DATASET=production
   ```
4. **IMPORTANT:** Make sure to use your actual project ID (the random string from Step 1)
5. Save the file
6. **Restart your development server** after saving (stop with Ctrl+C and run `npm run dev` again)

## Step 3: Enable CORS for Images (2 minutes)

For images to load properly from Sanity:

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select your project
3. Click "API" in the left sidebar
4. Scroll to "CORS Origins"
5. Click "Add CORS origin"
6. Add: `http://localhost:5173` (for local development)
7. Check "Allow credentials"
8. Click "Save"
9. When deploying, repeat and add your production domain: `https://your-website.com`

## Step 4: Set Up Your Content Schemas (10 minutes)

1. In your Sanity project dashboard, go to the Schema section
2. Create the following content types using the schemas in `SANITY_SETUP.md`:
   - **message** - For leader messages on the home page
   - **activity** - For recent activities
   - **mediaItem** - For gallery images
   - **event** - For upcoming events
   - **workshop** - For workshop listings
   - **committeeMember** - For committee member profiles
   - **alumni** - For alumni profiles
   - **member** - For current members
   - **registrationConfig** - For registration system settings (see `SANITY_REGISTRATION_SCHEMA.md`)

See detailed schema definitions in `SANITY_SETUP.md`.

## Step 5: Add Test Content (5 minutes)

1. Open your Sanity Studio (visit your project at sanity.io or use the Studio URL)
2. Add at least one test item for each content type
3. **Important:** Make sure to click "Publish" (not just save as draft)
4. When adding images, upload them using the image field in Sanity Studio

## ✅ That's It!

Once you complete these steps:
- Your website will automatically fetch and display content from Sanity
- Images will load properly from Sanity CDN
- You can manage all content through Sanity Studio
- Changes in Sanity will reflect on your website after a refresh

## 📚 Additional Guides

- **Image Issues?** → See `QUICKSTART_IMAGES.md` for detailed image setup
- **Registration System** → See `REGISTRATION_SETUP.md` for full registration setup
- **Local Testing** → See `LOCAL_TESTING.md` for testing registration forms
- **Schemas** → See `SANITY_SETUP.md` for detailed schema definitions
- **Need Help?** → Visit [Sanity Documentation](https://www.sanity.io/docs)

## 🎯 What's Already Done

✅ Sanity client configured  
✅ Image URL builder integrated (`@sanity/image-url`)
✅ All pages integrated with Sanity  
✅ Type definitions created  
✅ Error handling implemented  
✅ Environment variables set up  
✅ Registration form created (`/register` route)
✅ Navbar includes registration link

You just need to:
1. Add your credentials
2. Create the schemas
3. Enable CORS for images
4. Add content in Sanity Studio

## Troubleshooting

### Images not showing?
- Check `QUICKSTART_IMAGES.md` for detailed troubleshooting
- Verify CORS is enabled (Step 3)
- Make sure images are uploaded in Sanity Studio
- Restart dev server after changing `.env`

### Registration form not working?
- See `REGISTRATION_SETUP.md` for complete setup
- Make sure you've created the `registrationConfig` schema
- Add registration config in Sanity Studio

### Content not appearing?
- Verify `.env` has the correct project ID
- Restart dev server after editing `.env`
- Check browser console for errors
- Make sure content is published in Sanity (not just saved)

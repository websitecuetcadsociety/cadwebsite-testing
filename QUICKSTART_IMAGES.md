# How to Enable Image Fetching from Sanity CMS

If images are not showing up from your Sanity CMS, follow this guide carefully.

## Problem: Images Not Displaying

If you see broken images or images don't load from Sanity, it's usually because:
1. The Sanity project ID is not configured correctly
2. The images haven't been uploaded to Sanity yet
3. The image URLs are not being generated properly

## Solution: Step-by-Step Fix

### Step 1: Verify Sanity Configuration

1. **Check your `.env` file exists** (not `.env.example`)
   - Location: Root of your project
   - Should contain:
     ```
     VITE_SANITY_PROJECT_ID=abcd1234
     VITE_SANITY_DATASET=production
     ```

2. **Get your Sanity Project ID**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Click on your project
   - Copy the "Project ID" (looks like: `abcd1234` or similar)
   - Paste it in your `.env` file after `VITE_SANITY_PROJECT_ID=`

3. **Restart your development server**
   - Stop the server (press `Ctrl+C` in terminal)
   - Start again: `npm run dev`
   - **This step is crucial!** Changes to `.env` require a restart

### Step 2: Configure Sanity Studio for Images

1. **Go to your Sanity Studio**
   - URL: `https://your-project-name.sanity.studio/`
   - Or: `https://www.sanity.io/manage` → Select your project → "Open Studio"

2. **Set Up CORS (Required for images)**
   - Go to [sanity.io/manage](https://www.sanity.io/manage)
   - Select your project
   - Click "API" in the left sidebar
   - Scroll to "CORS Origins"
   - Click "Add CORS origin"
   - Add: `http://localhost:5173` (for development)
   - Check "Allow credentials"
   - Click "Save"

3. **Add your production domain (when deploying)**
   - Follow the same steps
   - Add: `https://your-website.com`

### Step 3: Upload Images in Sanity Studio

Images won't show if they haven't been uploaded yet!

1. **Open Sanity Studio**
   - Go to your studio URL
   - Login with your account

2. **Add Content with Images**
   - For example, to add a message with an image:
     - Click "Message" in the sidebar
     - Click "Create new"
     - Fill in the title and description
     - Click on the "Image" field
     - Click "Upload" and select an image from your computer
     - Click "Publish"

3. **Supported Image Fields**
   - Message image
   - Activity image
   - Event thumbnail
   - Workshop thumbnail
   - Committee member photo
   - Alumni photo
   - Member photo
   - Media gallery items

### Step 4: Verify Image Configuration

The website is already configured to fetch images. Here's what's set up:

**File: `src/lib/sanity.ts`**
```typescript
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source).url();
}
```

This function converts Sanity image references to actual URLs.

**Usage in components:**
```typescript
// Correct way to display Sanity images:
<img src={urlFor(item.image)} alt={item.title} />

// NOT like this (won't work):
<img src={item.image} alt={item.title} />
```

### Step 5: Test Image Display

1. **Add a test image in Sanity Studio**
   - Create a new "Message" document
   - Upload an image
   - Publish

2. **Check your website**
   - Refresh the home page
   - The image should now appear

3. **If still not working:**
   - Open browser console (F12)
   - Look for errors
   - Common issues:
     - `VITE_SANITY_PROJECT_ID is not defined` → Check `.env` file
     - CORS errors → Check CORS settings in Sanity
     - 404 on images → Image not uploaded or wrong field type

## Image Field Types in Sanity

When creating schemas in Sanity Studio, use the correct field type for images:

```javascript
{
  name: 'image',
  title: 'Image',
  type: 'image',  // ← Must be 'image', not 'url' or 'string'
  options: {
    hotspot: true  // Enables image cropping
  }
}
```

## Troubleshooting

### Images show as broken/empty
- **Solution:** Upload images in Sanity Studio for each document

### Images load slowly
- **Solution:** This is normal, Sanity CDN serves optimized images

### Console shows "Cannot read property 'asset' of undefined"
- **Solution:** The image field is empty in Sanity. Upload an image or add a fallback:
  ```typescript
  {item.image && <img src={urlFor(item.image)} alt={item.title} />}
  ```

### Different image on Sanity vs website
- **Solution:** Clear browser cache or refresh Sanity Studio

### Images work in Sanity Studio but not on website
- **Solution:** 
  1. Check CORS settings
  2. Verify `.env` configuration
  3. Restart dev server

## Need Help?

If images still don't work after following this guide:
1. Check all steps again carefully
2. Verify your Sanity Project ID is correct
3. Ensure you've restarted the dev server
4. Check browser console for specific errors
5. Refer to `QUICKSTART.md` for general Sanity setup
6. Refer to `REGISTRATION_SETUP.md` for registration system setup

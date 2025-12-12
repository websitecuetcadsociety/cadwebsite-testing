# CUET CAD Society Website

A modern, responsive website for the Chittagong University of Engineering & Technology (CUET) CAD Society, built with React and powered by Sanity CMS.

## 🚀 Quick Start

**New here? Start with these guides in order:**

1. **[QUICKSTART.md](./QUICKSTART.md)** - Set up Sanity CMS (text & images)
2. **[QUICKSTART_IMAGES.md](./QUICKSTART_IMAGES.md)** - Fix image loading issues
3. **[REGISTRATION_SETUP.md](./REGISTRATION_SETUP.md)** - Set up registration system
4. **[LOCAL_TESTING.md](./LOCAL_TESTING.md)** - Test registration locally

## ✨ Features

- **Homepage**: Hero section with CAD background, leader messages, recent activities, and media gallery
- **About Page**: Society information, mission, and values
- **Events**: Upcoming events with registration options
- **Workshops**: CAD training sessions and workshops
- **Committee**: Current committee members with contact information
- **Alumni**: Showcase of successful alumni
- **Members**: Directory of current society members
- **Registration System**: Dynamic form with Google Sheets & Drive integration

## 📋 Setup Instructions

### 1. Install Dependencies

```sh
npm install
```

### 2. Configure Sanity CMS

This website fetches all content (text, images, events, etc.) from Sanity CMS.

**📖 Follow the step-by-step guide:** [QUICKSTART.md](./QUICKSTART.md)

Quick steps:
1. Create a free Sanity account at [sanity.io](https://www.sanity.io/)
2. Copy `.env.example` to `.env`
3. Add your Sanity Project ID to `.env`
4. Create content schemas (see [SANITY_SETUP.md](./SANITY_SETUP.md))
5. Enable CORS for images
6. Restart dev server

**Images not showing?** → See [QUICKSTART_IMAGES.md](./QUICKSTART_IMAGES.md)

### 3. Set Up Registration System (Optional)

For member/event/workshop registration functionality:

**📖 Follow the detailed guide:** [REGISTRATION_SETUP.md](./REGISTRATION_SETUP.md)

This involves:
- Creating Google Sheets for data storage
- Setting up Google Drive folders for image uploads
- Deploying Google Apps Script
- Configuring Sanity CMS with registration settings

**Testing locally?** → See [LOCAL_TESTING.md](./LOCAL_TESTING.md)

### 4. Start Development Server

```sh
npm run dev
```

Visit: `http://localhost:5173`

## 🛠️ Technologies Used

- **Vite** - Fast build tool
- **TypeScript** - Type safety
- **React** - UI library
- **Tailwind CSS** - Styling
- **shadcn-ui** - UI components
- **Framer Motion** - Animations
- **Sanity CMS** - Content management system
- **React Router** - Client-side routing
- **Google Apps Script** - Registration backend
- **Google Sheets** - Data storage
- **Google Drive** - Image storage

## 📁 Project Structure

```
src/
├── components/             # Reusable UI components
│   ├── ui/                # shadcn-ui components
│   ├── Navbar.tsx         # Navigation with registration link
│   ├── Footer.tsx         # Site footer
│   └── Layout.tsx         # Main layout wrapper
├── pages/                 # Page components
│   ├── Home.tsx           # Homepage with CMS content
│   ├── About.tsx          # About the society
│   ├── Events.tsx         # Events listing
│   ├── Workshop.tsx       # Workshop listings
│   ├── Committee.tsx      # Committee members
│   ├── Alumni.tsx         # Alumni showcase
│   ├── Members.tsx        # Current members
│   └── EventRegistration.tsx  # Registration form
├── lib/                   # Utilities and configurations
│   ├── sanity.ts          # Sanity client, types, image URLs
│   └── utils.ts           # Helper functions
└── assets/                # Static assets
```

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | Main Sanity CMS setup guide |
| `QUICKSTART_IMAGES.md` | Troubleshoot image loading |
| `REGISTRATION_SETUP.md` | Complete registration system setup |
| `LOCAL_TESTING.md` | Test registration locally |
| `SANITY_SETUP.md` | Detailed Sanity schemas |
| `SANITY_REGISTRATION_SCHEMA.md` | Registration config schema |
| `GOOGLE_APPS_SCRIPT.js` | Apps Script code for registration |

## 🚀 Deployment

### Deploy to Lovable (Recommended)

1. Open [Lovable](https://lovable.dev/projects/17e99d1f-43ab-4b92-b81f-b33147f1d1ed)
2. Click Share → Publish
3. Your site will be live!

### Custom Domain

To connect a domain:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the instructions

Read more: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

### Before Deploying - Checklist

- [ ] Sanity CMS is configured with production credentials
- [ ] All content is added and published in Sanity Studio
- [ ] CORS origins include your production domain
- [ ] Registration system is fully set up (if using)
- [ ] Google Apps Script is deployed as Web App
- [ ] Registration config in Sanity has production URLs
- [ ] Test the site thoroughly in production after deployment

## 🆘 Troubleshooting

### Content Not Showing
- Verify `.env` has correct Sanity project ID
- Check that content is **published** in Sanity (not draft)
- Restart dev server after editing `.env`
- Check browser console for errors

### Images Not Loading
- See detailed guide: [QUICKSTART_IMAGES.md](./QUICKSTART_IMAGES.md)
- Verify CORS is enabled in Sanity
- Make sure images are uploaded in Sanity Studio
- Check that you're using `urlFor(image)` in code

### Registration Form Issues
- See setup guide: [REGISTRATION_SETUP.md](./REGISTRATION_SETUP.md)
- Verify registration config exists in Sanity
- Check Google Apps Script deployment
- Ensure folder/sheet IDs are correct

### "Registration Closed" Message
- Check Sanity registration config settings
- Verify "Registration Open" toggles
- Refresh browser after changing settings

## 💡 Tips for Non-Developers

This project is designed to be manageable even if you're not a developer:

1. **Content Management**: All text, images, events, etc. are managed through Sanity Studio (no code needed!)
2. **Registration Control**: Open/close registrations using toggles in Sanity
3. **Data Collection**: Registration data goes to Google Sheets (familiar spreadsheet interface)
4. **Image Storage**: Uploaded images go to Google Drive (easy to access and organize)

**Follow the guides in order**, and you'll have a fully working website!

---

## Original Lovable Project Info

## Project info

**URL**: https://lovable.dev/projects/17e99d1f-43ab-4b92-b81f-b33147f1d1ed

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/17e99d1f-43ab-4b92-b81f-b33147f1d1ed) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/17e99d1f-43ab-4b92-b81f-b33147f1d1ed) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

# Sanity Schema for Registration System

## Add this schema to your Sanity Studio project

### Step 1: Create the schema file

Create a new file: `schemas/registrationConfig.ts`

```typescript
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'registrationConfig',
  title: 'Registration Configuration',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Configuration Title',
      type: 'string',
      description: 'Internal name for this configuration (e.g., "Main Registration Config")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sheetId',
      title: 'Google Sheet ID',
      type: 'string',
      description: 'The ID of your Google Sheet (from the URL)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'memberDriveFolderId',
      title: 'Member Photos Drive Folder ID',
      type: 'string',
      description: 'Google Drive folder ID for member registration photos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDriveFolderId',
      title: 'Event Photos Drive Folder ID',
      type: 'string',
      description: 'Google Drive folder ID for event registration photos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'workshopDriveFolderId',
      title: 'Workshop Photos Drive Folder ID',
      type: 'string',
      description: 'Google Drive folder ID for workshop registration photos',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'scriptUrl',
      title: 'Google Apps Script URL',
      type: 'url',
      description: 'The Web App URL from your deployed Google Apps Script',
      validation: (Rule) => Rule.required().uri({
        scheme: ['https']
      }),
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open (Global)',
      type: 'boolean',
      description: 'Master switch to enable/disable ALL registrations',
      initialValue: false,
    }),
    defineField({
      name: 'memberRegistrationOpen',
      title: 'Member Registration Open',
      type: 'boolean',
      description: 'Enable/disable member registrations specifically',
      initialValue: true,
    }),
    defineField({
      name: 'eventRegistrationOpen',
      title: 'Event Registration Open',
      type: 'boolean',
      description: 'Enable/disable event registrations specifically',
      initialValue: true,
    }),
    defineField({
      name: 'workshopRegistrationOpen',
      title: 'Workshop Registration Open',
      type: 'boolean',
      description: 'Enable/disable workshop registrations specifically',
      initialValue: true,
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Admin Notification Email',
      type: 'string',
      description: 'Email address to receive registration notifications (optional)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      registrationOpen: 'registrationOpen',
    },
    prepare(selection) {
      const { title, registrationOpen } = selection;
      return {
        title: title,
        subtitle: registrationOpen ? '✅ Registrations Open' : '❌ Registrations Closed',
      };
    },
  },
});
```

### Step 2: Update schemas index file

Open `schemas/index.ts` and add the import:

```typescript
import registrationConfig from './registrationConfig';

export const schemaTypes = [
  // ... your existing schemas
  registrationConfig,
];
```

### Step 3: Deploy to Sanity Studio

1. Save the files
2. If running locally: `npm run dev` or `sanity dev`
3. If using Sanity hosted studio: deploy with `sanity deploy`

### Step 4: Create the configuration document

1. Open your Sanity Studio
2. Look for "Registration Configuration" in the sidebar
3. Click "Create" to add a new document
4. Fill in all the required fields:
   - Configuration Title: "Main Registration Config"
   - Google Sheet ID: (from your Google Sheet URL)
   - All three Drive Folder IDs
   - Google Apps Script URL
   - Toggle switches for registration open/close
5. Click "Publish"

### Step 5: Important Notes

**There should only be ONE registration configuration document.**
- The frontend fetches the first (and only) configuration
- Multiple configs are not supported in the current implementation
- If you need to change settings, edit the existing document

**Making the configuration active:**
- After creating the document, make sure to click "Publish"
- Unpublished drafts will not be visible to the frontend
- Changes take effect immediately after publishing

### Step 6: Usage in Frontend

The frontend automatically fetches this configuration on page load:

```typescript
const data = await sanityClient.fetch('*[_type == "registrationConfig"][0]');
```

This returns:
```json
{
  "sheetId": "your-sheet-id",
  "memberDriveFolderId": "member-folder-id",
  "eventDriveFolderId": "event-folder-id",
  "workshopDriveFolderId": "workshop-folder-id",
  "scriptUrl": "https://script.google.com/...",
  "registrationOpen": true,
  "memberRegistrationOpen": true,
  "eventRegistrationOpen": false,
  "workshopRegistrationOpen": true
}
```

### Advanced: Adding More Registration Types

To add a new type (e.g., "competition"):

1. **Add field to schema:**
```typescript
defineField({
  name: 'competitionDriveFolderId',
  title: 'Competition Photos Drive Folder ID',
  type: 'string',
  description: 'Google Drive folder ID for competition registration photos',
  validation: (Rule) => Rule.required(),
}),
defineField({
  name: 'competitionRegistrationOpen',
  title: 'Competition Registration Open',
  type: 'boolean',
  description: 'Enable/disable competition registrations',
  initialValue: true,
}),
```

2. **Update Google Apps Script** with new folder ID and case handling

3. **Update Frontend** registration type dropdown and logic

4. **Create new sheet tab** in Google Sheets named "Competitions"

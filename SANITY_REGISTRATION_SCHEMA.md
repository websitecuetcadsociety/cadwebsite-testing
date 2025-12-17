# Sanity Registration Configuration Schema

This document explains how to set up the registration configuration in your Sanity CMS to enable the simplified Google Form-based registration system.

## Sanity Schema Definition

Add this schema to your Sanity project to create the registration configuration document type:

```typescript
// schemas/registrationConfig.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'registrationConfig',
  title: 'Registration Configuration',
  type: 'document',
  icon: () => '📝',
  fields: [
    defineField({
      name: 'googleFormUrl',
      title: 'Google Form URL',
      type: 'url',
      description: 'The URL of your Google Form (e.g., https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform)',
      validation: (Rule) => Rule.required().error('Google Form URL is required'),
    }),
    defineField({
      name: 'registrationStartDate',
      title: 'Registration Start Date',
      type: 'datetime',
      description: 'Registration will open on this date',
      validation: (Rule) => Rule.required().error('Start date is required'),
    }),
    defineField({
      name: 'registrationEndDate',
      title: 'Registration End Date',
      type: 'datetime',
      description: 'Registration will close after this date',
      validation: (Rule) => Rule.required().error('End date is required'),
    }),
    defineField({
      name: 'registrationTitle',
      title: 'Registration Title',
      type: 'string',
      description: 'Title displayed on the registration page (optional)',
      initialValue: 'Register Now',
    }),
    defineField({
      name: 'registrationDescription',
      title: 'Registration Description',
      type: 'text',
      description: 'Description displayed below the title (optional)',
    }),
  ],
  preview: {
    select: {
      startDate: 'registrationStartDate',
      endDate: 'registrationEndDate',
    },
    prepare({ startDate, endDate }: { startDate: string; endDate: string }) {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);

      let status = 'Closed';
      if (now >= start && now <= end) {
        status = '🟢 Open';
      } else if (now < start) {
        status = '🟡 Upcoming';
      } else {
        status = '🔴 Ended';
      }

      return {
        title: 'Registration Configuration',
        subtitle: `Status: ${status}`,
      };
    },
  },
});
```

## Integrating the Schema

1. Add the schema file to your Sanity project's `schemas` folder
2. Import and add it to your `schemas/index.ts`:

```typescript
import registrationConfig from './registrationConfig';

export const schemaTypes = [
  // ... other schemas
  registrationConfig,
];
```

3. Deploy your Sanity Studio:
```bash
npx sanity deploy
```

## Creating the Configuration Document

1. Open your Sanity Studio
2. Create a new **Registration Configuration** document
3. Fill in the required fields:
   - **Google Form URL**: Paste your Google Form link
   - **Registration Start Date**: Select when registration should open
   - **Registration End Date**: Select when registration should close
   - **Registration Title** (optional): Custom title for the page
   - **Registration Description** (optional): Custom description
4. **Publish** the document

## How It Works

The registration page will:
1. Fetch the configuration from Sanity
2. Check if the current date is within the registration period
3. If **within the period**: Display the embedded Google Form
4. If **before the start date**: Show "Registration Not Yet Open" with the opening date
5. If **after the end date**: Show "Registration Closed" message

## Google Form Setup Tips

1. Create your Google Form at [Google Forms](https://forms.google.com)
2. Add all the fields you need for registration
3. Copy the form URL (should look like `https://docs.google.com/forms/d/e/FORM_ID/viewform`)
4. Paste this URL in the Sanity configuration

### Recommended Form Fields
- Full Name
- Email Address
- Department
- Academic Year/Batch
- Mobile Number
- Social Media Links (LinkedIn, Facebook)
- Payment Information (if applicable)
- Photo Upload (Google Forms supports file uploads)

## Troubleshooting

### Form not showing?
- Make sure the Google Form URL is correct
- Ensure the form is set to "Anyone with the link can respond"
- Check that the registration dates are set correctly

### Registration showing as closed?
- Verify the start and end dates in Sanity
- Make sure you've published the configuration document
- Check that your device's date/time is correct

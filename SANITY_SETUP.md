# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for the CUET CAD Society website.

## Step 1: Create a Sanity Project

1. Go to [https://www.sanity.io/](https://www.sanity.io/) and sign up/log in
2. Create a new project
3. Choose a project name (e.g., "cuet-cad-society")
4. Select a dataset name (use "production" or create a custom one)
5. Note your **Project ID** from the dashboard

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`
2. Replace the values with your actual Sanity credentials:
   ```
   VITE_SANITY_PROJECT_ID=your-actual-project-id
   VITE_SANITY_DATASET=production
   ```

## Step 3: Create Schemas in Sanity Studio

In your Sanity Studio, create a `schemas` folder and add the following schema files. Each file below is complete TypeScript code ready to copy-paste.

### 1. Message Schema (`schemas/message.ts`)
**For leader messages (Advisor, President, General Secretary)**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'message',
  title: 'Message',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Name of the leader (e.g., Dr. John Doe)'
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Position (e.g., Advisor, President, General Secretary)'
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Message from the leader'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Profile picture of the leader'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    }
  }
})
```

### 2. Activity Schema (`schemas/activity.ts`)
**For recent activities on the homepage**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Title of the activity'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Brief description of the activity'
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
      description: 'Date when the activity occurred'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Activity image'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image'
    }
  }
})
```

### 3. Media Item Schema (`schemas/mediaItem.ts`)
**For the media gallery**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'mediaItem',
  title: 'Media Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the media item (optional)'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: Rule => Rule.required(),
      options: {
        hotspot: true
      },
      description: 'Gallery image'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Event', value: 'event'},
          {title: 'Competition', value: 'competition'},
          {title: 'Other', value: 'other'}
        ]
      },
      description: 'Category of the media item'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image'
    }
  }
})
```

### 4. Event Schema (`schemas/event.ts`)
**For the Events page**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Event title'
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Workshop', value: 'workshop'},
          {title: 'Competition', value: 'competition'},
          {title: 'Seminar', value: 'seminar'},
          {title: 'Social', value: 'social'},
          {title: 'Other', value: 'other'}
        ]
      },
      description: 'Type/category of the event'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Detailed description of the event'
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
      description: 'Event date'
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      description: 'Event time (e.g., 10:00 AM - 12:00 PM)'
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
      description: 'Event location/venue'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Event banner/poster image'
    }),
    defineField({
      name: 'rulebook',
      title: 'Rulebook URL',
      type: 'url',
      description: 'Link to event rulebook or guidelines (optional)'
    }),
    defineField({
      name: 'eventLink',
      title: 'Event Link',
      type: 'url',
      description: 'External link for event details or registration (optional)'
    }),
    defineField({
      name: 'registrationOpen',
      title: 'Registration Open',
      type: 'boolean',
      initialValue: false,
      description: 'Is registration currently open for this event?'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      media: 'image'
    }
  }
})
```

### 5. Workshop Schema (`schemas/workshop.ts`)
**For the Workshops page**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Workshop title'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
      description: 'Workshop description and details'
    }),
    defineField({
      name: 'instructor',
      title: 'Instructor',
      type: 'string',
      description: 'Name of the workshop instructor'
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
      description: 'Workshop date'
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Workshop duration (e.g., 2 hours, 3 days)'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Workshop image/poster'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'instructor',
      media: 'image'
    }
  }
})
```

### 6. Committee Member Schema (`schemas/committeeMember.ts`)
**For the Committee page**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'committeeMember',
  title: 'Committee Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Full name of the committee member'
    }),
    defineField({
      name: 'position',
      title: 'Position',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Position in the committee (e.g., President, Vice President)'
    }),
    defineField({
      name: 'panelType',
      title: 'Panel Type',
      type: 'string',
      options: {
        list: [
          {title: 'Advisory Panel', value: 'advisory'},
          {title: 'Committee', value: 'committee'}
        ]
      },
      validation: Rule => Rule.required(),
      initialValue: 'committee',
      description: 'Which panel does this member belong to?'
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      description: 'Academic department'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Profile picture'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'LinkedIn profile URL'
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Facebook profile URL'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'image'
    }
  }
})
```

### 7. Alumni Schema (`schemas/alumni.ts`)
**For the Alumni page**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'alumni',
  title: 'Alumni',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Full name of the alumni'
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Batch year (e.g., 2020, 2021)'
    }),
    defineField({
      name: 'passingYear',
      title: 'Passing Year',
      type: 'string',
      description: 'Year of graduation (e.g., 2020, 2021)'
    }),
    defineField({
      name: 'workArea',
      title: 'Work Area',
      type: 'string',
      description: 'Field of work or specialization (e.g., Software Engineering, CAD Design)'
    }),
    defineField({
      name: 'currentPosition',
      title: 'Current Position',
      type: 'string',
      description: 'Current job position'
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'Current company/organization'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Profile picture'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address'
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'LinkedIn profile URL'
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
      description: 'Facebook profile URL'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'batch',
      media: 'image'
    }
  }
})
```

### 8. Member Schema (`schemas/member.ts`)
**For the Members page**

```typescript
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Full name of the member'
    }),
    defineField({
      name: 'studentId',
      title: 'Student ID',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'University student ID'
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Academic department'
    }),
    defineField({
      name: 'batch',
      title: 'Batch',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Batch year (e.g., 2023, 2024)'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Contact email address'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Profile picture'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'studentId',
      media: 'image'
    }
  }
})
```

### 9. Schema Index File (`schemas/index.ts`)
**Import and export all schemas**

```typescript
import message from './message'
import activity from './activity'
import mediaItem from './mediaItem'
import event from './event'
import workshop from './workshop'
import committeeMember from './committeeMember'
import alumni from './alumni'
import member from './member'

export const schemaTypes = [
  message,
  activity,
  mediaItem,
  event,
  workshop,
  committeeMember,
  alumni,
  member
]
```

### 10. Sanity Config File (`sanity.config.ts`)
**Your main Sanity configuration - update with your project ID**

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'CUET CAD Society',

  projectId: 'your-project-id-here', // Replace with your actual project ID
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

## Step 4: Install and Run Sanity Studio (Optional - For Local Development)

If you want to run Sanity Studio locally:

1. Create a new folder for your Sanity project:
   ```bash
   npm create sanity@latest
   ```

2. Follow the prompts and use your existing project ID

3. Copy all the schema files above into the `schemas` folder

4. Run the studio:
   ```bash
   npm run dev
   ```

## Step 5: Add Content via Sanity.io Dashboard

You can also add content directly through the Sanity web interface:

1. Go to https://www.sanity.io/manage
2. Select your project
3. Click "Vision" or "Desk" to access the content editor
4. Start adding content for each schema type

### Sample Content to Add:

#### Messages (Add 3):
- Advisor message
- President message
- General Secretary message

#### Activities (Add 4-6):
- Recent workshops
- Events
- Competitions

#### Media Items (Add 6+):
- Event photos
- Workshop photos
- Competition photos

#### Events (Add upcoming events)
#### Workshops (Add upcoming workshops)
#### Committee Members (Add all current members)
#### Alumni (Add notable alumni)
#### Members (Add current society members)

## Step 6: Test the Website

1. Make sure your `.env` file has the correct project ID
2. Restart your development server
3. Visit your website - data should now load from Sanity!

## Troubleshooting

### Data not showing?
- Open browser console (F12) and check for errors
- Verify your `.env` file has the correct `VITE_SANITY_PROJECT_ID`
- Make sure you've added content to Sanity Studio

### Authentication errors?
- Double-check your Project ID
- Verify the dataset name (usually 'production')

### Schema errors?
- Make sure all 8 schemas are created in Sanity
- Check that field names match exactly

### CORS errors?
- In Sanity dashboard, go to Settings > API
- Add your localhost URL (http://localhost:5173) to CORS origins

## Sanity Query Examples

The website uses these GROQ queries to fetch data:

```typescript
// Messages
*[_type == "message"] | order(_createdAt desc)

// Activities (last 4)
*[_type == "activity"] | order(date desc)[0...4]

// Media (last 6)
*[_type == "mediaItem"] | order(_createdAt desc)[0...6]

// Events
*[_type == "event"] | order(date desc)

// Workshops
*[_type == "workshop"] | order(date desc)

// Committee
*[_type == "committeeMember"] | order(_createdAt asc)

// Alumni
*[_type == "alumni"] | order(batch desc)

// Members
*[_type == "member"] | order(name asc)
```

## Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Sanity Image URLs](https://www.sanity.io/docs/image-urls)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)

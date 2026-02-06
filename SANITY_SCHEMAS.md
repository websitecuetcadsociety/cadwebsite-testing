# Sanity CMS Schemas

Add these schemas to your Sanity Studio project.

## Announcement Schema

```javascript
// schemas/announcement.js
export default {
  name: 'announcement',
  title: 'Announcement',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'link',
      title: 'Link (Optional)',
      type: 'string',
      description: 'URL to redirect when clicked (e.g., /events, /register)'
    },
    {
      name: 'type',
      title: 'Announcement Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Event', value: 'event' },
          { title: 'Workshop', value: 'workshop' },
          { title: 'Urgent', value: 'urgent' }
        ]
      },
      initialValue: 'info'
    },
    {
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to show/hide this announcement',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
      isActive: 'isActive'
    },
    prepare({ title, type, isActive }) {
      return {
        title: title,
        subtitle: `${type || 'info'} - ${isActive ? '🟢 Active' : '🔴 Inactive'}`
      }
    }
  }
}
```

## Activity Schema

```javascript
// schemas/activity.js
export default {
  name: 'activity',
  title: 'Activity',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'gallery',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Additional images for this activity'
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Competition', value: 'competition' },
          { title: 'Seminar', value: 'seminar' },
          { title: 'Training', value: 'training' },
          { title: 'Social', value: 'social' },
          { title: 'Field Trip', value: 'field-trip' },
          { title: 'Other', value: 'other' }
        ]
      }
    },
    {
      name: 'venue',
      title: 'Venue',
      type: 'string'
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key highlights or achievements from this activity'
    }
  ],
  orderings: [
    {
      title: 'Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
      category: 'category'
    },
    prepare({ title, date, media, category }) {
      return {
        title: title,
        subtitle: `${category || 'Activity'} - ${date || 'No date'}`,
        media: media
      }
    }
  }
}
```

## How to Add Schemas

1. Navigate to your Sanity Studio project folder
2. Create the schema files in `schemas/` folder
3. Import them in your `schemas/index.js`:

```javascript
import announcement from './announcement'
import activity from './activity'

export const schemaTypes = [
  // ... other schemas
  announcement,
  activity,
]
```

4. Run `sanity dev` to see the new content types in your Studio

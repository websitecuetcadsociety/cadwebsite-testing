import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// TODO: Configure your Sanity client with your project credentials
// 1. Create a Sanity project at https://www.sanity.io/
// 2. Copy your project ID and dataset name
// 3. Add them to your .env file as VITE_SANITY_PROJECT_ID and VITE_SANITY_DATASET
// 4. Create schemas in your Sanity Studio for: message, activity, mediaItem, event, workshop, committeeMember, alumni, member
// 5. IMPORTANT: For images to work, add 'image' type fields in your schemas (e.g., { name: 'image', type: 'image' })

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Use CDN for faster response (set to false if you need real-time updates)
  apiVersion: '2024-01-01',
});

// Initialize the image URL builder
const builder = imageUrlBuilder(sanityClient);

// Helper function to build image URLs from Sanity
export const urlFor = (source: any) => {
  if (!source) return '';
  return builder.image(source).url();
};

// Type definitions for your CMS data
export interface Message {
  _id: string;
  name: string;
  position: string;
  message: string;
  image?: any;
}

export interface Activity {
  _id: string;
  title: string;
  description: string;
  date: string;
  image?: any;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  time?: string;
  venue?: string;
  image?: any;
  eventType?: string;
  rulebook?: string;
  eventLink?: string;
  registrationOpen?: boolean;
}

export interface Workshop {
  _id: string;
  title: string;
  description: string;
  instructor?: string;
  date: string;
  duration?: string;
  image?: any;
}

export interface CommitteeMember {
  _id: string;
  name: string;
  position: string;
  department?: string;
  image?: any;
  email?: string;
  linkedin?: string;
  facebook?: string;
  panelType?: 'advisory' | 'committee';
}

export interface Alumni {
  _id: string;
  name: string;
  batch: string;
  passingYear?: string;
  workArea?: string;
  currentPosition?: string;
  company?: string;
  image?: any;
  linkedin?: string;
  facebook?: string;
  email?: string;
}

export interface MediaItem {
  _id: string;
  title?: string;
  image: any;
  category?: string;
}

export interface Member {
  _id: string;
  name: string;
  studentId: string;
  department: string;
  batch: string;
  email?: string;
  image?: any;
}

export interface Announcement {
  _id: string;
  title: string;
  message: string;
  link?: string;
  type?: 'info' | 'event' | 'workshop' | 'urgent';
  isActive?: boolean;
}

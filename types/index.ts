// Type definitions for the DSG website

export interface HeroSlide {
  id: number;
  pillar: string;
  headline: string;
  subtext: string;
  ctaLabel: string;
  ctaLink: string;
  image: string;
  altText: string;
  badge?: string;
  microStory?: string;
}

export interface NavLink {
  href: string;
  label: string;
  children?: NavLink[];
}

export interface WorkPillar {
  id: string;
  title: string;
  slug: string;
  color: 'blue' | 'pink';
  icon: string;
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  featuredImage: string;
  partners: Partner[];
  impactMetrics: Metric[];
  startDate: Date;
  endDate?: Date;
}

export interface Partner {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  description?: string;
}

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
}

export interface TeamVoice {
  id: string;
  name: string;
  role?: string;
  quote: string;
  image?: string;
  pillar: string;
  featured: boolean;
}

export interface Resource {
  id: string;
  title: string;
  type: 'toolkit' | 'zine' | 'guide' | 'media' | 'video' | 'podcast';
  file?: string;
  description: string;
  tags: string[];
  downloadCount?: number;
  publishedDate: Date;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  location?: string;
  isOnline: boolean;
  registrationUrl?: string;
  category: string;
  image?: string;
}

export interface StorySubmission {
  id?: string;
  authorName?: string;
  authorEmail?: string;
  storyTitle: string;
  storyContent: string;
  mediaUrls?: string[];
  consentGiven: boolean;
  anonymous: boolean;
  status?: 'pending' | 'approved' | 'published' | 'rejected';
  submittedAt?: Date;
}

export interface NewsletterSubscriber {
  email: string;
  interests?: string[];
  subscribedAt?: Date;
}

export interface DonationData {
  amount: number;
  currency: string;
  recurring: boolean;
  donorEmail?: string;
  donorName?: string;
}
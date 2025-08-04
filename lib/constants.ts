// Site configuration and constants
export const SITE_CONFIG = {
  name: 'Diaspora Solidarity Group',
  shortName: 'DSG',
  description: 'Community-led action for climate migrants, feminist solidarity, youth empowerment, migrant justice, and decolonial education.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://diasporasolidarity.org',
  email: 'info@diasporasolidarity.org',
  social: {
    instagram: 'https://www.instagram.com/diasporasolidarity',
    facebook: 'https://www.facebook.com/diasporasolidarity',
    linkedin: 'https://www.linkedin.com/company/diasporasolidarity',
    twitter: 'https://twitter.com/diasporasolidarity',
  },
};

// Navigation links
export const NAV_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Our Work' },
  { href: '/projects', label: 'Projects & Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/share-your-voice', label: 'Share Your Voice' },
  { href: '/contact', label: 'Contact' },
];

// Work pillars
export const WORK_PILLARS = [
  {
    id: 'climate-justice',
    title: 'Climate Justice & Climate Migrants',
    slug: 'climate-justice',
    color: 'blue',
    icon: '🌍',
  },
  {
    id: 'feminist-solidarity',
    title: 'Women\'s Rights & Feminist Solidarity',
    slug: 'feminist-solidarity',
    color: 'pink',
    icon: '💪',
  },
  {
    id: 'youth-empowerment',
    title: 'Youth Empowerment',
    slug: 'youth-empowerment',
    color: 'blue',
    icon: '✊',
  },
  {
    id: 'migrant-justice',
    title: 'Migrant Justice & Anti-Racism',
    slug: 'migrant-justice',
    color: 'pink',
    icon: '🤝',
  },
  {
    id: 'decolonial-education',
    title: 'Intersectionality & Decolonial Education',
    slug: 'decolonial-education',
    color: 'blue',
    icon: '📚',
  },
];

// Hero carousel data
export const HERO_SLIDES = [
  {
    id: 1,
    pillar: 'climate-justice',
    headline: 'Climate Displacement Isn\'t Inevitable—We Build Just Futures',
    subtext: 'Centering the voices of climate migrants, DSG drives community-led adaptation and resilience work. Stand with those on the frontlines of environmental change.',
    ctaLabel: 'Learn More',
    ctaLink: '/work/climate-justice',
    image: '/images/hero-climate.jpg',
    altText: 'Community members in a coastal town meeting, planning climate adaptation strategies, with a semi-transparent map overlay highlighting affected regions.',
    badge: 'Ongoing Initiative',
    microStory: 'When the sea rose, we didn\'t wait for permission—our community designed its own shelter. DSG helped amplify our voice so others could see that climate migrants are leaders, not victims.',
  },
  {
    id: 2,
    pillar: 'feminist-solidarity',
    headline: 'Centering Women, Centering Justice',
    subtext: 'Our feminist solidarity work weaves protection, leadership, and community care to transform systems—new initiatives launching in 2025. Join the collective.',
    ctaLabel: 'Get Involved',
    ctaLink: '/work/feminist-solidarity',
    image: '/images/hero-women.jpg',
    altText: 'Diverse women in conversation and mutual support, smiling and engaged in a community space, with empowering graphic accents overlayed.',
    badge: 'Coming 2025',
    microStory: 'I found strength in a circle of women who saw me, protected me, and gave me tools to lead. Together we\'re building initiatives that won\'t wait for permission.',
  },
  {
    id: 3,
    pillar: 'youth-empowerment',
    headline: 'Youth Voices, Lasting Change',
    subtext: 'Training, exchanges, and storytelling led by young people shaping resilient, inclusive movements. Amplify your voice with DSG.',
    ctaLabel: 'Share Your Story',
    ctaLink: '/work/youth-empowerment',
    image: '/images/hero-youth.jpg',
    altText: 'Young people in a workshop writing on colorful post-it notes and presenting ideas, laughing and collaborating.',
    badge: 'Youth-Led',
    microStory: 'They told us to be patient—DSG told us to act. Now our stories guide training, policy conversations, and youth-led campaigns across borders.',
  },
  {
    id: 4,
    pillar: 'migrant-justice',
    headline: 'Justice Without Borders: Stand With Migrants',
    subtext: 'DSG combines grassroots advocacy, legal support, and anti-racist education to confront exclusion and uphold dignity.',
    ctaLabel: 'Take Action',
    ctaLink: '/work/migrant-justice',
    image: '/images/hero-migrant.jpg',
    altText: 'Activists and migrants holding signs at a community rally; a legal aid worker speaks with a person in a supportive setting.',
    badge: 'Rights & Advocacy',
    microStory: 'Legal support gave me clarity; community solidarity gave me courage. DSG helped turn a moment of fear into collective resistance.',
  },
  {
    id: 5,
    pillar: 'decolonial-education',
    headline: 'Unlearn, Relearn, Together',
    subtext: 'Workshops and resources that challenge entrenched power, elevate marginalized knowledge, and build collective understanding across identities.',
    ctaLabel: 'Discover Resources',
    ctaLink: '/work/decolonial-education',
    image: '/images/hero-decolonial.jpg',
    altText: 'A decolonial education workshop in progress: diverse participants writing on large sheets of paper with keywords like identity, power, and solidarity visible.',
    badge: 'Learn & Share',
    microStory: 'I thought I knew history—then I learned whose stories were missing. DSG\'s workshops helped me unlearn assumptions and reimagine shared futures.',
  },
];
import { HeroCarousel } from '@/components/sections/HeroCarousel';
import { Navigation } from '@/components/layout/Navigation';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { WORK_PILLARS, SITE_CONFIG } from '@/lib/constants';
import { getHomepageContent } from '@/lib/content';
import { Heart, Users, Globe, BookOpen, Megaphone } from 'lucide-react';

// Remove duplicate placeholder image handling - it's now in HeroCarousel component

export default function Home() {
  const content = getHomepageContent();
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Main Content */}
      <main id="main-content" className="pt-16 pb-24">
        {/* Mission Snapshot */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {content.mission_section?.title || 'Building Solidarity Across Borders'}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {content.mission_section?.description || `${SITE_CONFIG.description} Through grassroots action and collective care, we're creating a world where everyone belongs.`}
              </p>
            </div>
          </Container>
        </section>

        {/* Featured Campaign */}
        <section className="py-16">
          <Container>
            <div className="bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 rounded-2xl p-8 md:p-12 text-white">
              <Badge variant="default" className="mb-4 bg-white/20 text-white">
                {content.featured_campaign?.badge || 'Current Focus'}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {content.featured_campaign?.title || '2025: Year of Feminist Futures'}
              </h2>
              <p className="text-lg mb-8 max-w-2xl">
                {content.featured_campaign?.description || 'Join us as we launch groundbreaking initiatives centering women\'s leadership and community care. Together, we\'re transforming systems and building collective power.'}
              </p>
              <Button
                href={content.featured_campaign?.button_link || '/work/feminist-solidarity'}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-dsg-blue-500"
              >
                {content.featured_campaign?.button_text || 'Learn About Our 2025 Initiatives'}
              </Button>
            </div>
          </Container>
        </section>

        {/* Impact Metrics */}
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-12">
              {content.impact_metrics?.title || 'Our Impact'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(content.impact_metrics?.metrics || [
                { number: '250+', label: 'Community voices amplified', icon: 'megaphone' },
                { number: '40+', label: 'International partners', icon: 'globe' },
                { number: '500+', label: 'Youth trained', icon: 'users' },
                { number: '15', label: 'Toolkits published', icon: 'book' },
              ]).map((metric, index) => {
                const IconComponent = metric.icon === 'megaphone' ? Megaphone : 
                                   metric.icon === 'globe' ? Globe :
                                   metric.icon === 'users' ? Users : BookOpen;
                return (
                  <Card key={index} variant="bordered" className="text-center">
                    <CardHeader>
                      <IconComponent className="w-8 h-8 mx-auto mb-4 text-dsg-blue-500" />
                      <CardTitle className="text-3xl font-bold text-dsg-blue-500">
                        {metric.number}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {metric.label}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Our Work Preview */}
        <section className="py-16">
          <Container>
            <h2 className="text-3xl font-bold text-center mb-4">
              {content.our_work?.title || 'Our Work'}
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              {content.our_work?.description || 'Explore our five core pillars of action, each driven by community needs and collective wisdom.'}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WORK_PILLARS.map((pillar) => (
                <Card 
                  key={pillar.id} 
                  variant="elevated" 
                  className="hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <div className="text-4xl mb-4">{pillar.icon}</div>
                    <CardTitle className="text-xl">{pillar.title}</CardTitle>
                    <CardDescription className="mt-3">
                      Building resilient communities through {pillar.title.toLowerCase()}.
                    </CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <Button
                      href={`/work/${pillar.slug}`}
                      variant="link"
                      className="p-0 h-auto font-medium"
                    >
                      Explore →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Call to Action Trio */}
        <section className="py-16 bg-gradient-to-br from-dsg-blue-50 to-dsg-pink-50">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(content.call_to_action?.sections || [
                { icon: 'heart', title: 'Join the Movement', description: 'Be part of our collective working for justice and solidarity.', button_text: 'Join Us', button_link: '/get-involved/join' },
                { icon: 'users', title: 'Support Our Work', description: 'Your contribution powers community-led change worldwide.', button_text: 'Donate', button_link: '/get-involved/support' },
                { icon: 'megaphone', title: 'Share Your Voice', description: 'Your story matters. Share it with our global community.', button_text: 'Share Story', button_link: '/share-your-voice' }
              ]).map((section, index) => {
                const IconComponent = section.icon === 'heart' ? Heart : 
                                     section.icon === 'users' ? Users : Megaphone;
                const iconColor = section.icon === 'heart' ? 'text-dsg-pink-500' : 
                                 section.icon === 'users' ? 'text-dsg-blue-500' : 'text-dsg-pink-500';
                const buttonVariant = section.icon === 'users' ? 'secondary' : 
                                     section.icon === 'megaphone' ? 'outline' : 'primary';
                
                return (
                  <div key={index} className="text-center">
                    <IconComponent className={`w-12 h-12 mx-auto mb-4 ${iconColor}`} />
                    <h3 className="text-xl font-bold mb-3">{section.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {section.description}
                    </p>
                    <Button href={section.button_link} variant={buttonVariant}>
                      {section.button_text}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <Container>
            <Card variant="bordered" className="max-w-2xl mx-auto text-center p-8">
              <CardHeader>
                <CardTitle className="text-2xl">
                  {content.newsletter?.title || 'Stay Connected'}
                </CardTitle>
                <CardDescription className="text-base mt-2">
                  {content.newsletter?.description || 'Get updates on our work, upcoming events, and opportunities to take action.'}
                </CardDescription>
              </CardHeader>
              <form className="mt-6 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address for newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder={content.newsletter?.placeholder || 'Enter your email'}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-dsg-blue-500"
                  required
                  aria-describedby="newsletter-description"
                />
                <p id="newsletter-description" className="sr-only">
                  Subscribe to receive updates on our work, upcoming events, and opportunities to take action.
                </p>
                <Button type="submit" variant="primary">
                  {content.newsletter?.button_text || 'Subscribe'}
                </Button>
              </form>
            </Card>
          </Container>
        </section>
      </main>

      {/* Footer - Placeholder */}
      <footer className="bg-gray-900 text-white py-12">
        <Container>
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
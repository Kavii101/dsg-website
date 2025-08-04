import { Navigation } from '@/components/layout/Navigation';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getWorkPillarContent, getSiteSettings } from '@/lib/content';
import { Quote, ArrowRight, Users, Target, Calendar } from 'lucide-react';
import { notFound } from 'next/navigation';

interface WorkPillarPageProps {
  params: {
    pillar: string;
  };
}

export async function generateStaticParams() {
  return [
    { pillar: 'climate-justice' },
    { pillar: 'feminist-solidarity' },
    { pillar: 'youth-empowerment' },
    { pillar: 'migrant-justice' },
    { pillar: 'decolonial-education' },
  ];
}

export default function WorkPillarPage({ params }: WorkPillarPageProps) {
  const content = getWorkPillarContent(params.pillar);
  const siteSettings = getSiteSettings();
  
  // If pillar content doesn't exist, show 404
  if (!content) {
    notFound();
  }
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
              {content.hero?.badge || 'Our Work'}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {content.hero?.title || 'Our Work'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              {content.hero?.subtitle || 'Building community power for justice'}
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              {content.hero?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </p>
          </div>
        </Container>
      </section>

      <main className="pt-16 pb-24">
        {/* Overview Section */}
        <section className="py-16">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {content.overview?.title || 'Our Approach'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.overview?.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
                </p>
              </div>
              <div className="bg-gray-100 rounded-2xl h-80 flex items-center justify-center">
                <span className="text-gray-500">Overview Image Placeholder</span>
              </div>
            </div>
          </Container>
        </section>

        {/* Key Initiatives Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Key Initiatives
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(content.key_initiatives || []).map((initiative: any, index: number) => (
                <Card key={index} variant="elevated" className="hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Initiative Image</span>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge 
                        variant={initiative.status === 'Ongoing' ? 'default' : 
                                initiative.status === '2025 Launch' ? 'secondary' : 'outline'}
                        className={initiative.status === 'Ongoing' ? 'bg-green-100 text-green-800' :
                                  initiative.status === '2025 Launch' ? 'bg-blue-100 text-blue-800' :
                                  initiative.status === 'Active' ? 'bg-dsg-blue-100 text-dsg-blue-800' :
                                  'bg-orange-100 text-orange-800'}
                      >
                        {initiative.status}
                      </Badge>
                      <Target className="w-5 h-5 text-dsg-blue-500" />
                    </div>
                    <CardTitle className="text-xl">{initiative.title}</CardTitle>
                    <CardDescription className="mt-3">
                      {initiative.description}
                    </CardDescription>
                  </CardHeader>
                  <div className="px-6 pb-6">
                    <Button
                      variant="link"
                      className="p-0 h-auto font-medium text-dsg-blue-500 hover:text-dsg-blue-600"
                    >
                      Learn More <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Impact Stories Section */}
        <section className="py-16">
          <Container>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Impact Stories
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {(content.impact_stories || []).map((story: any, index: number) => (
                <Card key={index} variant="bordered" className="p-8">
                  <div className="flex items-start space-x-4">
                    <Quote className="w-8 h-8 text-dsg-blue-500 flex-shrink-0 mt-1" />
                    <div>
                      <blockquote className="text-lg text-gray-700 italic mb-4">
                        "{story.quote}"
                      </blockquote>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{story.author}</p>
                          <p className="text-sm text-gray-600">{story.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Get Involved Section */}
        <section className="py-16 bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get Involved in This Work
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Join our community and help advance this critical work. Your voice and action matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/get-involved/join"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-dsg-blue-500"
                >
                  Join Our Movement
                </Button>
                <Button
                  href="/get-involved/support"
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Support This Work
                </Button>
                <Button
                  href="/share-your-voice"
                  variant="link"
                  size="lg"
                  className="text-white hover:text-white/80 underline underline-offset-4"
                >
                  Share Your Story
                </Button>
              </div>
            </div>
          </Container>
        </section>

        {/* Related Work Section */}
        <section className="py-16 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Explore Our Other Work
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: 'Climate Justice', slug: 'climate-justice' },
                { name: 'Feminist Solidarity', slug: 'feminist-solidarity' },
                { name: 'Youth Empowerment', slug: 'youth-empowerment' },
                { name: 'Migrant Justice', slug: 'migrant-justice' },
                { name: 'Decolonial Education', slug: 'decolonial-education' }
              ].filter(pillar => pillar.slug !== params.pillar).map((pillar) => (
                <Button
                  key={pillar.slug}
                  href={`/work/${pillar.slug}`}
                  variant="outline"
                  className="hover:bg-dsg-blue-50 hover:border-dsg-blue-500 hover:text-dsg-blue-600"
                >
                  {pillar.name}
                </Button>
              ))}
            </div>
          </Container>
        </section>
      </main>

      {/* Footer - Placeholder */}
      <footer className="bg-gray-900 text-white py-12">
        <Container>
          <div className="text-center">
            <p className="text-gray-400">
              © 2024 {siteSettings.site_info?.name || 'Diaspora Solidarity Group'}. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </>
  );
}
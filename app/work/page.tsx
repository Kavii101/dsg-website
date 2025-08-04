import { Navigation } from '@/components/layout/Navigation';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getSiteSettings } from '@/lib/content';
import { WORK_PILLARS } from '@/lib/constants';
import { ArrowRight, Target } from 'lucide-react';

export default function WorkPage() {
  const siteSettings = getSiteSettings();
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Work
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Five pillars of community-led action for justice and solidarity
            </p>
            <p className="text-lg opacity-90 max-w-3xl mx-auto">
              Our work spans across interconnected areas of justice, each driven by community needs 
              and collective wisdom. Explore how we're building power together.
            </p>
          </div>
        </Container>
      </section>

      <main className="pt-16 pb-24">
        {/* Work Pillars Overview */}
        <section className="py-16">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Areas of Impact
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Each pillar represents a critical area where community leadership drives meaningful change.
                Our integrated approach recognizes that justice issues are interconnected and require 
                collective action across all areas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {WORK_PILLARS.map((pillar) => (
                <Card key={pillar.id} variant="elevated" className="hover:shadow-xl transition-all duration-300 group">
                  <div className="h-64 bg-gradient-to-br from-dsg-blue-50 to-dsg-pink-50 rounded-t-lg flex items-center justify-center">
                    <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {pillar.icon}
                    </div>
                  </div>
                  <CardHeader className="p-8">
                    <div className="flex items-center justify-between mb-3">
                      <Target className="w-6 h-6 text-dsg-blue-500" />
                      <span className="text-sm text-gray-500 font-medium">Core Pillar</span>
                    </div>
                    <CardTitle className="text-2xl mb-4 group-hover:text-dsg-blue-600 transition-colors">
                      {pillar.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed mb-6">
                      Building resilient communities through {pillar.title.toLowerCase()}. 
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                      tempor incididunt ut labore et dolore magna aliqua.
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <Button
                        href={`/work/${pillar.slug}`}
                        variant="primary"
                        className="group-hover:bg-dsg-blue-600"
                      >
                        Explore This Work
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <div className="text-sm text-gray-500">
                        Learn More →
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* Interconnected Approach */}
        <section className="py-16 bg-gray-50">
          <Container>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                An Interconnected Approach
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our work recognizes that climate justice, feminist solidarity, youth empowerment, 
                migrant justice, and decolonial education are deeply interconnected. Real change 
                happens when we address root causes and build power across all these areas simultaneously.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-dsg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Community-Led</h3>
                  <p className="text-gray-600">
                    All our work is driven by the communities most impacted by injustice, 
                    ensuring authentic leadership and sustainable solutions.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dsg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Interconnected</h3>
                  <p className="text-gray-600">
                    We understand that justice issues don't exist in isolation. Our integrated 
                    approach addresses root causes across all pillars.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-dsg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Action-Oriented</h3>
                  <p className="text-gray-600">
                    Every initiative is designed to create tangible change, from policy advocacy 
                    to direct community support and empowerment.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-dsg-blue-500 to-dsg-blue-600 text-white">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Join Our Movement for Justice
              </h2>
              <p className="text-lg mb-8 opacity-90">
                Whether you're passionate about one pillar or all five, there are many ways to get 
                involved and make a difference. Your voice and action matter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/get-involved/join"
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-dsg-blue-500"
                >
                  Join Our Community
                </Button>
                <Button
                  href="/get-involved/support"
                  variant="secondary"
                  size="lg"
                  className="bg-white/10 text-white hover:bg-white/20"
                >
                  Support Our Work
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
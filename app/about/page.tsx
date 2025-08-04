import { Navigation } from '@/components/layout/Navigation';
import { Container } from '@/components/ui/Container';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { getAboutPageContent, getSiteSettings } from '@/lib/content';
import { Heart, Users, Globe, Star, Calendar } from 'lucide-react';

export default function AboutPage() {
  const content = getAboutPageContent();
  const siteSettings = getSiteSettings();
  
  return (
    <>
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[500px] bg-gradient-to-br from-dsg-blue-600 via-dsg-blue-500 to-dsg-pink-500 flex items-center justify-center text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-dsg-pink-300 rounded-full -translate-x-24 -translate-y-24"></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        
        <Container className="relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
              ✨ Community-Led Since 2020
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent leading-tight">
              {content.hero_section?.title || 'About Diaspora Solidarity Group'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light text-gray-100 max-w-3xl mx-auto">
              {content.hero_section?.subtitle || 'Building bridges across borders through community-led action'}
            </p>
            <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              {content.hero_section?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            </p>
          </div>
        </Container>
      </section>

      <main className="pt-16 pb-24">
        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-br from-white to-dsg-blue-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center px-3 py-1 bg-dsg-blue-100 text-dsg-blue-700 rounded-full text-sm font-medium">
                  🎯 Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {content.mission_section?.title || 'Our Mission'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.mission_section?.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-12 bg-dsg-blue-500 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Community-Centered</p>
                    <p className="text-sm text-gray-600">Every initiative starts with community voices</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-dsg-pink-100 to-dsg-blue-100 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dsg-pink-500/20 to-dsg-blue-500/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="w-10 h-10 text-dsg-blue-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Mission Visualization</p>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/30 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-dsg-pink-300/40 rounded-full"></div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Vision Section */}
        <section className="py-20 bg-gradient-to-br from-dsg-pink-50 to-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="bg-gradient-to-br from-dsg-blue-100 to-dsg-pink-100 rounded-3xl h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-dsg-blue-500/20 to-dsg-pink-500/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Globe className="w-10 h-10 text-dsg-pink-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Vision for the Future</p>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute top-6 left-6 w-14 h-14 bg-dsg-blue-300/40 rounded-full"></div>
                  <div className="absolute bottom-6 right-6 w-18 h-18 bg-white/30 rounded-full"></div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <div className="inline-flex items-center px-3 py-1 bg-dsg-pink-100 text-dsg-pink-700 rounded-full text-sm font-medium">
                  🌍 Our Vision
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {content.vision_section?.title || 'Our Vision'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {content.vision_section?.content || 'Sed ut perspiciatis unde omnis iste natus error...'}
                </p>
                <div className="flex items-center space-x-4 pt-4">
                  <div className="w-12 h-12 bg-dsg-pink-500 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Global Impact</p>
                    <p className="text-sm text-gray-600">Building solidarity across all borders</p>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-br from-white via-dsg-blue-50/50 to-dsg-pink-50/50">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-dsg-blue-100 to-dsg-pink-100 text-gray-700 rounded-full text-sm font-medium mb-6">
                💎 Core Values
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {content.values_section?.title || 'Our Values'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                The principles that guide every action we take and every community we serve.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(content.values_section?.values || [
                { title: 'Community-Led Action', description: 'Lorem ipsum dolor sit amet...', icon: 'users' },
                { title: 'Intersectional Justice', description: 'Ut enim ad minim veniam...', icon: 'heart' },
                { title: 'Solidarity Across Borders', description: 'Duis aute irure dolor...', icon: 'globe' },
                { title: 'Youth Empowerment', description: 'Excepteur sint occaecat...', icon: 'star' }
              ]).map((value, index) => {
                const IconComponent = value.icon === 'users' ? Users :
                                     value.icon === 'heart' ? Heart :
                                     value.icon === 'globe' ? Globe : Star;
                const colorIndex = index % 4;
                const bgColors = ['from-dsg-blue-500 to-dsg-blue-600', 'from-dsg-pink-500 to-dsg-pink-600', 'from-dsg-blue-600 to-dsg-pink-500', 'from-dsg-pink-600 to-dsg-blue-500'];
                const bgLightColors = ['bg-dsg-blue-50', 'bg-dsg-pink-50', 'bg-gradient-to-br from-dsg-blue-50 to-dsg-pink-50', 'bg-gradient-to-br from-dsg-pink-50 to-dsg-blue-50'];
                
                return (
                  <Card key={index} variant="elevated" className={`text-center hover:shadow-2xl transition-all duration-300 group border-0 ${bgLightColors[colorIndex]} overflow-hidden relative`}>
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10"></div>
                    <CardHeader className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-br ${bgColors[colorIndex]} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900 mb-3 group-hover:text-dsg-blue-600 transition-colors">{value.title}</CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Story & Timeline Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-dsg-blue-500 rounded-full -translate-x-48 -translate-y-48"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-dsg-pink-500 rounded-full translate-x-40 translate-y-40"></div>
          </div>
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-dsg-blue-100 to-dsg-pink-100 text-gray-700 rounded-full text-sm font-medium mb-6">
                  📖 Our Journey
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  {content.story_section?.title || 'Our Story'}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  {content.story_section?.content || 'At vero eos et accusamus et iusto odio dignissimos...'}
                </p>
              </div>
              
              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-dsg-blue-500 via-dsg-pink-400 to-dsg-blue-500"></div>
                
                <div className="space-y-12">
                  {(content.story_section?.timeline || [
                    { year: '2020', title: 'Foundation', description: 'Lorem ipsum dolor sit amet...' },
                    { year: '2021', title: 'First Major Campaign', description: 'Sed do eiusmod tempor...' },
                    { year: '2024', title: 'Current Focus', description: 'Excepteur sint occaecat...' }
                  ]).map((event, index) => {
                    const isEven = index % 2 === 0;
                    const bgColor = isEven ? 'from-dsg-blue-500 to-dsg-blue-600' : 'from-dsg-pink-500 to-dsg-pink-600';
                    
                    return (
                      <div key={index} className="flex items-start space-x-8 relative">
                        <div className="flex-shrink-0 relative z-10">
                          <div className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${bgColor} text-white rounded-full font-bold shadow-lg`}>
                            <Calendar className="w-7 h-7" />
                          </div>
                        </div>
                        <div className={`flex-grow bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 ${isEven ? 'ml-0' : 'ml-8'}`}>
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge variant="outline" className={`${isEven ? 'text-dsg-blue-600 border-dsg-blue-600 bg-dsg-blue-50' : 'text-dsg-pink-600 border-dsg-pink-600 bg-dsg-pink-50'} font-semibold`}>
                              {event.year}
                            </Badge>
                            <h3 className="text-xl font-bold text-gray-900">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-gradient-to-br from-white to-dsg-blue-50/30">
          <Container>
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-dsg-blue-100 to-dsg-pink-100 text-gray-700 rounded-full text-sm font-medium mb-6">
                👥 Our Team
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {content.team_section?.title || 'Our Team'}
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {content.team_section?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {(content.team_section?.team_members || [
                { name: 'Lorem Ipsum', role: 'Executive Director', bio: 'Lorem ipsum dolor sit amet...', image: 'team-1.jpg' },
                { name: 'Dolor Sit', role: 'Program Manager', bio: 'Ut enim ad minim veniam...', image: 'team-2.jpg' },
                { name: 'Consectetur Amet', role: 'Community Organizer', bio: 'Duis aute irure dolor...', image: 'team-3.jpg' },
                { name: 'Adipiscing Elite', role: 'Communications Director', bio: 'Excepteur sint occaecat...', image: 'team-4.jpg' }
              ]).map((member, index) => {
                const colorIndex = index % 4;
                const gradients = ['from-dsg-blue-400 to-dsg-blue-500', 'from-dsg-pink-400 to-dsg-pink-500', 'from-dsg-blue-500 to-dsg-pink-400', 'from-dsg-pink-500 to-dsg-blue-400'];
                
                return (
                  <Card key={index} variant="elevated" className="text-center group hover:shadow-2xl transition-all duration-300 border-0 bg-white overflow-hidden">
                    <CardHeader className="relative">
                      {/* Background decoration */}
                      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-dsg-blue-50 to-dsg-pink-50"></div>
                      
                      <div className="relative z-10">
                        <div className={`w-28 h-28 mx-auto mb-6 bg-gradient-to-br ${gradients[colorIndex]} rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 -mt-2`}>
                          <Users className="w-14 h-14 text-white" />
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-dsg-blue-600 transition-colors">{member.name}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`mb-4 ${
                            colorIndex % 2 === 0 
                              ? 'bg-dsg-blue-100 text-dsg-blue-700' 
                              : 'bg-dsg-pink-100 text-dsg-pink-700'
                          }`}
                        >
                          {member.role}
                        </Badge>
                        <CardDescription className="text-sm text-gray-600 leading-relaxed">
                          {member.bio}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </Container>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-dsg-blue-600 via-dsg-blue-500 to-dsg-pink-500 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-dsg-pink-300 rounded-full -translate-x-48 translate-y-48"></div>
            <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-white rounded-full translate-x-24 -translate-y-24"></div>
          </div>
          
          <Container className="relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="mb-6 inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                🚀 Ready to Get Started?
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent leading-tight">
                {content.call_to_action?.title || 'Join Our Movement'}
              </h2>
              <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                {content.call_to_action?.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  href={content.call_to_action?.primary_button?.link || '/get-involved'}
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-dsg-blue-600 font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {content.call_to_action?.primary_button?.text || 'Get Involved'}
                </Button>
                <Button
                  href={content.call_to_action?.secondary_button?.link || '/work'}
                  variant="secondary"
                  size="lg"
                  className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-white/30"
                >
                  {content.call_to_action?.secondary_button?.text || 'Learn About Our Work'}
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
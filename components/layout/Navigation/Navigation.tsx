'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { MobileMenu } from './MobileMenu';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';
import { getNavigationMenu, getSiteSettings } from '@/lib/content';
import { cn } from '@/lib/utils';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navigationContent = getNavigationMenu();
  const siteSettings = getSiteSettings();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-sm'
            : 'bg-transparent'
        )}
      >
        <Container>
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
              aria-label={`${siteSettings.site_info?.name || SITE_CONFIG.name} - Home`}
            >
              <Image
                src={siteSettings.images?.logo || "/images/dsg-logo.png"}
                alt="DSG Logo"
                width={44}
                height={44}
                className="group-hover:scale-105 transition-transform"
              />
              <span className={cn(
                'font-bold text-lg hidden sm:block transition-colors',
                isScrolled ? 'text-gray-900' : 'text-white'
              )}>
                {siteSettings.site_info?.short_name || SITE_CONFIG.shortName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {(navigationContent.main_navigation || NAV_LINKS).map((link) => (
                <Link
                  key={link.link || link.href}
                  href={link.link || link.href}
                  className={cn(
                    'font-medium transition-colors hover:text-dsg-blue-500 py-2 px-1',
                    isScrolled ? 'text-gray-700' : 'text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search Button */}
              <button
                className={cn(
                  'p-2 rounded-lg transition-colors hover:bg-gray-100/20 focus:outline-none focus:ring-2 focus:ring-dsg-blue-500 focus:ring-offset-2',
                  isScrolled ? 'text-gray-700' : 'text-white'
                )}
                aria-label="Search website"
                title="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* CTA Buttons - Desktop */}
              <div className="hidden lg:flex items-center space-x-3">
                {(navigationContent.cta_buttons || [
                  { type: 'outline', label: 'Join', link: '/get-involved/join' },
                  { type: 'primary', label: 'Support', link: '/get-involved/support' }
                ]).map((button, index) => (
                  <Button
                    key={index}
                    href={button.link}
                    variant={button.type === 'primary' ? 'primary' : 'outline'}
                    size="sm"
                    className={cn(
                      button.type !== 'primary' && !isScrolled && 'border-white text-white hover:bg-white/10'
                    )}
                  >
                    {button.label}
                  </Button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={cn(
                  'lg:hidden p-2 rounded-lg transition-colors hover:bg-gray-100/20 focus:outline-none focus:ring-2 focus:ring-dsg-blue-500 focus:ring-offset-2',
                  isScrolled ? 'text-gray-700' : 'text-white'
                )}
                aria-label="Open navigation menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                title="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
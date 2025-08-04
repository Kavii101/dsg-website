import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 lg:hidden transition-transform duration-300 transform',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span id="mobile-menu-title" className="text-lg font-semibold">Navigation Menu</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-dsg-blue-500"
              aria-label="Close navigation menu"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-dsg-blue-500 transition-colors"
                    onClick={onClose}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Buttons */}
          <div className="p-4 border-t space-y-3">
            <Button
              href="/get-involved/join"
              variant="primary"
              className="w-full"
              onClick={onClose}
            >
              Join Movement
            </Button>
            <Button
              href="/get-involved/support"
              variant="secondary"
              className="w-full"
              onClick={onClose}
            >
              Support Us
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
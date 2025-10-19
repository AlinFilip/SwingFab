import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon, BellIcon, MessageSquareIcon } from './Icons';
import { UserProfile } from '../types';
import UserMenu from './UserMenu';

interface HeaderProps {
    currentUser: UserProfile | null;
    onLogout: () => void;
    onNavigate: (view: 'my-account' | 'edit-profile') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-brand-surface/80 backdrop-blur-sm sticky top-0 z-40 shadow-md shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
             <h1 className="text-2xl font-bold tracking-tight text-white cursor-pointer" onClick={() => onNavigate('dashboard' as any)}>
              Swings<span className="text-brand-primary">fab</span>
            </h1>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block w-full max-w-sm lg:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-brand-text-muted" />
              </div>
              <input
                type="text"
                placeholder="Search members, interests, location..."
                className="w-full bg-brand-bg border border-slate-700 rounded-full py-2 pl-10 pr-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Icons and User Menu */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
              <MessageSquareIcon className="h-6 w-6 text-brand-text-muted" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-700/50 transition-colors">
                <div className="relative">
                    <BellIcon className="h-6 w-6 text-brand-text-muted" />
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-brand-secondary ring-2 ring-brand-surface"></span>
                </div>
            </button>
            <div className="relative" ref={menuRef}>
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex-shrink-0 block">
                  <img
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-primary hover:ring-brand-secondary transition-all"
                    src={currentUser?.imageUrl ?? 'https://picsum.photos/id/64/100/100'}
                    alt="User profile"
                  />
                </button>
                {isMenuOpen && currentUser && (
                    <UserMenu 
                        user={currentUser} 
                        onLogout={onLogout} 
                        onNavigate={onNavigate} 
                        onClose={() => setIsMenuOpen(false)}
                    />
                )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

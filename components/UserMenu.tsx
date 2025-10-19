import React from 'react';
import { UserProfile } from '../types';
import { EditIcon, LogoutIcon, UserCircleIcon } from './Icons';

interface UserMenuProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (view: 'my-account' | 'edit-profile') => void;
  onClose: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ user, onLogout, onNavigate, onClose }) => {
  
  const handleNavigation = (view: 'my-account' | 'edit-profile') => {
    onNavigate(view);
    onClose();
  };

  return (
    <div className="absolute right-0 mt-2 w-56 origin-top-right bg-brand-surface rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
      <div className="py-1" role="none">
        <div className="flex items-center px-4 py-2 space-x-3 border-b border-slate-700">
            <img src={user.imageUrl} alt="Your profile" className="w-10 h-10 rounded-full object-cover"/>
            <div>
                <p className="text-sm font-semibold text-white truncate">{user.name.split(',')[0]}</p>
                <p className="text-xs text-brand-text-muted">View profile</p>
            </div>
        </div>
         <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('my-account'); }} className="flex items-center px-4 py-2 text-sm text-brand-text-muted hover:bg-slate-700/50 hover:text-white" role="menuitem">
          <UserCircleIcon className="w-5 h-5 mr-3" />
          My Account
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('edit-profile'); }} className="flex items-center px-4 py-2 text-sm text-brand-text-muted hover:bg-slate-700/50 hover:text-white" role="menuitem">
          <EditIcon className="w-5 h-5 mr-3" />
          Edit Profile
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onLogout(); }} className="flex items-center px-4 py-2 text-sm text-brand-text-muted hover:bg-slate-700/50 hover:text-white" role="menuitem">
          <LogoutIcon className="w-5 h-5 mr-3" />
          Logout
        </a>
      </div>
    </div>
  );
};

export default UserMenu;

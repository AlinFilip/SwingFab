import React, { useState } from 'react';
import { UserProfile, OnlineStatus } from '../types';
import { HeartIcon, MapPinIcon, MessageSquareIcon } from './Icons';

interface ProfileCardProps {
  user: UserProfile;
  onClick: () => void;
  onStartChat: (user: UserProfile) => void;
}

const statusClasses: Record<OnlineStatus, { dot: string; text: string }> = {
  [OnlineStatus.Online]: { dot: 'bg-green-400', text: 'text-green-400' },
  [OnlineStatus.Away]: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
  [OnlineStatus.Offline]: { dot: 'bg-slate-500', text: 'text-slate-500' },
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user, onClick, onStartChat }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleStartChatClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onStartChat(user);
  };
    
  return (
    <div 
        className="group relative bg-brand-surface rounded-lg overflow-hidden shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-1 cursor-pointer"
        onClick={onClick}
        role="button"
        aria-label={`View profile for ${user.name}`}
        tabIndex={0}
    >
      <img src={user.imageUrl} alt={user.name} className="w-full h-64 object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      <div className="absolute top-3 right-3 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-1.5 rounded-full">
        <span className={`h-3 w-3 rounded-full ${statusClasses[user.status].dot} ring-1 ring-slate-800`}></span>
        <span className={`text-xs font-semibold ${statusClasses[user.status].text}`}>
          {user.status}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 p-4 w-full">
        <h3 className="text-xl font-bold text-white truncate">{user.name}</h3>
        <div className="flex items-center text-sm text-brand-text-muted mt-1">
          <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
          <span>{user.location}</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex flex-col justify-center items-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
        <p className="text-brand-text mb-4 text-sm">{user.bio}</p>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
            {user.interests.slice(0, 4).map(interest => (
                <span key={interest} className="text-xs bg-brand-primary/20 text-brand-primary font-semibold px-2.5 py-1 rounded-full">{interest}</span>
            ))}
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleLike} className={`p-3 rounded-full transition-colors ${isLiked ? 'bg-brand-secondary text-white' : 'bg-slate-600/80 text-brand-text-muted hover:bg-slate-500/80'}`}>
            <HeartIcon className="w-6 h-6" />
          </button>
          <button onClick={handleStartChatClick} className="p-3 rounded-full bg-brand-primary text-white hover:bg-opacity-80 transition-opacity">
            <MessageSquareIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
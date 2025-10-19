import React, { useState } from 'react';
import { UserProfile, OnlineStatus } from '../types';
import { XIcon, MapPinIcon, HeartIcon, MessageSquareIcon, UsersIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ProfileModalProps {
  user: UserProfile;
  onClose: () => void;
  onStartChat: (user: UserProfile) => void;
}

const statusClasses: Record<OnlineStatus, { dot: string; text: string }> = {
  [OnlineStatus.Online]: { dot: 'bg-green-400', text: 'text-green-400' },
  [OnlineStatus.Away]: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
  [OnlineStatus.Offline]: { dot: 'bg-slate-500', text: 'text-slate-500' },
};

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose, onStartChat }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % user.galleryImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + user.galleryImages.length) % user.galleryImages.length);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
    >
      <div 
        className="bg-brand-surface w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl shadow-black/50 flex flex-col md:flex-row overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Gallery */}
        <div className="w-full md:w-1/2 relative group">
          <img src={user.galleryImages[currentImageIndex]} alt={`${user.name}'s gallery`} className="w-full h-64 md:h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          {user.galleryImages.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
            {user.galleryImages.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
            ))}
          </div>
        </div>

        {/* Profile Info */}
        <div className="w-full md:w-1/2 flex flex-col p-6 overflow-y-auto">
          <div className="flex-shrink-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 id="profile-modal-title" className="text-3xl font-bold text-white">{user.name}</h2>
                <div className="flex items-center text-brand-text-muted mt-1 space-x-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-4 h-4 mr-1.5" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full ${statusClasses[user.status].dot} mr-1.5`}></span>
                    <span>{user.status}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-white hover:bg-slate-700/50 rounded-full">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center space-x-3 my-6">
              <button 
                onClick={() => onStartChat(user)}
                className="flex-1 bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition-opacity">
                <MessageSquareIcon className="w-5 h-5" />
                <span>Message</span>
              </button>
              <button onClick={() => setIsLiked(!isLiked)} className={`flex-1 font-bold py-3 px-4 rounded-full flex items-center justify-center space-x-2 transition-colors ${isLiked ? 'bg-brand-secondary text-white' : 'bg-slate-700 hover:bg-slate-600/80 text-brand-text'}`}>
                <HeartIcon className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span>{isLiked ? 'Favorited' : 'Favorite'}</span>
              </button>
            </div>
            
            <div className="border-b border-slate-700">
              <nav className="-mb-px flex space-x-6">
                <button onClick={() => setActiveTab('about')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'about' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-muted hover:text-white'}`}>About</button>
                <button onClick={() => setActiveTab('details')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-text-muted hover:text-white'}`}>Details</button>
              </nav>
            </div>
          </div>
          
          <div className="flex-grow mt-6 text-brand-text">
            {activeTab === 'about' && (
              <div>
                <h3 className="font-bold text-white mb-2">Bio</h3>
                <p className="text-sm leading-relaxed">{user.bio}</p>
                 <h3 className="font-bold text-white mt-6 mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                    {user.interests.map(interest => (
                        <span key={interest} className="text-xs bg-brand-primary/20 text-brand-primary font-semibold px-2.5 py-1 rounded-full">{interest}</span>
                    ))}
                </div>
              </div>
            )}
            {activeTab === 'details' && (
              <div className="space-y-4">
                  <div className="flex items-start">
                    <UsersIcon className="w-5 h-5 mr-3 mt-1 text-brand-text-muted flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-white">Looking for</h4>
                        <p className="text-sm text-brand-text">{user.lookingFor.join(', ')}</p>
                    </div>
                  </div>
                   <div className="flex items-start">
                    <SparklesIcon className="w-5 h-5 mr-3 mt-1 text-brand-text-muted flex-shrink-0" />
                    <div>
                        <h4 className="font-semibold text-white">Relationship Status</h4>
                        <p className="text-sm text-brand-text">{user.relationshipStatus}</p>
                    </div>
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
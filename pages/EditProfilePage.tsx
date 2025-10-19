import React, { useState } from 'react';
import { UserProfile } from '../types';
import { ChevronLeftIcon, CameraIcon, CheckIcon } from '../components/Icons';

interface EditProfilePageProps {
  user: UserProfile;
  onBack: () => void;
}

const interestsList = [
    'Adult Parties', 'Anal', 'Blindfolds', 'Cross-dressing', 'Cuckolding',
    'Cybersex', 'Dogging', 'DP', 'Fisting', 'Gangbangs', 'Group Sex',
    'Making Videos', 'Oral', 'Phone Sex', 'Rimming', 'Role Play', 'Safe Sex',
    'Same Room Swapping', 'Separate Room Swapping', 'SM', 'Soft Swing',
    'Spanking', 'Swingers Clubs', 'Taking Photos', 'Threesomes', 'Toys',
    'Voyeurism', 'Watersports', 'Webcams'
];

const FormInput: React.FC<{ id: string; label: string; type?: string; defaultValue: string; }> = ({ id, label, type = 'text', defaultValue }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <input type={type} id={id} defaultValue={defaultValue} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent" />
    </div>
);

const FormTextarea: React.FC<{ id: string; label: string; defaultValue: string; rows?: number; }> = ({ id, label, defaultValue, rows = 4 }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <textarea id={id} rows={rows} defaultValue={defaultValue} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"></textarea>
    </div>
);

const InterestCheckbox: React.FC<{ label: string; isChecked: boolean; onChange: () => void; }> = ({ label, isChecked, onChange }) => (
    <button
        type="button"
        onClick={onChange}
        className={`flex items-center space-x-2 w-full text-left p-2.5 rounded-lg transition-colors border ${
            isChecked ? 'bg-brand-primary/20 border-brand-primary' : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
        }`}
    >
        <div className={`w-5 h-5 flex-shrink-0 rounded-md flex items-center justify-center border-2 transition-all ${
            isChecked ? 'bg-brand-primary border-brand-primary' : 'bg-slate-700 border-slate-600'
        }`}>
            {isChecked && <CheckIcon className="w-3.5 h-3.5 text-white" />}
        </div>
        <span className={`text-sm ${isChecked ? 'text-brand-primary font-semibold' : 'text-brand-text-muted'}`}>
            {label}
        </span>
    </button>
);


const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onBack }) => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(user.interests);

  const handleInterestChange = (interest: string) => {
    setSelectedInterests(prev => 
        prev.includes(interest) 
            ? prev.filter(item => item !== interest)
            : [...prev, interest]
    );
  };
    
  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center space-x-2 text-sm text-brand-text-muted hover:text-white mb-6">
          <ChevronLeftIcon className="w-5 h-5" />
          <span>Back to Dashboard</span>
      </button>
      
      <div className="bg-brand-surface rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
        <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
            <p className="text-brand-text-muted mb-8">Update your profile information and photos.</p>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                    <div className="relative">
                        <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-700" />
                        <button className="absolute bottom-0 right-0 bg-brand-primary text-white p-2 rounded-full hover:bg-opacity-90 transition-opacity">
                            <CameraIcon className="w-5 h-5" />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-white">Profile Photo</h3>
                        <p className="text-sm text-brand-text-muted mt-1">Upload a new photo to change your avatar.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput id="name" label="Name" defaultValue={user.name.split(',')[0]} />
                    <FormInput id="age" label="Age" type="number" defaultValue={String(user.age)} />
                    <FormInput id="location" label="Location" defaultValue={user.location} />
                    <FormInput id="relationshipStatus" label="Relationship Status" defaultValue={user.relationshipStatus} />
                </div>

                <FormTextarea id="bio" label="Bio" defaultValue={user.bio} />
                
                <div>
                    <label className="block text-sm font-medium text-brand-text-muted mb-4">Interests</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {interestsList.map(interest => (
                            <InterestCheckbox
                                key={interest}
                                label={interest}
                                isChecked={selectedInterests.includes(interest)}
                                onChange={() => handleInterestChange(interest)}
                            />
                        ))}
                    </div>
                </div>

                <FormInput id="lookingFor" label="Looking For (comma separated)" defaultValue={user.lookingFor.join(', ')} />

                <div className="pt-6 border-t border-slate-700 flex justify-end">
                    <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-opacity">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
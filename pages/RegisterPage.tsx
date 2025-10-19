import React, { useState } from 'react';
import { UserIcon, UsersIcon, SparklesIcon, BuildingStorefrontIcon, ChevronLeftIcon } from '../components/Icons';

interface RegisterPageProps {
    onRegister: () => void;
    onSwitchToLogin: () => void;
}

type ProfileType = 'woman' | 'man' | 'couple' | 'tv-ts' | 'club';

const ProfileTypeButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-3 p-6 bg-slate-700/50 rounded-lg hover:bg-slate-600/50 transition-colors text-brand-text-muted hover:text-white w-full">
        {icon}
        <span className="font-semibold">{label}</span>
    </button>
);

const FormInput: React.FC<{ id: string; label: string; type?: string; placeholder: string; required?: boolean }> = ({ id, label, type = 'text', placeholder, required = true }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <input type={type} id={id} required={required} placeholder={placeholder} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent" />
    </div>
);

const FormSelect: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({ id, label, children }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <select id={id} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent">
            {children}
        </select>
    </div>
);

const RegisterPage: React.FC<RegisterPageProps> = ({ onRegister, onSwitchToLogin }) => {
    const [step, setStep] = useState<ProfileType | 'selection'>('selection');

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        onRegister();
    };
    
    const renderForm = () => {
        switch (step) {
            case 'woman':
            case 'man':
            case 'tv-ts':
                return (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <FormInput id="name" label="Your Name" placeholder="Enter your name" />
                        <FormInput id="email" label="Email Address" type="email" placeholder="you@example.com" />
                        <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
                        <FormInput id="confirm-password" label="Confirm Password" type="password" placeholder="••••••••" />
                        <FormInput id="location" label="Location" placeholder="City, State" />
                    </form>
                );
            case 'couple':
                return (
                     <form onSubmit={handleRegister} className="space-y-6">
                        <FormInput id="profileName" label="Couple Profile Name" placeholder="e.g., The Adventurers" />
                        <FormInput id="email" label="Shared Email Address" type="email" placeholder="you@example.com" />
                        <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
                        <hr className="border-slate-700" />
                        <h4 className="font-semibold text-white">Partner 1</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput id="p1_name" label="Name" placeholder="Partner 1's Name" />
                            <FormSelect id="p1_gender" label="Gender">
                                <option>Woman</option>
                                <option>Man</option>
                                <option>Non-binary</option>
                            </FormSelect>
                        </div>
                        <hr className="border-slate-700" />
                        <h4 className="font-semibold text-white">Partner 2</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormInput id="p2_name" label="Name" placeholder="Partner 2's Name" />
                             <FormSelect id="p2_gender" label="Gender">
                                <option>Man</option>
                                <option>Woman</option>
                                <option>Non-binary</option>
                            </FormSelect>
                        </div>
                    </form>
                );
            case 'club':
                 return (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <FormInput id="clubName" label="Club Name" placeholder="Enter club name" />
                        <FormInput id="email" label="Business Email" type="email" placeholder="contact@yourclub.com" />
                        <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
                        <FormInput id="address" label="Address" placeholder="123 Main St, Anytown" />
                         <div>
                            <label htmlFor="description" className="block text-sm font-medium text-brand-text-muted mb-2">Description</label>
                            <textarea id="description" rows={3} placeholder="Tell us about your club..." className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"></textarea>
                        </div>
                    </form>
                );
            default:
                return null;
        }
    }
    
    const getTitleForStep = (currentStep: ProfileType) => {
        const titles: Record<ProfileType, string> = {
            'woman': 'Create Your Profile',
            'man': 'Create Your Profile',
            'couple': 'Create Couple Profile',
            'tv-ts': 'Create Your Profile',
            'club': 'Register Your Club'
        };
        return titles[currentStep];
    }

    if (step === 'selection') {
        return (
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Join Swings<span className="text-brand-primary">fab</span>
                    </h1>
                    <p className="mt-2 text-brand-text-muted">First, tell us who you are.</p>
                </div>
                <div className="bg-brand-surface p-8 rounded-2xl shadow-2xl shadow-black/30">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        <ProfileTypeButton icon={<UserIcon className="w-8 h-8" />} label="Woman" onClick={() => setStep('woman')} />
                        <ProfileTypeButton icon={<UserIcon className="w-8 h-8" />} label="Man" onClick={() => setStep('man')} />
                        <ProfileTypeButton icon={<UsersIcon className="w-8 h-8" />} label="Couple" onClick={() => setStep('couple')} />
                        <ProfileTypeButton icon={<SparklesIcon className="w-8 h-8" />} label="TV/TS" onClick={() => setStep('tv-ts')} />
                        <ProfileTypeButton icon={<BuildingStorefrontIcon className="w-8 h-8" />} label="Club" onClick={() => setStep('club')} />
                    </div>
                    <p className="text-center mt-6 text-sm text-brand-text-muted">
                        Already have an account?{' '}
                        <button onClick={onSwitchToLogin} className="font-semibold text-brand-primary hover:underline">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-lg">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-white">
                   {getTitleForStep(step as ProfileType)}
                </h1>
                <p className="mt-2 text-brand-text-muted">Let's get you set up.</p>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl shadow-2xl shadow-black/30">
                <button onClick={() => setStep('selection')} className="flex items-center space-x-2 text-sm text-brand-text-muted hover:text-white mb-6">
                    <ChevronLeftIcon className="w-4 h-4" />
                    <span>Back to selection</span>
                </button>
                
                <div className="max-h-[50vh] overflow-y-auto pr-2">
                    {renderForm()}
                </div>
                
                <button
                    onClick={handleRegister}
                    className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-opacity mt-6"
                >
                    Create Account
                </button>
                <p className="text-center mt-6 text-sm text-brand-text-muted">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="font-semibold text-brand-primary hover:underline">
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;

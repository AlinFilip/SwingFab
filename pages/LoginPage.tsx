import React from 'react';

interface LoginPageProps {
    onLogin: () => void;
    onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToRegister }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form validation and API calls
        onLogin();
    };

    return (
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tight text-white">
                    Swings<span className="text-brand-primary">fab</span>
                </h1>
                <p className="mt-2 text-brand-text-muted">Welcome back! Please sign in to continue.</p>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl shadow-2xl shadow-black/30">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-text-muted mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            required
                            placeholder="you@example.com"
                            className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                    </div>
                    <div>
                         <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-brand-text-muted">
                                Password
                            </label>
                            <a href="#" className="text-sm text-brand-primary hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            id="password"
                            required
                            placeholder="••••••••"
                            className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-3 px-4 rounded-lg transition-opacity"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center mt-6 text-sm text-brand-text-muted">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToRegister} className="font-semibold text-brand-primary hover:underline">
                        Sign up
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
import React, { useState } from 'react';
import { Header } from './components/Header';
import ProfileCard from './components/ProfileCard';
import { MOCK_PROFILES } from './constants';
import { FilterPanel } from './components/FilterPanel';
import { UserProfile } from './types';
import ProfileModal from './components/ProfileModal';
import FilterModal from './components/FilterModal';
import ChatModal from './components/ChatModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditProfilePage from './pages/EditProfilePage';
import MyAccountPage from './pages/MyAccountPage';

type View = 'dashboard' | 'edit-profile' | 'my-account';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authScreen, setAuthScreen] = useState<'login' | 'register'>('login');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [view, setView] = useState<View>('dashboard');

  const [selectedProfile, setSelectedProfile] = useState<UserProfile | null>(null);
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [chattingWith, setChattingWith] = useState<UserProfile | null>(null);

  const handleLogin = () => {
    // Simulate finding the logged-in user. We'll use Olivia as the demo user.
    const user = MOCK_PROFILES.find(p => p.name.includes('Olivia'));
    setCurrentUser(user || MOCK_PROFILES[0]);
    setIsAuthenticated(true);
    setView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setAuthScreen('login');
  };

  const handleNavigate = (targetView: View) => {
    setView(targetView);
  }

  const handleOpenProfile = (user: UserProfile) => setSelectedProfile(user);
  const handleCloseProfile = () => setSelectedProfile(null);
  const handleOpenFilters = () => setFilterModalOpen(true);
  const handleCloseFilters = () => setFilterModalOpen(false);
  const handleStartChat = (user: UserProfile) => {
    setSelectedProfile(null);
    setChattingWith(user);
  };
  const handleCloseChat = () => setChattingWith(null);

  const isModalOpen = !!selectedProfile || isFilterModalOpen || !!chattingWith;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-bg font-sans flex items-center justify-center p-4">
        {authScreen === 'login' ? (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setAuthScreen('register')} 
          />
        ) : (
          <RegisterPage 
            onRegister={handleLogin}
            onSwitchToLogin={() => setAuthScreen('login')}
          />
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch(view) {
      case 'edit-profile':
        return <EditProfilePage user={currentUser!} onBack={() => setView('dashboard')} />;
      case 'my-account':
        return <MyAccountPage user={currentUser!} onBack={() => setView('dashboard')} />;
      case 'dashboard':
      default:
        return (
          <>
            <FilterPanel onMoreFiltersClick={handleOpenFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {MOCK_PROFILES.map(user => (
                <ProfileCard key={user.id} user={user} onClick={() => handleOpenProfile(user)} onStartChat={handleStartChat} />
              ))}
            </div>
          </>
        );
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg font-sans">
      <Header currentUser={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
      <main className={`container mx-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300 ${isModalOpen ? 'blur-sm brightness-50' : ''}`}>
        {renderContent()}
      </main>
      <div className={`transition-all duration-300 ${isModalOpen ? 'blur-sm brightness-50' : ''}`}>
        <Footer />
      </div>

      {selectedProfile && <ProfileModal user={selectedProfile} onClose={handleCloseProfile} onStartChat={handleStartChat} />}
      <FilterModal isOpen={isFilterModalOpen} onClose={handleCloseFilters} />
      {chattingWith && <ChatModal user={chattingWith} onClose={handleCloseChat} />}
    </div>
  );
}

const Footer: React.FC = () => {
    return (
        <footer className="bg-brand-surface mt-12 py-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-brand-text-muted">
                <p>&copy; {new Date().getFullYear()} Swingsfab. Created by Alin Filip. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-brand-primary transition-colors">Contact Us</a>
                </div>
            </div>
        </footer>
    );
}

export default App;

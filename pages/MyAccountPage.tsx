import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Message, OnlineStatus } from '../types';
import { 
    ChevronLeftIcon, UserCircleIcon, ShieldCheckIcon, BellIcon, EyeIcon, InboxIcon, SendIcon, BookmarkIcon, UsersIcon, StarIcon, RssIcon, UserPlusIcon, CameraIcon, ThumbsUpIcon, ClockIcon, EditIcon, LockIcon, MailIcon, AtSignIcon, BanIcon, SlidersHorizontalIcon, TrashIcon, HelpCircleIcon, GiftIcon, ChevronDownIcon, MapPinIcon, LoaderIcon, MoreVerticalIcon, SearchIcon, BookmarkSolidIcon, ChevronRightIcon, MessageSquareIcon, UserMinusIcon
} from '../components/Icons';
import { MOCK_PROFILES, MOCK_MESSAGES, FRIENDS_IDS } from '../constants';


interface MyAccountPageProps {
  user: UserProfile;
  onBack: () => void;
}

type AccountView =
  | 'read-messages' | 'sent-messages' | 'saved-messages' | 'friends-messages'
  | 'looked-at-me' | 'winks' | 'friend-updates'
  | 'friends-list' | 'friends-invites'
  | 'manage-photos' | 'photos-fabd' | 'recently-fabd-photos'
  | 'manage-verifications'
  | 'edit-profile' | 'edit-personal-details'
  | 'message-filters' | 'change-password' | 'change-email' | 'change-username'
  | 'block-list' | 'email-notifications' | 'privacy'
  | 'tips-getting-started' | 'recommend-us' | 'delete-account';

const formatDate = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const diffMinutes = Math.round(diffSeconds / 60);
    const diffHours = Math.round(diffMinutes / 60);
    const diffDays = Math.round(diffHours / 24);

    if (diffSeconds < 60) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays === 1) return 'Yesterday';
    return date.toLocaleDateString();
};

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
            isActive ? 'bg-brand-primary/20 text-brand-primary font-semibold' : 'text-brand-text-muted hover:bg-slate-700/50 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
);

const NavSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div>
        <h3 className="px-3 pt-4 pb-2 text-xs font-bold text-brand-text-muted uppercase tracking-wider">{title}</h3>
        <div className="space-y-1">
            {children}
        </div>
    </div>
);

const ToggleSwitch: React.FC<{ label: string; description: string, defaultChecked?: boolean }> = ({ label, description, defaultChecked }) => {
    const [isOn, setIsOn] = useState(defaultChecked ?? false);
    return (
        <div className="flex justify-between items-center py-2">
            <div>
                <h4 className="font-semibold text-white">{label}</h4>
                <p className="text-sm text-brand-text-muted">{description}</p>
            </div>
            <button onClick={() => setIsOn(!isOn)} className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${isOn ? 'bg-brand-primary' : 'bg-slate-600'}`}>
                <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${isOn ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
        </div>
    );
};

const FormInput: React.FC<{ id: string; label: string; type?: string; value?: string; defaultValue?: string; placeholder?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ id, label, type = 'text', value, defaultValue, placeholder, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <input type={type} id={id} value={value} defaultValue={defaultValue} placeholder={placeholder} onChange={onChange} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent" />
    </div>
);


const FormTextarea: React.FC<{ id: string; label: string; defaultValue: string; rows?: number; }> = ({ id, label, defaultValue, rows = 4 }) => (
     <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <textarea id={id} rows={rows} defaultValue={defaultValue} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"></textarea>
    </div>
);

const FormSelect: React.FC<{ id: string; label: string; children: React.ReactNode; defaultValue?: string; }> = ({ id, label, children, defaultValue }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-brand-text-muted mb-2">{label}</label>
        <div className="relative">
            <select id={id} defaultValue={defaultValue} className="w-full bg-brand-bg border border-slate-700 rounded-lg py-2.5 px-4 pr-10 text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent appearance-none">
                {children}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-text-muted">
                <ChevronDownIcon className="h-5 w-5" />
            </div>
        </div>
    </div>
);


const PlaceholderView: React.FC<{title: string, description: string}> = ({title, description}) => (
    <div>
        <h2 className="text-2xl font-bold text-white mb-1">{title}</h2>
        <p className="text-brand-text-muted mb-8">{description}</p>
        <div className="border border-dashed border-slate-600 rounded-lg p-12 text-center bg-brand-bg/30">
            <p className="text-brand-text-muted">Content for this section is coming soon.</p>
        </div>
    </div>
);

const ReadMessagesView: React.FC<{
    user: UserProfile;
    allMessages: Record<number, Message[]>;
    selectedConversationId: number | null;
    onSelectConversation: (id: number | null) => void;
    onSendMessage: (text: string) => void;
    onToggleSave: (conversationId: number, messageId: number) => void;
    filterByUserIds?: number[];
    isFriendsView?: boolean;
}> = ({ user, allMessages, selectedConversationId, onSelectConversation, onSendMessage, onToggleSave, filterByUserIds, isFriendsView = false }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const conversations = MOCK_PROFILES
        .filter(p => p.id !== user.id && allMessages[p.id])
        .filter(p => !filterByUserIds || filterByUserIds.includes(p.id))
        .map(p => {
            const messages = allMessages[p.id];
            const lastMessage = messages[messages.length - 1];
            return { participant: p, messages, lastMessage };
        })
        .sort((a, b) => b.lastMessage.date.getTime() - a.lastMessage.date.getTime());

    const [newMessage, setNewMessage] = useState('');

    const selectedConversation = conversations.find(c => c.participant.id === selectedConversationId);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [selectedConversation?.messages]);

    useEffect(() => {
        if (isFriendsView && conversations.length > 0 && !selectedConversation) {
            onSelectConversation(conversations[0].participant.id);
        }
    }, [isFriendsView, conversations, selectedConversation, onSelectConversation]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversationId) return;
        onSendMessage(newMessage);
        setNewMessage('');
    };
    
    return (
        <div className="h-[calc(100vh-200px)] flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-1">{isFriendsView ? 'Friends Messages' : 'Messages'}</h2>
            <p className="text-brand-text-muted mb-6">View and reply to your conversations.</p>

            <div className="bg-brand-bg/30 rounded-xl flex-grow flex overflow-hidden">
                <div className="w-1/3 border-r border-slate-700 flex flex-col">
                    <div className="p-4 border-b border-slate-700">
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon className="h-5 w-5 text-brand-text-muted" />
                            </div>
                            <input type="text" placeholder="Search messages..." className="w-full bg-brand-bg border border-slate-600 rounded-full py-2 pl-10 pr-4 text-sm text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                        {conversations.map(conv => (
                            <button key={conv.participant.id} onClick={() => onSelectConversation(conv.participant.id)}
                                className={`flex items-center space-x-4 p-4 w-full text-left transition-colors ${selectedConversationId === conv.participant.id ? 'bg-brand-primary/10' : 'hover:bg-slate-700/30'}`}>
                                <div className="relative flex-shrink-0">
                                    <img src={conv.participant.imageUrl} alt={conv.participant.name} className="w-12 h-12 rounded-full object-cover" />
                                     {conv.participant.status === OnlineStatus.Online && (
                                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-brand-bg"></span>
                                     )}
                                </div>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-white truncate">{conv.participant.name.split(',')[0]}</p>
                                        <p className="text-xs text-brand-text-muted flex-shrink-0">{formatDate(conv.lastMessage.date)}</p>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm text-brand-text-muted truncate mt-1">
                                            {conv.lastMessage.sender === 'me' && 'You: '}{conv.lastMessage.text}
                                        </p>
                                        {!conv.lastMessage.read && conv.lastMessage.sender === 'them' && (
                                            <span className="ml-2 mt-1.5 flex-shrink-0 block h-2.5 w-2.5 rounded-full bg-brand-primary"></span>
                                        )}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-2/3 flex flex-col">
                    {selectedConversation ? (
                        <>
                            <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                                <div className="flex items-center space-x-3">
                                    <img src={selectedConversation.participant.imageUrl} alt={selectedConversation.participant.name} className="w-10 h-10 rounded-full object-cover"/>
                                    <div>
                                        <h3 className="font-semibold text-white">{selectedConversation.participant.name}</h3>
                                        <p className="text-sm text-green-400">{selectedConversation.participant.status}</p>
                                    </div>
                                </div>
                                <button className="p-2 text-brand-text-muted hover:text-white hover:bg-slate-700/50 rounded-full">
                                    <MoreVerticalIcon className="w-5 h-5" />
                                </button>
                            </div>
                             <div className="flex-grow p-6 space-y-1 overflow-y-auto">
                                {selectedConversation.messages.map((msg) => (
                                    <div key={msg.id} className={`group flex items-center gap-3 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender === 'me' && (
                                            <button onClick={() => onToggleSave(selectedConversation.participant.id, msg.id)} className="p-1 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {msg.saved ? <BookmarkSolidIcon className="w-4 h-4 text-brand-primary" /> : <BookmarkIcon className="w-4 h-4" />}
                                            </button>
                                        )}
                                        <div className={`max-w-md px-4 py-2.5 rounded-2xl ${msg.sender === 'me' ? 'bg-brand-primary text-white rounded-br-lg' : 'bg-slate-700 text-brand-text rounded-bl-lg'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                         {msg.sender === 'them' && (
                                            <button onClick={() => onToggleSave(selectedConversation.participant.id, msg.id)} className="p-1 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {msg.saved ? <BookmarkSolidIcon className="w-4 h-4 text-brand-primary" /> : <BookmarkIcon className="w-4 h-4" />}
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                             <div className="p-4 border-t border-slate-700 flex-shrink-0 bg-brand-bg/50">
                                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Type a message..."
                                        className="w-full bg-brand-bg border border-slate-600 rounded-full py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        aria-label="Chat message input"
                                    />
                                    <button type="submit" className="bg-brand-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" disabled={!newMessage.trim()}>
                                        <SendIcon className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
                            <InboxIcon className="w-16 h-16 text-slate-600 mb-4" />
                            <h3 className="text-xl font-semibold text-white">No conversation selected</h3>
                            <p className="text-brand-text-muted mt-1">Select a conversation from the list to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SentMessagesView: React.FC<{
    allMessages: Record<number, Message[]>;
    onSelectConversation: (id: number) => void;
}> = ({ allMessages, onSelectConversation }) => {
    const sentMessages = Object.entries(allMessages)
        .flatMap(([participantId, messages]) =>
            messages
                .filter(m => m.sender === 'me')
                .map(m => ({ ...m, participantId: Number(participantId) }))
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const getParticipant = (id: number) => MOCK_PROFILES.find(p => p.id === id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Sent Messages</h2>
            <p className="text-brand-text-muted mb-8">Browse messages you have sent to others.</p>
            <div className="bg-brand-bg/30 rounded-xl overflow-hidden">
                <ul className="divide-y divide-slate-700">
                    {sentMessages.length > 0 ? sentMessages.map(msg => {
                        const participant = getParticipant(msg.participantId);
                        if (!participant) return null;
                        return (
                             <li key={msg.id} className="hover:bg-slate-700/30">
                                <button onClick={() => onSelectConversation(msg.participantId)} className="flex items-center justify-between w-full text-left p-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={participant.imageUrl} alt={participant.name} className="w-12 h-12 rounded-full object-cover"/>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-white">To: {participant.name.split(',')[0]}</p>
                                            <p className="text-sm text-brand-text-muted truncate mt-1">{msg.text}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                                        <span className="text-xs text-brand-text-muted">{formatDate(msg.date)}</span>
                                        <ChevronRightIcon className="w-5 h-5 text-slate-500" />
                                    </div>
                                </button>
                            </li>
                        );
                    }) : (
                         <li className="p-12 text-center text-brand-text-muted">You haven't sent any messages yet.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

const SavedMessagesView: React.FC<{
    allMessages: Record<number, Message[]>;
    onSelectConversation: (id: number) => void;
}> = ({ allMessages, onSelectConversation }) => {
    const savedMessages = Object.entries(allMessages)
        .flatMap(([participantId, messages]) =>
            messages
                .filter(m => m.saved)
                .map(m => ({ ...m, participantId: Number(participantId) }))
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime());

    const getParticipant = (id: number) => MOCK_PROFILES.find(p => p.id === id);

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Saved Messages</h2>
            <p className="text-brand-text-muted mb-8">Access your saved or bookmarked messages.</p>
             <div className="bg-brand-bg/30 rounded-xl overflow-hidden">
                <ul className="divide-y divide-slate-700">
                    {savedMessages.length > 0 ? savedMessages.map(msg => {
                        const participant = getParticipant(msg.participantId);
                        if (!participant) return null;
                        const senderName = msg.sender === 'me' ? 'You' : participant.name.split(',')[0];
                        return (
                             <li key={msg.id} className="hover:bg-slate-700/30">
                                <button onClick={() => onSelectConversation(msg.participantId)} className="flex items-center justify-between w-full text-left p-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={participant.imageUrl} alt={participant.name} className="w-12 h-12 rounded-full object-cover"/>
                                        <div className="overflow-hidden">
                                            <p className="font-semibold text-white">From conversation with {participant.name.split(',')[0]}</p>
                                            <p className="text-sm text-brand-text-muted truncate mt-1">
                                                <span className="font-medium text-slate-400">{senderName}:</span> {msg.text}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                                        <span className="text-xs text-brand-text-muted">{formatDate(msg.date)}</span>
                                        <ChevronRightIcon className="w-5 h-5 text-slate-500" />
                                    </div>
                                </button>
                            </li>
                        );
                    }) : (
                         <li className="p-12 text-center text-brand-text-muted">You have no saved messages. Hover over a message and click the bookmark icon to save it.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

const FriendsListView: React.FC<{
    friends: UserProfile[];
    onStartChat: (user: UserProfile) => void;
    onUnfriend: (userId: number) => void;
}> = ({ friends, onStartChat, onUnfriend }) => {
    
    const statusClasses: Record<OnlineStatus, { dot: string; text: string }> = {
      [OnlineStatus.Online]: { dot: 'bg-green-400', text: 'text-green-400' },
      [OnlineStatus.Away]: { dot: 'bg-yellow-400', text: 'text-yellow-400' },
      [OnlineStatus.Offline]: { dot: 'bg-slate-500', text: 'text-slate-500' },
    };

    const handleUnfriendClick = (userId: number, userName: string) => {
        if (window.confirm(`Are you sure you want to unfriend ${userName.split(',')[0]}?`)) {
            onUnfriend(userId);
        }
    }

    if (friends.length === 0) {
        return (
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">Friends List</h2>
                <p className="text-brand-text-muted mb-8">Manage your list of friends.</p>
                <div className="text-center py-12 bg-brand-bg/30 rounded-xl">
                    <UsersIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white">No friends yet</h3>
                    <p className="text-brand-text-muted mt-1">Start connecting with people to build your friends list.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Friends List</h2>
            <p className="text-brand-text-muted mb-8">Manage your list of friends.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {friends.map(friend => (
                    <div key={friend.id} className="bg-brand-bg/30 rounded-xl p-4 flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-800/50 hover:shadow-lg">
                        <div className="relative mb-4">
                            <img src={friend.imageUrl} alt={friend.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-slate-700"/>
                            <span className={`absolute bottom-1 right-1 block h-4 w-4 rounded-full ${statusClasses[friend.status].dot} ring-2 ring-brand-bg/80`}></span>
                        </div>
                        <h4 className="font-bold text-white text-lg truncate w-full">{friend.name}</h4>
                        <div className="flex items-center text-sm text-brand-text-muted mt-1 mb-4">
                            <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
                            <span>{friend.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-auto w-full">
                            <button onClick={() => onStartChat(friend)} className="flex-1 bg-brand-primary hover:opacity-90 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm transition-opacity">
                                <MessageSquareIcon className="w-4 h-4" />
                                <span>Message</span>
                            </button>
                            <button onClick={() => handleUnfriendClick(friend.id, friend.name)} className="flex-1 bg-brand-secondary hover:opacity-90 text-white font-bold py-2 px-3 rounded-lg flex items-center justify-center space-x-2 text-sm transition-opacity">
                                <UserMinusIcon className="w-4 h-4" />
                                <span>Unfriend</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const EditPersonalDetailsView: React.FC = () => {
    const [town, setTown] = useState('Boston');
    const [isDetectingLocation, setIsDetectingLocation] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleDetectLocation = () => {
        setIsDetectingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setTimeout(() => {
                    setTown('Miami, FL');
                    setIsDetectingLocation(false);
                }, 1500);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setLocationError("Location access denied. Please enable it in your browser settings.");
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setLocationError("Location information is unavailable.");
                        break;
                    case error.TIMEOUT:
                        setLocationError("The request to get user location timed out.");
                        break;
                    default:
                        setLocationError("An unknown error occurred.");
                        break;
                }
                setIsDetectingLocation(false);
            },
            { timeout: 10000 }
        );
    };

    const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
        <div className="pb-3 border-b border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-1">Edit Personal Details</h2>
            <p className="text-brand-text-muted mb-8">This information will be displayed on your public profile.</p>
            <div className="bg-brand-bg/30 p-6 sm:p-8 rounded-xl">
                <form className="space-y-8" onSubmit={e => e.preventDefault()}>
                    
                    <section>
                        <SectionHeader title="Location" />
                        <div className="space-y-4 max-w-md">
                            <p className="text-sm text-brand-text-muted">We use your location for "nearby" searches. Your precise address is never shown.</p>
                            <button 
                                onClick={handleDetectLocation} 
                                disabled={isDetectingLocation}
                                className="inline-flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold rounded-full bg-slate-700/50 text-brand-text-muted hover:bg-slate-600/50 transition-colors disabled:opacity-50 disabled:cursor-wait"
                            >
                                {isDetectingLocation ? (
                                    <LoaderIcon className="w-5 h-5 animate-spin" />
                                ) : (
                                    <MapPinIcon className="w-5 h-5" />
                                )}
                                <span>{isDetectingLocation ? 'Detecting...' : 'Detect My Location'}</span>
                            </button>
                            {locationError && <p className="text-sm text-red-400">{locationError}</p>}
                            <FormInput 
                                id="town" 
                                label="Town:" 
                                placeholder="e.g., Miami, FL"
                                value={town}
                                onChange={(e) => setTown(e.target.value)}
                            />
                        </div>
                    </section>
                    
                    <section>
                        <SectionHeader title="Identity" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormInput id="firstname" label="Firstname (or nickname):" placeholder="Olivia" />
                            <div>
                                <label className="block text-sm font-medium text-brand-text-muted mb-2">Date of Birth: (age shown)</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <FormSelect id="dob-day" label="" defaultValue="23">
                                        <option disabled>Day</option>
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => <option key={day}>{day}</option>)}
                                    </FormSelect>
                                    <FormSelect id="dob-month" label="" defaultValue="6">
                                        <option disabled>Month</option>
                                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => <option key={i+1} value={i+1}>{month}</option>)}
                                    </FormSelect>
                                    <FormSelect id="dob-year" label="" defaultValue="2000">
                                        <option disabled>Year</option>
                                        {Array.from({ length: 82 }, (_, i) => new Date().getFullYear() - 18 - i).map(year => <option key={year}>{year}</option>)}
                                    </FormSelect>
                                </div>
                            </div>
                            <FormSelect id="sexuality" label="Sexuality:">
                                <option>Straight</option>
                                <option>Bisexual</option>
                                <option>Gay / Lesbian</option>
                                <option>Other</option>
                            </FormSelect>
                             <FormSelect id="ethnicity" label="Ethnicity:">
                                <option>Not specified</option>
                                <option>Caucasian</option>
                                <option>Black</option>
                                <option>Hispanic</option>
                                <option>Asian</option>
                                <option>Mixed</option>
                                <option>Other</option>
                            </FormSelect>
                        </div>
                    </section>

                    <section>
                         <SectionHeader title="Appearance" />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormSelect id="height" label="Height:">
                                <option>Not specified</option>
                                <option>Under 5'</option>
                                <option>5'0" - 5'4"</option>
                                <option>5'5" - 5'9"</option>
                                <option>5'10" - 6'2"</option>
                                <option>Over 6'2"</option>
                            </FormSelect>
                            <FormSelect id="body-type" label="Body Type:">
                                <option>Not specified</option>
                                <option>Slim</option>
                                <option>Athletic</option>
                                <option>Average</option>
                                <option>A few extra pounds</option>
                                <option>Large</option>
                            </FormSelect>
                            <FormSelect id="tattoos" label="Tattoos:">
                                <option>Not specified</option>
                                <option>None</option>
                                <option>A few</option>
                                <option>Many</option>
                            </FormSelect>
                            <FormSelect id="piercings" label="Piercings:">
                                <option>Not specified</option>
                                <option>None</option>
                                <option>Ears only</option>
                                <option>A few</option>
                                <option>Many</option>
                            </FormSelect>
                         </div>
                    </section>

                    <section>
                         <SectionHeader title="Lifestyle" />
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                             <FormSelect id="drinking" label="Drinking:">
                                <option>Not specified</option>
                                <option>Non-drinker</option>
                                <option>Socially</option>
                                <option>Regularly</option>
                            </FormSelect>
                             <FormSelect id="smoker" label="Smoker:">
                                <option>Not specified</option>
                                <option>No</option>
                                <option>Socially</option>
                                <option>Yes</option>
                            </FormSelect>
                         </div>
                    </section>

                    <div className="pt-4 flex justify-end">
                        <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-lg transition-opacity">Save Details</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const MyAccountPage: React.FC<MyAccountPageProps> = ({ user, onBack }) => {
    const [activeView, setActiveView] = useState<AccountView>('read-messages');
    const [allMessages, setAllMessages] = useState<Record<number, Message[]>>(MOCK_MESSAGES);
    const [selectedConversationId, setSelectedConversationId] = useState<number | null>(() => {
        const conversations = Object.keys(MOCK_MESSAGES).map(Number).sort((a,b) => {
            const lastMsgA = MOCK_MESSAGES[a][MOCK_MESSAGES[a].length - 1];
            const lastMsgB = MOCK_MESSAGES[b][MOCK_MESSAGES[b].length - 1];
            return lastMsgB.date.getTime() - lastMsgA.date.getTime();
        });
        return conversations.length > 0 ? conversations[0] : null;
    });
    const [friends, setFriends] = useState<UserProfile[]>([]);
    
    useEffect(() => {
        const friendProfiles = MOCK_PROFILES.filter(p => FRIENDS_IDS.includes(p.id));
        setFriends(friendProfiles);
    }, []);
    
    const handleUnfriend = (userId: number) => {
        setFriends(prev => prev.filter(f => f.id !== userId));
        // In a real app, you'd also want to update FRIENDS_IDS or make an API call.
    };

    const handleStartChat = (userToChat: UserProfile) => {
        handleSelectConversation(userToChat.id);
    };

    const handleSelectConversation = (id: number | null) => {
        setSelectedConversationId(id);
        if (id !== null) {
            setActiveView('read-messages');
        }
    };

    const handleSendMessage = (text: string) => {
        if (!selectedConversationId) return;
        const newMsg: Message = {
            id: Date.now(),
            text,
            sender: 'me',
            date: new Date(),
            read: true,
        };
        setAllMessages(prev => {
            const updatedMessages = [...(prev[selectedConversationId] || []), newMsg];
            return { ...prev, [selectedConversationId]: updatedMessages };
        });
    };

    const handleToggleSaveMessage = (conversationId: number, messageId: number) => {
        setAllMessages(prev => {
            const conversation = prev[conversationId];
            if (!conversation) return prev;
            const updatedMessages = conversation.map(msg => 
                msg.id === messageId ? { ...msg, saved: !msg.saved } : msg
            );
            return { ...prev, [conversationId]: updatedMessages };
        });
    };

    const renderView = () => {
        switch (activeView) {
            case 'read-messages': 
                return <ReadMessagesView 
                    user={user}
                    allMessages={allMessages}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                    onSendMessage={handleSendMessage}
                    onToggleSave={handleToggleSaveMessage}
                />;
            case 'sent-messages':
                return <SentMessagesView allMessages={allMessages} onSelectConversation={handleSelectConversation} />;
            case 'saved-messages':
                return <SavedMessagesView allMessages={allMessages} onSelectConversation={handleSelectConversation} />;
            case 'friends-messages':
                 return <ReadMessagesView 
                    user={user}
                    allMessages={allMessages}
                    selectedConversationId={selectedConversationId}
                    onSelectConversation={setSelectedConversationId}
                    onSendMessage={handleSendMessage}
                    onToggleSave={handleToggleSaveMessage}
                    filterByUserIds={FRIENDS_IDS}
                    isFriendsView={true}
                />;
            case 'friends-list':
                return <FriendsListView friends={friends} onStartChat={handleStartChat} onUnfriend={handleUnfriend} />;
            case 'edit-profile':
                 return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Edit Profile</h2>
                        <p className="text-brand-text-muted mb-8">Update your profile information and photos.</p>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                            <FormInput id="interests" label="Interests (comma separated)" defaultValue={user.interests.join(', ')} />
                            <FormInput id="lookingFor" label="Looking For (comma separated)" defaultValue={user.lookingFor.join(', ')} />
                            <div className="pt-6 border-t border-slate-700 flex justify-end">
                                <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-2.5 px-5 rounded-lg transition-opacity">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                );
            case 'edit-personal-details':
                return <EditPersonalDetailsView />;
            case 'change-password':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Password & Security</h2>
                        <p className="text-brand-text-muted mb-8">Manage your password and secure your account.</p>
                        <form className="space-y-6 max-w-sm" onSubmit={e => e.preventDefault()}>
                            <FormInput id="current-password" label="Current Password" type="password" placeholder="••••••••" />
                            <FormInput id="new-password" label="New Password" type="password" placeholder="••••••••" />
                            <FormInput id="confirm-password" label="Confirm New Password" type="password" placeholder="••••••••" />
                            <div className="pt-2">
                                <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-2.5 px-5 rounded-lg transition-opacity">Update Password</button>
                            </div>
                        </form>
                    </div>
                );
            case 'change-email':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Change Email Address</h2>
                        <p className="text-brand-text-muted mb-8">Update the email address associated with your account.</p>
                        <form className="space-y-6 max-w-sm" onSubmit={e => e.preventDefault()}>
                            <FormInput id="current-email" label="Current Email" defaultValue={'olivia@example.com'} />
                            <FormInput id="new-email" label="New Email" placeholder="new.email@example.com" />
                            <FormInput id="password-confirm-email" label="Confirm with Password" type="password" placeholder="••••••••" />
                            <div className="pt-2">
                                <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-2.5 px-5 rounded-lg transition-opacity">Update Email</button>
                            </div>
                        </form>
                    </div>
                );
            case 'change-username':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Change Username</h2>
                        <p className="text-brand-text-muted mb-8">Your username is unique and will be part of your public profile URL.</p>
                         <form className="space-y-6 max-w-sm" onSubmit={e => e.preventDefault()}>
                            <FormInput id="current-username" label="Current Username" defaultValue={user.name.split(',')[0]} />
                            <FormInput id="new-username" label="New Username" placeholder="NewAwesomeUsername" />
                            <FormInput id="password-confirm-username" label="Confirm with Password" type="password" placeholder="••••••••" />
                            <div className="pt-2">
                                <button type="submit" className="bg-brand-primary hover:opacity-90 text-white font-bold py-2.5 px-5 rounded-lg transition-opacity">Update Username</button>
                            </div>
                        </form>
                    </div>
                );
            case 'email-notifications':
                 return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Notifications</h2>
                        <p className="text-brand-text-muted mb-8">Choose how you want to be notified.</p>
                        <div className="space-y-4 max-w-xl divide-y divide-slate-700">
                            <ToggleSwitch label="Email Notifications" description="Receive emails about new messages and matches." defaultChecked />
                            <ToggleSwitch label="Push Notifications" description="Get push notifications on your device." defaultChecked />
                            <ToggleSwitch label="Profile Views" description="Notify me when someone views my profile." />
                             <ToggleSwitch label="Promotional Emails" description="Receive occasional updates and offers from Swingsfab." />
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Privacy Settings</h2>
                        <p className="text-brand-text-muted mb-8">Control your privacy and data settings.</p>
                         <div className="space-y-4 max-w-xl divide-y divide-slate-700">
                            <ToggleSwitch label="Show my online status" description="Let others see when you are online." defaultChecked />
                            <ToggleSwitch label="Profile Visibility" description="Your profile is visible to all members." defaultChecked />
                            <ToggleSwitch label="Photo Privacy" description="Your photos are visible to all members." defaultChecked />
                        </div>
                    </div>
                );
            
            // Placeholder Views
            case 'looked-at-me': return <PlaceholderView title="Looked At Me" description="See a list of members who have viewed your profile." />;
            case 'winks': return <PlaceholderView title="Winks" description="Manage the winks you've sent and received." />;
            case 'friend-updates': return <PlaceholderView title="Friend Updates" description="See the latest activity and updates from your friends." />;
            case 'friends-invites': return <PlaceholderView title="Friends Invites" description="Manage pending friend invitations." />;
            case 'manage-photos': return <PlaceholderView title="Manage Photos" description="Upload, organize, and delete your profile photos." />;
            case 'photos-fabd': return <PlaceholderView title="Photos You Fab'd" description="View a collection of photos you have 'Fab'd'." />;
            case 'recently-fabd-photos': return <PlaceholderView title="Recently Fab'd Photos" description="See the latest photos that have been 'Fab'd'." />;
            case 'manage-verifications': return <PlaceholderView title="Manage Verifications" description="Manage your profile verification status." />;
            case 'message-filters': return <PlaceholderView title="Message Filters" description="Set up filters to manage your incoming messages." />;
            case 'block-list': return <PlaceholderView title="Block List" description="Manage members you have blocked." />;
            case 'tips-getting-started': return <PlaceholderView title="Tips & Getting Started" description="Find helpful tips and guides for using the platform." />;
            case 'recommend-us': return <PlaceholderView title="Recommend Us" description="Share Swingsfab with your friends." />;
            case 'delete-account': return <PlaceholderView title="Delete Account" description="Permanently delete your account and all associated data." />;
            
            default:
                return <PlaceholderView title="Coming Soon" description="This feature is under construction." />
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={onBack} className="flex items-center space-x-2 text-sm text-brand-text-muted hover:text-white mb-6">
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Back to Dashboard</span>
            </button>
            <div className="bg-brand-surface rounded-2xl shadow-2xl shadow-black/30 overflow-hidden flex flex-col md:flex-row">
                <aside className="w-full md:w-64 lg:w-72 border-b md:border-b-0 md:border-r border-slate-700 p-4 md:p-6 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white mb-6 px-3">My Account</h2>
                    <div className="max-h-[50vh] md:max-h-full overflow-y-auto">
                         <NavSection title="Messages">
                             <NavItem icon={<InboxIcon className="w-5 h-5"/>} label="Read Messages" isActive={activeView === 'read-messages'} onClick={() => setActiveView('read-messages')} />
                             <NavItem icon={<SendIcon className="w-5 h-5"/>} label="Sent Messages" isActive={activeView === 'sent-messages'} onClick={() => setActiveView('sent-messages')} />
                             <NavItem icon={<BookmarkIcon className="w-5 h-5"/>} label="Saved Messages" isActive={activeView === 'saved-messages'} onClick={() => setActiveView('saved-messages')} />
                             <NavItem icon={<UsersIcon className="w-5 h-5"/>} label="Friends Messages" isActive={activeView === 'friends-messages'} onClick={() => setActiveView('friends-messages')} />
                         </NavSection>
                         <NavSection title="Activity">
                             <NavItem icon={<EyeIcon className="w-5 h-5"/>} label="Looked at me" isActive={activeView === 'looked-at-me'} onClick={() => setActiveView('looked-at-me')} />
                             <NavItem icon={<StarIcon className="w-5 h-5"/>} label="Winks" isActive={activeView === 'winks'} onClick={() => setActiveView('winks')} />
                              <NavItem icon={<RssIcon className="w-5 h-5"/>} label="Friend Updates" isActive={activeView === 'friend-updates'} onClick={() => setActiveView('friend-updates')} />
                         </NavSection>
                          <NavSection title="Friends">
                             <NavItem icon={<UsersIcon className="w-5 h-5"/>} label="Friends List" isActive={activeView === 'friends-list'} onClick={() => setActiveView('friends-list')} />
                             <NavItem icon={<UserPlusIcon className="w-5 h-5"/>} label="Friends Invites" isActive={activeView === 'friends-invites'} onClick={() => setActiveView('friends-invites')} />
                         </NavSection>
                         <NavSection title="Photos">
                             <NavItem icon={<CameraIcon className="w-5 h-5"/>} label="Manage Photos" isActive={activeView === 'manage-photos'} onClick={() => setActiveView('manage-photos')} />
                             <NavItem icon={<ThumbsUpIcon className="w-5 h-5"/>} label="Photos you Fab'd" isActive={activeView === 'photos-fabd'} onClick={() => setActiveView('photos-fabd')} />
                             <NavItem icon={<ClockIcon className="w-5 h-5"/>} label="Recently Fab'd Photos" isActive={activeView === 'recently-fabd-photos'} onClick={() => setActiveView('recently-fabd-photos')} />
                         </NavSection>
                         <NavSection title="Profile">
                             <NavItem icon={<ShieldCheckIcon className="w-5 h-5"/>} label="Manage Verifications" isActive={activeView === 'manage-verifications'} onClick={() => setActiveView('manage-verifications')} />
                             <NavItem icon={<EditIcon className="w-5 h-5"/>} label="Edit Profile" isActive={activeView === 'edit-profile'} onClick={() => setActiveView('edit-profile')} />
                             <NavItem icon={<UserCircleIcon className="w-5 h-5"/>} label="Edit Personal Details" isActive={activeView === 'edit-personal-details'} onClick={() => setActiveView('edit-personal-details')} />
                         </NavSection>
                         <NavSection title="Settings">
                             <NavItem icon={<SlidersHorizontalIcon className="w-5 h-5"/>} label="Message Filters" isActive={activeView === 'message-filters'} onClick={() => setActiveView('message-filters')} />
                             <NavItem icon={<LockIcon className="w-5 h-5"/>} label="Change Password" isActive={activeView === 'change-password'} onClick={() => setActiveView('change-password')} />
                             <NavItem icon={<MailIcon className="w-5 h-5"/>} label="Change Email" isActive={activeView === 'change-email'} onClick={() => setActiveView('change-email')} />
                             <NavItem icon={<AtSignIcon className="w-5 h-5"/>} label="Change Username" isActive={activeView === 'change-username'} onClick={() => setActiveView('change-username')} />
                             <NavItem icon={<BanIcon className="w-5 h-5"/>} label="Block List" isActive={activeView === 'block-list'} onClick={() => setActiveView('block-list')} />
                             <NavItem icon={<BellIcon className="w-5 h-5"/>} label="Email Notifications" isActive={activeView === 'email-notifications'} onClick={() => setActiveView('email-notifications')} />
                             <NavItem icon={<ShieldCheckIcon className="w-5 h-5"/>} label="Privacy" isActive={activeView === 'privacy'} onClick={() => setActiveView('privacy')} />
                         </NavSection>
                         <NavSection title="More">
                            <NavItem icon={<HelpCircleIcon className="w-5 h-5"/>} label="Tips & Getting Started" isActive={activeView === 'tips-getting-started'} onClick={() => setActiveView('tips-getting-started')} />
                            <NavItem icon={<GiftIcon className="w-5 h-5"/>} label="Recommend Us" isActive={activeView === 'recommend-us'} onClick={() => setActiveView('recommend-us')} />
                            <NavItem icon={<TrashIcon className="w-5 h-5"/>} label="Delete Account" isActive={activeView === 'delete-account'} onClick={() => setActiveView('delete-account')} />
                         </NavSection>
                    </div>
                </aside>
                <main className="flex-grow p-6 md:p-8 overflow-y-auto">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default MyAccountPage;
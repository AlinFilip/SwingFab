import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Message } from '../types';
import { XIcon, SendIcon } from './Icons';
import { MOCK_MESSAGES } from '../constants';

interface ChatModalProps {
  user: UserProfile;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ user, onClose }) => {
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES[user.id] || []);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'me',
            date: new Date()
        };

        setMessages(prev => [...prev, newMessage]);
        setInputValue('');

        // Simulate a reply
        setTimeout(() => {
            const replyMessage: Message = {
                id: Date.now() + 1,
                text: "That's cool! Tell me more.",
                sender: 'them',
                date: new Date()
            };
            setMessages(prev => [...prev, replyMessage]);
        }, 1500);
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-modal-title"
        >
            <div
                className="bg-brand-surface w-full max-w-lg h-[70vh] rounded-2xl shadow-2xl shadow-black/50 flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
                    <div className="flex items-center space-x-3">
                        <img src={user.imageUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover"/>
                        <h2 id="chat-modal-title" className="text-lg font-semibold text-white">{user.name}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 text-brand-text-muted hover:text-white hover:bg-slate-700/50 rounded-full">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-grow p-4 space-y-4 overflow-y-auto" role="log">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'them' && <img src={user.imageUrl} alt={user.name} className="w-6 h-6 rounded-full self-start"/>}
                            <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'me' ? 'bg-brand-primary text-white rounded-br-lg' : 'bg-slate-700 text-brand-text rounded-bl-lg'}`}>
                                <p className="text-sm">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-700 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="w-full bg-brand-bg border border-slate-600 rounded-full py-2.5 px-4 text-brand-text placeholder-brand-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            aria-label="Chat message input"
                        />
                        <button type="submit" className="bg-brand-primary text-white p-3 rounded-full hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" disabled={!inputValue.trim()}>
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatModal;
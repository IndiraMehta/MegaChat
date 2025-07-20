import React, { useState, useEffect, useRef } from 'react';

//used to store chat records in firebase's firestore
import { 
  collection, 
  addDoc, //add a new message document
  query, //+orderBy to sort messages chronologically
  orderBy, 
  onSnapshot,  //listens to realtime changes
  serverTimestamp  //generates firebase server time
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';  //currentUser and logout
import { Send, LogOut, MessageCircle } from 'lucide-react';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]); //array of chat messages fetchedd from firebase
  const [newMessage, setNewMessage] = useState(''); //checks for new messages in the input field of message
  const [loading, setLoading] = useState(false); //to show loading when sending a message
  const messagesEndRef = useRef(null); //to go to last messages
  const { currentUser, logout } = useAuth();

//I'm using onSnapshot() to listen to live changes in Firestore. Every time someone sends a message, the UI auto-updates without refreshing the page.
// Subscribes to the messages collection in Firestore.
// Orders by createdAt (timestamp field).
// When any message is added/updated, onSnapshot gets triggered.
// Updates the messages state in real time.
// Returns unsubscribe to clean up the listener when the component unmounts.
  
useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = [];
      snapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
    });

    return unsubscribe;
  }, []);

  //Every time the messages array updates, scroll the view to the bottom.
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    //Prevents blank messages or sending without being logged in.
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    setLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        createdAt: serverTimestamp(),
        email: currentUser.email,
        displayName: currentUser.displayName || 'Anonymous',

      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };
  //The sendMessage function uses Firestore’s addDoc() to add a new message with the current user's details. I also use serverTimestamp() so sorting works correctly for all clients.

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '?';
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-lg border-b border-white/20 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Chat Room</h1>
              <p className="text-sm text-gray-600">Welcome, {currentUser?.displayName}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="max-w-4xl mx-auto p-4 pb-24">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No messages yet</p>
              <p className="text-gray-400">Be the first to start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => {
              const isCurrentUser = message.email === currentUser?.email;
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                      {getInitials(message.displayName)}
                    </div>
                    <div className={`rounded-2xl px-4 py-2 ${
                      isCurrentUser 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                        : 'bg-white/70 backdrop-blur-lg border border-white/20 text-gray-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-between mt-1 text-xs ${
                        isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{message.displayName}</span>
                        <span>{formatTime(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-lg border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={sendMessage} className="flex space-x-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!newMessage.trim() || loading}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-2xl hover:from-blue-600 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
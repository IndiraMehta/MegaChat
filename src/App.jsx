import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/AuthForm';
import ChatRoom from './components/ChatRoom';

const AppContent = () => {
  const { currentUser } = useAuth();

  return currentUser ? <ChatRoom /> : <AuthForm />;
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../lib/firebase';

//This creates a context that will hold and provide auth-related data/functions globally.
const AuthContext = createContext();//created a context object(global store)

//custom hook that lets us access to authContext
//so instad of importing useContext(AuthContext) || using useAuth in every component
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

//This component will wrap your entire app, so every component inside it can access the context.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  //Registers a user using email + password.Updates their profile with a displayName.
  const signup = async (email, password, displayName) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, { displayName });
  };
  
  //Signs in the user using email and password.
  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  //Uses Google OAuth to sign in the user with a popup
  const signInWithGoogle = async () => {
    //creates a new Google OAuth provider instance using Firebase.
    //google oauth provider is a built in firebase class that lets users to sign in using gooogle account
    const provider = new GoogleAuthProvider();
    //prompt: 'select_account' forces the user to pick an account each time.
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    // signInWithPopup opens a Google login popup for the user.
    await signInWithPopup(auth, provider);
  };

  //Signs the user out of Firebase
  const logout = async () => {
    await signOut(auth);
  };


  //onAuthStateChanged watches for login/logout changes.
  //Once Firebase confirms the current auth state, it updates currentUser.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  //shared with child components
  const value = {
    currentUser,
    signup,
    login,
    signInWithGoogle,
    logout,
    loading
  };


  //Wraps all children components inside the provider.
  //Children only render after Firebase finishes checking the login state.
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
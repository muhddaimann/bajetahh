import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToken } from './tokenContext';
import { useOverlay } from './overlayContext';
import { User, DUMMY_STAFF, DUMMY_MANAGER } from '../constants/user';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: (force?: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { getToken, saveToken, deleteToken } = useToken();
  const { confirm, toast, showLoader, hideLoader } = useOverlay();

  useEffect(() => {
    const loadSession = async () => {
      showLoader("Initializing session...");
      try {
        const savedUsername = await getToken();
        if (savedUsername === DUMMY_STAFF.username) {
          setUser(DUMMY_STAFF);
          toast({
            message: `Welcome back, ${DUMMY_STAFF.name}`,
            variant: "success",
          });
        } else if (savedUsername === DUMMY_MANAGER.username) {
          setUser(DUMMY_MANAGER);
          toast({
            message: `Welcome back, ${DUMMY_MANAGER.name}`,
            variant: "success",
          });
        }
      } catch (e) {
        console.error("Failed to load session", e);
      } finally {
        // Add a small delay for smoother transition
        setTimeout(() => {
          hideLoader();
          setIsLoading(false);
        }, 800);
      }
    };
    loadSession();
  }, []);

  const signIn = async (username: string, password: string) => {
    showLoader("Authenticating...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    let authenticatedUser: User | null = null;

    if (username === DUMMY_STAFF.username && password === "123") {
      authenticatedUser = DUMMY_STAFF;
    } else if (username === DUMMY_MANAGER.username && password === "456") {
      authenticatedUser = DUMMY_MANAGER;
    }

    if (authenticatedUser) {
      try {
        await saveToken(username);
        setUser(authenticatedUser);
        hideLoader();
        toast({
          message: `Welcome, ${authenticatedUser.name}!`,
          variant: "success",
        });
        return true;
      } catch (e) {
        hideLoader();
        toast({
          message: "Failed to save session. Please check your browser settings.",
          variant: "error",
        });
        return false;
      }
    } else {
      hideLoader();
      toast({
        message: "Invalid username or password. Please try again.",
        variant: "error",
      });
      return false;
    }
  };

  const performSignOut = useCallback(async () => {
    showLoader("Logging you out...");
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await deleteToken();
      setUser(null);
      hideLoader();
      toast({ 
        message: 'Successfully logged out. See you soon!', 
        variant: 'success' 
      });
    } catch (e) {
      hideLoader();
      console.error('Failed to delete session', e);
      toast({ 
        message: 'Could not complete sign out. Please try again.', 
        variant: 'error' 
      });
    }
  }, [deleteToken, toast, showLoader, hideLoader]);

  const signOut = useCallback((force = false) => {
    if (force) {
      performSignOut();
      return;
    }

    confirm({
      title: 'Sign Out',
      message: 'Are you sure you want to log out of your account?',
      confirmText: 'Log Out',
      cancelText: 'Cancel',
      isDestructive: true,
      onConfirm: performSignOut,
    });
  }, [confirm, performSignOut]);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

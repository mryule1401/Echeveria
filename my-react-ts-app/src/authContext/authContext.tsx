import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import type { ReactNode } from "react";
import { auth, firestore } from "../service/firebaseConfig";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import type {User} from "firebase/auth"

import { doc, getDoc, setDoc, updateDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import AuthService from "../service/authService";

// Restore original AuthContext interface
export interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmailPassword: (email: string, password: string) => Promise<void>;
  signUpWithEmailPassword: (
    email: string,
    password: string,
    role?: "client"
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearAuthState: () => void;
  sendPasswordReset: (email: string) => Promise<void>;
}

// Create the AuthContext
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Add back UserDocData interface
interface UserDocData {
  email: string | null;
  name: string | null;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoggedInAt: Timestamp;
  applications: string[];
  streetGroupId: string | null;
  role?: "client";
}

// Add back ensureUserDocument helper function
const ensureUserDocument = async (
  user: User,
  role?: "client"
) => {
  const userDocRef = doc(firestore, "users", user.uid);
  // Add back public doc reference if it was there (assuming yes for now)
  const userPubDocRef = doc(firestore, "usersPub", user.uid);
  try {
    const userDocSnap = await getDoc(userDocRef);

    const userData: UserDocData = {
      email: user.email,
      // Use displayName or default, ensure null checks if needed
      name: user.displayName || "Anonymous User",
      photoURL: user.photoURL,
      createdAt: userDocSnap.exists()
        ? userDocSnap.data().createdAt
        : Timestamp.now(),
      lastLoggedInAt: Timestamp.now(),
      // Ensure applications field handling is correct
      applications: userDocSnap.exists()
        ? userDocSnap.data().applications || []
        : [],
      streetGroupId: userDocSnap.exists()
        ? userDocSnap.data().streetGroupId || null
        : null,
      role: userDocSnap.exists() ? userDocSnap.data().role ?? null : null,
    };

    const publicUserData = {
      name: user.displayName || "Anonymous",
      photoURL: user.photoURL,
      email: user.email, // Assuming public doc had email
    };

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, userData);
      console.log("Created new user document in Firestore");
      // Add back public doc creation
      await setDoc(userPubDocRef, publicUserData);
      console.log("Created new public user document in Firestore");
    } else {
      // Update only specific fields to avoid overwriting createdAt or applications unintentionally
      await updateDoc(userDocRef, {
        lastLoggedInAt: userData.lastLoggedInAt,
        name: userData.name,
        email: userData.email,
        ... (userData.photoURL ? {} : { photoURL: user.photoURL }),
      });

      // Add back public doc update
      await updateDoc(userPubDocRef, publicUserData);
      console.log("Updated existing user document in Firestore");
    }
  } catch (error) {
    console.error("Error ensuring user document:", error);
    throw error; // Re-throw
  }
};

// AuthProvider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const authService = useMemo(() => new AuthService(), []);

  const reauthenticateUser = async (password?: string) => {
    if (!currentUser) throw new Error("No user logged in");

    const providerId = currentUser.providerData[0]?.providerId;

    switch (providerId) {
      case "password":
        if (!currentUser.email || !password) {
          throw new Error("Password required for reauthentication");
        }
        const credential = EmailAuthProvider.credential(
          currentUser.email,
          password
        );
        return reauthenticateWithCredential(currentUser, credential);

      case "google.com":
        return reauthenticateWithPopup(currentUser, new GoogleAuthProvider());

      case "facebook.com":
        return reauthenticateWithPopup(currentUser, new FacebookAuthProvider());


      default:
        throw new Error(`Unsupported provider: ${providerId}`);
    }
  }
  // Clean up authentication status
  const clearAuthState = () => {
    setCurrentUser(null);
    // setLoading(false);
    // Clean up possible authentication data in local storage
    try {
      localStorage.removeItem('firebase:authUser:' + auth.app.options.apiKey + ':[DEFAULT]');
      sessionStorage.removeItem('firebase:authUser:' + auth.app.options.apiKey + ':[DEFAULT]');
    } catch (error) {
      console.log("Error clearing auth storage:", error);
    }
  };

  const navigateToLogin = () => {
    // Use replace instead of href to avoid full page reload
    if (window.location.pathname !== '/login') {
      window.history.replaceState(null, '', '/login');
      // Dispatch a custom event to trigger re-render instead of full reload
      window.dispatchEvent(new Event('popstate'));
    }
  };

  // Add back signInWithGoogle function
  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account"
      });
      const { user } = await signInWithPopup(auth, provider);
      await ensureUserDocument(user); // Ensure doc exists/is updated
      setCurrentUser(user); // Set current user after doc ensured

    } catch (error: any) {
      toast.error("Error while signing in")
      console.error("Error during Google sign-in:", error);
      // Don't throw error if user closes popup
      if (error?.code !== "auth/popup-closed-by-user") {
        throw error;
      }
    } finally {
      setLoading(false);
    }
  };


  // Add back signUpWithEmailPassword function
  const signUpWithEmailPassword = async (
    email: string,
    password: string,
    role?: "client"
  ) => {
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await ensureUserDocument(user, role);
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error) {
      toast.error("Error while signing in")
      console.error("Error during email/password signup:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Add back signInWithEmailPassword function
  const signInWithEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Update user document on sign-in
      await ensureUserDocument(user);
      setCurrentUser(user); // Set current user after doc ensured
    } catch (error) {
      toast.error("Error while signing in")
      console.error("Error during email/password sign-in:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function (kept)
  const logout = async () => {
    setLoading(true);
    try {
      setCurrentUser(null);
      clearAuthState();

      // Sign out from Firebase
      await signOut(auth);

      // Navigate without full page reload
      navigateToLogin();
    } catch (error) {
      toast.error("Error while logging out")
      console.error("Error logging out:", error);
      navigateToLogin();
      // throw error; // Re-throw error for potential handling upstream
    } finally {
      setLoading(false);
    }
  };

  // Add sendPasswordReset function
  const sendPasswordReset = async (email: string) => {
    // No loading state change here, as it's a quick operation
    try {
      await authService.sendPasswordReset(email);
      console.log("Password reset email sent successfully to:", email);
    } catch (error: any) {
      const errorMessage = error?.code === "auth/user-not-found" 
        ? "No account found with this email"
        : "Error sending password reset email";
      toast.error(errorMessage);
      console.error("Error sending password reset email:", error);
      throw error;
    }
  };

  // Listen for auth state changes (restore ensureUserDocument call)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          if (!currentUser || currentUser.uid !== user.uid) {
            await ensureUserDocument(user);
          }
          setCurrentUser(user);
          console.log("User authenticated:", user.email);
        } else {
          setCurrentUser(null);
          console.log("User signed out");

        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        clearAuthState();
        setCurrentUser(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [currentUser?.uid]);


  // Handling browser forward/back buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (!currentUser &&
        window.location.pathname.startsWith('/app')) {

        event.preventDefault();
        navigateToLogin();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentUser]);

  // Cleaning up state when a component is unmounted
  useEffect(() => {
    return () => {
      //Clean up any possible memory leaks
      setCurrentUser(null);
      setLoading(false);
    };
  }, []);

  // Provide the context value (add sendPasswordReset)
  const value: AuthContextType = {
    currentUser,
    loading: loading || !isInitialized,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    logout,
    sendPasswordReset,
    clearAuthState
  };

  // Remove loading indicator return, let consumers handle it if needed
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Helper hook to use the auth context (kept)
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

import { User } from '../types';
import { findUserByEmail, findUserById, addUser, updateUser } from '../data/users';


const USER_SESSION_KEY = 'oglasisrbija_user';

// --- Authentication Functions ---


/**
 * Simulates logging in a user by checking against the user database.
 * @param email The user's email.
 * @param password The user's password.
 * @param rememberMe Whether to persist the session across browser closures.
 * @returns A promise that resolves with the User object on success.
 * @throws An error if login fails.
 */
export const login = (email: string, password?: string, rememberMe: boolean = false): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUserByEmail(email);
      
      // In a real app, you'd check the password hash.
      // We'll keep the simple check for the primary test user.
      if (user && (password === 'password123' || user.email.toLowerCase() !== 'marko@example.com')) {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem(USER_SESSION_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Pogrešan email ili lozinka.'));
      }
    }, 1000); // Simulate network delay
  });
};

/**
 * Simulates registering a new user and persists it.
 * @param name The user's full name.
 * @param email The user's email.
 * @param password The user's password.
 * @returns A promise that resolves with the new User object on success.
 * @throws An error if registration fails (e.g., email already exists).
 */
export const register = (name: string, email: string, password?: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = findUserByEmail(email);
      
      if (existingUser) {
        reject(new Error('Korisnik sa ovom email adresom već postoji.'));
        return;
      }

      const newId = `user-${Date.now()}`;
      const newUser: User = {
        id: newId,
        name,
        email,
        avatar: `https://i.pravatar.cc/150?u=${newId}`,
        // FIX: Add required accountType property for new user registration.
        accountType: 'private',
      };
      
      addUser(newUser);

      // Log the user in immediately after registration (session only)
      sessionStorage.setItem(USER_SESSION_KEY, JSON.stringify(newUser));
      
      resolve(newUser);
    }, 1000); // Simulate network delay
  });
};

/**
 * Simulates requesting a password reset link.
 * @param email The user's email.
 * @returns A promise that always resolves to avoid email enumeration attacks.
 */
export const requestPasswordReset = (email: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = findUserByEmail(email);
      if (user) {
        // In a real app, you would generate a secure token, store it with an expiry,
        // and email the user a link like /reset-password?token=THE_TOKEN
        const mockToken = `MOCK_RESET_TOKEN_FOR_${user.id}`;
        console.log("--- PASSWORD RESET SIMULATION ---");
        console.log(`Reset requested for: ${email}`);
        console.log(`User found: ${user.name}`);
        console.log(`Generated token: ${mockToken}`);
        console.log(`In a real app, an email would be sent.`);
        console.log(`To test, navigate to the reset page using this token.`);
        console.log("---------------------------------");
      } else {
        console.log(`Password reset requested for non-existent email: ${email}. No action taken.`);
      }
      // We always resolve to prevent attackers from knowing which emails are registered.
      resolve();
    }, 1000);
  });
};

/**
 * Simulates resetting a user's password with a token.
 * @param token The password reset token.
 * @param newPassword The new password.
 * @returns A promise that resolves on success.
 * @throws An error if the token is invalid.
 */
export const resetPassword = (token: string, newPassword?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const prefix = "MOCK_RESET_TOKEN_FOR_";
      if (!token || !token.startsWith(prefix)) {
        reject(new Error("Nevažeći ili istekli token za resetovanje."));
        return;
      }
      const userId = token.substring(prefix.length);
      const user = findUserById(userId);

      if (user) {
        console.log(`--- PASSWORD RESET SIMULATION ---`);
        console.log(`Password for user "${user.name}" has been successfully changed.`);
        console.log(`New password would be: ${newPassword}`);
        console.log("---------------------------------");
        resolve();
      } else {
        reject(new Error("Nevažeći ili istekli token za resetovanje."));
      }
    }, 1000);
  });
};

/**
 * Updates the currently logged-in user's profile information.
 * @param updatedData An object containing the fields to update (e.g., name, avatar).
 * @returns A promise that resolves with the fully updated User object.
 * @throws An error if no user is logged in or the update fails.
 */
export const updateCurrentUser = (updatedData: Partial<User>): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      const currentUser = getCurrentUser();
      if (!currentUser) {
        reject(new Error("Nijedan korisnik trenutno nije prijavljen."));
        return;
      }

      const updatedUser = { ...currentUser, ...updatedData };

      try {
        const savedUser = updateUser(updatedUser);
        
        // Re-set the session/local storage with the new user data
        const persistentUserJson = localStorage.getItem(USER_SESSION_KEY);
        const storage = persistentUserJson ? localStorage : sessionStorage;
        storage.setItem(USER_SESSION_KEY, JSON.stringify(savedUser));
        
        resolve(savedUser);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
};


/**
 * Logs out a user by clearing both session and local storage.
 */
export const logout = (): void => {
  sessionStorage.removeItem(USER_SESSION_KEY);
  localStorage.removeItem(USER_SESSION_KEY);
};

/**
 * Gets the currently logged-in user from storage.
 * It prioritizes localStorage (for "Remember Me" sessions) over sessionStorage.
 * @returns The User object if logged in, otherwise null.
 */
export const getCurrentUser = (): User | null => {
  try {
    // Prioritize localStorage (persistent session)
    const persistentUserJson = localStorage.getItem(USER_SESSION_KEY);
    if (persistentUserJson) {
      return JSON.parse(persistentUserJson) as User;
    }

    // Fallback to sessionStorage
    const sessionUserJson = sessionStorage.getItem(USER_SESSION_KEY);
    if (sessionUserJson) {
      return JSON.parse(sessionUserJson) as User;
    }

    return null;
  } catch (error) {
    console.error("Failed to parse user from storage", error);
    // Clear potentially corrupted storage
    logout();
    return null;
  }
};

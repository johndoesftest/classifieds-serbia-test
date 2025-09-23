import { User } from '../types';

// The key for storing the users database in localStorage.
const USERS_DB_KEY = 'oglasisrbija_users_db';

// Initial "database" state. It will only be used the first time the app loads.
const INITIAL_MOCK_USERS: User[] = [
    { id: 'user-1', name: 'Marko Petrović', email: 'marko@example.com', avatar: 'https://i.pravatar.cc/150?u=marko', phone: '064 123 4567', accountType: 'private' },
    { id: 'user-2', name: 'Jelena Jovanović', email: 'jelena.j@example.com', avatar: 'https://i.pravatar.cc/150?u=jelena', phone: '065 987 6543', accountType: 'private' },
    { id: 'user-3', name: 'Nikola Nikolić', email: 'nikola.n@example.com', avatar: 'https://i.pravatar.cc/150?u=nikola', phone: '061 111 2222', accountType: 'private' },
    { id: 'user-4', name: 'Petar Popović', email: 'petar.p@example.com', avatar: 'https://i.pravatar.cc/150?u=petar', phone: '069 876 5432', accountType: 'private' },
    { id: 'user-5', name: 'Dragan Kostić', email: 'dragan.k@example.com', avatar: 'https://i.pravatar.cc/150?u=dragan', phone: '063 123 4567', accountType: 'private' },
    { id: 'user-41', name: 'Ana Kovač', email: 'ana.kovac@example.com', avatar: 'https://i.pravatar.cc/150?u=ana', phone: '062 444 7766', accountType: 'private' },
];

// In-memory cache to avoid constant JSON parsing
let usersCache: User[] = [];

/**
 * Retrieves the list of all users from localStorage.
 * @returns An array of User objects.
 */
const getAllUsers = (): User[] => {
  if (usersCache.length > 0) {
    return usersCache;
  }
  try {
    const usersJson = localStorage.getItem(USERS_DB_KEY);
    const users = usersJson ? (JSON.parse(usersJson) as User[]) : [];
    usersCache = users;
    return users;
  } catch (error) {
    console.error("Failed to parse users from storage", error);
    return [];
  }
};

/**
 * Saves a list of users to localStorage.
 * @param users The array of User objects to save.
 */
const saveAllUsers = (users: User[]): void => {
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  usersCache = users; // Update cache
};

/**
 * Initializes the users database in localStorage if it doesn't exist.
 */
const initializeUsersDatabase = (): void => {
  const storedUsers = localStorage.getItem(USERS_DB_KEY);
  if (!storedUsers) {
    saveAllUsers(INITIAL_MOCK_USERS);
  } else {
    // Ensure cache is loaded on startup
    getAllUsers();
  }
};

// --- Exported Functions ---

export const findUserByEmail = (email: string): User | undefined => {
  return getAllUsers().find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: string): User | undefined => {
  return getAllUsers().find(user => user.id === id);
};

export const addUser = (newUser: User): User => {
  const allUsers = getAllUsers();
  const updatedUsers = [...allUsers, newUser];
  saveAllUsers(updatedUsers);
  return newUser;
};

export const updateUser = (updatedUser: User): User => {
  const allUsers = getAllUsers();
  const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);
  if (userIndex === -1) {
    throw new Error("User not found.");
  }
  const updatedUsers = [...allUsers];
  updatedUsers[userIndex] = updatedUser;
  saveAllUsers(updatedUsers);
  return updatedUser;
};

// Initialize the DB on module load.
initializeUsersDatabase();

import { User } from '../types';

// The key for storing the user database in localStorage.
const USERS_DB_KEY = 'oglasisrbija_users_db';

// Initial "database" state. It will only be used the first time the app loads.
const INITIAL_MOCK_USERS: User[] = [
  {
    id: 'user-1',
    name: 'Marko Petrović',
    email: 'marko@example.com',
    avatar: 'https://i.pravatar.cc/150?u=marko',
  },
  {
    id: 'user-2',
    name: 'Jelena Jovanović',
    email: 'jelena@example.com',
    avatar: 'https://i.pravatar.cc/150?u=jelena',
  },
  {
    id: 'user-3',
    name: 'Nikola Nikolić',
    email: 'nikola@example.com',
    avatar: 'https://i.pravatar.cc/150?u=nikola',
  }
];

/**
 * Retrieves the list of all users from localStorage.
 * @returns An array of User objects.
 */
const getAllUsers = (): User[] => {
  try {
    const usersJson = localStorage.getItem(USERS_DB_KEY);
    return usersJson ? (JSON.parse(usersJson) as User[]) : [];
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
};

/**
 * Initializes the user database in localStorage if it doesn't exist.
 */
const initializeUserDatabase = (): void => {
  if (!localStorage.getItem(USERS_DB_KEY)) {
    saveAllUsers(INITIAL_MOCK_USERS);
  }
};

// --- Public API for User Data ---

// Initialize the DB on module load, ensuring data is ready.
initializeUserDatabase();

/**
 * Finds a user by their email address (case-insensitive).
 * @param email The email to search for.
 * @returns The User object if found, otherwise undefined.
 */
export const findUserByEmail = (email: string): User | undefined => {
  const allUsers = getAllUsers();
  return allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
};

/**
 * Finds a user by their ID.
 * @param id The user ID to search for.
 * @returns The User object if found, otherwise undefined.
 */
export const findUserById = (id: string): User | undefined => {
  const allUsers = getAllUsers();
  return allUsers.find(u => u.id === id);
};

/**
 * Adds a new user to the database.
 * @param newUser The new user object to add.
 */
export const addUser = (newUser: User): void => {
  const allUsers = getAllUsers();
  const updatedUsers = [...allUsers, newUser];
  saveAllUsers(updatedUsers);
};

/**
 * Updates a user in the database.
 * @param updatedUser The user object with updated information.
 * @returns The updated user object.
 * @throws An error if the user to update is not found.
 */
export const updateUser = (updatedUser: User): User => {
  const allUsers = getAllUsers();
  const userIndex = allUsers.findIndex(u => u.id === updatedUser.id);

  if (userIndex === -1) {
    throw new Error("Korisnik nije pronađen za ažuriranje.");
  }

  allUsers[userIndex] = updatedUser;
  saveAllUsers(allUsers);
  return updatedUser;
};

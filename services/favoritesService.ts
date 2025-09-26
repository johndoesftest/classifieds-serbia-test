const GUEST_KEY = 'oglasisrbija_favorites_guest';
const USER_KEY_PREFIX = 'oglasisrbija_favorites_';

const getStorageKey = (userId?: string): string => {
    return userId ? `${USER_KEY_PREFIX}${userId}` : GUEST_KEY;
};

/**
 * Retrieves favorite listing IDs from localStorage.
 * @param userId Optional ID of the logged-in user.
 * @returns An array of listing IDs.
 */
export const getFavorites = (userId?: string): string[] => {
    try {
        const key = getStorageKey(userId);
        const favoritesJson = localStorage.getItem(key);
        return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
        console.error("Failed to parse favorites from storage", error);
        return [];
    }
};

/**
 * Saves a list of favorite listing IDs to localStorage.
 * @param favorites An array of listing IDs.
 * @param userId Optional ID of the logged-in user.
 */
const saveFavorites = (favorites: string[], userId?: string): void => {
    const key = getStorageKey(userId);
    localStorage.setItem(key, JSON.stringify(favorites));
};

/**
 * Toggles a listing's favorite status.
 * @param listingId The ID of the listing to toggle.
 * @param userId Optional ID of the logged-in user.
 * @returns The new array of favorite listing IDs.
 */
export const toggleFavorite = (listingId: string, userId?: string): string[] => {
    const currentFavorites = getFavorites(userId);
    const isFavorited = currentFavorites.includes(listingId);
    let newFavorites;

    if (isFavorited) {
        newFavorites = currentFavorites.filter(id => id !== listingId);
    } else {
        newFavorites = [...currentFavorites, listingId];
    }
    
    saveFavorites(newFavorites, userId);
    return newFavorites;
};

/**
 * Merges guest favorites into a user's favorites upon login.
 * This should be called after a user logs in or registers.
 * @param userId The ID of the user who just logged in.
 * @returns The new array of favorite IDs for the user.
 */
export const mergeGuestFavorites = (userId: string): string[] => {
    const guestFavorites = getFavorites(); // Get guest favorites
    if (guestFavorites.length === 0) {
        return getFavorites(userId); // Nothing to merge, return user's current faves
    }

    const userFavorites = getFavorites(userId);
    const merged = Array.from(new Set([...userFavorites, ...guestFavorites]));
    
    saveFavorites(merged, userId);
    // Clear guest favorites after merging
    localStorage.removeItem(GUEST_KEY);

    return merged;
};

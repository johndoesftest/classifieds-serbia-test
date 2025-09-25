import { Listing } from "../types";

/**
 * Formats the price of a listing based on its value and type.
 * @param listing The listing object.
 * @param isCompact Whether to use a compact format (e.g., for cards).
 * @returns A formatted price string.
 */
export const formatPrice = (listing: Listing, isCompact: boolean = false): string => {
  if (listing.price <= 0) {
    return 'Po dogovoru';
  }
  
  const formattedAmount = new Intl.NumberFormat('de-DE').format(listing.price);
  const currency = ` ${listing.currency}`;
  
  switch (listing.priceType) {
    case 'salary_monthly':
      return formattedAmount + currency + (isCompact ? '/mes.' : ' / mesečno');
    case 'salary_yearly':
      return formattedAmount + currency + (isCompact ? '/god.' : ' / godišnje');
    case 'per_hour':
        return formattedAmount + currency + (isCompact ? '/h' : ' / satu');
    case 'fixed':
    default:
      return formattedAmount + currency;
  }
};

/**
 * Formats the condition of a listing into a user-friendly string.
 * @param condition The condition value from the listing.
 * @param category The category of the listing, used for context-specific terms.
 * @returns A formatted condition string or null.
 */
export const formatCondition = (condition?: Listing['condition'], category?: Listing['category']): string | null => {
    if (condition === 'used') {
        if (category === 'nekretnine') {
            return 'Starogradnja';
        }
        return 'Polovan';
    }

    switch (condition) {
        case 'new':
            return 'Novo';
        case 'new_build':
            return 'Novogradnja';
        case 'renovation_needed':
            return 'Za renoviranje';
        default:
            return null;
    }
};

/**
 * Formats the location of a listing, providing a detailed address for properties.
 * @param listing The listing object.
 * @returns A formatted location string.
 */
export const formatAddress = (listing: Listing): string => {
    if (!listing.location) {
        return 'Lokacija nije navedena';
    }

    if (listing.specifics?.address) {
        // Combine address specifics with the main location (city)
        return `${listing.specifics.address}, ${listing.location}`;
    }
    
    return listing.location;
};
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Listing, Page } from '../types';
import { LOCATION_COORDINATES } from '../data/locations';
import { formatAddress } from '../utils/formatting';
import MapPopupCard from './MapPopupCard';

// Fix for default Leaflet icon path issue with module bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapComponentProps {
  listings: Listing[];
  onNavigate: (page: Page) => void;
}

const MapComponent: React.FC<MapComponentProps> = ({ listings, onNavigate }) => {
  const mapRef = useRef<L.Map>(null);

  // When the map is shown (e.g., toggled from list view), its container might have
  // been resized. This effect ensures the map tiles render correctly.
  useEffect(() => {
    const timer = setTimeout(() => {
      mapRef.current?.invalidateSize();
    }, 100); // Small delay to ensure container is visible
    return () => clearTimeout(timer);
  }, []);

  const listingsWithCoords = listings
    .map(listing => {
      // Prioritize the full address, then fall back to just the city.
      const addressKey = formatAddress(listing);
      const cityKey = listing.location || '';
      
      const coords = LOCATION_COORDINATES[addressKey] || LOCATION_COORDINATES[cityKey];
      
      return coords ? { ...listing, coords } : null;
    })
    .filter((l): l is Listing & { coords: [number, number] } => l !== null);
    
  return (
    <div className="h-[75vh] w-full rounded-lg shadow-xl overflow-hidden">
        <MapContainer 
            center={[44.2, 20.9]} 
            zoom={7} 
            scrollWheelZoom={true} 
            className="h-full w-full"
            ref={mapRef}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {listingsWithCoords.map(listing => (
                <Marker key={listing.id} position={listing.coords}>
                    <Popup minWidth={256}>
                        <MapPopupCard listing={listing} onNavigate={onNavigate} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    </div>
  );
};

export default MapComponent;

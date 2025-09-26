import React from 'react';
import {
  Search,
  Car,
  Home,
  Briefcase,
  Wrench,
  PlusCircle,
  Menu,
  X,
  UserCircle,
  Settings,
  LogOut,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Trash2,
  MessageSquare,
  Handshake,
  Layers,
  MousePointer2,
  Quote,
  Phone,
  Mail,
  Flag,
  ChevronsUpDown,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Camera,
  Pencil,
  Check,
  Building2,
  Package,
  PawPrint,
  Map,
  List,
  Heart, // Added Heart icon
  type LucideProps
} from 'lucide-react';

// For branding, we'll keep the custom LogoIcon SVG.
export const LogoIcon: React.FC<LucideProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);

// Re-exporting Lucide icons with the names used throughout the app
export const SearchIcon = Search;
export const CarIcon = Car;
export const RealEstateIcon = Home;
export const JobIcon = Briefcase;
export const ServiceIcon = Wrench;
export const PackageIcon = Package;
export const PawPrintIcon = PawPrint;
export const PlusCircleIcon = PlusCircle;
export const MenuIcon = Menu;
export const XIcon = X;
export const UserCircleIcon = UserCircle;
export const Cog6ToothIcon = Settings;
export const ArrowRightOnRectangleIcon = LogOut;
export const MapPinIcon = MapPin;
export const FacebookIcon = Facebook;
export const TwitterIcon = Twitter;
export const InstagramIcon = Instagram;
export const TrashIcon = Trash2;
export const ChatBubbleIcon = MessageSquare;
export const HandshakeIcon = Handshake;
export const LayersIcon = Layers;
export const CursorArrowIcon = MousePointer2;
export const QuoteIcon = Quote;
export const PhoneIcon = Phone;
export const EmailIcon = Mail;
export const FlagIcon = Flag;
export const ChevronUpDownIcon = ChevronsUpDown;
export const SparklesIcon = Sparkles;
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRightIcon = ChevronRight;
export const CameraIcon = Camera;
export const PencilIcon = Pencil;
export const CheckIcon = Check;
export const Building2Icon = Building2;
export const MapIcon = Map;
export const ListIcon = List;
export const HeartIcon = Heart;
import React from 'react';
import {
  Boxes,
  Car,
  Home as HomeIconLucide,
  Briefcase,
  Wrench,
  Smartphone,
  Lamp,
  Sparkles,
  Search,
  MessageCircle,
  Handshake,
  Layers,
  MousePointerClick,
  MapPin,
  Quote,
  Image,
  X,
  PlusCircle,
  ChevronsUpDown,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  Flag,
  Trash2,
  UserCircle2,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  type LucideProps
} from 'lucide-react';

// Re-exporting with the same names to minimize changes in other files.
// The default props for Lucide icons are stroke="currentColor", strokeWidth="2", fill="none"
// We will adjust the ones that were filled icons.

export const LogoIcon: React.FC<LucideProps> = (props) => <Boxes {...props} />;
export const CarIcon: React.FC<LucideProps> = (props) => <Car {...props} />;
export const RealEstateIcon: React.FC<LucideProps> = (props) => <HomeIconLucide {...props} />;
export const JobIcon: React.FC<LucideProps> = (props) => <Briefcase {...props} />;
export const ServiceIcon: React.FC<LucideProps> = (props) => <Wrench {...props} />;
export const ElectronicsIcon: React.FC<LucideProps> = (props) => <Smartphone {...props} />;
export const HomeIcon: React.FC<LucideProps> = (props) => <Lamp {...props} />;
export const SparklesIcon: React.FC<LucideProps> = (props) => <Sparkles {...props} />;
export const SearchIcon: React.FC<LucideProps> = (props) => <Search {...props} />;
export const ChatBubbleIcon: React.FC<LucideProps> = (props) => <MessageCircle {...props} />;
export const HandshakeIcon: React.FC<LucideProps> = (props) => <Handshake {...props} />;
export const LayersIcon: React.FC<LucideProps> = (props) => <Layers {...props} />;
export const CursorArrowIcon: React.FC<LucideProps> = (props) => <MousePointerClick {...props} />;
export const MapPinIcon: React.FC<LucideProps> = (props) => <MapPin {...props} />;
export const QuoteIcon: React.FC<LucideProps> = (props) => <Quote {...props} fill="currentColor" />;
export const PhotoIcon: React.FC<LucideProps> = (props) => <Image {...props} />;
export const XIcon: React.FC<LucideProps> = (props) => <X {...props} />;
export const PlusCircleIcon: React.FC<LucideProps> = (props) => <PlusCircle {...props} />;
export const ChevronUpDownIcon: React.FC<LucideProps> = (props) => <ChevronsUpDown {...props} />;
export const MenuIcon: React.FC<LucideProps> = (props) => <Menu {...props} />;
export const FacebookIcon: React.FC<LucideProps> = (props) => <Facebook {...props} fill="currentColor" />;
export const TwitterIcon: React.FC<LucideProps> = (props) => <Twitter {...props} fill="currentColor" />;
export const InstagramIcon: React.FC<LucideProps> = (props) => <Instagram {...props} fill="currentColor" />;
export const PhoneIcon: React.FC<LucideProps> = (props) => <Phone {...props} />;
export const EmailIcon: React.FC<LucideProps> = (props) => <Mail {...props} />;
export const FlagIcon: React.FC<LucideProps> = (props) => <Flag {...props} />;
export const TrashIcon: React.FC<LucideProps> = (props) => <Trash2 {...props} />;
export const UserCircleIcon: React.FC<LucideProps> = (props) => <UserCircle2 {...props} />;
export const Cog6ToothIcon: React.FC<LucideProps> = (props) => <Settings {...props} />;
export const ArrowRightOnRectangleIcon: React.FC<LucideProps> = (props) => <LogOut {...props} />;
export const ChevronLeftIcon: React.FC<LucideProps> = (props) => <ChevronLeft {...props} />;
export const ChevronRightIcon: React.FC<LucideProps> = (props) => <ChevronRight {...props} />;
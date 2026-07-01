import {
  Car, Truck, Type, Palette, ChefHat, Flag, Bus, Building2, PanelsTopLeft,
  PencilRuler, ShieldCheck, Award, Layers, Sparkles, MapPin, Hammer,
  HeartPulse, Store, Briefcase, Phone, Mail, Clock, ArrowRight, Check,
  Star, Quote, Menu, X, ChevronRight, Send, Upload, ExternalLink,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Car, Truck, Type, Palette, ChefHat, Flag, Bus, Building2, PanelsTopLeft,
  PencilRuler, ShieldCheck, Award, Layers, Sparkles, MapPin, Hammer,
  HeartPulse, Store, Briefcase, Phone, Mail, Clock, ArrowRight, Check,
  Star, Quote, Menu, X, ChevronRight, Send, Upload, ExternalLink,
};

export function Icon({
  name,
  className,
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

export type VehicleStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "HIDDEN";

export type Vehicle = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  fuel: string;
  transmission: string;
  kmDriven: number;
  bodyType: string;
  color?: string;
  ownership: string;
  registration?: string;
  registrationState?: string;
  location: string;
  status: VehicleStatus;
  description: string;
  features: string[];
  highlights: string[];
  images: string[];
  featured?: boolean;
  createdAt?: string;
};

export type LeadType = "BUYER" | "SELLER" | "FINANCE" | "GENERAL" | "INSPECTION" | "PRICE_REQUEST";
export type LeadStatus = "NEW" | "CONTACTED" | "FOLLOW_UP" | "SITE_VISIT" | "INSPECTION_SCHEDULED" | "VALUATION_GIVEN" | "NEGOTIATION" | "CONVERTED" | "PURCHASED" | "REJECTED" | "LOST";

export type Lead = {
  id: string;
  type: LeadType;
  status: LeadStatus;
  name: string;
  mobile: string;
  email?: string;
  vehicleId?: string;
  vehicleName?: string;
  source?: string;
  city?: string;
  nextFollowUp?: string;
  assignedStaff?: string;
  message?: string;
  payload?: Record<string, unknown>;
  createdAt: string;
};

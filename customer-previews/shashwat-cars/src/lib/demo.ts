import type { Vehicle } from "./types";

// Development/customer-preview inventory. Images are representative demo photography only.
// Replace all demo vehicles and images with verified dealership inventory before production.
export const demoVehicles: Vehicle[] = [
  {
    id: "demo-1", slug: "hyundai-creta-sx-2022", brand: "Hyundai", model: "Creta", variant: "SX", year: 2022,
    price: 1285000, fuel: "Petrol", transmission: "Automatic", kmDriven: 42000, bodyType: "SUV", color: "White",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Customer-preview demo vehicle. Photography is representative only; replace with verified dealership inventory before production.",
    features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Rear Camera", "Infotainment"],
    highlights: ["Demo inventory", "Automatic transmission", "SUV"], images: ["https://images.unsplash.com/photo-1760713170685-b67abc3be5ad?auto=format&fit=crop&w=1200&q=84"], featured: true
  },
  {
    id: "demo-2", slug: "maruti-baleno-alpha-2021", brand: "Maruti Suzuki", model: "Baleno", variant: "Alpha", year: 2021,
    price: 725000, fuel: "Petrol", transmission: "Manual", kmDriven: 36000, bodyType: "Hatchback", color: "Blue",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Customer-preview demo vehicle only. Production inventory must come from the admin/database.", features: ["Air Conditioning", "ABS", "Airbags", "Alloy Wheels"],
    highlights: ["Demo inventory", "Low running"], images: ["https://images.unsplash.com/photo-1624305408751-f4dec8e1000d?auto=format&fit=crop&w=1200&q=84"], featured: true
  },
  {
    id: "demo-3", slug: "tata-nexon-xz-plus-2022", brand: "Tata", model: "Nexon", variant: "XZ+", year: 2022,
    price: 895000, fuel: "Diesel", transmission: "Manual", kmDriven: 51000, bodyType: "SUV", color: "Grey",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "RESERVED",
    description: "Customer-preview demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Infotainment"],
    highlights: ["Demo inventory", "Reserved example"], images: ["https://images.unsplash.com/photo-1750830331454-86df5c088ca7?auto=format&fit=crop&w=1200&q=84"], featured: true
  },
  {
    id: "demo-4", slug: "honda-city-vx-2020", brand: "Honda", model: "City", variant: "VX", year: 2020,
    price: 865000, fuel: "Petrol", transmission: "Manual", kmDriven: 58000, bodyType: "Sedan", color: "Silver",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Customer-preview demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
    highlights: ["Demo inventory", "Sedan"], images: ["https://images.unsplash.com/photo-1755288348267-3b8bf38e7961?auto=format&fit=crop&w=1200&q=84"], featured: true
  },
  {
    id: "demo-5", slug: "kia-seltos-htk-plus-2021", brand: "Kia", model: "Seltos", variant: "HTK+", year: 2021,
    price: 1125000, fuel: "Diesel", transmission: "Manual", kmDriven: 47000, bodyType: "SUV", color: "Black",
    ownership: "2nd Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Customer-preview demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Alloy Wheels"],
    highlights: ["Demo inventory", "SUV"], images: ["https://images.unsplash.com/photo-1761169331343-df176a83c8a9?auto=format&fit=crop&w=1200&q=84"], featured: true
  },
  {
    id: "demo-6", slug: "mahindra-xuv300-w8-2020", brand: "Mahindra", model: "XUV300", variant: "W8", year: 2020,
    price: 795000, fuel: "Diesel", transmission: "Manual", kmDriven: 63000, bodyType: "SUV", color: "Red",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "SOLD",
    description: "Customer-preview demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
    highlights: ["Demo inventory", "Sold example"], images: ["https://images.unsplash.com/photo-1613507323749-df09c966f063?auto=format&fit=crop&w=1200&q=84"], featured: false
  }
];

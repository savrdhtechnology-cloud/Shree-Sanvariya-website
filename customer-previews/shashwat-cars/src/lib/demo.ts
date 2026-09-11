import type { Vehicle } from "./types";

// Development/customer-preview inventory. It is never returned by the production target unless explicitly enabled.
export const demoVehicles: Vehicle[] = [
  {
    id: "demo-1", slug: "hyundai-creta-sx-2022", brand: "Hyundai", model: "Creta", variant: "SX", year: 2022,
    price: 1285000, fuel: "Petrol", transmission: "Automatic", kmDriven: 42000, bodyType: "SUV", color: "White",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Development demo vehicle used to validate the digital showroom experience. Replace with verified inventory before production.",
    features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Rear Camera", "Infotainment"],
    highlights: ["Demo inventory", "Automatic transmission", "SUV"], images: ["/vehicle-placeholder.svg"], featured: true
  },
  {
    id: "demo-2", slug: "maruti-baleno-alpha-2021", brand: "Maruti Suzuki", model: "Baleno", variant: "Alpha", year: 2021,
    price: 725000, fuel: "Petrol", transmission: "Manual", kmDriven: 36000, bodyType: "Hatchback", color: "Blue",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Development demo vehicle only. Production inventory must come from the admin/database.", features: ["Air Conditioning", "ABS", "Airbags", "Alloy Wheels"],
    highlights: ["Demo inventory", "Low running"], images: ["/vehicle-placeholder.svg"], featured: true
  },
  {
    id: "demo-3", slug: "tata-nexon-xz-plus-2022", brand: "Tata", model: "Nexon", variant: "XZ+", year: 2022,
    price: 895000, fuel: "Diesel", transmission: "Manual", kmDriven: 51000, bodyType: "SUV", color: "Grey",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "RESERVED",
    description: "Development demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Infotainment"],
    highlights: ["Demo inventory", "Reserved example"], images: ["/vehicle-placeholder.svg"], featured: true
  },
  {
    id: "demo-4", slug: "honda-city-vx-2020", brand: "Honda", model: "City", variant: "VX", year: 2020,
    price: 865000, fuel: "Petrol", transmission: "Manual", kmDriven: 58000, bodyType: "Sedan", color: "Silver",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Development demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
    highlights: ["Demo inventory", "Sedan"], images: ["/vehicle-placeholder.svg"], featured: true
  },
  {
    id: "demo-5", slug: "kia-seltos-htk-plus-2021", brand: "Kia", model: "Seltos", variant: "HTK+", year: 2021,
    price: 1125000, fuel: "Diesel", transmission: "Manual", kmDriven: 47000, bodyType: "SUV", color: "Black",
    ownership: "2nd Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "AVAILABLE",
    description: "Development demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags", "Alloy Wheels"],
    highlights: ["Demo inventory", "SUV"], images: ["/vehicle-placeholder.svg"], featured: true
  },
  {
    id: "demo-6", slug: "mahindra-xuv300-w8-2020", brand: "Mahindra", model: "XUV300", variant: "W8", year: 2020,
    price: 795000, fuel: "Diesel", transmission: "Manual", kmDriven: 63000, bodyType: "SUV", color: "Red",
    ownership: "1st Owner", registration: "MP", registrationState: "Madhya Pradesh", location: "Bhopal", status: "SOLD",
    description: "Development demo vehicle only.", features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
    highlights: ["Demo inventory", "Sold example"], images: ["/vehicle-placeholder.svg"], featured: false
  }
];

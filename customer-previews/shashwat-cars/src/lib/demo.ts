import type { Vehicle } from "./types";

// Customer-preview inventory. Images are clean catalogue-style demo crops for design review.
// Replace these records with verified dealership inventory before final production launch.
const common = {
  ownership: "1st Owner",
  registration: "MP",
  registrationState: "Madhya Pradesh",
  location: "Bhopal",
  status: "AVAILABLE" as const,
  description: "Customer-preview demo vehicle. Replace with verified dealership inventory before production.",
  features: ["Air Conditioning", "Power Windows", "ABS", "Airbags"],
};

export const demoVehicles: Vehicle[] = [
  { ...common, id:"demo-city", slug:"honda-city-vx-2020", brand:"Honda", model:"City", variant:"VX", year:2020, price:865000, fuel:"Petrol", transmission:"Manual", kmDriven:58000, bodyType:"Sedan", color:"Grey", highlights:["Demo inventory","Sedan"], images:["/cars/honda-city.webp"], featured:true },
  { ...common, id:"demo-verna", slug:"hyundai-verna-sx-2022", brand:"Hyundai", model:"Verna", variant:"SX", year:2022, price:1245000, fuel:"Petrol", transmission:"Automatic", kmDriven:32000, bodyType:"Sedan", color:"Grey", highlights:["Demo inventory","Automatic"], images:["/cars/hyundai-verna.webp"], featured:true },
  { ...common, id:"demo-ciaz", slug:"maruti-suzuki-ciaz-zeta-2021", brand:"Maruti Suzuki", model:"Ciaz", variant:"Zeta", year:2021, price:795000, fuel:"Petrol", transmission:"Manual", kmDriven:47000, bodyType:"Sedan", color:"White", highlights:["Demo inventory","Sedan"], images:["/cars/maruti-ciaz.webp"], featured:false },
  { ...common, id:"demo-baleno", slug:"maruti-suzuki-baleno-alpha-2021", brand:"Maruti Suzuki", model:"Baleno", variant:"Alpha", year:2021, price:725000, fuel:"Petrol", transmission:"Manual", kmDriven:36000, bodyType:"Hatchback", color:"Blue", highlights:["Demo inventory","Hatchback"], images:["/cars/maruti-baleno.webp"], featured:true },
  { ...common, id:"demo-i20", slug:"hyundai-i20-asta-2022", brand:"Hyundai", model:"i20", variant:"Asta", year:2022, price:875000, fuel:"Petrol", transmission:"Automatic", kmDriven:29000, bodyType:"Hatchback", color:"Red", highlights:["Demo inventory","Automatic"], images:["/cars/hyundai-i20.webp"], featured:true },
  { ...common, id:"demo-altroz", slug:"tata-altroz-xz-plus-2021", brand:"Tata", model:"Altroz", variant:"XZ+", year:2021, price:750000, fuel:"Petrol", transmission:"Manual", kmDriven:41000, bodyType:"Hatchback", color:"Gold", highlights:["Demo inventory","Hatchback"], images:["/cars/tata-altroz.webp"], featured:false },
  { ...common, id:"demo-creta", slug:"hyundai-creta-sx-2022", brand:"Hyundai", model:"Creta", variant:"SX", year:2022, price:1285000, fuel:"Petrol", transmission:"Automatic", kmDriven:42000, bodyType:"SUV", color:"Blue", highlights:["Demo inventory","SUV","Automatic"], images:["/cars/hyundai-creta.webp"], featured:true },
  { ...common, id:"demo-seltos", slug:"kia-seltos-htk-plus-2021", brand:"Kia", model:"Seltos", variant:"HTK+", year:2021, price:1125000, fuel:"Diesel", transmission:"Manual", kmDriven:47000, bodyType:"SUV", color:"Black", highlights:["Demo inventory","SUV"], images:["/cars/kia-seltos.webp"], featured:true },
  { ...common, id:"demo-nexon", slug:"tata-nexon-xz-plus-2022", brand:"Tata", model:"Nexon", variant:"XZ+", year:2022, price:895000, fuel:"Diesel", transmission:"Manual", kmDriven:51000, bodyType:"SUV", color:"Green", highlights:["Demo inventory","SUV"], images:["/cars/tata-nexon.webp"], featured:false },
  { ...common, id:"demo-xuv300", slug:"mahindra-xuv300-w8-2020", brand:"Mahindra", model:"XUV300", variant:"W8", year:2020, price:795000, fuel:"Diesel", transmission:"Manual", kmDriven:63000, bodyType:"SUV", color:"Red", highlights:["Demo inventory","SUV"], images:["/cars/mahindra-xuv300.webp"], featured:false },
];
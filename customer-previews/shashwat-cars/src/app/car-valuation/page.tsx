import type { Metadata } from "next";
import { CarValuationClient } from "@/components/CarValuationClient";

export const metadata: Metadata = {
  title: "Car Valuation Analyzer",
  description: "Get an approximate pre-owned car valuation range based on age, kilometres, ownership and vehicle condition."
};

export default function CarValuationPage(){ return <CarValuationClient/>; }

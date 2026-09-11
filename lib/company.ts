export const company = {
  name: "Shree Sanvariya Seth Traders",
  contactPerson: "Mr. K.G",
  established: "2026",
  businessType: "Supplier / Trader / Wholesaler",
  ownership: "Individual (Sole Proprietorship)",
  employees: "0–5",
  turnover: "Below ₹0.5 Crore (approx.)",
  gst: "23MVYPS6529RIZX",
  email: "shrisanvariyasethtraders9098@gmail.com",
  address: "Plot No. 60, Shop No. 04, Rajdhani Pariser, Kok Bypass Road, Gram Kokta, Bhopal, Madhya Pradesh – 462022, India",
  city: "Bhopal, Madhya Pradesh",
  hours: [
    ["Monday", "9:30 AM – 6:30 PM"],
    ["Tuesday", "9:30 AM – 6:30 PM"],
    ["Wednesday", "9:30 AM – 6:30 PM"],
    ["Thursday", "9:30 AM – 6:30 PM"],
    ["Friday", "9:30 AM – 6:30 PM"],
    ["Saturday", "9:30 AM – 6:30 PM"],
    ["Sunday", "Closed"],
  ] as const,
};

export const informationCategories = [
  ["Company Product Information", "General information about the company’s pharmaceutical trading activity."],
  ["Business Profile", "Overview of the company’s supplier and trader business model."],
  ["Quality & Coordination", "Corporate information about responsible sourcing and communication."],
  ["Legacy Catalogue", "The previous website contained medicine listings; detailed drug information is not reproduced here."],
  ["Company Compliance", "Website scope, responsible-use information and contact policies."],
  ["Corporate Contact", "General company correspondence and location information."],
] as const;

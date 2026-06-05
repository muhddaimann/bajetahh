export type Category = {
  id: string;
  label: string;
  icon: string;
  subCategories?: SubCategory[];
};

export type SubCategory = {
  id: string;
  label: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  formattedPrice: string;
  category: string;
  subCategory: string;
  icon: string;
  color: string;
  isPromo?: boolean;
  promoSubtitle?: string;
};

export const CATEGORIES: Category[] = [
  { id: "all", label: "All", icon: "food" },
  {
    id: "main",
    label: "Main Meal",
    icon: "bowl-mix",
    subCategories: [
      { id: "rice", label: "Rice Dishes" },
      { id: "noodles", label: "Noodles" },
    ],
  },
  {
    id: "side",
    label: "Side Dish",
    icon: "french-fries",
    subCategories: [
      { id: "fried", label: "Fried Items" },
      { id: "soup", label: "Soups" },
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    icon: "cup-water",
    subCategories: [
      { id: "hot", label: "Hot" },
      { id: "cold", label: "Cold" },
      { id: "juice", label: "Juice" },
    ],
  },
  {
    id: "sets",
    label: "Value Sets",
    icon: "ticket-percent",
    subCategories: [
      { id: "single", label: "Single" },
      { id: "family", label: "Family" },
    ],
  },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Nasi Bajet Ayam",
    description: "Crispy chicken with spicy sambal and fresh cucumber.",
    price: 5.0,
    formattedPrice: "RM 5.00",
    category: "main",
    subCategory: "rice",
    icon: "food-drumstick",
    color: "#FF6B6B",
    isPromo: true,
    promoSubtitle: "Crispy chicken with spicy sambal",
  },
  {
    id: "m2",
    name: "Nasi Bajet Ikan",
    description: "Fresh fried fish served with daily vegetables.",
    price: 4.5,
    formattedPrice: "RM 4.50",
    category: "main",
    subCategory: "rice",
    icon: "fish",
    color: "#4ECDC4",
    isPromo: true,
    promoSubtitle: "Fresh fried fish with daily veggies",
  },
  {
    id: "m3",
    name: "Mee Goreng Mamak",
    description: "Classic stir-fried noodles with tofu and sprouts.",
    price: 4.0,
    formattedPrice: "RM 4.00",
    category: "main",
    subCategory: "noodles",
    icon: "noodles",
    color: "#FFD93D",
  },
  {
    id: "m4",
    name: "Ayam Goreng",
    description: "Deep-fried turmeric chicken piece.",
    price: 3.5,
    formattedPrice: "RM 3.50",
    category: "side",
    subCategory: "fried",
    icon: "food-drumstick",
    color: "#FF9F43",
  },
  {
    id: "m5",
    name: "Teh O Ais",
    description: "Refreshing iced black tea.",
    price: 1.5,
    formattedPrice: "RM 1.50",
    category: "drinks",
    subCategory: "cold",
    icon: "cup-water",
    color: "#54a0ff",
  },
  {
    id: "m6",
    name: "Kopi Panas",
    description: "Hot local brewed coffee.",
    price: 2.0,
    formattedPrice: "RM 2.00",
    category: "drinks",
    subCategory: "hot",
    icon: "coffee",
    color: "#5f27cd",
  },
  {
    id: "s1",
    name: "Student Special",
    description: "Nasi Ayam + Teh O Ais special price for students.",
    price: 6.0,
    formattedPrice: "RM 6.00",
    category: "sets",
    subCategory: "single",
    icon: "ticket-percent",
    color: "#FFD93D",
    isPromo: true,
    promoSubtitle: "Limited time student special",
  },
];

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: string;
  note?: string;
}

export type Category =
  | "yemek"
  | "ulasim"
  | "alisveris"
  | "saglik"
  | "eglence"
  | "fatura"
  | "diger";

export interface CategoryMeta {
  label: string;
  icon: string;
  color: string;
  bg: string;
}

export const CATEGORIES: Record<Category, CategoryMeta> = {
  yemek: { label: "Yemek", icon: "🍔", color: "#f97316", bg: "#fff7ed" },
  ulasim: { label: "Ulaşım", icon: "🚌", color: "#3b82f6", bg: "#eff6ff" },
  alisveris: { label: "Alışveriş", icon: "🛍️", color: "#a855f7", bg: "#faf5ff" },
  saglik: { label: "Sağlık", icon: "💊", color: "#22c55e", bg: "#f0fdf4" },
  eglence: { label: "Eğlence", icon: "🎬", color: "#ec4899", bg: "#fdf2f8" },
  fatura: { label: "Fatura", icon: "📄", color: "#64748b", bg: "#f8fafc" },
  diger: { label: "Diğer", icon: "📌", color: "#eab308", bg: "#fefce8" },
};

import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Expense, Category } from "../interfaces";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseCard from "../components/ExpenseCard";
import SummaryCard from "../components/SummaryCard";
import FilterBar from "../components/FilterBar";

// LocalStorage helpers
const STORAGE_KEY = "expense-tracker-data";

const loadExpenses = (): Expense[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveExpenses = (expenses: Expense[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses);
  const [editing, setEditing] = useState<Expense | null>(null);
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");

  // EKLE
  const handleAdd = (data: Omit<Expense, "id">) => {
    const newExpense: Expense = { ...data, id: uuidv4() };
    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    saveExpenses(updated);
  };

  // GÜNCELLE
  const handleUpdate = (data: Expense) => {
    const updated = expenses.map((e) => (e.id === data.id ? data : e));
    setExpenses(updated);
    saveExpenses(updated);
    setEditing(null);
  };

  // SİL
  const handleDelete = (id: string) => {
    if (!window.confirm("Bu harcamayı silmek istiyor musunuz?")) return;
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
  };

  // FİLTRELE & ARA
  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      const matchCat = filterCategory === "all" || e.category === filterCategory;
      const matchSearch =
        search === "" ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        (e.note || "").toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [expenses, filterCategory, search]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">
              💸 Harcama Takibi
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Günlük harcamalarını kaydet ve takip et
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full font-medium">
            {new Date().toLocaleDateString("tr-TR", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Özet İstatistikler */}
        <SummaryCard expenses={expenses} />

        {/* Form */}
        <ExpenseForm
          onSubmit={(data) => {
            if ("id" in data) {
              handleUpdate(data as Expense);
            } else {
              handleAdd(data);
            }
          }}
          editing={editing}
          onCancel={() => setEditing(null)}
        />

        {/* Filtre */}
        <FilterBar
          filterCategory={filterCategory}
          setFilterCategory={setFilterCategory}
          search={search}
          setSearch={setSearch}
        />

        {/* Liste */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wide">
              Harcamalar
            </h3>
            <span className="text-xs text-slate-400">{filtered.length} kayıt</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <p className="text-4xl mb-3">🗒️</p>
              <p className="text-sm font-medium">Henüz harcama kaydı yok</p>
              <p className="text-xs mt-1">Yukarıdan yeni bir harcama ekleyin</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((expense) => (
                <ExpenseCard
                  key={expense.id}
                  expense={expense}
                  onEdit={setEditing}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

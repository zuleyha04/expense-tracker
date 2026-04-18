import React, { useState, useEffect } from "react";
import { Expense, Category, CATEGORIES } from "../interfaces";

interface Props {
  onSubmit: (expense: Omit<Expense, "id"> | Expense) => void;
  editing?: Expense | null;
  onCancel: () => void;
}

const today = () => new Date().toISOString().split("T")[0];

export default function ExpenseForm({ onSubmit, editing, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("yemek");
  const [date, setDate] = useState(today());
  const [note, setNote] = useState("");

  useEffect(() => {
    if (editing) {
      setTitle(editing.title);
      setAmount(String(editing.amount));
      setCategory(editing.category);
      setDate(editing.date);
      setNote(editing.note || "");
    }
  }, [editing]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const payload = {
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
      note: note.trim(),
    };

    onSubmit(editing ? { ...payload, id: editing.id } : payload);

    setTitle("");
    setAmount("");
    setCategory("yemek");
    setDate(today());
    setNote("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 space-y-4"
    >
      <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
        {editing ? "✏️ Harcamayı Düzenle" : "➕ Yeni Harcama Ekle"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Başlık */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
            Başlık
          </label>
          <input
            type="text"
            required
            placeholder="Harcama adı..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
          />
        </div>

        {/* Tutar */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
            Tutar (₺)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
            Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm bg-white"
          >
            {Object.entries(CATEGORIES).map(([key, meta]) => (
              <option key={key} value={key}>
                {meta.icon} {meta.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tarih */}
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
            Tarih
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
          />
        </div>
      </div>

      {/* Not */}
      <div>
        <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
          Not (opsiyonel)
        </label>
        <input
          type="text"
          placeholder="Kısa bir not ekleyin..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
        />
      </div>

      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition text-sm shadow-sm shadow-indigo-200"
        >
          {editing ? "Güncelle" : "Ekle"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold py-2.5 rounded-xl transition text-sm"
          >
            İptal
          </button>
        )}
      </div>
    </form>
  );
}

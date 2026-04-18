import { Expense, CATEGORIES } from "../interfaces";

interface Props {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseCard({ expense, onEdit, onDelete }: Props) {
  const meta = CATEGORIES[expense.category];
  const formattedDate = new Date(expense.date).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 p-4 flex items-center gap-4 group"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: meta.bg }}
      >
        {meta.icon}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-slate-800 truncate text-sm">{expense.title}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: meta.bg, color: meta.color }}
          >
            {meta.label}
          </span>
          <span className="text-xs text-slate-400">{formattedDate}</span>
        </div>
        {expense.note && (
          <p className="text-xs text-slate-400 mt-0.5 truncate">{expense.note}</p>
        )}
      </div>

      {/* Amount */}
      <div className="text-right shrink-0">
        <p className="font-bold text-slate-800 text-base">
          ₺{expense.amount.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onEdit(expense)}
          className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition text-xs"
          title="Düzenle"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(expense.id)}
          className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center transition text-xs"
          title="Sil"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}

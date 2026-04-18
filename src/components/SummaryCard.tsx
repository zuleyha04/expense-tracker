import { Expense, CATEGORIES, Category } from "../interfaces";

interface Props {
  expenses: Expense[];
}

export default function SummaryCard({ expenses }: Props) {
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  // Bu ayın toplam harcaması
  const now = new Date();
  const thisMonth = expenses.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const monthlyTotal = thisMonth.reduce((s, e) => s + e.amount, 0);

  // Kategoriye göre dağılım (en yüksek 3)
  const byCategory: Partial<Record<Category, number>> = {};
  expenses.forEach((e) => {
    byCategory[e.category] = (byCategory[e.category] || 0) + e.amount;
  });

  const topCategories = Object.entries(byCategory)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3) as [Category, number][];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Toplam */}
      <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg shadow-indigo-200">
        <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wide mb-1">
          Toplam Harcama
        </p>
        <p className="text-3xl font-black">
          ₺{total.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-indigo-200 text-xs mt-1">{expenses.length} kayıt</p>
      </div>

      {/* Bu ay */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-1">
          Bu Ay
        </p>
        <p className="text-3xl font-black text-slate-800">
          ₺{monthlyTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-slate-400 text-xs mt-1">{thisMonth.length} kayıt</p>
      </div>

      {/* En çok harcanan kategoriler */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">
          En Çok Harcanan
        </p>
        <div className="space-y-2">
          {topCategories.length === 0 && (
            <p className="text-slate-400 text-xs">Henüz veri yok</p>
          )}
          {topCategories.map(([cat, amt]) => {
            const meta = CATEGORIES[cat];
            const pct = total > 0 ? Math.round((amt / total) * 100) : 0;
            return (
              <div key={cat} className="flex items-center gap-2">
                <span className="text-sm">{meta.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between mb-0.5">
                    <span className="text-xs text-slate-600 font-medium">{meta.label}</span>
                    <span className="text-xs text-slate-400">{pct}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, background: meta.color }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Category, CATEGORIES } from "../interfaces";

interface Props {
  filterCategory: Category | "all";
  setFilterCategory: (c: Category | "all") => void;
  search: string;
  setSearch: (s: string) => void;
}

export default function FilterBar({
  filterCategory,
  setFilterCategory,
  search,
  setSearch,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 space-y-3">
      {/* Arama */}
      <input
        type="text"
        placeholder="🔍  Harcama ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
      />

      {/* Kategori Filtresi */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory("all")}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
            filterCategory === "all"
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          Tümü
        </button>
        {Object.entries(CATEGORIES).map(([key, meta]) => (
          <button
            key={key}
            onClick={() => setFilterCategory(key as Category)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition flex items-center gap-1 ${
              filterCategory === key
                ? "text-white shadow-sm"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
            style={
              filterCategory === key
                ? { background: meta.color }
                : {}
            }
          >
            <span>{meta.icon}</span>
            {meta.label}
          </button>
        ))}
      </div>
    </div>
  );
}

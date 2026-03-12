import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const toArray = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return data.content ?? data.data ?? data.sites ?? data.circuits ?? data.items ?? [];
};

const SpecifiqueRechercheBarre = ({
  searchFn,
  data = [],
  searchKeys = ["nom"],
  onResults,
  placeholder = "Rechercher...",
}) => {
  const [query, setQuery] = useState("");

  const onResultsRef = useRef(onResults);
  useEffect(() => { onResultsRef.current = onResults; }, [onResults]);

  useEffect(() => {
    if (!query.trim()) {
      onResultsRef.current?.(null);
      return;
    }

    if (searchFn) {
      // ── Mode distant : debounce 300 ms ──
      const delay = setTimeout(async () => {
        try {
          const res = await searchFn(query);
          onResultsRef.current?.(toArray(res.data));
        } catch {
          onResultsRef.current?.([]);
        }
      }, 300);
      return () => clearTimeout(delay);
    } else {
      // ── Mode local : filtrage immédiat ──
      const lower    = query.toLowerCase();
      const filtered = data.filter((item) =>
        searchKeys.some((key) =>
          String(item[key] ?? "").toLowerCase().includes(lower)
        )
      );
      onResultsRef.current?.(filtered);
    }
  
  }, [query]);

  return (
    <div className="relative w-lg">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        size={18}
      />
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={placeholder}
        className="text-black w-full pl-11 pr-5 py-3 rounded-xl border border-gray-300 outline-none focus:border-primary focus:shadow-sm focus:shadow-orange-500/40 transition"
      />
    </div>
  );
};

export default SpecifiqueRechercheBarre;
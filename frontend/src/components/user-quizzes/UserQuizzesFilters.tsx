"use client"

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const UserQuizzesFilters = ({ id }: { id: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryP = searchParams.get("search") || "";
  const orderP = searchParams.get("order") || "desc";
  const sortP = searchParams.get("sort") || "date";
  const typeP = searchParams.get("type") || "mcq_theory";

  const [query, setQuery] = useState(queryP);

  const applyFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // reset page to 1 when pushing new filter
    params.delete("page");
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/${id}/quiz?${params.toString()}`);
  };

  const onSearch = () => {
    applyFilters("search", query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between w-full bg-(--main-tertiary) p-4 rounded-xl border border-(--main-tertiary-light)">
      
      {/* Search Input */}
      <div className="flex-1 w-full max-w-sm relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-(--text-secondary) group-focus-within:text-(--main-primary-light) transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search my quizzes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-4 py-2.5 bg-(--main-tertiary) border border-(--main-tertiary-light) rounded-xl focus:outline-none focus:ring-2 focus:ring-(--main-primary-light)/50 focus:border-(--main-primary-light) text-sm text-(--text-primary-light) placeholder-(--text-secondary) transition-all"
        />
      </div>

      {/* Filters (Sort, Order, Type) */}
      <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
        <select
          value={sortP}
          onChange={(e) => applyFilters("sort", e.target.value)}
          className="bg-(--main-tertiary) text-(--text-primary-light) text-sm rounded-lg border border-(--main-tertiary-light) focus:ring-(--main-primary-light) focus:border-(--main-primary-light) block w-full sm:w-auto p-2.5 outline-none"
        >
          <option value="date">Date Created</option>
          <option value="attempts">Attempts</option>
          <option value="ratings">Ratings</option>
        </select>

        <select
          value={orderP}
          onChange={(e) => applyFilters("order", e.target.value)}
          className="bg-(--main-tertiary) text-(--text-primary-light) text-sm rounded-lg border border-(--main-tertiary-light) focus:ring-(--main-primary-light) focus:border-(--main-primary-light) block w-full sm:w-auto p-2.5 outline-none"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>

        <select
          value={typeP}
          onChange={(e) => applyFilters("type", e.target.value)}
          className="bg-(--main-tertiary) text-(--text-primary-light) text-sm rounded-lg border border-(--main-tertiary-light) focus:ring-(--main-primary-light) focus:border-(--main-primary-light) block w-full sm:w-auto p-2.5 outline-none"
        >
          <option value="mcq_theory">All Types</option>
          <option value="mcq">MCQ Only</option>
          <option value="theory">Theory Only</option>
        </select>
        
        <button 
          onClick={onSearch}
          className="bg-(--main-primary-light)/10 text-(--main-primary-light) hover:bg-(--main-primary-light)/20 transition-colors px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap hidden lg:block"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default UserQuizzesFilters;
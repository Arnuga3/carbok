import { useState, useEffect } from "react";
import { localeStorageService } from "../services/LocaleStorageService";

const KEY = "recentSearches";

export const useSearchHistory = () => {
  const [searched, setSearched] = useState<string[] | null>(null);

  useEffect(() => {
    async function getStoredSearches() {
      const searches = await localeStorageService.get(KEY);
      setSearched(searches);
    }
    getStoredSearches();
  }, []);

  useEffect(() => {
    if (searched) {
      localeStorageService.set(KEY, searched);
    }
  }, [searched]);

  async function refresh() {
    const searches = await localeStorageService.get(KEY);
    setSearched(searches);
  }

  return [searched, setSearched, refresh] as const;
};

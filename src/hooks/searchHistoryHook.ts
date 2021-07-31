import { refresh } from "ionicons/icons";
import { useState, useEffect } from "react";
import { localeStorageService } from "../services/LocaleStorageService";

const RECENT_SEARCHES_KEY = "recentSearches";

export const useSearchHistory = () => {
  const [searched, setSearched] = useState<string[] | null>(null);

  useEffect(() => {
    async function getStoredSearches() {
      const searches = await localeStorageService.get(RECENT_SEARCHES_KEY);
      setSearched(searches);
    }
    getStoredSearches();
  }, []);

  useEffect(() => {
    if (searched === null)
      localeStorageService.remove(RECENT_SEARCHES_KEY);
    else
      localeStorageService.set(
        RECENT_SEARCHES_KEY,
        searched,
      );
  }, [searched]);

  async function refresh() {
    const searches = await localeStorageService.get(RECENT_SEARCHES_KEY);
    setSearched(searches);
  }

  return [searched, setSearched, refresh] as const;
};

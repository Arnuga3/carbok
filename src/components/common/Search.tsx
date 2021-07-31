import { IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  value?: string | null;
  onSearch: (searchTerm: string) => void;
  onClear: () => void;
}

export const Search: React.FC<Props> = ({ value, onSearch, onClear }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (value) {
      handleSearch(value);
    }
  }, [value]);

  const handleSearch = (text: string) => {
    if (text.length === 0) {
      onClear();
    }
    if (text.length > 1) {
      onSearch(text);
    }
  };

  const onSearchInput = (e: any) => {
    const searchTerm = e.detail.value.toLowerCase().trim();
    handleSearch(searchTerm);
  };

  return (
    <SearchBar
      value={value}
      type="search"
      enterkeyhint="search"
      inputMode="search"
      debounce={500}
      mode="md"
      clearIcon={closeCircleOutline}
      onIonChange={(e) => onSearchInput(e)}
      placeholder={t("page.products.search.placeholder")}
    />
  );
};

const SearchBar = styled(IonSearchbar)`
  --border-radius: 25px;
  --padding: 0;
  --clear-button-color: var(--ion-color-medium);
  --icon-color: var(--ion-color-medium);
  --box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.1);
`;

import { IonSearchbar } from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  onSearchChange: (searchTerm: string) => void;
  onClear: () => void;
}

export const Search: React.FC<Props> = ({ onSearchChange, onClear }) => {
  const { t } = useTranslation();

  const handleSearch = (e: any) => {
    const searchTerm = e.detail.value.toLowerCase().trim();
    if (searchTerm.length === 0) {
      onClear();
    }
    if (searchTerm.length > 1) {
      onSearchChange(searchTerm);
    }
  };

  return (
    <SearchBar
      debounce={500}
      mode="md"
      clearIcon={closeCircleOutline}
      onIonChange={(e) => handleSearch(e)}
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

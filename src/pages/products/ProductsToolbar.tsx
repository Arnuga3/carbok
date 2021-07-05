import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonIcon,
  IonButton,
  IonButtons,
  IonChip,
  IonLabel,
} from "@ionic/react";
import { search } from "ionicons/icons";
import { useProducts } from "../../hooks/productsHook";
import { filterProducts } from "./util";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { ProductsFilter } from "../../classes/appSettings/ProductsFilterType";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";
import { Toolbar } from "../../components/styled/Toolbar";
import { Product } from "../../classes/product/Product";

interface Props {
  onFilert: (productsFiletered: Product[]) => void;
  onSearch: () => void;
}

export const ProductsToolbar: React.FC<Props> = ({ onFilert, onSearch }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useProducts();
  const { settings } = useAppSettings();

  const handleFilter = (filter: ProductsFilter) => {
    onFilert(filterProducts(products ?? [], filter));
    dispatch(
      changeAppSettings({
        ...settings,
        productsFilter: filter,
      })
    );
  };

  return (
    <>
      <Toolbar>
        <FilterBadges>
          <Chip
            onClick={() => handleFilter("all")}
            color={
              settings.productsFilter === "all"
                ? "var(--ion-color-primary)"
                : "var(--ion-color-light-darker)"
            }
          >
            <Label>{t("page.products.filter.products.all")}</Label>
          </Chip>
          <Chip
            onClick={() => handleFilter("default")}
            color={
              settings.productsFilter === "default"
                ? "var(--ion-color-primary)"
                : "var(--ion-color-light-darker)"
            }
          >
            <Label>{t("page.products.filter.products.default")}</Label>
          </Chip>
          <Chip
            onClick={() => handleFilter("my")}
            color={
              settings.productsFilter === "my"
                ? "var(--ion-color-primary)"
                : "var(--ion-color-light-darker)"
            }
          >
            <Label>{t("page.products.filter.products.my")}</Label>
          </Chip>
          <IonButtons>
            <IonButton fill="clear" onClick={onSearch}>
              <IonIcon slot="icon-only" icon={search} />
            </IonButton>
          </IonButtons>
        </FilterBadges>
      </Toolbar>
    </>
  );
};

const Chip = styled(IonChip)`
  min-width: 50px;
  height: 40px;
  border-radius: 32px;
  padding-left: 8px;
  background: ${({ color }) => color};
  color: var(--ion-color-dark);
`;

const Label = styled(IonLabel)`
  font-size: 0.9em;
  text-align: center;
  width: 100%;
`;

const FilterBadges = styled.div`
  display: flex;
  justify-content: space-around;
`;

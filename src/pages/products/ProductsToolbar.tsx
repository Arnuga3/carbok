import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IonIcon, IonButton, IonButtons } from "@ionic/react";
import { search } from "ionicons/icons";
import { useProducts } from "../../hooks/productsHook";
import { filterProducts } from "./util";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { ProductsFilter } from "../../classes/appSettings/ProductsFilterType";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";
import { Chip } from "../../components/styled/Chip";
import { Toolbar } from "../../components/styled/Toolbar";
import { ChipLabel } from "../../components/styled/ChipLabel";
import { Product } from "../../classes/product/Product";

interface Props {
  pageTop: boolean;
  onFilert: (productsFiletered: Product[]) => void;
}

export const ProductsToolbar: React.FC<Props> = ({ pageTop, onFilert }) => {
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
    <Toolbar top={pageTop}>
      <FilterBadges>
        <Chip onClick={() => handleFilter("all")}>
          <ChipLabel active={settings.productsFilter === "all"}>
            {t("page.products.filter.products.all")}
          </ChipLabel>
        </Chip>
        <Chip onClick={() => handleFilter("default")}>
          <ChipLabel active={settings.productsFilter === "default"}>
            {t("page.products.filter.products.default")}
          </ChipLabel>
        </Chip>
        <Chip onClick={() => handleFilter("my")}>
          <ChipLabel active={settings.productsFilter === "my"}>
            {t("page.products.filter.products.my")}
          </ChipLabel>
        </Chip>
        <IonButtons>
          <IonButton fill="clear">
            <IonIcon slot="icon-only" icon={search} />
          </IonButton>
        </IonButtons>
      </FilterBadges>
    </Toolbar>
  );
};

const FilterBadges = styled.div`
  display: flex;
  justify-content: space-around;
`;

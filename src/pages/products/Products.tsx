import React, { useEffect, useMemo, useState } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  IonContent,
  IonPage,
  IonButton,
  IonItem,
  IonIcon,
  IonItemOptions,
  IonItemSliding,
  IonItemOption,
  IonAlert,
  IonAvatar,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import {
  addOutline,
  calculator,
  copyOutline,
  createOutline,
  ellipsisVerticalOutline,
  eyeOutline,
  filter,
  trashOutline,
} from "ionicons/icons";
import { CalculatorModal } from "../../components/common/CalculatorModal";
import { ProductsSearch } from "../../components/common/ProductsSearch";
import { ProductListItem } from "../../components/common/ProductListItem";
import { useProducts } from "../../hooks/productsHook";
import {
  addProduct,
  deleteProduct,
  retrieveProducts,
} from "../../redux/actions/products/actions";
import { CircleBadge } from "../../components/common/CircleBadge";
import { categoryColours } from "../../resources/config";
import { getCatKey } from "../../resources/productCategories";
import { CircleBadgeMultiColor } from "../../components/common/CircleBadgeMultiColor";
import { filterProducts, getCategoriesColours, toggleActionsSlide } from "./util";
import { Product } from "../../classes/product/Product";
import { FilterAlert } from "./FilterAlert";
import { Header } from "../../components/styled/Header";
import { ProductModal } from "../../components/common/ProductModal";
import { useAppSettings } from "../../hooks/appSettingsHook";
import { ProductsFilter } from "../../classes/appSettings/ProductsFilterType";
import { changeAppSettings } from "../../redux/actions/appSettingsActions";

const PRODUCTSPAGE = "products-page";

const Products: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, searchString } = useProducts();
  const { settings } = useAppSettings();

  const [state, setState] = useState<{
    openDeleteAlert: boolean;
    openProductModal: boolean;
    openCalculatorModal: boolean;
    productSelected: Product | null;
    productsFiltered: Product[];
    openFilterAlert: boolean;
  }>({
    openDeleteAlert: false,
    openProductModal: false,
    openCalculatorModal: false,
    productSelected: null,
    productsFiltered: [],
    openFilterAlert: false,
  });

  const {
    openDeleteAlert,
    openProductModal,
    openCalculatorModal,
    productSelected,
    productsFiltered,
  } = state;

  useEffect(() => {
    if (searchString) {
      dispatch(retrieveProducts(searchString));
    }
  }, [searchString]);

  useEffect(() => {
    if (!products) {
      dispatch(retrieveProducts());
    }
    if (products) {
      setState({
        ...state,
        productsFiltered: filterProducts(products, settings.productsFilter),
      });
    }
  }, [products]);

  const handleCopy = (product: Product) => {
    if (product) {
      const { name, categories, units, carbsData, portionType } = product;
      const productCopied = new Product(
        name,
        categories,
        units,
        carbsData,
        portionType,
        false
      );
      dispatch(addProduct(productCopied));
    }
  };

  const handleOnView = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openProductModal: true,
    });
  };

  const handleOnCalculate = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openCalculatorModal: true,
    });
  };

  const handleOnDelete = (product: Product) => {
    setState({
      ...state,
      productSelected: product,
      openDeleteAlert: true,
    });
  };

  const handleDelete = () => {
    if (productSelected) {
      dispatch(deleteProduct(productSelected.id));
      setState({
        ...state,
        productSelected: null,
      });
    }
  };

  const handleOnClose = () => {
    setState({
      ...state,
      productSelected: null,
      openCalculatorModal: false,
      openProductModal: false,
    });
  };

  const handleFilter = (filter: ProductsFilter) => {
    setState({
      ...state,
      openFilterAlert: false,
      productsFiltered: filterProducts(products ?? [], filter),
    });
    dispatch(
      changeAppSettings({
        ...settings,
        productsFilter: filter,
      })
    );
  };

  const ItemRow = ({ index, style }: { index: number; style: any }) => {
    const product = productsFiltered[index];
    return (
      <div style={style}>
        {productsFiltered && (
          <IonItemSliding
            key={index}
            id={PRODUCTSPAGE + index}
            onClick={() => toggleActionsSlide(PRODUCTSPAGE + index)}
          >
            <Item lines="none">
              <IonAvatar slot="start">
                {product.categories.length === 1 && (
                  <CircleBadge
                    color={categoryColours[product.categories[0]]}
                    size={40}
                    standard={product.standard}
                  >
                    {t(getCatKey(product.categories[0])).slice(0, 3)}
                  </CircleBadge>
                )}
                {product.categories.length > 1 && (
                  <CircleBadgeMultiColor
                    colors={getCategoriesColours(product.categories)}
                    size={40}
                  >
                    {t(getCatKey("mix"))}
                  </CircleBadgeMultiColor>
                )}
              </IonAvatar>
              <ProductListItem product={product} />
              <IonIcon
                size="small"
                color="medium"
                style={{ marginLeft: 8 }}
                icon={ellipsisVerticalOutline}
                slot="end"
              />
            </Item>
            <IonItemOptions>
              {!product.standard && (
                <SlidingAction
                  color="danger"
                  onClick={() => handleOnDelete(product)}
                >
                  <IonIcon icon={trashOutline} slot="icon-only" />
                </SlidingAction>
              )}
              {!product.standard && (
                <SlidingAction
                  color="secondary"
                  routerLink={`/products/edit-product/${product.id}`}
                >
                  <IonIcon icon={createOutline} slot="icon-only" />
                </SlidingAction>
              )}
              {product.standard && (
                <SlidingAction
                  color="secondary"
                  onClick={() => handleCopy(product)}
                >
                  <IonIcon icon={copyOutline} slot="icon-only" />
                </SlidingAction>
              )}
              <SlidingAction
                color="primary"
                onClick={() => handleOnView(product)}
              >
                <IonIcon icon={eyeOutline} slot="icon-only" />
              </SlidingAction>
              <SlidingAction
                color="tertiary"
                onClick={() => handleOnCalculate(product)}
              >
                <IonIcon icon={calculator} slot="icon-only" />
              </SlidingAction>
            </IonItemOptions>
          </IonItemSliding>
        )}
      </div>
    );
  };

  const ItemsList = useMemo(() => {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <ProductsList
            height={height}
            width={width}
            itemCount={productsFiltered ? productsFiltered.length : 0}
            overscanCount={5}
            itemSize={() => 75}
          >
            {ItemRow}
          </ProductsList>
        )}
      </AutoSizer>
    );
  }, [productsFiltered]);

  return (
    <IonPage>
      <IonContent>
        <Header>
          <ProductsSearch />
          <IonButton
            color="primary"
            fill="clear"
            onClick={() => setState({ ...state, openFilterAlert: true })}
          >
            <IonIcon slot="icon-only" icon={filter} />
          </IonButton>
        </Header>
        {products && ItemsList}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton routerLink="/products/add-product" color="primary">
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonAlert
        isOpen={openDeleteAlert}
        onDidDismiss={() => setState({ ...state, openDeleteAlert: false })}
        header={t("page.products.edit.product.delete.alert.title")}
        subHeader={t("page.products.edit.product.delete.alert.subtitle")}
        buttons={[
          { text: t("button.cancel"), role: "cancel" },
          {
            text: t("button.delete"),
            role: "destructive",
            handler: handleDelete,
          },
        ]}
      />
      <ProductModal
        product={productSelected}
        open={openProductModal}
        onClose={handleOnClose}
      />
      <CalculatorModal
        product={productSelected}
        open={openCalculatorModal}
        onClose={handleOnClose}
      />
      <FilterAlert
        open={state.openFilterAlert}
        onClose={() => setState({ ...state, openFilterAlert: false })}
        filter={settings.productsFilter}
        onFilter={(filter: ProductsFilter) => handleFilter(filter)}
      />
    </IonPage>
  );
};

export default React.memo(Products);

const ProductsList = styled(List)`
  padding-bottom: 70px;
`;

const Item = styled(IonItem)`
  --min-height: 75px;
`;

const SlidingAction = styled(IonItemOption)`
  width: 75px;
`;

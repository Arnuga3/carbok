import React, { useRef } from "react";
import { VariableSizeList as ReactWindowList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import { Product } from "../../../../classes/product/Product";
import { ProductsListItemLabel } from "../ProductsListItemLabel";
import { checkmarkCircle, ellipseOutline } from "ionicons/icons";
import { IonIcon, IonItem } from "@ionic/react";
import _ from "lodash";
import { changeBorderStyle } from "../../../../utils/eventHelpers";

interface Props {
  products: Product[];
  productsSelected: Product[];
  onSelectionChange: (products: Product[]) => void;
}

export const ProductsList: React.FC<Props> = ({
  products,
  productsSelected,
  onSelectionChange,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const changeBorderStyleThrottled = useRef(
    _.throttle((e) => changeBorderStyle(e, listRef.current), 500)
  );

  const toggleSelect = (product: Product) => {
    const isSelected = productsSelected.find((prd) => prd.id === product.id);
    let selectedProductsUpdated;
    if (isSelected) {
      selectedProductsUpdated = productsSelected.filter(
        (prd: Product) => prd.id !== product.id
      );
    } else {
      selectedProductsUpdated = [...productsSelected, product];
    }
    onSelectionChange(selectedProductsUpdated);
  };

  const ListItem = ({ index, style }: { index: number; style: any }) => {
    return (
      <div style={style}>
        {products && products[index] && (
          <Item
            lines="none"
            key={index}
            onClick={() => toggleSelect(products[index])}
          >
            <IonIcon
              size="large"
              slot="start"
              color="tortoise"
              icon={
                productsSelected.find((prd) => prd.id === products[index].id)
                  ? checkmarkCircle
                  : ellipseOutline
              }
            />
            <ProductsListItemLabel product={products[index]} selectableType />
          </Item>
        )}
      </div>
    );
  };

  return (
    <>
      <ListTopLine ref={listRef} />
      <AutoSizer>
        {({ height, width }) => (
          <List
            onScroll={(e) => changeBorderStyleThrottled.current(e)}
            height={height}
            width={width}
            itemCount={products ? products.length : 0}
            overscanCount={5}
            itemSize={() => 75}
          >
            {ListItem}
          </List>
        )}
      </AutoSizer>
    </>
  );
};

const ListTopLine = styled.div`
  width: 100%;
`;

const List = styled(ReactWindowList)`
  padding-bottom: 70px;
`;

const Item = styled(IonItem)`
  --min-height: 75px;
`;

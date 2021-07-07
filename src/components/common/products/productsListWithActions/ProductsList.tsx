import React, { memo, useRef } from "react";
import { VariableSizeList as ReactWindowList, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import { Product } from "../../../../classes/product/Product";
import { ProductsListItem } from "./productsListItem/ProductsListItem";
import _ from "lodash";
import { changeBorderStyle } from "../../../../utils/eventHelpers";

interface Props {
  identifier: string;
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ identifier, products }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const changeBorderStyleThrottled = useRef(
    _.throttle((e) => changeBorderStyle(e, listRef.current), 500)
  );

  const ListItem = memo(({ data, index, style }: any) => {
    const product = data[index];
    return (
      <div style={style}>
        <ProductsListItem
          identifier={identifier}
          index={index}
          product={product}
        />
      </div>
    );
  }, areEqual);
  
  return (
    products && (
      <>
        <ListTopLine ref={listRef} />
        <AutoSizer>
          {({ height, width }) => (
            <List
              onScroll={(e) => changeBorderStyleThrottled.current(e)}
              height={height}
              width={width}
              itemData={products}
              itemCount={products.length}
              overscanCount={20}
              itemSize={() => 75}
              estimatedItemSize={75}
            >
              {ListItem}
            </List>
          )}
        </AutoSizer>
      </>
    )
  );
};

const ListTopLine = styled.div`
  width: 100%;
`;

const List = styled(ReactWindowList)`
  padding-bottom: 70px;
`;

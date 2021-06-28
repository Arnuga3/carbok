import React, { useRef } from "react";
import { VariableSizeList as ReactWindowList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import { Product } from "../../../../classes/product/Product";
import { ProductsListItem } from "./ProductsListItem";
import _ from "lodash";

interface Props {
  identifier: string;
  products: Product[];
}

export const ProductsList: React.FC<Props> = ({ identifier, products }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const checkScroll = (e: any) => {
    if (listRef.current) {
      if (!!(e.scrollOffset === 0)) {
        listRef.current.style.borderTop = "1px solid transparent";
      } else {
        listRef.current.style.borderTop = "1px solid rgba(0,0,0,0.1)";
      }
    }
  };

  const checkScrollThrottled = useRef(_.throttle(checkScroll, 500));

  const ListItem = ({ index, style }: { index: number; style: any }) => {
    const product = products[index];
    return (
      <div style={style}>
        {products && (
          <ProductsListItem
            identifier={identifier}
            index={index}
            product={product}
          />
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
            onScroll={(e) => checkScrollThrottled.current(e)}
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

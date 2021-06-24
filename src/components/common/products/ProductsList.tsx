import React, { useRef } from "react";
import { VariableSizeList as ReactWindowList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import styled from "styled-components";
import { Product } from "../../../classes/product/Product";
import { ProductListItem } from "./ProductListItem";

interface Props {
  identifier: string;
  productsFiltered: Product[];
  onView: (product: Product) => void;
  onCalculate: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductsList: React.FC<Props> = ({
  identifier,
  productsFiltered,
  onView,
  onCalculate,
  onDelete,
}) => {
  const listRef = useRef<HTMLDivElement>(null);

  const ListItem = ({ index, style }: { index: number; style: any }) => {
    const product = productsFiltered[index];
    return (
      <div style={style}>
        {productsFiltered && (
          <ProductListItem
            identifier={identifier}
            index={index}
            product={product}
            onView={(product) => onView(product)}
            onCalculate={() => onCalculate(product)}
            onDelete={() => onDelete(product)}
          />
        )}
      </div>
    );
  };

  return (
    <ListWrapper ref={listRef}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            onScroll={(e) => {
              if (listRef.current) {
                if (!!(e.scrollOffset === 0)) {
                  listRef.current.style.borderTop = "1px solid transparent";
                } else {
                  listRef.current.style.borderTop = "1px solid rgba(0,0,0,0.1)";
                }
              }
            }}
            height={height}
            width={width}
            itemCount={productsFiltered ? productsFiltered.length : 0}
            overscanCount={5}
            itemSize={() => 75}
          >
            {ListItem}
          </List>
        )}
      </AutoSizer>
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const List = styled(ReactWindowList)`
  padding-bottom: 70px;
`;

import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';

interface Props {
  products: any[];
}

export const MealProducts: React.FC<Props> = ({ products = [] }) => {
  return (
    <IonList>
      {products.map((product, i) =>
        <IonItem key={i}>
          <IonLabel>{product.name ?? 'Product Placeholder'}</IonLabel>
        </IonItem>
      )}
      {!products.length && <p>No Products</p>}
    </IonList>
  );
};

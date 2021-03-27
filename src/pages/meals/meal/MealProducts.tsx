import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { IProduct } from '../../../interfaces/IProduct';

interface Props {
  products: IProduct[];
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

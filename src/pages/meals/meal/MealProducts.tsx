import React from 'react';
import { IonItem, IonLabel, IonList } from '@ionic/react';
import { IProduct } from '../../../classes/product/IProduct';

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
    </IonList>
  );
};

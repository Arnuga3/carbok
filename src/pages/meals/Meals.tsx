import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonIcon, IonList, IonButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import styled from 'styled-components';

import { CardSkeleton } from '../../components/common/CardSkeleton';
import { MealTypeActionSheet } from './MealTypeActionSheet';
import { MealType } from '../../enums/MealType';

import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../redux/reducers';
import { addMeal } from '../../redux/actions/mealsActions';
import { MealCard } from './MealCard';
import { Meal } from '../../interfaces/Meal';

const Meals: React.FC = () => {
  const dispatch = useDispatch(); 
  const meals: Meal[] = useSelector(({ mealsState }: AppState) => mealsState.meals);
  const [openActionSheet, setOpenActionSheet] = useState(false);

  const handleMealTypeSelect = (type: MealType) => {
    dispatch(
      addMeal({
        type,
        dateTime: new Date(Date.now()),
        products: []
      })
    );
  }

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot='fixed'>
          <IonToolbar>
            <IonTitle>Meals</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {meals.map((meal, i) => <MealCard key={i} meal={meal}/>)}
          <IonCard>
            <IonButton expand='block' fill='clear' size='large' onClick={() => setOpenActionSheet(true)}>
              <IonIcon icon={add}/>
            </IonButton>
          </IonCard>
        </IonList>
      </IonContentStyled>
      <MealTypeActionSheet
        open={openActionSheet}
        onSelect={handleMealTypeSelect}
        onClose={() => setOpenActionSheet(false)}
      />
    </IonPage>
  );
};

export default Meals;


const IonContentStyled = styled(IonContent)`
  --padding-top: 50px;
`;
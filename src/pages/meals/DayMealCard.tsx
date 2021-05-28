import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonDatetime,
  IonIcon,
  IonItem,
  IonReorder,
  IonText,
} from "@ionic/react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";
import { MealProductsChart } from "../../components/common/MealProductsChart";
import {
  addOutline,
  chatbubbleOutline,
  copyOutline,
  listOutline,
  pieChartOutline,
} from "ionicons/icons";
import { MealCarbsChart } from "../../components/common/MealCarbsChart";
import CalculationService from "../../services/CalculationService";
import moment from "moment";
import { useMeals } from "../../hooks/mealsHook";
import { copyMeal } from "../../redux/actions/meals/actions";
import { DayMealCardProduct } from "./DayMealCardProduct";
import { getMealKey } from "../../resources/mealTypes";

interface Props {
  meal: IMeal;
}

type Display = "details" | "stats";

export const DayMealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const calculation = new CalculationService();
  const [display, setDisplay] = useState<Display>("details");
  const { date } = useMeals();

  const copyDatetime = useRef<HTMLIonDatetimeElement | null>(null);

  const toggleDisplay = () => {
    setDisplay(display === "details" ? "stats" : "details");
  };

  const copyMealToDate = (date: Date) => {
    dispatch(copyMeal(date, meal));
  };

  return (
    <IonCard>
      <ReorderHandle>
        <IonReorder />
      </ReorderHandle>
      <IonCardContent>
        <IonItem routerLink={`/meals/${meal.id}/products`} lines="none" mode="md">
          <ItemContent>
            <CardHeader>
              <CardHeaderTitle>
                <IonText color="primary">
                  <h1>{t(getMealKey(meal.type))}</h1>
                </IonText>
                <IonText color="medium">
                  <small>{`${t("products")}: ${meal.products.length}`}</small>
                </IonText>
              </CardHeaderTitle>
              <CardHeaderCarbs>
                <IonText color="secondary">
                  <h1>{calculation.getMealTotalCarbs(meal.products)}</h1>
                </IonText>
                <IonText color="medium">
                  <small>{t("carbohydrates")}</small>
                </IonText>
              </CardHeaderCarbs>
            </CardHeader>
            {display === "details" ? (
              <DayMealCardProductList>
                {meal.products.map((product, i) => (
                  <DayMealCardProduct
                    key={i}
                    product={product}
                    meal={meal}
                    t={t}
                    i={i}
                  />
                ))}
                {meal.note && (
                  <Note>
                    <NoteIcon icon={chatbubbleOutline} />
                    <small>{meal.note}</small>
                  </Note>
                )}
              </DayMealCardProductList>
            ) : (
              <CardContent>
                <MealCarbsChart meal={meal} />
                <MealProductsChart meal={meal} />
              </CardContent>
            )}
          </ItemContent>
        </IonItem>
        <CardActions>
          <ActionButton
            color="primary"
            fill="clear"
            shape="round"
            size="small"
            onClick={() => copyDatetime.current?.open()}
            disabled={meal.products.length === 0}
          >
            <IonIcon icon={copyOutline} slot="icon-only" />
          </ActionButton>
          <ActionButton
            color="primary"
            fill="clear"
            shape="round"
            size="small"
            onClick={toggleDisplay}
            disabled={meal.products.length === 0}
          >
            <IonIcon
              icon={display === "details" ? pieChartOutline : listOutline}
              slot="icon-only"
            />
          </ActionButton>
          <ActionButton
            color="primary"
            fill="clear"
            shape="round"
            size="small"
            routerLink={`/meals/${meal.id}/products`}
          >
            <IonIcon
              icon={addOutline}
              slot="icon-only"
            />
          </ActionButton>
        </CardActions>
      </IonCardContent>
      <Datetime
        ref={copyDatetime}
        doneText={t("button.done")}
        cancelText={t("button.cancel")}
        monthShortNames={moment.monthsShort()}
        value={moment(date).toISOString()}
        onIonChange={(e: any) => copyMealToDate(e.detail.value)}
      />
    </IonCard>
  );
};

const ReorderHandle = styled.div`
  display: flex;
  justify-content: center;
  padding: 4px;
  background-color: var(--ion-color-primary);
  color: white;
`;

const DayMealCardProductList = styled.div`
  margin-top: 8px;
`;

const ItemContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardHeaderTitle = styled.div`
  flex: 5;
`;

const CardHeaderCarbs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const ActionButton = styled(IonButton)`
  margin-top: 12px;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Note = styled.div`
  display: flex;
  align-items: center;
`;

const NoteIcon = styled(IonIcon)`
  padding: 8px 4px 8px 0;
`;

const Datetime = styled(IonDatetime)`
  display: none;
`;

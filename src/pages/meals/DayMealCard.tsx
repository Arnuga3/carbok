import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonDatetime,
  IonIcon,
  IonReorder,
  IonText,
} from "@ionic/react";
import styled from "styled-components";

import { IMeal } from "../../classes/meal/IMeal";
import { useTranslation } from "react-i18next";
import { MealProductsChart } from "../../components/common/MealProductsChart";
import {
  chatbubbleOutline,
  copyOutline,
  createOutline,
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
      <CardHeader>
        <CardHeaderTitle>
          <CardTitle>{t(getMealKey(meal.type))}</CardTitle>
          <small>{`${t("products")}: ${meal.products.length}`}</small>
        </CardHeaderTitle>
        <CardHeaderCarbs>
          <TotalCarbs color="secondary">
            {calculation.getMealTotalCarbs(meal.products)}
          </TotalCarbs>
          <small>{t("carbohydrates")}</small>
        </CardHeaderCarbs>
      </CardHeader>
      <CardBody>
        {display === "details" ? (
          <>
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
          </>
        ) : (
          <CardContent>
            <MealCarbsChart meal={meal} />
            <MealProductsChart meal={meal} />
          </CardContent>
        )}
        <Divider />
        <CardActions>
          <IonReorder />
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
            <IonIcon icon={createOutline} slot="icon-only" />
          </ActionButton>
        </CardActions>
      </CardBody>
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

const CardHeader = styled(IonCardHeader)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const CardHeaderTitle = styled.div`
  flex: 5;
`;

const CardTitle = styled.div`
  color: var(--ion-color-primary);
  font-size: 1.6em;
  font-weight: bold;
`;

const CardHeaderCarbs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TotalCarbs = styled(IonText)`
  font-size: 2em;
  font-weight: bold;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
`;

const ActionButton = styled(IonButton)`
  padding-left: 4px;
`;

const CardBody = styled(IonCardContent)`
  margin-top: 8px;
`;

const Divider = styled.div`
  margin: 8px 0 4px 0;
  border-top: 1px solid var(--ion-color-medium);
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

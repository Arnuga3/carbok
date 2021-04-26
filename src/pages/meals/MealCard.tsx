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
  statsChartOutline,
} from "ionicons/icons";
import { MealCarbsChart } from "../../components/common/MealCarbsChart";
import CalculationService from "../../services/CalculationService";
import moment from "moment";
import { useMeals } from "../../hooks/mealsHook";
import { copyMeal } from "../../redux/actions/mealsActions";

interface Props {
  meal: IMeal;
}

type Display = "details" | "stats";

export const MealCard: React.FC<Props> = ({ meal }) => {
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
          <CardTitleWrapper>
            <Reorder />
            <div>
              <IonCardTitle color="primary">
                {t(meal.type.nameKey)}
              </IonCardTitle>
              <small>{`${t("products")}: ${meal.products.length}`}</small>
            </div>
          </CardTitleWrapper>
          <CardActions>
            <ActionButton
              fill="clear"
              shape="round"
              size="small"
              onClick={toggleDisplay}
            >
              <IonIcon
                icon={display === "details" ? statsChartOutline : listOutline}
                slot="icon-only"
              />
            </ActionButton>
            <ActionButton
              fill="clear"
              shape="round"
              size="small"
              onClick={() => copyDatetime.current?.open()}
            >
              <IonIcon icon={copyOutline} slot="icon-only" />
            </ActionButton>
            <ActionButton
              fill="clear"
              shape="round"
              size="small"
              routerLink={`/meals/${meal.id}/products`}
            >
              <IonIcon icon={createOutline} slot="icon-only" />
            </ActionButton>
          </CardActions>
        </CardHeaderTitle>
      </CardHeader>
      <CardBody>
        {display === "details" ? (
          <>
            {meal.products.map((product, i) => (
              <ProductItem key={i} color={product.category.color}>{`
                ${product.name}
                ${product.carbsData.portion}${t(product.units.shortNameKey)}
                (${product.carbsData.carbs} ${t("carbohydrates.short")})${
                i !== meal.products.length - 1 ? "," : ""
              }
              `}</ProductItem>
            ))}
            <Divider />
            <i>{`${calculation.getMealTotalCarbs(meal.products)} ${t(
              "carbohydrates"
            )}`}</i>
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

const CardTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Reorder = styled(IonReorder)`
  margin-right: 16px;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
`;

const ActionButton = styled(IonButton)`
  padding-left: 4px;
`;

const CardBody = styled(IonCardContent)`
  margin-top: 8px;
`;

const ProductItem = styled.i`
  color: ${({color}) => color};
`;

const Divider = styled.div`
  margin: 4px 0;
  border-top: 1px solid var(--ion-color-primary);
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

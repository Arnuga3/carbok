import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import styled from "styled-components";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import { IPieCategory } from "../../classes/productCategory/IPieCategory";
import { MealCarbsLinearChart } from "../../components/charts/MealCarbsLinearChart";
import { CategoriesPieChart } from "../../components/charts/CategoriesPieChart";
import { DateRangeSwitch } from "./DateRangeSwitch";
import { Meal } from "../../classes/meal/Meal";
import { CalculatorModal } from "../../components/common/CalculatorModal";
import _ from "lodash";

export type Range = "7_days" | "30_days" | "90_days";

export interface CardData {
  range: Range;
  from: Date | null;
  to: Date | null;
  meals: Meal[] | [];
  categories: IPieCategory[] | [];
}

const defaultCardDataState: CardData = {
  range: "7_days",
  from: null,
  to: null,
  meals: [],
  categories: [],
};

const Overview: React.FC = () => {
  const { t } = useTranslation();
  const [cardData, setCardData] = useState<CardData>(defaultCardDataState);
  const [openCalculatorModal, setOpenCalculatorModal] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const checkScroll = (e: any) => {
    if (listRef.current) {
      if (e.detail.scrollTop === 0) {
        listRef.current.style.borderTop = "1px solid transparent";
      } else {
        listRef.current.style.borderTop = "1px solid rgba(0,0,0,0.1)";
      }
    }
  };

  const checkScrollThrottled = useRef(_.throttle(checkScroll, 500));

  const handleDateRangeChange = (data: CardData) => {
    setCardData(data);
  };

  return (
    <IonPage>
      <DateRangeSwitch
        data={cardData}
        onDateRangeChange={handleDateRangeChange}
      />
      <ListWrapper ref={listRef}>
        <IonContent
          scrollEvents
          onIonScroll={(e) => checkScrollThrottled.current(e)}
        >
          {cardData.meals.length > 0 && (
            <>
              <CarbsCard>
                <CardHeader>
                  <IonCardTitle color="light">
                    {t("carbohydrates")}
                  </IonCardTitle>
                  {cardData.from && cardData.to && (
                    <CardSubtitle color="light">{`${moment(
                      cardData.from
                    ).format("D MMM")} - ${moment(cardData.to).format(
                      "D MMM"
                    )}`}</CardSubtitle>
                  )}
                </CardHeader>
                <IonCardContent>
                  <MealCarbsLinearChart meals={cardData.meals} />
                </IonCardContent>
              </CarbsCard>
              <ProductsCard>
                <CardHeader>
                  <IonCardTitle color="light">
                    {t("page.overview.foods.range.card.title")}
                  </IonCardTitle>
                  {cardData.from && cardData.to && (
                    <IonCardSubtitle color="light">{`${moment(
                      cardData.from
                    ).format("D MMM")} - ${moment(cardData.to).format(
                      "D MMM"
                    )}`}</IonCardSubtitle>
                  )}
                </CardHeader>
                <IonCardContent>
                  <CategoriesPieChart categories={cardData.categories} />
                </IonCardContent>
              </ProductsCard>
            </>
          )}
          <Card>
            <CardHeader>
              <IonCardTitle color="light">
                {t("page.overview.calculator.card.title")}
              </IonCardTitle>
            </CardHeader>
            <CalculatorCardContent>
              <CalculateButton
                onClick={() => setOpenCalculatorModal(true)}
                color="secondary"
              >
                {t("button.calculate")}
              </CalculateButton>
            </CalculatorCardContent>
          </Card>
          <CalculatorModal
            open={openCalculatorModal}
            onClose={() => setOpenCalculatorModal(false)}
          />
        </IonContent>
      </ListWrapper>
    </IonPage>
  );
};

export default React.memo(Overview);

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const CarbsCard = styled(IonCard)`
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to right top,
    #00576a,
    #005d6c,
    #00636d,
    #00686c,
    #006e6b,
    #007369,
    #007865,
    #007c5f,
    #008056,
    #00844a,
    #00883b,
    #058b28
  );
`;

const ProductsCard = styled(IonCard)`
  border-radius: 20px;
  margin-top: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to right top,
    #00576a,
    #005d6c,
    #00636d,
    #00686c,
    #006e6b,
    #007369,
    #007865,
    #007c5f,
    #008056,
    #00844a,
    #00883b,
    #058b28
  );
`;

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 12px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(
    to right top,
    #00576a,
    #005d6c,
    #00636d,
    #00686c,
    #006e6b,
    #007369,
    #007865,
    #007c5f,
    #008056,
    #00844a,
    #00883b,
    #058b28
  );
`;

const CardHeader = styled(IonCardHeader)`
  display: flex;
  justify-content: space-between;
`;

const CalculatorCardContent = styled(IonCardContent)`
  text-align: center;
`;

const CalculateButton = styled(IonButton)`
  --border-radius: 32px;
`;

const CardSubtitle = styled(IonCardSubtitle)`
  padding-left: 4px;
`;

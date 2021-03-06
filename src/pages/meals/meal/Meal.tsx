import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  isPlatform,
  IonText,
  IonItem,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import moment from "moment";
import {
  arrowBackOutline,
  chatbubbleOutline,
  ellipsisVertical,
} from "ionicons/icons";
import { ProductList } from "./ProductList";
import { ActionSheet } from "./ActionSheet";
import { NoteAlert } from "./alerts/NoteAlert";
import { useMeals } from "../../../hooks/mealsHook";
import { retrieveMeals } from "../../../redux/actions/meals/actions";
import { DeleteAlert } from "./alerts/DeleteAlert";
import { getMealKey } from "../../../resources/mealTypes";
import { MealCarbsChart } from "../../../components/charts/MealCarbsChart";
import { MealProductsChart } from "../../../components/charts/MealProductsChart";
import { dateService } from "../../../services/DateService";
import { AddProductButton } from "./AddProductButton";
import { calcService } from "../../../services/CalculationService";
import { dec2 } from "../../../utils/helpers";
import { CopyMealModal } from "./copy-meal-modal/CopyMealModal";

interface MealPageProps extends RouteComponentProps<{ id: string }> {}

export const Meal: React.FC<MealPageProps> = ({ match, history }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { meals, date } = useMeals();
  const [openActionSheet, setOpenActionSheet] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openNoteAlert, setOpenNoteAlert] = useState(false);
  const [openCopyModal, setOpenCopyModal] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      dispatch(retrieveMeals(dateService.dateNoTime(date)));
    }
  }, []);

  const meal = meals.find((meal) => meal.id === match.params.id);

  const registeredProductsCarbs = calcService.getMealTotalCarbs(
    meal ? meal.products.filter((p) => !p.dummy) : []
  );
  const unregisteredProductsCarbs = calcService.getMealTotalCarbs(
    meal ? meal.products.filter((p) => p.dummy) : []
  );

  return (
    <IonPage>
      <IonContent color="primary">
        <Header>
          <IonBackButton
            color="white"
            mode={isPlatform("ios") ? "ios" : "md"}
            defaultHref={`/meals`}
            icon={arrowBackOutline}
          />
          {meal && (
            <Date color="white">
              <h4>{`${t(getMealKey(meal.type))}, ${moment(date).format(
                "MMM D"
              )}`}</h4>
            </Date>
          )}
          <IonButton
            color="white"
            fill="clear"
            onClick={() => setOpenActionSheet(true)}
          >
            <IonIcon icon={ellipsisVertical} />
          </IonButton>
        </Header>
        {meal && (
          <>
            {meal.products.length > 0 && (
              <Charts>
                <CarbsCard color="secondary">
                  <IonCardContent>
                    <IonText color="dark">
                      <TotalCarbs>
                        {`${dec2(
                          registeredProductsCarbs + unregisteredProductsCarbs
                        )}`}
                      </TotalCarbs>
                    </IonText>
                    {unregisteredProductsCarbs > 0 && (
                      <>
                        <br />
                        <IonText>
                          <CarbInfo>{`${registeredProductsCarbs}${t(
                            "units.grams.short"
                          )} +`}</CarbInfo>
                        </IonText>
                        <IonText>
                          <CarbInfo>{`${unregisteredProductsCarbs}${t(
                            "units.grams.short"
                          )} (${t("page.meals.dummy.manual")})`}</CarbInfo>
                        </IonText>
                      </>
                    )}
                  </IonCardContent>
                </CarbsCard>
                <Card color="light">
                  <IonCardContent>
                    <MealCarbsChart meal={meal} />
                  </IonCardContent>
                </Card>
                <Card color="light">
                  <IonCardContent>
                    <MealProductsChart meal={meal} />
                  </IonCardContent>
                </Card>
              </Charts>
            )}
            {meal.note && (
              <Note>
                <IonItem lines="none" color="primary">
                  <IonIcon
                    icon={chatbubbleOutline}
                    slot="start"
                    color="light"
                    size="small"
                  />
                  <IonText color="light">{meal.note}</IonText>
                </IonItem>
              </Note>
            )}
            <ProductList meal={meal} />
            <AddProductButton meal={meal} />
          </>
        )}
      </IonContent>
      <ActionSheet
        open={openActionSheet}
        onNote={() => setOpenNoteAlert(true)}
        onDelete={() => setOpenDeleteAlert(true)}
        onCopy={() => setOpenCopyModal(true)}
        onClose={() => setOpenActionSheet(false)}
      />
      <DeleteAlert
        meal={meal}
        history={history}
        open={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
      />
      <NoteAlert
        meal={meal}
        open={openNoteAlert}
        onClose={() => setOpenNoteAlert(false)}
      />
      <CopyMealModal
        open={openCopyModal}
        meal={meal}
        onClose={() => {
          setOpenCopyModal(false);
          history.push("/meals");
        }}
      />
    </IonPage>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--ion-color-primary);
  padding: 12px;
`;

const Date = styled(IonText)`
  align-text: center;
`;

const Charts = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 0 8px 12px 8px;
`;

const Card = styled(IonCard)`
  min-width: 150px;
  margin: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarbsCard = styled(IonCard)`
  min-width: 150px;
  margin: 4px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Note = styled.div`
  margin: 0 0 16px 12px;
`;

const TotalCarbs = styled.strong`
  font-size: 3.2em;
`;

const CarbInfo = styled.small`
  width: 100%;
`;

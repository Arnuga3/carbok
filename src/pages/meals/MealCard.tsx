import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonItem,
  IonReorder,
  IonText,
} from "@ionic/react";
import {
  addCircleOutline,
  chatbubbleOutline,
  copyOutline,
  pencil,
  trashOutline,
} from "ionicons/icons";
import { MealCardProductDescription } from "./MealCardProductDescription";
import { Meal } from "../../classes/meal/Meal";
import { DeleteAlert } from "./meal/alerts/DeleteAlert";
import { getMealKey } from "../../resources/mealTypes";
import { calcService } from "../../services/CalculationService";
import { NoteAlert } from "./meal/alerts/NoteAlert";
import { CopyAlert, CopyState } from "./meal/alerts/CopyAlert";
import { CopyDatetime } from "./meal/alerts/CopyDateTime";
import { ProductSelectModal } from "./meal/ProductSelectModal";
import moment from "moment";

interface Props {
  meal: Meal;
  date: Date;
}

export const MealCard: React.FC<Props> = ({ meal, date }) => {
  const { t } = useTranslation();
  const copyDatetime = useRef<HTMLIonDatetimeElement>(null);

  const [openProductsModal, setOpenProductsModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openNoteAlert, setOpenNoteAlert] = useState(false);
  const [copyAlertState, setCopyAlertState] = useState<CopyState>({
    open: false,
    date: null,
  });

  return (
    <Animation>
      <Card mode="md" color="primary">
        <ReorderHandle>
          <IonReorder />
        </ReorderHandle>
        <CardContent>
          <IonItem
            routerLink={`/meals/${meal.id}/products`}
            lines="none"
            color="none"
          >
            <ItemContent>
              <CardHeader>
                <CardHeaderTitle>
                  <IonText color="secondary">
                    <p>{`${moment(date).format("dddd, D MMM YYYY")}`}</p>
                  </IonText>
                  <IonText color="white">
                    <h1>{t(getMealKey(meal.type))}</h1>
                  </IonText>
                </CardHeaderTitle>
                <CardHeaderCarbs>
                  <IonText color="secondary">
                    <p>{t("carbohydrates")}</p>
                  </IonText>
                  <IonText color="white">
                    <h1>{calcService.getMealTotalCarbs(meal.products)}</h1>
                  </IonText>
                </CardHeaderCarbs>
              </CardHeader>
              <DayMealCardProductList>
                {meal.products.map((product, i) => (
                  <MealCardProductDescription
                    key={i}
                    product={product}
                    meal={meal}
                    t={t}
                    i={i}
                  />
                ))}
                {meal.note && (
                  <Note>
                    <NoteIcon icon={chatbubbleOutline} color="secondary" />
                    <IonText color="secondary">
                      <p>{meal.note}</p>
                    </IonText>
                  </Note>
                )}
                {meal.products.length > 0 && (
                  <EditIcon>
                    <IonIcon icon={pencil} color="secondary" />
                  </EditIcon>
                )}
              </DayMealCardProductList>
            </ItemContent>
          </IonItem>
          <CardActions>
            <ActionButton
              color="warning"
              fill="clear"
              size="small"
              onClick={() => setOpenDeleteAlert(true)}
            >
              <IonIcon icon={trashOutline} slot="icon-only" />
            </ActionButton>
            <ActionButton
              color="light"
              fill="clear"
              size="small"
              onClick={() => copyDatetime.current?.open()}
              disabled={meal.products.length === 0}
            >
              <IonIcon icon={copyOutline} slot="icon-only" />
            </ActionButton>
            <ActionButton
              color="light"
              fill="clear"
              size="small"
              onClick={() => setOpenNoteAlert(true)}
            >
              <IonIcon icon={chatbubbleOutline} slot="icon-only" />
            </ActionButton>
            <ActionButton
              color="light"
              fill="clear"
              size="small"
              onClick={() => setOpenProductsModal(true)}
            >
              <AddProductsIcon icon={addCircleOutline} slot="icon-only" />
            </ActionButton>
          </CardActions>
        </CardContent>
        <DeleteAlert
          meal={meal}
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
        />
        <NoteAlert
          meal={meal}
          open={openNoteAlert}
          onClose={() => setOpenNoteAlert(false)}
        />
        <CopyDatetime
          ref={copyDatetime}
          onDateChange={(state) => setCopyAlertState(state)}
        />
        <CopyAlert
          meal={meal}
          copyState={copyAlertState}
          onClose={() => setCopyAlertState({ open: false, date: null })}
        />
        <ProductSelectModal
          meal={meal}
          open={openProductsModal}
          onClose={() => setOpenProductsModal(false)}
        />
      </Card>
    </Animation>
  );
};

const Animation = styled.div`
  animation-name: fade;
  animation-duration: 0.5s;

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Card = styled(IonCard)`
  border-radius: 20px;
  margin-top: 16px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.2);
`;

const CardContent = styled(IonCardContent)`
  padding: 8px;
`;

const ReorderHandle = styled.div`
  display: flex;
  justify-content: center;
  background-color: var(--ion-color-primary-shade);
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

  p {
    text-transform: capitalize;
  }
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

const Note = styled.div`
  display: flex;
  align-items: center;
`;

const NoteIcon = styled(IonIcon)`
  padding: 8px 4px 8px 0;
`;

const AddProductsIcon = styled(IonIcon)`
  font-size: 28px;
`;

const EditIcon = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 8px;
`;

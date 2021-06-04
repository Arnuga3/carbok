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
  chatbubbleOutline,
  copyOutline,
  pencilOutline,
  trashOutline,
} from "ionicons/icons";
import { DayMealCardProduct } from "./DayMealCardProduct";
import { Meal } from "../../classes/meal/Meal";
import { DeleteAlert } from "./meal/alerts/DeleteAlert";
import { getMealKey } from "../../resources/mealTypes";
import { calcService } from "../../services/CalculationService";
import { NoteAlert } from "./meal/alerts/NoteAlert";
import { CopyAlert, CopyState } from "./meal/alerts/CopyAlert";
import { CopyDatetime } from "./meal/alerts/CopyDateTime";

interface Props {
  meal: Meal;
}

export const DayMealCard: React.FC<Props> = ({ meal }) => {
  const { t } = useTranslation();
  const copyDatetime = useRef<HTMLIonDatetimeElement>(null);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openNoteAlert, setOpenNoteAlert] = useState(false);
  const [copyAlertState, setCopyAlertState] = useState<CopyState>({
    open: false,
    date: null,
  });

  return (
    <IonCard>
      <ReorderHandle>
        <IonReorder />
      </ReorderHandle>
      <IonCardContent>
        <IonItem
          routerLink={`/meals/${meal.id}/products`}
          lines="none"
          mode="md"
        >
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
                  <h1>{calcService.getMealTotalCarbs(meal.products)}</h1>
                </IonText>
                <IonText color="medium">
                  <small>{t("carbohydrates")}</small>
                </IonText>
              </CardHeaderCarbs>
            </CardHeader>
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
                  <NoteIcon icon={chatbubbleOutline} color="primary" />
                  <IonText color="medium">
                    <small>{meal.note}</small>
                  </IonText>
                </Note>
              )}
            </DayMealCardProductList>
          </ItemContent>
        </IonItem>
        <CardActions>
          <ActionButton
            color="danger"
            fill="clear"
            shape="round"
            size="small"
            onClick={() => setOpenDeleteAlert(true)}
          >
            <IonIcon icon={trashOutline} slot="icon-only" />
          </ActionButton>
          <ActionButton
            color="secondary"
            fill="clear"
            shape="round"
            size="small"
            onClick={() => copyDatetime.current?.open()}
            disabled={meal.products.length === 0}
          >
            <IonIcon icon={copyOutline} slot="icon-only" />
          </ActionButton>
          <ActionButton
            color="secondary"
            fill="clear"
            shape="round"
            size="small"
            onClick={() => setOpenNoteAlert(true)}
          >
            <IonIcon icon={chatbubbleOutline} slot="icon-only" />
          </ActionButton>
          <ActionButton
            color="secondary"
            fill="clear"
            shape="round"
            size="small"
            routerLink={`/meals/${meal.id}/products`}
          >
            <IonIcon icon={pencilOutline} slot="icon-only" />
          </ActionButton>
        </CardActions>
      </IonCardContent>
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
      <CopyDatetime ref={copyDatetime} onDateChange={(state) => setCopyAlertState(state)} />
      <CopyAlert
        meal={meal}
        copyState={copyAlertState}
        onClose={() => setCopyAlertState({ open: false, date: null })}
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

const Note = styled.div`
  display: flex;
  align-items: center;
`;

const NoteIcon = styled(IonIcon)`
  padding: 8px 4px 8px 0;
`;

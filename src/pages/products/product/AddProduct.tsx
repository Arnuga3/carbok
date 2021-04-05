import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonCard,
  IonCardContent,
  IonLabel,
  IonIcon,
} from "@ionic/react";
import styled from "styled-components";
import { CategorySelectModal } from "./CategorySelectModal";
import { IProductCategory } from "../../../interfaces/IProductCategory";
import { addProduct } from "../../../redux/actions/productsActions";
import { IProduct } from "../../../interfaces/IProduct";
import { uuidv4 } from "../../../utils/helper";
import { GeneralData } from "./form/GeneralData";
import { UnitsType } from "../../../types/UnitsType";
import { UnitsData } from "./form/UnitsData";
import { NumericData, NumericInput } from "./form/NumericData";
import { warningOutline } from "ionicons/icons";
import { RouteComponentProps } from "react-router";

export interface IProductDummy {
  id?: string;
  name: string | null;
  category: IProductCategory | null;
  units: UnitsType;
  portion: number;
  defaultPortion: number;
  carbs: number;
  sugars: number;
}

const defaultData: IProductDummy = {
  name: null,
  category: null,
  units: "g",
  portion: 100,
  defaultPortion: 100,
  carbs: 0,
  sugars: 0,
};

export const AddProduct: React.FC<RouteComponentProps> = ({ history }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultData);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [saveAttempted, setSaveAttempted] = useState(false);

  const handleCategorySelect = (category: IProductCategory) => {
    setData({ ...data, category });
    setOpenCategoryModal(false);
  };

  const handleNumberInputChange = (type: NumericInput, value: any) => {
    switch (type) {
      case NumericInput.PORTION:
        return setData({ ...data, portion: parseFloat(value) });
      case NumericInput.CARBS:
        return setData({ ...data, carbs: parseFloat(value) });
      case NumericInput.SUGARS:
        return setData({ ...data, sugars: parseFloat(value) });
      case NumericInput.DEFAULT_PORTION:
        return setData({ ...data, defaultPortion: parseFloat(value) });
    }
  };

  const handleSave = () => {
    setSaveAttempted(true);
    if (data.category && data.name) {
      const product: IProduct = {
        id: uuidv4(),
        name: data.name,
        category: data.category,
        // TODO - Complete this later
        units: {
          type: data.units,
          nameKey: data.units,
          shortNameKey: data.units,
        },
        carbsData: {
          portion: data.portion,
          carbs: data.carbs,
          sugars: data.sugars,
        },
      };
      dispatch(addProduct(product));
      history.goBack();
    }
  };

  const nameValid = useCallback(() => {
    return !saveAttempted || (data.name && data.name.trim() !== "");
  }, [data.name, saveAttempted]);

  const categoryValid = useCallback(() => {
    return !saveAttempted || data.category !== null;
  }, [data.category, saveAttempted]);

  const portionValid = useCallback(() => {
    return data.portion > 0;
  }, [data.portion]);

  const carbsValid = useCallback(() => {
    return data.carbs >= 0 && data.carbs <= data.portion;
  }, [data.carbs, data.portion]);

  const sugarsValid = useCallback(() => {
    return data.sugars >= 0 && data.sugars <= data.carbs;
  }, [data.carbs, data.sugars]);

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/products" />
            </IonButtons>
            <IonTitle>Add Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardContent>
            <Row>
              <IonLabel color={nameValid() ? "" : "danger"}>
                {!nameValid() && <IonIcon icon={warningOutline} />}Name
              </IonLabel>
              <GeneralData
                categoryValid={categoryValid()}
                category={data.category}
                onNameChange={(name: string) => setData({ ...data, name })}
                onCategoryModalOpen={() => setOpenCategoryModal(true)}
              />
            </Row>
            <Row>
              <IonLabel>Units</IonLabel>
              <UnitsData
                units={data.units}
                onUnitsChange={(units: UnitsType) =>
                  setData({ ...data, units })
                }
              />
            </Row>
            <Row>
              <IonLabel>Carbs & Protion</IonLabel>
              <NumericData
                data={data}
                portionValid={portionValid()}
                carbsValid={carbsValid()}
                sugarsValid={sugarsValid()}
                onNumericDataChange={handleNumberInputChange}
              />
            </Row>
            <SaveButton
              size="large"
              expand="block"
              shape="round"
              onClick={handleSave}
            >
              Save
            </SaveButton>
          </IonCardContent>
        </IonCard>
      </IonContentStyled>
      <CategorySelectModal
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        onSelect={handleCategorySelect}
      />
    </IonPage>
  );
};

const IonContentStyled = styled(IonContent)`
  --padding-top: 60px;

  & .input-right-align {
    text-align: right;
  }
`;

const SaveButton = styled(IonButton)`
  margin-top: 28px;
`;

const Row = styled.div`
  margin-top: 12px;
`;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  IonHeader,
  IonContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonInput,
  IonItem,
  IonList,
  IonLabel,
  IonRange,
  IonSegment,
  IonSegmentButton,
  IonButton,
} from "@ionic/react";
import styled from "styled-components";
import { CategorySelectModal } from "./CategorySelectModal";
import { IProductCategory } from "../../../interfaces/IProductCategory";
import { addProduct } from "../../../redux/actions/productsActions";
import { IProduct } from "../../../interfaces/IProduct";
import { uuidv4 } from "../../../utils/helper";

export interface IProductDummy {
  id?: string;
  name?: string;
  category?: IProductCategory | null;
  units: string;
  portion: number;
  carbs: number;
  sugars: number;
}

const defaultData: IProductDummy = {
  units: "g",
  category: null,
  portion: 0,
  carbs: 0,
  sugars: 0,
};

export const AddProduct: React.FC = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(defaultData);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);

  const handleCategorySelect = (category: IProductCategory) => {
    setData({ ...data, category });
    setOpenCategoryModal(false);
  };

  const handleSave = () => {
    if (data.category && data.name) {
      const product: IProduct = {
        id: uuidv4(),
        name: data.name,
        category: data.category,
        units: { nameKey: data.units, shortNameKey: data.units },
        carbsData: {
          portion: data.portion,
          carbs: data.carbs,
          sugars: data.sugars,
        },
      };
      dispatch(addProduct(product));
    }
  };

  return (
    <IonPage>
      <IonContentStyled>
        <IonHeader slot="fixed">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/meals" />
            </IonButtons>
            <IonTitle>Add Product</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList lines="full">
          <IonItemStyled>
            <IonLabel color="medium">Name</IonLabel>
            <IonInput
              className="input-right-align"
              onIonInput={(e: any) =>
                setData({ ...data, name: e.target.value })
              }
            ></IonInput>
          </IonItemStyled>
          <IonItemStyled onClick={() => setOpenCategoryModal(true)}>
            <IonLabel color="medium">Category</IonLabel>
            <IonInput
              className="input-right-align"
              value={data?.category?.type ?? ""}
            ></IonInput>
          </IonItemStyled>
          <IonItemStyled>
            <IonLabel color="medium">Units</IonLabel>
            <IonSegmentStyled
              value={data.units}
              onIonChange={(e) =>
                setData({ ...data, units: e.detail.value ?? "" })
              }
            >
              <IonSegmentButtonStyled value="ml">
                <IonLabel>ml</IonLabel>
              </IonSegmentButtonStyled>
              <IonSegmentButtonStyled value="g">
                <IonLabel>g</IonLabel>
              </IonSegmentButtonStyled>
            </IonSegmentStyled>
          </IonItemStyled>
          <IonItem>
            <IonLabel color="medium">Portion</IonLabel>
            <IonRange min={0} max={500} color="secondary">
              <IonLabel slot="end">500</IonLabel>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonLabel color="medium">Carbs</IonLabel>
            <IonRange min={0} max={500} color="secondary">
              <IonLabel slot="end">500</IonLabel>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonLabel color="medium">Sugars</IonLabel>
            <IonRange min={0} max={500} color="secondary">
              <IonLabel slot="end">500</IonLabel>
            </IonRange>
          </IonItem>
          <IonItem>
            <IonLabel color="medium">Default Portion</IonLabel>
            <IonRange min={0} max={500} color="secondary">
              <IonLabel slot="end">500</IonLabel>
            </IonRange>
          </IonItem>
        </IonList>
        <SaveButton expand="block" shape="round" onClick={handleSave}>
          Save
        </SaveButton>
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

const IonItemStyled = styled(IonItem)`
  --padding-top: 6px;
  --padding-bottom: 6px;
`;

const IonSegmentStyled = styled(IonSegment)`
  width: 50%;
`;

const IonSegmentButtonStyled = styled(IonSegmentButton)`
  width: 15%;
`;

const SaveButton = styled(IonButton)`
  margin: 12px;
`;

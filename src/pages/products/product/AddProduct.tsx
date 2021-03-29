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
} from "@ionic/react";
import styled from "styled-components";
import { CategorySelectModal } from "./CategorySelectModal";
import { IProductCategory } from "../../../interfaces/IProductCategory";
import { addProduct } from "../../../redux/actions/productsActions";
import { IProduct } from "../../../interfaces/IProduct";
import { uuidv4 } from "../../../utils/helper";
import { RangeSlider } from "./form/RangeSlider";
import { ProductMain } from "./form/ProductMain";
import { UnitsType } from "../../../types/UnitsType";

export interface IProductDummy {
  id?: string;
  name?: string;
  category?: IProductCategory | null;
  units: UnitsType;
  portion: number;
  defaultPortion: number;
  carbs: number;
  sugars: number;
}

const defaultData: IProductDummy = {
  units: "g",
  category: null,
  portion: 100,
  defaultPortion: 100,
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
    if (data.category && data.name && dataValid()) {
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
    }
  };

  const nameValid = useCallback(() => {
    return data.name && data.name.trim() !== '';
  }, [data.name]);

  const portionValid = useCallback(() => {
    return data.portion > 0;
  }, [data.portion]);

  const carbsValid = useCallback(() => {
    return data.carbs <= data.portion;
  }, [data.carbs, data.portion]);

  const sugarsValid = useCallback(() => {
    return data.sugars <= data.carbs;
  }, [data.carbs, data.sugars]);

  const dataValid = () => {
    return nameValid() && portionValid() && carbsValid() && sugarsValid();
  }

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
        <ProductMain
          nameValid={nameValid()}
          category={data.category}
          units={data.units}
          onNameChange={(name: string) => setData({ ...data, name })}
          onUnitsChange={(units: UnitsType) => setData({ ...data, units })}
          onCategoryModalOpen={() => setOpenCategoryModal(true)}
        />
        <RangeSlider
          dataValid={portionValid()}
          errorMessage='Required'
          label="Per Portion"
          value={data.portion}
          units={data.units}
          onChange={(portion: number) =>
            setData({
              ...data,
              portion,
            })
          }
        />
        <RangeSlider
          dataValid={carbsValid()}
          errorMessage='Must be <= portion'
          label="Carbohydrates"
          value={data.carbs}
          onChange={(carbs: number) =>
            setData({
              ...data,
              carbs,
            })
          }
        />
        <RangeSlider
          dataValid={sugarsValid()}
          errorMessage='Must be <= total carbs'
          label="Of which Sugars"
          value={data.sugars}
          onChange={(sugars: number) =>
            setData({
              ...data,
              sugars,
            })
          }
        />
        <RangeSlider
          label="Default Portion (optional)"
          value={data.defaultPortion}
          units={data.units}
          onChange={(defaultPortion: number) =>
            setData({
              ...data,
              defaultPortion,
            })
          }
        />
        <SaveButton disabled={!dataValid()} expand="block" shape="round" onClick={handleSave}>
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

const SaveButton = styled(IonButton)`
  margin: 12px;
`;

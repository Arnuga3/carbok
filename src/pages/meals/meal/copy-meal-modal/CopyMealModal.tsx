import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Meal } from "../../../../classes/meal/Meal";
import { DatetimeModal } from "../../../../components/common/DatetimeModal";
import { CopyAlert, CopyState } from "./CopyAlert";

interface Props {
  open: boolean;
  meal?: Meal;
  onClose: () => void;
}

export const CopyMealModal: React.FC<Props> = ({ open, meal, onClose }) => {
  const { t } = useTranslation();
  const [copyState, setCopyState] = useState<CopyState>({ date: null, open: false });

  const handleCloseModal = () => {
    setCopyState({ date: null, open: false });
    onClose();
  };

  return (
    <>
      <DatetimeModal
        open={open}
        title={t("page.meals.copy.meal.copy.modal.title")}
        onDateChange={(date) => setCopyState({ date, open: true })}
        onClose={handleCloseModal}
      />
      <CopyAlert
        open={copyState.open}
        date={copyState.date}
        meal={meal}
        onCopied={handleCloseModal}
        onClose={() => setCopyState({ date: null, open: false })}
      />
    </>
  );
};

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Meal } from "../../../../classes/meal/Meal";
import { DatetimeModal } from "../../../../components/common/DatetimeModal";
import { CopyMealConfirm, CopyMealConfirmState } from "./CopyMealConfirm";

interface Props {
  open: boolean;
  meal?: Meal;
  onClose: () => void;
}

export const CopyMealModal: React.FC<Props> = ({ open, meal, onClose }) => {
  const { t } = useTranslation();
  const [confirmState, setConfirmState] = useState<CopyMealConfirmState>({ date: null, open: false });

  const handleCloseModal = () => {
    setConfirmState({ date: null, open: false });
    onClose();
  };

  return (
    <>
      <DatetimeModal
        open={open}
        title={t("page.meals.copy.meal.copy.modal.title")}
        onDateChange={(date) => setConfirmState({ date, open: true })}
        onClose={handleCloseModal}
      />
      <CopyMealConfirm
        open={confirmState.open}
        date={confirmState.date}
        meal={meal}
        onCopied={handleCloseModal}
        onClose={() => setConfirmState({ date: null, open: false })}
      />
    </>
  );
};

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
  const [copyAlertState, setCopyAlertState] = useState<CopyState>({
    open: false,
    date: null,
  });

  return (
    <>
      <DatetimeModal
        open={open}
        title={t("page.meals.copy.meal.copy.modal.title")}
        onDateChange={(date) => setCopyAlertState({ open: true, date })}
        onClose={onClose}
      />
      <CopyAlert
        meal={meal}
        copyState={copyAlertState}
        onCopied={() => {
          setCopyAlertState({ open: false, date: null });
          onClose();
        }}
        onClose={() => setCopyAlertState({ open: false, date: null })}
      />
    </>
  );
};
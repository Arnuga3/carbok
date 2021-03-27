import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export const useMeals = () => {
  return useSelector(
    ({ mealsState }: AppState) => mealsState
  );
};
import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export const useProductCategories = () => {
  return useSelector(
    ({ productCategoriesState }: AppState) => productCategoriesState
  );
};
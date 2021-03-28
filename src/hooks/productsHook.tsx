import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export const useProducts = () => {
  return useSelector(
    ({ productsState }: AppState) => productsState
  );
};
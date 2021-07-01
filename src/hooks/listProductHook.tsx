import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export const useListProduct = () => {
  return useSelector(
    ({ listProductState }: AppState) => listProductState
  );
};
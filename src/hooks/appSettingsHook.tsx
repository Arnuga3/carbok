import { useSelector } from 'react-redux';
import { AppState } from '../redux/reducers';

export const useAppSettings = () => {
  return useSelector(
    ({ appSettingsState }: AppState) => appSettingsState
  );
};
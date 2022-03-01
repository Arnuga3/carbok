import { i18n } from "i18next";
import { Dispatch } from "redux";
import { IAppSettings } from "../../classes/appSettings/IAppSettings";
import { dataService } from "../../services/DataService";

export enum AppSettingsActions {
  SET_APP_SETTINGS = "SET_APP_SETTINGS",
}
export type AppSettingsActionType = SetAppSettings;

interface SetAppSettings {
  type: AppSettingsActions.SET_APP_SETTINGS;
  settings: IAppSettings;
}

const setAppSettings = (settings: IAppSettings): SetAppSettings => ({
  type: AppSettingsActions.SET_APP_SETTINGS,
  settings,
});

export const initAppSettings = (i18n: i18n) => {
  return async (dispatch: Dispatch) => {
    try {
      const settings: IAppSettings|null = await getSettingsFromDB();
      if (settings) {
        i18n.changeLanguage(settings.language);
        document.body.classList.toggle("dark", settings.themeMode === "dark");
        dispatch(setAppSettings(settings));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const changeAppSettings = (settings: IAppSettings) => {
  return async (dispatch: Dispatch) => {
    try {
      await changeAppSettingsInDB(settings);
      dispatch(setAppSettings(settings));
    } catch (e) {
      console.log(e);
    }
  };
};

const getSettingsFromDB = async () => {
  const dbSettings = await dataService.getValue('settings');
  return dbSettings ? JSON.parse(dbSettings) : null;
}

const changeAppSettingsInDB = async (settings: IAppSettings) => {
  await dataService.setValue('settings', JSON.stringify(settings));
}
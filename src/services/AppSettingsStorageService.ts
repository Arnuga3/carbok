import { Storage } from '@capacitor/storage';
import { IAppSettings } from "../classes/appSettings/IAppSettings";

const appSettingsStorageKey = "settings";

export class SettingsService {
  private key: string;

  constructor(key: string = appSettingsStorageKey) {
    this.key = key;
  }
  
  public async get(): Promise<IAppSettings | null> {
    const { value } = await Storage.get({ key: this.key });
    return value ? JSON.parse(value) : null;
  }
  
  public async set(settings: IAppSettings): Promise<void> {
    await Storage.set({
      key: this.key,
      value: JSON.stringify(settings),
    });
  }
  
  public async remove(): Promise<void> {
    await Storage.remove({ key: this.key });
  }
}

export const settingsService = new SettingsService();

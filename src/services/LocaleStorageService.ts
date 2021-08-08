import { Storage } from '@capacitor/storage';

export class LocalStorageService {
  public async get(key: string): Promise<string[]|null> {
    const { value } = await Storage.get({ key });
    return value ? JSON.parse(value) : null;
  }

  public async set(key: string, value: any): Promise<void> {
    await Storage.set({ key, value: JSON.stringify(value) });
  }

  public async remove(key: string): Promise<void> {
    await Storage.remove({ key });
  }
}

export const localeStorageService = new LocalStorageService();

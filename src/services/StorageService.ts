import { dataService } from './DataService';

export class StorageService {
  public async get(key: string): Promise<any> {
    return await dataService.getValue(key);
  }

  public async set(key: string, value: any): Promise<void> {
    await dataService.setValue(key, value);
  }

  public async remove(key: string): Promise<void> {
    await dataService.removeValue(key);
  }
}

export const localeStorageService = new StorageService();

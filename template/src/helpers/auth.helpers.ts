import { StorageItem } from 'enums/storage-item.enum';
import { storage } from './storage.helpers';

export function isUserAuthenticated(): boolean {
  return !!storage.session.get(StorageItem.AUTH_TOKEN);
}

export function getAuthToken(): string | null {
  return storage.session.get<string>(StorageItem.AUTH_TOKEN);
}

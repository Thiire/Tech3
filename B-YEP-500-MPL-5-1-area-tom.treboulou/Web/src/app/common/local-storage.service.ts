import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public stock(key: string, value: any) {
    this.storage.set(key, value);
  }

  public get(key: string): any {
    return this.storage.get(key);
  }

  public clear() {
    this.storage.clear();
  }
}

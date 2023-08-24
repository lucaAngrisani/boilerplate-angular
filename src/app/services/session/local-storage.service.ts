import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {

  private _obj: any;
  private _item: any;

  constructor() { }

  /************************/
  /* save item{key, obj}  */
  /************************/
  public save(key: string, object: any) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  /************************/
  /* load item by key     */
  /************************/
  public load(key: string) {
    this._obj = null;
    this._item = localStorage.getItem(key);
    if (this._item != null) {
      this._obj = JSON.parse(this._item);
    }
    return this._obj;
  }

  /************************/
  /* remove item by key   */
  /************************/
  public remove(key: string) {
    localStorage.removeItem(key);
  }

}

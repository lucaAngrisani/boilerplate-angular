import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})
export class SessionStorageService {

  private _obj: any;
  private _item: any;

  constructor() { }

  /**
   * Saves an object in sessionStorage with a specified key.
   *
   * This method serializes the provided object into a JSON string and stores it
   * in sessionStorage under the given key.
   *
   * @param {string} key - The key under which the object will be stored in sessionStorage.
   * @param {any} object - The object to be stored, which will be serialized into JSON.
   *
   * @returns {void} - No return value.
   */
  public save(key: string, object: any): void {
    sessionStorage.setItem(key, JSON.stringify(object));
  }

  /**
   * Loads and returns an object of type T from sessionStorage by the specified key.
   *
   * This method retrieves an item from sessionStorage, parses it from JSON,
   * and returns the object as type T. If no item is found for the provided key, it returns `null`.
   *
   * @template T - The expected return type of the parsed object.
   *
   * @param {string} key - The key under which the object is stored in sessionStorage.
   *
   * @returns {T|null} - The parsed object of type T if found, or `null` if no item exists for the provided key.
   */
  public load<T>(key: string): T {
    this._obj = null;
    this._item = sessionStorage.getItem(key);
    if (this._item != null) {
      this._obj = JSON.parse(this._item);
    }
    return this._obj;
  }

  /**
   * Removes an item from sessionStorage by the specified key.
   *
   * This method deletes the entry in sessionStorage associated with the provided key.
   *
   * @param {any} key - The key of the item to be removed from sessionStorage.
   *
   * @returns {void} - No return value.
   */
  public remove(key: any): void {
    sessionStorage.removeItem(key);
  }

}

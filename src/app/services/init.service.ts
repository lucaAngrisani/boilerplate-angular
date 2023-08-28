import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { firstValueFrom } from "rxjs";
import { LANG_STORAGE_NAME } from "../shared/constants";
import { initAppState } from "../store/actions/app.actions";
import { StoreModel } from "../store/store.model";

@Injectable({
  providedIn: "root",
})
export class InitService {

  constructor(
    private store: Store<StoreModel>,
    private translateSvc: TranslateService,
  ) { }

  async init() {
    this.initServices();
    await this.initTranslate();
  }

  initServices() {
    this.store.dispatch(initAppState());
  }

  async initTranslate() {
    //Configuro il setting translate di default;
    let lang: string = (localStorage.getItem(LANG_STORAGE_NAME) && localStorage.getItem(LANG_STORAGE_NAME) != 'undefined') ? localStorage.getItem(LANG_STORAGE_NAME) : 'it';
    this.translateSvc.addLangs(['it', 'en']);
    this.translateSvc.setDefaultLang(lang);
    await firstValueFrom(this.translateSvc.use(lang));
  }
}

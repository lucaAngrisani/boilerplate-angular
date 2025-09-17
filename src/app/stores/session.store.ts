import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { SessionState } from './models/session.model';
import { THEME } from '../enums/theme.enum';
import { LANG } from '../enums/lang.enum';
import { Prefs } from './models/prefs.model';
import { inject } from '@angular/core';
import { LangService } from '../services/lang.service';

const DEFAULT_STATE: SessionState = {
  prefs: { theme: THEME.LIGHT, lang: LANG.EN },
  loading: false,
};

export const SessionStore = signalStore(
  { providedIn: 'root' },
  withState<SessionState>(DEFAULT_STATE),

  withComputed((s) => ({
    isLoading: () => !!s.loading(),
    themeSelected: () => s.prefs().theme,
    langSelected: () => s.prefs().lang,
  })),

  withMethods((store) => {
    function setPrefs(partial: Partial<Prefs>) {
      patchState(store, { prefs: { ...store.prefs(), ...partial } });
      persist();
    }

    function resetPrefs() {
      patchState(store, DEFAULT_STATE);
      persist();
    }

    function setTheme(theme: THEME) {
      setPrefs({ theme });
    }

    const langSvc = inject(LangService);
    function setLang(lang: LANG) {
      langSvc.use(lang);
      setPrefs({ lang });
    }

    function setLoading(loading: boolean) {
      patchState(store, { loading });
      persist();
    }

    // --- Persistence ---
    const KEY = 'app_session_v1';

    function persist() {
      if (typeof window === 'undefined') return;
      const { prefs } = store;
      const snapshot = {
        prefs: prefs(),
      };

      //CONSIDER TO USE OTHER PERSISTANT STORAGE
      localStorage.setItem(KEY, JSON.stringify(snapshot));
    }

    function hydrate() {
      if (typeof window === 'undefined') return;
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      try {
        const parsed = JSON.parse(raw) as Partial<SessionState>;
        patchState(store, {
          prefs: { ...DEFAULT_STATE.prefs, ...(parsed.prefs ?? {}) },
        });
      } catch (e) {
        console.warn('[SessionStore] hydrate parse error', e);
      }
    }

    return { setTheme, setLang, setLoading, setPrefs, resetPrefs, hydrate };
  })
);

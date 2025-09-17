import { Prefs } from './prefs.model';

export type SessionState = {
  prefs: Prefs;
  loading: boolean;
};

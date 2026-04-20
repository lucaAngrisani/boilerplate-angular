import { isDevMode } from '@angular/core';

export const initApp = async () => {
  if (isDevMode()) {
    console.log('INIT APP');
  }
};

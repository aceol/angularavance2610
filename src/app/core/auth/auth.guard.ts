import { inject, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthStore } from './auth.store';
import { isPlatformBrowser } from '@angular/common';

const dataKey = makeStateKey<{ data: string }>('dataLogin');

export const authGuard: CanMatchFn = (route, state) => {
  const platformId = inject(PLATFORM_ID);
  const transferState = inject(TransferState);

  if (!isPlatformBrowser(platformId)) {
    transferState.set(dataKey, { data: 'maData' });
    return true;
  } else {
    console.log(transferState.get(dataKey, { data: '' }));
  }

  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isLoggedIn()) {
    return true;
  }
  // Redirige vers la page de login si non connecté
  return router.createUrlTree(['/login']);
};

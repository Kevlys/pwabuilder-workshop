// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from 'lit';

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from '@thepassle/app-tools/router.js';
import isAuthenticatedPlugin from './plugins/isAuthenticatedPlugin';
import isNotAuthenticatedPlugin from './plugins/isNotAuthenticatedPlugin';

import { lazy } from '@thepassle/app-tools/router/plugins/lazy.js';

// @ts-ignore
import { title } from '@thepassle/app-tools/router/plugins/title.js';

import '../pages/app-home.js';


const baseURL: string = (import.meta as any).env.BASE_URL;


export const router = new Router({
    plugins: [],
    fallback: '/',
    routes: [
      {
        path: resolveRouterPath(),
        title: 'Home',
        plugins: [isAuthenticatedPlugin],
        render: () => html`<app-home></app-home>`
      },
      {
        path: resolveRouterPath('account'),
        title: 'Account',
        plugins: [
          lazy(() => import('../pages/account/account.js')),
          isAuthenticatedPlugin
        ],
        render: () => html`<app-account></app-account>`
      },
      {
        path: resolveRouterPath('login'),
        title: 'Login',
        plugins: [
          lazy(() => import('../pages/login/app-login.js')),
          isNotAuthenticatedPlugin,
        ],
        render: () => html`<app-login></app-login>`
      }
    ]
  });

  // This function will resolve a path with whatever Base URL was passed to the vite build process.
  // Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
  // If no arg is passed to this function, it will return the base URL.

  export function resolveRouterPath(unresolvedPath?: string) {
    var resolvedPath = baseURL;
    if(unresolvedPath) {
      resolvedPath = resolvedPath + unresolvedPath;
    }

    return resolvedPath;
  }

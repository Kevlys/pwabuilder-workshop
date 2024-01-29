import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './pages/app-home';
import './components/notification';
import './components/user-info';
import './components/auth/google-auth';
import './components/header';
import './styles/global.css';
import { router } from './router/router';
import { userStore } from './userState';


@customElement('app-index')
export class AppIndex extends LitElement {
  static styles = css`
    main {
      padding-left: 16px;
      padding-right: 16px;
      padding-bottom: 16px;
    }
  `;

  firstUpdated() {
    router.addEventListener('route-changed', () => {
      if ("startViewTransition" in document) {
        (document as any).startViewTransition(() => this.requestUpdate());
      }
      else {
        this.requestUpdate();
      }
    });
  }

  render() {
    // router config can be round in src/router.ts
    return router.render();
  }
}

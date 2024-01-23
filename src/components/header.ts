import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router';

import '@shoelace-style/shoelace/dist/components/button/button.js';
@customElement('app-header')
export class AppHeader extends LitElement {
  @property({ type: Boolean}) enableBack: boolean = false;

  static styles = css`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: var(--app-color-primary);
      color: white;
      height: 4em;
      padding-left: 16px;
      padding-top: 12px;

      position: fixed;
      left: env(titlebar-area-x, 0);
      top: env(titlebar-area-y, 0);
      height: env(titlebar-area-height, 50px);
      width: env(titlebar-area-width, 100%);
      -webkit-app-region: drag;
    }

    #logo img {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
    }

    nav a {
      margin-left: 10px;
    }

    #back-button-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 12em;
    }

    header {
        color: black;
    }

    nav a {
      color: initial;
    }
  `;

  render() {
    return html`
      <header>

        <div id="back-button-block">
          ${this.enableBack ? html`<sl-button href="${resolveRouterPath()}">
            Back
          </sl-button>` : null}
        </div>
        <div id="logo">
          <img src="https://www.pierrefrey.com/images/logo-pierre-frey.svg"  width="100" height="100">
        </div>
      </header>
    `;
  }
}

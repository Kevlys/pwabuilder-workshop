import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

// You can also import styles from another file
// if you prefer to keep your CSS seperate from your component
import { styles } from './login-styles';

import { styles as sharedStyles } from '../../styles/shared-styles'

import '@shoelace-style/shoelace/dist/components/card/card.js';

@customElement('app-login')
export class AppLogin extends LitElement {
  static styles = [
    sharedStyles,
    styles
  ]

  render() {
    return html`
      <app-header ?enableBack="${false}"></app-header>

      <main>
        <sl-card>
          <google-auth></google-auth>
        </sl-card>
      </main>
    `;
  }
}

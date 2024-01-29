import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit/decorators.js';
import { userStore } from '../userState';

@customElement('user-display')
export class UserDisplay extends LitElement {
  @property({ type: Object }) user: { email: string | null; firstname: string | null; lastname: string | null } | null = null;

  static styles = css`
    /* Vos styles ici */
  `;

  connectedCallback() {
    super.connectedCallback();
    this.subscribeToUserChanges();
  }

  private subscribeToUserChanges() {
    userStore.getUserObservable().subscribe((userData) => {
      this.user = userData;
      this.requestUpdate();
    });
  }

  render() {
    return html`
      <div>
        <p>Email: ${this.user?.email}</p>
        <p>Prénom: ${this.user?.firstname}</p>
        <p>Nom: ${this.user?.lastname}</p>
      </div>
    `;
  }
}

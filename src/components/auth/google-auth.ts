import { LitElement, html } from 'lit-element';
import { customElement } from 'lit/decorators.js';
import { router } from '../../router/router';
import { userStore } from '../../userState';


@customElement('google-auth')
export class GoogleAuth extends LitElement {

  private readonly apiUrl = 'https://127.0.0.1:8000/api/login';

  connectedCallback() {
    super.connectedCallback();
    this.loadScript();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    this.displayButton();
  }

  async handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);

    try {
      const { user, firstname, lastname } = await this.sendApiRequest(response.credential);

      userStore.setUser({
        email: user,
        firstname: firstname,
        lastname: lastname,
        isAuthenticated: true
      });

      router.navigate('/');

    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  }

  async sendApiRequest(jwt) {
    const apiResponse = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jwt }),
      credentials: 'include', // Inclure les cookies dans la requête
    });

    if (!apiResponse.ok) {
      throw new Error(`Erreur lors de la requête vers l'API: ${apiResponse.statusText}`);
    }

    return apiResponse.json();
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;

    script.addEventListener('load', () => {
      // Le script est maintenant chargé, vous pouvez appeler les fonctions GSI ici
      this.displayButton();
    });

    document.head.appendChild(script);
  }

  displayButton() {
    if (typeof google === 'undefined' || !google.accounts) {
      console.error('Google Sign-In script not loaded.');
      return;
    }

    google.accounts.id.initialize({
      client_id: "509590260032-osim4cl76gs2in5eefdgqidd9uu6eo7e.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this)
    });

    const buttonDiv = this.shadowRoot?.getElementById('buttonDiv');
    if (!buttonDiv) {
      console.error('buttonDiv element not found in Shadow DOM.');
      return;
    }

    google.accounts.id.renderButton(buttonDiv, { theme: "outline", size: "large" });
    google.accounts.id.prompt(); // also display the One Tap dialog
  }

  render() {
    return html`<div id="buttonDiv"></div>`;
  }
}

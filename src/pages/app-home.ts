import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { resolveRouterPath } from '../router/router';

import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';

import { styles } from '../styles/shared-styles';
import { fetchData } from '../httpService';
import { userStore, UserState } from '../userState';


@customElement('app-home')
export class AppHome extends LitElement {

  // For more information on using properties and state in lit
  // check out this link https://lit.dev/docs/components/properties/
  @property({ type: Object }) user: UserState | null = null;
  @property({ type: Object }) responseData: any | null = null; // Ajoutez cette propriété

  static styles = [
    styles,
    css`

    app-notification {
      position: absolute;
      z-index: 99;
      top: 0;
      right: 0;
    }

    #welcomeBar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      text-align: center;
    }

    #welcomeCard,
    #infoCard {
      padding: 18px;
      padding-top: 0px;
    }

    sl-card::part(footer) {
      display: flex;
      justify-content: flex-end;
    }

    @media(min-width: 750px) {
      sl-card {
        width: 70vw;
      }
    }


    @media (horizontal-viewport-segments: 2) {
      #welcomeBar {
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
      }

      #welcomeCard {
        margin-right: 64px;
      }
    }
  `];

  async firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/
    console.log('This is your home page');

    // Charger le user via await et stocker le résultat dans la variable de classe
    this.user = await userStore.getUser();
    // Appeler render() pour déclencher le rendu avec les nouvelles données
    this.requestUpdate();
  }

  share() {
    if ((navigator as any).share) {
      (navigator as any).share({
        title: 'PWABuilder pwa-starter',
        text: 'Check out the PWABuilder pwa-starter!',
        url: 'https://github.com/pwa-builder/pwa-starter',
      });
    }
  }

  async callGetApi(){

    // Exemple de requête GET vers une API
    try {
      const data = await fetchData('https://127.0.0.1:8000/json', {
        method: 'GET',
        credentials: 'include',
      });

      console.log('Données récupérées avec succès:', data);

      this.responseData = data; // Stockez la réponse dans la propriété responseData


    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  }

  render() {

    return html`
      <app-notification></app-notification>
      <app-header></app-header>
      <main>
        <div id="welcomeBar">
          <sl-card id="welcomeCard">
          <div slot="header">
          ${this.user
            ? html`
                <p>Bonjour ${this.user.firstname} ${this.user.lastname} !</p>
                <p>Bienvenue sur le template web app de la Digital Factory Pierre Frey !</p>
              `
            : html`<p>Loading...</p>`}
        </div>
            <p id="mainInfo">

              <sl-button @click="${this.callGetApi}" variant="primary">CALL JSON CONTROLLER</sl-button>
              ${this.responseData
                ? html`
                    <p>Réponse de l'API : ${JSON.stringify(this.responseData)}</p>
                  `
                : ''}
            </p>
          </sl-card>
          <sl-button href="${resolveRouterPath('account')}" variant="primary">Navigate to My account</sl-button>
        </div>
      </main>
    `;
  }
}

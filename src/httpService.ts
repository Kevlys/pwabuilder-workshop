import { router } from './router/router';

async function makeRequest(url: string, options: RequestInit): Promise<Response> {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            router.navigate('/login');
        }

        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      throw error;
    }
  }

  export async function fetchData(url: string, options: RequestInit): Promise<any> {
    try {
      const response = await makeRequest(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      throw error;
    }
  }
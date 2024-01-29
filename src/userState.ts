import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { router } from './router/router';

export interface UserState {
  email: string | null;
  firstname: string | null;
  lastname: string | null;
  isAuthenticated: boolean
}

class UserStore {
  private userSubject = new BehaviorSubject<UserState>({
    email: null,
    firstname: null,
    lastname: null,
    isAuthenticated: false
  });

  user$: Observable<UserState> = this.userSubject.asObservable();

  setUser(user: UserState) {
    console.log(user);
    user.isAuthenticated = !!user.email;
    this.userSubject.next(user);
  }

  getUserObservable(): Observable<UserState> {
    return this.user$;
  }

  async getUser(): Promise<UserState> {
    try {
      const user = await firstValueFrom(this.user$);
      console.log(user);

      // Assurez-vous que l'objet user existe et que la propriété 'email' est définie
      if (user) {
        return user;
      } else {
        throw new Error("User is undefined or email is not defined");
      }
    } catch (error) {
      throw error;
    }
  }

  async checkUserSession(){

    console.log('checkUserSession');
    try {
        const response = await fetch('https://127.0.0.1:8000/api/check-auth', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data);

        if (data.user !== null) {

            userStore.setUser({
                email: data.user,
                firstname: data.firstname,
                lastname: data.lastname,
                isAuthenticated: true
              });

          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        return false;
      }
  }

  async logout(){

    // Exemple de requête GET vers une API
    try {
      const apiResponse = await fetch('https://127.0.0.1:8000/api/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log('API Response:', data);
        // Traitez les données de l'API comme nécessaire

        userStore.setUser({
          email: null,
          firstname: null,
          lastname: null,
          isAuthenticated: false
        });

        router.navigate('/');

      } else {
        console.error('Erreur lors de la requête vers l\'API:', apiResponse.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
    }
  }

}

export const userStore = new UserStore();
import { Plugin, Context } from '@thepassle/app-tools/router.js';
import { userStore } from '../../userState.js';

const isNotAuthenticatedPlugin: Plugin = {
    name: 'isNotAuthenticated',
    shouldNavigate: async (context: Context) => {
        return {
            redirect: '/',
            condition: () => isNotAuthenticated()
        };
    },
    beforeNavigation: (context: Context) => {
        console.log('Before Navigation:', context);
    },
    afterNavigation: (context: Context) => {
        console.log('After Navigation:', context);
    }
};

async function isNotAuthenticated(): Promise<boolean> {
    let  user = await userStore.getUser();

    if(!user.isAuthenticated){
        await userStore.checkUserSession();
        user = await userStore.getUser();
    }

    return !user.isAuthenticated;
}


export default isNotAuthenticatedPlugin;

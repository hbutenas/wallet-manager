../client/src/composables/auth/beforeEnterValidation.jsimport store from '../../store';
export async function beforeEnterValidation() {
    const URL = 'http://localhost:5555/api/v1/auth/verify-user';

    const response = await fetch(URL, {
        method: 'POST',
        credentials: 'include'
    });

    // unauthorized request
    if (!response.ok) return false;

    const data = await response.json();

    // set the state
    store.commit('authenticateUser', {
        user_id: data.response.user_id,
        username: data.response.username
    });
    
    return true;
}

export default { beforeEnterValidation };

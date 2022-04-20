import { createStore } from 'vuex';

export default createStore({
    state: {
        user_id: '',
        username: ''
    },
    mutations: {
        authenticateUser(state, { user_id, username }) {
            state.user_id = user_id;
            state.username = username;
        }
    },
    actions: {},
    modules: {}
});

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            id: null,
            email: null,
            name: null,
            token: null,
            tokenExpiration: null,
        }
    },
    mutations,
    actions,
    getters
};
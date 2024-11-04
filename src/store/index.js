import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import itemModule from './modules/items/index.js';
import authModule from './modules/auth/index.js';

// Vuex 플러그인 등록
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        items: itemModule,
        auth: authModule,
    },
    plugins: [createPersistedState({
        paths: ['items']
    })]
});

export default store;

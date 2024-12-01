import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import itemModule from './modules/items/index.js';
import authModule from './modules/auth/index.js';
import tagModule from './modules/tags/index.js';
import zoneModule from './modules/zones/index.js';
import studyModule from './modules/studies/index.js'
import eventModule from './modules/events/index'
// Vuex 플러그인 등록
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        items: itemModule,
        auth: authModule,
        tags: tagModule,
        zones: zoneModule,
        studies: studyModule,
        events: eventModule,
    },
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        paths: ['items', 'auth', 'tags', 'studies']
    })]
});

export default store;

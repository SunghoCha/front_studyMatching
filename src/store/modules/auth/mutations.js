export default {
    setUser(state, payload) {
        state.id = payload.id;
        state.email = payload.email;
        state.name = payload.name;
        state.token = payload.token;
        state.tokenExpiration = payload.tokenExpiration;
    },
    clearUser(state) {
        state.id = null;
        state.email = null;
        state.name = null;
        state.token = null;
        state.tokenExpiration = null;
    }
};
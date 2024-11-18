export default {
    setUser(state, payload) {
        state.id = payload.id;
        state.email = payload.email;
        state.name = payload.name;
        state.token = payload.token;
        state.tokenExpiration = payload.tokenExpiration;
        state.refreshToken = payload.refreshToken;
    },
    clearUser(state) {
        state.id = null;
        state.email = null;
        state.name = null;
        state.token = null;
        state.tokenExpiration = null;
        state.refreshToken = null;
    },
};
export default {
    userId(state) {
        return state.id;
    },
    token(state) {
        return state.token;
    },
    isLoggedIn(state) {
        return !!state.token;
    },
    userName(state) {
        return state.name;
    }
}
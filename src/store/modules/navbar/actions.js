export default {

    toggleMainNavbar({ commit }, value) {
        commit("TOGGLE_MAIN_NAVBAR", value);
    },
    toggleSubNavbar({ commit }, value) {
        commit("TOGGLE_SUB_NAVBAR", value);
    }

}
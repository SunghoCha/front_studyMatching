export default {
    setUserTags(state, payload) {
        state.userTags = payload.userTags;
    },
    setAllTags(state, payload) {
        state.allTags = payload.tags;
    }
}
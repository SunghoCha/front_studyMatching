export default {
    // registerItem(state, payload) {
    //     state.items.push(payload);
    // },
    setItems(state, payload) {
        state.items = payload;
        //sessionStorage.setItem('items', JSON.stringify(state.items));
    },
    setFetchTimestamp(state) {
        state.lastFetch = new Date().getTime();
    },
    setUserTags(state, payload) {
        state.userTags = payload;
        //sessionStorage.setItem('userTags', JSON.stringify(state.userTags));
    }
}
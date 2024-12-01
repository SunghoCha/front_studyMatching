export default {
    setUserTags(state, payload) {
        state.userTags = payload.userTags;
    },
    setAllTags(state, payload) {
        state.allTags = payload.map(tagResponse => tagResponse.tag);
    },
    // setStudyTags(state, payload) {
    //     state.studyTags = payload.studyTags;
    // }
}
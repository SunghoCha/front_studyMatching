export default {
    setUserZones(state, payload) {
        state.userZones = payload.zones;
    },
    setAllZones(state, payload) {
        state.allZones = payload;
    },
    // setStudyZones(state, payload) {
    //     state.studyZones = payload;
    // }
}
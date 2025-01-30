export default {
    setEvents(state, eventsResponse) {
        state.newEvents = eventsResponse.newEvents || [];
        state.oldEvents = eventsResponse.oldEvents || [];
    },
    setCurrentEnrollment(state, enrollment) {
        state.currentEnrollment = enrollment;
    },
    setCurrentEvent(state, event) {
        console.log("Mutating Event in Vuex:", event);
        state.currentEvent = event;
    }

}
export default {
    setEvents(state, eventsResponse) {
        state.newEvents = eventsResponse.newEvents || [];
        state.oldEvents = eventsResponse.oldEvents || [];
    },
    setCurrentEnrollment(state, enrollment) {
        state.currentEnrollment = enrollment;
    },

}
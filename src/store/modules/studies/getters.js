export default {
    // 유저가 가입한 모든 스터디 목록을 반환
    studyList(state) {
        return state.studyList;
    },

    // 현재 선택된 스터디의 상세 데이터를 반환
    currentStudy(state) {
        if (!state.currentStudy) {
            return null;
        }
        return {
            path: state.currentStudy.path,
            title: state.currentStudy.title,
            published: state.currentStudy.published,
            closed: state.currentStudy.closed,
            recruiting: state.currentStudy.recruiting,
            shortDescription: state.currentStudy.shortDescription,
            fullDescription: state.currentStudy.fullDescription,
            tags: state.currentStudy.tags,
            zones: state.currentStudy.zones,
            members: state.currentStudy.members,
            managers: state.currentStudy.managers,
            isJoinable: state.currentStudy.isJoinable,
            isMember: state.currentStudy.isMember,
            isManager: state.currentStudy.isManager
        };
    }
};

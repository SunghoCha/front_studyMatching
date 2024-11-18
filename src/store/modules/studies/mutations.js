export default {
    // 유저가 가입한 모든 스터디 목록 저장
    setStudyList(state, studyList) {
        state.studyList = studyList;
    },

    // 스터디 목록 초기화
    clearStudyList(state) {
        state.studyList = [];
    },

    // 현재 선택된 스터디 상세 데이터 저장
    setCurrentStudy(state, studyData) {
        if (!studyData || typeof studyData !== 'object' || !studyData.path) {
            console.error('Invalid studyData:', studyData);
            return;
        }

        state.currentStudy = {
            path: '',
            title: '',
            published: false,
            closed: false,
            recruiting: false,
            shortDescription: '',
            fullDescription: '',
            tags: [],
            zones: [],
            members: [],
            managers: [],
            isJoinable: false,
            isMember: false,
            isManager: false,
            ...studyData // studyData로 덮어쓰기
        };
    },

    // 현재 선택된 스터디 초기화
    clearCurrentStudy(state) {
        state.currentStudy = {
            path: '',
            title: '',
            published: false,
            closed: false,
            recruiting: false,
            shortDescription: '',
            fullDescription: '',
            tags: [],
            zones: [],
            members: [],
            managers: [],
            isJoinable: false,
            isMember: false,
            isManager: false
        };
    },



    // 스터디 필드 일부만 업데이트 가능
    updateCurrentStudyField(state, { field, value }) {
        if (state.currentStudy && field in state.currentStudy) {
            state.currentStudy[field] = value;
        }
    }
};

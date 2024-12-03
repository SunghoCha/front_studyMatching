export default {
    // 유저가 가입한 모든 스터디 목록 저장
    setStudyList(state, studyList) {
        state.studyList = studyList;
    },

    // 스터디 목록 초기화
    clearStudyList(state) {
        state.studyList = [];
    },

    // 페이지정보 저장
    setPaginationInfo(state, paginationInfo) {
      state.paginationInfo = paginationInfo;
    },
    // 페이지정보 초기화
    clearPaginationInfo(state) {
      state.paginationInfo = {
          currentPage: 1,
          totalPages: 0,
          totalCount: 0,
          size: 0,
      }
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

    setStudyTags(state, tags) {
      if (state.currentStudy) {
          state.currentStudy.tags = tags;
      }
    },

    setStudyZones(state, zones) {
        if (state.currentStudy) {
            state.currentStudy.zones = zones;
        }
    },

    setStudyDescription(state, payload) {
        if (state.currentStudy) {
            state.currentStudy.shortDescription = payload.shortDescription;
            state.currentStudy.fullDescription = payload.fullDescription;
        }
    },

    // 스터디 필드 일부만 업데이트 가능 => 이걸로 통합할지 고민중
    updateCurrentStudyField(state, { field, value }) {
        // 로그 추가: mutation 실행 시
        console.log("Mutation triggered: updateCurrentStudyField");
        console.log("State before update:", JSON.stringify(state.currentStudy));
        console.log("Field to update:", field);
        console.log("New value:", value);

        if (state.currentStudy && field in state.currentStudy) {
            state.currentStudy[field] = value;
            // 로그 추가: 업데이트 후 상태 확인
            console.log("State after update:", JSON.stringify(state.currentStudy));
        } else {
            console.warn(`Field "${field}" does not exist in currentStudy.`);
        }
    }
};

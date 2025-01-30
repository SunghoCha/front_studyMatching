import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced: true,
    state() {
        return {
            studyList: [], // 유저가 가입한 모든 스터디의 목록
            paginationInfo: {
              currentPage: 1,
              totalPages: 0,
              totalCount: 0,
              size: 0,
            },
            currentStudy: { // 현재 선택된 스터디의 상세 정보
                path: '',
                title: '',
                image: '',
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
            }
        };
    },
    mutations,
    actions,
    getters
};
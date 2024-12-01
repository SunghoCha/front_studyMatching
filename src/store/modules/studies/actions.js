import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    async createStudy(context, payload) {
        const accessToken = store.getters['auth/token'];
        console.log("스터디 등록 요청 시작")
        const response = await fetch(`${apiUrl}/study/new`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: payload.path,
                title: payload.title,
                shortDescription: payload.shortDescription,
                fullDescription: payload.fullDescription
            })
        });
        const responseData = await response.json();
        console.log("스터디 생성 완료")

        if (!response.ok) {
            const error = new Error(responseData.message || '스터디 생성 실패');
            throw error;
        }

        context.commit("setCurrentStudy", responseData);
    },

    async loadStudy(context, path) {
        console.log("스터디 목록 반환");
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        console.log("스터디 반환 완료")

        if (!response.ok) {
            console.log("스터디 목록 반환 실패")
            const error = new Error(responseData.message || `스터디 목록 반환 실패`)
            throw error;
        }
        context.commit('setCurrentStudy', responseData);

        return responseData;
    },
    async loadStudies(context, page) {
        console.log("전체 스터디 목록 요청");
        const accessToken = store.getters['auth/token'];

        context.commit('clearStudyList');
        context.commit('clearPaginationInfo');

        const response = await fetch(`${apiUrl}/study/list?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        const responseData = await response.json();
        console.log("스터디 목록 반환 완료")

        if (!response.ok) {
            console.log("스터디 목록 반환 실패")
            const error = new Error(responseData.message || `스터디 목록 반환 실패`)
            throw error;
        }
        const studyList = responseData.content;
        const paginationInfo = {
            currentPage: responseData.currentPage,
            totalPages: responseData.totalPages,
            totalCount: responseData.totalCount,
            size: responseData.size
        }
        context.commit('setStudyList', studyList);
        context.commit('setPaginationInfo', paginationInfo);
        // 상세 출력 TODO : 삭제 예정 로그
        console.log("스터디 목록 상세 정보 (JSON):", JSON.stringify(responseData, null, 2));

        console.dir(responseData, {depth: null});
        studyList.forEach((study, index) => {
            console.log(`스터디 ${index + 1}:`, study.tags);
        });

        return {studyList, paginationInfo};
    },
    async joinStudy(context, path) {
        const accessToken = store.getters['auth/token'];
        const response = await fetch(`${apiUrl}/study/${path}/join`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("스터디 조인 요청 전송 완료");

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.errorMessage || '스터디 참가에 실패하였습니다.');
        }
        console.log("스터디 조인 응답 데이터:", responseData);
        context.commit("setCurrentStudy", responseData);

    },
    async leaveStudy(context, path) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/leave`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application-json'
            }
        });
        console.log("스터디 참가취소 요청 전송 완료");

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.errorMessage || '스터디 참가 취소에 실패하였습니다.');
        }
        console.log("스터디 탈퇴 응답 데이터:", responseData);
        context.commit("setCurrentStudy", responseData);

    },
    async editStudyTags(context, {payload, path}) {
        const accessToken = store.getters['auth/token'];
        console.log("스터디태그 수정 요청 전송 시작:", path);

        const response = await fetch(`${apiUrl}/study-tag/${path}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: payload.tags
            })
        });
        console.log("스터디태그 수정 요청 전송 완료")

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.errorMessage || 'studyTag 등록에 실패하였습니다.')
        }
        context.commit("setStudyTags", responseData.tags);
        return responseData;
    },
    async editStudyZones(context, {payload, path}) {
        const accessToken = store.getters['auth/token'];
        console.log("스터디존 수정 요청 전송 시작: ", path);

        const response = await fetch(`${apiUrl}/study-zone/${path}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zoneIds: payload
            })
        });
        console.log("스터디존 수정 요청 전송 완료");

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.errorMessage || 'studyZone 등록에 실패하였습니다.')
        }
        context.commit("setStudyZones")
    },
    async editStudyDescription(context, {payload, path}) {
        const accessToken = store.getters['auth/token'];
        console.log("스터디 수정 요청 전송 시작", path);

        const response = await fetch(`${apiUrl}/study/description/${path}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                shortDescription: payload.shortDescription,
                fullDescription: payload.fullDescription
            })
        });
        console.log("스터디 소개 수정 요청 전송 완료");

        const responseData = await response.json();

        if (!response.ok) {
            console.log("예외 발생")
            throw new Error(responseData.errorMessage || '스터디 소개 등록에 실패하였습니다.')
        }
        context.commit("setStudyDescription", responseData);
        console.log("Vuex 액션 성공적으로 종료");
    },
    async publishStudy(context, path) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/setting/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
        });
        console.log("스터디 공개 요청 전송 완료");

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.errorMessage || '스터디 공개 요청에 실패하였습니다.')
        }

    }
}
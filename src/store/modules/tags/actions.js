import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    async editUserTag(context, {payload, userId}) {
        const accessToken = store.getters['auth/token'];
        console.log("태그 수정 요청 전송 시작:" + userId);
        // TODO 해당유저만 접근가능한 기능이니 userId를 url에 쓸 필요 없지 않을까?
        const response = await fetch(`${apiUrl}/user-tag/${userId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tags: payload.tags
            })
        });
        console.log("태그 수정 요청 전송 완료")

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'tag 등록에 실패하였습니다.')
        }
        context.commit("setUserTags");
        return responseData.tag;
    },
    async loadUserTags(context, userId) {
        console.log("유저 태그목록 비동기 요청 보냄")
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/user-tag/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("유저 태그목록 반환 완료");
        const responseData = await response.json();

        if (!response.ok) {
            console.log("유저 태그 목록 불러오기 실패")
            const error = new Error(responseData.message || '유저 태그 목록 반환 실패')
        }
        context.commit('setUserTags', responseData);
    },
    // async loadStudyTags(context, path) {
    //     console.log("스터디 태그목록 비동기 요청 보냄")
    //     const accessToken = store.getters['auth/token'];
    //
    //     const response = await fetch(`${apiUrl}/study-tag/${path}`, {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${accessToken}`,
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     console.log("스터디태그 목록 반환완료");
    //     const responseData = await response.json();
    //
    //     if (!response.ok) {
    //         console.log("스터디태그 목록 반환 실패");
    //         const error = new Error(responseData.message || '스터디 태그 목록 반환 실패')
    //     }
    //     context.commit('setStudyTags', responseData);
    // },
    async loadAllTags(context) {
        console.log("전체 태그목록 비동기 요청 보냄")
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/tag`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("전체 태그 목록 반환 완료")
        const responseData = await response.json();

        if (!response.ok) {
            console.log("전체 태그 목록 불러오기 실패")
            const error = new Error(responseData.message || '전체 태그 목록 반환 실패')
        }
        context.commit('setAllTags', responseData);
    }
};
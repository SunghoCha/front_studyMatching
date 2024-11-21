import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    async loadUserZones(context, userId) {
        console.log("유저 태그목록 비동기 요청 보냄")
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/user-zone/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("유저 지역 목록 반환 완료")

        const responseData = await response.json();

        if (!response.ok) {
            console.log("유저 지역 목록 불러오기 실패")
            const error = new Error(responseData.message || '유저 지역 목록 반환 실패')
        }
        context.commit('setUserZones', responseData);
    },

    async loadAllZones(context) {
        console.log("전체 지역 목록 비동기 요청 보냄")
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/zone`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log("전체 지역 목록 반환 완료")
        const responseData = await response.json();

        if (!response.ok) {
            console.log("전체 지역 목록 불러오기 실패")
            const error = new Error(responseData.message || '전체 지역 목록 반환 실패')
        }
        context.commit('setAllZones', responseData);
    },

    async editZone(context, {payload, userId}) {
        console.log("지역 수정 요청 전송 시작:" + userId);
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/user-tag/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                zones: payload.zones
            })
        });
        console.log("지역 수정 요청 전송 완료")

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'zone 등록에 실패하였습니다.')
        }
        context.commit("")
        return responseData.zone;
    },
};
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    async loadUserZones(context) {
        console.log("유저 지역 목록 비동기 요청 보냄")
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/user-zone`, {
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

        const response = await fetch(`${apiUrl}/zone/allZones`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log("전체 지역 목록 불러오기 실패")
            const error = new Error(responseData.message || '전체 지역 목록 반환 실패')
        }
        console.log("전체 지역 목록 반환 완료")
        context.commit('setAllZones', responseData);
    },

    async editZone(context, zoneIds) {
        console.log("지역 수정 요청 전송 시작:");
        const accessToken = store.getters['auth/token'];
        console.log("전달 데이터: ", JSON.stringify(zoneIds));
        const response = await fetch(`${apiUrl}/user-zone`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zoneIds)
        });
        console.log("지역 수정 요청 전송 완료")

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'zone 등록에 실패하였습니다.')
        }
        context.commit("setUserZones")
        return responseData;
    },
};
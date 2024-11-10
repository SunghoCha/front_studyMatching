import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    // 기본 GET 방식
    async loadItems(context) {

        const response = await fetch(
            `http://localhost:8080/api/items`
        );
        const responseData = await response.json();

        if (!response.ok) {
            console.log("Get 요청 실패");
            const error = new Error(responseData.message || 'Failed to fetch!');
            throw error;
        }

        const items = [];

        for (const key in responseData) {
            const item = {
                id: responseData[key].id,
                name: responseData[key].name,
                price: responseData[key].price,
                imgPath: responseData[key].imgPath,
                discountPer: responseData[key].discountPer
            }
            items.push(item);
        }
        context.commit('setItems', items);
        context.commit('setFetchTimestamp');
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
        console.log("유저 태그목록 반환 완료")
        const responseData = await response.json();

        if (!response.ok) {
            console.log("유저 태그 목록 불러오기 실패")
            const error = new Error(responseData.message || '유저 태그 목록 반환 실패')
        }
        context.commit('setUserTags', responseData);
    },

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
import store from "@/store";

const apiUrl = process.env.VUE_APP_API_URL;

export default {

    async registerEvent(context, {payload, path}) {
        const accessToken = store.getters['auth/token'];
        console.log("모임 등록 요청 전송 시작:", path)
        const response = await fetch(`${apiUrl}/study/${path}/events/new`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: payload.title,
                description: payload.description || "",
                endEnrollmentDateTime: payload.endEnrollmentDateTime,
                startDateTime: payload.startDateTime,
                endDateTime: payload.endDateTime,
                limitOfEnrollments: payload.limitOfEnrollments || 2
            })
        });
        const responseData = await response.json();

        if (!response.ok) {
            console.log("모임 생성 실패")
            throw new Error(responseData.errorMessage || '모임 등록에 실패하였습니다.')
        }
        return responseData;
    },
    async getEvent(context, {path, eventId}) {
        const accessToken = store.getters['auth/token'];
        console.log("모임 조회 요청 시작")

        const response = await fetch(`${apiUrl}/study/${path}/events/${eventId}`);

        const responseData = response.json();

        if (!response.ok) {
            console.log("모임 조회 실패")
            throw new Error(responseData.errorMessage || '모임 조회에 실패하였습니다.')
        }
        return responseData;
    },
    async getEvents(context, path) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/events`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json()

        if (!response.ok) {
            console.log("모임 목록 조회 실패")
            throw new Error(responseData.errorMessage || '모임 목록 조회에 실패하였습니다.')
        }
        context.commit("setEvents", responseData);

        return responseData;
    },
    // TODO: 이벤트 수정 로직
    async deleteEvent(context, path) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/events/${eventId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        const responseData = await response.json();

        if (!response.ok) {
            console.log("모임 삭제 실패");
            throw new Error(responseData.errorMessage || '모임 삭제에 실패하였습니다.');
        }
    },
    async registerEnrollment(context, {path, eventId}) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/events/${eventId}/enroll`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        const responseData = await response.json();

        if (!response.ok) {
            console.log("모임 참가신청 실패");
            throw new Error(responseData.errorMessage || '모임 참가에 실패하였습니다.')
        }
        context.commit("setEnrollment", responseData);

        return responseData;
    },
    async cancelEnrollment(context, path) {
        const accessToken = store.getters['auth/token'];

        const response = await fetch(`${apiUrl}/study/${path}/events/${eventId}/disenroll`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            }
        });
        const responseData = await response.json();

        if (!response.ok) {
            console.log("모임 참가 취소 실패");
            throw new Error(responseData.errorMessage || '모임 참가 취소에 실패하였습니다.');
        }
    },

};
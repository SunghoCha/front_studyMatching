import {jwtDecode} from "jwt-decode";

const apiUrl = process.env.VUE_APP_API_URL;

export default {
    async login(context, payload) {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            throw new Error(responseData.message || 'Failed to authenticate. Check your login data.');
        }

        console.log(responseData);
        context.commit('setUser', {
            token: responseData.idToken,
            userId: responseData.localId,
        });
    },

    async signup(context, payload) {
        const response = await fetch('http://localhost:8080/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: payload.nickname,
                email: payload.email,
                password: payload.password,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            throw new Error(responseData.message || 'Failed to registeration. Check your sign-up data.');

        }

        // 사용자 정보를 Vuex 스토어에 커밋
        // 응답값은 백엔드 인증,인가를 토큰방식으로 바꿀 때 수정 예정. 일단 단순히 Long id값만 반환
        console.log(responseData);
        context.commit('setUser', {
            token: responseData,
            userId: responseData,
        });
    },

    async checkNickname(context, payload) {
        const response = await fetch('http://localhost:8080/check-nickname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: payload.nickname,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.log(responseData);
            const error = new Error(responseData.message || 'Failed to check nickname. Check your nickname.');
            throw error;
        }

        console.log(responseData);
        context.commit('setCheckNickname', {
            isValidNickname: responseData,
        });
    },

    async editProfile(context, payload) {
        const accountId = payload.accountId;
        const response = await fetch(`http://localhost:8080/profile/${accountId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bio: payload.bio,
                url: payload.url,
                occupation: payload.occupation,
                location: payload.location
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || "프로필 변경에 실패하였습니다.")
        }

        //TODO AccountResponse 받아서 계정 정보 업데이트
    },

    async editPassword(context, payload) {
        const accountId = payload.accountId;
        const response = await fetch(`http://localhost:8080/password/${accountId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newPassword: payload.newPassword,
                newPasswordConfirm: payload.newPasswordConfirm
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || '비밀번호 변경에 실패하였습니다.');
        }
    },

    async editTag(context, {payload, userId}) {
        console.log("태그 수정 요청 전송 시작:" + userId);
        const response = await fetch(`${apiUrl}/user-tag/${userId}`, {
            method: 'PATCH',
            headers: {
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
        context.commit("")
        return responseData.tag;
    },
    async loginWithGoogle() {
        console.log("구글 로그인 요청")
        const response = await fetch(`${apiUrl}/oauth2/authorization/google`,)
        
        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || '로그인에 실패하였습니다.')
        }

        const accessToken = responseData.accessToken
        const refreshToken = responseData.refreshToken
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
        console.log("토큰 저장 완료")
        const decodedToken = jwtDecode(accessToken);

        commit('setUser', {
            id: decodedToken.id,
            email: decodedToken.email,
            token: accessToken,
            tokenExpiration: decodedToken.exp,
        })

        console.log("유저 정보 저장 완료. id :" + decodedToken.id,);
        //sendRedirect 로직 구현
    }
}

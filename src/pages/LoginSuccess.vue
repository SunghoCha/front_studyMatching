<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
        class="page-header-image"
        style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>

            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt=""/>
            </div>


            <template slot="raw-content">

              <div class="card-footer text-center">
                <h2>{{ name }}님, 환영합니다.</h2>
                <a
                    href="/landing"
                    class="btn btn-primary btn-round btn-lg btn-block"
                >홈으로 이동</a
                >
              </div>
              <div class="pull-left">
                <h6>
                  <a href="#pablo" class="link footer-link">Create Account</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Card, Button, FormGroupInput} from '@/components';
import {jwtDecode} from "jwt-decode";

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      name: '',
      error: null
    }
  },
  created() {
    this.handleRedirect(); // 컴포넌트가 마운트될 때 URL 파라미터 처리
  },
  methods: {
    handleRedirect() {
      console.log("토큰 저장 시작")
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      if (accessToken && refreshToken) {

        const decodedToken = jwtDecode(accessToken);
        console.log("id: " + decodedToken.id);
        console.log("email: " + decodedToken.email);
        console.log("name: " + decodedToken.name);

        this.$store.commit('auth/setUser', {
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken.name,
          token: accessToken,
          tokenExpiration: decodedToken.exp,
          refreshToken: refreshToken,
        });

        //const user = JSON.parse(sessionStorage.getItem("user"));
        console.log("유저 정보 저장 완료. id :" + this.$store.getters['auth/userId']);
        //const token = sessionStorage.getItem('accessToken');
        const token = this.$store.getters['auth/token'];
        if (token) {
          console.log('Access Token:', token);
        } else {
          console.log('No Access Token found.');
        }
      }
    }
  },
};
</script>
<style>


.social-icons {
  display: flex; /* 가로 배열 */
  justify-content: center; /* 가운데 정렬 */
  margin-top: 10px; /* 상단 여백 */
}

.social-icons a {
  display: inline-block; /* a태그를 inline-block으로 설정 */
  margin: 10px 25px; /* 아이콘 간격 (좌우 여백을 15px로 설정) */
}

.social-icon {
  width: 40px; /* 원하는 아이콘 너비 */
  height: 40px; /* 원하는 아이콘 높이 */
  object-fit: contain; /* 비율 유지 */
}

/* 버튼 색상 스타일 */
.btn-google {
  background-color: white !important; /* 흰색 */
  color: blue !important; /* 글자 색상 */
}

.btn.btn-google {
  color: blue !important; /* 버튼 클래스와 함께 사용 */
}

.btn-naver {
  background-color: green !important; /* 녹색 */
  color: white !important; /* 글자 색상 */
}

.btn-kakao {
  background-color: #ffeb3b !important; /* 노란색 */
  color: black !important; /* 글자 색상 */
}
</style>
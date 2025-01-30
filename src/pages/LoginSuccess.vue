<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
        class="page-header-image"
        style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <base-card type="login" plain>

            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt=""/>
            </div>


            <template slot="raw-content">

              <div class="card-footer text-center">
                <h2>{{ name }}님, 환영합니다.</h2>
                <a
                    href="/study-list"
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
          </base-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Card, Button, FormGroupInput} from '@/components';
import {jwtDecode} from "jwt-decode";
import BaseCard from "@/components/Cards/BaseCard.vue";

export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    BaseCard,
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
      console.log("accessToken: " + accessToken);

      if (!accessToken || !refreshToken) {
        this.clearAuthState();
        this.error = "유효하지 않은 로그인 요청입니다.";
        console.error(this.error);
        this.$router.push("login");
        return;
      }

      try {
        const decodedToken = jwtDecode(accessToken);

        if (decodedToken.exp * 1000 < Date.now()) {
          this.clearAuthState();
          this.error = "로그인 세션이 만료되었습니다. 다시 로그인해주세요.";
          console.error(this.error);
          this.$router.push("/login");
          return;
        }

        console.log("id: " + decodedToken.id);
        console.log("email: " + decodedToken.email);
        console.log("name: " + decodedToken.name);

        this.name = decodedToken.name;
        this.$store.commit('auth/setUser', {
          id: decodedToken.id,
          email: decodedToken.email,
          name: decodedToken.name,
          token: accessToken,
          tokenExpiration: decodedToken.exp,
          refreshToken: refreshToken,
        });

        console.log("유저 정보 저장 완료. id :" + this.$store.getters['auth/userId']);
        // URL에서 토큰 파라미터 제거
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);


      } catch (error) {
        this.error = "토큰 처리 중 오류가 발생했습니다.";
        console.error(this.error);
        this.$router.push('/login');
      }
    },


    clearAuthState() {
      console.log("저장된 사용자 정보 초기화");
      this.$store.commit('auth/clearUser');
    }
  },
};
</script>
<style>

</style>
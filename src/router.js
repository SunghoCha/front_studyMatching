import Vue from 'vue';
import Router from 'vue-router';
import Login from "@/pages/Login.vue";
import MainFooter from "@/layout/MainFooter.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import Landing from "@/pages/Landing.vue";
import LoginSuccess from "@/pages/LoginSuccess.vue";
import Profile from "@/pages/Profile.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history', // history 모드 사용
  routes: [
    { path: '/login',
      name: 'login',
      components: {default: Login, header: MainNavbar, footer: MainFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/landing',
      name: 'landing',
      components: { default: Landing, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/login-success',
      name: 'loginSuccess',
      components: { default: LoginSuccess, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: { default: Profile, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // 토큰이 존재하는지 확인
  console.log('isAuthenticated:', isAuthenticated);

  // 로그인 경로가 아닌 모든 경로에 대해 인증 여부 확인
  if (to.name !== 'login' && !isAuthenticated) {
    console.log('인증되지 않은 사용자.');
    next({ name: 'login' }); // 로그인 페이지로 리다이렉트
  }
  // 이미 인증된 사용자가 로그인 페이지에 접근하려 할 경우
  else if (to.name === 'login' && isAuthenticated) {
    console.log('이미 인증된 사용자');
    next({ name: 'landing' }); // 홈 페이지로 리다이렉트
  }
  else {
    console.log('else');
    next(); // 다음 단계로 진행
  }
});



export default router;

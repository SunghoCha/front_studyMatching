import Vue from 'vue';
import Router from 'vue-router';
import Login from "@/pages/Login.vue";
import MainFooter from "@/layout/MainFooter.vue";
import MainNavbar from "@/layout/MainNavbar.vue";

Vue.use(Router);

const router = new Router({
  mode: 'history', // history 모드 사용
  routes: [
    { path: '/login',
      components: {default: Login, header: MainNavbar, footer: MainFooter},
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },

  ]
});

export default router;

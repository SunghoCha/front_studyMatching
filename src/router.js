import Vue from 'vue';
import Router from 'vue-router';
import Login from "@/pages/Login.vue";
import MainFooter from "@/layout/MainFooter.vue";
import MainNavbar from "@/layout/MainNavbar.vue";
import Landing from "@/pages/Landing.vue";
import LoginSuccess from "@/pages/LoginSuccess.vue";
import Profile from "@/pages/Profile.vue";
import editTagForm from "@/pages/EditTagForm.vue";
import editZoneForm from "@/pages/EditZoneForm.vue";
import studyForm from "@/pages/StudyForm.vue";
import studyInfo from "@/pages/StudyInfo.vue";
import studyInfo2 from "@/pages/StudyInfo2.vue";
import studyList from "@/pages/StudyList.vue";
import EventForm from "@/pages/EventForm.vue";
import allStudyList from "@/pages/AllStudyList.vue";
import myStudyList from "@/pages/ManagedStudyList.vue";
import managedStudyList from "@/pages/ManagedStudyList.vue";
import joinedStudyList from "@/pages/JoinedStudyList.vue";
import studyWishList from "@/pages/StudyWishList.vue";
import Notifications from "@/pages/Notifications.vue";
import EventInfo from "@/pages/EventInfo.vue";


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
    },
    {
      path: '/tag',
      name: 'editTagForm',
      components: { default: editTagForm, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/zone',
      name: 'editZoneForm',
      components: { default: editZoneForm, header: MainNavbar, footer: MainFooter },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/study-form',
      name: 'StudyForm',
      components: { default: studyForm, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/study-info/:path',
      name: 'StudyInfo',
      components: { default: studyInfo, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: "/study-info/:path/events/:eventId",
      name: "EventDetails",
      component: EventInfo,
    },
    {
      path: '/study-list',
      name: 'AllStudyList',
      components: { default: allStudyList, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/managed-study-list',
      name: 'ManagedStudyList',
      components: { default: managedStudyList, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/joined-study-list',
      name: 'JoinedStudyList',
      components: { default: joinedStudyList, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/study-wishlist',
      name: 'StudyWishlist',
      components: { default: studyWishList, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/study-event',
      name: 'EventForm',
      components: { default: EventForm, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },
    {
      path: '/notifications',
      name: 'Notifications',
      components: { default: Notifications, header: MainNavbar, footer: MainFooter },
      props: {
        footer: { backgroundColor: 'black' }
      }
    },

  ]
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.getters['auth/token'];
//   console.log('isAuthenticated:', isAuthenticated);
//   console.log('name:', to.name);
//
//   // 로그인 경로가 아닌 모든 경로에 대해 인증 여부 확인
//   if (to.name === 'loginSuccess' && !isAuthenticated) {
//     console.log('로그인 처리중입니다. 인증 완료까지 대기')
//     next();
//   } else if (to.name !== 'login' && !isAuthenticated) {
//     console.log('인증되지 않은 사용자.');
//     next({ name: 'login' }); // 로그인 페이지로 리다이렉트
//   }
//   // 이미 인증된 사용자가 로그인 페이지에 접근하려 할 경우
//   else if (to.name === 'login' && isAuthenticated) {
//     const user = sessionStorage.getItem("user")
//     console.log('이미 인증된 사용자: ' + user.id);
//     next({ name: 'landing' }); // 홈 페이지로 리다이렉트
//   }
//   else {
//     console.log('else');
//     next(); // 다음 단계로 진행
//   }
// });



export default router;

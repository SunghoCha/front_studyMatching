<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <n-button
          tag="button"
          type="link"
          class="navbar-brand"
          @click="handleLoginLogout"
      >
        <span class="custom-login-text" v-if="!isLoggedIn">로그인</span>
        <span class="custom-login-text" v-else>{{ userName }}님,&nbsp;&nbsp;로그아웃</span>
      </n-button>
      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <nav-link to="/study-list" class="nav-link home-link">
          <i class="now-ui-icons business_bank"></i> Home
        </nav-link>
      </li>
      <drop-down
          tag="li"
          title="내 정보"
          icon="now-ui-icons education_paper"
          class="nav-item"
      >
        <nav-link to="/tag">
          <i class="now-ui-icons education_paper"></i> 관심 태그
        </nav-link>
        <nav-link to="/zone">
          <i class="now-ui-icons users_circle-08"></i> 관심 지역
        </nav-link>
        <nav-link to="/study-wishlist">
          <i class="now-ui-icons users_circle-08"></i> 관심 스터디
        </nav-link>
      </drop-down>
      <drop-down
              tag="li"
              title="스터디 관리"
              icon="now-ui-icons education_paper"
              class="nav-item"
      >
        <nav-link to="/study-list">
          <i class="now-ui-icons education_paper"></i> 스터디목록
        </nav-link>
        <nav-link to="/managed-study-list">
          <i class="now-ui-icons users_circle-08"></i> 관리 스터디
        </nav-link>
        <nav-link to="/joined-study-list">
          <i class="now-ui-icons users_circle-08"></i> 가입 스터디
        </nav-link>
        <nav-link to="/study-form">
          <i class="now-ui-icons users_single-02"></i> 스터디 만들기
        </nav-link>
      </drop-down>
      <li class="nav-item">
        <a
          class="nav-link btn btn-neutral"
          href="https://www.creative-tim.com/product/vue-now-ui-kit-pro"
          target="_blank"
        >
          <i class="now-ui-icons arrows-1_share-66"></i>
          <p>Upgrade to PRO</p>
        </a>
      </li>

      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Twitter"
          data-placement="bottom"
          href="https://twitter.com/CreativeTim"
          target="_blank"
        >
          <i class="fab fa-twitter"></i>
          <p class="d-lg-none d-xl-none">Twitter</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Like us on Facebook"
          data-placement="bottom"
          href="https://www.facebook.com/CreativeTim"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Follow us on Instagram"
          data-placement="bottom"
          href="https://www.instagram.com/CreativeTimOfficial"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
          <p class="d-lg-none d-xl-none">Instagram</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';
import { Popover } from 'element-ui';
import NButton from "@/components/Button.vue";
export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    NButton,
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    userName() {
      return this.$store.getters["auth/userName"];
    },
  },
  methods: {
    handleLoginLogout() {
      if (this.isLoggedIn) {
        this.$store.commit("auth/clearUser");
        this.$router.push("/login");
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.custom-login-text {
  color: white; /* 텍스트 색상 흰색 */
}
.home-link {
  color: white !important; /* Home 링크에만 흰색 적용 */
}

</style>

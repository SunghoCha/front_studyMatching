<template>
  <navbar
      position="fixed"
      type="primary"
      :transparent="transparent"
      :color-on-scroll="colorOnScroll"
      menu-classes="d-flex justify-content-between w-100"
  >

    <template slot="navbar-menu">
      <!-- 🔹 왼쪽 메뉴 -->
      <div class="d-flex align-items-center">
        <li class="nav-item">
          <nav-link to="/study-list" class="nav-link home-link">
            <i class="now-ui-icons business_bank"></i> Home
          </nav-link>
        </li>






        <drop-down tag="li" title="내 정보" icon="now-ui-icons education_paper" class="nav-item">
          <nav-link to="/tag"><i class="now-ui-icons education_paper"></i> 관심 태그</nav-link>
          <nav-link to="/zone"><i class="now-ui-icons users_circle-08"></i> 관심 지역</nav-link>
          <nav-link to="/study-wishlist"><i class="now-ui-icons users_circle-08"></i> 관심 스터디</nav-link>
        </drop-down>

        <drop-down tag="li" title="스터디 관리" icon="now-ui-icons education_paper" class="nav-item">
          <nav-link to="/study-list"><i class="now-ui-icons education_paper"></i> 스터디 목록</nav-link>
          <nav-link to="/managed-study-list"><i class="now-ui-icons users_circle-08"></i> 관리 스터디</nav-link>
          <nav-link to="/joined-study-list"><i class="now-ui-icons users_circle-08"></i> 가입 스터디</nav-link>
          <nav-link to="/study-form"><i class="now-ui-icons users_single-02"></i> 스터디 만들기</nav-link>
        </drop-down>
      </div>

      <!-- 🔹 오른쪽 정렬 & 검색 기능 -->
      <div class="d-flex align-items-center ml-auto">
        <!-- 제목 정렬 -->
        <div class="form-group mr-3">

          <select id="titleSortOptions" class="form-control styled-select" v-model="titleSort" @change="onSortChange">
            <option value="titleAsc">제목 오름차순</option>
            <option value="titleDesc">제목 내림차순</option>
          </select>
        </div>

        <!-- 날짜 정렬 -->
        <div class="form-group mr-3">

          <select id="dateSortOptions" class="form-control styled-select" v-model="dateSort" @change="onSortChange">
            <option value="dateAsc">오래된 순</option>
            <option value="dateDesc">최신순</option>
          </select>
        </div>

        <!-- 검색 -->
        <div class="search-group d-flex">
          <input type="text" id="search" class="form-control search-input" placeholder="검색어 입력" v-model="searchQuery"/>
          <button class="btn search-button" @click="onSearch">
            <i class="fas fa-search"></i> <!-- 🔍 돋보기 아이콘 적용 -->
          </button>
          <button class="btn reset-button" @click="onResetSearch">
            <i class="fas fa-times"></i> <!-- ❌ 리셋 버튼 -->
          </button>
        </div>
      </div>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from '@/components';


export default {
  name: 'main-navbar',
  props: {
    transparent: Boolean,
    colorOnScroll: Number
  },
  components: {
    DropDown,
    Navbar,
    NavLink
  },
  data() {
    return {
      titleSort: "titleAsc",
      dateSort: "dateDesc",
      searchQuery: "",
    };
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
    onSortChange() {
      const sortOptions = [];
      if (this.titleSort) {
        sortOptions.push({
          type: "title",
          order: this.titleSort === "titleAsc" ? "asc" : "desc",
        });
      }
      if (this.dateSort) {
        sortOptions.push({
          type: "publishedDateTime",
          order: this.dateSort === "dateAsc" ? "asc" : "desc",
        });
      }
      this.$emit("sortChanged", sortOptions);
    },
    onSearch() {
      this.searchQueryUpdated();
    },
    onResetSearch() {
      this.searchQuery = "";
      this.searchQueryUpdated();
    },
    searchQueryUpdated() {
      this.$emit("searchQueryUpdated", this.searchQuery);
    },
  },
};
</script>

<style scoped>
/* 🔹 네비게이션 메뉴 스타일 */
.navbar-menu {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center; /* 중앙 정렬 */
}

/* 🔹 검색 그룹 스타일 */
.search-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 🔹 검색 입력 필드와 드롭다운 높이 맞추기 */
.search-input, .styled-select {
  height: 38px; /* 높이 통일 */
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.5);
  padding: 8px;
  font-size: 14px;
  color: #333;
}

/* 🔹 드롭다운 컨테이너 */
.form-group {
  display: flex;
  align-items: center; /* 수직 정렬 */
  gap: 8px; /* 간격 조절 */
  margin-bottom: 0; /* 정렬을 위해 기본 여백 제거 */
}

/* 🔹 검색 버튼 스타일 */
.search-button {
  height: 38px;
  border-radius: 8px;
  background-color: rgba(255, 140, 0, 0.8);
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔹 리셋 버튼 스타일 */
.reset-button {
  height: 38px;
  border-radius: 8px;
  background-color: rgba(255, 99, 71, 0.8);
  color: white;
  border: none;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🔹 버튼 내부 아이콘 크기 조정 */
.search-button i, .reset-button i {
  font-size: 16px;
}

/* 🔹 드롭다운 스타일 */
.styled-select {
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.5);
  padding: 5px;
  font-size: 14px;
}

/* 🔹 네비게이션 전체 정렬 */
.navbar-menu > div {
  display: flex;
  align-items: center;
  gap: 15px; /* 요소 간 간격 조정 */
}

/* 🔹 검색 그룹 여백 조정 */
.search-group {
  margin-left: auto; /* 오른쪽 정렬 */
}

.home-link {
  color: white !important; /* 글씨 색상 흰색 */
}

.home-link i {
  color: white !important; /* 아이콘 색상 흰색 */
}





</style>

<template>
  <div class="container">
    <navbar type="primary">
      <template slot="navbar-menu">
        <!-- 제목 정렬 -->
        <li class="nav-item">
          <div class="form-group">
            <label for="titleSortOptions" class="form-label">제목 정렬</label>
            <select
                id="titleSortOptions"
                class="form-control"
                v-model="titleSort"
                @change="onSortChange"
            >
              <option value="titleAsc">제목 오름차순</option>
              <option value="titleDesc">제목 내림차순</option>
            </select>
          </div>
        </li>

        <!-- 날짜 정렬 -->
        <li class="nav-item">
          <div class="form-group">
            <label for="dateSortOptions" class="form-label">날짜 정렬</label>
            <select
                id="dateSortOptions"
                class="form-control"
                v-model="dateSort"
                @change="onSortChange"
            >
              <option value="dateAsc">오래된 순</option>
              <option value="dateDesc">최신순</option>
            </select>
          </div>
        </li>

        <!-- 검색 -->
        <li class="nav-item search-group">
          <input
              type="text"
              id="search"
              class="form-control search-input"
              placeholder="Search..."
              v-model="searchQuery"
              @input="onSearchInput"
          />
          <button class="btn btn-primary search-button" @click="onSearch">
            Search
          </button>
        </li>
      </template>
    </navbar>
  </div>
</template>

<script>
import {Navbar} from "@/components";

export default {
  components: {Navbar},
  data() {
    return {
      titleSort: "titleAsc", // 제목 정렬 상태
      dateSort: "dateDesc",          // 날짜 정렬 초기화
      searchQuery: "",
    };
  },
  methods: {
    onSortChange() {
      console.log("Title Sort:", this.titleSort);
      console.log("Date Sort:", this.dateSort);

      const sortOptions = [];

      // 제목 정렬이 활성화된 경우 추가
      if (this.titleSort) {
        sortOptions.push({
          type: "title",
          order: this.titleSort === "titleAsc" ? "asc" : "desc",
        });
      }

      // 날짜 정렬이 활성화된 경우 추가
      if (this.dateSort) {
        sortOptions.push({
          type: "publishedDateTime",
          order: this.dateSort === "dateAsc" ? "asc" : "desc",
        });
      }

      console.log("Emitting sortChanged event with options:", sortOptions);
      this.$emit("sortChanged", sortOptions);
    },
    onSearchInput() {
      console.log("Search query input:", this.searchQuery);
      this.searchQueryUpdated(); // 실시간 검색
    },
    onSearch() {
      console.log("Search button clicked. Search query:", this.searchQuery);
      this.searchQueryUpdated(); // 버튼 검색
    },
    searchQueryUpdated() {
      this.$emit("searchQueryUpdated", this.searchQuery);
    },
  },
};
</script>

<style scoped>
/* Navbar 전체 레이아웃 */
::v-deep(.navbar-nav) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

/* Search group */
::v-deep(.search-group) {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 검색 입력 스타일 */
::v-deep(.search-input) {
  flex-grow: 1;
  height: 38px;
}

/* 검색 버튼 스타일 */
::v-deep(.search-button) {
  height: 38px;
  line-height: 1.2;
}
</style>

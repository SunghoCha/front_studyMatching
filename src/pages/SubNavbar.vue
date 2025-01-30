<template>
  <div class="container">
    <navbar class="subbar" type="primary">
      <template slot="navbar-menu">
        <!-- 제목 정렬 -->
        <li class="nav-item">
          <div class="form-group">
            <label for="titleSortOptions" class="form-label">제목 정렬</label>
            <select
                id="titleSortOptions"
                class="form-control styled-select"
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
                class="form-control styled-select"
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
          />
          <button class="btn search-button" @click="onSearch">
            Search
          </button>
          <button class="btn reset-button" @click="onResetSearch">
            <i class="fas fa-times"></i>
          </button>
        </li>
      </template>
    </navbar>
  </div>
</template>

<script>
import { Navbar } from "@/components";

export default {
  components: { Navbar },
  data() {
    return {
      titleSort: "titleAsc",
      dateSort: "dateDesc",
      searchQuery: "",
    };
  },
  methods: {
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
/* Subbar 스타일 */
.subbar {
  background-color: #f96332; /* 새로운 색상 */
  padding: 10px 20px;
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 살짝 음영 */
}

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
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.5);
  padding: 8px;
  font-size: 14px;
  color: #333;
}

/* 검색 버튼 스타일 */
::v-deep(.search-button) {
  height: 38px;
  border-radius: 8px;
  background-color: rgba(255, 140, 0, 0.8);
  color: white;
  border: none;
  padding: 0 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

/* 리셋 버튼 스타일 */
::v-deep(.reset-button) {
  height: 38px;
  border-radius: 8px;
  background-color: rgba(255, 99, 71, 0.8);
  color: white;
  border: none;
  padding: 0 15px;
  font-size: 14px;
  cursor: pointer;
}

/* Hover 효과 */
::v-deep(.search-button:hover),
::v-deep(.reset-button:hover) {
  filter: brightness(1.1);
}

/* Select 스타일 */
::v-deep(.styled-select) {
  border-radius: 8px;
  background-color: rgba(255, 165, 0, 0.1);
  border: 1px solid rgba(255, 165, 0, 0.5);
  padding: 5px;
  font-size: 14px;
}
</style>

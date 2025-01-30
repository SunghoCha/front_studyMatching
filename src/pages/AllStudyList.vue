<template>
  <div class="page-header clear-filter" filter-color="orange">

    <div class="content">
      <study-list ref="studyList" :fetchStudies="fetchStudies"/>

    </div>
  </div>
</template>

<script>

import StudyList from "@/pages/StudyList.vue";


export default {
  components: {
    StudyList
  },
  data() {
    return {
      studyList: [],
      filteredStudyList: [],
      paginationInfo: {
        currentPage: 1,
        totalPages: 0,
        totalCount: 0,
        size: 0,
      },
      sortOption: [],
      searchQuery: "",
    };
  },
  methods: {
    fetchStudies(page) {
      return this.$store.dispatch("studies/loadStudies", {
        page: page - 1,
        sortOptions: this.sortOption,
        search: this.searchQuery,
      });
    },
    handleSortChanged(sortOptions) {
      console.log("Received sort options:", sortOptions);
      this.sortOption = sortOptions;

      // 정렬 옵션 변경 시 데이터를 다시 로드
      this.$refs.studyList.loadStudies(this.paginationInfo.currentPage);
    },
    handleSearchQueryUpdated(searchQuery) {
      console.log("Search query updated:", searchQuery);
      this.searchQuery = searchQuery;

      // 검색어 변경 시 데이터를 다시 로드
      this.$refs.studyList.loadStudies(1);
    },
  },
};
</script>

<style scoped>


.page-header {
  min-height: 100vh;
  overflow: auto;
}





::v-deep(.custom-card-style .card-title) {
  font-size: 1.5rem;
  color: #000;
  margin-bottom: 10px;
}

::v-deep(.custom-card-style .card-description) {
  font-size: 1rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}

::v-deep(.custom-card-style .view-details) {
  font-size: 0.875rem;
  color: white;
  background-color: #007bff;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute;
  bottom: 16px;
  right: 16px;
}


</style>

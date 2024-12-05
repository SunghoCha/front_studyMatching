<template>

    <div class="content">
      <div class="container">

        <div class="row">
          <div class="custom-card" v-for="study in filteredStudyList" :key="study.path">
            <card
                :title="study.title"
                :description="study.shortDescription"
                customClass="custom-card-style custom-card-bg"
            >
              <!-- 태그 렌더링 -->
              <div class="tags">
                <span
                    v-for="(tag, index) in study.tags"
                    :key="index"
                    class="tag"
                >
                  {{ tag.tag }}
                </span>
              </div>
              <template #footer>
                <router-link
                    :to="`/study-info/${study.path}`"
                    class="btn btn-primary view-details"
                >
                  View Details
                </router-link>
              </template>
            </card>
          </div>
        </div>

        <!-- 페이지네이션 -->
        <div class="pagination">
          <button @click="goToPage(1)" :disabled="paginationInfo.currentPage === 1">First</button>
          <button @click="goToPage(paginationInfo.currentPage - 1)" :disabled="paginationInfo.currentPage === 1">Prev</button>
          <span>Page {{ paginationInfo.currentPage }} of {{ paginationInfo.totalPages }}</span>
          <button @click="goToPage(paginationInfo.currentPage + 1)" :disabled="paginationInfo.currentPage === paginationInfo.totalPages">Next</button>
          <button @click="goToPage(paginationInfo.totalPages)" :disabled="paginationInfo.currentPage === paginationInfo.totalPages">Last</button>
        </div>
      </div>
    </div>

</template>

<script>
import Card from "@/components/Cards/Card.vue";


export default {
  components: {
    Card,

  },
  props: {
    fetchStudies: Function,
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
  async mounted() {
    await this.loadStudies(1);
  },
  methods: {
    async loadStudies(page) {
      const { studyList, paginationInfo } = await this.fetchStudies(page);
      this.studyList = studyList;
      this.filteredStudyList = studyList;
      this.paginationInfo = paginationInfo;
    },
    goToPage(page) {
      this.loadStudies(page);
    },
  },
};
</script>

<style scoped>
.study-list-container {
  position: relative; /* 스터디 리스트 컨테이너의 기준점 설정 */
  z-index: 1; /* SubNavbar와 드롭다운 메뉴보다 낮게 설정 */
}
.page-header {
  min-height: 100vh;
  overflow: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.custom-card {
  flex: 0 0 calc(33.333% - 20px);
  height: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.custom-card-style {
  background-color: #eaeaea;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
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

.tags {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #f0f0f0;
  color: #333;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 0.85rem;
  display: inline-block;
  white-space: nowrap;
}

.sub-navbar {
  margin-top: 70px; /* main-navbar의 높이만큼 여백 추가 */
  background-color: #f8f9fa;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}
</style>

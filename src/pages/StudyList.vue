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
            <!-- 카드에 이미지 추가 -->
            <template #image>
              <div class="image-container">
                <img :src= "study.image || '/img/banner1.png'" alt="Study Banner" class="image-crop" />
              </div>
            </template>

            <!-- 태그와 버튼을 한 줄로 배치 -->
            <template #default>
              <div class="tags-and-button">
                <div class="tags">
                  <span
                      v-for="(tag, index) in study.tags"
                      :key="index"
                      class="tag"
                  >
                    {{ tag.tag }}
                  </span>
                </div>
                <router-link
                    :to="`/study-info/${study.path}`"
                    class="btn btn-primary view-details"
                >
                  View Details
                </router-link>
              </div>
            </template>
          </card>
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div class="pagination">
        <button @click="goToPage(1)" :disabled="paginationInfo.currentPage === 1">First</button>
        <button @click="goToPage(paginationInfo.currentPage - 1)" :disabled="paginationInfo.currentPage === 1">Prev</button>
        <span>Page {{ paginationInfo.currentPage }} of {{ paginationInfo.totalPages }}</span>
        <button @click="goToPage(paginationInfo.currentPage + 1)"
                :disabled="paginationInfo.currentPage === paginationInfo.totalPages">Next</button>
        <button @click="goToPage(paginationInfo.totalPages)"
                :disabled="paginationInfo.currentPage === paginationInfo.totalPages">Last</button>
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

      console.log('Study List:', studyList.map(study => ({ path: study.path, image: study.image })));

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
/* 컨테이너 및 행 설정 */
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 카드들을 가운데 정렬 */
  gap: 20px; /* 카드 간의 간격 */
}

/* 카드 크기 조정 및 정렬 */
.custom-card {
  flex: 0 0 calc(33.333% - 20px); /* 카드의 너비를 3등분 */
  box-sizing: border-box; /* 패딩과 보더를 포함한 크기 계산 */
  display: flex;
  flex-direction: column;
}

/* 태그와 버튼 배치 */
.tags-and-button {
  display: flex;
  justify-content: space-between; /* 태그는 왼쪽, 버튼은 오른쪽 */
  align-items: center; /* 세로 정렬 */
  margin-top: 10px;
}

.tags {
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

/* 버튼 스타일 */
.view-details {
  font-size: 0.875rem;
  color: white;
  background-color: #007bff;
  border-radius: 4px;
  padding: 5px 10px;
  text-decoration: none; /* 링크 스타일 제거 */
}

/* 카드 내부 이미지 스타일 */
.image-crop {
  width: 100%;
  height: auto; /* 비율 유지 */
  margin-bottom: 15px;
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}
</style>

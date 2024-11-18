<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="custom-card" v-for="study in studyList" :key="study.path">
            <card
                :title="study.title"
                :description="study.shortDescription"
                customClass="custom-card-style custom-card-bg"
            >
              <template #footer>
                <router-link
                    :to="`/study/${study.path}`"
                    class="btn btn-primary view-details"
                >
                  View Details
                </router-link>
              </template>
            </card>
          </div>
        </div>
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
  data() {
    return {
      studyList: [],
    };
  },
  async mounted() {
    try {
      const studies = await this.$store.dispatch("studies/loadStudies");
      this.studyList = studies;
    } catch (error) {
      console.error("스터디 목록 로드 실패:", error);
    }
  },
};
</script>

<style scoped>
.page-header {
  min-height: 100vh;
  overflow: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.custom-card {
  flex: 0 0 calc(33.333% - 20px);
  height: 250px; /* 카드의 높이를 고정 */
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.custom-card-style {
  background-color: #EAEAEA; /* 진한 회색 */
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%; /* 부모의 높이에 맞춰서 내부 카드 크기 고정 */
  overflow: hidden; /* 내용이 넘칠 경우 잘라내기 */
  position: relative; /* 버튼을 절대 위치로 배치할 수 있도록 설정 */
}

::v-deep(.custom-card-style .card-title) {
  font-size: 1.5rem; /* 제목 글씨 크기 */
  color: #000; /* 제목 글씨 색 */
  margin-bottom: 10px; /* 제목과 설명 사이의 간격 */
}

::v-deep(.custom-card-style .card-description) {
  font-size: 1rem; /* 설명 글씨 크기 */
  color: #666; /* 설명 글씨 색 */
  overflow: hidden; /* 설명이 넘칠 경우 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 "..." 표시 */
  display: -webkit-box;
  -webkit-line-clamp: 1; /* 최대 1줄까지만 표시 */
  -webkit-box-orient: vertical;

  /* 표준 속성 (브라우저 호환성을 위해) */
  line-clamp: 3; /* 최대 3줄까지만 표시 */
  box-orient: vertical;
}

::v-deep(.custom-card-style .view-details) {
  font-size: 0.875rem; /* 버튼 글씨 크기 */
  color: white;
  background-color: #007bff;
  border-radius: 4px;
  padding: 5px 10px;
  position: absolute; /* 버튼을 절대 위치로 배치 */
  bottom: 16px; /* 카드의 하단에 위치 */
  right: 16px; /* 카드의 오른쪽에 위치 */
}
</style>

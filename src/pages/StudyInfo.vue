<template>
  <div>

    <!-- Page Content -->
    <div class="page-header clear-filter" filter-color="orange">
      <div class="content">
        <div class="container">
          <div class="row">

            <!-- Main Content Column -->
            <div class="col-md-12">
              <div class="study-info">
                <!-- Study Info Header -->
                <div class="row pt-4 text-left justify-content-center">
                  <div class="col-6">
                    <a :href="'/study/' + study.path" class="text-decoration-none">
                      <span class="h2">{{ study.title }}</span>
                    </a>
                  </div>
                  <div class="col-4 text-right justify-content-end">
                    <!-- DRAFT, CLOSED, OFF Buttons -->
                    <!-- Buttons for DRAFT, CLOSED, OFF, Join/Leave -->
                  </div>
                </div>

                <!-- Study Short Description -->
                <div class="row justify-content-center">
                  <div class="col-10 study-short-description">
                    <p class="lead">{{ study.shortDescription }}</p>
                  </div>
                </div>

                <!-- Tags and Zones -->
                <div class="row justify-content-center">
                  <div class="col-10">
                    <p>
                      <span v-for="tag in study.tags" :key="tag.title"
                            class="font-weight-light text-monospace badge badge-pill badge-info mr-3">
                        <a :href="'/search/tag/' + tag.title" class="text-decoration-none text-white">
                          <i class="fa fa-tag"></i> <span>{{ tag.tag }}</span>
                        </a>
                      </span>

                      <span v-for="zone in study.zones" :key="zone.id"
                            class="font-weight-light text-monospace badge badge-primary mr-3">
                        <a :href="'/search/zone/' + zone.id" class="text-decoration-none text-white">
                          <i class="fa fa-globe"></i> <span>{{ zone.localName }}</span>
                        </a>
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <!-- Study Menu Tabs Component -->
              <study-menu :study="study" :loading="!study.path"></study-menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudyMenu from "@/pages/StudyMenu.vue";

export default {
  components: {
    StudyMenu,
  },
  props: ["path"],
  data() {
    return {
      errorModalVisible: false, // 모달 표시 여부
      errorMessage: "", // 에러 메시지
    };
  },
  computed: {
    study() {
      return this.$store.getters["studies/currentStudy"];
    },
  },
  mounted() {
    this.loadStudyData();
  },
  methods: {
    async loadStudyData() {
      try {
        const path = this.$route.params.path;
        console.log("path 정보:" + path);
        await this.$store.dispatch("studies/loadStudy", path);
        console.log("study 정보: " + JSON.stringify(this.study, null, 2));
      } catch (error) {
        console.error("스터디 데이터를 로드하는 중 오류 발생:", error);
        this.errorModalVisible = true;
        this.errorMessage = "스터디 데이터를 로드하는 중 문제가 발생했습니다.";
      }
    },
    handleErrorModalClose() {
      this.errorModalVisible = false;
    },
    redirectToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.study-info .h2 {
  color: white;
}

.study-info .col-6 {
  margin-bottom: 30px;
}

.page-header {
  min-height: 100vh;
  overflow: auto;
}

.modal.show {
  background-color: rgba(0, 0, 0, 0.3);
}

.study-info .study-short-description p{
  color: white; /* 텍스트를 흰색으로 강제 설정 */
  padding: 1rem; /* 내부 여백 */
  border-radius: 10px; /* 둥근 모서리 */
  text-align: center; /* 텍스트 중앙 정렬 */
  margin-bottom: 1rem; /* 아래 여백 */
}

.study-info .study-short-description .lead {
  margin: 0; /* 기본 여백 제거 */
  line-height: 1.8; /* 줄 간격 */
}
</style>

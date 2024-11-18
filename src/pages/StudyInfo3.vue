<template>
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
                <div class="col-10">
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
                        <i class="fa fa-tag"></i> <span>{{ tag.title }}</span>
                      </a>
                    </span>

                    <span v-for="zone in study.zones" :key="zone.id"
                          class="font-weight-light text-monospace badge badge-primary mr-3">
                      <a :href="'/search/zone/' + zone.id" class="text-decoration-none text-white">
                        <i class="fa fa-globe"></i> <span>{{ zone.localNameOfCity }}</span>
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <!-- Study Menu Tabs Component -->
            <study-menu2 :study="study" :loading="!study.path"></study-menu2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudyMenu2 from "@/pages/StudyMenu2.vue";

export default {
  components: {
    StudyMenu2,
  },
  data() {
    return {
      study: {},
    };
  },
  mounted() {
    this.loadStudyData();
  },
  methods: {
    async loadStudyData() {
      try {
        const path = this.$route.params.path;
        this.study = await this.$store.dispatch("studies/loadStudy", path);
        console.log("study 정보: " + this.study);
      } catch (error) {
        console.error("스터디 데이터를 로드하는 중 오류 발생:", error);
      }
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

</style>


<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="content">
      <div class="container">
        <div class="row">
          <!-- Sidebar Column -->
          <div class="col-md-2">
            <StudySidebar :currentMenu="studyMenu" />
          </div>

          <!-- Main Content Column -->
          <div class="col-md-10">
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
            <study-menu :study="study" :studyMenu="studyMenu" :isAuthenticated="isAuthenticated" :currentUser="currentUser"></study-menu>

            <div class="row px-3 justify-content-center">
              <div class="col-10 pt-3">{{ study.fullDescription }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StudyMenu from './StudyMenu.vue';
import StudySidebar from "@/pages/StudySidebar.vue";

export default {
  components: {
    StudyMenu,StudySidebar
  },
  data() {
    return {
      study: {
        path: 'example-study',
        title: '예시 스터디 제목',
        published: false,
        closed: false,
        recruiting: true,
        shortDescription: '이 스터디는 예시입니다.',
        fullDescription: "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다.스터디 관련 긴 글입니다." +
            "=========================================================================================================================" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "" +
            "",
        tags: [{ title: '프로그래밍' }, { title: '자기개발' }],
        zones: [{ id: 1, localNameOfCity: '서울' }],
        members: [1, 2, 3],
        isJoinable: (user) => true, // 임시 함수
        isMember: (user) => true, // 임시 함수
        isManager: (user) => true // 임시 함수
      },
      studyMenu: 'info', // 현재 선택된 메뉴
      isAuthenticated: true, // 로그인 상태 (임시 값)
      currentUser: { id: 1, name: 'user1' } // 현재 사용자 정보 (임시 값)
    };
  }
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


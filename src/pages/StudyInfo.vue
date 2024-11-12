<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div class="content">
      <div class="container">
        <div class="py-5 text-center">
          <h2>스터디 모임 만들기</h2>
        </div>
        <div class="col-md-10 ml-auto mr-auto">
          <card plain>
            <div class="study-info">
              <!-- Study Info Header -->
              <div class="row pt-4 text-left justify-content-center bg-light">
                <div class="col-6">
                  <a :href="'/study/' + study.path" class="text-decoration-none">
                    <span class="h2">{{ study.title }}</span>
                  </a>
                </div>
                <div class="col-4 text-right justify-content-end">
                  <!-- DRAFT Button -->
                  <span v-if="!study.published" class="d-inline-block" tabindex="0" data-toggle="tooltip"
                        data-placement="bottom" title="스터디 공개 준비중">
                    <button class="btn btn-primary btn-sm" style="pointer-events: none;" type="button" disabled>DRAFT</button>
                  </span>

                  <!-- CLOSED Button -->
                  <span v-if="study.closed" class="d-inline-block" tabindex="0" data-toggle="tooltip"
                        data-placement="bottom" title="스터디 종료함">
                    <button class="btn btn-primary btn-sm" style="pointer-events: none;" type="button" disabled>CLOSED</button>
                  </span>

                  <!-- OFF Button -->
                  <span v-if="!study.recruiting" class="d-inline-block ml-1" tabindex="0" data-toggle="tooltip"
                        data-placement="bottom" title="팀원 모집중 아님">
                    <button class="btn btn-primary btn-sm" style="pointer-events: none;" type="button" disabled>OFF</button>
                  </span>

                  <!-- Join Study Button -->
                  <span v-if="isAuthenticated && study.isJoinable(currentUser)">
                    <div class="btn-group" role="group" aria-label="Basic example">
                      <a class="btn btn-primary" :href="'/study/' + study.path + '/join'">스터디 가입</a>
                      <a class="btn btn-outline-primary" :href="'/study/' + study.path + '/members'">
                        {{ study.members.length }}
                      </a>
                    </div>
                  </span>

                  <!-- Leave Study Button -->
                  <span v-if="isAuthenticated && !study.closed && study.isMember(currentUser)">
                    <div class="btn-group" role="group">
                      <a class="btn btn-outline-warning" :href="'/study/' + study.path + '/leave'">스터디 탈퇴</a>
                      <a class="btn btn-outline-primary" :href="'/study/' + study.path + '/members'">
                        {{ study.members.length }}
                      </a>
                    </div>
                  </span>

                  <!-- Create Event Button -->
                  <span v-if="isAuthenticated && study.published && !study.closed && study.isManager(currentUser)">
                    <a class="btn btn-outline-primary" :href="'/study/' + study.path + '/new-event'">
                      <i class="fa fa-plus"></i> 모임 만들기
                    </a>
                  </span>
                </div>
              </div>

              <!-- Study Short Description -->
              <div class="row justify-content-center bg-light">
                <div class="col-10">
                  <p class="lead">{{ study.shortDescription }}</p>
                </div>
              </div>

              <!-- Tags and Zones -->
              <div class="row justify-content-center bg-light">
                <div class="col-10">
                  <p>
                    <span v-for="tag in study.tags" :key="tag.title" class="font-weight-light text-monospace badge badge-pill badge-info mr-3">
                      <a :href="'/search/tag/' + tag.title" class="text-decoration-none text-white">
                        <i class="fa fa-tag"></i> <span>{{ tag.title }}</span>
                      </a>
                    </span>

                    <span v-for="zone in study.zones" :key="zone.id" class="font-weight-light text-monospace badge badge-primary mr-3">
                      <a :href="'/search/zone/' + zone.id" class="text-decoration-none text-white">
                        <i class="fa fa-globe"></i> <span>{{ zone.localNameOfCity }}</span>
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/components";

export default {
  components: { Card },
  data() {
    return {
      // 임시 데이터
      study: {
        path: 'example-study',
        title: '예시 스터디 제목',
        published: false,
        closed: false,
        recruiting: true,
        shortDescription: '이 스터디는 예시입니다.',
        tags: [{title: '프로그래밍'}, {title: '자기개발'}],
        zones: [{id: 1, localNameOfCity: '서울'}],
        members: [1, 2, 3],
        isJoinable: (user) => true, // 임시 함수
        isMember: (user) => false, // 임시 함수
        isManager: (user) => false, // 임시 함수
      },
      errors: {}
    };
  },
  mounted() {
    // 데이터 요청을 나중에 하므로, 여기서는 아무 것도 하지 않음
  },
  methods: {
    // 실제 데이터는 나중에 서버에서 받아오게 할 것
  }
};
</script>

<style scoped>
.page-header {
  min-height: 100vh;
  overflow: auto;
}

.content {
  height: auto;
  overflow-y: hidden;
}
</style>

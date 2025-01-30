<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
        class="page-header-image"
        style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="row mt-5 justify-content-center">
          <div class="col-8">
            <!-- Message alert -->
            <div v-if="message" class="alert alert-info alert-dismissible fade show mt-3" role="alert">
              <span>{{ message }}</span>
              <button type="button" class="close" @click="closeAlert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="row">
              <h2 class="col-12">알림 설정</h2>
            </div>
            <div class="row mt-3">
              <form class="col-12" @submit.prevent="submitForm">
                <!-- Section: 주요 활동 지역 -->
                <div class="alert alert-light" role="alert">
                  <strong>
                    <a href="/settings/locations">주요 활동 지역</a>에
                    <a href="/settings/keywords">관심있는 주제</a>의 스터디가 만들어졌을 때
                  </strong>
                  알림을 받을 방법을 설정하세요.
                </div>
                <div class="form-group">
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyCreatedByEmail"
                        v-model="notifications.studyCreatedByEmail"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyCreatedByEmail">이메일로 받기</label>
                  </div>
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyCreatedByWeb"
                        v-model="notifications.studyCreatedByWeb"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyCreatedByWeb">웹으로 받기</label>
                  </div>
                </div>

                <!-- Section: 스터디 모임 참가 신청 -->
                <div class="alert alert-light" role="alert">
                  <strong>스터디 모임 참가 신청</strong> 결과 알림을 받을 방법을 설정하세요.
                </div>
                <div class="form-group">
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyEnrollmentResultByEmail"
                        v-model="notifications.studyEnrollmentResultByEmail"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyEnrollmentResultByEmail">이메일로 받기</label>
                  </div>
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyEnrollmentResultByWeb"
                        v-model="notifications.studyEnrollmentResultByWeb"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyEnrollmentResultByWeb">웹으로 받기</label>
                  </div>
                </div>

                <!-- Section: 참여중인 스터디 -->
                <div class="alert alert-light" role="alert">
                  <strong>참여중인 스터디</strong>에 대한 알림을 받을 방법을 설정하세요.
                </div>
                <div class="form-group">
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyWatchByEmail"
                        v-model="notifications.studyUpdatedByEmail"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyWatchByEmail">이메일로 받기</label>
                  </div>
                  <div class="custom-control custom-switch custom-control-inline">
                    <input
                        type="checkbox"
                        id="studyWatchByWeb"
                        v-model="notifications.studyUpdatedByWeb"
                        class="custom-control-input"
                    />
                    <label class="custom-control-label" for="studyWatchByWeb">웹으로 받기</label>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="form-group">
                  <button class="btn btn-outline-primary" type="submit">저장하기</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Include footer -->
        <footer/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotificationSettings",
  data() {
    return {
      message: null, // 성공 메시지
      notifications: {
        studyCreatedByEmail: false,
        studyCreatedByWeb: false,
        studyEnrollmentResultByEmail: false,
        studyEnrollmentResultByWeb: false,
        studyUpdatedByEmail: false,
        studyUpdatedByWeb: false,
      },
    };
  },
  methods: {
    submitForm() {
      // 알림 설정 저장 로직 (API 호출)
      console.log("Submitting form with data:", this.notifications);

      // 성공 메시지 표시
      this.message = "알림 설정이 저장되었습니다!";
    },
    closeAlert() {
      this.message = null;
    },
  },
};
</script>

<style scoped>
.alert-light {
  color: black;
}
</style>

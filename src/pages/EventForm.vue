<template>
  <div>
    <div class="py-5 text-center">
      <h2>
        <a :href="'/study/' + study.path"><span>{{ study.title }}</span></a>
      </h2>
    </div>
    <div class="row justify-content-center">
      <form
          class="needs-validation col-sm-10"
          @submit.prevent="handleSubmit"
          novalidate
      >
        <!-- 모임 제목 -->
        <div class="form-group">
          <label for="title">모임 제목</label>
          <input
              id="title"
              type="text"
              v-model="eventForm.title"
              class="form-control"
              placeholder="모임 제목을 입력하세요"
              aria-describedby="titleHelp"
              required
          />
        </div>

        <!-- 모집 방법 -->
        <div class="form-group">
          <label for="eventType">모집 방법</label>
          <select
              v-model="eventForm.eventType"
              class="custom-select mr-sm-2"
              id="eventType"
              aria-describedby="eventTypeHelp"
          >
            <option value="CONFIRMATIVE">관리자 확인</option>
          </select>
          <small id="eventTypeHelp" class="form-text text-muted">
            현재 한 가지 모집 방법이 있습니다.<br/>
            <strong>확인</strong>: 관리자가 신청을 직접 승인합니다.
          </small>
        </div>

        <!-- 기타 입력 필드 -->
        <div class="form-row">
          <!-- 모집 인원 -->
          <div class="form-group col-md-3">
            <label for="limitOfEnrollments">모집 인원</label>
            <input
                id="limitOfEnrollments"
                type="number"
                v-model="eventForm.limitOfEnrollments"
                class="form-control"
                placeholder="0"
                aria-describedby="limitOfEnrollmentsHelp"
                min="2"
                max="5"
            />
            <small id="limitOfEnrollmentsHelp" class="form-text text-muted">
              최대 수용 가능한 모임 참석 인원을 설정하세요. 최소 2인 이상 모임이어야 합니다.
            </small>
            <small v-if="errors.limitOfEnrollments" class="form-text text-danger">{{
                errors.limitOfEnrollments
              }}</small>
          </div>

          <!-- 등록 마감 일시 -->
          <div class="form-group col-md-3">
            <label for="endEnrollmentDateTime">등록 마감 일시</label>
            <input
                id="endEnrollmentDateTime"
                type="datetime-local"
                v-model="eventForm.endEnrollmentDateTime"
                class="form-control"
                aria-describedby="endEnrollmentDateTimeHelp"
                required
            />
            <small id="endEnrollmentDateTimeHelp" class="form-text text-muted">
              등록 마감 이전에만 스터디 모임 참가 신청을 할 수 있습니다.
            </small>
            <small v-if="errors.endEnrollmentDateTime" class="form-text text-danger">{{
                errors.endEnrollmentDateTime
              }}</small>
          </div>

          <!-- 모임 시작 일시 -->
          <div class="form-group col-md-3">
            <label for="startDateTime">모임 시작 일시</label>
            <input
                id="startDateTime"
                type="datetime-local"
                v-model="eventForm.startDateTime"
                class="form-control"
                aria-describedby="startDateTimeHelp"
                required
            />
            <small id="startDateTimeHelp" class="form-text text-muted">
              모임 시작 일시를 입력하세요. 상세한 모임 일정은 본문에 적어주세요.
            </small>
            <small v-if="errors.startDateTime" class="form-text text-danger">{{ errors.startDateTime }}</small>
          </div>

          <!-- 모임 종료 일시 -->
          <div class="form-group col-md-3">
            <label for="endDateTime">모임 종료 일시</label>
            <input
                id="endDateTime"
                type="datetime-local"
                v-model="eventForm.endDateTime"
                class="form-control"
                aria-describedby="endDateTimeHelp"
                required
            />
            <small id="endDateTimeHelp" class="form-text text-muted">
              모임 종료 일시가 지나면 모임은 자동으로 종료 상태로 바뀝니다.
            </small>
            <small v-if="errors.endDateTime" class="form-text text-danger">{{ errors.endDateTime }}</small>
          </div>
        </div>

        <!-- 간격 추가를 위해 클래스 적용 -->
        <div class="form-group description-section">
          <label for="description">모임 설명</label>
          <textarea
              id="description"
              v-model="eventForm.description"
              class="editor form-control"
              placeholder="모임을 자세히 설명해 주세요."
              aria-describedby="descriptionHelp"
              required
          ></textarea>
          <small id="descriptionHelp" class="form-text text-muted">
            모임에서 다루는 주제, 장소, 진행 방식 등을 자세히 적어 주세요.
          </small>
          <small v-if="errors.description" class="form-text text-danger">{{ errors.description }}</small>
        </div>

        <!-- 제출 버튼 -->
        <div class="form-group">
          <button class="btn btn-primary btn-block" type="submit">
            모임 만들기
          </button>
        </div>
      </form>

      <!-- 모달 -->
      <Modal
          :show="showModal"
          type="notice"
          @close="showModal = false"
      >
        <template #header>
          <h5 class="modal-title">알림</h5>
        </template>
        <template>
          <p>{{ modalMessage }}</p>
        </template>
        <template #footer>
          <button
              type="button"
              class="btn btn-secondary"
              @click="showModal = false"
          >
            닫기
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>


<script>
import {Modal} from "@/components";

export default {
  components: {
    Modal,
  },
  props: {
    study: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      errors: {},
      eventForm: {
        title: "",
        description: "",
        eventType: "FCFS",
        limitOfEnrollments: 0,
        endEnrollmentDateTime: "",
        startDateTime: "",
        endDateTime: "",
      },
      showModal: false,
      modalMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      this.errors = {};

      // 유효성 검사
      if (!this.eventForm.title || this.eventForm.title.length > 50) {
        this.errors.title = "모임 이름은 필수이며 50자를 초과할 수 없습니다.";
      }
      if (this.eventForm.limitOfEnrollments < 2) {
        this.errors.limitOfEnrollments = "모임 인원은 최소 2명 이상이어야 합니다.";
      }
      if (!this.eventForm.endEnrollmentDateTime) {
        this.errors.endEnrollmentDateTime = "등록 마감 일시를 입력해주세요.";
      }
      if (!this.eventForm.startDateTime) {
        this.errors.startDateTime = "모임 시작 일시를 입력해주세요.";
      }
      if (!this.eventForm.endDateTime) {
        this.errors.endDateTime = "모임 종료 일시를 입력해주세요.";
      }
      if (!this.eventForm.description) {
        this.errors.description = "모임 설명을 입력해주세요.";
      }

      // 에러가 있으면 중단
      if (Object.keys(this.errors).length > 0) {
        return;
      }
      // 제출 데이터 생성
      const payload = {
        title: this.eventForm.title,
        description: this.eventForm.description || "",
        eventType: this.eventForm.eventType,
        limitOfEnrollments: this.eventForm.limitOfEnrollments || 2,
        endEnrollmentDateTime: this.eventForm.endEnrollmentDateTime,
        startDateTime: this.eventForm.startDateTime,
        endDateTime: this.eventForm.endDateTime,
      };

      try {
        // API 호출
        const responseData = await this.$store.dispatch("events/registerEvent", {
          payload,
          path: this.study.path,
        });

        const eventId = responseData.eventId;

        this.modalMessage = "모임이 성공적으로 등록되었습니다!";
        this.showModal = true;

        await this.$router.replace(`/study/${this.study.path}/events/${eventId}`);
      } catch (error) {
        this.modalMessage = "모임 등록 중 문제가 발생했습니다. 다시 시도해주세요.";
        this.showModal = true;
      }
    },
  },
};


</script>

<style scoped>
.form-group small {
  color: #6c757d;
}

.form-group {
  margin-bottom: 2rem; /* 폼 그룹 간 기본 간격 */
}

/* "모임 설명"과 위 필드 간 간격 추가 */
.description-section {
  margin-top: 3.5rem; /* 위 필드와의 간격 */
}

label {
  color: #000; /* 검정색 */
}
</style>

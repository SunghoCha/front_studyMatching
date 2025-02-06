<template>
  <div>

    <h4>{{ event.title }}</h4>
    <p><strong>스터디 이름:</strong> {{ study.title }}</p>
    <p><strong>설명:</strong> {{ event.description }}</p>
    <p><strong>등록 마감 일시:</strong> {{ formatDate(event.endEnrollmentDateTime) }}</p>
    <p><strong>모임 시작 일시:</strong> {{ formatDate(event.startDateTime) }}</p>
    <p><strong>모임 종료 일시:</strong> {{ formatDate(event.endDateTime) }}</p>
    <p><strong>모집 인원:</strong> {{ event.limitOfEnrollments }}</p>
    <div>
      <!-- 관리자 권한 버튼 -->
      <template v-if="isManager">
        <button @click="$emit('edit-event')" class="btn btn-warning">모임 수정</button>

        <button @click="deleteEvent" class="btn btn-danger">모임 삭제</button>
      </template>
      <!-- 일반 사용자 버튼 -->
      <template v-else>
        <button
            v-if="event.enrollable"
            @click="registerEnrollment"
            class="btn btn-primary"
        >참가 신청
        </button>
        <button
            v-if="event.disenrollable"
            @click="cancelEnrollment"
            class="btn btn-secondary"
        >참가 취소
        </button>
      </template>
    </div>

    <h4>{{ event.title }} - 참가 관리</h4>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>#</th>
        <th>참석자</th>
        <th>참가신청일시</th>
        <th>참가상태</th>
        <th>참가신청관리</th>
        <th>출석체크</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(enrollment, index) in enrollments" :key="enrollment.enrollmentId">
        <td>{{ index + 1 }}</td>
        <td>{{ enrollment.userName }}</td>
        <td>{{ formatDate(enrollment.enrolledAt) }}</td>
        <td>
          <span v-if="enrollment.accepted">확정</span>
          <span v-else>대기중</span>
        </td>
        <td>
          <button
              v-if="!enrollment.accepted && isManager"
              class="btn btn-success"
              @click="acceptEnrollment(enrollment.enrollmentId)"
          >
            승인
          </button>
          <button
              v-else-if="enrollment.accepted && isManager"
              class="btn btn-warning"
              @click="rejectEnrollment(enrollment.enrollmentId)"
          >
            승인 취소
          </button>
        </td>
        <td>
          <button
              v-if="enrollment.accepted && !enrollment.attended && !isManager"
              class="btn btn-primary"
              @click="checkInEnrollment(enrollment.enrollmentId)"
          >
            체크인
          </button>
          <button
              v-else-if="enrollment.accepted && enrollment.attended && !isManager"
              class="btn btn-danger"
              @click="cancelCheckInEnrollment(enrollment.enrollmentId)"
          >
            체크인 취소
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  props: {
    selectedEvent: Object,
    study: Object,
  },
  async mounted() {
    try {
      await this.getEvent();
    } catch (error) {
      console.error("마운트 시 데이터 로드 중 오류 발생:", error);
      alert("초기 로드에 실패했습니다. 다시 시도해주세요.");
    }
  },
  data() {
    return {
      event: this.selectedEvent,
    }
  },
  computed: {
    enrollments() {
      return this.event?.enrollments || [];
    },
    isManager() {
      return this.$store.state.studies.currentStudy.isManager;
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return "";
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleString("ko-KR", options); // 한국어 로캘 기준 포맷
    },
    async getEvent() {
      if (!this.selectedEvent?.eventId) {
        console.error("유효한 eventId가 없습니다.");
        return;
      }
      try {
        const responseData = await this.$store.dispatch('events/getEvent', {
          path: this.study.path,
          eventId: this.selectedEvent.eventId,
        });
        this.event = responseData;
        console.log("Updated Event object:", this.event);
        console.log("Event ID:", this.event?.eventId);
        console.log("Title:", this.event?.title);
        console.log("Description:", this.event?.description);
        console.log("Start Date:", this.event?.startDateTime);
        console.log("End Date:", this.event?.endDateTime);
        console.log("enroll:", this.event?.enrollable);
        console.log("disenroll:", this.event?.disenrollable);
      } catch (error) {
        console.error("모임 조회 중 오류 발생:", error);
        alert("모임 조회에 실패했습니다. 다시 시도해 주세요.");
      }
    },
    async deleteEvent() {
      try {
        const confirmed = confirm("정말로 이 모임을 삭제하시겠습니까?");
        if (!confirmed) return;

        await this.$store.dispatch("events/deleteEvent", {
          path: this.study.path,
          eventId: this.event.eventId
        })
        alert("모임이 성공적으로 삭제되었습니다.");
        this.$router.push(`/study/${this.path}/events`);
      } catch (error) {
        console.error("모임 삭제 중 오류 발생:", error);
        alert("모임 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
    },
    async registerEnrollment() {
      try {
        const response = await this.$store.dispatch('events/registerEnrollment', {
          path: this.study.path,
          eventId: this.event.eventId
        });
        // 상태 업데이트
        await this.getEvent();
        alert("참가 신청이 성공적으로 완료되었습니다.");
      } catch (error) {
        console.error("참가 신청 중 오류 발생:", error);
        alert("참가 신청에 실패했습니다. 다시 시도해 주세요.");
      }
    },
    async cancelEnrollment() {
      try {
        const confirmed = confirm("참가를 취소하시겠습니까?");
        if (!confirmed) return;

        await this.$store.dispatch("events/cancelEnrollment", {
          path: this.study.path,
          eventId: this.event.eventId
        })
        // 상태 업데이트
        await this.getEvent();
        alert("참가 신청이 성공적으로 취소되었습니다.");
      } catch (error) {
        console.error("참가 취소 중 오류 발생:", error);
        alert("참가 취소에 실패했습니다. 다시 시도해 주세요.");
      }
    },
    async acceptEnrollment(enrollmentId) {
      try {
        const response = await this.$store.dispatch("events/acceptEnrollment", {
          path: this.study.path,
          eventId: this.event.eventId,
          enrollmentId: enrollmentId,
        });
        // 상태 업데이트
        await this.getEvent();
        alert("참가신청이 승인되었습니다.");
      } catch (error) {
        console.error("참가신청 승인 중 오류 발생:", error);
        alert("참가신청 승인이 실패했습니다. 다시 시도해 주세요.");
      }
    },
    async rejectEnrollment(enrollmentId) {
      try {
        await this.$store.dispatch("events/rejectEnrollment", {
          path: this.study.path,
          eventId: this.event.eventId,
          enrollmentId: enrollmentId,
        });
        // 상태 업데이트
        await this.getEvent();
        alert("참가신청 승인이 취소되었습니다.");
      } catch (error) {
        console.error("참가신청 승인 취소 중 오류 발생:", error);
        alert("참가신청 승인 취소가 실패했습니다. 다시 시도해 주세요.");
      }
    }
    ,
    async checkInEnrollment(enrollmentId) {
      try {
        await this.$store.dispatch("events/checkInEnrollment", {
          path: this.study.path,
          eventId: this.event.eventId,
          enrollmentId: enrollmentId,
        });
        // 상태 업데이트
        await this.getEvent();
        alert("체크인 완료.");
      } catch (error) {
        console.error("체크인 중 오류 발생:", error);
        alert("체크인이 실패했습니다. 다시 시도해 주세요.");
      }
    }
    ,
    async cancelCheckInEnrollment(enrollmentId) {
      try {
        await this.$store.dispatch("events/cancelCheckInEnrollment", {
          path: this.study.path,
          eventId: this.event.eventId,
          enrollmentId: enrollmentId,
        });
        // 상태 업데이트
        await this.getEvent();
        alert("체크인 취소 완료.");
      } catch (error) {
        console.error("체크인 취소 중 오류 발생:", error);
        alert("체크인 취소가 실패했습니다. 다시 시도해 주세요.");
      }
    }
  }
};
</script>

<style scoped>
.table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle; /* 세로 정렬 */
  padding: 10px;
  border: 1px solid #ccc;
}

button {
  margin: 0 5px;
}

h4 {
  color: black;
}
</style>

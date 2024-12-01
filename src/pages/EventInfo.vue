<template>
  <div>
    <h2>{{ event.title }}</h2>
    <p><strong>스터디 이름:</strong> {{ study.title }}</p>
    <p><strong>설명:</strong> {{ event.description }}</p>
    <p><strong>등록 마감 일시:</strong> {{ formatDate(event.endEnrollmentDateTime) }}</p>
    <p><strong>모임 시작 일시:</strong> {{ formatDate(event.startDateTime) }}</p>
    <p><strong>모임 종료 일시:</strong> {{ formatDate(event.endDateTime) }}</p>
    <p><strong>모집 인원:</strong> {{ event.limitOfEnrollments }}</p>
    <div>
      <!-- 관리자 권한 버튼 -->
      <template v-if="isManager">
        <button @click="editEvent" class="btn btn-warning">모임 수정</button>
        <button @click="deleteEvent" class="btn btn-danger">모임 삭제</button>
      </template>
      <!-- 일반 사용자 버튼 -->
      <template v-else>
        <button @click="registerEnrollment" class="btn btn-primary">참가 신청</button>
        <button @click="cancelEnrollment" class="btn btn-secondary">참가 취소</button>
      </template>
    </div>
    <button @click="$router.push(`/study-info/${study.path}`)" class="btn btn-light mt-3">목록으로 돌아가기</button>
  </div>
</template>

<script>
export default {
  props: {
    event: Object,
    study: Object,
  },
  computed: {
    isManager() {
      return this.$store.state.studies.currentStudy.isManager;
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString(); // 날짜 포맷팅
    },
    async editEvent() {
      try {
        // 수정 페이지로 이동
        await this.$router.push(`/study/${this.path}/events/${this.event.id}/edit`);
      } catch (error) {
        console.error("모임 수정 중 오류 발생:", error);
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
        const responseData = await this.$store.dispatch('events/registerEnrollment', {
          path: this.study.path,
          eventId: this.event.eventId
        });
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
        alert("참가 신청이 성공적으로 취소되었습니다.");
      } catch (error) {
        console.error("참가 취소 중 오류 발생:", error);
        alert("참가 취소에 실패했습니다. 다시 시도해 주세요.");
      }
    },
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 1rem;
  color: black;
}

button {
  margin-right: 0.5rem;
}
</style>

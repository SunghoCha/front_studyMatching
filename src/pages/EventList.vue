<template>
  <div class="event-list">
    <h3>모임 목록</h3>
    <ul v-if="events.length > 0" class="list-group">
      <li
          v-for="event in events"
          :key="event.id"
          class="list-group-item event-item"
          @click="$emit('view-event', event)"
      >
        {{ event.title }} : 모집마감 - {{ formatDate(event.endEnrollmentDateTime) }}
          / 모임시작 - {{ formatDate(event.startDateTime) }}
      </li>
    </ul>
    <div v-else class="empty-message">
      <p>현재 등록된 모임이 없습니다.</p>
      <p>새로운 모임을 생성하여 팀원들과 함께 목표를 공유해보세요.</p>
      <p>모임이 등록되면 목록에서 확인할 수 있습니다.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    events: {
      type: Array,
      required: true,
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
  },
};
</script>

<style scoped>
.event-list {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.list-group-item {
  cursor: pointer;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}
.event-list {
  margin: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.event-list h3 {
  color: #333; /* 제목 색상 */
}

.event-item {
  color: #000; /* 글씨를 검은색으로 설정 */
  cursor: pointer; /* 클릭 가능 표시 */
  padding: 0.5rem 0;
}

.event-item:hover {
  background-color: #f0f0f0; /* 항목에 마우스 올렸을 때 배경색 */
}

.empty-message {
  color: #666; /* 회색 텍스트 */
  text-align: center; /* 중앙 정렬 */
  margin-top: 1rem;
  line-height: 1.6; /* 줄 간격 */
}
</style>

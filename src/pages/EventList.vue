<template>
  <div class="event-list">
    <h3>모임 목록</h3>
    <ul class="list-group">
      <li
          v-for="event in events"
          :key="event.id"
          class="list-group-item event-item"
          @click="$emit('view-event', event)"
      >
        {{ event.title }} - {{ formatDate(event.startDateTime) }}
      </li>
    </ul>
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
      return new Date(date).toLocaleString(); // 날짜 포맷팅
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
</style>

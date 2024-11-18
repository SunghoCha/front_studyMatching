<template>
  <div class="list-group">
    <div  class="sidebar">
    <a
        class="list-group-item list-group-item-action"
        :class="{ active: currentMenu === 'description' }"
        :href="`/study/${study.path}/settings/description`"
    >
      <i class="now-ui-icons design_app"></i> 소개
    </a>
    <a
        class="list-group-item list-group-item-action"
        :class="{ active: currentMenu === 'image' }"
        :href="`/study/${study.path}/settings/banner`"
    >
      <i class="now-ui-icons media-1_photo"></i> 배너 이미지
    </a>
    <a
        class="list-group-item list-group-item-action"
        :class="{ active: currentMenu === 'tags' }"
        :href="`/study/${study.path}/settings/tags`"
    >
      <i class="now-ui-icons design_bullet-list-67"></i> 스터디 주제
    </a>
    <a
        class="list-group-item list-group-item-action"
        :class="{ active: currentMenu === 'zones' }"
        :href="`/study/${study.path}/settings/zones`"
    >
      <i class="now-ui-icons location_pin"></i> 활동 지역
    </a>
    <a
        class="list-group-item list-group-item-action list-group-item-danger"
        :class="{ active: currentMenu === 'study' }"
        :href="`/study/${study.path}/settings/study`"
    >
      <i class="now-ui-icons business_chart-pie-36"></i> 스터디
    </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentMenu: {
      type: String,
      default: 'description'
    }
  },
  data() {
    return {
      study: {
        path: 'example-study' // 실제 데이터는 필요에 따라 동적으로 설정
      }
    };
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 10vh; /* 화면 높이의 10%만큼 떨어지게 설정 */
  left: 5vw; /* 화면 너비의 5%만큼 떨어지게 설정 */
  height: calc(100% - 10vh); /* 사이드바 높이를 상단 10% 제외하고 설정 */
  width: 250px; /* 고정된 사이드바 너비 */
  background-color: transparent;
  overflow-y: auto;
  transition: top 0.3s ease-in-out, left 0.3s ease-in-out; /* 위치 조정 시 부드럽게 이동 */
}

/* 작은 화면에서 사이드바 숨기기 */
@media (max-width: 768px) {
  .sidebar {
    left: 0; /* 사이드바를 화면 왼쪽으로 배치 */
    width: 100%; /* 사이드바 크기를 화면 크기에 맞게 100%로 설정 */
    top: 0;
    height: 100%;
  }
}

.list-group-item {
  padding: 0.75rem 1.25rem;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.list-group-item i {
  margin-right: 0.5rem;
  color: #ff9800; /* 아이콘 색상 (네비게이션 바와 동일) */
}

.list-group-item:hover {
  background-color: #f5f5f5;
}

.list-group-item.active {
  background-color: #007bff; /* 활성화된 항목 색상 */
  color: white;
}

.list-group-item-danger.active {
  background-color: #e53935; /* '스터디' 항목의 활성화 색상 */
}
</style>

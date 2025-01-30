<template>
  <div class="introduction-content">
    <p>
      새로운 모임을 생성하거나 기존 모임을 관리해보세요.<br />
      스터디 모임은 팀원들과 함께 목표를 공유하며 성장할 수 있는 공간입니다.<br />
      모임을 공개하면 관심 있는 사용자들에게 알림이 전송되며, 보다 많은 팀원을 모집할 수 있습니다.<br />
      스터디 종료 시 모든 기록은 보존되며, 새로운 스터디를 만들어 다시 시작할 수 있습니다.<br />
      팀원 모집은 필요할 때 시작하거나 중단할 수 있으며, 모집 정보는 1시간 단위로 수정 가능합니다.
    </p>
  </div>
</template>

<script>
export default {
  name: "EventIntroduction",
};
</script>

<style scoped>
/* introduction-content 스타일 */
.introduction-content {
  background-color: #e7f3ff; /* 연한 하늘색 배경 */
  border: 1px solid #b3d7ff; /* 하늘색 테두리 */
  border-radius: 10px; /* 둥근 모서리 */
  padding: 1.5rem; /* 내부 여백 */
  margin: 1.5rem auto; /* 상하 여백과 중앙 정렬 */
  max-width: 800px; /* 최대 너비 설정 */
  text-align: center; /* 텍스트 중앙 정렬 */
}

/* p 태그 스타일 */
.introduction-content p {
  color: #0056b3; /* 진한 하늘색 텍스트 */
  font-size: 1.0rem; /* 약간 큰 글씨 */
  line-height: 1.8; /* 줄 간격 */
  margin: 0; /* 상하 여백 제거 */
}
</style>

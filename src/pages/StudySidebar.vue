<template>
  <div v-if="isOpen" class="settings-submenu" :class="{ open: isOpen }">
    <a
        v-for="(menu, key) in menus"
        :key="key"
        class="list-group-item list-group-item-action"
        :class="{ active: currentMenu === key }"
        href="#"
        @click.prevent="$emit('menu-selected', key)"
    >
      <i :class="menu.icon"></i> {{ menu.label }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    currentMenu: {
      type: String,
      default: 'description'
    },
    isOpen: Boolean // ✅ 부모에서 열림/닫힘 상태를 관리
  },
  data() {
    return {
      menus: {
        description: { label: "소개", icon: "fa fa-info-circle" },
        banner: { label: "배너 이미지", icon: "fa fa-image" },
        tags: { label: "스터디 주제", icon: "fa fa-tags" },
        zones: { label: "활동 지역", icon: "fa fa-map-marker-alt" },
        settings: { label: "스터디 설정", icon: "fa fa-cogs" }
      }
    };
  }
};
</script>

<style scoped>
/* ✅ 기존 스타일 유지 */
.settings-submenu {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: transform 0.3s ease-in-out;
}

/* ✅ 반응형 디자인 */
@media (max-width: 768px) {
  .settings-submenu {
    position: fixed;
    left: 0;
    top: 0;
    width: 250px;
    height: 100vh;
    overflow-y: auto;
    background: #fff;
    z-index: 1000;
    transform: translateX(-100%);
  }

  .settings-submenu.open {
    transform: translateX(0);
  }
}
</style>

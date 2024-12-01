<template>
  <div v-if="visible" class="settings-submenu">
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
    visible: {
      type: Boolean,
      default: true, // 설정 탭에서만 표시
    },
  },
  data() {
    return {
      menus: {
        description: {label: "소개", icon: "fa fa-info-circle"},
        image: {label: "배너 이미지", icon: "fa fa-image"},
        tags: {label: "스터디 주제", icon: "fa fa-tags"},
        zones: {label: "활동 지역", icon: "fa fa-map-marker-alt"},
        settings: {label: "스터디 설정", icon: "fa fa-cogs"},
      },
    };
  },
};
</script>

<style scoped>
.settings-submenu {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.list-group-item {
  padding: 0.75rem 1.25rem;
  color: #333;
  font-weight: 500;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.list-group-item i {
  margin-right: 0.5rem;
  color: #007bff; /* 아이콘 색상 */
}

.list-group-item:hover {
  background-color: #f5f5f5;
}

.list-group-item.active {
  background-color: #007bff; /* 활성화된 항목 색상 */
  color: white;
}
</style>

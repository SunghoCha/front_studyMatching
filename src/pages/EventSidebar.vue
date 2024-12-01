<template>
  <div v-if="visible" class="settings-submenu">
    <a
        v-for="(menu, key) in filteredMenus"
        :key="key"
        class="list-group-item list-group-item-action"
        :class="{ active: eventMenu === menu.key }"
        href="#"
        @click.prevent="logMenuSelection(menu)"
    >
      <i :class="menu.icon"></i> {{ menu.label }}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    eventMenu: {
      type: String,
      default: 'introduction',
    },
    visible: {
      type: Boolean,
      default: true, // 모임 탭에서만 표시
    },
    isManager: {
      type: Boolean,
      required: true, // 반드시 부모 컴포넌트에서 전달되도록 강제
    },
  },
  data() {
    return {
      menus: {
        introduction: {label: "소개", icon: "fa fa-info-circle"}, // 소개: 정보 아이콘
        registerEvent: {label: "모임 생성", icon: "fa fa-calendar-plus",  requiresManager: true}, // 모임 생성: 일정 추가 아이콘
        newEvents: {label: "새 모임", icon: "fa fa-calendar-check"}, // 새 모임: 일정 확인 아이콘
        oldEvents: {label: "지난 모임", icon: "fa fa-calendar-alt"}, // 지
      },
    };
  },
  computed: {
    filteredMenus() {
      return Object.entries(this.menus)
          .filter(([key, menu]) => !menu.requiresManager || this.isManager)
          .map(([key, menu]) => ({ ...menu, key }));
    }
  },
  methods: {
    logMenuSelection(menu) {
      this.$emit('menu-selected', menu.key); // 메뉴의 key를 부모에 전달
    }
  }
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

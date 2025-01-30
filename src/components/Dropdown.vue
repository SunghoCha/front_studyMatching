<template>
  <component
      class="dropdown"
      :is="tag"
      :class="[
      { show: isOpen },
      { dropdown: direction === 'down' },
      { dropup: direction === 'up' }
    ]"
      aria-haspopup="true"
      :aria-expanded="isOpen"
      @click="toggleDropDown"
      v-click-outside="closeDropDown"
  >
    <slot name="title">
      <a class="dropdown-toggle nav-link" :class="{ 'no-caret': hideArrow }">
        <i :class="icon"></i>
        <span class="no-icon">{{ title }}</span>
      </a>
    </slot>
    <ul
        class="dropdown-menu"
        :class="[ { 'dropdown-menu-right': position === 'right' }, { show: isOpen } ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>

<script>
export default {
  name: 'drop-down',
  props: {
    direction: {type: String, default: 'down'},
    title: String,
    icon: String,
    position: String,
    hideArrow: Boolean,
    tag: {type: String, default: 'li'},
    isOpen: Boolean // ✅ 부모에서 열림/닫힘 상태를 제어할 수 있도록 변경
  },
  methods: {
    toggleDropDown() {
      this.$emit('update:isOpen', !this.isOpen); // ✅ 부모에게 상태 변경 요청
    },
    closeDropDown() {
      this.$emit('update:isOpen', false); // ✅ 부모에서 닫을 수 있도록 이벤트 전달
    }
  }
};
</script>

<style scoped>
.dropdown {
  list-style-type: none;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}
</style>

<template>
  <div class="row px-3 justify-content-center">
    <nav class="col-10 nav nav-tabs">
      <a v-bind:class="{ active: studyMenu === 'info' }" class="nav-item nav-link" :href="'/study/' + study.path">
        <i class="fa fa-info-circle"></i> 소개
      </a>
      <a v-bind:class="{ active: studyMenu === 'members' }" class="nav-item nav-link" :href="'/study/' + study.path + '/members'">
        <i class="fa fa-user"></i> 구성원
      </a>
      <a v-bind:class="{ active: studyMenu === 'events' }" class="nav-item nav-link" :href="'/study/' + study.path + '/events'">
        <i class="fa fa-calendar"></i> 모임
      </a>
      <a v-if="isAuthenticated && study.isManager(currentUser)"
         v-bind:class="{ active: studyMenu === 'settings' }"
         class="nav-item nav-link" :href="'/study/' + study.path + '/settings/description'">
        <i class="fa fa-cog"></i> 설정
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    study: Object,
    studyMenu: String,
    isAuthenticated: Boolean,
    currentUser: Object
  }
};
</script>

<style scoped>
.nav-tabs {
  margin-top: 30px;
}
</style>

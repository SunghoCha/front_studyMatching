<template>
  <div class="row px-3 justify-content-center">
    <nav class="col-10 nav nav-tabs">
      <div class="card">
        <tabs
            centered
            type="neutral"
            tab-nav-wrapper-classes="card-header"
            tab-content-classes="card-body text-center"
            data-background-color="orange"
        >
          <tab-pane>
            <template slot="label">
              <i class="fa fa-info-circle"></i> 소개
            </template>
            <p>
              한글 내용 테스트
            </p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-user"></i> 구성원
            </template>
            <p>
              구성원 관련 글
            </p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-calendar"></i> 모임
            </template>
            <p>
              모임 관련 글
            </p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-cog"></i> 설정
            </template>
            <p>
              설정 관련 글
            </p>
            <StudySidebar/>
          </tab-pane>
        </tabs>
      </div>
    </nav>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/Tab.vue";
import StudySidebar from "@/pages/StudySidebar.vue";

export default {
  components: {StudySidebar, TabPane, Tabs},
  props: {
    study: Object,
    loading: Boolean,
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

.card-body.text-center p {
  color: black;
}
</style>

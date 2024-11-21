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
            <p>{{ study.fullDescription }}</p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-user"></i> 구성원
            </template>
            <p>{{ study.members }}</p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-calendar"></i> 모임
            </template>
            <p>모임 관련 글</p>
          </tab-pane>
          <tab-pane>
            <template slot="label">
              <i class="fa fa-cog"></i> 설정
            </template>
            <div>
              <!-- 설정 탭 선택 시 하위 메뉴 표시 -->
              <StudySidebar
                  v-if="isSettingsTabActive"
                  :current-menu="currentMenu"
                  :visible="true"
                  @menu-selected="handleMenuSelection"
              />
              <div class="settings-content">
                <!-- 동적으로 선택된 콘텐츠 렌더링 -->
                <component :is="currentComponent" :study="study" />
              </div>
            </div>
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
import StudyDescriptionForm from "@/pages/StudyDescriptionForm.vue";


export default {
  components: {
    StudySidebar,
    TabPane,
    Tabs,
    StudyDescriptionForm,

  },
  props: {
    study: Object,
  },
  data() {
    return {
      currentMenu: "description", // 기본 메뉴
      activeTab: "설정", // 현재 활성화된 탭
      menuComponents: {
        description: "StudyDescriptionForm",
        image: "StudyBannerForm",
        tags: "StudyTagsForm",
      },
    };
  },
  computed: {
    currentComponent() {
      return this.menuComponents[this.currentMenu];
    },
    isSettingsTabActive() {
      return this.activeTab === "설정";
    },
  },
  methods: {
    handleMenuSelection(menu) {
      this.currentMenu = menu;
    },
  },
};
</script>

<style scoped>
.settings-content {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>

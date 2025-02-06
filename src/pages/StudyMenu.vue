<template>
  <div class="row px-3 justify-content-center">
    <nav class="col-10 nav nav-tabs">
      <div class="card">
        <tabs
            :key="activeTab"
            v-model="activeTab"
            centered
            type="neutral"
            tab-nav-wrapper-classes="card-header"
            tab-content-classes="card-body text-center"
            data-background-color="orange"
            @change="handleTabChange"
        >
          <tab-pane label="소개">
            <template slot="label">
              <i class="fa fa-info-circle"></i> 소개
            </template>
            <div class="study-full-description">
              <p v-html="study.fullDescription.replace(/\n/g, '<br>')"></p>
            </div>

            <!-- 조건에 따라 버튼 표시 -->
            <div class="mt-3">
              <template v-if="study.isMember">
                <!-- "스터디 탈퇴" 버튼 -->
                <button class="btn btn-danger" @click="leaveStudy">스터디 탈퇴</button>
              </template>
              <template v-else-if="study.recruiting && !study.isMember && !study.isManager">
                <!-- "스터디 참가" 버튼 -->
                <button class="btn btn-primary" @click="joinStudy">스터디 참가</button>
              </template>
              <template v-else></template>
            </div>
          </tab-pane>
          <tab-pane label="구성원">
            <template slot="label">
              <i class="fa fa-user"></i> 구성원
            </template>
            <div class="study-members-description">
              <div v-if="study.members && study.members.length > 0">
                <p v-for="(member, index) in study.members" :key="index" class="text-left">
                  {{ formatMemberInfo(member) }}
                </p>
              </div>
              <div v-else>
                <p>현재 구성원이 없습니다. 스터디에 참여하여 멤버가 되어보세요.</p>
              </div>
            </div>

          </tab-pane>
          <tab-pane label="모임" v-if="study.isMember || study.isManager">
            <template slot="label">
              <i class="fa fa-calendar"></i> 모임
            </template>
            <div>
              <!-- 설정 탭 선택 시 하위 메뉴 표시 -->
              <EventSidebar
                  :isManager="study.isManager"
                  :event-menu="String(eventMenu)"
                  :visible="true"
                  @menu-selected="handleEventMenuSelection"
              />
              <div class="settings-content">
                <component
                    :is="currentEventComponent"
                    :selectedEvent="selectedEvent"
                    :events="eventMenu === 'newEvents' ? newEvents : oldEvents"
                    :study="study"
                    @view-event="viewEvent"
                    @back-to-list="resetEventSelection"
                    @edit-event="handleEditEvent"
                    @event-updated="handleEventUpdated"
                />
              </div>
            </div>
          </tab-pane>
          <tab-pane label="설정" v-if="study.isManager">
            <template slot="label">
              <i class="fa fa-cog"></i> 설정
            </template>
            <div>
              <!-- 설정 탭 선택 시 하위 메뉴 표시 -->
              <StudySidebar
                  :current-menu="currentMenu"
                  :visible="true"
                  @menu-selected="handleMenuSelection"
              />
              <div class="settings-content">
                <component
                    :is="currentComponent"
                    :study="study"
                    @update-description="updateDescription"
                />
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
import StudyZoneForm from "@/pages/StudyZoneForm.vue";
import StudyTagsForm from "@/pages/StudyTagsForm.vue";
import StudySettingForm from "@/pages/StudySettingForm.vue";
import EventSidebar from "@/pages/EventSidebar.vue";
import EventForm from "@/pages/EventForm.vue";
import EventList from "@/pages/EventList.vue";
import EventInfo from "@/pages/EventInfo.vue";
import EventIntroduction from "@/pages/EventIntroduction.vue";
import StudyBannerForm from "@/pages/StudyBannerForm.vue";
import EventEditForm from "@/pages/EventEditForm.vue";

export default {
  components: {
    EventSidebar,
    StudySidebar,
    TabPane,
    Tabs,
    StudyDescriptionForm,
    StudyBannerForm,
    StudyZoneForm,
    StudyTagsForm,
    StudySettingForm,
    EventForm,
    EventList,
    EventInfo,
    EventIntroduction,
    EventEditForm,

  },
  props: {
    study: Object,
  },
  data() {
    return {
      currentMenu: "description", // 기본 메뉴
      eventMenu: "introduction",
      activeTab: "소개", // 현재 활성화된 탭
      selectedEvent: null,
      newEvents: [],
      oldEvents: [],
      menuComponents: {
        description: "StudyDescriptionForm",
        banner: "StudyBannerForm",
        zones: "StudyZoneForm",
        tags: "StudyTagsForm",
        settings: "StudySettingForm"
      },
      eventComponents: {
        introduction: "EventIntroduction",
        registerEvent: "EventForm",
        newEvents: "EventList",
        oldEvents: "EventList",
      },
    };
  },
  computed: {
    currentComponent() {
      return this.menuComponents[this.currentMenu];
    },
    currentEventComponent() {
      switch (this.eventMenu) {
        case "introduction":
          return "EventIntroduction"; // 소개 페이지
        case "registerEvent":
          return "EventForm"; // 모임 등록 폼
        case "newEvents":
        case "oldEvents":
          // 상세 보기 또는 목록 보기 결정
          return this.selectedEvent ? "EventInfo" : "EventList";
        case "editEvent":
          return "EventEditForm";
        default:
          return "EventList"; // 기본값
      }
    },

    isSettingsTabActive() {
      console.log("activeTab 값:", this.activeTab);
      return this.activeTab === "설정";
    },
  },
  methods: {
    handleTabChange(newTab) {
      if (newTab === "모임") {
        console.log("모임 탭이 선택되었습니다. 데이터를 요청합니다.");
        this.fetchEvents(); // "모임" 탭을 클릭했을 때만 데이터를 요청
      }
    },
    handleMenuSelection(menu) {
      this.currentMenu = menu;
    },
    handleEventMenuSelection(menu) {
      this.eventMenu = menu; // EventSidebar에서 선택된 메뉴 업데이트
      this.selectedEvent = null; // 메뉴 변경 시 상세 보기 초기화
      console.log("Event menu selected:", menu);
    },
    async fetchEvents() {
      try {
        const studyPath = this.study.path; // study.path 전달
        await this.$store.dispatch("events/getEvents", studyPath); // Vuex 액션 호출
        console.log("모임 데이터 로드 완료");
        this.newEvents = this.$store.state.events.newEvents;
        this.oldEvents = this.$store.state.events.oldEvents;
      } catch (error) {
        console.error("모임 데이터를 불러오는 중 오류 발생:", error);
      }
    },
    async joinStudy() {
      const confirmed = confirm("참가하시겠습니까?");
      if (!confirmed) return;
      await this.$store.dispatch('studies/joinStudy', this.study.path);
      console.log("스터디 참가 성공");
    },
    async leaveStudy() {
      const confirmed = confirm("참가를 취소하시겠습니까?");
      if (!confirmed) return;
      await this.$store.dispatch('studies/leaveStudy', this.study.path);
      console.log("스터디 참가취소 성공");
    },
    viewEvent(event) {
      this.selectedEvent = event; // 선택된 모임 설정
    },
    resetEventSelection() {
      this.selectedEvent = null; // 모임 선택 초기화
    },
    handleEditEvent() {
      this.eventMenu ="editEvent";
    },
    handleEventUpdated() {
      this.eventMenu = "newEvents";
    },
    updateDescription(updatedData) {
      // Vuex 상태 업데이트
      this.study.shortDescription = updatedData.shortDescription;
      this.study.fullDescription = updatedData.fullDescription;

      this.activeTab = "소개";
    },
    formatMemberInfo(member) {
      return `${member.name} 님 (${member.email})`;
    },

  }
}
</script>

<style>
.settings-content {
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  border-radius: 4px;
}

p {
  color: black;
  padding: 0 16px;
  margin: 0;
}

.study-full-description {
  background-color: #e7f3ff; /* 연한 하늘색 배경 */
  border: 1px solid #b3d7ff; /* 하늘색 테두리 */
  border-radius: 10px; /* 둥근 모서리 */
  padding: 1.5rem; /* 내부 여백 */
  margin: 1.5rem auto; /* 상하 여백과 중앙 정렬 */
  max-width: 800px; /* 최대 너비 설정 */
}

.study-full-description p {
  color: #0056b3; /* 진한 하늘색 텍스트 */
  font-size: 1.0rem; /* 약간 큰 글씨 */
  line-height: 1.8; /* 줄 간격 */

  text-align: left; /* 텍스트를 왼쪽 정렬 */
  margin-bottom: 1rem; /* 문단 간 간격 */

}

.study-members-description {
  background-color: #e7f3ff; /* 연한 하늘색 배경 */
  border: 1px solid #b3d7ff; /* 하늘색 테두리 */
  border-radius: 10px; /* 둥근 모서리 */
  padding: 1.5rem; /* 내부 여백 */
  margin: 1.5rem auto; /* 상하 여백과 중앙 정렬 */
  max-width: 800px; /* 최대 너비 설정 */
}


</style>

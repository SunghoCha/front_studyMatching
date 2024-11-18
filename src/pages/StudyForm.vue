<template>
  <div>
    <!-- 기존 페이지 내용 -->
    <div class="page-header clear-filter" filter-color="orange">
      <div class="content">
        <div class="container">
          <div class="py-5 text-center">
            <h2>스터디 모임 만들기</h2>
          </div>
          <div class="col-md-10 ml-auto mr-auto">
            <card plain>
              <form @submit.prevent="handleSubmit" class="needs-validation col-sm-12" novalidate>
                <!-- 스터디 URL -->
                <div class="form-group">
                  <label for="path">스터디 URL</label>
                  <input
                      id="path"
                      v-model="studyForm.path"
                      type="text"
                      class="form-control"
                      placeholder="예) study-path"
                      required
                      minlength="2"
                      maxlength="20"
                  />
                  <small id="pathHelp" class="form-text text-muted">
                    공백없이 문자, 숫자, 대시(-)와 언더바(_)만 2자 이상 20자 이내로 입력하세요. 스터디 홈 주소에 사용합니다. 예) /study/<b>study-path</b>
                  </small>
                  <small v-if="errors.path" class="form-text text-danger">{{ errors.path }}</small>
                </div>

                <!-- 스터디 이름 -->
                <div class="form-group">
                  <label for="title">스터디 이름</label>
                  <input
                      id="title"
                      v-model="studyForm.title"
                      type="text"
                      class="form-control"
                      placeholder="스터디 이름"
                      required
                      maxlength="50"
                  />
                  <small id="titleHelp" class="form-text text-muted">
                    스터디 이름을 50자 이내로 입력하세요.
                  </small>
                  <small v-if="errors.title" class="form-text text-danger">{{ errors.title }}</small>
                </div>

                <!-- 짧은 소개 -->
                <div class="form-group">
                  <label for="shortDescription">짧은 소개</label>
                  <textarea
                      id="shortDescription"
                      v-model="studyForm.shortDescription"
                      class="form-control"
                      placeholder="스터디를 짧게 소개해 주세요."
                      required
                      maxlength="100"
                  ></textarea>
                  <small id="shortDescriptionHelp" class="form-text text-muted">
                    100자 이내로 스터디를 짧게 소개해 주세요.
                  </small>
                  <small v-if="errors.shortDescription" class="form-text text-danger">{{ errors.shortDescription }}</small>
                </div>

                <div class="form-group" style="height: 100%; overflow-y: auto;">
                  <label for="fullDescription">상세 소개</label>
                  <editor
                      ref="fullDescriptionEditor"
                      v-model="studyForm.fullDescription"
                      placeholder="스터디를 자세히 설명해 주세요."
                      initialEditType="markdown"
                      previewStyle="vertical"
                  ></editor>
                  <small id="fullDescriptionHelp" class="form-text text-muted">
                    스터디의 목표, 일정, 진행 방식, 사용할 교재 또는 인터넷 강좌 그리고 모집중인 스터디원 등 스터디에 대해 자세히 적어 주세요.
                  </small>
                  <small v-if="errors.fullDescription" class="form-text text-danger">{{ errors.fullDescription }}</small>
                </div>
                <!-- 제출 버튼 -->
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">스터디 만들기</button>
                </div>
              </form>
            </card>
          </div>
        </div>
      </div>
    </div>

    <!-- 에러 모달 -->
    <modal
        v-if="showErrorModal"
        :show="showErrorModal"
        @close="closeErrorModal"
        type="notice"
    >
      <template #header>
        <h4 class="modal-title">스터디 등록 실패</h4>
      </template>
      <template>
        <p>{{ errorMessage }}</p>
      </template>
      <template #footer>
        <button class="btn btn-primary" @click="closeErrorModal">닫기</button>
      </template>
    </modal>
  </div>
</template>


<script>
import {Card} from "@/components";
import {Editor} from "@toast-ui/vue-editor";
import Modal from "@/components/Modal.vue";

export default {
  components: {Modal, Card, Editor},
  data() {
    return {
      studyForm: {
        path: '',
        title: '',
        shortDescription: '',
        fullDescription: ''
      },
      errors: {},
      showErrorModal: false,
      errorMessage: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        this.studyForm.fullDescription = this.$refs.fullDescriptionEditor.invoke('getMarkdown');
        await this.$store.dispatch("studies/createStudy", this.studyForm);
        await this.$router.replace("/study-info");

      } catch (error) {
        if (error.response && error.response.data) {
          this.errors = {};
          const errorMessage = error.response.data.errorMessage;
          errorMessage.trim.split(".").forEach((fieldError) => {
            const matches = fieldError.match(/\[(.*?)] (.*)/);
            if (matches) {
              this.errors[matches[1]] = matches[2];
            }
          });
        } else {
          // 글로벌 에러
          this.errorMessage = "스터디 생성에 실패하였습니다.";
          this.showErrorModal = true;
        }
      }
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
  }
};
</script>

<style scoped>

.page-header {
  min-height: 100vh;
  overflow: auto;
}

.content {
  height: auto;
  overflow-y: hidden;
}

</style>

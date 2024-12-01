<template>
  <div>
    <!-- 기존 페이지 내용 -->
    <div class="page-header clear-filter" filter-color="orange">
      <div class="content">
        <div class="container">
          <div class="py-5 text-center">
            <h2>스터디 소개 수정하기</h2>
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
                      disabled
                  />
                  <small id="pathHelp" class="form-text text-muted small-text">
                    스터디 홈 주소는 설정에서 수정할 수 있습니다.
                  </small>
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
                      disabled
                  />
                  <small id="titleHelp" class="form-text text-muted small-text">
                    스터디 이름은 설정에서 수정할 수 있습니다.
                  </small>
                  <small v-if="errors.title" class="form-text text-danger small-text">{{ errors.title }}</small>
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
                  <small id="shortDescriptionHelp" class="form-text text-muted small-text">
                    100자 이내로 스터디를 짧게 소개해 주세요.
                  </small>
                  <small v-if="errors.shortDescription" class="form-text text-danger">{{
                      errors.shortDescription
                    }}</small>
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
                  <small id="fullDescriptionHelp" class="form-text text-muted small-text">
                    스터디의 목표, 일정, 진행 방식, 사용할 교재 또는 인터넷 강좌 그리고 모집중인 스터디원 등 스터디에 대해 자세히 적어 주세요.
                  </small>
                  <small v-if="errors.fullDescription" class="form-text text-danger">{{
                      errors.fullDescription
                    }}</small>
                </div>
                <!-- 제출 버튼 -->
                <div class="form-group">
                  <button class="btn btn-primary btn-block" type="submit">스터디 소개 수정하기</button>
                </div>
              </form>
            </card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Card} from "@/components";
import {Editor} from "@toast-ui/vue-editor";

export default {
  components: {Card, Editor},
  props: {
    study: {
      type: Object,
      required: true,
    },
  },
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
  }, mounted() {
    // study 데이터를 studyForm에 복사
    this.initializeForm();
    this.initializeEditor();
  },
  methods: {
    initializeForm() {
      if (this.study) {
        this.studyForm.path = this.study.path;
        this.studyForm.title = this.study.title;
        this.studyForm.shortDescription = this.study.shortDescription;
        this.studyForm.fullDescription = this.study.fullDescription;
      }
    },
    initializeEditor() {
      if (this.$refs.fullDescriptionEditor) {
        this.$refs.fullDescriptionEditor.invoke('setMarkdown', this.studyForm.fullDescription || '');
      }
    },
    async handleSubmit() {
      console.log("handleSubmit 호출됨");
      try {
        this.studyForm.fullDescription = this.$refs.fullDescriptionEditor.invoke('getMarkdown');
        await this.$store.dispatch("studies/editStudyDescription", {
          payload: this.studyForm,
          path: this.study.path,
        });

        // 부모 컴포넌트에 수정 완료 이벤트 전송
        this.$emit("update-description", {
          shortDescription: this.studyForm.shortDescription,
          fullDescription: this.studyForm.fullDescription,
        });
        console.log("update-description 이벤트 전송");

        // 수정 완료 모달 표시
        this.$emit("show-modal", "수정이 완료되었습니다.");
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
          this.errorMessage = "스터디 소개 수정에 실패하였습니다.";
          this.showErrorModal = true;
        }
      }
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
  },
  watch: {
    // study 데이터가 변경되면 studyForm을 다시 초기화
    study: {
      handler() {
        this.initializeForm();
        this.initializeEditor();
      },
      deep: true,
    },
  },

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

.small-text {
  font-size: 0.8rem; /* 글씨 크기 */
}

label {
  font-size: 1.2rem; /* 글씨 크기 */
  font-weight: bold; /* 원하는 경우 글씨를 더 강조 */
}

</style>

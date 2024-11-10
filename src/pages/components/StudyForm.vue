<template>

  <div class="page-header clear-filter" filter-color="orange">
    <div
        class="page-header-image"
        style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="py-5 text-center">
          <h2>스터디 개설</h2>
        </div>
        <div class="row justify-content-center">
          <card plain>
            <form @submit.prevent="handleSubmit" class="needs-validation col-sm-10" novalidate>
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
                  100자 이내로 스터디를 짧은 소개해 주세요.
                </small>
                <small v-if="errors.shortDescription" class="form-text text-danger">{{
                    errors.shortDescription
                  }}</small>
              </div>

              <div>
                <label for="fullDescription">상세 소개</label>
                <editor
                    ref="fullDescriptionEditor"
                    v-model="studyForm.fullDescription"
                    placeholder="스터디를 자세히 설명해 주세요."
                    height="500px"
                    initialEditType="markdown"
                    previewStyle="vertical"
                ></editor>
                <small id="fullDescriptionHelp" class="form-text text-muted">
                  스터디의 목표, 일정, 진행 방식, 사용할 교재 또는 인터넷 강좌 그리고 모집중인 스터디원 등 스터디에 대해 자세히 적어 주세요.
                </small>
                <small v-if="errors.fullDescription" class="form-text text-danger">{{ errors.fullDescription }}</small>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" type="submit">스터디 만들기</button>
              </div>
            </form>
          </card>
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
  data() {
    return {
      studyForm: {
        path: '',
        title: '',
        shortDescription: '',
        fullDescription: ''
      },
      errors: {} // 에러 메시지를 저장할 객체
    };
  },
  methods: {
    // 제출 처리 메서드
    async handleSubmit() {
      try {
        this.studyForm.fullDescription = this.$refs.fullDescriptionEditor.invoke('getMarkdown');
        //const response = await this.$axios.post('/new-study', this.studyForm);
        // 성공적인 제출 후 처리
        console.log('스터디가 성공적으로 만들어졌습니다.');
      } catch (error) {
        // 오류가 발생했을 때 에러 메시지를 받아서 errors 객체에 설정
        if (error.response && error.response.data) {
          this.errors = error.response.data.errors || {}; // 서버에서 반환된 에러 메시지
        }
      }
    }
  }
};
</script>


<style scoped>

.toastui-editor {
  width: 100%;
  height: 100%;
}

.zones-list {
  margin-top: 10px;
}

.zone {
  background-color: black;
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
}

.zone button {
  background: white;
  border: none;
  color: black;
  font-size: 16px;
  cursor: pointer;
  margin-left: 5px;
}

.suggestions {
  border: 1px solid #ccc;
  margin-top: 5px;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.suggestion {
  padding: 5px;
  cursor: pointer;
}

.suggestion:hover {
  background-color: #f0f0f0;
}
</style>

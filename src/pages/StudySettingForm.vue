<template>
  <div>
    <div class="container">
      <div class="row mt-3 justify-content-center">
        <!-- Settings Content -->
        <div class="col-8">
          <div v-if="message" class="message">{{ message }}</div>
          <div class="row">
            <!-- Study Publish and Close -->
            <h5 class="col-sm-12">스터디 공개 및 종료</h5>
            <form
                v-if="!study.published && !study.closed"
                @submit.prevent="publishStudy"
                class="col-sm-12"
            >
              <div class="alert alert-info" role="alert">
                스터디를 다른 사용자에게 공개할 준비가 되었다면 버튼을 클릭하세요.<br />
                소개, 배너 이미지, 스터디 주제 및 활동 지역을 등록했는지 확인하세요.<br />
                스터디를 공개하면 주요 활동 지역과 스터디 주제에 관심있는 다른 사용자에게 알림을 전송합니다.
              </div>
              <div class="form-group">
                <button class="btn btn-outline-primary" type="submit">스터디 공개</button>
              </div>
            </form>

            <form
                v-if="study.published && !study.closed"
                @submit.prevent="closeStudy"
                class="col-sm-12"
            >
              <div class="alert alert-warning" role="alert">
                스터디 활동을 마쳤다면 스터디를 종료하세요.<br />
                스터디를 종료하면 더이상 팀원을 모집하거나 모임을 만들 수 없으며, 스터디 경로와 이름을 수정할 수 없습니다.<br />
                스터디 모임과 참여한 팀원의 기록은 그대로 보관합니다.
              </div>
              <div class="form-group">
                <button class="btn btn-outline-warning" type="submit">스터디 종료</button>
              </div>
            </form>

            <div v-if="study.closed" class="col-sm-12 alert alert-info">
              이 스터디는 {{ study.closedDateTime }}에 종료됐습니다.<br />
              다시 스터디를 진행하고 싶다면 새로운 스터디를 만드세요.<br />
            </div>
          </div>

          <!-- Team Recruitment Section -->
          <hr v-if="!study.closed && study.published" />
          <div v-if="!study.closed && study.published">
            <h5 class="col-sm-12">팀원 모집</h5>
            <form v-if="!study.recruiting" @submit.prevent="startRecruitment" class="col-sm-12">
              <div class="alert alert-info" role="alert">
                팀원을 모집합니다.<br />
                충분한 스터디 팀원을 모집했다면 모집을 멈출 수 있습니다.<br />
                팀원 모집 정보는 1시간에 한번만 바꿀 수 있습니다.
              </div>
              <div class="form-group">
                <button class="btn btn-outline-primary" type="submit">팀원 모집 시작</button>
              </div>
            </form>

            <form v-if="study.recruiting" @submit.prevent="stopRecruitment" class="col-sm-12">
              <div class="alert alert-primary" role="alert">
                팀원 모집을 중단합니다.<br />
                팀원 충원이 필요할 때 다시 팀원 모집을 시작할 수 있습니다.<br />
                팀원 모집 정보는 1시간에 한번만 바꿀 수 있습니다.
              </div>
              <div class="form-group">
                <button class="btn btn-outline-primary" type="submit">팀원 모집 중단</button>
              </div>
            </form>
          </div>

          <!-- Study Path Settings -->
          <hr v-if="!study.closed" />
          <div v-if="!study.closed">
            <h5 class="col-12">스터디 경로</h5>
            <form @submit.prevent="updatePath(study.path)" class="col-sm-12 needs-validation">
              <div class="alert alert-warning" role="alert">
                스터디 경로를 수정하면 이전에 사용하던 경로로 스터디에 접근할 수 없으니 주의하세요.<br />
              </div>
              <div class="form-group">
                <input
                    id="path"
                    type="text"
                    :value="editedPath"
                    @input="handlePathInput"
                    class="form-control"
                    placeholder="예) study-path"
                    aria-describedby="pathHelp"
                    required
                />
                <small id="pathHelp" class="form-text text-muted">
                  공백없이 문자, 숫자, 대시(-)와 언더바(_)만 3자 이상 20자 이내로 입력하세요.
                </small>
                <small class="form-text text-danger" v-if="studyPathError">{{ studyPathError }}</small>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-warning" type="submit">경로 수정</button>
              </div>
            </form>
          </div>

          <!-- Study Title Settings -->
          <hr v-if="!study.closed" />
          <div v-if="!study.closed">
            <h5 class="col-12">스터디 이름</h5>
            <form @submit.prevent="updateTitle(study.title)" class="col-sm-12">
              <div class="alert alert-warning" role="alert">스터디 이름을 수정합니다.</div>
              <div class="form-group">
                <input
                    id="title"
                    type="text"
                    v-model="study.title"
                    class="form-control"
                    placeholder="스터디 이름"
                    aria-describedby="titleHelp"
                    required
                />
                <small id="titleHelp" class="form-text text-muted">
                  스터디 이름을 50자 이내로 입력하세요.
                </small>
                <small class="form-text text-danger" v-if="studyTitleError">{{ studyTitleError }}</small>
              </div>
              <div class="form-group">
                <button class="btn btn-outline-warning" type="submit">스터디 이름 수정</button>
              </div>
            </form>
          </div>

          <!-- Study Delete Section -->
          <hr />
          <div>
            <h5 class="col-sm-12 text-danger">스터디 삭제</h5>
            <form @submit.prevent="deleteStudy" class="col-sm-12">
              <div class="alert alert-danger" role="alert">
                스터디를 삭제하면 스터디 관련 모든 기록을 삭제하며 복구할 수 없습니다.<br />
                <b>다음에 해당하는 스터디는 자동으로 삭제 됩니다.</b>
                <ul>
                  <li>만든지 1주일이 지난 비공개 스터디</li>
                  <li>스터디 공개 이후, 한달 동안 모임을 만들지 않은 스터디</li>
                  <li>스터디 공개 이후, 모임을 만들지 않고 종료한 스터디</li>
                </ul>
              </div>
              <div class="form-group">
                <button
                    class="btn btn-outline-danger"
                    type="submit"
                    :disabled="!study.removable"
                >
                  스터디 삭제
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>


export default {
  components: {

  },
  props: {
    study: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    // 초기 로드 시 originalPath와 editedPath 설정
    this.originalPath = this.study.path;
    this.editedPath = this.study.path;
  },
  data() {
    return {
      editedPath: '', // 사용자 입력값
      originalPath: '', // 변경 전 경로
      message: null,
      studyPathError: null,
      studyTitleError: null,
    };
  },
  methods: {
    handlePathInput(event) {
      // 사용자 입력값 반영
      this.editedPath = event.target.value;
    },
    async publishStudy() {
      try {
        const responseData = await this.$store.dispatch('studies/publishStudy', this.study.path)
        this.study.published = responseData.published;
        this.message = "스터디가 성공적으로 공개되었습니다.";
      } catch (error) {
        console.error("스터디 공개 실패:", error);
        this.message = "스터디 공개에 실패했습니다. 다시 시도해주세요.";
      }
    },
    async closeStudy() {
      try {
        const responseData = await this.$store.dispatch('studies/closeStudy', this.study.path)
        this.study.closed = responseData.closed;
        this.message = "스터디가 성공적으로 종료되었습니다."
      } catch (error) {
        console.error("스터디 종료 실패:", error);
        this.message = "스터디 종료에 실패했습니다. 다시 시도해주세요.";
      }
    },
    async startRecruitment() {
      try {
        const responseData = await this.$store.dispatch('studies/startRecruitment', this.study.path)
        this.study.recruiting = responseData.recruiting;
        this.message = "스터디 멤버 모집을 시작했습니다."
      } catch (error) {
        console.error("스터디 멤버 모집 시작 실패:", error);
        this.message = "멤버 모집 시작에 실패했습니다. 다시 시도해주세요."
      }
    },
    async stopRecruitment() {
      try {
        const responseData = await this.$store.dispatch('studies/stopRecruitment', this.study.path)
        this.study.recruiting = responseData.recruiting;
        this.message = "스터디 멤버 모집을 종료했습니다."
      } catch (error) {
        console.error("스터디 멤버 모집 중단 실패:", error);
        this.message = "스터디 멤버 모집 종료에 실패했습니다. 다시 시도해주세요."
      }
    },
    async updatePath() {
      try {
        console.log("기존 경로:", this.originalPath);
        console.log("변경된 경로:", this.editedPath);

        const responseData = await this.$store.dispatch('studies/editStudyPath', {
          payload: this.editedPath,
          path: this.originalPath
        })
        this.study.path = responseData.path; // 서버에서 반환된 값
        this.originalPath = responseData.path; // 기존 경로 동기화
        this.editedPath = responseData.path; // 입력값 동기화
        this.studyPathError = null; // 에러 초기화

        await this.$router.replace({ path: `/study-info/${responseData.path}` });
      } catch (error) {
        console.error("스터디 경로 수정 실패:", error);
        this.studyPathError = "경로 수정 실패";
      }
    },
    async updateTitle() {
      try {
        const newTitle = this.study.title;
        const responseData = await this.$store.dispatch('studies/editStudyTitle', {
          payload: newTitle,
          path: this.study.path
        })
        this.study.title = responseData.title;

      } catch (error) {
        console.error("스터디 제목 수정 실패:", error);
        this.studyTitleError = "이름 수정 실패";
      }
    },
    async deleteStudy() {
      try {
        console.log("스터디 삭제 API 호출");
        await this.$router.push("/home"); // 삭제 후 홈으로 이동

      } catch (error) {
        console.error("스터디 삭제 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
/* 모든 제목 텍스트를 검은색으로 설정 */
h5 {
  color: black;
}

/* 삭제 버튼 기본 상태 */
.btn-outline-danger {
  color: white; /* 기본 상태에서 흰색 글자 */
  background-color: red; /* 버튼 배경색 */
  border-color: red; /* 버튼 테두리 */
}

/* 삭제 버튼 Hover 상태 */
.btn-outline-danger:hover {
  color: red; /* Hover 상태에서 글자 빨간색 */
  background-color: white; /* Hover 상태에서 배경 흰색 */
  border-color: red; /* Hover 상태에서 테두리 유지 */
}
</style>

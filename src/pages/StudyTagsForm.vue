<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
        class="page-header-image"
        style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-12 ml-auto mr-auto">
          <card type="login" plain>
            <div class="py-5 text-center">
              <h2>관심있는 스터디 주제를 찾아보세요.</h2>
            </div>

            <div class="row g-5 justify-content-center">
              <div class="col-md-8 col-lg-8">
                <h4 class="mb-3">스터디 주제 찾기</h4>
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <div class="col-sm-8">
                      <div class="form-floating">
                        <input
                            type="text"
                            v-model="inputValue"
                            @input="onInput"
                            ref="tagInput"
                            placeholder="Search or add a tag"
                        />
                        <hr class="my-4">

                        <div class="tags-list">
                          <span
                              v-for="(tag, index) in tags"
                              :key="index"
                              class="tag"
                          >
                            {{ tag }}
                            <button @click="removeTag(index)">x</button>
                          </span>
                        </div>

                        <div class="suggestions" v-if="suggestions.length">
                          <div
                              v-for="(suggestion, index) in suggestions"
                              :key="index"
                              class="suggestion"
                              @click="addTag(suggestion)"
                          >
                            {{ suggestion }}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <button
                          type="button"
                          class="btn btn-primary btn-custom"
                          @click="submitForm"
                      >
                        수정 완료
                      </button>
                    </div>
                    <hr class="my-4">
                  </div>
                </form>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card } from "@/components";

export default {
  components: { Card },
  props: {
    study: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
      tags: [], // 독립적으로 관리하는 태그 목록
      suggestions: [],
      error: null,
    };
  },
  async mounted() {
    await this.fetchAllTags();
    this.initializeStudyTags();
  },
  watch: {
    study: {
      deep: true,
      immediate: true,
      handler(newStudy) {
        // study.tags와 현재 tags가 동기화되지 않은 경우에만 업데이트 // TODO : 로직 이해할 것
        if (
            this.tags.length === 0 ||
            this.tags.every((tag) =>
                newStudy.tags.map((t) => t.tag).includes(tag)
            )
        ) {
          this.tags = newStudy.tags.map((tag) => tag.tag);
        }
      },
    },
  },
  computed: {
    allTags() {
      const tags = this.$store.getters["tags/allTags"];
      console.log("현재 allTags 값: ", tags); // 로그 출력
      return tags;
    },
    availableTags() {
      return this.allTags || [];
    },
  },
  methods: {
    initializeStudyTags() {
      this.tags = this.study.tags.map((tag) => tag.tag);
      console.log("초기화된 태그:", this.tags);
    },
    async fetchAllTags() {
      try {
        await this.$store.dispatch("tags/loadAllTags");
        console.log("전체 태그 로드 완료:", this.allTags);
      } catch (error) {
        this.error = error.message || "전체 태그 목록을 불러오는데 실패했습니다.";
      }
    },
    addTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.inputValue = ""; // 입력값 초기화
      this.suggestions = [];
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    onInput() {
      if (!this.availableTags || this.availableTags.length === 0) {
        console.warn("availableTags가 비어 있습니다.");
        return;
      }
      const searchTerm = this.inputValue.toLowerCase();
      this.suggestions = this.availableTags.filter((tag) =>
          tag.toLowerCase().includes(searchTerm)
      );
    },
    async submitForm() {
      console.trace("submitForm called");
      const formData = {
        tags: this.tags,
      };
      console.log("전송할 태그 목록:", formData.tags);
      try {
        const updatedTags = await this.$store.dispatch(
            "studies/editStudyTags",
            {
              payload: formData,
              path: this.study.path,
            }
        );
        // 부모 상태 업데이트를 트리거하기 위해 store를 다시 로드
        await this.$store.dispatch("studies/loadStudy", this.study.path);

        this.tags = updatedTags.tags; // 변경사항 즉시 반영
        console.log("태그 수정 완료:", this.tags);
        console.log("태그 수정 길이:", this.tags.length);
      } catch (err) {
        this.error = err.message || "태그 등록 실패";
      }
    },
  },
};
</script>

<style scoped>
.tags-list {
  margin-top: 10px;
}

.tag {
  background-color: black;
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
  margin-right: 5px;
  display: inline-flex;
  align-items: center;
}

.tag button {
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

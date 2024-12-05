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
  data() {
    return {
      inputValue: "",
      tags: [], // 유저 태그
      suggestions: [], // 자동 완성 제안 목록
      error: null,
    };
  },
  mounted() {
    this.fetchAllTags();
    this.fetchUserTags();
  },
  computed: {
    userId() {
      return this.$store.getters["auth/userId"];
    },
    userTags() {
      return this.$store.getters["tags/userTags"];
    },
    allTags() {
      const tags = this.$store.getters["tags/allTags"];
      console.log("현재 allTags 값:", tags); // 로그 출력
      return tags;
    },
    availableTags() {
      return this.allTags || [];
    },
  },

  methods: {
    async fetchUserTags() {
      try {
        await this.$store.dispatch("tags/loadUserTags", this.userId);
        this.tags = [...this.userTags]; // 유저 태그 설정
        console.log("유저 태그 설정 완료:", this.tags);
      } catch (error) {
        this.error = error.message || "유저 태그 목록을 불러오는데 실패했습니다.";
      }
    },
    async fetchAllTags() {
      try {
        await this.$store.dispatch('tags/loadAllTags');
        console.log("전체 태그 로드 완료:", this.allTags);
      } catch (error) {
        this.error = error.message || "전체 태그 목록을 불러오는데 실패했습니다.";
      }
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
    addTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.inputValue = ""; // 입력값 초기화
      this.suggestions = []; // 제안 초기화
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async submitForm() {
      const formData = {
        tags: this.tags,
      };

      console.log("전송할 태그 목록:", formData.tags);
      try {
        const updatedTags = await this.$store.dispatch('tags/editUserTag', {
          payload: formData,
          userId: this.userId,
        });

        this.tags = updatedTags; // 저장된 태그 목록 반영
        console.log("태그 수정 완료:", this.tags);
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

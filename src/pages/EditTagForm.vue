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
              <p class="lead"></p>
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
                    <span v-for="(tag, index) in tags" :key="index" class="tag">
                      {{ tag }} <button @click="removeTag(index)">x</button>
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
                      <button type="button" class="btn btn-primary btn-custom" @click="submitForm">수정 완료</button>
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
import {Card} from "@/components";

export default {
  components: {Card},
  data() {
    return {
      inputValue: '',
      tags: [],
      availableTags: [],
      suggestions: [],
      error: null,
    };
  },
  created() {
    this.fetchAllTags();
  },
  mounted() {
    this.fetchUserTags(); // 컴포넌트 생성할 때 유저의 태그 목록 가져옴
  },
  computed: {
    userId() {
      return this.$store.getters['auth/userId'];
    },
    userTags() {
      return this.$store.getters['tags/userTags']
    },
    allTags() {
      return this.$store.getters['tags/allTags']
    }
  },
  methods: {
    async fetchUserTags() {
      try {
        await this.$store.dispatch('tags/loadUserTags', this.userId)
      } catch (error) {
        this.error = error.message || '유저 태그 목록을 불러오는데 실패했습니다.';
      }
      this.tags = this.userTags;
      console.log("유저태그 설정 완료 " + this.userTags);
    },
    async fetchAllTags() {
      try {
        await this.$store.dispatch('tags/loadAllTags')
      } catch (error) {
        this.error = error.message || '전체 태그 목록을 불러오는데 실패했습니다.'
      }
      this.availableTags = this.allTags
      console.log("전체태그 설정 완료 " + this.allTags);
    },
    onInput() {
      const searchTerm = this.inputValue.toLowerCase();
      this.suggestions = this.availableTags.filter(tag => tag.toLowerCase().includes(searchTerm)); // 정확한 필터링은 아니지만 이정도로만 설정..
    },
    addTag(tag) {
      if (!this.tags.includes(tag)) {
        this.tags.push(tag);
      }
      this.inputValue = ''; // 입력값 초기화
      this.suggestions = []; // 제안 초기화
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async submitForm() {
      const formData = {
        tags: this.tags
      }
      console.log("전송할 태그목록: " + formData.tags);
      try {
        console.log("editTag 호출 전");
        const updatedTags = await this.$store.dispatch('tags/editTag', {payload: formData, userId: this.userId});
        console.log("editTag 호출 후");
        this.tags = updatedTags;
      } catch (err) {
        this.error = err.message || "tag 등록 실패"
      }
    }
  },
};
</script>

<style scoped>
.tags-list {
  margin-top: 10px;
}

.tag {
  background-color: black; /* 배경색을 검은색으로 설정 */
  color: white; /* 글자색은 흰색으로 설정 */
  border-radius: 4px; /* 모서리 둥글게 */
  padding: 5px 10px; /* 패딩 */
  margin-right: 5px; /* 간격 */
  display: inline-flex; /* 텍스트와 버튼을 수평으로 배치 */
  align-items: center; /* 수직 정렬 */
}

.tag button {
  background: white; /* 버튼 배경을 투명하게 */
  border: none; /* 버튼 테두리 제거 */
  color: black; /* 버튼 글자색 흰색 */
  font-size: 16px; /* 글자 크기 */
  cursor: pointer; /* 클릭 가능하게 */
  margin-left: 5px; /* 버튼과 태그 간 간격 */
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
  background-color: #f0f0f0; /* 호버 시 배경색 */
}
</style>

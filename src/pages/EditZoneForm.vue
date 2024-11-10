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
              <h2>관심있는 지역을 추가하세요.</h2>
              <p class="lead"></p>
            </div>

            <div class="row g-5 justify-content-center">
              <div class="col-md-8 col-lg-8">
                <h4 class="mb-3">지역 찾기</h4>
                <form @submit.prevent="submitForm">
                  <div class="row g-3">
                    <div class="col-sm-8">
                      <div class="form-floating">
                        <input
                            type="text"
                            v-model="inputValue"
                            @input="onInput"
                            ref="zoneInput"
                            placeholder="Search or add a zone"
                        />
                        <hr class="my-4">

                        <div class="zones-list">
                          <span v-for="(zone, index) in zones" :key="index" class="zone">
                            {{ zone.city + " : " + zone.localName + " : " + zone.province }} <button @click="removeZone(index)">x</button>
                          </span>
                        </div>

                        <div class="suggestions" v-if="suggestions.length">
                          <div
                              v-for="(suggestion, index) in suggestions"
                              :key="index"
                              class="suggestion"
                              @click="addZone(suggestion)"
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
      zones: [],
      availableZones: [],
      suggestions: [],
      error: null,
    };
  },
  created() {
    this.fetchAllZones();
  },
  mounted() {
    this.fetchUserZones(); // 컴포넌트 생성할 때 유저의 지역 목록 가져옴
  },
  computed: {
    userId() {
      return this.$store.getters['auth/userId'];
    },
    userZones() {
      return this.$store.getters['zones/userZones']
    },
    allZones() {
      return this.$store.getters['zones/allZones']
    }
  },
  methods: {
    async fetchUserZones() {
      try {
        await this.$store.dispatch('zones/loadUserZones', this.userId)
      } catch (error) {
        this.error = error.message || '유저 지역 목록을 불러오는데 실패했습니다.';
      } finally {
        this.zones = this.userZones;
        console.log("유저지역 설정 완료 " + this.zones.id);
      }
    },
    async fetchAllZones() {
      try {
        await this.$store.dispatch('zones/loadAllZones')
      } catch (error) {
        this.error = error.message || '전체 지역 목록을 불러오는데 실패했습니다.'
      } finally {
        this.availableZones = this.allZones
        console.log("전체지역 설정 완료 " + this.allZones);
      }
    },
    onInput() {
      const searchTerm = this.inputValue.toLowerCase();
      this.suggestions = this.availableZones.filter(zone => zone.localName.includes(searchTerm));
    },
    addZone(zone) {
      if (!this.zones.includes(zone)) {
        this.zones.push(zone);
      }
      this.inputValue = ''; // 입력값 초기화
      this.suggestions = []; // 제안 초기화
    },
    removeZone(index) {
      this.zones.splice(index, 1);
    },
    async submitForm() {
      const formData = {
        zones: this.zones
      }
      console.log("전송할 지역목록: " + formData.zones);
      try {
        console.log("editZone 호출 전");
        const updatedZones = await this.$store.dispatch('auth/editZone', {payload: formData, userId: this.userId});
        console.log("editZone 호출 후");
        this.zones = updatedZones;
      } catch (err) {
        this.error = err.message || "zone 등록 실패"
      }
    }
  },
};
</script>

<style scoped>
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

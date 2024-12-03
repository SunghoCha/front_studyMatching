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
                          <span
                              v-for="(zone, index) in zones"
                              :key="index"
                              class="zone"
                          >
                            {{ zone.displayName }}
                            <button @click="removeZone(index, $event)">x</button>
                          </span>
                        </div>

                        <div class="suggestions" v-if="suggestions.length">
                          <div
                              v-for="(suggestion, index) in suggestions"
                              :key="index"
                              class="suggestion"
                              @click="addZone(suggestion)"
                          >
                            {{ suggestion.displayName }}
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
import {Card} from "@/components";

export default {
  components: {Card},
  props: {
    study: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      inputValue: "",
      zones: [],
      suggestions: [],
      error: null,
    };
  },
  async mounted() {
    await this.fetchAllZones();
    this.initializeStudyZones();
  },
  computed: {
    userId() {
      return this.$store.getters["auth/userId"];
    },
    allZones() {
      const zones = this.$store.getters["zones/allZones"];
      console.log("전체 지역 목록 (computed):", zones);

      return this.$store.getters["zones/allZones"].map(zone => ({
        id: zone.id,
        localName: zone.localName,
        province: zone.province,
        displayName: zone.province === "none"
            ? `${zone.localName}` // province가 "none"이면 localName만 표시
            : `${zone.localName} (${zone.province})`
      }));
    },
  },
  methods: {
    initializeStudyZones() {
      if (!this.study || !this.study.zones) {
        console.warn("study 또는 study.zones가 초기화되지 않았습니다.");
        this.zones = []; // 기본값 설정
        return;
      }

      const allZones = this.allZones;

      this.zones = this.study.zones.map((studyZone) => {
        const matchedZone = allZones.find(
            (zone) =>
                zone.localName.trim().toLowerCase() === studyZone.localName.trim().toLowerCase() &&
                zone.province.trim().toLowerCase() === studyZone.province.trim().toLowerCase()
        );

        if (!matchedZone) {
          console.warn("일치하는 지역을 찾을 수 없습니다:", {
            studyZone,
            allZonesSample: allZones.slice(0, 5),
          });
          return null;
        }

        return {
          id: matchedZone.id,
          localName: matchedZone.localName,
          province: matchedZone.province,
          displayName: matchedZone.displayName,
        };
      }).filter((zone) => zone !== null);

      console.log("초기화된 지역 목록 (with IDs):", this.zones);
    },

    async fetchAllZones() {
      try {
        await this.$store.dispatch('zones/loadAllZones');
        const zones = this.$store.getters["zones/allZones"];
        console.log("전체 지역 로드 완료:", zones);
      } catch (error) {
        this.error = error.message || "전체 지역 목록을 불러오는데 실패했습니다.";
      }
    },

    onInput() {
      const searchTerm = this.inputValue.toLowerCase();
      this.suggestions = this.allZones.filter((zone) =>
          zone.displayName.toLowerCase().includes(searchTerm)
      );
    },

    addZone(zone) {
      if (!this.zones.some((existingZone) => existingZone.displayName === zone.displayName)) {
        this.zones.push(zone);
      }
      this.inputValue = ""; // 입력값 초기화
      this.suggestions = []; // 제안 초기화
    },

    removeZone(index) {
      this.zones.splice(index, 1);
    },

    async submitForm() {
      console.trace("submitForm called");
      const formData = {
        zoneIds: this.zones.map((zone) => zone.id),
      };

      console.log("전송할 지역 목록:", formData.zoneIds);
      try {
        const updatedZones = await this.$store.dispatch(
            "studies/editStudyZones",
            {
              payload: formData.zoneIds,
              path: this.study.path,
            }
        );
        // 부모 상태 업데이트를 트리거하기 위해 store를 다시 로드
        await this.$store.dispatch("studies/loadStudy", this.study.path);

        this.zones = updatedZones.map((zone) => ({
          localName: zone.localName,
          province: zone.province,
          displayName: `${zone.localName} (${zone.province})`,
        }));
        console.log("수정 완료:", this.zones);


      } catch (err) {
        this.error = err.message || "zone 등록 실패";
      }
    },
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

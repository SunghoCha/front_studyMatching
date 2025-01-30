<template>
  <div class="study-banner-form">
    <div v-if="!study.useBanner">
      <div class="alert alert-primary" role="alert">
        스터디 메뉴에서 배너 이미지를 사용합니다. 아직 배너 이미지를 설정하지 않았다면, 기본 배너 이미지를 사용합니다.
      </div>
    </div>

    <div v-else>
      <div class="alert alert-info" role="alert">
        스터디 메뉴에서 배너 이미지를 사용하지 않습니다. 스터디 목록에서 배너 이미지를 사용하지 않습니다.
      </div>
      <button @click="disableBanner" class="btn btn-outline-primary btn-block">배너 이미지 사용하지 않기</button>
    </div>

    <hr />

    <div class="row">
      <h5 class="col-sm-12">배너 이미지 변경</h5>
    </div>

    <div class="card text-center">
      <div class="mt-3" v-if="currentBannerImage">
        <img :src="currentBannerImage" width="640" alt="배너 이미지" />
      </div>
      <div class="card-body">
        <!-- 이미지 파일 선택 -->
        <div class="custom-file">
          <input type="file" class="custom-file-input" @change="onFileChange" />
          <label class="custom-file-label" for="study-image-file">스터디 이미지 변경</label>
        </div>

        <!-- 선택한 이미지 미리보기 -->
        <div v-if="newImage" class="mt-3">
          <img :src="newImage" width="640" alt="새로운 배너 이미지" />
        </div>

        <!-- 이미지 업로드 후 버튼들 -->
        <div v-if="newImage" class="mt-3">
          <button class="btn btn-outline-success btn-block" @click="saveImage">저장</button>
          <button class="btn btn-outline-warning btn-block" @click="resetImage">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    study: Object,
  },
  data() {
    return {
      currentBannerImage: this.study.image, // 현재 배너 이미지
      newImage: null, // 새로운 이미지 미리보기
      selectedFile: null, // 업로드할 파일
    };
  },
  methods: {
    // 파일이 선택되었을 때 호출되는 메서드
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file; // 선택된 파일 저장
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newImage = e.target.result; // 새로운 이미지 파일 미리보기
        };
        reader.readAsDataURL(file);
      }
    },

    // 이미지를 서버로 전송하는 메서드
    async saveImage() {
      if (!this.selectedFile) {
        alert('이미지를 선택하세요.');
        return;
      }

      try {
        const payload = { image: this.selectedFile };
        const path = this.study.path;

        await this.$store.dispatch('studies/editStudyBanner', { payload, path });

        // 업로드 성공 시 현재 배너 이미지를 업데이트
        this.currentBannerImage = this.newImage;
        this.resetImage(); // 선택된 파일 초기화
        alert('배너 이미지가 성공적으로 업데이트되었습니다.');
      } catch (error) {
        console.error(error);
        alert(error.message || '배너 이미지를 저장하는 데 실패했습니다.');
      }
    },

    // 취소 버튼 클릭 시 초기화
    resetImage() {
      this.newImage = null;
      this.selectedFile = null;
    },
  },
};
</script>

<style scoped>
.study-banner-form {
  margin-top: 20px;
}

.card-body {
  padding: 1rem;
}

.custom-file-label {
  cursor: pointer;
}

#new-study-image-control {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.row h5 {
  color: black;
}
</style>

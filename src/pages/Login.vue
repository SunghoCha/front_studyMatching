<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('/img/login.jpg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="image">
              <div class="social-icons">
                <a href="https://link-to-facebook.com" target="_blank">
                  <img src="/img/icon/google.png" alt="Google" class="social-icon" />
                </a>
                <a href="https://link-to-google.com" target="_blank">
                  <img src="/img/icon/naver.png" alt="Naver" class="social-icon" />
                </a>
                <a href="https://link-to-twitter.com" target="_blank">
                  <img src="/img/icon/kakao.png" alt="Kakao" class="social-icon" />
                </a>
              </div>
            </div>



            <template slot="raw-content">
              <div class="card-footer text-center">
                <a
                  href="#pablo"
                  class="btn btn-google btn-round btn-lg btn-block"
                  >구글 로그인</a
                >
              </div>
              <div class="card-footer text-center">
                <a
                    href="#pablo"
                    class="btn btn-naver btn-round btn-lg btn-block"
                >네이버 로그인</a
                >
              </div>
              <div class="card-footer text-center">
                <a
                    href="#pablo"
                    class="btn btn-kakao btn-round btn-lg btn-block"
                >카카오 로그인</a
                >
              </div>
              <div class="card-footer text-center">
                <a
                    href="#pablo"
                    class="btn btn-primary btn-round btn-lg btn-block"
                >로그인없이 시작</a
                >
              </div>
              <div class="pull-left">
                <h6>
                  <a href="#pablo" class="link footer-link">Create Account</a>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="#pablo" class="link footer-link">Need Help?</a>
                </h6>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Card, Button, FormGroupInput } from '@/components';
export default {
  name: 'login-page',
  bodyClass: 'login-page',
  components: {
    Card,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  }
};
</script>
<style>


.social-icons {
  display: flex; /* 가로 배열 */
  justify-content: center; /* 가운데 정렬 */
  margin-top: 10px; /* 상단 여백 */
}

.social-icons a {
  display: inline-block; /* a태그를 inline-block으로 설정 */
  margin: 10px 25px; /* 아이콘 간격 (좌우 여백을 15px로 설정) */
}

.social-icon {
  width: 40px; /* 원하는 아이콘 너비 */
  height: 40px; /* 원하는 아이콘 높이 */
  object-fit: contain; /* 비율 유지 */
}

/* 버튼 색상 스타일 */
.btn-google {
  background-color: white !important; /* 흰색 */
  color: blue !important; /* 글자 색상 */
}

.btn.btn-google {
  color: blue !important; /* 버튼 클래스와 함께 사용 */
}

.btn-naver {
  background-color: green !important; /* 녹색 */
  color: white !important; /* 글자 색상 */
}

.btn-kakao {
  background-color: #ffeb3b !important; /* 노란색 */
  color: black !important; /* 글자 색상 */
}
</style>
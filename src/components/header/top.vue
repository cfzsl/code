<template>
  <!-- 头部 -->
  <div id="Top">
    <div class="TopL">
      <span>智慧环卫综合管理平台</span>
    </div>
    <div class="alert">公告：智慧环卫综合管理平台有新功能更新！</div>
    <div class="TopR">
      <div class="TopRb">
        <div class="TopRbone" @click="screen">
          <i class="el-icon-full-screen"></i>全屏
        </div>
        <i class="el-icon-refresh"></i>
        <span>刷新</span>
        <i class="el-icon-document-checked"></i>
        <span>幫助</span>
        <span>当前登录：管理员</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullscreen: false
    };
  },
  methods: {
    screen(){
          let element = document.documentElement;
          if (this.fullscreen) {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
          } else {
            if (element.requestFullscreen) {
              element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
              // IE11
              element.msRequestFullscreen();
            }
          }
          this.fullscreen = !this.fullscreen;
        }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
#Top {
  position: relative;
  position: fixed;
  width: 100%;
  height: 86px;
  background-image: linear-gradient(135deg, #254b8b 0%, #3b99f1 100%);
  overflow: hidden;
  .TopL {
    float: left;
    height: 28px;
    width: 280px;
    margin-left: 30px;
    margin-top: 19px;
    span {
      display: inline-block;
      width: 320px;
      height: 45px;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .alert {
    position: absolute;
    left: 688px;
    top: 31px;
    width: 361px;
    height: 25px;
    font-family: PingFangSC-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }
  .TopR {
    float: right;
    margin-top: 31px;
    font-family: "ArialMT", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #fff;
    text-align: center;
    .TopRb {
      .TopRbone {
        display: inline-block;
        width: 70px;
        height: 30px;
        margin-right: 35px;
        line-height: 30px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 4px;
      }
      i {
        display: inline-block;
        width: 20px;
        font-size: 15px;
        height: 20px;
        line-height: 20px;
        color: #ffffff;
        margin-right: 6px;
      }
      span {
        display: inline-block;
        margin-right: 35px;
        height: 20px;
        line-height: 20px;
        font-family: PingFangSC-Regular;
        font-size: 15px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #ffffff;
      }
    }
  }
}
</style>

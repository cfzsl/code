<template>
  <!-- 头部 -->
  <div id="Top">
    <div class="TopL">
      <span>智慧环卫综合管理平台</span>
      <i v-if="showdown" class="el-icon-s-fold" @click="endlist"></i>
      <i v-if="!showdown" class="el-icon-s-unfold" @click="openlist"></i>
    </div>
    <div class="alert">
      <span>{{ this.msg }}</span>
    </div>
    <div class="TopR">
      <div class="right-wrap">
        <div class="po search" @click="screen">
          <span class="iconfont icon-quanping icon"></span>
          <span>全屏</span>
        </div>
        <div class="po">
          <span class="iconfont icon-shuaxin icon"></span>
          <span>刷新</span>
        </div>
        <div class="po">
          <span class="iconfont icon-bangzhu icon"></span>
          <span>帮助</span>
        </div>
        <div>
          <span>当前登录：管理员</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFullscreen: false,
      showdown: true,
      open: false,
      animate: false,
      msg: '公告：智慧环卫综合管理平台有新功能更新！',
      timer: null //在data上定义定时器timer，默认为null
    };
  },
  methods: {
    endlist() {
      this.open = false;
      this.showdown = !this.showdown;
      this.$emit("asideEnd", this.open);
    },
    openlist() {
      this.open = true;
      this.showdown = !this.showdown;
      this.$emit("asideOpen", this.open);
    },
    screen() {
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
    },
    show() {
      if (this.timer != null) return;
      this.timer = setInterval(() => {
        //获取到头的第一个字符
        let start = this.msg.substring(0, 1);
        //获取到后面的所有字符
        let end = this.msg.substring(1);
        //重新拼接得到新的字符串，并赋值给this.msg
        this.msg = end + start;
      }, 300);
    }
  },
  created() {
    this.show()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
#Top {
  position: relative;
  position: fixed;
  display: flex;
  width: 100%;
  height: 86px;
  background-image: linear-gradient(135deg, #254b8b 0%, #3b99f1 100%);
  overflow: hidden;
  .TopL {
    float: left;
    width: 380px;
    padding-top: 20px;
    margin-left: 20px;
    font-size: 32px;
    color: #ffffff;
    span {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
    }
  }
  .alert {
    float: left;
    flex: 1;
    height: 86px;
    line-height: 86px;
    span {
      display: block;
      margin: 0 auto;
      width: 361px;
      height: 25px;
      font-family: PingFangSC-Regular;
      font-size: 18px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0px;
      color: #ffffff;
    }
  }
  .TopR {
    float: right;
    margin-top: 28px;
    font-family: "ArialMT", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #fff;
    font-size: 14px;
    text-align: center;
    width: 444px;
    .right-wrap {
      display: flex;
      // justify-content: space-between;
      align-content: center;
      height: 34px;
      line-height: 34px;
    }
    .search {
      width: 70px;
      height: 34px;
    }
    .search:hover {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }
    .icon {
      margin-left: 6px;
      margin-right: 6px;
    }
  }
  .po {
    margin-right: 35px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-content: center;
  }
}
</style>

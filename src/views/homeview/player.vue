<template>
  <!-- 播放视频 -->
  <div id="player">
    <div class="warningTop">
      <div class="warningDate">2019-11-02</div>
    </div>
    <!-- 滚动播放 -->
    <div class="rollPlay">
      <el-carousel height="500px">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="video">
            <div class="videoPlayer">
              <div>
                播放列表
              </div>
              <p>关于视频的相关信息关于视频的相关信息关于视频的相关信息关于视频的相关信息关于视频的相关信息</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import "videojs-contrib-hls";
export default {
  data() {
    return {
      // 监控
      videoOption: {
        live: false,
        autoplay: false,
        language: "zh-CN",
        aspectRatio: "16:8",
        fluid: true,
        sources: [
          {
            src:
              "http://hls01open.ys7.com/openlive/f515aa55a63f429d8169f069a9ac9986.m3u8" //url地址
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        },
        flash: {
          hls: {
            withCredentials: false
          }
        }
      },
      //视频列表数据
      videoList: []
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.warningTop {
  width: 100%;
  height: 50px;
  .warningDate {
    float: right;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-right: 20px;
  }
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.video {
  display: flex;
  flex-wrap: wrap;
  .videoPlayer {
    width: 300px;
    height: 225px;
    margin: 10px 10px;
  }
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>

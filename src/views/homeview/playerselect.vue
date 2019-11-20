<template>
  <div id="playerselect">
    <div id="player">
      <div class="playerTop">
        <!-- <el-button type="primary" @click="stringVideo">道路视频详情</el-button> -->
        <div class="warningDate">{{shuldData.logtime}}</div>
      </div>
      <div class="playerVideo">
        <div v-for="item in videoList" :key="item.sid" class="videoDiv" @click="videoPlayer(item)">
          <el-image :src="item.videoimgurl" style="cursor:pointer"></el-image>
          <p style="cursor:pointer">{{item.logtime}}{{item.addr}}</p>
        </div>
      </div>
      <!-- 视频弹框 -->
      <el-dialog :title="videoObj.addr" :visible.sync="videos" width="70%">
        <video-player
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="videoOption"
        ></video-player>
      </el-dialog>
      <!-- 图片滚动播放 -->
      <div class="userImage">
        <div style="font-size: 16px;font-weight: 700;">巡查拍照</div>
        <vueSeamless :data="videoList" :class-option="optionCustomer">
          <ul class="userImageAllWrapper">
            <li v-for="item in videoList" :key="item.index">
              <img :src="item.videoimgurl" width="240px" style="cursor:pointer" />
              <p style="cursor:pointer">{{item.logtime}}{{item.addr}}</p>
            </li>
          </ul>
        </vueSeamless>
      </div>
    </div>
  </div>
</template>

<script>
import vueSeamless from "vue-seamless-scroll";
import "videojs-contrib-hls";
export default {
  data() {
    return {
      videoObj: {},
      videos: false,
      videoList: [],
      show: false,
      // 展示数据
      shuldData: {}
    };
  },
  components: {
    vueSeamless
  },
  computed: {
    // 无缝滚动
    optionCustomer() {
      return {
        step: 0.8, // 数值越大速度滚动越快
        limitMoveNum: this.videoList.length, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 2, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      };
    },
    // 监控
    videoOption() {
      return {
        live: false,
        autoplay: false,
        language: "zh-CN",
        aspectRatio: "16:8",
        fluid: true,
        sources: [
          {
            // src: this.videoObj.videourl //url地址
            src:
              "http://hls01open.ys7.com/openlive/e2fb2c1f49e949cfac59ba80baee7a12.hd.m3u8"
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
      };
    }
  },
  watch: {
    // 提示
    number: function(val) {
      this.number = val;
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(this.number)) {
        this.$message({
          showClose: true,
          message: "请输入字母或数字",
          type: "error",
          offset: 155
        });
        // alert('请输入字母或数子')
      } else if (this.number.length > 10) {
        this.$message({
          showClose: true,
          message: "请输入不超过10位的数字或字母",
          type: "error",
          offset: 155
        });
        // alert("请输入不超过10位的数子字母")
        this.number = this.number.substr(0, 10);
      }
    }
  },
  created() {
    this.getData();
    this.$nextTick(() => {
      this.getVideoList();
    });
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getVideoList();
      }, 500);
    });
  },
  methods: {
    stringVideo() {
      this.$router.push("/town/supervision");
    },
    // 视频播放
    videoPlayer(item) {
      this.videos = true;
      this.videoObj = item;
      console.log(this.videoObj);
    },
    //视频接口
    getVideoList() {
      this.$http.post("/hw/main/video/list").then(res => {
        console.log(res.data);
        this.videoList = res.data;
      });
    },
    // 数据统计
    getData() {
      this.$http.post("hr/kaoqin/navbar").then(res => {
        console.log(res.data);
        this.shuldData = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.playerselect {
  width: 100%;
  height: 863px;
}

#player {
  width: 100%;
  height: 100%;
}

.pagination {
  text-align: center;
}

.playerTop {
  float: right;
  font-size: 16px;
  font-weight: 700;
  margin-top: 30px;
  padding-right: 20px;
  .warningDate {
    color: #000;
    text-align: center;
  }
}

.playerVideo {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: stretch;
  // position: absolute;
  // top: 50px;
  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .videoDiv {
    width: 240px;
    height: 200px;
    margin-left: 10px;
    margin-right: 12px;
  }
}

.userImage {
  // position: absolute;
  // bottom: 0px;
  margin-top: 50px;
  width: 100%;
  overflow: hidden;

  .userImageAllWrapper {
    width: 100%;
    list-style: none;
    display: flex;

    li {
      width: 240px;
      margin-left: 10px;
      border: 1px solid #ececec;

      p {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      img {
        display: flex;
      }
    }
  }
}
</style>

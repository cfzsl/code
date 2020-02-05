<template>
  <!-- 道路信息管理 -->
  <div id="vehicle">
    <div class="bdMap">
      <div class="menu">
        <div class="btn">
          <el-button type="primary" @click="showMap" v-show="!showmark">道路监控</el-button>
          <el-button type="primary" @click="addPlayer" v-show="!playerSelect">巡检平台</el-button>
        </div>
      </div>
      <!-- 播放视频 -->
      <div v-if="playerSelect">
        <playerselect class="playerselect"></playerselect>
      </div>
      <!-- 道路监控弹框 -->
      <el-dialog :title="title" :visible.sync="monitoring" @close="msg = {}" width="70%">
        <video-player
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="videoOption"
        ></video-player>
      </el-dialog>
      <!-- 点聚合 -->
      <baidu-map
        class="map"
        center="中国石油大学胜利学院"
        dragging
        :zoom="13"
        scroll-wheel-zoom
        v-if="showmark"
      >
        <!-- 控件 -->
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <bml-marker-clusterer
          :averageCenter="true"
          :opt_anchor="{lng: 118.592815,lat: 37.457724}"
          :styles="cssMap"
        >
          <bm-marker
            v-for="item in positions"
            :key="item.sid"
            :zIndex="zIndex"
            :position="{lng:item.lng,lat:item.lat}"
            :icon="{url: 'http://118.31.245.183:10500/images000/监控.png', size: {width: 38, height: 30}}"
            clicking
            @click="playerVideo(item)"
          ></bm-marker>
        </bml-marker-clusterer>
      </baidu-map>
    </div>
  </div>
</template>
<script>
import "videojs-contrib-hls";
import { BmlLushu } from "vue-baidu-map";
import { BmlMarkerClusterer } from "vue-baidu-map";
import playerselect from "../homeview/playerselect";
export default {
  data() {
    return {
      zIndex: 8888,
      playerSelect: false,
      // jurisdictionList: localStorage.getItem('jurisdiction'),
      //百度地图
      cssMap: [
        {
          url: "http://118.31.245.183:10500/images000/监控2.png",
          size: { width: 62, height: 32 },
          textColor: "#fff",
          padding: "10px"
        }
      ],
      showmark: true,
      monitoring: false,
      positions: [],
      src: null,
      title: null
    };
  },
  created() {
    this.getPositions();
    this.getjurisdictionList();
  },
  components: {
    BmlMarkerClusterer,
    BmlLushu,
    playerselect
  },
  computed: {
    // 监控
    videoOption() {
      return {
        live: false,
        preload: "auto",
        autoplay: true,
        language: "zh-CN",
        aspectRatio: "16:8",
        fluid: true,
        sources: [
          {
            src: this.src //url地址
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
  methods: {
    // 播放视频
    playerVideo(view) {
      this.monitoring=true;
      this.src = view.url;
      this.title = view.addr;
    },
    // 获取权限
    getjurisdictionList(){
      let _date={
        rolename:localStorage.getItem('role')
      };
      this.$http.post('/getFuncs',this.$qs.stringify(_date)).then(res=>{
        localStorage.setItem('jurisdiction', JSON.stringify(res.data))
        // console.log(localStorage.getItem('jurisdiction'))
      })
    },
    // 巡检
    addPlayer() {
      this.playerSelect = true;
      this.showmark = false;
    },
    showMap() {
      this.showmark = true;
      this.playerSelect = false;
    },
    // 获取监控坐标
    getPositions() {
      this.$http.post("RoadInfo/listAllRoadVideos").then(res => {
        this.positions = res.data;
        // console.log(res.data);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.el-dialog__body {
  padding: 0 20px;
}
.bdMap {
  position: relative;
  width: 100%;
  height: 100%;
  .menu {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 888;
    .btn {
      float: left;
      height: 25px;
    }
  }
  .map {
    position: relative;
    width: 100%;
    height: 834px;
    .input-with-select {
      position: absolute;
      right: 10px;
      top: 10px;
      width: 309px;
    }
  }
}
.playerselect {
  width: 100%;
  height: 863px;
}
</style>
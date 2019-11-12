<template>
  <div id="mapselect">
    <baidu-map class="map" center="东营区" dragging :zoom="12" scroll-wheel-zoom>
      <!-- 控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
      <!-- 划区 -->
      <!-- 黄河路二部 -->
      <bm-polygon
        :path="polygonPath1"
        stroke-color="yellow"
        fillColor="yellow"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="黄河路二部"
        :position="{ lng: 118.498772, lat: 37.444201 }"
        :labelStyle="labelStyle"
      />
      <!-- 黄河路一部 -->
      <bm-polygon
        :path="polygonPath8"
        stroke-color="#FFBB55"
        fillColor="#FFBB55"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="黄河路一部"
        :position="{ lng: 118.558065, lat: 37.429498 }"
        :labelStyle="labelStyle"
      />
      <!-- 辛店项目一部 -->
      <bm-polygon
        :path="polygonPath2"
        stroke-color="#5555FF"
        fillColor="#5555FF"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="辛店一部"
        :position="{ lng: 118.414978, lat: 37.458754 }"
        :labelStyle="labelStyle"
      />
      <!-- 辛店项目二部 -->
      <bm-polygon
        :path="polygonPath3"
        stroke-color="#FF22FF"
        fillColor="#FF22FF"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="辛店二部"
        :position="{ lng: 118.424109, lat: 37.507002 }"
        :labelStyle="labelStyle"
      />
      <!-- 文汇二部 -->
      <bm-polygon
        :path="polygonPath4"
        stroke-color="#FFBBD6"
        fillColor="#FFBBD6"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="文汇二部"
        :position="{ lng: 118.507328, lat: 37.499559 }"
        :labelStyle="labelStyle"
      />
      <!-- 文汇一部 -->
      <bm-polygon
        :path="polygonPath5"
        stroke-color="#55FF55"
        fillColor="#55FF55"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="文汇一部"
        :position="{ lng: 118.567551, lat: 37.489252 }"
        :labelStyle="labelStyle"
      />
      <!-- 胜园项目部 -->
      <bm-polygon
        :path="polygonPath6"
        stroke-color="#55FFFF"
        fillColor="#55FFFF"
        :stroke-opacity="0.8"
        :stroke-weight="1"
      />
      <bm-label
        content="文汇一部"
        :position="{ lng: 118.444519, lat: 37.422162 }"
        :labelStyle="labelStyle"
      />
      <!-- mark点 -->
      <bm-marker
        :position="{lng: 118.36, lat: 37.42}"
        :icon="{url: 'http://118.31.245.183:10500/images000/对讲机.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.520048, lat: 37.399597 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/清扫车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.394716, lat: 37.404183 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/洒水车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.693672, lat: 37.408082 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/垃圾运输车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :zIndex="index"
        v-for="item in carMarkerList"
        :key='item.codeStr'
        :position="{ lng: item.xbaidu, lat: item.ybaidu }"
        :icon="{url: 'http://118.31.245.183:10500/images000/三轮车.png', size: {width: 24, height: 24}}"
        @click="infoWindowOpen(item)"
      >
        <bm-info-window
          class="infoWindow"
          :position="{lng: carMarker.xbaidu, lat: carMarker.ybaidu}"
          title="垃圾运输车"
          :show="carMarker.show"
          @close="infoWindowClose(item)"
          @open="infoWindowOpen(item)"
        >
          <div>
            ID:
            <span>156541484681</span>
          </div>
          <div>
            状态:
            <span>静止</span>
          </div>
          <div>
            ACE状态:
            <span>开</span>电量:
            <span>60%</span>信号:
            <span>强</span>
          </div>
          <div>
            定位时间:
            <span>2019-10-31 10:30</span>
          </div>
          <div>
            停留时间:
            <span>2小时43分12秒</span>
          </div>
          <div>
            定位方式:
            <span>GPS</span>
          </div>
          <div>
            <a>实时跟踪</a>
            <a>历史轨迹</a>
            <a>电子栅栏</a>
            <a>设备信息</a>
          </div>
          <div>
            <a>查询指令记录</a>
            <a>下载轨迹</a>
          </div>
        </bm-info-window>
      </bm-marker>
      <div class="mapList">
        <div class="list">
          <img src="../../assets/img/洒水车.png" width="18px" height="24px" alt />
          <span>洒水车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/清扫车.png" width="18px" height="24px" alt />
          <span>清扫车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/垃圾运输车.png" width="18px" height="24px" alt />
          <span>垃圾运输车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/三轮车.png" width="18px" height="24px" alt />
          <span>三轮车</span>
        </div>
        <div class="list">
          <img class="duli" src="../../assets/img/对讲机.png" width="8px" height="24px" alt />
          <span>对讲机</span>
        </div>
      </div>
      <el-input placeholder="请输入要搜索的车牌号" v-model="input3" class="input-with-select">
        <el-button slot="append" @click="searchMap">搜索</el-button>
      </el-input>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelStyle: {
        color: "red",
        fontSize: "14px",
        border: "0px",
        backgroundColor: "rgba(0,0,0,0)"
      },
      index: 8888,
      // 测试
      marker: {},
      // 区域划分
      polygonPath1: [
        { lng: 118.498003, lat: 37.462778 },
        { lng: 118.525941, lat: 37.463812 },
        { lng: 118.524683, lat: 37.411427 },
        { lng: 118.489254, lat: 37.411563 },
        { lng: 118.489838, lat: 37.431277 },
        { lng: 118.497904, lat: 37.462871 }
      ],
      polygonPath8: [
        { lng: 118.525941, lat: 37.463812 },
        { lng: 118.558356, lat: 37.464415 },
        { lng: 118.605225, lat: 37.464039 },
        { lng: 118.602099, lat: 37.353996 },
        { lng: 118.555602, lat: 37.361397 },
        { lng: 118.524683, lat: 37.411427 }
      ],
      polygonPath2: [
        { lng: 118.489838, lat: 37.431277 },
        { lng: 118.4979, lat: 37.46287 },
        { lng: 118.501866, lat: 37.478343 },
        { lng: 118.401938, lat: 37.484535 },
        { lng: 118.389124, lat: 37.433032 }
      ],
      polygonPath3: [
        { lng: 118.501839, lat: 37.47834 },
        { lng: 118.503016, lat: 37.504512 },
        { lng: 118.519311, lat: 37.519568 },
        { lng: 118.425982, lat: 37.552083 },
        { lng: 118.402123, lat: 37.484878 }
      ],
      polygonPath4: [
        { lng: 118.497918, lat: 37.462869 },
        { lng: 118.501839, lat: 37.47834 },
        { lng: 118.503016, lat: 37.504512 },
        { lng: 118.519311, lat: 37.519568 },
        { lng: 118.5585, lat: 37.520406 },
        { lng: 118.558356, lat: 37.464415 }
      ],
      polygonPath5: [
        { lng: 118.5585, lat: 37.520406 },
        { lng: 118.558356, lat: 37.464415 },
        { lng: 118.605302, lat: 37.464029 },
        { lng: 118.604493, lat: 37.476516 },
        { lng: 118.597882, lat: 37.520091 }
      ],
      polygonPath6: [
        { lng: 118.489838, lat: 37.431277 },
        { lng: 118.444339, lat: 37.432946 },
        { lng: 118.443764, lat: 37.390646 },
        { lng: 118.488226, lat: 37.389854 }
      ],
      markers: {
        show: false,
        lng: 118.598237,
        lat: 37.463098
      },
      carMarkerList: [],
      carMarker: {},
      input3: ""
    };
  },
  created() {
    this.getMarkerList();
  },
  methods: {
    // 信息窗体
    infoWindowClose(item) {
      this.carMarker.show = false;
    },
    infoWindowOpen(item) {
      this.carMarker = item;
      this.carMarker.show = true;
    },
    //地图搜索
    searchMap() {},
    // 获取车辆点
    getMarkerList() {
      this.$http.post("xy/gpsSensor").then(res => {
        console.log(res.data);
        this.carMarkerList = res.data;
      });
    }
  }
};
</script>

<style lang="scss">
.map {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 800;
  .input-with-select {
    position: absolute;
    right: 150px;
    top: 10px;
    width: 309px;
  }
}

.warning {
  width: 100%;
  height: 100%;
}

.mapList {
  position: absolute;
  right: 10px;
  top: 10px;

  .list {
    display: flex;
    width: 130px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    align-items: center;
    justify-content: left;

    img {
      margin-left: 10px;
    }

    .duli {
      margin: 0 10px 0 14px;
    }

    span {
      margin-left: 6px;
    }
  }
}

.buttonrow {
  z-index: 800;
  font-size: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-weight: 400;

  .buttonrowL {
    border-radius: 6px 0 0 6px;
    height: 40px;
    width: 25%;
    line-height: 40px;
    margin-left: 1%;

    span {
      display: inline-block;
      margin: 0 auto;
    }
  }

  .oneself {
    background-color: #3b99f1;
  }

  .townself {
    background-color: #4eb14e;
  }

  .threeself {
    background-color: #ffb533;
  }

  .fourself {
    background-color: #f66134;
  }

  .fifself {
    background-color: #439dc5;
  }

  .sixself {
    background-color: #f29118;
  }

  .sevenself {
    background-color: #31cab5;
  }

  .oneselfnew {
    border: 2px solid #3b99f1;
    color: #3b99f1;
  }

  .townselfnew {
    border: 2px solid #4eb14e;
    color: #4eb14e;
  }

  .threeselfnew {
    border: 2px solid #ffb533;
    color: #ffb533;
  }

  .fourselfnew {
    border: 2px solid #f66134;
    color: #f66134;
  }

  .fifselfnew {
    border: 2px solid #439dc5;
    color: #439dc5;
  }

  .sixselfnew {
    border: 2px solid #f29118;
    color: #f29118;
  }

  .sevenselfnew {
    border: 2px solid #31cab5;
    color: #31cab5;
  }
}

.Troubleshooting {
  margin-left: 20px;
}

.red {
  color: red;
}

.hede {
  color: #000;
}

.infoWindow {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #323232;
  font-size: 14px;
  font-weight: 700;
  width: 316px;

  div {
    margin-top: 15px;

    span {
      font-weight: 400;
      margin-right: 22px;
    }

    a {
      font-weight: 400;
      margin-right: 5px;
      text-decoration: underline;
      color: #3b99f1;
    }
  }
}

.warningTop {
  .warningText1 {
    float: left;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-left: 20px;
    color: #fff;
  }
}

.warningDate {
  float: right;
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  padding-right: 20px;
  color: #fff;
}

.warningText {
  font-size: 16px;
  font-weight: 700;
  margin-left: 20px;
  color: #fff;
  margin-top: 20px;
  background: url(../../assets/img/biaoti.png) no-repeat;
}

.button {
  display: flex;
  font-size: 5px;
  color: #fff;
  margin-left: 1%;
  margin-top: 50px;
}

.buttonrow {
  z-index: 800;
  font-size: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  margin-left: 10px;
  .buttonrowL {
    border-radius: 6px 0 0 6px;
    height: 40px;
    width: 70%;
    line-height: 40px;
    margin-left: 3%;

    span {
      display: inline-block;
      margin: 0 auto;
    }
  }

  .oneself {
    background-color: #3b99f1;
  }

  .townself {
    background-color: #4eb14e;
  }

  .threeself {
    background-color: #ffb533;
  }

  .fourself {
    background-color: #f66134;
  }

  .fifself {
    background-color: #439dc5;
  }

  .sixself {
    background-color: #f29118;
  }

  .sevenself {
    background-color: #31cab5;
  }

  .oneselfnew {
    border: 2px solid #3b99f1;
    color: #3b99f1;
  }

  .townselfnew {
    border: 2px solid #4eb14e;
    color: #4eb14e;
  }

  .threeselfnew {
    border: 2px solid #ffb533;
    color: #ffb533;
  }

  .fourselfnew {
    border: 2px solid #f66134;
    color: #f66134;
  }

  .fifselfnew {
    border: 2px solid #439dc5;
    color: #439dc5;
  }

  .sixselfnew {
    border: 2px solid #f29118;
    color: #f29118;
  }

  .sevenselfnew {
    border: 2px solid #31cab5;
    color: #31cab5;
  }
}

.search {
  width: 100%;

  .el-form-item {
    display: inline-block;

    .el-input {
      width: 180px;
      font-size: 13px;
    }

    .selectTop {
      width: 180px;
      font-size: 13px;
    }
  }
}
.infoWindow {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #323232;
  font-size: 14px;
  font-weight: 700;
  width: 316px;

  div {
    margin-top: 15px;

    span {
      font-weight: 400;
      margin-right: 22px;
    }

    a {
      font-weight: 400;
      margin-right: 5px;
      text-decoration: underline;
      color: #3b99f1;
    }
  }
}
</style>

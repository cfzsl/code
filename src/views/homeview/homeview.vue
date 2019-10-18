<template>
  <div class="bdMap">
    <baidu-map class="map" center="中国石油大学胜利学院" dragging :zoom="14" scroll-wheel-zoom>
      <bm-marker
        v-for="(value,index) in positions"
        :key="index"
        :position="value"
        :dragging="true"
        animation="BMAP_ANIMATION_BOUNCE"
        :labelStyle="{color: 'orange', fontSize : '24px'}"
      ></bm-marker>
      <div class="mapList">
        <div class="list">
          <i style="background-color: blue"></i>
          <span>洒水车</span>
        </div>
        <div class="list">
          <i style="background-color: orange"></i>
          <span>清扫车</span>
        </div>
        <div class="list">
          <i style="background-color: green"></i>
          <span>垃圾运输车</span>
        </div>
        <div class="list">
          <i style="background-color: pink"></i>
          <span>三轮车</span>
        </div>
        <div class="list">
          <i style="background-color: #ccc"></i>
          <span>对讲机</span>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="success" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="info" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="warning" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="danger" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="warning" round>
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="danger" round>
          车况异常报警
          <br />(20)
        </el-button>
      </div>
      <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
        <el-button slot="append" @click="searchMap">搜索</el-button>
      </el-input>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      positions: [
        { lng: 118.550734, lat: 37.469664 },
        { lng: 118.566096, lat: 37.469922 },
        { lng: 118.54123, lat: 37.452391 }
      ]
    };
  },
  methods: {
    searchMap() {},
    map_init(){
        var map = new BMap.Map("allmap");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.bdMap {
  .map {
    position: relative;
    width: 100%;
    height: 746px;
    .input-with-select {
      position: absolute;
      right: 20px;
      top: 16px;
      width: 309px;
    }
  }
}
.mapList {
  position: absolute;
  left: 10px;
  top: 15px;
  width: 116px;
  height: 140px;
  background-color: #fff;
  text-align: center;
  div {
    position: relative;
    display: block;
    float: left;
    width: 100%;
    height: 28px;
    line-height: 28px;
    i {
      position: absolute;
      display: block;
      left: 9px;
      top: 9px;
      width: 12px;
      height: 12px;
      margin: 0 auto;
      border-radius: 15px;
    }
    span {
      display: inline;
    }
  }
}
.button {
  position: absolute;
  top: 10px;
  left: 194px;
  width: 826px;
  height: 44px;
}
</style>

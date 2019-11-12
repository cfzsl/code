<template>
  <div id="homeview">
    <div class="homeviewButton">
      <el-button type="primary" @click="addMap" v-show="mapSelect">地图</el-button>
      <el-button type="primary" @click="addWarning" v-show="warningSelect">数据中控台</el-button>
      <el-button type="primary" @click="addPlayer" v-show="playerSelect">巡检平台</el-button>
    </div>
    <!-- 地图 -->
    <div v-show="!mapSelect">
      <mapselect class="mapselect"></mapselect>
    </div>
    <!-- 大数据展示平台 -->
    <div v-show="!warningSelect">
      <warningselect class="warningselect"></warningselect>
    </div>
    <!-- 播放视频 -->
    <div v-if="!playerSelect">
      <playerselect class="playerselect"></playerselect>
    </div>
  </div>  
</template>
<script>
import playerselect from "./playerselect";
import warningselect from "./warningselect";
import mapselect from "./mapselect";
var echarts = require("echarts");
export default {
  data() {
    return {
      mapSelect: false,
      warningSelect: true,
      playerSelect: true
    };
  },
  components: {
    mapselect,
    warningselect,
    playerselect
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
  methods: {
    //页面控制
    addMap() {
      this.mapSelect = false;
      this.warningSelect = true;
      this.playerSelect = true;
    },
    addWarning() {
      this.mapSelect = true;
      this.warningSelect = false;
      this.playerSelect = true;
    },
    addPlayer() {
      this.mapSelect = true;
      this.warningSelect = true;
      this.playerSelect = false;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
#homeview {
  position: relative;
  width: 100%;
  height: 100%;
}

.homeviewButton {
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 900;
}
.mapselect {
  width: 100%;
  height: 863px;
}
.warningselect {
  width: 100%;
  height: 863px;
}

.playerselect {
  width: 100%;
  height: 863px;
}
</style>

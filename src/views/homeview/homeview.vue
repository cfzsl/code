<template>
  <div id="homeview">
    <div class="homeviewButton">
      <el-button type="primary" @click="addMap">地图</el-button>
      <el-button type="primary" @click="addWarning">预警信息</el-button>
      <el-button type="primary" @click="addPlayer">视屏播放</el-button>
    </div>
    <router-view class="router-view"></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    addMap() {
      this.$router.push("/Map");
    },
    addWarning() {
      this.$router.push("/warning");
    },
    addPlayer() {
      this.$router.push("/player");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.homeview {
  position: relative;
  .homeviewButton {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 100px;
  }
}
</style>

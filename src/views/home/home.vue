<template>
  <div id="home">
    <el-container>
      <el-header height='70px'><Top></Top></el-header>
      <el-container>
        <el-aside width="282px"><Asd></Asd></el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "@/components/header/top";
import Asd from "@/components/Aside/Aside";
export default {
  components: {
    Top,
    Asd
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scopedlang='scss' scoped>
.el-header {
    padding: 0;
}
.el-aside {
  display: block;
  position: absolute;
  left: 0;
  top: 86px;
  bottom: 140px;
	height: 814px;
	background-color: #3f4d5c;
	border: solid 1px #d2d2d2;
}
.el-main {
  display: block;
  position: absolute;
  left: 252px;
  top: 96px;
  bottom: 0;
  right: 0;
  margin-right: 10px;
  padding: 0 0 0 40px;
}
</style>
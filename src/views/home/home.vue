<template>
  <div id="home">
    <el-container>
      <el-header height='70px'><Top></Top></el-header>
      <el-container>
        <el-aside width="245px"><Asd></Asd></el-aside>
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
  height: 92%;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 140px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 3px 0px 5px rgba(215, 215, 215, 0.349019607843137);
}
.el-main {
  display: block;
  position: absolute;
  left: 245px;
  top: 70px;
  bottom: 0;
  right: 0;
  padding: 0 0 0 40px;
}
</style>

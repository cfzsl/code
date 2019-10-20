<template>
  <div id="home">
    <el-container>
      <el-header height="86px">
        <Top></Top>
      </el-header>
      <el-container class="se-container">
        <el-aside width="282px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Top from "@/components/header/top";
import Aside from "@/components/Aside/Aside";
export default {
  components: {
    Top,
    Aside
  }
};
</script>

<style lang="scss">
.el-header {
  padding: 0;
  z-index: 999;
}

.se-container {
  height: calc(100vh - 86px);
  .el-aside {
    height: 100%;
    background-color: #3f4d5c;
  }
  .el-main {
    height: 100%;
  }
}
</style>

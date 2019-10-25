<template>
  <div id="home">
    <el-container>
      <el-header height="86px">
        <Top></Top>
      </el-header>
      <el-container class="se-container">
        <el-aside>
          <Aside @asideEnd="getAsideEnd" @asideOpen="getAsideOpen"></Aside>
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
  data() {
    return {
      drawer: true,
      direction: "ltr"
    };
  },
  methods: {
    getAsideEnd(date) {
      this.drawer = date;
      console.log(this.drawer);
    },
    getAsideOpen(date) {
      this.drawer = date;
      console.log(this.drawer);
    }
  },
  components: {
    Top,
    Aside
  }
};
</script>

<style lang="scss">
.el-header {
  padding: 0;
  z-index: 9999;
}
.se-container {
  height: calc(100vh - 86px);
  .el-aside {
    width: 282px;
    height: 100%;
    background-color: #3f4d5c;
  }
  .el-main {
    padding: 10px !important;
    width: 100%;
    height: 100%;
  }
}
.el-divider--horizontal {
  margin: 0;
}
</style>

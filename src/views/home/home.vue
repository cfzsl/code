<template>
  <div id="home">
    <el-container>
      <el-header height="86px">
        <Top @asideEnd="asideEnd" @asideOpen="asideOpen"></Top>
      </el-header>
      <el-container class="se-container">
        <transition name="fade">
          <el-aside v-show="drawer">
            <Aside></Aside>
          </el-aside>
        </transition>
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
    asideEnd(open) {
      this.drawer = open;
      console.log(this.drawer);
    },
    asideOpen(open) {
      this.drawer = open;
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
    // width: 282px;
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
.el-dialog__body {
  padding: 0 20px 30px 20px !important;
}
.fade-enter-active {
  animation: bounce-in 1s linear;
}
.fade-leave-active {
  animation: bounce-leave 1s;
}
@keyframes bounce-in {
  0% {
    width: 0px;
  }
  100% {
    width: 282px;
  }
}
@keyframes bounce-leave {
  0% {
    width: 282px;
  }
  100% {
    width: 0px;
  }
}

.el-textarea .el-textarea__inner{
  resize: none;
}
</style>

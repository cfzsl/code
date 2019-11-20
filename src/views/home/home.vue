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
  created(){
    this.getjurisdictionList()
  },
  methods: {
    asideEnd(open) {
      this.drawer = open;
      console.log(this.drawer);
    },
    asideOpen(open) {
      this.drawer = open;
      console.log(this.drawer);
    },
    // 获取权限
    getjurisdictionList(){
      let _date={
        rolename:localStorage.getItem('role')
      };
      this.$http.post('/getFuncs',this.$qs.stringify(_date)).then(res=>{
        localStorage.setItem('jurisdiction', JSON.stringify(res.data))
      })
    },
  },
  components: {
    Top,
    Aside
  },
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
    padding: 10px !important;
    width: 100%;
    height: 100%;
  }
}
.el-divider--horizontal {
  margin: 0;
}
.el-dialog__body {
  padding: 0 20px 20px 20px;
  overflow: hidden;
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
.el-tabs__item {
  color: #fff;
}
.el-tabs__item.is-active {
  color: #fff;
}
.el-tabs__active-bar {
  background-color: #fff;
}
.el-textarea .el-textarea__inner {
  resize: none;
}
.el-carousel__container {
  height: 100% !important;
}
</style>

<template>
  <el-menu
    router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    unique-opened
    :default-active="$route.path"
    background-color="#4a5e70"
    text-color="#fff"
    active-text-color="#3b99f1"
  >
    <el-menu-item index="/homeview">
      <span class="iconfont icon-shouye"></span>
      <span>首页</span>
    </el-menu-item>
    <el-submenu index="/onece">
      <template slot="title">
        <span class="iconfont icon-huanweicheguanli"></span>
        <span>环卫车辆管理</span>
      </template>
      <el-menu-item index="/onece/base">
        <span class="iconfont icon-renyuanxinxiguanli"></span>人员信息管理
      </el-menu-item>
      <el-menu-item index="/onece/carmsg">
        <span class="iconfont icon-cheliangxinxiguanli"></span>车辆信息管理
      </el-menu-item>
      <el-menu-item index="/onece/vehicle">
        <span class="iconfont icon-cheliangzonghejianguan"></span>车辆综合监管
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/town">
      <template slot="title">
        <span class="iconfont icon-huanweigongguanli"></span>
        <span>环卫工管理</span>
      </template>
      <el-menu-item index="/town/worker">
        <span class="iconfont icon-renyuanxinxiguanli"></span>人员信息管理
      </el-menu-item>
      <el-menu-item index="/town/carmsg">
        <span class="iconfont icon-cheliangxinxiguanli2"></span>车辆信息管理
      </el-menu-item>
      <el-menu-item index="/town/supervision">
        <span class="iconfont icon-richangjianguan"></span>日常监管
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/welcom">
      <template slot="title">
        <span class="iconfont icon-gongceguanli"></span>
        <span>公厕管理</span>
      </template>
      <el-menu-item index="/welcom/wcmap">
        <span class="iconfont icon-gongcefenbutu"></span>公厕分布图
      </el-menu-item>
      <el-menu-item index="/welcom/toiltMsg">
        <span class="iconfont icon-gongcexiangqing"></span>公厕详情
      </el-menu-item>
      <el-menu-item index="/welcom/WcSupervision">
        <span class="iconfont icon-shouye"></span>公厕管理
      </el-menu-item>
      <el-menu-item index="/welcom/Personnel">
        <span class="iconfont icon-zhibanrenyuan"></span>值班人员管理
      </el-menu-item>
      <el-menu-item index="/welcom/LED" >
        <span class="iconfont icon-LEDdianziping"></span>LED电子屏管理
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/business">
      <template slot="title">
        <span class="iconfont icon-yewuchuli"></span>
        <span>业务处理</span>
      </template>
      <el-menu-item index="/business/process">
        <span class="iconfont icon-yewuchuli"></span>业务处理表
      </el-menu-item>
      <el-menu-item title="未完成" index="/business/project">
        <span class="iconfont icon-xinchouguanli"></span>绩效考核表
      </el-menu-item>
    </el-submenu>
    <el-submenu index="/matters">
      <template slot="title">
        <span class="iconfont icon-renshiguanli"></span>
        <span>人事管理与通讯</span>
      </template>
      <!-- <el-menu-item index="2" title="未完成">
        <span class="iconfont icon-renyuanxinxiguanli"></span>人事信息管理
      </el-menu-item>
      <el-menu-item index="1" title="未完成">
        <span class="iconfont icon-tongxunlu"></span>通讯录
      </el-menu-item> -->
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      this.$router.push(key);
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key);
    }
  },
  created() {}
};
</script>

<style lang="scss">
.iconfont {
  margin-right: 8px;
}
</style>

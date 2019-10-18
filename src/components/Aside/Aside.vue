<template>
  <el-col>
    <el-menu
      router
      class="el-menu-vertical-demo"
      background-color="rgba(204, 204, 204, 1)"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="1">
        <template slot="title">
          <el-menu-item index="/onece" class="temtitle">环卫车辆管理</el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item index="/onece/base" class='bgcColor'>人员信息管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/onece/carmsg" class='bgcColor'>车辆信息管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/onece/vehicle" class='bgcColor'>车辆综合监管</el-menu-item>
        <el-divider></el-divider>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="2">
        <template slot="title">
          <el-menu-item index="/town" class="temtitle">环卫工管理</el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item index="/town/worker" class='bgcColor'>人员信息管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/town/carmsg" class='bgcColor'>车辆信息管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/town/supervision" class='bgcColor'>日常监管</el-menu-item>
        <el-divider></el-divider>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="3">
        <template slot="title">
          <el-menu-item index="/welcom" class="temtitle">公厕管理</el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item index="/welcom/wcmap" class='bgcColor'>公厕分布图</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="/welcom/toiltMsg" class='bgcColor'>公厕详情</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item title='未完成'  class='bgcColor'>公厕管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item title='未完成'  class='bgcColor'>值班人员管理</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item title='未完成'  class='bgcColor'>LED电子屏管理</el-menu-item>
        <el-divider></el-divider>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="4">
        <template slot="title">
          <el-menu-item index="/business" class="temtitle">业务处理</el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item index="/business/process" class='bgcColor'>业务处理表</el-menu-item>
        <el-divider></el-divider>
        <el-menu-item title='未完成' index="/business/project" class='bgcColor'>绩效考核表</el-menu-item>
        <el-divider></el-divider>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="5">
        <template slot="title">
          <el-menu-item index="/matters" class="temtitle">人事管理与通讯</el-menu-item>
        </template>
        <el-divider></el-divider>
        <el-menu-item title='未完成' class='bgcColor'>人事信息管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-col>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {}
};
</script>
 <style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.temtitle {
  margin: 0;
  font-family: "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
}
.bgcColor {
  background-color: #ededed !important;
}
.el-menu-item {
  text-align: center;
}
.el-divider {
  margin: 0;
  background-color: #fff;
}
.el-menu-item {
  background-color: #fff;
  background-color: #fff;
}
</style>

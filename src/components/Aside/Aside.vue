<template>
  <el-row class="tac">
    <el-col>
      <el-menu router unique-opened :default-active="activeIndex" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <span>车辆管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/base">人员信息管理</el-menu-item>
            <el-menu-item index="carmsg">车辆信息管理</el-menu-item>
            <el-menu-item index>车辆监管</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="2">
          <template slot="title">
            <span>环卫工管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="worker">人员信息管理</el-menu-item>
            <el-menu-item index="wcarmsg">车辆信息管理</el-menu-item>
            <el-menu-item index="wsupervision">日常监管</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="3">
          <template slot="title">
            <span>公厕管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="supervision">公厕监管</el-menu-item>
            <el-menu-item index="toiltmsg">公厕信息管理</el-menu-item>
            <el-menu-item index="personnel">值班人员管理</el-menu-item>
            <el-menu-item index="led">LED电子屏管理</el-menu-item>
            <el-menu-item index="monitor">公厕监控管理</el-menu-item>
            <el-menu-item index="mobile">移动端公厕引导</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="4">
          <template slot="title">
            <span>人事管理与通讯</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="hr">人事管理</el-menu-item>
            <el-menu-item index="assessment">绩效考核</el-menu-item>
            <el-menu-item index="message">信息发布</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.name
    };
  },
  created() {}
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.el-menu-item-group__title {
  padding: 0px;
  line-height: normal;
  font-size: 12px;
  color: #909399;
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

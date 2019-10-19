<template>
  <el-col>
    <el-menu
      router
      class="el-menu-vertical-demo"
      background-color="#4a5e70"
      unique-opened
      active-text-color='#6681fa'
      @open="handleOpen"
      @close="handleClose"
    >
      <el-submenu index="0">
        <template slot="title">
          <el-menu-item index="/homeview" class="temtitle"><i class='el-icon-house'></i>首页</el-menu-item>
        </template>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="1">
        <template slot="title">
          <el-menu-item index="/onece" class="temtitle"><i class='truck'></i>环卫车辆管理</el-menu-item>
        </template>
        <el-menu-item index="/onece/base" class="bgcColor"> <i class='postcard idmark'></i> &nbsp &nbsp &nbsp人员信息管理</el-menu-item>
        <el-menu-item index="/onece/carmsg" class="bgcColor"> <i class='card '></i>&nbsp &nbsp &nbsp 车辆信息管理</el-menu-item>
        <el-menu-item index="/onece/vehicle" class="bgcColor"> <i class='box'></i>&nbsp &nbsp &nbsp车辆综合监管</el-menu-item>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="2">
        <template slot="title">
          <el-menu-item index="/town" class="temtitle"> <i class='el-icon-user'></i>环卫工管理</el-menu-item>
        </template>
        <el-menu-item index="/town/worker" class="bgcColor"> <i class='worker'></i>&nbsp &nbsp &nbsp人员信息管理</el-menu-item>
        <el-menu-item index="/town/carmsg" class="bgcColor">  <i class='carmsg'></i>&nbsp &nbsp &nbsp车辆信息管理</el-menu-item>
        <el-menu-item index="/town/supervision" class="bgcColor">  <i class='supervision'></i>&nbsp &nbsp &nbsp日常监管</el-menu-item>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="3">
        <template slot="title">
          <el-menu-item index="/welcom" class="temtitle"><i class='user'></i>公厕管理</el-menu-item>
        </template>
        <el-menu-item index="/welcom/wcmap" class="bgcColor"> <i class='wcmap'></i> &nbsp &nbsp &nbsp公厕分布图</el-menu-item>
        <el-menu-item index="/welcom/toiltMsg" class="bgcColor"> <i class='toiltMsg'></i>&nbsp &nbsp &nbsp公厕详情</el-menu-item>
        <el-menu-item title="未完成" class="bgcColor"> <i class='wwc1'></i>&nbsp &nbsp &nbsp公厕管理</el-menu-item>
        <el-menu-item title="未完成" class="bgcColor"><i class='wwc2'></i>&nbsp &nbsp &nbsp值班人员管理</el-menu-item>
        <el-menu-item title="未完成" class="bgcColor"> <i class='wwc3'></i>&nbsp &nbsp &nbspLED电子屏管理</el-menu-item>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="4">
        <template slot="title">
          <el-menu-item index="/business" class="temtitle"> <i class='business'></i>业务处理</el-menu-item>
        </template>
        <el-menu-item index="/business/process" class="bgcColor"> <i class='process'></i>&nbsp &nbsp &nbsp 业务处理表</el-menu-item>
        <el-menu-item title="未完成" index="/business/project" class="bgcColor"><i class='project'></i>&nbsp &nbsp &nbsp 绩效考核表</el-menu-item>
      </el-submenu>
      <el-divider></el-divider>
      <el-submenu index="5">
        <template slot="title">
          <el-menu-item index="/matters" class="temtitle"> <i class='matters'></i>人事管理与通讯</el-menu-item>
        </template>
        <el-menu-item title="未完成" class="bgcColor">  <i class='wwc4'></i>&nbsp &nbsp &nbsp人事信息管理</el-menu-item>
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
  position: relative;
  margin: 0;
  font-family: "Arial Normal", "Arial";
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #ffffff;
  i {
    position: absolute;
    display: inline-block;
    width: 18px;
    height: 14px;
    line-height: 14px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
}
.truck {
  background:url('../../assets/wcpng/环卫车管理.png') no-repeat;
}
.postcard {
  background:url('../../assets/wcpng/环卫工管理.png') no-repeat;  
}
.card {
  background:url('../../assets/wcpng/环卫车管理.png') no-repeat;    
}
.box {
  background:url('../../assets/wcpng/车辆综合监管.png') no-repeat;    
}
.el-icon-user {
  background:url('../../assets/wcpng/环卫工管理.png') no-repeat;    
}
.worker {
  background:url('../../assets/wcpng/环卫工管理.png') no-repeat;      
}
.supervision {
  background:url('../../assets/wcpng/日常监管.png') no-repeat;      
}
.user {
  background:url('../../assets/wcpng/公厕管理.png') no-repeat;      
}
.wcmap {
  background:url('../../assets/wcpng/公厕分布图.png') no-repeat;      
}
.toiltMsg {
  background:url('../../assets/wcpng/公厕详情.png') no-repeat;      
}
.wwc1 {
  background:url('../../assets/wcpng/公厕管理.png') no-repeat;      
}
.wwc2 {
  background:url('../../assets/wcpng/值班人员.png') no-repeat;      
}
.wwc3 {
  background:url('../../assets/wcpng/LED电子屏.png') no-repeat;      
}
.carmsg {
  background:url('../../assets/wcpng/环卫车管理.png') no-repeat;      
}
.business {
  background:url('../../assets/wcpng/业务处理.png') no-repeat;        
}
.process {
  background:url('../../assets/wcpng/业务处理.png') no-repeat;          
}
.project {
  background:url('../../assets/wcpng/出勤统计.png') no-repeat;          
}
.matters {
  background:url('../../assets/wcpng/人事管理.png') no-repeat;            
}
.wwc4 {
  background:url('../../assets/wcpng/值班人员.png') no-repeat;            
}
.bgcColor {
  background-color: #3f4d5c !important;
  // text-align: center !important;
}
.el-menu {
  border: 0px;
  z-index: 1000;
}
.el-menu-item {
  position: relative;
  font-size: 14px;
  height: 48px;
  text-align: left;
  i{
    position: absolute;
    display: inline-block;
    width: 18px;
    height: 14px;
    line-height: 14px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.el-divider {
  margin: 0;
  background-color: #3f4d5c;
}
.el-menu-item {
  color: #fff;
}
</style>

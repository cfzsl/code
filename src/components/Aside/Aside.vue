<template>
  <el-menu
    router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    unique-opened
    background-color="#4a5e70"
    :default-active="$route.path"
    text-color="#fff"
    active-text-color="#3b99f1"
  >
    <!-- <el-menu-item index="/homeview">
      <span class="iconfont icon-shouye"></span>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/onece/carmsg">
      <span class="iconfont icon-cheliangxinxiguanli"></span>环卫车辆管理
    </el-menu-item>
    <el-menu-item index="/town/carmsg">
      <span class="iconfont icon-cheliangxinxiguanli2"></span>三轮车管理
    </el-menu-item>-->
    <el-menu-item index="/town/supervision">
      <span class="iconfont icon-cheliangxinxiguanli2"></span>道路信息管理
    </el-menu-item>
    <!-- <a href="http://47.110.160.217:5080/"> -->
    <el-menu-item index @click="postWc">
      <span class="iconfont icon-gongceguanli"></span>
      公厕管理
    </el-menu-item>
    <!-- </a> -->
    <!-- <el-submenu index="/onece/base">
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
    <el-submenu index="/town/worker">-->
    <!-- <template slot="title">
        <span class="iconfont icon-huanweigongguanli"></span>
        <span>环卫工管理</span>
      </template>
      <el-menu-item index="/town/worker">
        <span class="iconfont icon-renyuanxinxiguanli"></span>人员信息管理
      </el-menu-item>
      <el-menu-item index="/town/carmsg">
        <span class="iconfont icon-cheliangxinxiguanli2"></span>三轮车管理
      </el-menu-item>
      <el-menu-item index="/town/supervision">
        <span class="iconfont icon-richangjianguan"></span>日常监管
      </el-menu-item>
    </el-submenu>-->
    <!-- <el-submenu index="/welcom/wcmap">
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
      <el-menu-item index="/welcom/LED">
        <span class="iconfont icon-LEDdianziping"></span>LED电子屏管理
      </el-menu-item>
    </el-submenu>-->
    <el-submenu index="/matters/HRManagement">
      <template slot="title">
        <span class="iconfont icon-renshiguanli"></span>
        <span>人事管理</span>
      </template>
      <el-menu-item index="/matters/HRManagement">
        <span class="iconfont icon-renyuanxinxiguanli"></span>组织结构
      </el-menu-item>
      <el-menu-item index="/AddressBook">
        <span class="iconfont icon-tongxunlu"></span>通讯录
      </el-menu-item>
      <!-- <el-menu-item index="/matters/Adance">
        <span class="iconfont icon-chuqintongji"></span>人员考勤
      </el-menu-item>-->
      <!--<el-menu-item index="/matters/bonus">
        <span class="iconfont icon-xinchouguanli"></span>奖金管理
      </el-menu-item>
      <el-menu-item index="/Attendance">
        <span class="iconfont icon-chuqintongji"></span>出勤统计
      </el-menu-item>
      <el-menu-item index="/Recruitment">
        <span class="iconfont icon-zhaopinguanli"></span>招聘管理
      </el-menu-item>-->
    </el-submenu>
    <el-menu-item index="/business/process">
      <span class="iconfont icon-yewuchuli"></span>质量安全管理
    </el-menu-item>
    <!-- <el-submenu index="/business/process">
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
    </el-submenu>-->
    <el-menu-item index="/town/worker">
      <span class="iconfont icon-tongzhigonggao"></span>系统通知
    </el-menu-item>
    <el-menu-item index="/materiel">
      <span class="iconfont icon-zhaopinguanli"></span>物料采购管理
    </el-menu-item>
    <el-menu-item index="/logList" v-show="jurisdictionList.indexOf('操作日志-查看')==-1?false:true">
      <span class="iconfont icon-yewuchuli"></span>操作日志
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      jurisdictionList: [],
    };
  },
  methods: {
    //展开
    handleOpen(key, keyPath) {
      this.$router.push(key);
      // console.log(key, keyPath);
    },
    //
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
      // this.$router.push(key);
    },
    postWc() {
      location.href =
        "http://47.110.160.217:5080/login/adminLogin?username=admin&password=1";
    },
    // 获取权限
     getjurisdictionList(){
      let _date={
        rolename:localStorage.getItem('role')
      };
      this.$http.post('/getFuncs',this.$qs.stringify(_date)).then(res=>{
        this.jurisdictionList=res.data;
      })
    },
  },
  created() {
    this.getjurisdictionList();
  }
};
</script>

<style lang="scss">
.iconfont {
  margin-right: 8px;
}
</style>

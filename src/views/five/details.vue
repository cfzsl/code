<template>
  <div id="details">
    <div class="detailsHead">
      <div>个人详情信息</div>
      <el-button @click="gozero">返回</el-button>
    </div>
    <el-divider></el-divider>
    <div class="center">
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      wcList: [
        {
          number: 1,
          name: "李诞",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "环卫工",
          education: "初中",
          state: "在职",
          basepay: "3000",
          subsidies: "300",
          msg: "36",
          policeNode: "10"
        },
        {
          number: 2,
          name: "张圆圆",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "洒水车司机",
          education: "大专",
          state: "在职",
          basepay: "3600",
          subsidies: "500",
          msg: "42",
          policeNode: "11"
        },
        {
          number: 3,
          name: "刘波",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "垃圾运输车司机",
          education: "高中",
          state: "离职",
          basepay: "3200",
          subsidies: "600",
          msg: "54",
          policeNode: "12"
        }
      ]
    };
  },
  created() {
    this.getId();
  },
  methods: {
    gozero() {
      this.$router.push({
        path: "/matters/HRManagement"
      });
    },
    //   route传值
    getId() {
      this.id = this.$route.query.id;
      console.log(this.id);
    }
  }
};
</script>

<style  lang="scss" scoped>
.detailsHead {
  width: 100%;
  display: flex;
  padding: 0 23px;
  font-family: PingFangSC-Regular;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  div {
    font-size: 18px;
    color: #3b99f1;
  }
  .el-button {
    font-size: 12px;
    width: 70px;
    height: 30px;
    background-color: #3b99f1;
    border-radius: 4px;
    color: #fff;
  }
}
.center {
  margin: 10px;
}
.el-col {
  border: 1px solid #ccc;
  height: 50px;
}
</style>

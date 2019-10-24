<template>
  <div id="details">
    <div class="detailsHead">
      <div>个人详情信息</div>
      <el-button @click="gozero">返回</el-button>
    </div>
    <el-divider></el-divider>
    <div class="center">
      <div class="head">
        <div class="basic">基本讯息</div>
        <div class="modify">修改</div>
      </div>
      <div class="table">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">姓名：{{detail.name}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">性别：男</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">年龄：{{detail.msg}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">岗位：{{detail.job}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">单位：{{detail.date}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">区域：{{detail.region}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">学历：{{detail.education}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">电话：{{detail.phone}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">部门：环卫部</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">婚姻状况：已婚</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">紧急联系人：刘月15087635633</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">身体状态：良</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">入职时间：2016-9-10</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">状态：{{detail.state}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">离职时间：——</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">住址：东营区滨湖大道花园社区1栋2单元302</div>
          </el-col>
        </el-row>
      </div>
      <div class="head">
        <div class="basic">基本讯息</div>
        <div class="modify">修改</div>
      </div>
      <div class="table">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">基本工资：{{detail.basepay}}元/月</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">用餐补助：300元/月</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">交通补助: 200元/元</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">通讯补助：/</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">是否缴纳保险：是</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">是否缴纳公积金：否</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">每月休息：4天</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">上班时间：6:00-12:00 13:00-15:00</div>
          </el-col>
        </el-row>
      </div>
      <div class="contract">合同文件</div>
      <el-upload
        class="upload-demo"
        drag
        accept="pdf"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
      >
        <div class="el-upload__text">
          只能上传pdf文件
          <em>点击上传</em>
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      detail: {},
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
    this.getdetail();
  },

  methods: {
    getdetail() {
      this.detail = this.wcList.filter(item => item.number == this.id)[0];
    },
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
  margin: 20px;
  .head {
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    color: #3f3f3f;
    .basic {
      font-family: PingFangSC-Regular;
    }
    .modify {
      font-size: 14px;
    }
  }
  .table {
    margin-bottom: 50px;
  }
  .el-upload-dragger{
    width: 100% !important;
    height: 40 !important;
    background-color: #c4def8 !important;
  }
}
.el-col {
  border: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  div {
    margin-left: 10px;
  }
}
</style>

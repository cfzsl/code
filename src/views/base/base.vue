<template>
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input class="searchInput" v-model="formInline.user" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select class="searchInput" v-model="formInline.region" placeholder="活动区域">
              <el-option label="东营区" value="shanghai"></el-option>
              <el-option label="滨洲区" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动单位">
            <el-select class="searchInput" v-model="formInline.relog" placeholder="活动单位">
              <el-option label="环卫一部" value="shanghai"></el-option>
              <el-option label="环卫二部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询人员讯息</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="searchBot">
        <el-button class="buttonBot">点击打开 Dialog</el-button>
        <el-button class="buttonBot">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast">导出全员信息</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- 表格 -->
    <div class="table">
      <Table></Table>
    </div>
    <div class="pagination">
      <el-pagination background :page-size="100" layout="prev, pager, next" :total="900"></el-pagination>
    </div>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: "",
        relog: "",
        msgadd: false,
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  components: {
    Table
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  width: 1128px;
  height: 76px;
  margin-top: 16px;
  .searchBot {
    float: right;
    .buttonBot {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
    }
    .buttonBotLast {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
      margin: 0;
    }
  }
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
}
.pagination {
  float: right;
  margin-right: 16px;
}
</style>
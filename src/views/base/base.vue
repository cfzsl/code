<template>
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input
              class="searchInput"
              v-model="formInline.user"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select
              class="searchInput"
              v-model="formInline.region"
              placeholder="活动区域"
            >
              <el-option label="东营区" value="shanghai"></el-option>
              <el-option label="滨州区" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动单位">
            <el-select
              class="searchInput"
              v-model="formInline.relog"
              placeholder="活动单位"
            >
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
        <el-button class="buttonBot" @click="dialogVisible = true"
          >添加人员信息</el-button
        >
        <el-button class="buttonBot">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast">导出全员信息</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="添加人员信息"
      :visible.sync="dialogVisible"
      width="426px"
      class="dialogText"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="formTop">
          <el-form-item label="区域" class="formTopSelected">
            <el-select
              v-model="formInline.region"
              placeholder="活动区域"
              class="selectTop"
            >
              <el-option label="东营区" value="shanghai"></el-option>
              <el-option label="滨州区" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位">
            <el-select
              v-model="formInline.relog"
              placeholder="活动单位"
              class="selectTop"
            >
              <el-option label="环卫一部" value="shanghai"></el-option>
              <el-option label="环卫二部" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="formInline.stated"
            placeholder="状态"
            class="selectBot"
          >
            <el-option label="在职" value="shanghai"></el-option>
            <el-option label="离职" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input v-model="formInline.addtime"></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input v-model="formInline.updatetime"></el-input>
        </el-form-item>
        <el-form-item label="负责道路名称">
          <el-select
            v-model="formInline.region"
            placeholder="负责道路名称"
            class="selectBot"
          >
            <el-option label="滨湖大道" value="shanghai"></el-option>
            <el-option label="翠湖公园路" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责区域范围">
          <el-select
            v-model="formInline.region"
            placeholder="负责区域范围"
            class="selectBot"
          >
            <el-option label="东营翠湖公园" value="shanghai"></el-option>
            <el-option label="陶然公园" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
          class="formButon"
          >保存</el-button
        >
      </span>
    </el-dialog>
    <!-- 表格 -->
    <div class="table">
      <Table></Table>
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
        relog: ""
      },
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      console.log("查啥?");
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
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
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
.dialogText {
  text-align: center;
}
.demo-form-inline {
  text-align: right;
  .formTop {
    width: 100%;
    margin-bottom: 16px;
    .formTopSelected {
      float: left;
      padding-left: 50px;
    }
    .selectTop {
      width: 104px;
      height: 22px;
      text-align: center;
    }
  }
  .el-form-item {
    margin-bottom: 2px;
    .el-input {
      width: 240px;
      height: 32px;
    }
  }
  .selectBot {
    width: 240px;
    height: 32px;
  }
}
.formButon {
  width: 127px;
  height: 40px;
  text-align: center;
}
.pagination {
  float: right;
  margin-right: 16px;
}
</style>

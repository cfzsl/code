<template>
  <!-- 操作日志 -->
  <div id="loglist">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="记录时段" class="msgWc">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="search.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onDeil">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 导出日志 -->
      <div class="searchBot">
        <el-button class="buttonBot" type="primary" @click="exportLog">导出日志</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="logList.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="wcid" label="时间" width></el-table-column>
      <el-table-column align="center" prop="date" label="姓名" width="282"></el-table-column>
      <el-table-column align="center" prop="state" label="归属单位" width></el-table-column>
      <el-table-column align="center" prop="name" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="phone" label="操作模块" width></el-table-column>
      <el-table-column align="center" prop="text" label="操作内容" width="282"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currpage"
      :page-size="data.pagesize"
      class="paginationList"
      background
      :page-sizes="[10,20,30,40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="logList.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      search: {
        date: "",
        name: "",
        content: ""
      },
      // 分页
      data: {
        pagesize: 10,
        currpage: 1
      },

      formInline: {},
      logList: [],
    };
  },
  methods: {
    // 查询
    onSubmit() {
      console.log("查啥?");
    },
    // 清除
    onDeil() {
      this.search = {
        date: "",
        name: "",
        content: ""
      };
    },
    // 导出日志
    exportLog() {
      console.log("导出日志");
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 76px;
  margin-top: 16px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBot {
    position: absolute;
    bottom: 0;
    right: 0;
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
.dialogText {
  text-align: center;
}
.demo-form-inline {
  text-align: right;
  .selectTop {
    width: 240px;
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
.pagination {
  float: right;
  margin-right: 16px;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
</style>
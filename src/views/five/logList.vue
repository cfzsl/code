<template>
  <!-- 操作日志 -->
  <div id="loglist">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="记录时段" class="msgWc">
            <el-date-picker
              v-model="search.searchtime"
              type="datetimerange"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input v-model="search.operatedetail"></el-input>
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
      :data="logList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="operatetime" label="时间" width></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="organ" label="组织架构" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="hwmod" label="操作模块" width></el-table-column>
      <el-table-column align="center" prop="operatedetail" label="操作内容" width="282"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @prev-click="nextpage"
      @next-click="nextpage"
      @current-change="nextpage"
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
        searchtime: "",
        name: "",
        operatedetail: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      // 分页
      pagesize: 10,
      currpage: 1,
      formInline: {},
      logList: []
    };
  },
  created() {
    this.getLogList();
  },
  methods: {
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    // 查询
    onSubmit() {
      console.log(this.search);
      this.getLogList();
    },
    // 清除
    onDeil() {
      this.search = {
        searchtime: "",
        name: "",
        operatedetail: ""
      };
      this.getLogList();
    },
    // 导出日志
    exportLog() {
      location.href = "http://118.31.245.183:10500/hr/operate/exportExcel";
    },
    getLogList() {
      console.log(this.search);
      this.$http
        .post("hr/operate/search", this.$qs.stringify(this.search))
        .then(res => {
          console.log(res.data);
          this.logList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
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
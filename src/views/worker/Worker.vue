<template>
  <!-- 系统通知 -->
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="日期">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="标题">
            <el-input class="searchInput" v-model="search.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getAddBook">查询</el-button>
            <el-button type="primary" @click="empty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="searchBot" style="float: right;margin-bottom: 10px;">
      <el-button class="buttonBot" icon="el-icon-plus" @click="notice">新建通知</el-button>
      <el-button icon="el-icon-upload2" class="buttonBotLast" @click="excellist">导出数据</el-button>
    </div>

    <!-- 列表 -->
    <div id="table">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="time" label="通知时间"></el-table-column>
        <el-table-column align="center" prop="title" label="通知标题"></el-table-column>
        <el-table-column align="center" prop="type" label="通知类型"></el-table-column>
        <el-table-column align="center" prop="users" label="通知用户"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="button"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
            >详情</el-button>
            <el-button
              v-if="scope.row.status === '未发布'"
              class="tableButton2"
              type="button"
              size="small"
              @click="showrelease(scope.row, scope.$index)"
            >发布</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :page-sizes="[15, 20, 25]"
        layout="total, sizes, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
        @size-change="sizeChange"
      ></el-pagination>
    </div>

    <!-- 新建通知 -->
    <el-dialog
      title="新建通知"
      :visible.sync="dialogVisible"
      width="705px"
      class="dialogText"
      @close="newformInline = {};"
    >
      <el-form
        ref="ruleForm"
        :inline="true"
        :rules="newrules"
        :model="newformInline"
        class="demo-form-inline"
        hide-required-asterisk
      >
        <div class="newbox">
          <el-form-item label="通知标题" prop="title">
            <el-input
              style="width:548px"
              maxlength="20"
              show-word-limit
              v-model="newformInline.title"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知内容" prop="message">
            <el-input
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 7}"
              style="width: 548px"
              resize="none"
              maxlength="200"
              show-word-limit
              v-model="newformInline.message"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知类型" prop="type">
            <el-select v-model="newformInline.type" class="selectTop" @change="clearchange">
              <el-option label="部门通知" value="部门通知"></el-option>
              <el-option label="岗位通知" value="岗位通知"></el-option>
              <el-option label="个人通知" value="个人通知"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item v-if="newformInline.type === '部门通知'" label="部门通知" prop="depart">
            <el-select v-model="newformInline.users" class="selectTop">
              <el-option label="所有部门" value></el-option>
              <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="newformInline.type === '岗位通知'" label="岗位通知" prop="job">
            <el-select v-model="newformInline.users" class="selectTop">
              <el-option label="所有岗位" value></el-option>
              <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="newformInline.type === '个人通知'" label="个人通知" prop="users">
            <el-autocomplete
              style="width: 240px"
              v-model="newformInline.users"
              placeholder="请输入关键字搜索"
              :fetch-suggestions="querySearch"
            ></el-autocomplete>
            <div style="color: red">* 多人通知请用 / 符号分割</div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="onSubimt" class="formButon">保存</el-button>
      </span>
    </el-dialog>

    <!-- 通知详情 -->
    <el-dialog title="通知详情" :visible.sync="detail" width="705px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="newbox">
          <el-form-item label="通知日期">
            <el-date-picker readonly v-model="formInline.time" type="date" placeholder="选择日期" disabled></el-date-picker>
          </el-form-item>
          <el-form-item label="通知状态">
            <el-select style="width: 240px" v-model="formInline.status" disabled placeholder="请选择">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="未发布" value="未发布"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知标题">
            <el-input
              readonly
              disabled
              style="width:558px"
              maxlength="20"
              show-word-limit
              v-model="formInline.title"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知内容">
            <el-input
              readonly
              disabled
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 7}"
              style="width: 558px"
              resize="none"
              maxlength="200"
              show-word-limit
              v-model="formInline.message"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知类型">
            <el-select v-model="formInline.type" disabled class="selectTop">
              <el-option label="部门通知" value="部门通知"></el-option>
              <!-- <el-option label="区域通知" value="区域通知"></el-option> -->
              <el-option label="岗位通知" value="岗位通知"></el-option>
              <el-option label="个人通知" value="个人通知"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item v-if="formInline.type === '部门通知'" label="部门通知">
            <el-select v-model="formInline.users" disabled class="selectTop">
              <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="formInline.type === '岗位通知'" label="岗位通知">
            <el-select v-model="formInline.users" disabled class="selectTop">
              <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="formInline.type === '个人通知'" label="个人通知">
            <el-autocomplete
              disabled
              style="width: 240px"
              v-model="formInline.users"
              placeholder="请输入关键字搜索"
              :fetch-suggestions="querySearch"
            ></el-autocomplete>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

    <!-- 通知发布 -->
    <el-dialog
      title="通知发布"
      :visible.sync="dialogFormVisible"
      width="426px"
      class="dialogText"
      @close="release = {};"
    >
      <el-form
        :inline="true"
        :model="release"
        ref="numberValidateForm"
        :rules="releaseRules"
        class="demo-ruleForm"
      >
        <el-form-item label="发布时间" prop="time">
          <el-date-picker
            style="width:290px"
            v-model="release.time"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择发布日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
          <el-button type="primary" @click="adddate" class="formButon">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      jurisdictionList: localStorage.getItem('jurisdiction'),
      departList:[],
      jobList: [],
      // 新建通知
      newformInline: {
        title: "",
        type: "",
        users: "",
        message: ""
      },
      // 新建通知非空验证
      newrules: {
        title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],
        message: [
          { required: true, message: "请输入通知内容", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择通知类型", trigger: "blur" }],
        users: [{ required: true, message: "请输入通知人员", trigger: "blur" }]
      },
      // 通知详情
      formInline: {
        time: "",
        title: "",
        type: "",
        users: "",
        status: "",
        message: ""
      },
      detail: false,
      dialogVisible: false,
      dialogFormVisible: false,
      // 搜索
      search: {
        title: "",
        time: "",
        date: "",
        startTime: "",
        endTime: ""
      },
      // 列表数据
      data: {
        pagesize: 15,
        currpage: 1,
        list: []
      },
      // 新建通知名字模糊搜索
      restaurants: [],
      // 发布时间
      release: {
        time: "",
        sid: ""
      },
      socket: "",
      // 发布时间非空验证
      releaseRules: {
        time: [{ required: true, message: "请选择发布时间", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 获取组织架构列表
    getDropDepart() {
      this.$http.post("hr/memebers/dropOrgan").then(res => {
        this.departList = res.data;
        // console.log(res.data)
      });
    },
    // 获取岗位列表
    getDropJob() {
      this.$http.post("hr/memebers/dropJob").then(res => {
        this.jobList = res.data;
        // console.log(res.data)
      });
    },
    // 获取模糊搜索人名
    getRestaurants() {
      this.$http.get("systemAdvice/getSystemAdviceName").then(res => {
        for (const key in res.data) {
          this.restaurants.push({ value: res.data[key].name });
        }
      });
    },
    // 显示发布
    showrelease(row, _index) {
      if (this.jurisdictionList.indexOf("系统通知-发布") != -1) {
        //记录数据
        this.release.sid = row.sid;
        //显示弹窗
        this.dialogFormVisible = true;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 显示详情
    showdetail(row, _index) {
      if (this.jurisdictionList.indexOf("系统通知-详情") != -1) {
        //记录数据
        this.formInline = row;
        //显示弹窗
        this.detail = !this.detail;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 发布确认
    adddate() {
      this.$refs["numberValidateForm"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "systemAdvice/updateAdviceTime",
              this.$qs.stringify(this.release)
            )
            .then(res => {
              console.log(res);
              this.getAddBook();
              this.dialogFormVisible = false;
            });
        } else {
          return false;
        }
      });
    },
    // 获取列表/搜索
    getAddBook() {
      this.data.currpage = 1;
      if (this.search.date != null) {
        this.search.startTime = this.search.date[0];
        this.search.endTime = this.search.date[1];
      } else {
        this.search.startTime = "";
        this.search.endTime = "";
      }
      this.$http
        .post(
          "systemAdvice/systemAdviceCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 清空查询
    empty() {
      this.search = {
        title: "",
        time: "",
        date: "",
        startTime: "",
        endTime: ""
      };
      this.getAddBook();
    },
    // 新建通知
    notice() {
      if (this.jurisdictionList.indexOf("系统通知-新建") != -1) {
        //显示弹窗
        this.dialogVisible = true;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(total) {
      this.data.pagesize = total;
    },
    // 模糊搜索名字
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 清空下拉框所选值
    clearchange() {
      this.newformInline.users = "";
    },
    // 新建提交
    onSubimt() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "systemAdvice/addSystemAdvice",
              this.$qs.stringify(this.newformInline)
            )
            .then(res => {
              this.dialogVisible = !this.dialogVisible;
              this.getAddBook();
            });
        } else {
          return false;
        }
      });
    },
    // 导出
    excellist() {
      if (this.jurisdictionList.indexOf("系统通知-导出数据") != -1) {
        location.href =
          this.$http.defaults.baseURL + "systemAdvice/exportExcel";
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
  },
  created() {
    this.getAddBook();
    this.getRestaurants();
    this.getDropDepart();
    this.getDropJob();
  },
  // beforeDestroy() {
  //   // 销毁监听
  //   this.socket.close();
  // }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 76px;
  margin-top: 15px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBot {
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
.table {
  width: 100%;
}

.tableButton3 {
  color: #fff;
  background-color: #f56c6c;
  border-radius: 3px;
}
.tableButton2 {
  color: #fff;
  background-color: #4eb14e;
  border-radius: 3px;
}
.tableButton1 {
  color: #fff;
  background-color: #409eff;
  border-radius: 3px;
}
.textmsg {
  color: red;
}
.textcc {
  color: #000;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
}
.dialogText {
  .el-input {
    width: 240px;
    height: 32px;
  }
  .selectTop {
    width: 240px;
    height: 32px;
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
  margin-right: 25px;
  padding-top: 20px;
}
</style>

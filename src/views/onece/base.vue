<template>
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="姓名">
            <el-input class="searchInput" v-model="search.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="负责道路">
            <el-select v-model="search.param2">
              <el-option label="全部道路" value></el-option>
              <el-option
                v-for="(item, i) in dropDown.road"
                :key="i"
                :label="item.param2"
                :value="item.param2"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-select v-model="search.area">
              <el-option label="全部区域" value></el-option>
              <el-option
                v-for="(item, i) in dropDown.area"
                :key="i"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="search.depart">
              <el-option label="全部部门" value></el-option>
              <el-option
                v-for="(item, i) in dropDown.depart"
                :key="i"
                :label="item.depart"
                :value="item.depart"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="empty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="searchBot" style="float: right;margin-bottom: 10px;">
      <el-button icon="el-icon-plus" class="buttonBot" @click="dialogVisible = true;">添加人员信息</el-button>
      <el-button class="buttonBot">导入模板下载</el-button>
      <el-upload
        class="upload-demo"
        action="http://118.31.245.183:10500/userInformation/importExcel"
        :on-success="success"
        :show-file-list="false"
        :limit="1"
        style="float: right;"
      >
        <el-button icon="el-icon-upload2" class="buttonBot">人员信息导入</el-button>
      </el-upload>
      <el-button icon="el-icon-download" class="buttonBotLast" @click="exportStaff">导出全员信息</el-button>
    </div>

    <!-- 列表 -->
    <div id="table">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="param2" label="负责道路"></el-table-column>
        <el-table-column align="center" prop="depart" label="单位"></el-table-column>
        <el-table-column align="center" prop="hiretime" label="入职时间"></el-table-column>
        <el-table-column align="center" prop="leavetime" label="离职时间"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" label="是否超龄">
          <template slot-scope="scope">
            <span style="margin-left: 10px" v-if="scope.row.isretired === '0'">否</span>
            <span style="margin-left: 10px" v-else-if="scope.row.isretired === '1'">是</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="280px">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="button"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
            >详情</el-button>
            <el-button
              class="tableButton2"
              type="button"
              size="small"
              @click="edit(scope.row, scope.$index)"
            >编辑</el-button>
            <el-button
              class="tableButton3"
              type="button"
              @click="deletList(scope.row)"
              size="small"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :pager-count="21"
        layout="total, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
      ></el-pagination>
    </div>

    <!-- 添加人员信息 -->
    <el-dialog
      title="人员信息添加"
      :visible.sync="dialogVisible"
      width="426px"
      top="100px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form
        ref="ruleForm"
        :inline="true"
        :rules="rules"
        :model="formInline"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.trim="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model.trim="formInline.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.trim="formInline.age"></el-input>
        </el-form-item>
        <el-form-item label="证件号" prop="idcard">
          <el-input v-model.trim="formInline.idcard"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型" prop="license">
          <el-select v-model="formInline.license" class="selectTop">
            <el-option label="A1" value="A1"></el-option>
            <el-option label="A2" value="A2"></el-option>
            <el-option label="B1" value="B1"></el-option>
            <el-option label="B2" value="B2"></el-option>
            <el-option label="C1" value="C1"></el-option>
            <el-option label="C2" value="C2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model.trim="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model.trim="formInline.tel"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" prop="hiretime">
          <el-date-picker v-model="formInline.hiretime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="作业区域" prop="area">
          <el-select v-model.trim="formInline.area" class="selectTop">
            <el-option label="东营区新区" value="东营区新区"></el-option>
            <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
            <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
            <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
            <el-option label="圣园街道办事处" value="圣园街道办事处"></el-option>
            <el-option label="六户镇" value="六户镇"></el-option>
            <el-option label="史口镇" value="史口镇"></el-option>
            <el-option label="牛庄镇" value="牛庄镇"></el-option>
            <el-option label="龙居镇" value="龙居镇"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责道路" prop="param2">
          <el-select v-model.trim="formInline.param2" class="selectTop">
            <el-option label="庐山路" value="庐山路"></el-option>
            <el-option label="宁阳路" value="宁阳路"></el-option>
            <el-option label="新泰路" value="新泰路"></el-option>
            <el-option label="北一路" value="北一路"></el-option>
            <el-option label="北二路" value="北二路"></el-option>
            <el-option label="黄河路" value="黄河路"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位" prop="depart">
          <el-select v-model.trim="formInline.depart" class="selectTop">
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
            <el-option label="环卫三部" value="环卫三部"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false;" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="formButon" @click="submitadd('ruleForm')">新增</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="人员信息编辑"
      :visible.sync="dialogFormVisible"
      width="426px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="formInline.sex" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.age" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="formInline.idcard" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型">
          <el-select v-model="formInline.license" class="selectTop">
            <el-option label="A1" value="A1"></el-option>
            <el-option label="A2" value="A2"></el-option>
            <el-option label="B1" value="B1"></el-option>
            <el-option label="B2" value="B2"></el-option>
            <el-option label="C1" value="C1"></el-option>
            <el-option label="C2" value="C2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formInline.address" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.tel" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.workstatus" class="selectTop">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <!-- <el-input v-model="formInline.hiretime" class="inputL"></el-input> -->
          <el-date-picker
            v-model="formInline.hiretime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input v-model="formInline.leavetime" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="formInline.area" class="selectTop">
            <el-option label="全部区域" value></el-option>
            <el-option label="东营区新区" value="东营区新区"></el-option>
            <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
            <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
            <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
            <el-option label="圣园街道办事处" value="圣园街道办事处"></el-option>
            <el-option label="六户镇" value="六户镇"></el-option>
            <el-option label="史口镇" value="史口镇"></el-option>
            <el-option label="牛庄镇" value="牛庄镇"></el-option>
            <el-option label="龙居镇" value="龙居镇"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="formInline.depart" class="selectTop">
            <el-option label="全部部门" value></el-option>
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
            <el-option label="环卫三部" value="环卫三部"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editdata" class="formButon">保存</el-button>
      </span>
    </el-dialog>

    <!-- 详情弹框 -->
    <el-dialog
      title="人员信息详情"
      :visible.sync="detail"
      width="426px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input readonly v-model="formInline.name" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input readonly v-model="formInline.sex" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input readonly v-model="formInline.age" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input readonly v-model="formInline.idcard" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型">
          <el-input readonly v-model="formInline.license" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input readonly v-model="formInline.address" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input readonly v-model="formInline.tel" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select disabled v-model="formInline.workstatus" class="selectTop">
            <el-option label="在职" value="1"></el-option>
            <el-option label="离职" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input readonly v-model="formInline.hiretime" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input readonly v-model="formInline.leavetime" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-input readonly v-model="formInline.area" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-input readonly v-model="formInline.depart"></el-input>
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
      dialogVisible: false,
      detail: false,
      dialogFormVisible: false,
      // 新增
      formInline: {
        sid: "",
        name: "",
        age: "",
        maxage: "",
        isretired: "",
        sex: "",
        tel: "",
        license: "",
        idcard: "",
        address: "",
        hiretime: "",
        area: "",
        param2: "",
        depart: "",
        workstatus: "",
        area: ""
      },
      // 搜索
      search: {
        name: "",
        param2: "",
        area: "",
        depart: ""
      },
      // 列表数据及分页
      data: {
        pagesize: 13,
        currpage: 1,
        list: []
      },
      // 表单验证规则
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        idcard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入住址", trigger: "blur" }],
        tel: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        hiretime: [
          { required: true, message: "请选择入职时间", trigger: "blur" }
        ],
        license: [
          { required: true, message: "请选择准驾车型", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择作业区域", trigger: "blur" }],
        param2: [
          { required: true, message: "请选择负责道路", trigger: "blur" }
        ],
        depart: [{ required: true, message: "请选择归属单位", trigger: "blur" }]
      },
      // 搜索区域下拉菜单
      dropDown: {
        // 搜索道路下拉框
        road: [],
        // 搜索区域下拉框
        depart: [],
        // 搜索单位下拉框
        area: []
      }
    };
  },
  methods: {
    // 人员信息导出
    exportStaff() {
      location.href = "http://118.31.245.183:10500/userInformation/exportExcel";
    },
    // 人员信息导入 导入成功回调函数
    success(response, file) {
      console.log(response);
      if (response.status == 1) {
        this.$message({
          message: "导入成功",
          type: "success",
          offset: 155
        });
      } else if (response.status == 0) {
        this.$message({
          message: "导入失败，请重试",
          type: "error",
          offset: 155
        });
      }
    },
    // 列表编辑按钮
    edit(row, _index) {
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
    },
    // 列表详情
    showdetail(row, _index) {
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.detail = !this.detail;
    },
    // 编辑保存
    editdata() {
      this.dialogFormVisible = false;
      this.$http
        .post(
          "userInformation/updateUserInformation",
          this.$qs.stringify(this.formInline)
        )
        .then(res => {
          this.$message({
            type: "success",
            message: "编辑成功!",
            offset: 155
          });
        });
    },
    // 列表删除按钮
    deletList(row) {
      this.$confirm("是否删除词条数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            "userInformation/deleteAllUserInformationBySid",
            this.$qs.stringify({ sid: row.sid })
          )
          .then(res => {
            this.getAddBook();
          });
        this.$message({
          type: "success",
          message: "删除成功!",
          offset: 155
        });
      });
    },
    // 获取列表
    getAddBook() {
      this.$http
        .get("userInformation/userInformationCriteriaQuery")
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 查询按钮
    onSubmit() {
      this.data.currpage = 1;
      this.$http
        .post(
          "userInformation/userInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          console.log(res);
          this.data.list = res.data;
        });
    },
    // 清空查询
    empty() {
      this.search = {
        name: "",
        param2: "",
        area: "",
        depart: ""
      };
      this.onSubmit();
    },
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 添加新增
    submitadd(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.$http
            .post(
              "/userInformation/addUserInformation",
              this.$qs.stringify(this.formInline)
            )
            .then(res => {
              this.getAddBook();
              this.$message({
                type: "success",
                message: "新增成功!",
                offset: 155
              });
            });
        } else {
          alert("请补全新增信息");
        }
      });
    },
    // 获取下拉菜单
    getDropDown() {
      this.$http.get("userInformation/getEmployeeRoad").then(res => {
        this.dropDown.road = res.data;
        console.log(res);
      });
      this.$http.get("userInformation/getEmployeeDepart").then(res => {
        this.dropDown.depart = res.data;
      });
      this.$http.get("userInformation/getEmployeeArea").then(res => {
        this.dropDown.area = res.data;
      });
    }
  },
  created() {
    this.getAddBook();
    this.getDropDown();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  position: relative;
  width: 100%;
  margin-top: 15px;
  .searchTop {
    float: left;
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
  height: 460px;
  margin-top: 16px;
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
    .el-input {
      width: 240px;
      height: 32px;
      padding: 0 !important;
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
.table {
  width: 100%;
}
.delect-footer {
  float: left;
  margin-left: 10px;
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

.pagination {
  float: right;
  margin-right: 25px;
  padding-top: 20px;
}

.delect-footer {
  float: left;
  margin-left: 10px;
}
</style>

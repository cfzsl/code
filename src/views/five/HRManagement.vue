<template>
  <!-- 人事管理 -->
  <div id="HRManagement" style="height: 100%;">
    <el-row style="height: 100%;">
      <el-col :span="3" style="height: 100%;">
        <div class="leftbox">
          <div class="title">组织结构</div>公司机关
          <el-tree
            class="tree"
            :data="treecompany"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>项目部
          <el-tree
            class="tree"
            :data="treeproject"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </el-col>
      <el-col :span="21">
        <!-- 搜索 -->
        <div class="search">
          <div class="searchTop">
            <el-form :inline="true" :model="formSearch">
              <el-form-item label="姓名" class="msgWc">
                <el-input v-model="formSearch.name"></el-input>
              </el-form-item>
              <el-form-item label="归属单位">
                <el-select v-model="formSearch.area">
                  <el-option label="全部" value></el-option>
                  <el-option label="环卫一部" value="环卫一部"></el-option>
                  <el-option label="环卫二部" value="环卫二部"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="岗位">
                <el-select v-model="formSearch.job">
                  <el-option label="全部" value></el-option>
                  <el-option label="环卫工人" value="环卫工人"></el-option>
                  <el-option label="司机" value="司机"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系方式">
                <el-input v-model="formSearch.tel"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="onEmpty">清空</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 按钮 -->
          <div class="searchBot">
            <el-button class="buttonBot" @click="dialogVisible = true">添加人事信息档案</el-button>
            <el-button class="buttonBot">导入模板下载</el-button>
            <el-button class="buttonBot">人员信息导入</el-button>
            <el-button class="buttonBotLast">人事信息导出</el-button>
          </div>
        </div>

        <!-- 弹窗 -->
        <el-dialog title="添加人事档案" :visible.sync="dialogVisible" width="426px" class="dialogText">
          <el-form
            :inline="true"
            :model="formAdd"
            ref="formAdd"
            :rules="rulesAdd"
            class="demo-form-inline"
          >
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formAdd.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input v-model="formAdd.age"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="tel">
              <el-input v-model="formAdd.tel" prop="name"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="param2">
              <el-select v-model="formAdd.param2" class="selectTop">
                <el-select v-model="formSearch.area">
                  <el-option label="全部" value></el-option>
                  <el-option label="环卫一部" value="环卫一部"></el-option>
                  <el-option label="环卫二部" value="环卫二部"></el-option>
                </el-select>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位">
              <el-select v-model="formSearch.job">
                <el-option label="全部" value></el-option>
                <el-option label="环卫工人" value="环卫工人"></el-option>
                <el-option label="司机" value="司机"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学历" prop="study">
              <el-input v-model="formAdd.study"></el-input>
            </el-form-item>
            <el-form-item label="岗位">
              <el-select v-model="formSearch.job">
                <el-option label="全部" value></el-option>
                <el-option label="环卫工人" value="环卫工人"></el-option>
                <el-option label="司机" value="司机"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="基本工资" prop="basecash">
              <el-input v-model="formAdd.basecash"></el-input>
            </el-form-item>
            <el-form-item label="其他补助" prop="helpcash">
              <el-input v-model="formAdd.helpcash"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="delect-footer">
            <el-button type="primary" @click="resetForm('formAdd')" class="formButon">重置</el-button>
          </span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addCar('formAdd')" class="formButon">保存</el-button>
          </span>
        </el-dialog>

        <!-- 表格 -->
        <el-table
          :data="wcList.slice((currpage - 1) * pagesize, currpage * pagesize)"
          border
          style="width: 100%"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column align="center" prop="name" label="姓名"></el-table-column>
          <el-table-column align="center" prop="tel" label="性别"></el-table-column>
          <el-table-column align="center" prop="param2" label="出生日期"></el-table-column>
          <el-table-column align="center" prop="area" label="家庭住址"></el-table-column>
          <el-table-column align="center" prop="job" label="毕业院校"></el-table-column>
          <el-table-column align="center" prop="study" label="所学专业"></el-table-column>
          <el-table-column align="center" prop="isretired" label="归属区域"></el-table-column>
          <el-table-column align="center" prop="isretired" label="岗位"></el-table-column>
          <el-table-column align="center" prop="basecash" label="联系方式"></el-table-column>
          <el-table-column align="center" prop="helpcash" label="在职状态"></el-table-column>
          <el-table-column align="center" prop="helpcash" label="入职时间"></el-table-column>
          <el-table-column align="center" prop="helpcash" label="离职时间"></el-table-column>
          <el-table-column align="center" fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                class="tableButton1"
                type="button"
                size="small"
                @click="showdetail(scope.row, scope.$index)"
              >详情</el-button>
              <el-button
                class="tableButton3"
                type="button"
                @click="deletList(scope.row, scope.$index)"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
          class="paginationList"
          background
          @prev-click="nextpage"
          @next-click="nextpage"
          @current-change="nextpage"
          :page-sizes="[5,10]"
          :page-size="pagesize"
          :current-page="currpage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="wcList.length"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      formSearch: {
        name: "",
        area: "",
        job: "",
        isretired: ""
      },
      pagesize: 10,
      currpage: 1,
      dialogVisible: false,
      dialogFormVisible: false,
      wcList: [],
      // 公司机关
      treecompany: [
        {
          label: "总经理",
          children: [
            {
              label: "副经理",
              children: [
                {
                  label: "行政人事部"
                }
              ]
            },
            {
              label: "副经理",
              children: [
                {
                  label: "生产运行部"
                }
              ]
            },
            {
              label: "副经理",
              children: [
                {
                  label: "安全质量监督部"
                }
              ]
            }
          ]
        }
      ],
      // 项目部
      treeproject: [
        {
          label: "项目经理",
          children: [
            {
              label: "助理"
            },
            {
              label: "中队长",
              children: [
                {
                  label: "班组长",
                  children: [
                    {
                      label: "环卫工"
                    }
                  ]
                }
              ]
            },
            {
              label: "司机"
            },
            {
              label: "班车人员"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      formAdd: {
        name: "",
        age: "",
        tel: "",
        area: "",
        job: "",
        study: "",
        param2: "",
        isretired: "",
        basecash: "",
        helpcash: ""
      },
      rulesAdd: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话号码", trigger: "blur" }],
        study: [{ required: true, message: "请输入学历", trigger: "blur" }],
        basecash: [
          { required: true, message: "请输入基本工资", trigger: "blur" }
        ],
        helpcash: [
          { required: true, message: "请输入工作补助", trigger: "blur" }
        ],
        param2: [
          { required: true, message: "请选择归属单位", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择作业区域", trigger: "blur" }],
        job: [{ required: true, message: "请选择工作岗位", trigger: "blur" }],
        isretired: [
          { required: true, message: "请选择工作状态", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getwcList();
  },
  methods: {
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    miStatusColor(item) {
      if (item == 0) {
        return "danger";
      } else if (item == 1) {
        return "primary";
      }
      return "success";
    },
    getwcList() {
      this.$http.post("hr/hrinfo/search").then(res => {
        this.wcList = res.data;
      });
    },
    // 添加人事信息
    addCar(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.dialogVisible = false;
          this.$http
            .post("hr/hrinfo/add", this.$qs.stringify(this.formAdd))
            .then(res => {
              this.$http.post("hr/hrinfo/search").then(res => {
                this.wcList = res.data;
              });
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addDo() {
      console.log("关闭");
    },
    adddate() {
      this.dialogFormVisible = false;
    },
    showdetail(row, _index) {
      // console.log(row);
      //记录索引
      this.listIndex = _index;
      //显示弹窗
      const id = row.sid;
      this.$router.push({ path: "/matters/details", query: { id } });
    },
    pagination(row, _index) {
      this.dialogFormVisible = true;
    },
    // 删除
    deletList(row, _index) {
      let _date = {
        sid: row.sid
      };
      this.$http
        .post("hr/hrinfo/delete", this.$qs.stringify(_date))
        .then(res => {
          console.log(res.data);
          this.getwcList();
        });
    },
    // 查询
    onSubmit() {
      // console.log("查啥?");
      console.log(this.formSearch);
      this.$http
        .post("hr/hrinfo/search", this.$qs.stringify(this.formSearch))
        .then(res => {
          // console.log(res.data);
          this.wcList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    //清空
    onEmpty() {
      (this.formSearch = {
        name: "",
        area: "",
        job: "",
        isretired: ""
      }),
        this.getwcList();
    },
    // 点击树形控件
    handleNodeClick(obj, node, self) {
      console.log(obj.label);
      console.log("----");
      console.log(node);
      console.log("----");
      console.log(self);
      console.log("----");
    }
  },
  components: {
    Table
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
#HRManagement {
  height: 100%;
}
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
      height: 25px;
      font-size: 12px;
      padding: 0;
      padding: 0 4px;
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
  .selectTop {
    width: 240px;
  }
  .el-form-item {
    margin-bottom: 15px;
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
.quit {
  text-align: left;
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
.inputText {
  width: 240px;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
.tableButton1 {
  background-color: #3b99f1;
  color: #fff;
}
.tableButton2 {
  background-color: #ffb533;
  color: #fff;
}
.tableButton3 {
  background-color: #f66134;
  color: #fff;
}
.inputImg {
  background-color: #3b99f1 !important;
  color: #fff !important;
  border-radius: 0px 4px 4px 0;
}
.textarea {
  width: 386px;
  resize: none;
  border: none;
}

.leftbox {
  height: 98%;
  margin-right: 40px;
  border-right: 1px solid #d2d2d2;
  .title {
    margin: 20px;
    margin-left: 0;
    font-size: 20px;
  }
  .tree {
    padding-left: 15px;
  }
}
</style>

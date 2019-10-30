<template>
  <!-- 人事管理 -->
  <div id="HRManagement">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formSearch">
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="formSearch.name"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="formSearch.area">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="formSearch.job">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in postList"
                :key="item.lu"
                :label="item.job"
                :value="item.job"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formSearch.isretired">
              <el-option
                v-for="item in optionsStated"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              ></el-option>
            </el-select>
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
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.param2"
              :value="item.param2"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域" prop="area">
          <el-select v-model="formAdd.area" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.area"
              :value="item.area"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-select v-model="formAdd.job" class="selectTop">
            <el-option v-for="item in postList" :key="item.lu" :label="item.job" :value="item.job"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="study">
          <el-input v-model="formAdd.study"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="isretired">
          <el-select v-model="formAdd.isretired" class="selectTop">
            <el-option
              v-for="item in optionsStated"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
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
      <el-table-column align="center" prop="num" label="序号" width="80px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="tel" label="电话" width></el-table-column>
      <el-table-column align="center" prop="param2" label="单位" width></el-table-column>
      <el-table-column align="center" prop="area" label="区域" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width="121px"></el-table-column>
      <el-table-column align="center" prop="study" label="学历" width></el-table-column>
      <el-table-column align="center" prop="isretired" label="状态" width>
        <template slot-scope="scope">
          <span>{{ scope.row.isretired=="1"? "在职":"离职" }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="basecash" label="基本工资(元)" width></el-table-column>
      <el-table-column align="center" prop="helpcash" label="其他补助(元)" width></el-table-column>
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
            @click="pagination(scope.row, scope.$index)"
            v-if="scope.row.isretired"
          >设为离职</el-button>
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
    <!--设为离职弹框 -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formQuit" class="demo-form-inline quit">
        <el-form-item label="离职日期">
          <el-date-picker v-model="formQuit.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="离职原因">
          <el-input v-model="formInline.leaving"></el-input>
        </el-form-item>
        <el-form-item label="上传照片">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-input v-model="formInline.textname" class="input-with-select">
              <el-button slot="append" type="primary" class="inputImg">上传图片</el-button>
            </el-input>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="formInline.textarea" class="textarea"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="adddate" class="formButon">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      // 上传图片列表
      fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],

      formSearch: {
        name: "",
        area: "",
        job: "",
        isretired: ""
      },
      text: "人事管理详情",
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formQuit: {
        date: "",
        leaving: "",
        textname:'',
        textarea: ""
      },
      dialogVisible: false,
      dialogFormVisible: false,
      les: 0,
      progressDate: [
        { les: 0, progress: "未处理" },
        { les: 1, progress: "处理中" },
        { les: 2, progress: "完成" }
      ],
      formAdd: {
        name: "",
        age:'',
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
      },
      i: "0",
      optionsCar: [
        {
          i: "0",
          label: "全部"
        },
        {
          i: "1",
          label: "垃圾清运车"
        },
        {
          i: "2",
          label: "清扫车"
        },
        {
          i: "3",
          label: "洒水车"
        }
      ],
      lu: "0",
      postList: [
        {
          lu: "1",
          job: "环卫工"
        },
        {
          lu: "2",
          job: "洒水车司机"
        },
        {
          lu: "3",
          job: "垃圾运输车司机"
        },
        {
          lu: "4",
          job: "中队长"
        },
        {
          lu: "5",
          job: "队长"
        },
        {
          lu: "6",
          job: "大队长"
        },
        {
          lu: "7",
          job: "主管"
        }
      ],
      value: "0",
      options: [
        {
          value: "1",
          area: "东营区新区"
        },
        {
          value: "2",
          area: "文汇街道办事处"
        },
        {
          value: "3",
          area: "辛店街道办事处"
        },
        {
          value: "4",
          area: "黄河街道办事处"
        },
        {
          value: "5",
          area: "圣园街道办事处"
        },
        {
          value: "6",
          area: "六户镇"
        },
        {
          value: "7",
          area: "牛庄镇"
        },
        {
          value: "8",
          area: "史口镇"
        },
        {
          value: "9",
          area: "龙居镇"
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "0",
          param2: "全部"
        },
        {
          web: "1",
          param2: "环卫一部"
        },
        {
          web: "2",
          param2: "环卫二部"
        },
        {
          web: "3",
          param2: "环卫三部"
        },
        {
          web: "4",
          param2: "环卫四部"
        }
      ],
      lu: "0",
      optionslu: [
        {
          lu: "0",
          area: "全部"
        },
        {
          lu: "1",
          area: "东营区新区"
        },
        {
          lu: "2",
          area: "文汇街道办事处"
        },
        {
          lu: "3",
          area: "辛店街道办事处"
        },
        {
          lu: "4",
          area: "黄河街道办事处"
        },
        {
          lu: "5",
          area: "圣园街道办事处"
        },
        {
          lu: "6",
          area: "六户镇"
        },
        {
          lu: "7",
          area: "牛庄镇"
        },
        {
          lu: "8",
          area: "史口镇"
        },
        {
          lu: "9",
          area: "龙居镇"
        }
      ],
      id: "0",
      optionsList: [
        {
          id: "0",
          label: "全部"
        },
        {
          id: "1",
          label: "环卫一部"
        },
        {
          id: "2",
          label: "环卫二部"
        },
        {
          id: "3",
          label: "环卫三部"
        },
        {
          id: "4",
          label: "环卫四部"
        }
      ],
      type: "0",
      optionsType: [
        {
          type: "0",
          label: "A1"
        },
        {
          type: "1",
          label: "A2"
        },
        {
          type: "2",
          label: "B1"
        },
        {
          type: "3",
          label: "B2"
        },
        {
          type: "4",
          label: "C1"
        },
        {
          type: "5",
          label: "C2"
        }
      ],
      state: "0",
      optionsStated: [
        {
          state: "1",
          label: "在职"
        },
        {
          state: "0",
          label: "离职"
        }
      ],
      buttonIf: true,
      formInline: {},
      dialogFormVisible: false,
      wcList: []
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
        console.log(res.data);
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
              console.log(res.data);
              this.$http.post("hr/hrinfo/search").then(res => {
                console.log(res.data);
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
      this.buttonIf = false;
    },
    adddate() {
      this.dialogFormVisible = false;
      this.buttonIf = true;
    },
    showdetail(row, _index) {
      // console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
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
    onEmpty(){
      this.formSearch={
        name: "",
        area: "",
        job: "",
        isretired: ""
      },
    this.getwcList();
    }
  },
  components: {
    Table
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
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
  resize:none;
  border:none;
}
</style>

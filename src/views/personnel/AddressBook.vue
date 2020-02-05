<template>
  <!-- 通讯录 -->
  <div>
    <!-- 查询 -->
    <div class="search">
      <div class="searchbox">
        <span>姓名</span>
        <el-input v-model="search.name" placeholder="请输入姓名" style="width: 215px"></el-input>
      </div>
      <div class="searchbox">
        <span>组织架构</span>
        <el-select v-model="search.organ">
          <el-option label="全部区域" value></el-option>
          <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>岗位</span>
        <el-select v-model="search.job">
          <el-option label="全部岗位" value></el-option>
          <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>联系方式</span>
        <el-input v-model="search.tel" placeholder="请输入联系方式" style="width: 215px"></el-input>
      </div>
      <el-button type="primary" class="btn" @click="serachAddBook">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </div>

    <!-- 导出 -->
    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus" @click="addPersonnel">添加人员</el-button>
        <el-button icon="el-icon-download" @click="exportTem">下载模板</el-button>
        <el-upload
          :show-file-list="false"
          :limit="1"
          :on-error="onerror"
          :on-exceed="onexceed"
          :on-success="onsuccess"
          :action="$http.defaults.baseURL+'hr/memebers/importIn'"
        >
          <el-button icon="el-icon-download">导入通讯录</el-button>
        </el-upload>
        <el-button icon="el-icon-upload2" @click="exportPhone">导出通讯录</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="num" label="序号" width="50px"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="birthday" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="liveaddress" label="家庭住处"></el-table-column>
        <el-table-column align="center" prop="studyschool1" label="毕业院校"></el-table-column>
        <el-table-column align="center" prop="studymajro1" label="所学专业"></el-table-column>
        <el-table-column align="center" prop="organ" label="组织架构"></el-table-column>
        <el-table-column align="center" prop="job" label="岗位"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" label="在职状态">
          <template slot-scope="scope">
            <span :class="scope.row.jobstate=='在职'?'green':'red'">{{scope.row.jobstate}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="hiretime" label="入职时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="primary"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
            >详情</el-button>
            <el-button
              v-show="scope.row.jobstate=='在职'?true:false"
              class="tableButton2"
              type="warning"
              size="small"
              @click="showrelease(scope.row, scope.$index)"
            >离职</el-button>
            <el-button
              v-show="scope.row.jobstate=='离职'?true:false"
              class="tableButton2"
              type="danger"
              size="small"
              @click="showdelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 离职弹框 -->
      <el-dialog title="离职" :visible.sync="showform" width="400px">
        <el-form ref="refForm" :model="form" :rules="formAdd">
          <el-form-item label="请选择离职时间:" prop="leavetime">
            <el-date-picker
              v-model="form.leavetime"
              hide-required-asterisk
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelForm('refForm')">取 消</el-button>
          <el-button type="primary" @click="determine('refForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 删除弹框  -->
      <el-dialog title="删除" :visible.sync="delect" width="20%">
        <span>您确认删除该人员信息吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="delect=false">取 消</el-button>
          <el-button type="primary" @click="delectYes">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 添加人员弹框 -->
      <el-dialog title="添加人员" :visible.sync="personnel" width="940px">
        <el-divider></el-divider>
        <addPeople @transform="transform" @addformpersonnel="addformpersonnel"></addPeople>
      </el-dialog>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :page-sizes="[5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
import addPeople from "../addPersonnel/addPersonnel";
export default {
  data() {
    return {
      showform: false,
      delect: false,
      personnel: false,
      input: null,
      radio: "0",
      form: {
        leavetime: ""
      },
      formAdd: {
        leavetime: [
          { required: true, message: "请选择离职时间", trigger: "blur" }
        ]
      },
      delectObject: {},
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
      search: {
        name: "",
        organ: "",
        job: "",
        tel: ""
      },
      showedit: false,
      value1: "",
      value2: "",
      msg: {
        number: ""
      },
      th: "0",
      departList: [],
      jobList: [],
      jurisdictionList: localStorage.getItem('jurisdiction'),
    };
  },
  components: {
    addPeople
  },
  methods: {
    //取消添加人事
    transform(msg) {
      this.personnel = msg;
      // console.log(msg)
    },
    //添加人事
    addformpersonnel(msg) {
      this.personnel = msg;
      this.getAddBook();
    },
    // 详情
    showdetail(row, _index) {
      this.$router.push({
        path: "/matters/details",
        query: {
          id: row.idcard
        }
      });
    },
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(total) {
      console.log(total);
      this.data.pagesize = total;
    },
    // 获取列表数据
    getAddBook() {
      this.$http
        .post("/hr/memebers/search", this.$qs.stringify(this.search))
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 查询列表数据
    serachAddBook() {
      console.log(this.search);
      this.getAddBook();
    },
    // 清空查询
    empty() {
      this.search = {
        name: "",
        area: "",
        param3: "",
        depart: ""
      };
      this.getAddBook();
    },
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
    // 离职
    showrelease(row, _index) {
      this.form = row;
      this.showform = true;
      // console.log(row.leavetime)
    },
    // 取消
    cancelForm(formName) {
      this.showform = false;
      this.form = {};
      this.$refs[formName].resetFields();
    },
    // 确认离职
    determine(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _date = {
            leavetime: this.form.leavetime,
            jobstate: "离职",
            sid: this.form.sid
          };
          this.$http
            .post("hr/memebers/update", this.$qs.stringify(_date))
            .then(res => {
              this.form.workstatus = "离职";
              this.showform = false;
              this.getAddBook();
            });
        } else {
          console.log("添加失败");
          return false;
        }
      });
    },
    // 删除
    showdelete(row, _index) {
      this.delect = true;
      this.delectObject = row;
    },
    // 确认删除
    delectYes() {
      let _date = {
        param1: "0",
        sid: this.delectObject.sid
      };
      this.$http
        .post("/hr/memebers/update", this.$qs.stringify(_date))
        .then(res => {
          // console.log("删除成功");
          this.delect = false;
          this.getAddBook();
        });
    },
    exportTem() {
      location.href = this.$http.defaults.baseURL + "hr/memebers/downloadMood";
    },
    exportPhone() {
      location.href = this.$http.defaults.baseURL + "hr/memebers/export";
    },
    // 上传成功的接口
    onsuccess(response, file, fileList) {
      // console.log(response)
      this.$message({
        message: response.data,
        type: "success",
        offset: 150
      });
      this.getAddBook();
    },
    onexceed() {
      this.$message.error("只能上传一个Excel文件");
    },
    //上传失败的接口
    onerror(err,file, fileList){
      this.$message.error(err.msg);
    },
    // 添加人员
    addPersonnel() {
      this.personnel = true;
    },
  },
  created() {
    this.getAddBook();
    this.getDropDepart();
    this.getDropJob();
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 20px 0;
  .searchbox {
    float: left;
    padding-left: 20px;
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
  .btn {
    margin-left: 15px;
  }
}

.menu {
  .btn {
    display: flex;
    float: right;
    margin-bottom: 10px;
  }
}

.list {
  .btn {
    width: 50px;
    margin-left: 0;
    text-align: center;
  }
}

.pagination {
  text-align: center;
}
.green {
  color: green;
}
.red {
  color: red;
}
.el-form-item {
  margin-top: 20px !important;
}
</style>
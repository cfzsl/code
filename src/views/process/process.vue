<template>
  <!-- 质量安全管理 -->
  <!-- test -->
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="searchbox">
        <span>姓名</span>
        <el-input v-model="search.charge" placeholder="请输入姓名" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>归属单位</span>
        <el-select v-model="search.area">
          <el-option label="全部" value></el-option>
          <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>处理结果</span>
        <el-select v-model="search.result">
          <el-option label="全部" value></el-option>
          <el-option label="已处理" value="已处理"></el-option>
          <el-option label="未处理" value="未处理"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        日期
        <el-date-picker
          v-model="search.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <el-button type="primary" class="btn" @click="searchbtn">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </div>

    <!-- 按钮 -->
    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus" @click="addFeedBack">新建反馈</el-button>
        <el-button icon="el-icon-upload2" @click="excellist">导出数据</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
      >
        <el-table-column align="center" prop="time" label="日期"></el-table-column>
        <el-table-column align="center" prop="charge" label="姓名"></el-table-column>
        <el-table-column align="center" prop="area" label="归属单位"></el-table-column>
        <el-table-column align="center" prop="job" label="岗位"></el-table-column>
        <el-table-column align="center" prop="problemdesc" label="问题详情"></el-table-column>
        <el-table-column align="center" prop="address" label="发生地点"></el-table-column>
        <el-table-column align="center" prop="feedbackpeople" label="反馈人"></el-table-column>
        <el-table-column align="center" prop="result" label="处理结果"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showdetail(scope.row)">详情</el-button>
            <el-button
              v-if="scope.row.result === '未处理'"
              type="primary"
              @click="showprocess(scope.row)"
            >处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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

    <!-- 新建反馈 -->
    <el-dialog title="新建反馈" width="650px" :visible.sync="feedback" @close="closeprocessmsg">
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="addfeedback"
        :inline="true"
        style="overflow: hidden;"
        hide-required-asterisk
      >
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈日期" prop="time">
                <el-date-picker
                  style="width:215px"
                  value-format="yyyy-MM-dd"
                  v-model="addfeedback.time"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="charge">
                <el-input style="width:220px" v-model="addfeedback.charge" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="所属单位" prop="area">
                <el-select style="width:215px" v-model="addfeedback.area">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位" prop="job">
                <el-select style="width:220px" v-model="addfeedback.job">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-form-item label="问题详情" prop="problemdesc">
            <el-input
              type="textarea"
              resize="none"
              style="width: 500px;vertical-align:text-top;"
              :rows="2"
              placeholder="请输入问题详情"
              v-model="addfeedback.problemdesc"
            ></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="发生地点" prop="address">
            <el-input style="width: 500px" v-model="addfeedback.address" placeholder="请输入发生地点"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="上传图片" prop="img">
            <el-upload
              ref="uploadimg"
              :file-list="addfeedback.imglist"
              :action="$http.defaults.baseURL + 'safeQuality/uploadImage'"
              :auto-upload="false"
              :on-change="onChange"
              :on-remove="onRemove"
              :on-success="uploadimgSuccess"
              :before-upload="beforeAvatarUpload"
              :data="addfeedback"
              style="float: left"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item style="float:right">
          <el-button type="primary" @click="feedback = false">取消</el-button>
          <el-button type="primary" @click="newfeedback">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 反馈详情 -->
    <el-dialog
      title="反馈详情"
      width="650px"
      :visible.sync="feedbackdetails"
      @close="feedbackdetail = {}"
    >
      <el-form :inline="true" style="overflow: hidden;" label-width="68px">
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈日期">
                <el-date-picker readonly v-model="feedbackdetail.time" type="date"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input readonly style="width:215px" v-model="feedbackdetail.charge"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="所属单位">
                <el-select disabled style="width:220px" v-model="feedbackdetail.area">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">
                <el-select disabled v-model="feedbackdetail.job">
                  <el-option label="全部" value></el-option>
                  <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈人">
                <el-input readonly style="width: 220px" v-model="feedbackdetail.feedbackpeople"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理结果">
                <el-select disabled v-model="feedbackdetail.result">
                  <el-option label="已处理" value="已处理"></el-option>
                  <el-option label="未处理" value="未处理"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-form-item label="问题详情">
            <el-input
              readonly
              type="textarea"
              resize="none"
              style="width: 520px;vertical-align:text-top;"
              :rows="2"
              v-model="feedbackdetail.problemdesc"
            ></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="发生地点">
            <el-input readonly style="width: 520px" v-model="feedbackdetail.address"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="详情描述">
            <el-input readonly style="width: 520px" v-model="feedbackdetail.param1"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="问题照片">
                <el-image
                  style="width: 220px; height: 200px"
                  :src="feedbackdetail.picture1"
                  fit="fit"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理照片">
                <el-image
                  style="width: 220px; height: 200px"
                  :src="feedbackdetail.picture2"
                  fit="fit"
                >
                  <div slot="error" class="el-image__error">暂无图片</div>
                </el-image>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <!-- 处理 -->
    <el-dialog title="问题处理" width="650px" :visible.sync="process" @close="closeprocessmsg">
      <el-form
        ref="ruleForm"
        :rules="processrules"
        :model="processmsg"
        label-width="80px"
        style="overflow: hidden;"
        hide-required-asterisk
      >
        <el-form-item label="详情内容" prop="param1">
          <el-input
            type="textarea"
            resize="none"
            :autosize="{ minRows: 4, maxRows: 4}"
            maxlength="100"
            show-word-limit
            v-model="processmsg.param1"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" prop="img" ref="upload">
          <el-upload
            ref="uploadimg"
            :action="$http.defaults.baseURL + 'safeQuality/uploadImage1'"
            :auto-upload="false"
            :on-change="onChange"
            :on-remove="onRemove"
            :on-success="processsuccess"
            :before-upload="beforeProcessUpload"
            :file-list="imglist"
            :data="processmsg"
            style="float: left"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="process = false">取消</el-button>
          <el-button type="primary" @click="problemHandling">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      departList: [],
      jobList: [],
      // 下拉框
      // dropmenu: {
      //   job: [],
      //   depart: []
      // },
      input: null,
      radio: "0",
      data: {
        pagesize: 15,
        currpage: 1,
        list: []
      },
      search: {
        charge: "",
        area: "",
        result: "",
        date: [],
        startTime: "",
        endTime: ""
      },
      // 新建反馈
      addfeedback: {
        time: "",
        charge: "",
        area: "",
        job: "",
        problemdesc: "",
        address: ""
      },
      // 反馈详情
      feedbackdetail: {},
      // 处理信息
      processmsg: {
        param1: ""
      },
      // 新增非空验证
      rules: {
        time: [{ required: true, message: "请选择反馈日期", trigger: "blur" }],
        charge: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        area: [{ required: true, message: "请选择所属单位", trigger: "blur" }],
        job: [{ required: true, message: "请选择岗位", trigger: "blur" }],
        problemdesc: [
          { required: true, message: "请输入问题详情", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入发生地点", trigger: "blur" }
        ],
        img: [{ required: true, message: "请选择上传图片" }]
      },
      // 修改非空验证
      processrules: {
        param1: [
          { required: true, message: "请输入详情内容", trigger: "blur" }
        ],
        img: [{ required: true, message: "请选择上传图片" }]
      },
      // 图片上传列表
      imglist: [],
      feedback: false,
      feedbackdetails: false,
      process: false,
      msg: {
        number: ""
      },
      jurisdictionList: localStorage.getItem('jurisdiction'),
      imgupload: false,
      status: ""
    };
  },
  methods: {
    // 获取组织架构部门列表
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
    // 下拉框
    // getDropMenu() {
    //   this.$http.get("safeQuality/getJob").then(res => {
    //     this.dropmenu.job = res.data;
    //   });
    //   this.$http.get("systemAdvice/getDepart").then(res => {
    //     this.dropmenu.depart = res.data;
    //   });
    // },
    uploadImage1() {
      return;
    },
    // 获取列表
    getList() {
      this.$http
        .post(
          "safeQuality/safeQualityCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 新建反馈
    addFeedBack() {
      if (this.jurisdictionList.indexOf("质量安全管理-新建") != -1) {
        //显示弹窗
        this.feedback = true;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(total) {
      console.log(total);
      this.data.pagesize = total;
    },
    // 显示详情
    showdetail(row) {
      console.log(row);
      if (this.jurisdictionList.indexOf("质量安全管理-详情") != -1) {
        this.feedbackdetails = !this.feedbackdetails;
        this.feedbackdetail = row;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 查询按钮
    searchbtn() {
      this.data.currpage = 1;
      if (this.search.date != null) {
        this.search.startTime = this.search.date[0];
        this.search.endTime = this.search.date[1];
      } else if (this.search.date == null) {
        this.search.startTime = "";
        this.search.endTime = "";
      }
      this.getList();
    },
    // 清空查询
    empty() {
      this.search = {
        charge: "",
        area: "",
        result: "",
        date: [],
        startTime: "",
        endTime: ""
      };
      this.searchbtn();
    },
    // 保养记录图片判断
    beforeAvatarUpload(file) {
      let isImg = false;
      const msg = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (msg === "jpg" || msg === "png") {
        isImg = true;
      }
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isImg) {
        this.$message({
          message: "上传图片只能是 JPG/PNG 格式!",
          type: "error",
          offset: 150
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传图片大小不能超过 10MB!",
          type: "error",
          offset: 165
        });
      }
      return isImg && isLt2M;
    },
    // 新建反馈
    newfeedback() {
      const _this = this;
      if (this.imgupload) {
        this.rules.img = [];
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$refs.uploadimg.submit();
          } else {
            return false;
          }
        });
      } else {
        this.$refs["ruleForm"].validate();
      }
    },
    // 新建反馈成功回调
    uploadimgSuccess(response, file, fileList) {
      this.rules.img = [{ required: true, message: "请选择上传图片" }];
      this.feedback = !this.feedback;
      this.$message({
        type: "success",
        message: "新增成功！",
        offset: 155
      });
      this.getList();
    },
    // 显示问题处理
    showprocess(row) {
      // console.log(this.processmsg);
      if (this.jurisdictionList.indexOf("质量安全管理-处理") != -1) {
        this.process = !this.process;
        this.processmsg["sid"] = row.sid;
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 问题处理图片判断
    beforeProcessUpload(file) {
      let isImg = false;
      const msg = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (msg === "jpg" || msg === "png") {
        isImg = true;
      }
      const isLt2M = file.size / 1024 / 1024 < 10;

      if (!isImg) {
        this.$message({
          message: "上传图片只能是 JPG/PNG 格式!",
          type: "error",
          offset: 150
        });
      }
      if (!isLt2M) {
        this.$message({
          message: "上传图片大小不能超过 10MB!",
          type: "error",
          offset: 165
        });
      }
      return isImg && isLt2M;
    },
    // 问题处理
    problemHandling(id) {
      if (this.imgupload) {
        this.rules.img = [];
        this.$refs.uploadimg.submit();
      } else {
        this.$refs["ruleForm"].validate();
      }
    },
    // 问题处理成功回调
    processsuccess() {
      const _this = this;
      this.$message({
        type: "success",
        message: "处理完成！",
        offset: 155
      });
      this.process = !this.process;
      setTimeout(() => {
        _this.getList();
      }, 1000);
    },
    // 导出数据
    excellist() {
      if (this.jurisdictionList.indexOf("质量安全管理-导出数据") != -1) {
        location.href = this.$http.defaults.baseURL + "safeQuality/exportExcel";
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "你没有权限"
        });
      }
    },
    // 图片添加非空验证
    onChange(file, filelist) {
      if (filelist.length != 0) {
        this.$refs["ruleForm"].clearValidate("img");
        this.imgupload = true;
      }
    },
    // 图片删除非空验证
    onRemove(file, filelist) {
      if (filelist.length == 0) {
        this.rules.img = [{ required: true, message: "请选择上传图片" }];
        this.$refs["ruleForm"].validateField("img");
        this.imgupload = false;
      }
    },
    // 关闭处理弹窗
    closeprocessmsg() {
      this.processmsg = {};
      this.addfeedback = {};
      this.$refs.uploadimg.clearFiles();
      this.$refs.ruleForm.resetFields();
    }
  },
  created() {
    this.getList();
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
  .filter {
    float: left;
  }
  .btn {
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
  float: right;
  margin-right: 25px;
  padding-top: 20px;
}
</style>
<template>
  <!-- 招聘信息管理 -->
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
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
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
    </div>

    <!-- 按钮 -->
    <div class="menu">
      
      <div class="btn">
        <el-button icon="el-icon-plus" @click="feedback = true">新建反馈</el-button>
        <el-button icon="el-icon-plus" @click="excellist">导出数据</el-button>
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
        :pager-count="21"
        layout="total, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
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
                  <el-option label="环卫一部" value="环卫一部"></el-option>
                  <el-option label="环卫二部" value="环卫二部"></el-option>
                  <el-option label="环卫三部" value="环卫三部"></el-option>
                  <el-option label="环卫四部" value="环卫四部"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位" prop="job">
                <el-select style="width:220px" v-model="addfeedback.job">
                  <el-option label="环卫工人" value="环卫工人"></el-option>
                  <el-option label="洒水车司机" value="洒水车司机"></el-option>
                  <el-option label="清运车司机" value="清运车司机"></el-option>
                  <el-option label="清扫车司机" value="清扫车司机"></el-option>
                  <el-option label="中队长" value="中队长"></el-option>
                  <el-option label="队员" value="队员"></el-option>
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
          <el-form-item label="上传图片" prop="img" ref="upload">
            <el-upload
              ref="uploadimg"
              :file-list="addfeedback.imglist"
              :action="$http.defaults.baseURL + 'safeQuality/uploadImage'"
              :auto-upload="false"
              :on-change="onChange"
              :on-remove="onRemove"
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
                  <el-option label="环卫一部" value="环卫一部"></el-option>
                  <el-option label="环卫二部" value="环卫二部"></el-option>
                  <el-option label="环卫三部" value="环卫三部"></el-option>
                  <el-option label="环卫四部" value="环卫四部"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="岗位">
                <el-select disabled v-model="feedbackdetail.job">
                  <el-option label="全部岗位" value></el-option>
                  <el-option label="环卫工人" value="环卫工人"></el-option>
                  <el-option label="洒水车司机" value="洒水车司机"></el-option>
                  <el-option label="清运车司机" value="清运车司机"></el-option>
                  <el-option label="清扫车司机" value="清扫车司机"></el-option>
                  <el-option label="中队长" value="中队长"></el-option>
                  <el-option label="队员" value="队员"></el-option>
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
      input: null,
      radio: "0",
      data: {
        pagesize: 14,
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
        ]
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
      imgupload: false,
      status: ""
    };
  },
  methods: {
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
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示详情
    showdetail(row) {
      console.log(row);
      this.feedbackdetails = !this.feedbackdetails;
      this.feedbackdetail = row;
    },
    // 查询按钮
    searchbtn() {
      console.log(this.search);
      if (this.search.date != null) {
        this.search.startTime = this.search.date[0];
        this.search.endTime = this.search.date[1];
      } else if (this.search.date == null) {
        this.search.startTime = "";
        this.search.endTime = "";
      }
      this.getList();
    },
    // 新建反馈
    newfeedback() {
      const _this = this;
      if (this.imgupload) {
        this.rules.img = [];
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$refs.uploadimg.submit();
            this.rules.img = [{ required: true, message: "请选择上传图片" }];
            this.feedback = !this.feedback;
            setTimeout(() => {
              _this.getList();
            }, 1000);
          } else {
            return false;
          }
        });
      } else {
        this.$refs["ruleForm"].validate();
      }
    },
    // 显示问题处理
    showprocess(row) {
      this.process = !this.process;
      this.processmsg["sid"] = row.sid;
      console.log(this.processmsg);
    },
    // 问题处理
    problemHandling(id) {
      const _this = this;
      if (this.imgupload) {
        this.rules.img = [];
        this.$refs.uploadimg.submit();
        this.process = !this.process;
        setTimeout(() => {
          _this.getList();
        }, 1000);
      } else {
        this.$refs["ruleForm"].validate();
      }
    },
    // 导出数据
    excellist() {
      location.href = this.$http.defaults.baseURL + "safeQuality/exportExcel";
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
    console.log();

    this.getList();
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
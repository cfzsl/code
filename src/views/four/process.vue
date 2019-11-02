<template>
  <!-- 招聘信息管理 -->
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="searchbox">
        <span>姓名</span>
        <el-input v-model="search.user" placeholder="请输入姓名" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>归属单位</span>
        <el-select v-model="search.type">
          <el-option label="全部" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>处理结果</span>
        <el-select v-model="search.work">
          <el-option label="全部" value></el-option>
          <el-option label="已处理" value="已处理"></el-option>
          <el-option label="未处理" value="未处理"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        日期
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

      <el-button type="primary" class="btn">查询</el-button>
    </div>

    <!-- 按钮 -->
    <div class="menu">
      <div class="filter">共反馈5个问题，已解决4个，未解决1个</div>

      <div class="btn">
        <el-button icon="el-icon-plus" @click="feedback = true">新建反馈</el-button>
        <el-button icon="el-icon-plus">导出数据</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
      >
        <el-table-column align="center" prop="sid" label="日期"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="phone" label="归属单位"></el-table-column>
        <el-table-column align="center" prop="company" label="岗位"></el-table-column>
        <el-table-column align="center" prop="area" label="问题详情"></el-table-column>
        <el-table-column align="center" prop="job" label="发生地点"></el-table-column>
        <el-table-column align="center" prop="education" label="现场照片"></el-table-column>
        <el-table-column align="center" prop="entryTime" label="反馈人"></el-table-column>
        <el-table-column align="center" prop="age" label="处理结果"></el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="showdetail(scope.row)">详情</el-button>
            <el-button type="primary" @click="showprocess(scope.row)">处理</el-button>
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
    <el-dialog title="新建反馈" width="650px" :visible.sync="feedback" @close="msg = {}">
      <el-form :inline="true" style="overflow: hidden;">
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈日期">
                <el-date-picker v-model="feedback.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="feedback.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="所属单位">
                <el-select v-model="search.department">
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
                <el-select v-model="search.job">
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
          <el-form-item label="问题详情">
            <el-input
              type="textarea"
              resize="none"
              style="width: 500px;vertical-align:text-top;"
              :rows="2"
              placeholder="请输入问题详情"
              v-model="feedback.content"
            ></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="发生地点">
            <el-input style="width: 500px" v-model="feedback.didian" placeholder="请输入发生地点"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="上传图片">
            <el-upload
              ref="upload"
              action="https://jsonplaceholder.typicode.com/posts/"
              :auto-upload="false"
              style="float: left"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </div>
        <el-form-item style="float:right">
          <el-button type="primary" @click="feedback = false">取消</el-button>
          <el-button type="primary" @click="feedback = false">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 反馈详情 -->
    <el-dialog title="反馈详情" width="650px" :visible.sync="feedbackdetails" @close="msg = {}">
      <el-form :inline="true" style="overflow: hidden;">
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈日期">
                <el-date-picker v-model="feedback.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="feedback.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="所属单位">
                <el-select v-model="search.department">
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
                <el-select v-model="search.job">
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
          <el-form-item label="问题详情">
            <el-input
              type="textarea"
              resize="none"
              style="width: 500px;vertical-align:text-top;"
              :rows="2"
              placeholder="请输入问题详情"
              v-model="feedback.content"
            ></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-form-item label="发生地点">
            <el-input style="width: 500px" v-model="feedback.didian" placeholder="请输入发生地点"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="反馈人">
                <el-date-picker v-model="feedback.date" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理结果">
                <el-select v-model="search.department">
                  <el-option label="已处理" value="已处理"></el-option>
                  <el-option label="未处理" value="未处理"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="feedbackbox">
          <el-form-item label="详情描述（处理）">
            <el-input style="width: 100%" v-model="feedback.didian" placeholder="请输入发生地点"></el-input>
          </el-form-item>
        </div>
        <div class="feedbackbox">
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <el-form-item label="问题照片"></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="处理后照片"></el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </el-dialog>

    <!-- 处理 -->
    <el-dialog title="问题处理" width="650px" :visible.sync="process" @close="msg = {}">
      <el-form ref="form" label-width="80px" style="overflow: hidden;">
        <el-form-item label="处理状态">
          <el-radio-group v-model="processmsg.status">
            <el-radio label="已处理">已处理</el-radio>
            <el-radio label="未处理">未处理</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="详情内容">
          <el-input type="textarea" resize="none" v-model="processmsg.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
        <el-form-item label="上传图片">
          <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :auto-upload="false"
            style="float: left"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="feedback = false">取消</el-button>
          <el-button type="primary" @click="feedback = false">提交</el-button>
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
        list: [
          {
            sid: 1,
            name: "李诞",
            phone: "15375669845",
            company: "环卫一部",
            area: "东营区",
            job: "环卫工",
            education: "初中",
            entryTime: "2019-10-20",
            age: "36"
          },
          {
            sid: 2,
            name: "张圆圆",
            phone: "15386966974",
            company: "环卫二部",
            area: "东营区",
            job: "扫水车司机",
            education: "大专",
            entryTime: "2019-09-15",
            age: "36"
          },
          {
            sid: 3,
            name: "刘波",
            phone: "15304937816",
            company: "环卫三部",
            area: "滨州区",
            job: "垃圾运输车司机",
            education: "高中",
            entryTime: "2019-08-02",
            age: "36"
          }
        ]
      },
      search: {
        type: "",
        work: "",
        road: "",
        company: ""
      },
      // 新建查询
      addfeedback: {
        date: "",
        name: "",
        area: "",
        job: "",
        content: "",
        didian: "",
        imglist: []
      },
      // 处理信息
      processmsg: {
        status: "",
        content: "",
        imglist: []
      },
      feedback: false,
      feedbackdetails: false,
      process: false,
      insuranceList: [
        {
          carbrand: "鲁E-562E4",
          company: "太平洋保险",
          effectivedate: "2019-02-30",
          warningdate: "2020-10-15"
        },
        {
          carbrand: "鲁E-359Y5",
          company: "太平洋保险",
          effectivedate: "2018-05-10",
          warningdate: "2019-09-19"
        }
      ],
      value1: "",
      value2: "",
      msg: {
        number: ""
      },
      th: "0"
    };
  },
  methods: {
    onSubmit() {},
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示详情
    showdetail(row) {
      this.feedbackdetails = !this.feedbackdetails;
    },
    // 显示处理
    showprocess(row) {
      this.process = !this.process;
    }
  },
  created() {}
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
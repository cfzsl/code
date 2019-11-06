<template>
  <!-- 人员考勤 -->
  <div id="bonus">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="searchList">
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="searchList.name"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-select v-model="searchList.organ">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchList.status" class="selectTop">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in optionsStated"
                :key="item.state"
                :label="item.status"
                :value="item.status"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="searchtime">
            <el-date-picker
              v-model="searchList.searchtime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onEmpty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="searchBotLeft">
        <div>
          日期：
          <span class="spanDate">2019-11-04</span> 应到
          <span>50</span>人、实到
          <span>45</span>人、正常考勤
          <span>41</span>人、迟到
          <span>1</span>人、缺卡
          <span>1</span>人、旷工
          <span>1</span>人、早退
          <span>1</span>人、请假
          <span>1</span>人
        </div>
      </div>
      <div class="searchBot">
        <el-button type="primary" class="buttonBotLast" @click="scheduling = true">排班</el-button>
        <el-button type="primary" class="buttonBotLast" @click="kaoqinList">导出数据</el-button>
      </div>
    </div>
    <!-- 排班弹框 -->
    <el-dialog title="排班" :visible.sync="scheduling" width="1379px">
      <div class="buildButton">
        <el-button type="primary" class="buttonBotLast" @click="schedulingBuild = true">新建班次</el-button>
        <el-button type="primary" class="buttonBotLast" @click="scheduling = false">返回上一级</el-button>
      </div>
      <el-table
        :data="schedulingList.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="warningDate" label="序号" width="80px"></el-table-column>
        <el-table-column align="center" prop="name" label="班次名称" width></el-table-column>
        <el-table-column align="center" prop="shopTime" label="上下班时间" width></el-table-column>
        <el-table-column align="center" prop="homeTime" label="休息时间" width></el-table-column>
        <el-table-column align="center" prop="job" label="适用岗位" width></el-table-column>
        <el-table-column align="center" prop="warningTime" label="考勤方式" width></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="schedulingEdit(scope.row, scope.$index)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="schedulingdelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新建班次弹窗 -->
      <el-dialog width="50%" title="新建班次" :visible.sync="schedulingBuild" append-to-body>
        <el-divider></el-divider>
        <el-form :inline="true" :model="shifts">
          <el-form-item label="班次名称">
            <el-input></el-input>
          </el-form-item>
          <div>
            <el-form-item label="上班时间">
              <el-input v-model="time" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="下班时间">
              <el-input v-model="time" style="width:80px"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </el-dialog>
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
        :total="salaryList.length"
      ></el-pagination>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="salaryList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="logdaytime" label="考勤日期"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="organ" label="组织架构" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="tel" label="联系方式" width></el-table-column>
      <el-table-column align="center" prop="kqways" label="考勤方式" width></el-table-column>
      <el-table-column align="center" prop="kqlogtime" label="考勤记录" width></el-table-column>
      <el-table-column align="center" prop="picpath" label="现场照片" width>
        <template slot-scope="scope">
          <span v-if="scope.row.picpath" style="color:blue">查看照片</span>
          <span v-else-if="!scope.row.picpath" style="color:blue">未上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showdetail(scope.row, scope.$index)">异常处理</el-button>
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
      :total="salaryList.length"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="异常处理" :visible.sync="dialogFormVisible" width="571px">
      <el-divider></el-divider>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="处理为">
          <el-radio-group v-model="formInline.radio">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="请假">请假</el-radio>
            <el-radio label="迟到">迟到</el-radio>
            <el-radio label="早退">早退</el-radio>
            <el-radio label="旷工">旷工</el-radio>
            <el-radio label="加班">加班</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请假">
          <el-input v-model="time" style="width:80px"></el-input>
          <el-select v-model="date" style="width:80px" class="selectTop">
            <el-option label="小时" value></el-option>
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <div>处理后,系统将按正常上下班记录并统计</div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adddate" class="formButon">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      searchList: {
        name: "",
        organ: "",
        status: "",
        searchtime: ""
      },
      shifts:{},
      time: "",
      date: "",
      schedulingBuild: false,
      scheduling: false,
      dialogFormVisible: false,
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
          web: "1",
          label: "天"
        }
      ],
      lu: "0",
      optionslu: [
        {
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "东营区新区"
        },
        {
          lu: "2",
          label: "文汇街道办事处"
        },
        {
          lu: "3",
          label: "辛店街道办事处"
        },
        {
          lu: "4",
          label: "黄河街道办事处"
        },
        {
          lu: "5",
          label: "圣园街道办事处"
        },
        {
          lu: "6",
          label: "六户镇"
        },
        {
          lu: "7",
          label: "牛庄镇"
        },
        {
          lu: "8",
          label: "史口镇"
        },
        {
          lu: "9",
          label: "龙居镇"
        }
      ],
      state: "0",
      optionsStated: [
        {
          state: "1",
          status: "正常"
        },
        {
          state: "2",
          status: "迟到"
        },
        {
          state: "3",
          status: "早退"
        },
        {
          state: "4",
          status: "加班"
        },
        {
          state: "5",
          status: "请假"
        },
        {
          state: "6",
          status: "旷工"
        },
        {
          state: "7",
          status: "缺卡"
        }
      ],
      formInline: {
        radio: "正常"
      },
      salaryList: [],
      schedulingList: []
    };
  },
  created() {
    this.getSalaryList();
  },
  methods: {
    // 编辑
    schedulingEdit(row, _index) {},
    //删除
    schedulingdelete(row, _index) {},
    //查询
    onSubmit() {
      console.log(this.searchList);
      this.$http
        .post("/hr/kaoqin/search", this.$qs.stringify(this.searchList))
        .then(res => {
          console.log(res.data);
          this.salaryList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 清空
    onEmpty() {
      this.searchList = {
        name: "",
        organ: "",
        status: "",
        searchtime: ""
      };
      this.getSalaryList();
    },
    // 获取列表
    getSalaryList() {
      this.$http
        .post("/hr/kaoqin/search")
        .then(res => {
          console.log(res.data);
          this.salaryList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 导出列表
    kaoqinList(){
      location.href='http://192.168.124.6:8888/hr/kaoqin/exportExcel'
    },
    //分页
    nextpage(value) {
      this.currpage = value;
    },
    adddate() {
      console.log(this.formInline);
      this.dialogFormVisible = false;
    },
    showdetail(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
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
  height: 120px;
  margin-top: 16px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBotLeft {
    position: absolute;
    bottom: 5px;
    left: 0;
    font-size: 16px;
    span {
      color: #169bd5;
    }
    .spanDate {
      color: #999999;
    }
  }
  .searchBot {
    position: absolute;
    bottom: 5px;
    right: 0;
    .buttonBotLast {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
      margin: 0 0 0 10px;
    }
  }
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
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
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
.buildButton {
  text-align: right;
}
</style>

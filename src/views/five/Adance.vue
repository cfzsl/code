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
          <el-form-item label="区域">
            <el-select v-model="searchList.area">
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
            <el-select v-model="searchList.state" class="selectTop">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in optionsStated"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" class="msgDate">
            <el-time-picker
              is-range
              v-model="searchList.sendtime"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
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
        <el-button type="primary" class="buttonBotLast">导出数据</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="salaryList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="warningDate" label="考勤日期" width="80px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="region" label="归属区域" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="tell" label="联系方式" width></el-table-column>
      <el-table-column align="center" prop="warningTime" label="考勤记录" width></el-table-column>
      <el-table-column align="center" prop="img" label="现场照片" width></el-table-column>
      <el-table-column align="center" prop="data" label="状态" width></el-table-column>
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
        area: "",
        state: "",
        sendtime: [new Date(), new Date()]
      },
      time: "",
      date: "",
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
          label: "正常"
        },
        {
          state: "2",
          label: "迟到"
        },
        {
          state: "3",
          label: "早退"
        },
        {
          state: "4",
          label: "加班"
        },
        {
          state: "5",
          label: "请假"
        },
        {
          state: "6",
          label: "旷工"
        },
        {
          state: "7",
          label: "缺卡"
        }
      ],
      formInline: {
        radio: "正常"
      },
      salaryList: []
    };
  },
  created() {
    // this.getSalaryList();
  },
  methods: {
    miStatusColor(item) {
      if (item == 0) {
        return "danger";
      } else if (item == 1) {
        return "primary";
      }
      return "success";
    },
    //查询
    onSubmit() {
      console.log(this.searchList);
      this.$http
        .post("hr/bonus/search", this.$qs.stringify(this.searchList))
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
        area: "",
        state: "",
        sendtime: ""
      };
      this.getSalaryList();
    },
    // 获取列表
    getSalaryList() {
      this.$http
        .post("hr/bonus/search")
        .then(res => {
          console.log(res.data);
          this.salaryList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
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
  height: 100px;
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
      margin: 0;
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
</style>

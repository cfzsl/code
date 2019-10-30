<template>
  <!-- 奖金管理 -->
  <div id="bonus">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="formInline.area">
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
            <el-select v-model="formInline.job">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in postList"
                :key="item.lu"
                :label="item.job"
                :value="item.job"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="msgDate">
            <el-date-picker v-model="formInline.sendtime" type="date" placeholder class="msgDatePicker"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onEmpty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="searchBot">
        <!-- <el-button class="buttonBot" @click="dialogVisible = true">添加薪资档案</el-button> -->
        <el-button class="buttonBot">导入模板下载</el-button>
        <el-button class="buttonBot">薪资信息介绍</el-button>
        <el-button class="buttonBotLast">薪资信息导出</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <!-- <el-dialog title="添加薪资档案" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="formInline.date" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="formInline.region" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="formInline.job" class="selectTop">
            <el-option v-for="item in postList" :key="item.lu" :label="item.label" :value="item.lu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="formInline.education"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" class="selectTop">
            <el-option
              v-for="item in optionsStated"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="formInline.basepay"></el-input>
        </el-form-item>
        <el-form-item label="其他补助">
          <el-input v-model="formInline.subsidies"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">保存</el-button>
      </span>
    </el-dialog> -->
    <!-- 表格 -->
    <el-table
      :data="salaryList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="num" label="序号" width="80px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="basecash" label="基本工资(元)" width></el-table-column>
      <el-table-column align="center" prop="helpcash" label="其他补助(元)" width></el-table-column>
      <el-table-column align="center" prop="trafficcash" label="交通补助(元)" width></el-table-column>
      <el-table-column align="center" prop="callcash" label="通讯补助(元)" width></el-table-column>
      <el-table-column align="center" prop="awardcash" label="奖金(元)" width></el-table-column>
      <el-table-column align="center" prop="baseday" label="应上班天数" width></el-table-column>
      <el-table-column align="center" prop="actuallyday" label="实际上班天数" width></el-table-column>
      <el-table-column align="center" prop="relaxday" label="请假天数" width></el-table-column>
      <el-table-column align="center" prop="relaxcash" label="请假扣款(元)" width></el-table-column>
      <el-table-column align="center" prop="retiresafe" label="退休保险" width></el-table-column>
      <el-table-column align="center" prop="hospitalsafe" label="医疗保险" width></el-table-column>
      <el-table-column align="center" prop="outworksafe" label="失业保险" width></el-table-column>
      <el-table-column align="center" prop="actuallycash" label="实发工资(元)" width></el-table-column>
      <el-table-column align="center" label="发放情况" width>
        <template slot-scope="scope">
          <span :class="scope.row.issend=='0'?'hede':'green'">{{scope.row.issend=='0'?'待发送':'已发送'}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="sendtime" label="发放时间" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.issend"
            class="tableButton1"
            type="button"
            size="small"
            @click="showdetail(scope.row, scope.$index)"
          >待发放</el-button>
          <el-button
            v-show="!scope.row.issend"
            class="tableButton2"
            type="button"
            size="small"
            disabled
          >已发放</el-button>
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
    <!-- <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="buttonIf">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="formInline.date" class="selectTop" disabled>
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="formInline.region" class="selectTop" disabled>
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="formInline.job" class="selectTop" disabled>
            <el-option v-for="item in postList" :key="item.lu" :label="item.label" :value="item.lu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="formInline.education"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" class="selectTop" disabled>
            <el-option
              v-for="item in optionsStated"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="formInline.basepay"></el-input>
        </el-form-item>
        <el-form-item label="其他补助">
          <el-input v-model="formInline.subsidies"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="!buttonIf">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-select v-model="formInline.date" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="formInline.region" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="formInline.job" class="selectTop">
            <el-option v-for="item in postList" :key="item.lu" :label="item.label" :value="item.lu"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="formInline.education"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.state" class="selectTop">
            <el-option
              v-for="item in optionsStated"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="基本工资">
          <el-input v-model="formInline.basepay"></el-input>
        </el-form-item>
        <el-form-item label="其他补助">
          <el-input v-model="formInline.subsidies"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="buttonIf" @click="addDo" class="formButon">编辑</el-button>
        <el-button type="primary" v-else-if="!buttonIf" @click="adddate" class="formButon">保存</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formInline: {
        name:'',
        area:'',
        job:'',
        sendtime:''
      },
      dialogVisible: false,
      dialogFormVisible: false,
      les: 0,
      progressDate: [
        { les: 0, progress: "未处理" },
        { les: 1, progress: "处理中" },
        { les: 2, progress: "完成" }
      ],
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
          label: "全部"
        },
        {
          web: "1",
          label: "环卫一部"
        },
        {
          web: "2",
          label: "环卫二部"
        },
        {
          web: "3",
          label: "环卫三部"
        },
        {
          web: "4",
          label: "环卫四部"
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
      web: "0",
      optionsWeb: [
        {
          web: "0",
          label: "全部"
        },
        {
          web: "1",
          label: "环卫一部"
        },
        {
          web: "2",
          label: "环卫二部"
        },
        {
          web: "3",
          label: "环卫三部"
        },
        {
          web: "4",
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
          state: "0",
          label: "在职"
        },
        {
          state: "1",
          label: "离职"
        }
      ],
      buttonIf: true,
      salaryList: []
    };
  },
  created() {
    this.getSalaryList();
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
      console.log(this.formInline)
      this.$http.post('hr/bonus/search',this.$qs.stringify(this.formInline)).then(res=>{
        console.log(res.data)
        this.salaryList=res.data
      }).catch(err=>{
        console.log('请求失败')
      })
    },
    // 清空
    onEmpty() {
      this.formInline={
        name:'',
        area:'',
        job:'',
        sendtime:''
      }
      this.getSalaryList();
    },
    // 获取列表
    getSalaryList(){
      this.$http.post('hr/bonus/search').then(res=>{
        console.log(res.data)
        this.salaryList=res.data
      }).catch(err=>{
        console.log('请求失败')
      })
    },
    //分页
    nextpage(value) {
      this.currpage = value;
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
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
    },
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
    margin-bottom: 2px;
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
  width: 82px;
}
.tableButton3 {
  background-color: #f66134;
  color: #fff;
}
.hede {
  color: #000;
}
.green {
  color: green;
}
</style>
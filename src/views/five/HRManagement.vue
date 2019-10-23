<template>
  <!-- 人事管理 -->
  <div id="HRManagement">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="value1"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="lu">
              <el-option
                v-for="item in postList"
                :key="item.lu"
                :label="item.label"
                :value="item.lu"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="state">
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
    <el-dialog title="添加人事信息档案" :visible.sync="dialogVisible" width="426px" class="dialogText">
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
          <el-select v-model="formInline.state"  class="selectTop">
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
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="wcList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="number" label="序号" width="80px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width></el-table-column>
      <el-table-column align="center" prop="date" label="单位" width></el-table-column>
      <el-table-column align="center" prop="region" label="区域" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width="121px"></el-table-column>
      <el-table-column align="center" prop="education" label="学历" width></el-table-column>
      <el-table-column align="center" prop="state" label="状态" width></el-table-column>
      <el-table-column align="center" prop="basepay" label="基本工资(元)" width></el-table-column>
      <el-table-column align="center" prop="subsidies" label="其他补助(元)" width></el-table-column>
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
            v-if="scope.row.join"
          >设为离职</el-button>
          <el-button class="tableButton3" type="button" @click="deletList" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10]"
      :page-size="pagesize"
      :current-page="currpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="wcList.length"
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
          <el-select v-model="formInline.state"  class="selectTop" disabled>
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
          <el-select v-model="formInline.state"  class="selectTop">
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
      value1: "",
      text: "人事管理详情",
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formInline: {},
      dialogVisible: false,
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
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "环卫工"
        },
        {
          lu: "2",
          label: "洒水车司机"
        },
        {
          lu: "3",
          label: "垃圾运输车司机"
        },
        {
          lu: "4",
          label: "中队长"
        },
        {
          lu: "5",
          label: "队长"
        },
        {
          lu: "6",
          label: "大队长"
        },
        {
          lu: "7",
          label: "主管"
        }
      ],
      value: "0",
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "东营区新区"
        },
        {
          value: "2",
          label: "文汇街道办事处"
        },
        {
          value: "3",
          label: "辛店街道办事处"
        },
        {
          value: "4",
          label: "黄河街道办事处"
        },
        {
          value: "5",
          label: "圣园街道办事处"
        },
        {
          value: "6",
          label: "六户镇"
        },
        {
          value: "7",
          label: "牛庄镇"
        },
        {
          value: "8",
          label: "史口镇"
        },
        {
          value: "9",
          label: "龙居镇"
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
      formInline: {},
      dialogFormVisible: false,
      wcList: [
        {
          number: 1,
          name: "李诞",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "环卫工",
          education: "初中",
          state: "在职",
          join:true,
          basepay: "3000",
          subsidies: "300",
          msg:'36',
          policeNode: "10"
        },
        {
          number: 2,
          name: "张圆圆",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "洒水车司机",
          education: "大专",
          state: "在职",
          join:true,
          basepay: "3600",
          subsidies: "500",
          msg:'42',
          policeNode: "11"
        },
        {
          number: 3,
          name: "刘波",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "垃圾运输车司机",
          education: "高中",
          state: "离职",
          join:false,
          basepay: "3200",
          subsidies: "600",
          msg:'54',
          policeNode: "12"
        }
      ]
    };
  },
  created() {},
  methods: {
    miStatusColor(item) {
      if (item == 0) {
        return "danger";
      } else if (item == 1) {
        return "primary";
      }
      return "success";
    },
    addDo() {
      // let _index = this.listIndex;
      //根据索引，赋值到list制定的数
      // this.list[_index] = this.formInline;
      //关闭弹窗
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
      const id=row.number
      this.$router.push({path:'/matters/details', query: {id}})
    },
    pagination(row, _index) {
      console.log("设为了离职");
    },
    deletList() {
      console.log("删除这一项");
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    onSubmit() {
      console.log("查啥?");
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
}
.tableButton3 {
  background-color: #f66134;
  color: #fff;
}
</style>

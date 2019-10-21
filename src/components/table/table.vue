<template>
  <!-- 列表 -->
  <div id="table">
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="number" label="序号" width="63px"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width="93"></el-table-column>
      <el-table-column align="center" prop="province" label="负责道路" width="193px"></el-table-column>
      <el-table-column align="center" prop="provdown" label="作业区域" width="102px"></el-table-column>
      <el-table-column align="center" prop="city" label="归属单位" width="203px"></el-table-column>
      <el-table-column align="center" prop="date" label="入职时间" width="168px"></el-table-column>
      <el-table-column align="center" prop="updata" label="离职时间" width="167px"></el-table-column>
      <el-table-column align="center" prop="zipiphone" label="联系方式" width="160px"></el-table-column>
      <el-table-column align="center" prop="msg" label="是否超龄" width="144px">
        <template slot-scope="scope">
        <div :class="scope.row.red?'textmsg':'textcc'">{{scope.row.msg}}</div>
      </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="button"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >详情</el-button>
          <el-button
            class="tableButton2"
            type="button"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >编辑</el-button>
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
      :page-sizes="[10,20,30,40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="32">
    </el-pagination>

    <!-- 弹框 -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="buttonIf">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="formInline.usg" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="formInline.id" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型">
          <el-input v-model="formInline.type" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formInline.address" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.zipiphone" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-input v-model="formInline.state" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input v-model="formInline.date" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input v-model="formInline.updatetime" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-input v-model="formInline.job" class="inputL"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-input v-model="formInline.web"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="!buttonIf">
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="formInline.usg"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="formInline.id"></el-input>
        </el-form-item>
        <el-form-item label="准驾车型">
          <el-select v-model="type" class="selectTop">
            <el-option
              v-for="item in optionsType"
              :key="item.type"
              :label="item.label"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="state" class="selectTop">
            <el-option
              v-for="item in optionsStated"
              :key="item.state"
              :label="item.label"
              :value="item.state"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input v-model="formInline.addtime"></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input v-model="formInline.updatetime"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="job" class="selectTop">
            <el-option
              v-for="item in optionsJob"
              :key="item.job"
              :label="item.label"
              :value="item.job"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="buttonIf" @click="addDo" class="formButon">编辑</el-button>
        <el-button type="primary" v-else-if="!buttonIf" @click="adddate" class="formButon">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      value: "0",
      text: "人员信息详情",
      buttonIf: true,
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
      job: "0",
      optionsJob: [
        {
          job: "0",
          label: "全部"
        },
        {
          job: "1",
          label: "东营区新区"
        },
        {
          job: "2",
          label: "文汇街道办事处"
        },
        {
          job: "3",
          label: "辛店街道办事处"
        },
        {
          job: "4",
          label: "黄河街道办事处"
        },
        {
          job: "5",
          label: "圣园街道办事处"
        },
        {
          job: "6",
          label: "六户镇"
        },
        {
          job: "7",
          label: "牛庄镇"
        },
        {
          job: "8",
          label: "史口镇"
        },
        {
          job: "9",
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
      pagesize: 10,
      currpage: 1,
      listIndex: null,
      tableData: [
        {
          number: 1,
          name: "李诞",
          province: "庐山路",
          provdown: "东营区新区",
          city: "环卫一部",
          date: "2018-01-01",
          updata: "-",
          zipiphone: "15375669845",
          msg: "否",
          red:false
        },
        {
          number: 2,
          name: "张圆圆",
          province: "宁阳路",
          provdown: "东营区新区",
          city: "环卫一部",
          date: "2018-01-01",
          updata: "-",
          zipiphone: "15375669845",
          msg: "是",
          red:true
        },
        {
          number: 3,
          name: "刘波",
          province: "新泰路",
          provdown: "东营区新区",
          city: "环卫一部",
          date: "2018-01-01",
          updata: "-",
          zipiphone: "15375669845",
          msg: "否",
          red:false          
        },
      ],
      dialogFormVisible: false,
      formInline: {}
    };
  },

  created() {
  },
  methods: {
    // 弹窗传值
    pagination(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
      this.buttonIf = true;
      console.log(this.dialogFormVisible);
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
    },
    deletList() {
      console.log("删除指定项");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.tableButton1,
.tableButton2,
.tableButton3 {
  width: 60px;
  height: 26px;
}
.tableButton3 {
  color: #fff;
  background-color: #f56c6c;
  border-radius: 3px;
}
.tableButton2 {
  color: #fff;
  background-color: #4eb14e;
  border-radius: 3px;
}
.tableButton1 {
  color: #fff;
  background-color: #409eff;
  border-radius: 3px;
}
.textmsg {
  color: red;
}
.textcc {
  color: #000;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
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
  .formTop {
    margin-bottom: 16px;
  }
  .el-form-item {
    margin-bottom: 2px;
    .el-input {
      width: 240px;
      height: 32px;
    }
  }
  .selectTop {
    width: 240px;
    height: 32px;
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
.delect-footer {
  float: left;
  margin-left: 10px;
}
</style>

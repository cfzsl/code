<template>
  <!-- 列表 -->
  <div id="table">
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="number" label="序号" width></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="province" label="区域" width></el-table-column>
      <el-table-column align="center" prop="city" label="单位" width></el-table-column>
      <el-table-column align="center" prop="date" label="入职时间" width></el-table-column>
      <el-table-column align="center" prop="updata" label="离职时间" width></el-table-column>
      <el-table-column align="center" prop="zipiphone" label="联系方式" width></el-table-column>
      <el-table-column align="center" prop="msg" label="是否超龄" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="button"
            size="small"
            @click="pagination(scope.row,scope.$index)"
          >详情</el-button>
          <el-button class="tableButton2" type="button" @click="deletList" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      layout="total, prev, pager, next"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>

    <!-- 弹框 -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if='buttonIf'>
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
      <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if='!buttonIf'>
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
          <el-select v-model="job" class='selectTop'>
            <el-option
              v-for="item in optionsJob"
              :key="item.job"
              :label="item.label"
              :value="item.job"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class='selectTop'>
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
        <el-button type="primary" @click="dialogFormVisible=false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if='buttonIf' @click="addDo" class="formButon">编辑</el-button>
        <el-button type="primary" v-else-if='!buttonIf' @click="adddate" class="formButon">保存</el-button>
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
      text:'人员信息详情',
      buttonIf:true,
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
      tableData: [],
      dialogFormVisible: false,
      formInline: {}
    };
  },

  created() {
    this.getlist();
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
      this.buttonIf=true;
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
      this.dialogFormVisible=false
    },
    getlist() {
      for (let i = 1; i < 99; i++) {
        this.tableData.push({
          number:i,
          name: "李旦",
          province: "东营区",
          city: "环卫一部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-05-02",
          updata: "在职",
          zipiphone: "15927227885",
          msg: "否"
        });
      }
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
.tableButton2 {
  width: 55px;
  height: 25px;
  padding: 0;
  margin: 0;
}
.tableButton2 {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.tableButton1 {
  margin-right: 10px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.paginationList {
  float: right;
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

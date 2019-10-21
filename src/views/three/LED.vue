<template>
  <!-- LED电子屏幕管理 -->
  <div id="LED">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="公厕名" class="msgWc">
            <el-input v-model="value1"></el-input>
          </el-form-item>
          <el-form-item label="管养单位">
            <el-select v-model="lu">
              <el-option
                v-for="item in options"
                :key="item.lu"
                :label="item.label"
                :value="item.lu"
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
        <el-button class="buttonBot" @click="dialogVisible = true">设置电子屏幕</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="LED电子屏内容编辑" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-input v-model="formInline.name"></el-input>
      </el-form>
      <span slot="footer">
          <el-button type="primary" @click="dialogVisible = false">发送</el-button>
        </span>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="wcList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" type="selection" width="40"></el-table-column>
      <el-table-column align="center" prop="wcid" label="公厕名" width></el-table-column>
      <el-table-column align="center" prop="date" label="管养单位" width='282'></el-table-column>
      <el-table-column align="center" prop="state" label="状态" width></el-table-column>
      <el-table-column align="center" prop="name" label="联络人" width></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width></el-table-column>
      <el-table-column align="center" prop="text" label="电子屏内容" width='282'></el-table-column>
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
      :total="32"
    ></el-pagination>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      value1: "",
      i: "",
      text: "添加车辆信息",
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formInline: {},
      dialogVisible: false,
      les: 0,
      lu: "0",
      options: [
        {
          lu: "0",
          label: "东营丛林绿化工程有限责任公司"
        },
        {
          lu: "1",
          label: "东营卓越环境工程有限责任公司"
        }
      ],
      state: "0",
      optionsStated: [
        {
          state: "0",
          label: "开放使用"
        },
        {
          state: "1",
          label: "暂停使用"
        }
      ],
      buttonIf: false,
      formInline: {},
      dialogFormVisible: false,
      wcList: [
        {
          number: 1,
          wcid: "火车站公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间",
          text:"美丽东营从我坐起"
        },
        {
          number: 2,
          wcid: "体育公园公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间50",
          text:"请大家文明如厕，保持卫生"
        },
        {
          number: 3,
          wcid: "北二路中石化公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间",
          text:"来也匆匆，去也冲冲"
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
    },
    pagination(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
      this.buttonIf = true;
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

<style lang="scss"  scoped>
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
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
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
</style>
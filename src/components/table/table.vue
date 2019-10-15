<template>
  <!-- 列表 -->
  <div id="table">
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 1128px"
    >
      <el-table-column class="text" prop="name" label="姓名" width="159px"></el-table-column>
      <el-table-column class="text" prop="province" label="区域" width="159px"></el-table-column>
      <el-table-column class="text" prop="city" label="单位" width="159px"></el-table-column>
      <el-table-column class="text" prop="date" label="入职时间" width="113px"></el-table-column>
      <el-table-column class="text" prop="updata" label="离职时间" width="123px"></el-table-column>
      <el-table-column class="text" prop="zipiphone" label="联系方式" width="123px"></el-table-column>
      <el-table-column class="text" prop="msg" label="是否超龄" width="140px"></el-table-column>
      <el-table-column class="text" fixed="right" label="操作" width="142px">
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
    <el-dialog title="添加人员信息" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="formTop">
          <el-form-item label="区域" class="formTopSelected">
            <el-input :value="formInline.province"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input :value="formInline.city"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="姓名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="住址">
          <el-input v-model="formInline.address"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="状态">
        <el-input v-model="formInline.updata"></el-input>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-input v-model="formInline.addtime"></el-input>
        </el-form-item>
        <el-form-item label="离职时间">
          <el-input v-model="formInline.updatetime"></el-input>
        </el-form-item>
        <el-form-item label="负责道路名称">
          <el-select v-model="formInline.region" placeholder="负责道路名称" class="selectBot">
            <el-option label="滨湖大道" value="shanghai"></el-option>
            <el-option label="翠湖公园路" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责区域范围">
          <el-select v-model="formInline.relog" placeholder="负责区域范围" class="selectBot">
            <el-option label="东营翠湖公园" value="shanghai"></el-option>
            <el-option label="陶然公园" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDo" class="formButon">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  methods: {},
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      listIndex: null,
      tableData: [
        {
          name: "李旦",
          province: "东营区",
          city: "环卫一部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-05-02",
          updata: "在职",
          zipiphone: "15927227885",
          msg: "否"
        }
      ],
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
      console.log(row)
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
      console.log(this.dialogFormVisible)
    },
    addDo() {
      let _index = this.listIndex;
      //根据索引，赋值到list制定的数
      this.list[_index] = editObj;
      //关闭弹窗
      this.dialogFormVisible = false;
    },
    getlist() {
      for (let i = 0; i < 99; i++) {
        this.tableData.push({
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
  float: left;
  width: 55px;
  height: 25px;
  padding: 0;
  margin: 0;
}
.tableButton1 {
  margin-right: 10px;
}
.dialogText {
  text-align: center;
}
.demo-form-inline {
  text-align: right;
  .formTop {
    width: 100%;
    margin-bottom: 16px;
    .formTopSelected {
      float: left;
      padding-left: 50px;
    }
    .selectTop {
      width: 104px;
      height: 22px;
      text-align: center;
    }
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
.paginationList {
  float: right;
  margin-top: 32px;
  padding: 0;
}
</style>

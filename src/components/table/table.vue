<template>
  <div id="table">
    <el-table :data="tableData" border style="width: 1128px">
      <el-table-column class='text' prop="name" label="姓名" width="159px"></el-table-column>
      <el-table-column class='text' prop="province" label="区域" width="159px"></el-table-column>
      <el-table-column class='text' prop="city" label="单位" width="159px"></el-table-column>
      <el-table-column class='text' prop="date" label="入职时间" width="113px"></el-table-column>
      <el-table-column class='text' prop="updata" label="离职时间" width="123px"></el-table-column>
      <el-table-column class='text' prop="zipiphone" label="联系方式" width="123px"></el-table-column>
      <el-table-column class='text' prop="msg" label="是否超龄" width="140px"></el-table-column>
      <el-table-column class='text' fixed="right" label="操作" width="142px">
        <template slot-scope="scope">
          <el-button class='tableButton1' @click="handleClick(scope.row)" type="button" size="small">详情</el-button>
          <el-button class='tableButton2' type="button" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    }
  },

  data() {
    return {
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
        },
        {
          name: "李旦",
          province: "东营区",
          city: "环卫一部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-05-02",
          updata: "在职",
          zipiphone: "15927227885",
          msg: "否"
        },
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
      ]
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.tableButton1,.tableButton2 {
    float: left;
    width: 55px;
    height: 25px;
    padding: 0;
    margin: 0;
}
.tableButton1 {
    margin-right: 10px;
}
</style>












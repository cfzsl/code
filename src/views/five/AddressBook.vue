<template>
  <!-- 通讯录 -->
  <div>
    <!-- 查询 -->
    <div class="search">
      <div class="searchbox">
        <span>姓名</span>
        <el-input v-model="search.name" placeholder="请输入姓名" style="width: 215px"></el-input>
      </div>
      <div class="searchbox">
        <span>组织架构</span>
        <el-select v-model="search.depart">
          <el-option label="全部区域" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>岗位</span>
        <el-select v-model="search.param3">
          <el-option label="全部岗位" value></el-option>
          <el-option label="环卫工人" value="环卫工人"></el-option>
          <el-option label="洒水车司机" value="洒水车司机"></el-option>
          <el-option label="清运车司机" value="清运车司机"></el-option>
          <el-option label="清扫车司机" value="清扫车司机"></el-option>
          <el-option label="中队长" value="中队长"></el-option>
          <el-option label="队员" value="队员"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>联系方式</span>
        <el-input v-model="search.tel" placeholder="请输入联系方式" style="width: 215px"></el-input>
      </div>

      <el-button type="primary" class="btn" @click="serachAddBook">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </div>

    <!-- 导出 -->
    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-download" @click="exportmsg">导出通讯录</el-button>
        <el-button icon="el-icon-download">导入通讯录模板</el-button>
        <el-button icon="el-icon-upload2">导入通讯录</el-button>
      </div>
    </div>

    <!-- 列表 -->
    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        stripe
        style="width: 100%"
      >
        <el-table-column align="center" prop="sid" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="hiretime" label="出生日期"></el-table-column>
        <el-table-column align="center" prop="address" label="家庭住址" width="150px"></el-table-column>
        <el-table-column align="center" prop="collage" label="毕业院校"></el-table-column>
        <el-table-column align="center" prop="professional" label="所学专业"></el-table-column>
        <el-table-column align="center" prop="depart" label="组织架构"></el-table-column>
        <el-table-column align="center" prop="param3" label="岗位"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" prop="workstatus" label="在职状态"></el-table-column>
        <el-table-column align="center" prop="hiretime" label="入职时间"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="160px">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="primary"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
            >详情</el-button>
            <el-button
              class="tableButton2"
              type="primary"
              size="small"
              @click="showrelease(scope.row, scope.$index)"
            >离职</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :page-sizes="[15, 20, 25]"
        layout="total, sizes, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
        @size-change="sizeChange"
      ></el-pagination>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      input: null,
      radio: "0",
      data: {
        pagesize: 15,
        currpage: 1,
        list: []
      },
      search: {
        name: "",
        depart: "",
        param3: "",
        tel: ""
      },
      showedit: false,
      value1: "",
      value2: "",
      msg: {
        number: ""
      },
      th: "0"
    };
  },
  methods: {
    // 导出通讯录
    exportmsg() {
      location.href =
        this.$http.defaults.baseURL + "userInformation/exportTelExcel";
    },
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(total) {
      console.log(total);
      this.data.pagesize = total;
    },
    // 获取列表数据
    getAddBook() {
      this.$http.get("userInformation/getPhoneNumber").then(res => {
        this.data.list = res.data;
      });
    },
    // 查询列表数据
    serachAddBook() {
      this.data.currpage = 1;
      this.$http
        .post("userInformation/getPhoneNumber", this.$qs.stringify(this.search))
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 清空查询
    empty() {
      this.search = {
        name: "",
        area: "",
        param3: "",
        depart: ""
      };
      this.getAddBook();
    }
  },
  created() {
    this.getAddBook();
  }
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
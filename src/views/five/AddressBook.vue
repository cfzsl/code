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
        <span>作业区域</span>
        <el-select v-model="search.area">
          <el-option label="全部区域" value></el-option>
          <el-option label="东营区新区" value="东营区新区"></el-option>
          <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
          <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
          <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
          <el-option label="圣园街道办事处" value="圣园街道办事处"></el-option>
          <el-option label="六户镇" value="六户镇"></el-option>
          <el-option label="史口镇" value="史口镇"></el-option>
          <el-option label="牛庄镇" value="牛庄镇"></el-option>
          <el-option label="龙居镇" value="龙居镇"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>岗位</span>
        <el-select v-model="search.job">
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
        <span>部门</span>
        <el-select v-model="search.depart">
          <el-option label="全部部门" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
        </el-select>
      </div>

      <el-button type="primary" class="btn" @click="serachAddBook">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </div>

    <!-- 导出 -->
    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus">导出通讯录</el-button>
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
        <el-table-column align="center" prop="tel" label="电话"></el-table-column>
        <el-table-column align="center" prop="param2" label="道路"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="param3" label="岗位"></el-table-column>
        <el-table-column align="center" prop="depart" label="部门"></el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :pager-count="21"
        layout="total, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
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
        pagesize: 16,
        currpage: 1,
        list: []
      },
      search: {
        name: "",
        area: "",
        job: "",
        depart: ""
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
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 获取列表数据
    getAddBook() {
      this.$http
        .get("userInformation/userInformationCriteriaQuery")
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 查询列表数据
    serachAddBook() {
      this.data.currpage = 1;
      this.$http
        .post(
          "userInformation/userInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
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
  button {
    margin-left: 15px;
  }
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
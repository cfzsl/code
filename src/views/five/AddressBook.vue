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
          <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>岗位</span>
        <el-select v-model="search.param3">
          <el-option label="全部岗位" value></el-option>
          <el-option v-for="item in jobList" :key="item" :label="item" :value="item"></el-option>
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
        <el-button icon="el-icon-download" @click="exportTem">下载模板</el-button>
        <el-upload
          :show-file-list="false"
          :limit="1"
          :on-exceed="onexceed"
          :on-success="onsuccess"
          action="http://192.168.124.6:8888/userInformation/importExcel"
        >
          <el-button icon="el-icon-download">导入通讯录</el-button>
        </el-upload>
        <el-button icon="el-icon-upload2" @click="exportPhone">导出通讯录</el-button>
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
        <el-table-column align="center" prop="sid" label="序号" width="50px"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="sex" label="性别"></el-table-column>
        <el-table-column align="center" prop="address" label="家庭住址" width="150px"></el-table-column>
        <el-table-column align="center" prop="depart" label="组织架构"></el-table-column>
        <el-table-column align="center" prop="param3" label="岗位"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" label="在职状态">
          <template slot-scope="scope">
            <span :class="scope.row.workstatus=='在职'?'green':'red'">{{scope.row.workstatus}}</span>
          </template>
        </el-table-column>
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
              v-show="scope.row.workstatus=='在职'?true:false"
              class="tableButton2"
              type="warning"
              size="small"
              @click="showrelease(scope.row, scope.$index)"
            >离职</el-button>
            <el-button
              v-show="scope.row.workstatus=='离职'?true:false"
              class="tableButton2"
              type="danger"
              size="small"
              @click="showdelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        background
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :page-sizes="[5, 10]"
        layout="total, sizes, prev, pager, next, jumper"
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
        pagesize: 10,
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
      th: "0",
      departList: [],
      jobList: []
    };
  },
  methods: {
    // 详情
    showdetail(row, _index) {
      this.$router.push({
        path: "/matters/details",
        query: {
          id: row.sid
        }
      });
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
      this.$http
        .post("userInformation/listBySearch", this.$qs.stringify(this.search))
        .then(res => {
          this.data.list = res.data;
          console.log("请求成功");
        });
    },
    // 查询列表数据
    serachAddBook() {
      console.log(this.search);
      this.getAddBook();
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
    },
    // 获取组织架构列表
    getDropDepart() {
      this.$http.post("userInformation/dropDepart").then(res => {
        this.departList = res.data;
        // console.log(res.data)
      });
    },
    // 获取岗位列表
    getDropJob() {
      this.$http.post("userInformation/dropJob").then(res => {
        this.jobList = res.data;
        // console.log(res.data)
      });
    },
    // 设为离职
    showrelease(row, _index) {
      row.workstatus = "离职";
      let _date = {
        workstatus: row.workstatus,
        sid: row.sid
      };
      this.$http
        .post("userInformation/update", this.$qs.stringify(_date))
        .then(res => {
          console.log("操作成功");
        });
    },
    // 删除
    showdelete(row, _index) {
      let _date = {
        param1: "0",
        sid: row.sid
      };
      this.$http
        .post("userInformation/update", this.$qs.stringify(_date))
        .then(res => {
          console.log("删除成功");
          this.getAddBook();
        });
    },
    exportTem() {
      location.href = "http://192.168.124.6:8888/userInformation/downloadMood";
    },
    exportPhone() {
      location.href = "http://192.168.124.6:8888/userInformation/exportExcel";
    },
    // 上传成功的接口
    onsuccess() {
      this.getAddBook();
    },
    onexceed() {
      this.$message.error("只能上传一个Excel文件");
    }
  },
  created() {
    this.getAddBook();
    this.getDropDepart();
    this.getDropJob();
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
  .btn {
    display: flex;
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
  text-align: center;
}
.green {
  color: green;
}
.red {
  color: red;
}
</style>
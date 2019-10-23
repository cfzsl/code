<template>
  <!-- 通讯录 -->
  <div>
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
        <span>部门</span>
        <el-select v-model="search.depart">
          <el-option label="全部部门" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
        </el-select>
      </div>

      <el-button type="primary" class="btn" @click="serachAddBook">查询</el-button>
    </div>

    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus">导出通讯录</el-button>
      </div>

      <!-- <el-dialog title="员工编辑" width="450px" :visible.sync="showedit" @close="msg = {}">
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <el-form-item label="姓名">
            <el-input v-model="msg.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="msg.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-input v-model="msg.company" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="msg.area" placeholder="请选择区域" style="width: 100%">
              <el-option label="东营区" value="东营区"></el-option>
              <el-option label="滨洲区" value="滨洲区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="msg.company" placeholder="请选择岗位" style="width: 100%">
              <el-option label="环卫工" value="环卫工"></el-option>
              <el-option label="洒水车司机" value="洒水车司机"></el-option>
              <el-option label="垃圾清扫车司机" value="垃圾清扫车司机"></el-option>
              <el-option label="主管" value="主管"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="msg.education" placeholder="请输入学历"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input v-model="msg.entryTime" placeholder="请输入入职时间"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="msg.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showedit = false">取消</el-button>
          <el-button type="primary" @click="showedit = false">提交</el-button>
        </span>
      </el-dialog>-->
    </div>

    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        stripe
        style="width: 100%"
        @row-click="showadd"
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
        pagesize: 14,
        currpage: 1,
        list: []
      },
      search: {
        name: "",
        area: "",
        param3: "",
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
    onSubmit() {},
    nextpage(value) {
      this.data.currpage = value;
    },
    showadd(row) {
      console.log(row);
    },
    getAddBook() {
      this.$http
        .get("userInformation/userInformationCriteriaQuery")
        .then(res => {
          this.data.list = res.data;
        });
    },
    serachAddBook() {
      this.$http
        .post(
          "userInformation/userInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          this.data.list = res.data;
        });
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
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding-top: 40px;
}
</style>
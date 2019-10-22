<template>
  <!-- 车辆信息管理 -->
  <div>
    <div class="search">
      <div class="searchbox">
        <span>岗位</span>
        <el-select v-model="search.type">
          <el-option label="全部岗位" value="全部岗位"></el-option>
          <el-option label="环卫工" value="环卫工"></el-option>
          <el-option label="洒水车司机" value="洒水车司机"></el-option>
          <el-option label="垃圾运输车司机" value="垃圾运输车司机"></el-option>
          <el-option label="主管" value="主管"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>作业区域</span>
        <el-select v-model="search.work">
          <el-option label="全部区域" value="全部区域"></el-option>
          <el-option label="东营区" value="东营区"></el-option>
          <el-option label="滨洲区" value="滨洲区"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        入职时间：
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>

      <el-button type="primary" class="btn">查询</el-button>
    </div>

    <div class="menu">
      <div class="filter">共126人在职，环卫工50人，扫水车司机12人，清扫车司机21人，垃圾运输车司机16人，其他27人</div>

      <div class="btn">
        <el-button icon="el-icon-plus" @click="showedit = true">新增职工</el-button>
      </div>

      <el-dialog title="员工编辑" width="450px" :visible.sync="showedit" @close="msg = {}">
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
      </el-dialog>
    </div>

    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        stripe
        style="width: 100%"
        @row-click="showadd"
      >
        <el-table-column align="center" prop="sid" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="phone" label="电话"></el-table-column>
        <el-table-column align="center" prop="company" label="单位"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="job" label="岗位"></el-table-column>
        <el-table-column align="center" prop="education" label="学历"></el-table-column>
        <el-table-column align="center" prop="entryTime" label="入职时间"></el-table-column>
        <el-table-column align="center" prop="age" label="年龄"></el-table-column>
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
        list: [
          {
            sid: 1,
            name: "李诞",
            phone: "15375669845",
            company: "环卫一部",
            area: "东营区",
            job: "环卫工",
            education: "初中",
            entryTime: "2019-10-20",
            age: "36"
          },
          {
            sid: 2,
            name: "张圆圆",
            phone: "15386966974",
            company: "环卫二部",
            area: "东营区",
            job: "扫水车司机",
            education: "大专",
            entryTime: "2019-09-15",
            age: "36"
          },
          {
            sid: 3,
            name: "刘波",
            phone: "15304937816",
            company: "环卫三部",
            area: "滨州区",
            job: "垃圾运输车司机",
            education: "高中",
            entryTime: "2019-08-02",
            age: "36"
          }
        ]
      },
      search: {
        type: "全部岗位",
        work: "全部区域",
        road: "全部",
        company: "全部"
      },
      showedit: false,
      insuranceList: [
        {
          carbrand: "鲁E-562E4",
          company: "太平洋保险",
          effectivedate: "2019-02-30",
          warningdate: "2020-10-15"
        },
        {
          carbrand: "鲁E-359Y5",
          company: "太平洋保险",
          effectivedate: "2018-05-10",
          warningdate: "2019-09-19"
        }
      ],
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
    }
  },
  created() {}
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
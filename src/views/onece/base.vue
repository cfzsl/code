<template>
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="姓名">
            <el-input class="searchInput" v-model="search.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="负责道路">
            <el-select v-model="search.param2">
              <el-option label="全部道路" value></el-option>
              <el-option label="庐山路" value="庐山路"></el-option>
              <el-option label="宁阳路" value="宁阳路"></el-option>
              <el-option label="新泰路" value="新泰路"></el-option>
              <el-option label="北一路" value="北一路"></el-option>
              <el-option label="北二路" value="北二路"></el-option>
              <el-option label="黄河路" value="黄河路"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业区域">
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
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="search.depart">
              <el-option label="全部部门" value></el-option>
              <el-option label="环卫一部" value="环卫一部"></el-option>
              <el-option label="环卫二部" value="环卫二部"></el-option>
              <el-option label="环卫三部" value="环卫三部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="searchBot" style="float: right;margin-bottom: 10px;">
      <el-button class="buttonBot" @click="dialogVisible = true">添加人员信息</el-button>
      <el-button class="buttonBot">导入模板下载</el-button>
      <el-button class="buttonBot" @click="dialogAble = true">人员信息导入</el-button>
      <el-button class="buttonBotLast">导出全员信息</el-button>
    </div>
    <!-- 弹窗1 -->
    <el-dialog title="添加人员信息" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
            <el-option label="A1" value></el-option>
            <el-option label="A2" value="A2"></el-option>
            <el-option label="B1" value="B1"></el-option>
            <el-option label="B2" value="B2"></el-option>
            <el-option label="C1" value="C1"></el-option>
            <el-option label="C2" value="C2"></el-option>
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
            <el-option label="在职" value></el-option>
            <el-option label="离职" value="离职"></el-option>
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
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class="selectTop">
            <el-option label="全部部门" value></el-option>
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
            <el-option label="环卫三部" value="环卫三部"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">保存</el-button>
      </span>
    </el-dialog>
    <!-- 弹窗2 -->
    <el-dialog title="导入人员信息" :visible.sync="dialogAble" width="426px" class="dialogText">
      <el-divider></el-divider>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">保存</el-button>
      </span>
    </el-dialog>

    <!-- 列表 -->
    <div id="table">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="sid" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="姓名"></el-table-column>
        <el-table-column align="center" prop="area" label="区域"></el-table-column>
        <el-table-column align="center" prop="param2" label="负责道路"></el-table-column>
        <el-table-column align="center" prop="depart" label="单位"></el-table-column>
        <el-table-column align="center" prop="hiretime" label="入职时间"></el-table-column>
        <el-table-column align="center" prop="leavetime" label="离职时间"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" label="是否超龄">
          <template slot-scope="scope">
            <!-- <span style="margin-left: 10px">{{ scope.row.isretired ? '否' : '是' }}</span> -->
            <span style="margin-left: 10px" v-if="scope.row.isretired == '0'">否</span>
            <span style="margin-left: 10px" v-else-if="scope.row.isretired == '1'">是</span>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="280px">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="button"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
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

      <!-- 弹框 -->
      <!-- 编辑 -->
      <el-dialog
        :title="text"
        :visible.sync="dialogFormVisible"
        width="426px"
        class="dialogText"
        @close="formInline = {}"
      >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formInline.sex" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formInline.age" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="formInline.idcard" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="准驾车型">
            <el-select v-model="type" class="selectTop">
              <el-option label="A1" value></el-option>
              <el-option label="A2" value="A2"></el-option>
              <el-option label="C1" value="C1"></el-option>
              <el-option label="C2" value="C2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="formInline.address" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="formInline.tel" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="state" class="selectTop">
              <el-option label="全部道路" value></el-option>
              <el-option label="庐山路" value="庐山路"></el-option>
              <el-option label="宁阳路" value="宁阳路"></el-option>
              <el-option label="新泰路" value="新泰路"></el-option>
              <el-option label="北一路" value="北一路"></el-option>
              <el-option label="北二路" value="北二路"></el-option>
              <el-option label="黄河路" value="黄河路"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input v-model="formInline.hiretime" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="离职时间">
            <el-input v-model="formInline.leavetime" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-select v-model="job" class="selectTop">
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
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="web" class="selectTop">
              <el-option label="全部部门" value></el-option>
              <el-option label="环卫一部" value="环卫一部"></el-option>
              <el-option label="环卫二部" value="环卫二部"></el-option>
              <el-option label="环卫三部" value="环卫三部"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="!buttonIf">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formInline.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="formInline.age"></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input v-model="formInline.idcard"></el-input>
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
        </el-form>-->
        <span slot="footer" class="delect-footer">
          <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
        </span>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button type="primary" v-if="buttonIf" @click="addDo" class="formButon">编辑</el-button>
          <el-button type="primary" v-else-if="!buttonIf" @click="adddate" class="formButon">保存</el-button>-->
          <el-button type="primary" @click="adddate" class="formButon">保存</el-button>
        </span>
      </el-dialog>

      <!-- 详情 -->
      <el-dialog
        :title="text"
        :visible.sync="detail"
        width="426px"
        class="dialogText"
        @close="formInline = {}"
      >
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input readonly v-model="formInline.name" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input readonly v-model="formInline.sex" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input readonly v-model="formInline.age" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input readonly v-model="formInline.idcard" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="准驾车型">
            <el-input readonly v-model="formInline.license" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input readonly v-model="formInline.address" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input readonly v-model="formInline.tel" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input readonly v-model="formInline.workstatus" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input readonly v-model="formInline.hiretime" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="离职时间">
            <el-input readonly v-model="formInline.leavetime" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-input readonly v-model="formInline.area" class="inputL"></el-input>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-input readonly v-model="formInline.depart"></el-input>
          </el-form-item>
        </el-form>
        <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline" v-if="!buttonIf">
          <el-form-item label="姓名">
            <el-input readonly v-model="formInline.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input readonly v-model="formInline.usg"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input readonly v-model="formInline.msg"></el-input>
          </el-form-item>
          <el-form-item label="证件号">
            <el-input readonly v-model="formInline.id"></el-input>
          </el-form-item>
          <el-form-item label="准驾车型">
            <el-select readonly v-model="type" class="selectTop">
              <el-option
                v-for="item in optionsType"
                :key="item.type"
                :label="item.label"
                :value="item.type"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住址">
            <el-input readonly v-model="formInline.address"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input readonly v-model="formInline.mobile"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select readonly v-model="state" class="selectTop">
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
            <el-select readonly v-model="web" class="selectTop">
              <el-option
                v-for="item in optionsWeb"
                :key="item.web"
                :label="item.label"
                :value="item.web"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>-->
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      dialogVisible: false,
      dialogAble: false,
      lu: "",
      value: "",
      web: "",
      job: "",
      id: "",
      web: "",
      type: "",
      state: "",
      value: "",
      text: "人员信息详情",
      buttonIf: true,
      detail: false,
      job: "",
      id: "",
      web: "",
      type: "",
      state: "",
      pagesize: 10,
      currpage: 1,
      listIndex: null,
      tableData: [],
      dialogFormVisible: false,
      formInline: {},
      search: {
        name: "",
        param2: "",
        area: "",
        depart: ""
      },
      data: {
        pagesize: 13,
        currpage: 1,
        list: []
      }
    };
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
    showdetail(row, _index) {
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.detail = !this.detail;
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
    },
    getAddBook() {
      this.$http
        .get("userInformation/userInformationCriteriaQuery")
        .then(res => {
          this.data.list = res.data;
        });
    },
    onSubmit() {
      this.$http
        .post(
          "userInformation/userInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          this.tableData = res.data;
        });
    },
    nextpage(value) {
      this.data.currpage = value;
    }
  },
  created() {
    this.getAddBook();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
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
      padding: 0 !important;
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
  margin-right: 25px;
  padding-top: 20px;
}

.delect-footer {
  float: left;
  margin-left: 10px;
}
</style>

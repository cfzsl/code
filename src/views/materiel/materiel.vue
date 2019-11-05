<template>
  <!-- 物料采购管理 -->
  <div id="materiel">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="物料名称">
            <el-input v-model="search.content"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="search.app" placeholder="请选择">
              <el-option v-for="item in approval" :key="item.e" :label="item.app" :value="item.app"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购状态">
            <el-select v-model="search.purch" placeholder="请选择">
              <el-option
                v-for="item in purchase"
                :key="item.i"
                :label="item.purch"
                :value="item.purch"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期" class="msgWc">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onEmpty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新建物料申请 -->
      <div class="searchBot">
        <el-button class="buttonBot" type="primary" @click="dialogVisible=true">新建物料申请</el-button>
      </div>
      <!-- 弹窗 -->
      <el-dialog title="新建物料采购申请" :visible.sync="dialogVisible" width="705px" class="dialogText">
        <el-form
          :inline="true"
          :model="formAdd"
          ref="formAdd"
          :rules="rulesAdd"
          class="demo-form-inline"
        >
          <el-divider></el-divider>
          <el-form-item label="申请人:" prop="name">
            <el-input v-model="formAdd.name"></el-input>
          </el-form-item>
          <el-form-item label="岗位:" style="margin-left:105px" prop="job">
            <el-input v-model="formAdd.job"></el-input>
          </el-form-item>
          <el-form-item label="需采购材料:" prop="science">
            <el-input v-model="formAdd.science"></el-input>
          </el-form-item>
          <el-form-item label="数量:" style="margin-left:105px" prop="number">
            <el-input v-model="formAdd.number" style="width:100px"></el-input>
            <el-select v-model="formAdd.pany" placeholder="请选择" style="width:100px">
              <el-option label="个" value></el-option>
              <el-option
                v-for="item in company"
                :key="item.c"
                :label="item.pany"
                :value="item.pany"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格:" prop="specifications">
            <el-input v-model="formAdd.specifications" style="width:558px"></el-input>
          </el-form-item>
          <el-form-item label="用途:" prop="purpose">
            <el-input v-model="formAdd.purpose" style="width:558px"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="remarks">
            <el-input v-model="formAdd.remarks" style="width:558px" type="textarea" row="2"></el-input>
          </el-form-item>
          <el-form-item label="采购负责人:" prop="purchase">
            <el-input v-model="formAdd.purchase"></el-input>
          </el-form-item>
          <el-form-item label="分配负责人:" prop="distribution" style="margin-left:60px">
            <el-input v-model="formAdd.distribution"></el-input>
          </el-form-item>
          <el-divider></el-divider>
        </el-form>
        <div class="examine">审核流程</div>
        <el-steps :active="formAdd.active" :space="200" align-center>
          <el-step title="申请人" icon="el-icon-user"></el-step>
          <el-step title="主任" icon="el-icon-user"></el-step>
          <el-step title="经理" icon="el-icon-user"></el-step>
        </el-steps>
        <div class="buttonOff">
          <span slot="footer">
            <el-button type="primary" @click="resetForm('formAdd')">取消</el-button>
          </span>
          <span slot="footer">
            <el-button type="primary" @click="addCar('formAdd')">提交</el-button>
          </span>
        </div>
      </el-dialog>
    </div>
    <!-- 表格 -->
    <el-table
      :data="wcList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="name" label="申请人"></el-table-column>
      <el-table-column align="center" prop="tel" label="物料名称"></el-table-column>
      <el-table-column align="center" prop="number" label="数量"></el-table-column>
      <el-table-column align="center" prop="date" label="申请日期"></el-table-column>
      <el-table-column align="center" prop="job" label="审批状态"></el-table-column>
      <el-table-column align="center" prop="state" label="采购状态"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showdetail(scope.row, scope.$index)">详情</el-button>
          <el-button
            v-show="scope.row.job==='未审批'"
            type="primary"
            @click="Approval(scope.row, scope.$index)"
            size="small"
          >审批</el-button>
          <el-button
            v-show="scope.row.state==='未采购'"
            type="primary"
            @click="Purchase(scope.row, scope.$index)"
            size="small"
          >采购</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      @prev-click="nextpage"
      @next-click="nextpage"
      @current-change="nextpage"
      :page-sizes="[5,10]"
      :page-size="pagesize"
      :current-page="currpage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="wcList.length"
    ></el-pagination>

    <!-- 详情弹框 -->
    <el-dialog title="物料采购详情" :visible.sync="dialogForm" width="717px" class="dialogText">
      <el-form :inline="true" :model="loginList" class="demo-form-inline">
        <el-divider></el-divider>
        <div class="progress">
          采购完成
          <br />已分配
        </div>
        <div class="formNumber">
          <el-form-item label="申请人:">
            <div>{{loginList.name}}</div>
          </el-form-item>
          <el-form-item label="岗位:" style="margin-left:345px">
            <div>{{loginList.job}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="需采购材料:">
            <div>{{loginList.tel}}</div>
          </el-form-item>
          <el-form-item label="数量:" style="margin-left:275px">
            <div>{{loginList.number}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格:">
            <div style="width:558px">{{loginList.specifications}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="用途:">
            <div style="width:558px">{{loginList.purpose}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <div style="width:558px">{{loginList.remarks}}</div>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <div class="examine">审核流程</div>
        <el-steps :active="active" :space="200" align-center>
          <el-step title="申请人" icon="el-icon-user" description="2019-11-05 18：00提交申请"></el-step>
          <el-step title="主任" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
          <el-step title="经理" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
        </el-steps>
        <el-divider></el-divider>
        <div class="examine">采购详情</div>
        <div class="formNumber">
          <el-form-item label="采购负责人:">
            <div>{{loginList.purchase}}</div>
          </el-form-item>
          <el-form-item style="margin-left:345px" label="采购时间:">
            <div>{{loginList.distribution}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购数量:">
            <div>{{loginList.purchase}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购规格:">
            <div>{{loginList.purchase}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="分配负责人:">
            <div>{{loginList.distribution}}</div>
          </el-form-item>
          <el-form-item style="margin-left:345px" label="分配时间:">
            <div>{{loginList.distribution}}</div>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

    <!-- 审批弹框 -->
    <el-dialog title="审批" :visible.sync="ApprovalForm" width="717px" class="dialogText">
      <el-form :inline="true" :model="loginList" class="demo-form-inline">
        <el-divider></el-divider>
        <div class="progress">待审批</div>
        <div class="formNumber">
          <el-form-item label="申请人:">
            <div>{{loginList.name}}</div>
          </el-form-item>
          <el-form-item label="岗位:" style="margin-left:345px">
            <div>{{loginList.job}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="需采购材料:">
            <div>{{loginList.tel}}</div>
          </el-form-item>
          <el-form-item label="数量:" style="margin-left:275px">
            <div>{{loginList.number}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格:">
            <div style="width:558px">{{loginList.specifications}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="用途:">
            <div style="width:558px">{{loginList.purpose}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <div style="width:558px">{{loginList.remarks}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购负责人:">
            <div>{{loginList.name}}</div>
          </el-form-item>
          <el-form-item label="分配负责人:" style="margin-left:345px">
            <div>{{loginList.job}}</div>
          </el-form-item>
        </div>
      </el-form>
      <el-divider></el-divider>
      <div class="examine">审核流程</div>
      <el-steps :active="active" :space="200" align-center>
        <el-step title="申请人" icon="el-icon-user" description="2019-11-05 18：00提交申请"></el-step>
        <el-step title="您" icon="el-icon-user" description="待申批"></el-step>
        <el-step title="经理" icon="el-icon-user" description="待申批"></el-step>
      </el-steps>
      <div class="buttonOff">
        <span slot="footer">
          <el-button type="info" @click="Reject">驳回</el-button>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="Agree">同意</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 采购弹窗 -->
    <el-dialog title="物料采购" :visible.sync="PurchaseForm" width="717px" class="dialogText">
      <el-form :inline="true" :model="loginList" class="demo-form-inline">
        <el-divider></el-divider>
        <div class="progress">
          采购完成
          <br />已分配
        </div>
        <div class="formNumber">
          <el-form-item label="申请人:">
            <div>{{loginList.name}}</div>
          </el-form-item>
          <el-form-item label="岗位:" style="margin-left:345px">
            <div>{{loginList.job}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="需采购材料:">
            <div>{{loginList.tel}}</div>
          </el-form-item>
          <el-form-item label="数量:" style="margin-left:275px">
            <div>{{loginList.number}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格:">
            <div style="width:558px">{{loginList.specifications}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="用途:">
            <div style="width:558px">{{loginList.purpose}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <div style="width:558px">{{loginList.remarks}}</div>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购负责人:">
            <div>{{loginList.name}}</div>
          </el-form-item>
          <el-form-item label="分配负责人:" style="margin-left:345px">
            <div>{{loginList.job}}</div>
          </el-form-item>
        </div>
      </el-form>
      <el-divider></el-divider>
      <div class="examine">审核流程</div>
      <el-steps :active="active" :space="200" align-center>
        <el-step title="申请人" icon="el-icon-user" description="2019-11-05 18：00提交申请"></el-step>
        <el-step title="您" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
        <el-step title="经理" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
      </el-steps>
      <div class="buttonOff">
        <span slot="footer">
          <el-button type="info" @click="Reject">取消</el-button>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="Agree">提交</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      search: {
        content: "",
        app: "",
        purch: "",
        date: ""
      },
      PurchaseForm: false,
      ApprovalForm: false,
      dialogForm: false,
      dialogVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      e: "0",
      approval: [
        {
          e: "0",
          app: "全部"
        },
        {
          e: "1",
          app: "待审批"
        },
        {
          e: "2",
          app: "已审批"
        },
        {
          e: "3",
          app: "被驳回"
        }
      ],
      i: "0",
      purchase: [
        {
          i: "0",
          purch: "全部"
        },
        {
          i: "1",
          purch: "—— ——"
        },
        {
          i: "2",
          purch: "等待采购"
        },
        {
          i: "3",
          purch: "采购中"
        },
        {
          i: "4",
          purch: "采购完成，未分配"
        },
        {
          i: "5",
          purch: "采购完成，已分配"
        }
      ],
      c: "0",
      company: [
        {
          c: "1",
          pany: "辆"
        },
        {
          c: "2",
          pany: "只"
        },
        {
          c: "3",
          pany: "套"
        },
        {
          c: "4",
          pany: "件"
        },
        {
          c: "5",
          pany: "支"
        },
        {
          c: "6",
          pany: "其他"
        }
      ],
      formAdd: {
        name: "",
        job: "",
        science: "",
        number: "",
        pany: "",
        specifications: "",
        purpose: "",
        distribution: ""
      },
      rulesAdd: {},
      wcList: [
        {
          name: "赵日天",
          tel: "办公室打印纸",
          number: "80份",
          date: "2019-11-05",
          job: "未审批",
          state: "—— ——"
        },
        {
          name: "李二狗",
          tel: "车载定位设备",
          number: "80份",
          date: "2019-11-05",
          job: "已审批",
          state: "未采购"
        }
      ],
      active: 0,
      listIndex: "",
      loginList: {}
    };
  },
  methods: {
    //   驳回
    Reject() {
      this.active = 0;
      this.loginList.app = "被驳回";
    },
    // 同意
    Agree() {
      this.active = 2;
      this.loginList.job = "已审批";
      this.loginList.state = "未采购";
      this.ApprovalForm = false;
    },
    // 采购
    Purchase(row, _index) {
      this.active = 3;
      this.PurchaseForm = true;
    },
    // 审批
    Approval(row, _index) {
      this.active = 1;
      this.ApprovalForm = true;
      this.loginList = row;
      this.listIndex = _index;
    },
    // 详情
    showdetail(row, _index) {
      // console.log(row);
      this.active = 3;
      this.loginList = row;
      //记录索引
      this.listIndex = _index;
      //显示弹窗
      this.dialogForm = true;
    },
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    // 查询
    onSubmit() {},
    // 清空
    onEmpty() {
      this.search = {
        content: "",
        app: "",
        purch: "",
        date: ""
      };
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加人事信息
    addCar(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.dialogVisible = false;
          //   this.$http
          //     .post("hr/hrinfo/add", this.$qs.stringify(this.formAdd))
          //     .then(res => {
          //       this.$http.post("hr/hrinfo/search").then(res => {
          //         this.wcList = res.data;
          //       });
          //     });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.dialogText {
  .demo-form-inline {
    text-align: right;
    position: relative;
    .progress {
      position: absolute;
      right: 0;
      top: 0;
      width: 70px;
      height: 48px;
      border: 1px solid green;
      text-align: center;
      // line-height: 48px;
    }
  }
  .formNumber {
    text-align: left;
    margin-left: 40px;
    height: 30px;
  }
  .el-dialog__body {
    text-align: right !important;
  }
  .el-divider {
    margin-bottom: 10px;
  }
  .examine {
    font-size: 14px;
    font-weight: 700;
    margin-left: 20px;
    text-align: left;
  }
  .buttonOff {
    text-align: center;
  }
}
.paginationList {
  text-align: center;
}
</style>
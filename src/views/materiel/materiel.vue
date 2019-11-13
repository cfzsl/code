<template>
  <!-- 物料采购管理 -->
  <div id="materiel">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="物料名称">
            <el-input v-model="search.materielname"></el-input>
          </el-form-item>
          <el-form-item label="审批状态">
            <el-select v-model="search.applicantstatus" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in approval"
                :key="item.e"
                :label="item.applicantstatus"
                :value="item.applicantstatus"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购状态">
            <el-select v-model="search.buystatus" placeholder="请选择">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in purchase"
                :key="item.i"
                :label="item.buystatus"
                :value="item.buystatus"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请日期" class="msgWc">
            <el-date-picker
              v-model="search.searchtime"
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
          ref="ruleForm"
          :rules="rulesAdd"
          class="demo-form-inline"
        >
          <el-divider></el-divider>
          <el-form-item label="申请人:" prop="applicantperson">
            <el-input v-model="formAdd.applicantperson" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="申请单位:" style="margin-left:65px" prop="applicantdepart">
            <el-select v-model="formAdd.applicantdepart" style="width:200px">
              <el-option label="全部" value></el-option>
              <el-option v-for="(item,index) in DropBox" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审批负责人:" prop="param2">
            <el-input v-model="formAdd.param2" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="采购负责人:" style="margin-left:50px" prop="param3">
            <el-input v-model="formAdd.param3"></el-input>
          </el-form-item>
          <el-form-item label="物料名称:" prop="materielname">
            <el-input v-model="formAdd.materielname" style="width:558px"></el-input>
          </el-form-item>
          <el-form-item label="规格及型号:" prop="materieltype">
            <el-input v-model="formAdd.materieltype" style="width:558px"></el-input>
          </el-form-item>
          <el-form-item label="单位:" prop="materielattr">
            <el-select v-model="formAdd.materielattr" placeholder="请选择" style="width:200px">
              <el-option label="个" value></el-option>
              <el-option
                v-for="item in company"
                :key="item.c"
                :label="item.materielattr"
                :value="item.materielattr"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价:" style="margin-left:95px" prop="materielonecost">
            <el-input v-model="formAdd.materielonecost"></el-input>
          </el-form-item>
          <el-form-item label="数量:" prop="materielcount">
            <el-input style="width:200px" v-model="formAdd.materielcount"></el-input>
          </el-form-item>
          <el-form-item label="金额:" style="margin-left:95px" prop="materielmoney">
            <el-input v-model="formAdd.materielmoney"></el-input>
          </el-form-item>
          <el-form-item label="项目:" prop="purpose">
            <el-input v-model="formAdd.purpose" style="width:558px"></el-input>
          </el-form-item>
          <el-form-item label="备注:" prop="buydesc">
            <el-input v-model="formAdd.buydesc" style="width:558px" type="textarea" row="2"></el-input>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div class="examine">物料采购流程</div>
        <el-steps :active="formAdd.active" :space="200" align-center>
          <el-step title="项目经理/助理" icon="el-icon-user" description="提交申请"></el-step>
          <el-step title="鲁彧" icon="el-icon-user" description="一级审批"></el-step>
          <el-step title="曲韦名" icon="el-icon-user" description="二级审批人"></el-step>
          <el-step title="王卫叶" icon="el-icon-user" description="采购发放人"></el-step>
        </el-steps>
        <div class="buttonOff">
          <span slot="footer">
            <el-button type="primary" @click="resetForm('ruleForm')">取消</el-button>
          </span>
          <span slot="footer">
            <el-button type="primary" @click="addCar('ruleForm')">提交</el-button>
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
      <el-table-column align="center" prop="applicantperson" label="申请人"></el-table-column>
      <el-table-column align="center" prop="applicantdepart" label="申请单位"></el-table-column>
      <el-table-column align="center" prop="materielname" label="物料名称"></el-table-column>
      <el-table-column align="center" prop="materieltype" label="规格及型号"></el-table-column>
      <el-table-column align="center" prop="materielattr" label="单位"></el-table-column>
      <el-table-column align="center" prop="materielonecost" label="单价"></el-table-column>
      <el-table-column align="center" prop="materielcount" label="数量"></el-table-column>
      <el-table-column align="center" prop="materielmoney" label="金额"></el-table-column>
      <el-table-column align="center" prop="applicantdate" label="申请日期"></el-table-column>
      <el-table-column align="center" prop="applicantstatus" label="审批状态"></el-table-column>
      <el-table-column align="center" prop="buystatus" label="采购状态"></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showdetail(scope.row, scope.$index)">详情</el-button>
          <el-button
            v-show="scope.row.applicantstatus==='待审批'"
            type="primary"
            @click="Approval(scope.row, scope.$index)"
            size="small"
          >审批</el-button>
          <el-button
            v-show="scope.row.buystatus==='待发放'"
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
            <span>{{loginList.applicantperson}}</span>
          </el-form-item>
          <el-form-item label="申请单位:" style="margin-left:280px">
            <span>{{loginList.applicantdepart}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="审批负责人:">
            <span>{{loginList.param2}}</span>
          </el-form-item>
          <el-form-item label="采购负责人:" style="margin-left:280px">
            <span>{{loginList.param3}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="材料名称:">
            <span style="width:558px">{{loginList.materielname}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格及型号:">
            <span style="width:558px">{{loginList.materieltype}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="单位:">
            <span>{{loginList.materielattr}}</span>
          </el-form-item>
          <el-form-item label="单价:" style="margin-left:275px">
            <span>{{loginList.materielonecost}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="数量:">
            <span>{{loginList.materielcount}}</span>
          </el-form-item>
          <el-form-item label="金额:" style="margin-left:275px">
            <span>{{loginList.materielmoney}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="项目:">
            <span style="width:558px">{{loginList.purpose}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <span style="width:558px">{{loginList.buydesc}}</span>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <div class="examine">审核流程</div>
        <el-steps :active="loginList.active" :space="200" align-center>
          <el-step
            :title="loginList.applicantperson"
            icon="el-icon-user"
            description="2019-11-05 18：00提交申请"
          ></el-step>
          <el-step :title="loginList.param2" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
          <el-step :title="loginList.param4" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
          <el-step
            :title="loginList.param3"
            icon="el-icon-user"
            description="2019-11-05 18：00已采购发放"
          ></el-step>
        </el-steps>
        <!-- <el-divider></el-divider> -->
        <!-- <div class="examine">采购详情</div>
        <div class="formNumber">
          <el-form-item label="采购负责人:">
            <span>{{loginList.purchase}}</span>
          </el-form-item>
          <el-form-item style="margin-left:345px" label="采购时间:">
            <span>{{loginList.distribution}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购数量:">
            <span>{{loginList.purchase}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="采购规格:">
            <span>{{loginList.purchase}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="分配负责人:">
            <span>{{loginList.distribution}}</span>
          </el-form-item>
          <el-form-item style="margin-left:345px" label="分配时间:">
            <span>{{loginList.distribution}}</span>
          </el-form-item>
        </div>-->
      </el-form>
    </el-dialog>

    <!-- 审批弹框 -->
    <el-dialog title="审批" :visible.sync="ApprovalForm" width="717px" class="dialogText">
      <el-form :inline="true" :model="loginList" class="demo-form-inline">
        <el-divider></el-divider>
        <div class="progress">待审批</div>
        <div class="formNumber">
          <el-form-item label="申请人:">
            <span>{{loginList.applicantperson}}</span>
          </el-form-item>
          <el-form-item label="申请部门:" style="margin-left:300px">
            <span>{{loginList.applicantdepart}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="审批负责人:">
            <span>{{loginList.param2}}</span>
          </el-form-item>
          <el-form-item label="采购负责人:" style="margin-left:260px">
            <span>{{loginList.param3}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="物料名称:">
            <span style="width:558px">{{loginList.materielname}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格及型号:">
            <span style="width:558px">{{loginList.materieltype}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="单位:">
            <span>{{loginList.materielattr}}</span>
          </el-form-item>
          <el-form-item label="单价:" style="margin-left:380px">
            <span>{{loginList.materielonecost}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="数量:">
            <span>{{loginList.materielcount}}</span>
          </el-form-item>
          <el-form-item label="金额:" style="margin-left:370px">
            <span>{{loginList.materielmoney}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="费用项目:">
            <span style="width:558px">{{loginList.item}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <span style="width:558px">{{loginList.buydesc}}</span>
          </el-form-item>
        </div>
      </el-form>
      <el-divider></el-divider>
      <div class="examine">物料采购审批流程：</div>
      <el-steps :active="loginList.active" :space="200" align-center>
        <el-step
          :title="loginList.applicantperson"
          icon="el-icon-user"
          description="2019-11-05 18：00提交申请"
        ></el-step>
        <el-step :title="loginList.param2" icon="el-icon-user" description="待申批"></el-step>
        <el-step :title="loginList.param4" icon="el-icon-user" description="待申批"></el-step>
        <el-step :title="loginList.param3" icon="el-icon-user" description="采购发放人"></el-step>
      </el-steps>
      <div class="buttonOff">
        <span slot="footer">
          <el-button type="info" @click="RejectOne(loginList)">驳回</el-button>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="AgreeOne(loginList)">同意</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 采购弹窗 -->
    <el-dialog title="物料采购" :visible.sync="PurchaseForm" width="717px" class="dialogText">
      <el-form :inline="true" :model="loginList" class="demo-form-inline">
        <el-divider></el-divider>
        <div class="progress">
          审批完成
          <br />待发放
        </div>
        <div class="formNumber">
          <el-form-item label="申请人:">
            <span>{{loginList.applicantperson}}</span>
          </el-form-item>
          <el-form-item label="申请部门:" style="margin-left:300px">
            <span>{{loginList.applicantdepart}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="审批负责人:">
            <span>{{loginList.preshen}}</span>
          </el-form-item>
          <el-form-item label="采购负责人:" style="margin-left:280px">
            <span>{{loginList.buyperson}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="物料名称:">
            <span style="width:558px">{{loginList.materielname}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="规格及型号:">
            <span style="width:558px">{{loginList.materieltype}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="单位:">
            <span>{{loginList.materielattr}}</span>
          </el-form-item>
          <el-form-item label="单价:" style="margin-left:380px">
            <span>{{loginList.materielonecost}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="数量:">
            <span>{{loginList.materielcount}}</span>
          </el-form-item>
          <el-form-item label="金额:" style="margin-left:370px">
            <span>{{loginList.materielmoney}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="项目:">
            <span style="width:558px">{{loginList.item}}</span>
          </el-form-item>
        </div>
        <div class="formNumber">
          <el-form-item label="备注:">
            <span style="width:558px">{{loginList.buydesc}}</span>
          </el-form-item>
        </div>
        <el-divider></el-divider>
        <div class="examine">采购详情</div>
        <el-form-item label="选择供应商:" prop="remarks">
          <el-select v-model="formAdd.shop" placeholder="请选择" style="width:558px">
            <el-option label="全部" value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="formAdd.shopdesc" style="width:558px"></el-input>
        </el-form-item>
        <el-divider></el-divider>
      </el-form>
      <div class="examine">审核流程</div>
      <el-steps :active="loginList.active" :space="200" align-center>
        <el-step
          :title="loginList.applicantperson"
          icon="el-icon-user"
          description="2019-11-05 18：00提交申请"
        ></el-step>
        <el-step :title="loginList.param2" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
        <el-step :title="loginList.param4" icon="el-icon-user" description="2019-11-05 18：00已申批"></el-step>
        <el-step :title="loginList.param3" icon="el-icon-user" description="2019-11-05 18：00已采购发放"></el-step>
      </el-steps>
      <div class="buttonOff">
        <span slot="footer">
          <el-button type="info" @click="Reject">取消</el-button>
        </span>
        <span slot="footer">
          <el-button type="primary" @click="Agree(loginList)">提交</el-button>
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
        materielname: "",
        applicantstatus: "",
        buystatus: "",
        searchtime: ""
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
          e: "1",
          applicantstatus: "待审批"
        },
        {
          e: "2",
          applicantstatus: "已审批"
        },
        {
          e: "3",
          applicantstatus: "被驳回"
        }
      ],
      i: "0",
      purchase: [
        {
          i: "1",
          buystatus: "—— ——"
        },
        {
          i: "2",
          buystatus: "等待采购"
        },
        {
          i: "3",
          buystatus: "采购中"
        },
        {
          i: "4",
          buystatus: "采购完成，未分配"
        },
        {
          i: "5",
          buystatus: "采购完成，已分配"
        }
      ],
      c: "0",
      company: [
        {
          c: "1",
          materielattr: "辆"
        },
        {
          c: "2",
          materielattr: "只"
        },
        {
          c: "3",
          materielattr: "套"
        },
        {
          c: "4",
          materielattr: "件"
        },
        {
          c: "5",
          materielattr: "支"
        },
        {
          c: "6",
          materielattr: "其他"
        }
      ],
      formAdd: {
        applicantperson: "",
        applicantdepart: "",
        param2: "",
        param3: "",
        materieltype: "",
        materielattr: "",
        materielonecost: "",
        materielcount: "",
        materielmoney: "",
        purpose: "",
        buydesc: ""
      },
      rulesAdd: {
        applicantperson: [
          { required: true, message: "请输入申请人", trigger: "blur" }
        ],
        applicantdepart: [
          { required: true, message: "请选择申请单位", trigger: "change" }
        ],
        param2: [
          { required: true, message: "请输入部门审批负责人", trigger: "change" }
        ],
        param3: [
          { required: true, message: "请输入部门采购负责人", trigger: "change" }
        ],
        materielname: [
          { required: true, message: "请输入材料名称", trigger: "blur" }
        ],
        materieltype: [
          { required: true, message: "请输入规格及型号", trigger: "blur" }
        ],
        materielattr: [
          { required: true, message: "请选择单位", trigger: "change" }
        ],
        materielonecost: [
          { required: true, message: "请输入单价", trigger: "blur" }
        ],
        materielcount: [
          { required: true, message: "请输入数量", trigger: "blur" }
        ],
        materielmoney: [
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        purpose: [{ required: true, message: "请输入项目", trigger: "blur" }],
        buydesc: [{ required: true, message: "请输入备注", trigger: "blur" }]
      },
      wcList: [],
      active: 0,
      listIndex: "",
      loginList: {},
      DropBox: []
    };
  },
  created() {
    this.getWcList();
    this.getChangeProgress();
  },
  methods: {
    // 单位列表
    getChangeProgress() {
      this.$http.post("materiel/departDropBox").then(res => {
        console.log(res.data);
        this.DropBox = res.data;
      });
    },
    // 获取列表
    getWcList() {
      this.$http
        .post("materiel/search", this.$qs.stringify(this.search))
        .then(res => {
          console.log(res.data);
          this.wcList = res.data;
        });
    },
    //审批
    AgreeOne(rov) {
      let _date = {
        sid: rov.sid
      };
      console.log(_date);
      this.$http
        .post("materiel/changeProgress", this.$qs.stringify(_date))
        .then(res => {
          console.log("请求成功");
          this.ApprovalForm = false;
          rov.active = res.data.active;
          this.getWcList();
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 驳回
    RejectOne(rov) {
      let _date = {
        sid: rov.sid,
        active: 0
      };
      this.$http
        .post("materiel/changeProgress", this.$qs.stringify(_date))
        .then(res => {
          console.log("请求成功");
          this.ApprovalForm = false;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 采购
    Purchase(row, _index) {
      this.PurchaseForm = true;
      this.loginList = row;
      this.listIndex = _index;
    },
    //取消
    Reject() {},
    //提交
    Agree(rov) {
      let _date = {
        sid: rov.sid,
      };
      this.$http
        .post("materiel/changeProgress", this.$qs.stringify(_date))
        .then(res => {
          console.log("请求成功");
          this.getWcList();
          this.PurchaseForm = false;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 审批
    Approval(row, _index) {
      this.ApprovalForm = true;
      this.loginList = row;
      this.listIndex = _index;
    },
    // 详情
    showdetail(row, _index) {
      // console.log(row);
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
    onSubmit() {
      console.log(this.search);
      this.getWcList();
    },
    // 清空
    onEmpty() {
      this.search = {
        materielname: "",
        applicantstatus: "",
        buystatus: "",
        searchtime: ""
      };
      this.getWcList();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加物料申请
    addCar(formName) {
      // console.log(this.formAdd);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogVisible = false;
          this.$http
            .post("materiel/add", this.$qs.stringify(this.formAdd))
            .then(res => {
              this.getWcList();
            });
        } else {
          console.log("添加失败");
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
    margin-left: 10px;
    margin-bottom: 10px;
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
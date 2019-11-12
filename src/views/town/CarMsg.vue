<template>
  <!-- 三轮车信息 -->
  <div id="carmsg">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchbox">
        <span>车牌号鲁E-</span>
        <el-input v-model="search.member" placeholder="请输入车牌号" maxlength="5" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>使用人</span>
        <el-input v-model="search.user" placeholder="请输入使用人" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>所属单位</span>
        <el-select v-model="search.department">
          <el-option label="全部" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
          <el-option label="环卫四部" value="环卫四部"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="btn" @click="getlist">查询</el-button>
      <el-button type="primary" @click="onEmpty">清空</el-button>
    </div>

    <!-- 导出按钮 -->
    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus" @click="dialogVisible = true">添加车辆信息</el-button>
        <el-button icon="el-icon-download" @click="exportmsg">车辆信息导出</el-button>
        <el-button icon="el-icon-download">导入模板下载</el-button>
        <el-upload
          class="upload-demo"
          :action="$http.defaults.baseURL +  'sanitation/car/importExcel'"
          :on-success="success"
          :show-file-list="false"
          :limit="1"
          style="float: right;"
        >
          <el-button icon="el-icon-upload2">车辆信息导入</el-button>
        </el-upload>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="member" label="车牌号"></el-table-column>
      <el-table-column align="center" prop="shoppingtime" label="购车时间"></el-table-column>
      <el-table-column align="center" prop="parm3" label="资产编号"></el-table-column>
      <el-table-column align="center" prop="department" label="归属单位"></el-table-column>
      <el-table-column align="center" prop="user" label="使用人"></el-table-column>
      <el-table-column align="center" prop="information" label="联系方式"></el-table-column>
      <el-table-column align="center" label="交接记录">
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="primary"
            size="small"
            @click="showhandover(scope.row, scope.$index)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电池更换记录">
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="primary"
            size="small"
            @click="showBattery(scope.row, scope.$index)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="维修记录">
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="primary"
            size="small"
            @click="showService(scope.row, scope.$index)"
          >详情</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="primary"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >编辑</el-button>
          <el-button
            class="tableButton2"
            type="danger"
            @click="deletList(scope.row, scope.$index)"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      :current-page="data.currpage"
      :page-size="data.pagesize"
      @prev-click="nextpage"
      @next-click="nextpage"
      @current-change="nextpage"
      @size-change="sizeChange"
      :page-sizes="[15, 20, 25]"
      layout="total, sizes, prev, pager, next"
      :total="data.list.length"
    ></el-pagination>

    <!-- 添加车辆信息 -->
    <el-dialog title="添加车辆信息" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form
        :inline="true"
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="车牌号" prop="member">
          <el-input v-model="ruleForm.member"></el-input>
        </el-form-item>
        <el-form-item label="购车时间" prop="shoppingtime">
          <el-date-picker
            v-model="ruleForm.shoppingtime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="资产编号" prop="parm2">
          <el-input v-model="ruleForm.parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位" prop="department">
          <el-select v-model="ruleForm.department" class="selectTop">
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
            <el-option label="环卫三部" value="环卫三部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机" prop="user">
          <el-input v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="information">
          <el-input v-model="ruleForm.information"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="resetForm('ruleForm')" class="formButon">重置</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCar('ruleForm')" class="formButon">添加</el-button>
      </span>
    </el-dialog>

    <!-- 编辑车辆信息 -->
    <el-dialog title="车辆编辑" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form
        :inline="true"
        :model="details"
        ref="ruleDetails"
        :rules="detail"
        class="demo-form-inline"
      >
        <el-form-item label="车牌号" prop="member">
          <el-input v-model="details.member"></el-input>
        </el-form-item>
        <el-form-item label="购车时间" prop="shoppingtime">
          <el-input v-model="details.shoppingtime"></el-input>
        </el-form-item>
        <el-form-item label="资产编号" prop="parm2">
          <el-input v-model="details.parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位" prop="department">
          <el-select v-model="details.department" class="selectTop">
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
            <el-option label="环卫三部" value="环卫三部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人" prop="user">
          <el-input v-model="details.user"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="information">
          <el-input v-model="details.information"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adddate('ruleDetails')" class="formButon">保存</el-button>
      </span>
    </el-dialog>

    <!-- 交接记录 -->
    <el-dialog title="交接记录" :visible.sync="handover.show">
      <el-form
        ref="handoverForm"
        label-position="right"
        label-width="100px"
        :rules="handoverRules"
        :model="handover.addmsg"
      >
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="日期" prop="connecttime">
                <el-date-picker
                  style="width:150px"
                  v-model="handover.addmsg.connecttime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="上一使用人" prop="user1">
                <el-input v-model="handover.addmsg.user1" style="width:150px"></el-input>
              </el-form-item>
              <el-form-item label="下一使用人" prop="user2">
                <el-input v-model="handover.addmsg.user2" style="width:150px"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="grid-content">
              <el-form-item label="备注" prop="param1">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="handover.addmsg.param1"
                  :autosize="{ minRows: 7, maxRows: 4}"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="grid-content bg-purple">
              <el-button type="primary" style="width: 90%" @click="addhandover">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-table
        :data="handover.list.slice((handover.currpage - 1) * handover.pagesize, handover.currpage * handover.pagesize)"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="connecttime" label="日期"></el-table-column>
        <el-table-column align="center" prop="user1" label="上一使用人"></el-table-column>
        <el-table-column align="center" prop="user2" label="下一使用人"></el-table-column>
        <el-table-column align="center" prop="param1" label="备注"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="paginationList"
        background
        :current-page="handover.currpage"
        :page-size="handover.pagesize"
        @prev-click="handovernextpage"
        @next-click="handovernextpage"
        @current-change="handovernextpage"
        layout="total, prev, pager, next"
        :total="handover.list.length"
      ></el-pagination>
    </el-dialog>

    <!-- 更换记录 -->
    <el-dialog title="电池更换记录" :visible.sync="battery.show">
      <div class="title">
        <el-form
          ref="batteryForm"
          label-position="right"
          label-width="100px"
          :rules="batteryRules"
          :model="battery.addmsg"
        >
          <el-form-item label="日期" prop="repairbattrytime">
            <el-date-picker
              style="width: 200px"
              v-model="battery.addmsg.repairbattrytime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="更换原因" prop="repairbattryreason">
            <el-input
              style="width: 200px"
              v-model="battery.addmsg.repairbattryreason"
              placeholder="请输入更换原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="更换详情" prop="repairbattrydetail">
            <el-input
              style="width: 200px"
              v-model="battery.addmsg.repairbattrydetail"
              placeholder="请输入更换详情"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              style="float:right; margin-right:20px"
              type="primary"
              @click="batterySubmit"
            >添加</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="battery.list.slice((battery.currpage - 1) * battery.pagesize, battery.currpage * battery.pagesize)"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="repairbattrytime" label="日期"></el-table-column>
        <el-table-column align="center" prop="repairbattrydetail" label="更换详情"></el-table-column>
        <el-table-column align="center" prop="repairbattryreason" label="更换原因"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="paginationList"
        background
        :current-page="battery.currpage"
        :page-size="battery.pagesize"
        @prev-click="batterynextpage"
        @next-click="batterynextpage"
        @current-change="batterynextpage"
        layout="total, prev, pager, next"
        :total="battery.list.length"
      ></el-pagination>
    </el-dialog>

    <!-- 维修记录 -->
    <el-dialog title="维修记录" :visible.sync="service.show">
      <div class="title">
        <el-form
          ref="serviceForm"
          label-position="right"
          label-width="100px"
          :rules="serviceRules"
          :model="service.addmsg"
        >
          <el-form-item label=" 日期" prop="repairbattrytime">
            <el-date-picker
              v-model="service.addmsg.repairbattrytime"
              type="date"
              value-format="yyyy-MM-dd"
              style="width: 200px"
              placeholder="选择日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="维修人" prop="repairperson">
            <el-input
              style="width: 200px"
              v-model="service.addmsg.repairperson"
              placeholder="请输入维修人"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修原因" prop="repairbattryreason">
            <el-input
              style="width: 200px"
              v-model="service.addmsg.repairbattryreason"
              placeholder="请输入维修原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="维修结果" prop="result">
            <el-input style="width: 200px" v-model="service.addmsg.result" placeholder="请输入维修结果"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float:right; margin-right:20px" type="primary" @click="serviceadd">添加</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="service.list.slice((service.currpage - 1) * service.pagesize, service.currpage * service.pagesize)"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="repairbattrytime" label="日期"></el-table-column>
        <el-table-column align="center" prop="repairperson" label="维修人"></el-table-column>
        <el-table-column align="center" prop="repairbattryreason" label="维修原因"></el-table-column>
        <el-table-column align="center" prop="result" label="维修结果"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        class="paginationList"
        background
        :current-page="service.currpage"
        :page-size="service.pagesize"
        @prev-click="servicenextpage"
        @next-click="servicenextpage"
        @current-change="servicenextpage"
        layout="total, prev, pager, next"
        :total="service.list.length"
      ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLabelAlign: "",
      // 首屏搜索
      search: {
        member: "",
        user: "",
        department: ""
      },
      // 列表数据
      data: {
        pagesize: 15,
        currpage: 1,
        list: []
      },
      // 交接记录
      handover: {
        show: false,
        busnumber: "",
        addmsg: {
          connecttime: "",
          user1: "",
          user2: "",
          param1: ""
        },
        list: [],
        pagesize: 10,
        currpage: 1
      },
      // 电池更换
      battery: {
        show: false,
        addmsg: {
          repairbattrytime: "",
          repairbattryreason: "",
          repairbattrydetail: ""
        },
        list: [],
        pagesize: 10,
        currpage: 1
      },
      // 维修
      service: {
        busnumber: "",
        show: false,
        addmsg: {},
        list: [],
        pagesize: 10,
        currpage: 1
      },
      dialogFormVisible: false,
      dialogVisible: false,
      msgexport: false,
      msgimport: false,
      ruleForm: {
        cartype: "",
        member: "",
        shoppingtime: "",
        user: "",
        department: "",
        parm2: "",
        area: "",
        information: ""
      },
      rules: {
        member: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        shoppingtime: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        parm2: [{ required: true, message: "请输入资产编号", trigger: "blur" }],
        department: [
          { required: true, message: "请选择归属单位", trigger: "blur" }
        ],
        user: [{ required: true, message: "请输入指定司机", trigger: "blur" }],
        information: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      // 交接记录非空验证
      handoverRules: {
        user1: [
          { required: true, message: "请输入上一使用人", trigger: "blur" }
        ],
        user2: [
          { required: true, message: "请输入下一使用人", trigger: "blur" }
        ],
        connecttime: [
          { required: true, message: "请选择交接时间", trigger: "blur" }
        ],
        param1: [{ required: true, message: "请输入交接备注", trigger: "blur" }]
      },
      // 电池更换记录非空验证
      batteryRules: {
        repairbattrytime: [
          { required: true, message: "请选择更换时间", trigger: "blur" }
        ],
        repairbattryreason: [
          { required: true, message: "请输入更换原因", trigger: "blur" }
        ],
        repairbattrydetail: [
          { required: true, message: "请输入更换详情", trigger: "blur" }
        ]
      },
      // 维修记录非空验证
      serviceRules: {
        repairbattrytime: [
          { required: true, message: "请选择维修日期", trigger: "blur" }
        ],
        repairperson: [
          { required: true, message: "请输入维修人", trigger: "blur" }
        ],
        repairbattryreason: [
          { required: true, message: "请输入维修原因", trigger: "blur" }
        ],
        result: [{ required: true, message: "请输入维修结果", trigger: "blur" }]
      },
      formInline: {
        cartype: "",
        member: "",
        shoppingtime: "",
        parm2: "",
        department: "",
        user: "",
        area: ""
      },
      details: {},
      detail: {
        member: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        shoppingtime: [
          { required: true, message: "请选择购车时间", trigger: "blur" }
        ],
        user: [{ required: true, message: "请输入使用人", trigger: "blur" }],
        department: [
          { required: true, message: "请选择归属单位", trigger: "blur" }
        ],
        parm2: [{ required: true, message: "请输入资产编号", trigger: "blur" }],
        information: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ]
      },
      buttonIf: false,
      formInline: {}
    };
  },
  methods: {
    // 列表导出
    exportmsg() {
      location.href =
        this.$http.defaults.baseURL + "sanitation/car/exportExcel";
    },
    // 列表导入成功回调
    success(response, file) {
      console.log(response.status);
      if (response.status == "1") {
        this.$message({
          message: "导入成功",
          type: "success",
          offset: 155
        });
      } else if (response.status == "0") {
        this.$message({
          message: "导入失败，请重试",
          type: "error",
          offset: 155
        });
      }
      this.getlist();
    },
    // 切换页面
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(pagesize) {
      this.data.pagesize = pagesize;
    },
    addCar(formName) {
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.dialogVisible = false;
          this.$http
            .post("sanitation/car/add", this.$qs.stringify(this.ruleForm))
            .then(res => {
              console.log(res.data);
              this.getlist();
            })
            .catch(err => {
              console.log("请求失败");
            });
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //修改详情
    adddate(formName) {
      this.$refs["ruleDetails"].validate(valid => {
        if (valid) {
          this.$http
            .post("sanitation/car/update", this.$qs.stringify(this.details))
            .then(res => {
              this.dialogFormVisible = !this.dialogFormVisible;
              this.$message({
                type: "success",
                message: "修改成功！",
                offset: 155
              });
              this.getlist();
            });
        } else {
          return false;
        }
      });
    },
    pagination(row, _index) {
      this.dialogFormVisible = true;
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.details = JSON.parse(JSON.stringify(row));
      //显示弹窗
      this.buttonIf = true;
    },
    // 删除
    deletList(row, _index) {
      this.$confirm("此操作将删除此数据, 是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let date = {
          sid: row.sid
        };
        this.$http
          .post("sanitation/car/deleteBySid", this.$qs.stringify(date))
          .then(res => {
            this.getlist();
            this.$message({
              type: "success",
              message: "删除成功!",
              offset: 155
            });
          });
      });
    },
    // 获取/查询列表数据
    getlist() {
      this.data.currpage = 1;
      this.$http
        .post(
          "sanitation/car/pedicabCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          console.log(res);

          this.data.list = res.data;
        });
    },
    // 清空
    onEmpty() {
      this.search = {
        member: "",
        user: "",
        department: ""
      };
      this.getlist();
    },
    // 显示交接记录
    showhandover(row) {
      this.handover.busnumber = row.member;
      this.handover.show = !this.handover.show;
      this.getHandoverList();
    },
    // 交接记录列表
    getHandoverList() {
      this.$http
        .post(
          "sanitation/car/getConnectRecord",
          this.$qs.stringify({ busnumber: this.handover.busnumber })
        )
        .then(res => {
          this.handover.list = res.data;
        });
    },
    // 新增交接记录
    addhandover() {
      this.handover.addmsg.busnumber = this.handover.busnumber;
      this.$refs["handoverForm"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "sanitation/car/addConnectRecord",
              this.$qs.stringify(this.handover.addmsg)
            )
            .then(res => {
              this.handover.addmsg = {
                connecttime: "",
                user1: "",
                user2: "",
                param1: ""
              };
              this.$message({
                type: "success",
                message: "新增成功！",
                offset: 150
              });
              this.getHandoverList();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 交接记录下一页
    handovernextpage(value) {
      this.handover.currpage = value;
    },
    // 显示电池更换记录
    showBattery(row) {
      this.battery.busnumber = row.member;
      this.battery.show = !this.battery.show;
      this.getBatteryList();
    },
    // 电池更换记录列表
    getBatteryList() {
      this.$http
        .post(
          "sanitation/car/getBatteryRepairRecord",
          this.$qs.stringify({ busnumber: this.battery.busnumber })
        )
        .then(res => {
          this.battery.list = res.data;
        });
    },
    // 电池更换新增
    batterySubmit() {
      this.battery.addmsg.busnumber = this.battery.busnumber;
      this.$refs["batteryForm"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "sanitation/car/addBatteryRepairRecord",
              this.$qs.stringify(this.battery.addmsg)
            )
            .then(res => {
              this.battery.addmsg = {
                repairbattrytime: "",
                repairbattryreason: "",
                repairbattrydetail: ""
              };
              this.$message({
                type: "success",
                message: "新增成功！",
                offset: 150
              });
              this.getBatteryList();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 电池更换记录翻页
    batterynextpage(value) {
      this.battery.currpage = value;
    },
    // 显示维修记录
    showService(row) {
      this.service.busnumber = row.member;
      this.service.show = !this.service.show;
      this.getServiceList();
    },
    // 维修记录列表
    getServiceList() {
      this.$http
        .post(
          "sanitation/car/getAllRepairRecord",
          this.$qs.stringify(this.service)
        )
        .then(res => {
          this.service.list = res.data;
        });
    },
    // 维修记录新增
    serviceadd() {
      this.$refs["serviceForm"].validate(valid => {
        if (valid) {
          this.service.addmsg.busnumber = this.service.busnumber;
          this.$http
            .post(
              "sanitation/car/addRepairDetail",
              this.$qs.stringify(this.service.addmsg)
            )
            .then(res => {
              this.service.addmsg = {};
              this.$message({
                type: "success",
                message: "新增成功！",
                offset: 150
              });
              this.getServiceList();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 维修记录翻页
    servicenextpage(value) {
      this.service.currpage = value;
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  padding: 20px 0;
  .searchbox {
    float: left;
    padding-left: 10px;
    span {
      padding-right: 10px;
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

.paginationList {
  float: right;
  margin-right: 25px;
  padding-top: 20px;
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
    margin-bottom: 15px;
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
.inputText {
  width: 240px;
}
.download {
  height: 40px;
  div {
    float: left;
    line-height: 30px;
  }
  button {
    float: right;
  }
}
.title {
  .titlebox {
    margin: 10px 0;
  }
}
</style>

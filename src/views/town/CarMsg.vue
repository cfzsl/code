<template>
  <!-- 三轮车信息 -->
  <div id="carmsg">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="usearch">
          <el-form-item label="车牌号鲁E-">
            <el-input class="searchInput" v-model="number" placeholder="车牌号"></el-input>
          </el-form-item>
          <el-form-item label="负责道路">
            <el-select v-model="usearch.road" filterable>
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in roadList"
                :key="item.rd"
                :label="item.road"
                :value="item.road"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-select v-model="usearch.area">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="usearch.depart">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="item in optionsList"
                :key="item.id"
                :label="item.depart"
                :value="item.depart"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="onEmpty">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="searchBot">
        <el-button class="buttonBot" @click="dialogVisible = true">添加车辆信息</el-button>
        <el-button class="buttonBot" @click="msgimport = true">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast" @click="msgexport = true">导出全员信息</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加车辆信息" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form
        :inline="true"
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        class="demo-form-inline"
      >
        <el-form-item label="车辆类型" class="searchType" prop="cartype">
          <el-select v-model="ruleForm.cartype" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="mumber">
          <el-input v-model="ruleForm.mumber"></el-input>
        </el-form-item>
        <el-form-item label="购车时间" prop="shoppingtime">
          <el-date-picker v-model="ruleForm.shoppingtime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="资产编号" prop="parm2">
          <el-input v-model="ruleForm.parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位" prop="department">
          <el-select v-model="ruleForm.department" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机" prop="user">
          <el-input v-model="ruleForm.user"></el-input>
        </el-form-item>
        <el-form-item label="作业区域" prop="area">
          <el-select v-model="ruleForm.area" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="resetForm('ruleForm')" class="formButon">重置</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCar('ruleForm')" class="formButon">保存</el-button>
      </span>
    </el-dialog>
    <!-- 弹框2 -->
    <el-dialog title="信息导入" :visible.sync="msgimport" width="15%" center>
      <div class="download">
        <div>全部信息模版</div>
        <el-button type="primary" size="mini">下载</el-button>
      </div>
      <div class="download">
        <div>垃圾运输车信息模版</div>
        <el-button type="primary" size="mini">下载</el-button>
      </div>
      <div class="download">
        <div>清扫车信息模版</div>
        <el-button type="primary" size="mini">下载</el-button>
      </div>
      <div class="download">
        <div>洒水车信息模版</div>
        <el-button type="primary" size="mini">下载</el-button>
      </div>
    </el-dialog>
    <!-- 弹框3 -->
    <el-dialog title="信息导出" :visible.sync="msgexport" width="15%" center>
      <div class="download">
        <div>全部信息模版</div>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
      <div class="download">
        <div>垃圾运输车信息模版</div>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
      <div class="download">
        <div>清扫车信息模版</div>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
      <div class="download">
        <div>洒水车信息模版</div>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="num" label="序号" width></el-table-column>
      <el-table-column align="center" prop="member" label="车牌号" width></el-table-column>
      <el-table-column align="center" prop="shoppingtime" label="购车时间" width></el-table-column>
      <el-table-column align="center" prop="parm2" label="资产编号" width></el-table-column>
      <el-table-column align="center" prop="department" label="归属单位" width></el-table-column>
      <el-table-column align="center" prop="user" label="使用人" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="primary"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >详情</el-button>
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
      @prev-click="nextpage"
      @next-click="nextpage"
      @current-change="nextpage"
      :page-sizes="[10,20,30,40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="details" class="demo-form-inline" v-if="buttonIf">
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="details.cartype" class="selectTop" disabled>
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="details.member" disabled></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="details.shoppingtime" disabled></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="details.parm2" disabled></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="details.department" class="selectTop" disabled>
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="details.area" class="selectTop" disabled>
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人">
          <el-input v-model="details.user" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="details"
        ref="ruleDetails"
        :rules="detail"
        class="demo-form-inline"
        v-if="!buttonIf"
      >
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="details.cartype" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="details.member"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="details.shoppingtime"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="details.parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="details.department" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="details.area" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人">
          <el-input v-model="details.user"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="buttonIf" @click="addDo" class="formButon">编辑</el-button>
        <el-button
          type="primary"
          v-else-if="!buttonIf"
          @click="adddate('ruleDetails')"
          class="formButon"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      dialogVisible: false,
      number: "",
      usearch: {
        number: "",
        road: "",
        area: "",
        depart: ""
      },
      text: "车辆详情",
      msgexport: false,
      msgimport: false,
      pagesize: 10,
      currpage: 1,
      tableData: [],
      ruleForm: {
        cartype: "",
        mumber: "",
        shoppingtime: "",
        user: "",
        department: "",
        parm2: "",
        area: ""
      },
      rules: {
        cartype: [
          { required: true, message: "请选择车辆类型", trigger: "blur" }
        ],
        mumber: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        shoppingtime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        user: [{ required: true, message: "请输入人名", trigger: "blur" }],
        department: [
          { required: true, message: "请选择归属单位", trigger: "blur" }
        ],
        parm2: [{ required: true, message: "请输入资产编号", trigger: "blur" }],
        area: [{ required: true, message: "请选择作业区域", trigger: "blur" }]
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
        cartype: [
          { required: true, message: "请选择车辆类型", trigger: "blur" }
        ],
        mumber: [{ required: true, message: "请输入车牌号", trigger: "blur" }],
        shoppingtime: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "blur"
          }
        ],
        user: [{ required: true, message: "请输入人名", trigger: "blur" }],
        department: [
          { required: true, message: "请选择归属单位", trigger: "blur" }
        ],
        parm2: [{ required: true, message: "请输入资产编号", trigger: "blur" }],
        area: [{ required: true, message: "请选择作业区域", trigger: "blur" }]
      },

      i: "0",
      optionsCar: [
        {
          i: "0",
          label: ""
        },
        {
          i: "1",
          label: "垃圾清运车"
        },
        {
          i: "2",
          label: "清扫车"
        },
        {
          i: "3",
          label: "洒水车"
        },
        {
          i: "3",
          label: "三轮车"
        }
      ],
      rd: "0",
      roadList: [
        {
          rd: "1",
          road: "庐山路"
        },
        {
          rd: "2",
          road: "宁阳路"
        },
        {
          rd: "3",
          road: "新泰路"
        },
        {
          rd: "4",
          road: "北一路"
        },
        {
          rd: "5",
          road: "北二路"
        },
        {
          rd: "6",
          road: "黄河路"
        }
      ],
      value: "0",
      options: [
        {
          value: "1",
          area: "东营区新区"
        },
        {
          value: "2",
          area: "文汇街道办事处"
        },
        {
          value: "3",
          area: "辛店街道办事处"
        },
        {
          value: "4",
          area: "黄河街道办事处"
        },
        {
          value: "5",
          area: "圣园街道办事处"
        },
        {
          value: "6",
          area: "六户镇"
        },
        {
          value: "7",
          area: "牛庄镇"
        },
        {
          value: "8",
          area: "史口镇"
        },
        {
          value: "9",
          area: "龙居镇"
        },
        {
          value: "10",
          area: "新泰路"
        }
      ],
      lu: "0",
      optionslu: [
        {
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "东营区新区"
        },
        {
          lu: "2",
          label: "文汇街道办事处"
        },
        {
          lu: "3",
          label: "辛店街道办事处"
        },
        {
          lu: "4",
          label: "黄河街道办事处"
        },
        {
          lu: "5",
          label: "圣园街道办事处"
        },
        {
          lu: "6",
          label: "六户镇"
        },
        {
          lu: "7",
          label: "牛庄镇"
        },
        {
          lu: "8",
          label: "史口镇"
        },
        {
          lu: "9",
          label: "龙居镇"
        }
      ],
      id: "0",
      optionsList: [
        {
          id: "1",
          depart: "环卫一部"
        },
        {
          id: "2",
          depart: "环卫二部"
        },
        {
          id: "3",
          depart: "环卫三部"
        },
        {
          id: "4",
          depart: "环卫四部"
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "0",
          label: "全部"
        },
        {
          web: "1",
          label: "环卫一部"
        },
        {
          web: "2",
          label: "环卫二部"
        },
        {
          web: "3",
          label: "环卫三部"
        },
        {
          web: "4",
          label: "环卫四部"
        }
      ],
      type: "0",
      optionsType: [
        {
          type: "0",
          label: "A1"
        },
        {
          type: "1",
          label: "A2"
        },
        {
          type: "2",
          label: "B1"
        },
        {
          type: "3",
          label: "B2"
        },
        {
          type: "4",
          label: "C1"
        },
        {
          type: "5",
          label: "C2"
        }
      ],
      state: "0",
      optionsStated: [
        {
          state: "0",
          label: "在职"
        },
        {
          state: "1",
          label: "离职"
        }
      ],
      buttonIf: false,
      formInline: {}
    };
  },
  // 监听
  watch: {
    number: function(val) {
      this.usearch.number = val;
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(val)) {
        this.$message({
          showClose: true,
          message: "请输入字母或数子",
          type: "error",
          offset: 152
        });
        // alert('请输入字母或数子')
      } else if (val.length > 10) {
        this.$message({
          showClose: true,
          message: "请输入不超过10位的数子字母",
          type: "error",
          offset: 152
        });
        // alert("请输入不超过10位的数子字母")
        this.usearch.msgear = this.usearch.msgear.substr(0, 10);
      }
    }
  },
  methods: {
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    addCar(formName) {
      console.log(this.ruleForm)
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
      console.log(this.details);
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.$http
            .post("sanitation/car/update", this.$qs.stringify(this.details))
            .then(res => {
              console.log(res.data);
              // this.getlist();
              this.dialogFormVisible = false;
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
    addDo(){
      this.buttonIf = false;
    },
    pagination(row, _index) {
      this.dialogFormVisible = true;
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.details = row;
      //显示弹窗
      this.buttonIf = true;
    },
    // 删除
    deletList(row, _index) {
      let date = {
        sid: row.sid
      };
      // console.log(date)
      this.$http
        .post("sanitation/car/deleteBySid", this.$qs.stringify(date))
        .then(res => {
          console.log(res.data);
          this.getlist();
        });
      // this.getlist();
    },
    // 获取列表数据
    getlist() {
      this.$http.post("sanitation/car/formSearch").then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    // 查询
    onSubmit() {
      // console.log("查啥?");
      console.log(this.usearch);
      this.$http
        .post("sanitation/car/formSearch", this.$qs.stringify(this.usearch))
        .then(res => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 清空
    onEmpty() {
      this.usearch = {
        number: "",
        road: "",
        area: "",
        depart: ""
      },
      this.getlist();
    }
  },
  created() {
    this.getlist();
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
</style>

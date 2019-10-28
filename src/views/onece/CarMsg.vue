<template>
  <!-- 车辆信息管理 -->
  <div>
    <div class="search">
      <div class="searchbox">
        <span>车牌号鲁E-</span>
        <el-input v-model="search.busnumber" placeholder="请输入车牌号" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>车辆类型</span>
        <el-select v-model="search.cartype">
          <el-option label="全部" value></el-option>
          <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
          <el-option label="洒水车" value="洒水车"></el-option>
          <el-option label="清扫车" value="清扫车"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>负责道路</span>
        <el-select v-model="search.param2">
          <el-option label="全部" value></el-option>
          <el-option label="庐山路" value="庐山路"></el-option>
          <el-option label="宁阳路" value="宁阳路"></el-option>
          <el-option label="新泰路" value="新泰路"></el-option>
          <el-option label="北一路" value="北一路"></el-option>
          <el-option label="北二路" value="北二路"></el-option>
          <el-option label="黄河路" value="黄河路"></el-option>
          <el-option label="济南路" value="济南路"></el-option>
          <el-option label="淄博路" value="淄博路"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>作业区域</span>
        <el-select v-model="search.area">
          <el-option label="全部" value></el-option>
          <el-option label="东营区新区" value="东营区新区"></el-option>
          <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
          <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
          <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
          <el-option label="胜园街道办事处" value="胜园街道办事处"></el-option>
          <el-option label="六户镇" value="六户镇"></el-option>
          <el-option label="牛庄镇" value="牛庄镇"></el-option>
          <el-option label="史口镇" value="史口镇"></el-option>
          <el-option label="龙居镇" value="龙居镇"></el-option>
        </el-select>
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
      <el-button type="primary" class="btn" @click="searchBtn">查询</el-button>
    </div>

    <div class="menu">
      <div class="btn">
        <el-button icon="el-icon-plus" @click="showedit = true;type = 'add'">添加车辆信息</el-button>
        <el-button icon="el-icon-download" @click="msgimport = true">车辆信息导入</el-button>
        <el-button icon="el-icon-upload2" @click="msgexport = true">车辆信息导出</el-button>
      </div>

      <!-- 信息导出 -->
      <el-dialog title="信息导出" :visible.sync="msgexport" width="15%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
        <div class="download">
          <div>垃圾清运车信息模版</div>
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

      <!-- 信息导入 -->
      <el-dialog title="信息导入" :visible.sync="msgimport" width="15%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-button type="primary" size="mini">下载</el-button>
        </div>
        <div class="download">
          <div>垃圾清运车信息模版</div>
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
    </div>

    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
        <el-table-column align="center" prop="shoppingtime" label="购车时间"></el-table-column>
        <el-table-column align="center" prop="member" label="资产编号"></el-table-column>
        <el-table-column align="center" prop="department" label="归属单位"></el-table-column>
        <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
        <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
        <el-table-column align="center" label="车况异常">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="carwarning(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="油耗信息">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showWarning(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保养记录">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showmaintenance(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保险缴纳">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showinsurance(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="280px" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="btn"
              @click.stop="handleDetail(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              type="success"
              class="btn"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              class="btn"
              @click.stop="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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

    <!-- 车辆信息 -->
    <el-dialog title="车辆信息" width="450px" :visible.sync="showdetail" @close="msg = {}">
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
        <el-form-item label="车辆信息">
          <el-select disabled v-model="msg.cartype" placeholder="请选择车辆类型" style="width: 100%">
            <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
            <el-option label="洒水车" value="洒水车"></el-option>
            <el-option label="清扫车" value="清扫车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input readonly v-model="msg.busnumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input readonly v-model="msg.shoppingtime" placeholder="请输入购车时间"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input readonly v-model="msg.member" placeholder="请输入资产编号"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select disabled v-model="msg.department" placeholder="请选择归属单位" style="width: 100%">
            <el-option label="环卫一部" value="一部"></el-option>
            <el-option label="环卫二部" value="二部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input readonly v-model="msg.user" placeholder="请输入司机"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input readonly v-model="msg.tel" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="使用区域">
          <el-select disabled v-model="msg.area" placeholder="请选择使用区域" style="width: 100%">
            <el-option label="东营南站" value="东营南站"></el-option>
            <el-option label="西湖公园" value="西湖公园"></el-option>
            <el-option label="翠湖公园" value="翠湖公园"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆维修情况">
          <el-input
            readonly
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="请输入内容"
            v-model="msg.information"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 车辆编辑 -->
    <el-dialog
      title="车辆编辑"
      width="450px"
      :visible.sync="showedit"
      @close="msg = {};$refs['ruleForm'].resetFields();"
    >
      <el-form ref="ruleForm" :model="msg" :rules="rules" label-width="auto" class="msg">
        <el-form-item label="车辆信息" prop="cartype">
          <el-select v-model="msg.cartype" placeholder="请选择车辆类型" style="width: 100%">
            <el-option label="垃圾清运车" value="垃圾清运车"></el-option>
            <el-option label="洒水车" value="洒水车"></el-option>
            <el-option label="清扫车" value="清扫车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="busnumber">
          <el-input v-model="msg.busnumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="购车时间" prop="shoppingtime">
          <el-date-picker v-model="msg.shoppingtime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="资产编号" prop="member">
          <el-input v-model="msg.member" placeholder="请输入资产编号"></el-input>
        </el-form-item>
        <el-form-item label="归属单位" prop="department">
          <el-select v-model="msg.department" placeholder="请选择归属单位" style="width: 100%">
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用区域" prop="area">
          <el-select v-model="msg.area" placeholder="请选择使用区域" style="width: 100%">
            <el-option label="东营南站" value="东营南站"></el-option>
            <el-option label="西湖公园" value="西湖公园"></el-option>
            <el-option label="翠湖公园" value="翠湖公园"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机" prop="user">
          <el-input v-model="msg.user" placeholder="请输入司机"></el-input>
        </el-form-item>
        <el-form-item label="车辆维修情况" prop="repairdetail">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 2}"
            placeholder="请输入内容"
            v-model="msg.repairdetail"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showedit = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>

    <!-- 车况报警 -->
    <el-dialog title="车况异常" :visible.sync="msgadd">
      <div class="abnormalsearch">
        记录时间段：
        <el-date-picker
          v-model="abnormal"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <div class="btn">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">清空</el-button>
        </div>
      </div>
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
        <div class="list">
          <!-- 此处data应为
          data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
          <el-table :data="warning" border style="width: 100%">
            <el-table-column align="center" prop="num" label="序号"></el-table-column>
            <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
            <el-table-column align="center" prop="warmingtime" label="记录时间"></el-table-column>
            <el-table-column align="center" prop="faultinformation" label="异常情况"></el-table-column>
            <!-- <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
            <el-table-column align="center" prop="date" label="维修日期"></el-table-column>
            <el-table-column align="center" prop="troubleshooting" label="故障维修结果" width="239px"></el-table-column>-->
          </el-table>
        </div>
      </el-form>
    </el-dialog>

    <!-- 油耗 -->
    <el-dialog title="油耗信息" :visible.sync="showwarning">
      <div class="abnormalsearch">
        记录时间段：
        <el-date-picker
          v-model="abnormal"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <div class="btn">
          <el-button type="primary">搜索</el-button>
          <el-button type="primary">清空</el-button>
        </div>
      </div>
      <div class="list">
        <!-- 此处data应为
        data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
        <el-table :data="oil" border style="width: 100%">
          <el-table-column align="center" prop="num" label="序号"></el-table-column>
          <el-table-column align="center" prop="checkgastime" label="记录时间"></el-table-column>
          <el-table-column align="center" prop="param1" label="当日总行程"></el-table-column>
          <el-table-column align="center" prop="param2" label="平均时速（KM/h）"></el-table-column>
          <el-table-column align="center" prop="gasolineused" label="车辆耗油量（L/100KM）"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 保养记录 -->
    <el-dialog title="保养记录" :visible.sync="maintenance">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form label-position="right" label-width="80px" :model="maintenanceMsg">
              <el-form-item label="日期">
                <el-date-picker
                  style="width:150px"
                  v-model="maintenanceMsg.date"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input v-model="maintenanceMsg.driver"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3"
                >
                  <el-button size="medium" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content">
            <el-form label-position="right" label-width="80px" :model="maintenanceMsg">
              <el-form-item label="保养内容">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="maintenanceMsg.content"
                  :autosize="{ minRows: 7, maxRows: 4}"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="5" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="width: 90%">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="maintenanceList">
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="maintaintime" label="维修/保养时间"></el-table-column>
        <el-table-column align="center" prop="param1" label="类型"></el-table-column>
        <el-table-column align="center" prop="maintaindiscript" label="保养详情"></el-table-column>
        <el-table-column align="center" label="保养图片">
          <template slot-scope="scope">
            <el-image
              v-for="(item, i) in scope.row.maintainfile"
              :key="i"
              class="img"
              style="width: 50px; height: 50px"
              :src="item"
              fit="fill"
              @click="showimgs(item)"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 保养记录图片 -->
    <el-dialog title="保养图片" width="550px" :visible.sync="showimg">
      <el-image style="width: 100%;" :src="url" fit="contain"></el-image>
      <el-row class="imgcontent">
        <el-col :span="20">
          <div class="grid-content bg-purple">上传于： 2019-10-20</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">APP上传</div>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 保险 -->
    <el-dialog title="保险缴纳" :visible.sync="showinsurancea">
      <div class="abnormalsearch">
        保险公司：
        <el-input style="width:190px;margin-right: 10px;" v-model="input" placeholder="请输入内容"></el-input>缴纳日期：
        <el-date-picker
          style="width:190px;margin-right: 10px;"
          v-model="value1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>到期日期：
        <el-date-picker style="width:190px;" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
        <div class="btn">
          <el-button type="primary">添加</el-button>
        </div>
      </div>
      <div class="sytime">系统时间：2019-10-22</div>
      <el-table :data="insurance" border style="width: 100%">
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="bxtime" label="记录时间"></el-table-column>
        <el-table-column align="center" prop="bxcompany" label="保险公司"></el-table-column>
        <el-table-column align="center" prop="bxtime" label="生效时间"></el-table-column>
        <el-table-column align="center" prop="bxtimewarng" label="到期时间"></el-table-column>
      </el-table>
    </el-dialog>
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
        busnumber: "",
        param2: "",
        area: "",
        department: "",
        cartype: ""
      },
      msg: {
        cartype: "",
        busnumber: "",
        shoppingtime: "",
        member: "",
        department: "",
        user: "",
        area: "",
        repairdetail: ""
      },
      msgadd: false,
      msgimport: false,
      msgexport: false,
      showwarning: false,
      maintenance: false,
      showimg: false,
      showinsurancea: false,
      showdetail: false,
      showedit: false,
      url: "",
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
      maintenanceMsg: {
        date: "",
        driver: "",
        img: "",
        content: ""
      },
      maintenanceList: [],
      warningList: [
        {
          remaining: 0,
          consumption: 0,
          maximum: 0,
          date: "0",
          carbrand: "鲁E-432R9",
          driver: "李诞"
        }
      ],
      carmsg: [
        {
          carbrand: "鲁E-432R9",
          driver: "李诞",
          engine: true
        }
      ],
      // 故障代码
      warning: [
       
      ],
      troublesHooting: [
        {
          th: "0",
          label: "全部"
        },
        {
          th: "1",
          label: "已维修"
        },
        {
          th: "2",
          label: "未维修"
        }
      ],
      value1: "",
      value2: "",
      th: "0",
      // 油耗
      oil: [
        {
          id: 1,
          carbrand: "鲁E-675G3",
          consumption: "35 (标准值 ≤ 25)",
          policeDate: "2019-07-15",
          policeTime: "08:00"
        },
        {
          id: 2,
          carbrand: "鲁E-675G3",
          consumption: "30 (标准值 ≤ 25)",
          policeDate: "2019-08-20",
          policeTime: "15:25"
        },
        {
          id: 3,
          carbrand: "鲁E-675G3",
          consumption: "26 (标准值 ≤ 25)",
          policeDate: "2019-10-11",
          policeTime: "10:35"
        }
      ],
      // 保险
      insurance: [],
      // 车况异常
      abnormal: "",
      // 编辑和新增修改
      type: "add",
      // 新增判断
      rules: {
        cartype: [
          { required: true, message: "请选择车辆信息", trigger: "blur" }
        ],
        busnumber: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ],
        shoppingtime: [
          { required: true, message: "请输入购买时间", trigger: "blur" }
        ],
        member: [
          { required: true, message: "请输入资产编号", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入归属单位", trigger: "blur" }
        ],
        user: [{ required: true, message: "请输入指定司机", trigger: "blur" }],
        area: [{ required: true, message: "请选择使用区域", trigger: "blur" }]
      }
    };
  },
  methods: {
    showimgs(v) {
      this.url = v;
      this.showimg = !this.showimg;
    },
    // 保险缴纳
    showinsurance(row) {
      this.showinsurancea = !this.showinsurancea;
      this.$http
        .post(
          "MotorDetail/getBXByBusNumber",
          this.$qs.stringify({ busNumber: row.busnumber })
        )
        .then(res => {
          this.insurance = res.data;
        });
    },
    // 保养记录
    showmaintenance(row) {
      console.log(row.busnumber);
      this.maintenance = !this.maintenance;
      this.$http
        .post(
          "MotorDetail/getBYByBusNumber",
          this.$qs.stringify({ busNumber: row.busnumber })
        )
        .then(res => {
          for (const key in res.data) {
            res.data[key].maintainfile = res.data[key].maintainfile.split(";");
          }
          this.maintenanceList = res.data;
        });
    },
    // 油耗信息
    showWarning(row) {
      this.showwarning = !this.showwarning;
      this.$http
        .post(
          "MotorDetail/getYHByBusNumber",
          this.$qs.stringify({ busNumber: row.busnumber })
        )
        .then(res => {
          this.oil = res.data;
        });
    },
    nextpage(value) {
      this.data.currpage = value;
    },
    // 车况信息
    carwarning(index, row) {
      this.msg = row;
      this.msgadd = !this.msgadd;
      this.$http
        .post(
          "MotorDetail/getConditionByBusNumber",
          this.$qs.stringify({ busNumber: row.busnumber })
        )
        .then(res => {
          console.log(res.data);
          
          this.warning = res.data
        });
    },
    handleDetail(index, row) {
      this.msg = row;
      this.showdetail = !this.showdetail;
    },
    handleEdit(index, row) {
      this.type = "edit";
      this.msg = row;
      this.showedit = !this.showedit;
    },
    handleDelete(index, row) {
      console.log(row.sid);
      this.$http
        .post(
          "MotorDetail/deleteMotorInformationBySid",
          this.$qs.stringify({ sid: row.sid })
        )
        .then(res => {
          console.log(res);
          this.getCarList();
        });
    },
    getCarList() {
      this.$http.get("MotorDetail/getAllMotorInformation").then(res => {
        this.data.list = res.data;
      });
    },
    searchBtn() {
      this.$http
        .post(
          "MotorDetail/motorInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          console.log(res);
          this.data.list = res.data;
        });
    },
    onsubmit() {
      this.showedit = false;
      if (this.type == "edit") {
        console.log("edit");
        this.$http
          .post(
            "MotorDetail/updateMotorInformation",
            this.$qs.stringify(this.msg)
          )
          .then(res => {
            this.$options.methods.getCarList.call(this);
          });
      } else if (this.type == "add") {
        console.log("add");
        this.$http
          .post("MotorDetail/addMotorInformation", this.$qs.stringify(this.msg))
          .then(res => {
            this.$options.methods.getCarList.call(this);
          });
      }
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.onsubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.getCarList();
  }
};
</script>

<style lang="scss" scoped>
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

.pagination {
  float: right;
  margin-right: 25px;
  padding-top: 20px;
}

.img {
  margin-right: 5px;
}

.imgcontent {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #d2d2d2;
}

.sytime {
  float: right;
  margin-right: 10px;
  padding-bottom: 10px;
  color: red;
}

.abnormalsearch {
  margin-bottom: 10px;
  .btn {
    float: right;
    border-radius: 5px;
  }
}
</style>
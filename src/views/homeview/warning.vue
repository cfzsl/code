<template>
  <!-- 报警信息 -->
  <div id="warning">
    <div class="bdMap">
      <!-- 人员考勤 -->
      <div class="warningTop">
        <div class="warningText1">工作预警</div>
        <div class="warningDate">2019-11-02</div>
      </div>
      <div class="warningPlate">
        <div class="plate" style="width: 190px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">50</span>
            <span>当日应出勤</span>
          </div>
        </div>
        <div class="plate" style="width: 190px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">41</span>
            <span>当日实际出勤</span>
          </div>
        </div>
        <div class="plate" style="width: 110px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">3</span>
            <span>迟到</span>
          </div>
        </div>
        <div class="plate" style="width: 110px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">50</span>
            <span>早退</span>
          </div>
        </div>
        <div class="plate" style="width: 110px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">1</span>
            <span>缺卡</span>
          </div>
        </div>
        <div class="plate" style="width: 110px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">1</span>
            <span>旷工</span>
          </div>
        </div>
        <div class="plate" style="width: 110px">
          <div class="plateLeft">
            <img src />
          </div>
          <div class="plateRight">
            <span class="plateRightNumber">4</span>
            <span>请假</span>
          </div>
        </div>
      </div>
      <!-- 报警信息 -->
      <div class="warningText">工作预警</div>
      <div class="button">
        <div @click="msgeslint = true" class="buttonrow">
          <div class="buttonrowL oneself">
            <span class="iconfont icon-huaban"></span>
            <span>车况异常</span>
          </div>
          <div class="buttonrowR oneselfnew">
            <span>{{abnormalList.length}}</span>
          </div>
        </div>
        <div @click="msgeslint2 = true" class="buttonrow">
          <div class="buttonrowL townself">
            <span class="iconfont icon-huaban"></span>
            <span>油耗超标</span>
          </div>
          <div class="buttonrowR townselfnew">
            <span>{{oli.length}}</span>
          </div>
        </div>
        <div @click="msgeslint3 = true" class="buttonrow">
          <div class="buttonrowL threeself">
            <span class="iconfont icon-huaban"></span>
            <span>保养到期</span>
          </div>
          <div class="buttonrowR threeselfnew">
            <span>{{maintainList.length}}</span>
          </div>
        </div>
        <div @click="msgeslint4 = true" class="buttonrow">
          <div class="buttonrowL fourself">
            <span class="iconfont icon-huaban"></span>
            <span>保险到期</span>
          </div>
          <div class="buttonrowR fourselfnew">
            <span>{{insuranceList.length}}</span>
          </div>
        </div>
        <div @click="msgeslint5 = true" class="buttonrow">
          <div class="buttonrowL fifself">
            <span class="iconfont icon-huaban"></span>
            <span>人员超龄</span>
          </div>
          <div class="buttonrowR fifselfnew">
            <span>{{overageList.length}}</span>
          </div>
        </div>
        <div @click="msgeslint6 = true" class="buttonrow">
          <div class="buttonrowL sixself">
            <span class="iconfont icon-huaban"></span>
            <span>越界</span>
          </div>
          <div class="buttonrowR sixselfnew">
            <span>{{transboundaryList.length}}</span>
          </div>
        </div>
        <div @click="msgeslint7 = true" class="buttonrow">
          <div class="buttonrowL sevenself">
            <span class="iconfont icon-huaban"></span>
            <span>停滞超限</span>
          </div>
          <div class="buttonrowR sevenselfnew">
            <span>{{stagnationList.length}}</span>
          </div>
        </div>
      </div>
      <!-- 弹框1 -->
      <el-dialog
        title="车况异常报警"
        :visible.sync="msgeslint"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="abnormal" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="abnormal.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="abnormal.warningdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="故障维修结果" class="Troubleshooting">
              <el-select v-model="abnormal.fixstatus" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in troublesHooting"
                  :key="item.th"
                  :label="item.label"
                  :value="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onAbnormal">查询</el-button>
              <el-button type="primary" @click="deilAbnormal">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="abnormalList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="errmsg" label="故障信息"></el-table-column>
              <el-table-column align="center" prop="warningdate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="warningtime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="fixperson" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="fixtime" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="fixstatus" label="故障维修结果" width="239px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="abnormalList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框2 -->
      <el-dialog
        title="油耗超标报警"
        :visible.sync="msgeslint2"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="consumption" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="consumption.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="consumption.warningdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onOli">查询</el-button>
              <el-button type="primary" @click="deilOli">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="oli.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="oilused" label="车辆耗油量（L/100KM）"></el-table-column>
              <el-table-column align="center" prop="warningdate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="warningtime" label="报警时间"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="oli.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框3 -->
      <el-dialog
        title="保养到期报警"
        :visible.sync="msgeslint3"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="maintain" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="maintain.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="maintain.warningdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="保养完成情况" class="Troubleshooting">
              <el-select v-model="maintain.maintainstatus" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option label="未保养" value="未保养"></el-option>
                <el-option label="已保养" value="已保养"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onMaintain">查询</el-button>
              <el-button type="primary" @click="deilMaintain">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="maintainList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="lastmaintaindate" label="上次保养时间"></el-table-column>
              <el-table-column align="center" prop="lastmaintainkm" label="上次保养公里数"></el-table-column>
              <el-table-column align="center" prop="drivedkm" label="已行驶公里数"></el-table-column>
              <el-table-column align="center" prop="outkm" label="超限公里数"></el-table-column>
              <el-table-column align="center" prop="maintainperson" label="保养负责人"></el-table-column>
              <el-table-column align="center" label="保养完成情况" width>
                <template slot-scope="scope">
                  <span>{{scope.row.maintainstatus}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="maintainList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框4 -->
      <el-dialog
        title="保险到期报警"
        :visible.sync="msgeslint4"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="insurance" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="insurance.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="insurance.warningtime"
                type="date"
                placeholder
                value-format="yyyy-MM-dd"
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onInsurance">查询</el-button>
              <el-button type="primary" @click="deilInsurance">清空</el-button>
            </el-form-item>
            <div class="sytime">系统时间：2019-10-13</div>
          </div>
          <div class="list">
            <el-table
              :data="insuranceList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" label="到期剩余天数" width>
                <template slot-scope="scope">
                  <span :class="scope.row.expireday<10?'red':'hed'">{{scope.row.expireday}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="starttime" label="生效时间"></el-table-column>
              <el-table-column align="center" prop="endtime" label="到期时间"></el-table-column>
              <el-table-column align="center" prop="warningtime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="safeperson" label="负责人"></el-table-column>
              <el-table-column align="center" label="操作">
                <el-button type="warning">报警处理</el-button>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="insuranceList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框5 -->
      <el-dialog
        title="人员超龄报警"
        :visible.sync="msgeslint5"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" border :model="overage" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="overage.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="overage.warningdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onOverage">查询</el-button>
              <el-button type="primary" @click="deilOverage">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="overageList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="user" label="姓名"></el-table-column>
              <el-table-column align="center" prop="isoutage" label="是否超龄"></el-table-column>
              <el-table-column align="center" prop="warningdate" label="报警日期"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="overageList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框6 -->
      <el-dialog
        title="越界报警"
        :visible.sync="msgeslint6"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="transboundary" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="transboundary.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="transboundary.warningdate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onTransboundary">查询</el-button>
              <el-button type="primary" @click="deilTransboundary">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="transboundaryList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="depart" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="warningdate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="warningtime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="warningtext" label="线路异常情况" width="436px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="transboundaryList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框7 -->
      <el-dialog
        title="停滞超限报警"
        :visible.sync="msgeslint7"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <el-form ref="form" :model="stagnation" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="stagnation.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="stagnation.warningtime"
                type="date"
                placeholder
                value-format="yyyy-MM-dd"
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onStagnation">查询</el-button>
              <el-button type="primary" @click="deilStagnation">清空</el-button>
            </el-form-item>
          </div>
          <el-table-column class="list">
            <el-table
              :data="stagnationList.slice((currpage - 1) *pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="user" label="车辆使用人"></el-table-column>
              <el-table-column align="center" prop="depart" label="单位"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
              <el-table-column align="center" prop="staypos" label="停滞点" width="200x"></el-table-column>
              <el-table-column align="center" prop="staytime" label="停滞时长" width="220px"></el-table-column>
              <el-table-column align="center" prop="warningtime" label="报警时间" width="200px"></el-table-column>
            </el-table>
          </el-table-column>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              background
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
              :page-sizes="[10,20,30,40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="stagnationList.length"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msgeslint: false,
      msgeslint2: false,
      msgeslint3: false,
      msgeslint4: false,
      msgeslint5: false,
      msgeslint6: false,
      msgeslint7: false,
      pagesize: 10,
      currpage: 1,
      th: "0",
      troublesHooting: [
        {
          th: "1",
          label: "已维修"
        },
        {
          th: "2",
          label: "未维修"
        }
      ],
      number: "",
      //车况异常
      abnormalList: [],
      abnormal: {
        number: "",
        warningdate: "",
        fixstatus: ""
      },
      // 油耗
      oli: [],
      consumption: {
        number: "",
        warningdate: ""
      },
      // 保养
      maintainList: [],
      maintain: {
        number: "",
        warningdate: "",
        maintainstatus: ""
      },
      // 保险
      insuranceList: [],
      insurance: {
        number: "",
        warningtime: ""
      },
      //超龄
      overageList: [],
      overage: {
        number: "",
        warningdate: ""
      },
      //越界
      transboundaryList: [],
      transboundary: {
        number: "",
        warningdate: ""
      },
      //停滞
      stagnationList: [],
      stagnation: {
        number: "",
        warningtime: ""
      }
    };
  },
  // 监听
  watch: {
    // 提示
    number: function(val) {
      this.number = val;
      let reg = /^[0-9a-zA-Z]+$/;
      if (!reg.test(this.number)) {
        this.$message({
          showClose: true,
          message: "请输入字母或数字",
          type: "error",
          offset: 155
        });
        // alert('请输入字母或数子')
      } else if (this.number.length > 10) {
        this.$message({
          showClose: true,
          message: "请输入不超过10位的数字或字母",
          type: "error",
          offset: 155
        });
        // alert("请输入不超过10位的数子字母")
        this.number = this.number.substr(0, 10);
      }
    }
  },
  created() {
    this.getabnormal();
    this.getOli();
    this.getMaintainList();
    this.getInsuranceList();
    this.getOverageList();
    this.getTransboundaryList();
    this.getStagnationList();
  },
  methods: {
    // 信息窗体
    infoWindowClose(markers) {
      markers.show = false;
    },
    infoWindowOpen(markers) {
      markers.show = true;
    },
    //车况异常
    getabnormal() {
      this.$http
        .post("hw/main/listCarError", this.$qs.stringify(this.abnormal))
        .then(res => {
          console.log(res.data);
          this.abnormalList = res.data;
        });
    },
    onAbnormal() {
      console.log(this.abnormal);
      this.getabnormal();
    },
    deilAbnormal() {
      this.abnormal = {
        number: "",
        warningdate: "",
        fixstatus: ""
      };
      this.getabnormal();
    },
    //油耗
    getOli() {
      this.$http
        .post("hw/main/listOilOut", this.$qs.stringify(this.consumption))
        .then(res => {
          console.log(res.data);
          this.oli = res.data;
        });
    },
    onOli() {
      console.log(this.consumption);
      this.getOli();
    },
    deilOli() {
      this.consumption = {
        number: "",
        warningdate: ""
      };
      this.getOli();
    },
    //保养到期
    getMaintainList() {
      this.$http
        .post("hw/main/listMaintain", this.$qs.stringify(this.maintain))
        .then(res => {
          console.log(res.data);
          this.maintainList = res.data;
        });
    },
    onMaintain() {
      console.log(this.maintain);
      this.getMaintainList();
    },
    deilMaintain() {
      this.maintain = {
        number: "",
        warningdate: "",
        maintainstatus: ""
      };
      this.getMaintainList();
    },
    //保险到期
    getInsuranceList() {
      this.$http
        .post("hw/main/listMainSafe", this.$qs.stringify(this.insurance))
        .then(res => {
          console.log(res.data);
          this.insuranceList = res.data;
        });
    },
    onInsurance() {
      console.log(this.insurance);
      this.getInsuranceList();
    },
    deilInsurance() {
      this.insurance = {
        number: "",
        warningtime: ""
      };
      this.getInsuranceList();
    },
    //人员超龄
    getOverageList() {
      this.$http
        .post("hw/main/listMainOutage", this.$qs.stringify(this.overage))
        .then(res => {
          console.log(res.data);
          this.overageList = res.data;
        });
    },
    onOverage() {
      console.log(this.overage);
      this.getOverageList();
    },
    deilOverage() {
      this.overage = {
        number: "",
        warningdate: ""
      };
      this.getOverageList();
    },
    //越界
    getTransboundaryList() {
      this.$http
        .post("hw/main/listMainOutArea", this.$qs.stringify(this.transboundary))
        .then(res => {
          console.log(res.data);
          this.transboundaryList = res.data;
        });
    },
    onTransboundary() {
      console.log(this.transboundary);
      this.getTransboundaryList();
    },
    deilTransboundary() {
      this.transboundary = {
        number: "",
        warningdate: ""
      };
      this.getTransboundaryList();
    },
    //停滞超限
    getStagnationList() {
      this.$http
        .post("hw/main/listMainFreeze", this.$qs.stringify(this.stagnation))
        .then(res => {
          console.log(res.data);
          this.stagnationList = res.data;
        });
    },
    onStagnation() {
      console.log(this.stagnation);
      this.getStagnationList();
    },
    deilStagnation() {
      this.stagnation = {
        number: "",
        warningdate: ""
      };
      this.getStagnationList();
    },
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    showadd() {
      console.log("测试");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.bdMap {
  width: 100%;
  height: 100%;
}
.warningTop {
  width: 100%;
  height: 50px;
  .warningText1 {
    float: left;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-left: 20px;
  }
  .warningDate {
    float: right;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-right: 20px;
  }
}
.warningText {
  font-size: 16px;
  font-weight: 700;
  margin-top: 10px;
  padding-left: 20px;
}
.button {
  display: flex;
  font-size: 0;
  color: #fff;
  margin-left: 15px;
  margin-top: 50px;
}
.buttonrow {
  z-index: 800;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  .buttonrowL {
    border-radius: 6px 0 0 6px;
    height: 40px;
    // width: 92px;
    line-height: 40px;
    margin-left: 6px;
    span {
      display: inline-block;
      // margin-left: 10px !important;
      margin-right: 0 !important;
      margin: 0 auto;
    }
  }
  .oneself {
    background-color: #3b99f1;
  }
  .townself {
    background-color: #4eb14e;
  }
  .threeself {
    background-color: #ffb533;
  }
  .fourself {
    background-color: #f66134;
  }
  .fifself {
    background-color: #439dc5;
  }
  .sixself {
    background-color: #f29118;
  }
  .sevenself {
    background-color: #31cab5;
  }
  .buttonrowR {
    border-radius: 0 6px 6px 0;
    height: 40px;
    width: 40px;
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;
    background-color: #fff;
    span {
      margin-left: 8px;
      margin-bottom: 18px;
    }
  }
  .oneselfnew {
    border: 2px solid #3b99f1;
    color: #3b99f1;
  }
  .townselfnew {
    border: 2px solid #4eb14e;
    color: #4eb14e;
  }
  .threeselfnew {
    border: 2px solid #ffb533;
    color: #ffb533;
  }
  .fourselfnew {
    border: 2px solid #f66134;
    color: #f66134;
  }
  .fifselfnew {
    border: 2px solid #439dc5;
    color: #439dc5;
  }
  .sixselfnew {
    border: 2px solid #f29118;
    color: #f29118;
  }
  .sevenselfnew {
    border: 2px solid #31cab5;
    color: #31cab5;
  }
}
.search {
  width: 100%;
  .el-form-item {
    display: inline-block;
    .el-input {
      width: 180px;
      font-size: 13px;
    }
    .selectTop {
      width: 180px;
      font-size: 13px;
    }
  }
}
.Troubleshooting {
  margin-left: 20px;
}
.sytime {
  float: right;
  margin-right: 55px;
  padding-bottom: 10px;
  color: red;
}
.pagination {
  text-align: center;
}
.infoWindow {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: #323232;
  font-size: 14px;
  font-weight: 700;
  width: 316px;
  div {
    margin-top: 15px;
    span {
      font-weight: 400;
      margin-right: 22px;
    }
    a {
      font-weight: 400;
      margin-right: 5px;
      text-decoration: underline;
      color: #3b99f1;
    }
  }
}
.warningPlate {
  display: flex;
}
.plate {
  height: 112px;
  border: 1px solid #2d2d2d;
  border-radius: 5px;
  margin-top: 50px;
  margin-left: 20px;
  display: flex;
  .plateLeft {
    flex: 1;
    img {
      width: 45px;
      height: 48px;
      margin-top: 32px;
      margin-left: 10px;
    }
  }
  .plateRight {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
    .plateRightNumber {
      font-size: 36px !important;
      font-weight: 700;
    }
  }
}
</style>

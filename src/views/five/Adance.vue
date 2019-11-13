<template>
  <!-- 人员考勤 -->
  <div id="bonus">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="searchList">
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="searchList.name"></el-input>
          </el-form-item>
          <el-form-item label="组织架构">
            <el-select v-model="searchList.organ">
              <el-option label="全部区域" value></el-option>
              <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchList.status" class="selectTop">
              <el-option label="全部" value></el-option>
              <el-option v-for="item in optionsStated" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" class="searchtime">
            <el-date-picker
              v-model="searchList.searchtime"
              type="daterange"
              format="yyyy-MM-dd"
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
      <!-- 按钮 -->
      <div class="searchBotLeft">
        <div>
          日期：
          <span class="spanDate">{{shuldData.logtime}}</span> 应到
          <span>{{shuldData.shouldArrive}}</span>人、实到
          <span>{{shuldData.actuallyArrive}}</span>人、正常考勤
          <span>{{shuldData.NormalKaoQin}}</span>人、迟到
          <span>{{shuldData.late}}</span>人、缺卡
          <span>{{shuldData.lackCard}}</span>人、旷工
          <span>{{shuldData.lackWork}}</span>人、早退
          <span>{{shuldData.leaveEarly}}</span>人、请假
          <span>{{shuldData.holiday}}</span>人
        </div>
      </div>
      <div class="searchBot">
        <el-button type="primary" class="buttonBotLast" @click="scheduling = true">排班</el-button>
        <el-button type="primary" class="buttonBotLast" @click="kaoqinList">导出数据</el-button>
      </div>
    </div>
    <!-- 排班弹框 -->
    <el-dialog title="排班" :visible.sync="scheduling" width="1379px">
      <div class="buildButton">
        <el-button type="primary" class="buttonBotLast" @click="schedulingBuild = true">新建班次</el-button>
        <el-button type="primary" class="buttonBotLast" @click="scheduling = false">返回上一级</el-button>
      </div>
      <el-table
        :data="paibanList.slice((currpage - 1) * pagesize, currpage * pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="num" label="序号" width="80px"></el-table-column>
        <el-table-column align="center" prop="name" label="班次名称" width></el-table-column>
        <el-table-column align="center" prop="worktime" label="上下班时间" width></el-table-column>
        <el-table-column align="center" label="休息时间" width>
          <template slot-scope="scope">
            <div v-if="!scope.row.relaxtimeArr">{{scope.row.relaxtime}}</div>
            <div v-for="item in scope.row.relaxtimeArr" :key="item">{{item}}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="effecttime" label="适用时段" width></el-table-column>
        <el-table-column align="center" prop="effectjob" label="适用岗位" width></el-table-column>
        <el-table-column align="center" prop="kqways" label="考勤方式" width></el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width>
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="schedulingEdit(scope.row, scope.$index)"
            >编辑</el-button>
            <el-button
              type="primary"
              size="small"
              @click="schedulingdelete(scope.row, scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 新建班次弹窗 -->
      <el-dialog width="50%" title="新建班次" :visible.sync="schedulingBuild" append-to-body>
        <el-divider></el-divider>
        <el-form :inline="true" :model="shifts" :rules="ruleShifts" ref="refShifts">
          <el-form-item label="班次名称:" prop="name">
            <el-input v-model="shifts.name"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="上班时间:" prop="addtimeout">
              <el-time-select
                v-model="shifts.addtimeout"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="下班时间:" prop="addtimeoff">
              <el-time-select
                v-model="shifts.addtimeoff"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </div>
          <div id="dateItem">
            <el-form-item label="休息时间:" prop="dateone">
              <el-time-select
                v-model="shifts.dateone"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="-" prop="datetown">
              <el-time-select
                v-model="shifts.datetown"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-button type="primary">+增加休息时间</el-button>
          </div>
          <div>
            <span class="dateText">适用日期:</span>
            <el-form-item label="适用时段:" prop="dateArr">
              <el-date-picker
                v-model="shifts.dateArr"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工作日:" class="dateClass" prop="checkList">
              <el-checkbox-group v-model="shifts.checkList">
                <el-checkbox label="周一"></el-checkbox>
                <el-checkbox label="周二"></el-checkbox>
                <el-checkbox label="周三"></el-checkbox>
                <el-checkbox label="周四"></el-checkbox>
                <el-checkbox label="周五"></el-checkbox>
                <el-checkbox label="周六"></el-checkbox>
                <el-checkbox label="周日"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用岗位" prop="effectjob">
              <el-select v-model="shifts.effectjob">
                <el-option label="全部" value></el-option>
                <el-option v-for="item in optionslu" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考勤方式:" class="attendanceMode" prop="location">
              <el-radio-group v-model="shifts.location" class="selectList">
                <div>
                  <el-radio label="GPS定位">
                    <span>GPS定位&nbsp &nbsp 当GPS定位显示进入指定考勤范围时，记录时间作为上班/休息开始时间，当定位显示离开考勤范围时，记录时间作为下班/休息结束时间</span>
                  </el-radio>
                </div>
                <div></div>
                <div>
                  <el-radio label="手机打卡">
                    <span>手机打卡&nbsp &nbsp 当系统将在手机上的第一次打卡记录作为上班时间，最后一次打卡记录作为下班时间，中间打卡记录为休息打卡时间</span>
                  </el-radio>
                </div>
                <div></div>
                <div>
                  <el-radio label="考勤机打卡">
                    <span>考勤机打卡&nbsp &nbsp 当系统将在考勤机上的第一次打卡记录作为上班时间，最后一次打卡记录作为下班时间，中间打卡记录为休息打卡时间</span>
                  </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <span slot="footer" class="dialogLogin">
              <el-button
                type="primary"
                @click="deleteAdd('refShifts')"
                size="small"
                class="butdelete"
              >取消</el-button>
              <el-button type="primary" @click="addAttendance('refShifts')" size="small">确认</el-button>
            </span>
          </div>
        </el-form>
      </el-dialog>
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
        :total="paibanList.length"
      ></el-pagination>
      <!-- 编辑弹框 -->
      <el-dialog width="50%" title="编辑" :visible.sync="editBox" append-to-body>
        <el-divider></el-divider>
        <el-form :inline="true" :model="editBoxList">
          <el-form-item label="班次名称:">
            <el-input v-model="editBoxList.name"></el-input>
          </el-form-item>
          <div>
            <el-form-item label="上班时间:">
              <el-time-select
                v-model="shoptime"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-form-item label="下班时间:">
              <el-time-select
                v-model="updatetime"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
          </div>
          <div id="dateItem">
            <el-form-item label="休息时间:">
              <el-time-select
                v-model="timelet"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>-
              <el-time-select
                v-model="timeout"
                style="width:100px"
                :picker-options="{
                   start: '08:30',
                   step: '00:15',
                   end: '18:30'
                 }"
                placeholder="选择时间"
              ></el-time-select>
            </el-form-item>
            <el-button type="primary">+增加休息时间</el-button>
          </div>
          <div>
            <span class="dateText">适用时段:</span>
            <el-form-item label="适用时段:">
              <el-date-picker
                v-model="editBoxList.effecttimeArr"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="工作日:" class="dateClass">
              <el-checkbox-group v-model="editBoxList.weeklyworkdayArr">
                <el-checkbox label="周一"></el-checkbox>
                <el-checkbox label="周二"></el-checkbox>
                <el-checkbox label="周三"></el-checkbox>
                <el-checkbox label="周四"></el-checkbox>
                <el-checkbox label="周五"></el-checkbox>
                <el-checkbox label="周六"></el-checkbox>
                <el-checkbox label="周日"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="适用岗位">
              <el-select v-model="editBoxList.effectjob">
                <el-option label="全部" value></el-option>
                <el-option v-for="item in optionslu" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="考勤方式:" class="attendanceMode">
              <el-radio-group v-model="editBoxList.kqways" class="selectList">
                <div>
                  <el-radio label="GPS定位">
                    <span>GPS定位&nbsp &nbsp 当GPS定位显示进入指定考勤范围时，记录时间作为上班/休息开始时间，当定位显示离开考勤范围时，记录时间作为下班/休息结束时间</span>
                  </el-radio>
                </div>
                <div></div>
                <div>
                  <el-radio label="手机打卡">
                    <span>手机打卡&nbsp &nbsp 当系统将在手机上的第一次打卡记录作为上班时间，最后一次打卡记录作为下班时间，中间打卡记录为休息打卡时间</span>
                  </el-radio>
                </div>
                <div></div>
                <div>
                  <el-radio label="考勤机打卡">
                    <span>考勤机打卡&nbsp &nbsp 当系统将在考勤机上的第一次打卡记录作为上班时间，最后一次打卡记录作为下班时间，中间打卡记录为休息打卡时间</span>
                  </el-radio>
                </div>
              </el-radio-group>
            </el-form-item>
            <span slot="footer" class="dialogLogin">
              <el-button type="primary" @click="deleteAttendance" size="small" class="butdelete">取消</el-button>
              <el-button type="primary" @click="editAttendance" size="small">确认</el-button>
            </span>
          </div>
        </el-form>
      </el-dialog>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="salaryList.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="logdaytime" label="考勤日期"></el-table-column>
      <el-table-column align="center" prop="name" label="姓名" width></el-table-column>
      <el-table-column align="center" prop="organ" label="组织架构" width></el-table-column>
      <el-table-column align="center" prop="job" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="tel" label="联系方式" width></el-table-column>
      <el-table-column align="center" prop="kqways" label="考勤方式" width></el-table-column>
      <el-table-column align="center" prop="kqlogtime" label="考勤记录" width></el-table-column>
      <el-table-column align="center" prop="picpath" label="现场照片" width>
        <template slot-scope="scope">
          <span
            v-if="scope.row.picpath"
            style="color:blue; cursor:pointer"
            @click="photos(scope.row, scope.$index)"
          >查看照片</span>
          <span v-else-if="!scope.row.picpath" style="color:blue">未上传</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="status" label="状态" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="showdetail(scope.row, scope.$index)">异常处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 图片弹窗 -->
    <el-dialog title="异常处理" :visible.sync="photosView" width="430px">
      <el-form :inline="true" :model="formInline">
        <el-image :src="formInline.picpath" style></el-image>
      </el-form>
    </el-dialog>
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
      :total="salaryList.length"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="异常处理" :visible.sync="dialogFormVisible" width="571px">
      <el-divider></el-divider>
      <el-form :inline="true" :model="formInline">
        <el-form-item label="处理为">
          <el-radio-group v-model="formInline.status">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="请假">请假</el-radio>
            <el-radio label="迟到">迟到</el-radio>
            <el-radio label="早退">早退</el-radio>
            <el-radio label="旷工">旷工</el-radio>
            <el-radio label="加班">加班</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请假">
          <el-input v-model="time" style="width:80px"></el-input>
          <el-select v-model="date" style="width:80px" class="selectTop">
            <el-option label="小时" value></el-option>
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <div>处理后,系统将按正常上下班记录并统计</div>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adddate" class="formButon">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      searchList: {
        name: "",
        organ: "",
        status: "",
        searchtime: ""
      },
      shifts: {
        name: "",
        addtimeout: "",
        addtimeoff: "",
        dateone: "",
        datetown: "",
        dateArr: "",
        checkList: [],
        effectjob: "",
        location: ""
      },
      ruleShifts: {
        name: [{ required: true, message: "请输入排班名称", trigger: "blur" }],
        addtimeout: [
          { required: true, message: "请选择上班时间", trigger: "change" }
        ],
        addtimeoff: [
          { required: true, message: "请选择下班时间", trigger: "change" }
        ],
        dateone: [{ required: true, message: "请选择时间", trigger: "change" }],
        datetown: [
          { required: true, message: "请选择时间", trigger: "change" }
        ],
        dateArr: [{ required: true, message: "请选择日期", trigger: "change" }],
        checkList: [
          { required: true, message: "请选择周期", trigger: "change" }
        ],
        effectjob: [
          { required: true, message: "请选择岗位", trigger: "change" }
        ],
        location: [
          { required: true, message: "请选择定位方式", trigger: "change" }
        ]
      },
      departList: [],
      shoptime: "",
      updatetime: "",
      timelet: "",
      timeout: "",
      editBoxList: {},
      time: "",
      date: "",
      photosView: false,
      editBox: false,
      schedulingBuild: false,
      scheduling: false,
      dialogFormVisible: false,
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
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "1",
          label: "天"
        }
      ],
      optionslu: [],
      optionsStated: [],
      formInline: {},
      salaryList: [],
      shuldData: {},
      paibanList: []
    };
  },
  created() {
    this.getPaibanList();
    this.getSalaryList();
    this.getData();
    this.getOptionsLu();
    this.getOptionsStated();
    this.getDropDepart();
  },
  methods: {
    // 编辑
    schedulingEdit(row, _index) {
      this.editBox = true;
      this.editBoxList = row;
      this.shoptime = row.worktime.split("-")[0];
      this.updatetime = row.worktime.split("-")[1];
      row.relaxtimeArr.forEach(v => {
        this.timelet = v.split("-")[0];
      });
      row.relaxtimeArr.forEach(v => {
        this.timeout = v.split("-")[1];
      });
      row.effecttimeArr = row.effecttime.split("至");
    },
    // 编辑
    editAttendance() {
      let _date = {
        name: this.editBoxList.name,
        worktime: `${this.shoptime}-${this.updatetime}`,
        relaxtime: `${this.timelet}-${this.timeout}`,
        effecttimeArr: this.editBoxList.effecttimeArr,
        weeklyworkday: this.editBoxList.weeklyworkdayArr.join(","),
        effectjob: this.editBoxList.effectjob,
        kqways: this.editBoxList.kqways,
        sid: this.editBoxList.sid
      };
      console.log(_date);
      this.$http
        .post("/hr/kaoqin/paiban/edit", this.$qs.stringify(_date))
        .then(res => {
          this.editBox = false;
          this.getPaibanList();
        });
    },
    //取消编辑
    deleteAttendance() {
      this.editBox = false;
    },
    // 获取排班列表
    getPaibanList() {
      this.$http.post("hr/kaoqin/paiban/list").then(res => {
        console.log(res.data);
        this.paibanList = res.data;
        this.paibanList.forEach(item => {
          if (item.relaxtime.indexOf(",") != -1) {
            item.relaxtimeArr = item.relaxtime.split(",");
          }
          item.relaxtimeArr = new Array(item.relaxtime);
        });
        this.paibanList.forEach(item => {
          if (item.weeklyworkday.indexOf(",") != -1) {
            item.weeklyworkdayArr = item.weeklyworkday.split(",");
          }
        });
        console.log(this.paibanList);
      });
    },
    // 添加排班
    addAttendance(formName) {
      let _date = {
        name: this.shifts.name,
        worktime: `${this.shifts.addtimeout}-${this.shifts.addtimeoff}`,
        relaxtime: `${this.shifts.dateone}-${this.shifts.datetown}`,
        effecttimeArr: this.shifts.dateArr,
        weeklyworkday: this.shifts.checkList.join(","),
        effectjob: this.shifts.effectjob,
        kqways: this.shifts.location
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post("/hr/kaoqin/paiban/add", this.$qs.stringify(_date))
            .then(res => {
              this.schedulingBuild = false;
              this.getPaibanList();
            });
        } else {
          console.log("请填写完整信息");
          return false;
        }
      });
      console.log(_date);
    },
    // 取消排班
    deleteAdd(formName) {
      this.$refs[formName].resetFields();
      // this.shifts =
      // this.schedulingBuild = false;
    },
    //删除
    schedulingdelete(row, _index) {
      this.$http
        .post("/hr/kaoqin/paiban/delete", this.$qs.stringify({ sid: row.sid }))
        .then(res => {
          console.log("操作成功");
          this.getPaibanList();
        });
    },
    // 获取组织架构列表
    getDropDepart() {
      this.$http.post("userInformation/dropDepart").then(res => {
        this.departList = res.data;
        // console.log(res.data)
      });
    },
    //查询
    onSubmit() {
      console.log(this.searchList);
      this.$http
        .post("/hr/kaoqin/search", this.$qs.stringify(this.searchList))
        .then(res => {
          // console.log(res.data);
          this.salaryList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 清空
    onEmpty() {
      this.searchList = {
        name: "",
        organ: "",
        status: "",
        searchtime: ""
      };
      this.getSalaryList();
    },
    // 获取列表
    getSalaryList() {
      this.$http
        .post("/hr/kaoqin/search")
        .then(res => {
          console.log(res.data);
          this.salaryList = res.data;
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    // 导出列表
    kaoqinList() {
      location.href = "http://118.31.245.183:10500/hr/kaoqin/exportExcel";
    },
    //分页
    nextpage(value) {
      this.currpage = value;
    },
    // 数据统计
    getData() {
      this.$http.post("hr/kaoqin/navbar").then(res => {
        // console.log(res.data);
        this.shuldData = res.data;
      });
    },
    //获取组织架构
    getOptionsLu() {
      this.$http.post("/hr/kaoqin/dropBoxOrgan").then(res => {
        // console.log(res.data)
        this.optionslu = res.data;
      });
    },
    //获取状态
    getOptionsStated() {
      this.$http.post("/hr/kaoqin/dropBoxStatus").then(res => {
        // console.log(res.data)
        this.optionsStated = res.data;
      });
    },
    // 异常处理
    adddate() {
      console.log(this.formInline);
      let _date = {
        sid: this.formInline.sid,
        status: this.formInline.status
      };
      this.$http
        .post("/hr/kaoqin/handleError", this.$qs.stringify(_date))
        .then(res => {
          this.dialogFormVisible = false;
          console.log("操作成功");
        });
    },
    //查看图片
    photos(row, _index) {
      //记录数据
      this.formInline = row;
      this.photosView = true;
    },
    showdetail(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
    }
  },
  components: {
    Table
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 120px;
  margin-top: 16px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBotLeft {
    position: absolute;
    bottom: 5px;
    left: 0;
    font-size: 16px;
    span {
      color: #169bd5;
    }
    .spanDate {
      color: #999999;
    }
  }
  .searchBot {
    position: absolute;
    bottom: 5px;
    right: 0;
    .buttonBotLast {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
      margin: 0 0 0 10px;
    }
  }
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
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
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
.buildButton {
  text-align: right;
}
.dateText {
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: 700;
}
.dateClass {
  margin-left: 60px;
}
.attendanceMode {
  .selectList {
    padding: 10px 60px 10px 0;
    width: 680px;
    div {
      padding-bottom: 10px;
      .el-radio {
        position: relative;
        span {
          position: absolute;
          top: 0;
          left: 16px;
          display: inline-block;
          width: 700px;
          white-space: normal;
        }
      }
    }
  }
}
.dialogLogin {
  margin-left: 33%;
  .butdelete {
    margin-right: 100px;
  }
}
</style>

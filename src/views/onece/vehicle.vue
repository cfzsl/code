<template>
  <!-- 车辆监管 -->
  <div id="vehicle">
    <div class="menu">
      <div class="btn">
        <el-button @click="msgse">历史轨迹播放</el-button>
        <el-button @click="msgerr = true">路线异常报警</el-button>
        <el-button @click="msgeslint = true">车况检测和预警</el-button>
        <el-button @click="showmsgedate">车辆考勤和工作量</el-button>
      </div>

      <!-- 弹窗1 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgserach" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-if="mapview">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型" class="searchType">
              <el-select v-model="i" class="selectTop">
                <el-option
                  v-for="item in optionsCar"
                  :key="item.i"
                  :label="item.label"
                  :value="item.i"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业区域" class="searchJob">
              <el-select v-model="job" class="selectTop">
                <el-option
                  v-for="item in listSearch()"
                  :key="item.job"
                  :label="item.label"
                  :value="item.job"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属单位" class="searchWeb">
              <el-select v-model="web" class="selectTop">
                <el-option
                  v-for="item in optionsWeb"
                  :key="item.web"
                  :label="item.label"
                  :value="item.web"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="date" label="记录时间"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    class="buttonSearch"
                    @click.stop="huifang(scope)"
                  >播放轨迹</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 弹窗2 -->
      <el-dialog title="路线异常报警" :visible.sync="msgerr" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="service" label="线路异常情况" width="436px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 弹框3 -->
      <el-dialog
        title="车况检测和报警"
        :visible.sync="msgeslint"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <div class="searchDialogBot">
          <el-button class="buttonBot" @click="showdialog(1)">车况检测报警</el-button>
          <el-button class="buttonBot" @click="showdialog(2)">油耗超标报警</el-button>
          <el-button class="buttonBot" @click="showdialog(3)">车辆保养预警</el-button>
          <el-button class="buttonBotLast" @click="showdialog(4)">保险到期提醒</el-button>
        </div>
        <el-divider class="divider"></el-divider>

        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-if="show == 1">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item label="故障维修结果" class="Troubleshooting">
              <el-select v-model="th" class="selectTop">
                <el-option
                  v-for="item in troublesHooting"
                  :key="item.th"
                  :label="item.label"
                  :value="item.th"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="warning" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="故障信息"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="date" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="troubleshooting" label="故障维修结果" width="239px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-else-if="show == 2">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="oil" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="consumption" label="车辆耗油量（L/100KM）"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-else-if="show == 3">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item label="保养完成情况" class="Troubleshooting">
              <el-select v-model="th" class="selectTop">
                <!-- <el-option
                  v-for="item in troublesHooting"
                  :key="item.th"
                  :label="item.label"
                  :value="item.th"
                ></el-option>-->
                <el-option label="/" value="0"></el-option>
                <el-option label="完成保养" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="maintenance" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="上次保养时间"></el-table-column>
              <el-table-column align="center" prop="maintenance" label="上次保养公里数"></el-table-column>
              <el-table-column align="center" prop="travel" label="已行驶公里数"></el-table-column>
              <el-table-column align="center" prop="excess" label="超限公里数"></el-table-column>
              <el-table-column align="center" prop="driver" label="保养负责人"></el-table-column>
              <el-table-column align="center" prop="fulfill" label="保养完成情况"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-else-if="show == 4">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
            <div class="sytime">系统时间：2019-10-22</div>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="insurance" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="expireday" label="到期剩余天数"></el-table-column>
              <el-table-column align="center" prop="effectivedate" label="生效时间"></el-table-column>
              <el-table-column align="center" prop="expiredate" label="到期时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="负责人"></el-table-column>
              <el-table-column align="center" label="操作">
                <el-button type="warning">报警处理</el-button>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 弹窗4 -->
      <el-dialog
        title="车辆考勤和工作量"
        append-to-body
        :visible.sync="msgedate"
        @close="msg = {}"
        width="70%"
      >
        <div class="searchDialogbtn">
          <el-button class="buttonBot" @click="work()">车辆考勤</el-button>
          <el-button class="buttonBot" @click="total()">车辆工作总量</el-button>
        </div>
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-show="flow">
          <div class="search">
            <el-form-item label="车牌号 鲁E- " class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="运转站" class="Troubleshooting stations">
              <el-select v-model="s" class="selectTop">
                <el-option
                  v-for="item in station"
                  :key="item.s"
                  :label="item.label"
                  :value="item.s"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机" class="Troubleshooting msgnumber">
              <el-input v-model="msg.number" class="TroubleshootingInput"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="Attendance.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="transport" label="转运站"></el-table-column>
              <el-table-column align="center" prop="Clearance" label="垃圾清运次数"></el-table-column>
              <el-table-column align="center" prop="tonnage" label="垃圾清运量（吨）"></el-table-column>
              <el-table-column align="center" label="具体时间">
                <el-button @click="showtime">打卡时间</el-button>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-show="!flow">
          <div>
            <div class="left">
              <div class="leftboder">
                <div class="textone">总司机数（个）</div>
                <div class="texttown">62</div>
              </div>
              <div class="leftboder">
                <div class="textone">转运站数（个）</div>
                <div class="texttown">23</div>
              </div>
              <div class="leftboder">
                <div class="textone">总车辆（个）</div>
                <div class="texttown">62</div>
              </div>
              <div id="main" style="width: 450px;height:200px;"></div>
            </div>
          </div>
        </el-form>
      </el-dialog>

      <!-- 具体时间弹窗 -->
      <el-dialog title="具体时间" width="30%" :visible.sync="time">
        <el-row type="flex" class="row-bg">
          <!-- <el-col :span="12">
            <div class="grid-content bg-purple">司机： 李诞</div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple">车牌号： 鲁E-04D1F</div>
          </el-col>-->
        </el-row>

        <el-table :data="detailtime" style="width: 100%">
          <el-table-column prop="arrivals" label="到达时间"></el-table-column>
          <el-table-column prop="leave" label="离开时间"></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <!-- 百度地图搜索 -->
    <div class="bdMap">
      <div class="mapbox">
        <baidu-map
          class="map"
          :center="{lng: 118.515183, lat:37.478661}"
          :zoom="15"
          :scroll-wheel-zoom="true"
        >
          <bm-marker
            :icon="{url: 'http://47.110.160.217:10071/images000/垃圾运输车big.png', size: {width: 38, height: 30}}"
            :rotation="polylinePathMarker[0].direction"
            :position="polylinePathMarker[0]"
            :dragging="false"
          ></bm-marker>
          <bm-polyline
            :path="polylinePath"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="3"
            :editing="false"
            @lineupdate="updatePolylinePath"
          ></bm-polyline>
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      radio: "0",
      show: 1,
      flow: true,
      mapview: true,
      msgserach: false,
      msgerr: false,
      msgeslint: false,
      msgeslint1: false,
      msgeslint2: false,
      msgeslint3: false,
      mapLine: false,
      msgedate: false,
      time: false,
      input3: "",
      s: "0",
      station: [
        {
          s: "0",
          label: "全部"
        },
        {
          s: "1",
          label: "新泰路生活垃圾中转站"
        },
        {
          s: "2",
          label: "济南路生活垃圾中转站"
        },
        {
          s: "3",
          label: "北二路生活垃圾中转站"
        },
        {
          s: "4",
          label: "牛庄镇生活垃圾中转站"
        },
        {
          s: "5",
          label: "六户镇生活垃圾中转站"
        }
      ],
      th: "0",
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
      i: "0",
      optionsCar: [
        {
          i: "0",
          label: "全部"
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
        }
      ],
      job: "0",
      optionsJob: [
        {
          job: "0",
          label: "全部"
        },
        {
          job: "1",
          label: "东营区新区"
        },
        {
          job: "2",
          label: "文化街道办事处"
        },
        {
          job: "3",
          label: "新店街道办事处"
        },
        {
          job: "4",
          label: "黄河街道办事处"
        },
        {
          job: "5",
          label: "胜利街道办事处"
        },
        {
          job: "6",
          label: "六户镇"
        },
        {
          job: "7",
          label: "牛庄镇"
        },
        {
          job: "8",
          label: "史口镇"
        },
        {
          job: "9",
          label: "龙居镇"
        },
        {
          job: "10",
          label: "庐山路"
        },
        {
          job: "11",
          label: "宁阳路"
        },
        {
          job: "12",
          label: "新泰路"
        },
        {
          job: "13",
          label: "北一路"
        },
        {
          job: "14",
          label: "北二路"
        },
        {
          job: "15",
          label: "黄河路"
        },
        {
          job: "16",
          label: "龙居镇"
        },
        {
          job: "17",
          label: "淄博路"
        },
        {
          job: "18",
          label: "济南路"
        },
        {
          job: "19",
          label: "中转站1"
        },
        {
          job: "20",
          label: "中转站2"
        }
      ],
      optionsJob23: [
        {
          job: "0",
          label: "全部"
        },
        {
          job: "1",
          label: "东营区新区"
        },
        {
          job: "2",
          label: "文化街道办事处"
        },
        {
          job: "3",
          label: "新店街道办事处"
        },
        {
          job: "4",
          label: "黄河街道办事处"
        },
        {
          job: "5",
          label: "胜利街道办事处"
        },
        {
          job: "6",
          label: "六户镇"
        },
        {
          job: "7",
          label: "牛庄镇"
        },
        {
          job: "8",
          label: "史口镇"
        },
        {
          job: "9",
          label: "龙居镇"
        },
        {
          job: "10",
          label: "庐山路"
        },
        {
          job: "11",
          label: "宁阳路"
        },
        {
          job: "12",
          label: "新泰路"
        },
        {
          job: "13",
          label: "北一路"
        },
        {
          job: "14",
          label: "北二路"
        },
        {
          job: "15",
          label: "黄河路"
        },
        {
          job: "16",
          label: "龙居镇"
        },
        {
          job: "17",
          label: "淄博路"
        },
        {
          job: "18",
          label: "济南路"
        }
      ],
      optionsJob1: [
        {
          job: "0",
          label: "中转站1"
        },
        {
          job: "1",
          label: "中转站2"
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
      msg: {
        number: ""
      },
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      timer: null,
      polylinePath: [{ lng: "", lat: "", direction: 0 }],
      polylinePathMarker: [{ lng: "", lat: "", direction: 0 }],
      num: 0.001,
      // 故障代码
      warning: [
        {
          number: 1,
          type: "垃圾运输车",
          carbrand: "鲁E-559F3",
          date: "2012-11-21",
          num: "环卫-A001",
          company: "发动机故障",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2012-11-20",
          policeTime: "08:00",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 2,
          type: "垃圾运输车",
          carbrand: "鲁E-37588",
          date: "2010-09-11",
          num: "环卫-A001",
          company: "手刹故障",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2010-09-10",
          policeTime: "15:30",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 3,
          type: "垃圾运输车",
          carbrand: "鲁E-A3250",
          date: "2009-01-15",
          num: "环卫-A001",
          company: "水温过高",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2009-01-14",
          policeTime: "18:55",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 4,
          type: "垃圾运输车",
          carbrand: "鲁E-325AA",
          date: "2009-05-20",
          num: "环卫-A001",
          company: "机油报警",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2009-05-19",
          policeTime: "10:12",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        }
      ],
      // 油耗
      oil: [
        {
          id: 1,
          carbrand: "鲁E-259X3",
          consumption: "35 (标准值 ≤ 25)",
          policeDate: "2019-07-15",
          policeTime: "08:00"
        },
        {
          id: 2,
          carbrand: "鲁E-996D5",
          consumption: "30 (标准值 ≤ 25)",
          policeDate: "2019-08-20",
          policeTime: "15:25"
        },
        {
          id: 3,
          carbrand: "鲁E-783F6",
          consumption: "26 (标准值 ≤ 25)",
          policeDate: "2019-10-11",
          policeTime: "10:35"
        }
      ],
      // 保养
      maintenance: [
        {
          id: 1,
          carbrand: "鲁E-859Q9",
          policeDate: "2019-10-07",
          maintenance: 37850,
          travel: 37980,
          excess: 130,
          driver: "李诞",
          fulfill: "2019-10-08完成保养"
        },
        {
          id: 2,
          carbrand: "鲁E-B5277",
          policeDate: "2019-01-08",
          maintenance: 25800,
          travel: 36200,
          excess: 400,
          driver: "李诞",
          fulfill: "2019-01-09完成保养"
        },
        {
          id: 3,
          carbrand: "鲁E-589A5",
          policeDate: "2011-10-09",
          maintenance: 25600,
          travel: 35900,
          excess: 300,
          driver: "李诞",
          fulfill: "2011-10-10完成保养"
        }
      ],
      // 保险
      insurance: [
        {
          id: 1,
          carbrand: "鲁E-594D3",
          expireday: 2,
          effectivedate: "2018-10-20",
          expiredate: "2019-10-20",
          driver: "李诞"
        },
        {
          id: 2,
          carbrand: "鲁E-668D5",
          expireday: 0,
          effectivedate: "2017-10-20",
          expiredate: "2018-10-20",
          driver: "李诞"
        },

        {
          id: 3,
          carbrand: "鲁E-294F3",
          expireday: 0,
          effectivedate: "2016-10-20",
          expiredate: "2017-10-20",
          driver: "李诞"
        }
      ],
      // 考勤
      Attendance: [
        {
          id: 1,
          carbrand: "鲁E-859QQ",
          company: "环卫",
          driver: "李诞",
          phone: 15375669845,
          transport: "新泰路生活垃圾中转站",
          Clearance: 3,
          tonnage: 5
        },
        {
          id: 2,
          carbrand: "鲁E-213AD",
          company: "环卫",
          driver: "张兆",
          phone: 15065667823,
          transport: "济南路生活垃圾中转站",
          Clearance: 3,
          tonnage: 8
        }
      ],
      // 抵达时间
      detailtime: [
        {
          arrivals: "05:50",
          leave: "06:00"
        },
        {
          arrivals: "07:00",
          leave: "07:09"
        },
        {
          arrivals: "08:10",
          leave: "08:20"
        }
      ]
    };
  },
  created() {
    this.getpolyline();
    this.date();
  },
  mounted() {},
  methods: {
    showmsgedate() {
      this.msgedate = !this.msgedate;
    },
    drawBar() {},
    showtime() {
      this.time = !this.time;
    },
    showdialog(v) {
      this.show = v;
    },
    focus(e) {
      console.log(e.target);
      console.log(this);
    },
    getpolyline() {
      this.$http.get("xy/demo").then(res => {
        this.polylinePath = res.data;
        this.polylinePathMarker = res.data;
      });
    },
    huifang() {
      this.$http.get("xy/demo").then(res => {
        this.polylinePathMarker = res.data;
      });
      clearInterval(this.timer);
      this.msgserach = !this.msgserach;
      this.timer = setInterval(() => {
        if (this.polylinePathMarker.length != 1) {
          this.polylinePathMarker.splice(0, 1);
        } else if (this.polylinePathMarker.length == 1) {
          clearInterval(this.timer);
        }
      }, 500);
    },
    draw({ el, BMap, map }) {
      let lng = this.polylinePath[0].lng;
      let lat = this.polylinePath[0].lat;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x + "px";
      el.style.top = pixel.y + "px";
    },
    msgse() {
      this.msgserach = !this.msgserach;
    },
    work() {
      this.flow = true;
    },
    total() {
      this.flow = false;
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["10~20车", "20~30车", "30~40车"]
        },
        series: [
          {
            name: "转运辆数/天",
            type: "pie",
            radius: ["55%", "70%"],
            center: ["50%", "60%"],
            data: [
              { value: 18, name: "10~20车" },
              { value: 59, name: "20~30车" },
              { value: 13, name: "30~40车" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    listSearch() {
      if (this.i == 0) {
        return this.optionsJob;
      } else if (this.i == 2 || this.i == 3) {
        return this.optionsJob23;
      } else if (this.i == 1) {
        return this.optionsJob1;
      }
    },
    onSubmit() {},
    showadd() {},
    handleEdit(_index, row) {
      this.msgserach = false;
      this.mapLine = true;
    },
    searchMap() {
      console.log("百度地图搜索");
    },
    nextpage() {},
    date() {
      for (let i = 1; i < 2; i++) {
        this.data.list.push({
          sid: i,
          number: i,
          type: "垃圾运输车",
          carbrand: "鲁E-563D3",
          date: "2011.10.20",
          num: "环卫-A001",
          company: "环卫",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeTime: "2011.10.20",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "未维修"
        });
      }
    },
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.menu {
  padding: 16px 0;
  height: 60px;
  position: relative;
  .filter {
    position: absolute;
    top: 50%;
    float: left;
    transform: translateY(-50%);
  }
  .btn {
    float: right;
    height: 25px;
  }
}
.divider {
  margin: 0 0 16px 0;
}
.buttonSearch {
  font-size: 13px;
  color: rgba(121, 121, 121, 1);
  width: 112px;
  height: 29px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(121, 121, 121, 1);
  border-radius: 5px;
}
.el-dialog__body {
  padding: 0 20px;
}
.bdMap {
  .map {
    position: relative;
    width: 100%;
    height: 800px;
    .input-with-select {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 309px;
    }
  }
}
.search {
  width: 100%;
  height: 50px;
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
    .msgButton {
      width: 80px;
      .button {
        width: 100px;
      }
    }
  }
}

.pagination {
  margin-left: 45%;
}

.Troubleshooting {
  margin-left: 20px;
}
.elDialogtitle {
  font-family: ".AppleSystemUIFont";
  font-weight: 400;
  font-style: normal;
  font-size: 17px;
  color: #000000;
}
.searchDialogBot {
  margin-left: 800px;
  margin-bottom: 10px;
}
.searchDialogbtn {
  margin-left: 1000px;
  margin-bottom: 10px;
}
.stations {
  margin-left: 0;
}
.msgnumber {
  margin-left: 0;
}
.left {
  margin-top: 50px;
  margin-left: 20px;
  width: 100%;
  height: 200px;
  .leftboder {
    float: left;
    width: 175px;
    height: 155px;
    margin-right: 30px;
    .textone {
      width: 175px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 13px;
      background: inherit;
      background-color: rgba(242, 242, 242, 1);
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(204, 204, 204, 1);
    }
    .texttown {
      width: 175px;
      height: 155px;
      background: inherit;
      background-color: rgba(255, 255, 255, 1);
      border-top: 0px;
      font-size: 32px;
      line-height: 155px;
      text-align: center;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: rgba(204, 204, 204, 1);
      border-radius: 0px;
      font-weight: 700;
    }
  }
  #main {
    float: right;
    margin-right: 50px;
  }
}

.mapbox {
  height: 100%;
  .bf,
  .hf {
    position: fixed;
    width: 150px;
    height: 50px;
    top: 100px;
    background-color: #fff;
  }
  .bf {
    right: 100px;
  }
  .hf {
    top: 150px;
    left: 300px;
  }
}
.map {
  position: relative;
  height: 100%;
  .BMap_cpyCtrl {
    display: none !important;
  }
  .anchorBL {
    display: none !important;
  }
}

.BMap_Marker {
  width: 20px;
  height: 20px;
}
.chart {
  float: right;
}
.sytime {
  float: right;
  margin-right: 55px;
  padding-bottom: 10px;
  color: red;
}
</style>

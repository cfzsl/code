<template>
  <!-- 车辆监管 -->
  <div id="vehicle">
    <div class="menu">
      <div class="btn">
        <el-button @click="msgse();">历史轨迹播放</el-button>
        <el-button @click="abnormalroute();msgerr = !msgerr;">路线异常报警</el-button>
        <el-button @click="showmsgeslint();msgeslint = !msgeslint;">车况检测和预警</el-button>
        <el-button @click="showmsgedate();msgedate = !msgedate;">车辆考勤和工作量</el-button>
      </div>

      <!-- 历史轨迹播放弹窗 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgserach" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="history" label-width="auto" class="msg" v-if="mapview">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="history.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型" class="searchType">
              <el-select v-model="history.search.cartype" class="selectTop">
                <el-option
                  v-for="(item, i) in optionsCar"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业区域" class="searchJob">
              <el-select v-model="history.search.area" class="selectTop">
                <el-option
                  v-for="(item, i) in listSearch()"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属单位" class="searchWeb">
              <el-select v-model="history.search.depart" class="selectTop">
                <el-option
                  v-for="(item, i) in optionsWeb"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>

          <div class="list">
            <el-table
              :data="history.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
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
              :total="history.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 路线异常报警弹窗 -->
      <el-dialog title="路线异常报警" :visible.sync="msgerr" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="route" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="route.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker
                v-model="route.search.param4"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="abnormalroute" class="button">查询</el-button>
            </el-form-item>
          </div>

          <div class="list">
            <el-table
              :data="route.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="department" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="param3" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="param4" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="service" label="线路异常情况" width="436px">
                <template slot-scope="scope">超出原定区域：{{ scope.row.area }}</template>
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
              :total="route.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 车况检测报警弹框 -->
      <el-dialog :title="dialog3" :visible.sync="msgeslint" width="70%" class="elDialog">
        <div class="searchDialogBot">
          <el-button class="buttonBot" @click="showdialog(1,'车况检测报警')">车况检测报警</el-button>
          <el-button class="buttonBot" @click="showdialog(2,'油耗超标报警')">油耗超标报警</el-button>
          <el-button class="buttonBot" @click="showdialog(3,'车辆保养预警')">车辆保养预警</el-button>
          <el-button class="buttonBotLast" @click="showdialog(4,'保险到期提醒')">保险到期提醒</el-button>
        </div>
        <el-divider class="divider"></el-divider>

        <el-form ref="form" :model="detection" label-width="auto" class="msg" v-if="show == 1">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="detection.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="detection.search.warmingtime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="故障维修结果" class="Troubleshooting">
              <el-select v-model="detection.search.result" class="selectTop">
                <el-option
                  v-for="(item,i) in troublesHooting"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="showmsgeslint" class="button">查询</el-button>
            </el-form-item>
          </div>

          <div class="list">
            <el-table
              :data="detection.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="faultinformation" label="故障信息"></el-table-column>
              <el-table-column align="center" prop="warmingtime" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="repairperson" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="repairtime" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="result" label="故障维修结果" width="239px"></el-table-column>
            </el-table>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="detection.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form ref="form" :model="oil" label-width="auto" class="msg" v-else-if="show == 2">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="oil.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="oil.search.warmingtime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="showdialog(2)" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="oil.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="gasolineused" label="车辆耗油量（L/100KM）"></el-table-column>
              <el-table-column align="center" prop="warmingtime" label="报警日期"></el-table-column>
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
              :total="oil.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form
          ref="form"
          :model="maintenance"
          label-width="auto"
          class="msg"
          v-else-if="show == 3"
        >
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="maintenance.search.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="maintenance.search.opreatetime"
                type="date"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="保养完成情况" class="Troubleshooting">
              <el-select v-model="maintenance.search.complete" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option label="完成保养" value="完成保养"></el-option>
                <el-option label="未完成保养" value="未完成保养"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="maintenance.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="opreatetime" label="上次保养时间"></el-table-column>
              <el-table-column align="center" prop="param2" label="上次保养公里数"></el-table-column>
              <el-table-column align="center" prop="param3" label="已行驶公里数"></el-table-column>
              <el-table-column align="center" prop="param4" label="超限公里数"></el-table-column>
              <el-table-column align="center" prop="dutyoffice" label="保养负责人"></el-table-column>
              <el-table-column align="center" prop="param5" label="保养完成情况"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="maintenance.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>

        <el-form ref="form" :model="insurance" label-width="auto" class="msg" v-else-if="show == 4">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="insurance.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="insurance.search.bxtimewarng"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="showdialog(4)" class="button">查询</el-button>
            </el-form-item>
            <div class="sytime">系统时间：2019-10-13</div>
          </div>
          <div class="list">
            <el-table
              :data="insurance.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="days" label="到期剩余天数"></el-table-column>
              <el-table-column align="center" prop="bxtime" label="生效时间"></el-table-column>
              <el-table-column align="center" prop="bxtimewarng" label="到期时间"></el-table-column>
              <el-table-column align="center" prop="opreateperson" label="负责人"></el-table-column>
              <el-table-column align="center" label="操作">
                <el-button type="warning">报警处理</el-button>
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
              :total="insurance.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>

      <!-- 车辆考勤和工作量弹窗 -->
      <el-dialog title="车辆考勤和工作量" append-to-body :visible.sync="msgedate" width="70%">
        <div class="searchDialogbtn">
          <el-button class="buttonBot" @click="work()">车辆考勤</el-button>
          <el-button class="buttonBot" @click="total()">车辆工作总量</el-button>
        </div>

        <el-form ref="form" :model="attendance" label-width="auto" class="msg" v-show="flow">
          <div class="search">
            <el-form-item label="车牌号 鲁E- " class="searchInput">
              <el-input v-model="attendance.search.busnumber" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="运转站" class="Troubleshooting stations">
              <el-select v-model="attendance.search.transferspoint" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option v-for="(item, i) in station" :key="i" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="司机" class="Troubleshooting msgnumber">
              <el-input v-model="attendance.search.users" class="TroubleshootingInput"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker
                v-model="attendance.search.datetime"
                type="date"
                placeholder
                value-format="yyyy-MM-dd"
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="showmsgedate" class="button">查询</el-button>
            </el-form-item>
          </div>

          <div class="list">
            <el-table
              :data="attendance.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="depart" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="datetime" label="日期"></el-table-column>
              <el-table-column align="center" prop="users" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="transferspoint" label="转运站"></el-table-column>
              <el-table-column align="center" prop="count" label="垃圾清运次数"></el-table-column>
              <el-table-column align="center" prop="weight" label="垃圾清运量（吨）"></el-table-column>
              <el-table-column align="center" label="具体时间">
                <template slot-scope="scope">
                  <el-button @click="showtime(scope.row)">打卡时间</el-button>
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
              :total="attendance.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
        <el-form ref="form" label-width="auto" class="msg" v-show="!flow">
          <div>
            <div class="left">
              <div class="leftboder">
                <div class="textone">总司机数（个）</div>
                <div class="texttown">{{ this.totalWork.left.userNumber }}</div>
              </div>
              <div class="leftboder">
                <div class="textone">转运站数（个）</div>
                <div class="texttown">{{ this.totalWork.left.pointNumber }}</div>
              </div>
              <div class="leftboder">
                <div class="textone">总车辆（个）</div>
                <div class="texttown">{{ this.totalWork.left.userNumber }}</div>
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
          <el-table-column prop="arrive" label="到达时间"></el-table-column>
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
            v-if="history.marker"
            :icon="history.icon"
            :position="polylinePathMarker"
            :dragging="false"
          ></bm-marker>
          <bm-polyline
            :path="polylinePath"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="3"
            :editing="false"
          ></bm-polyline>
          <bml-lushu
            :path="polylinePath"
            :icon="history.icon"
            :play="history.play"
            :speed="history.speed"
            :rotation="true"
          ></bml-lushu>
        </baidu-map>
      </div>
    </div>
  </div>
</template>
<script>
import { BmlLushu } from "vue-baidu-map";
var echarts = require("echarts");
export default {
  components: {
    BmlLushu
  },
  data() {
    return {
      // 车况检测标题切换
      dialog3: "车况检测报警",
      // 弹框分页
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
      // 历史轨迹
      history: {
        search: {
          busnumber: "",
          cartype: "",
          area: "",
          depart: ""
        },
        list: [
          {
            sid: 1,
            number: 1,
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
          }
        ],
        icon: {
          url: "http://118.31.245.183:10500/images000/垃圾运输车big.png",
          size: { width: 38, height: 30 }
        },
        play: false,
        speed: 2000,
        marker: true
      },
      // 历史轨迹定时器
      timer: null,
      // 历史轨迹回放
      polylinePath: [{ lng: "", lat: "" }],
      polylinePathMarker: [{ lng: "", lat: "" }],
      // 历史轨迹下拉框
      optionsCar: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "垃圾清运车",
          label: "垃圾清运车"
        },
        {
          value: "清扫车",
          label: "清扫车"
        },
        {
          value: "洒水车",
          label: "洒水车"
        }
      ],
      optionsJob: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "东营区新区",
          label: "东营区新区"
        },
        {
          value: "文化街道办事处",
          label: "文化街道办事处"
        },
        {
          value: "新店街道办事处",
          label: "新店街道办事处"
        },
        {
          value: "黄河街道办事处",
          label: "黄河街道办事处"
        },
        {
          value: "胜利街道办事处",
          label: "胜利街道办事处"
        },
        {
          value: "六户镇",
          label: "六户镇"
        },
        {
          value: "牛庄镇",
          label: "牛庄镇"
        },
        {
          value: "8",
          label: "史口镇"
        },
        {
          value: "龙居镇",
          label: "龙居镇"
        },
        {
          value: "庐山路",
          label: "庐山路"
        },
        {
          value: "宁阳路",
          label: "宁阳路"
        },
        {
          value: "新泰路",
          label: "新泰路"
        },
        {
          value: "北一路",
          label: "北一路"
        },
        {
          value: "北二路",
          label: "北二路"
        },
        {
          value: "黄河路",
          label: "黄河路"
        },
        {
          value: "龙居镇",
          label: "龙居镇"
        },
        {
          value: "淄博路",
          label: "淄博路"
        },
        {
          value: "济南路",
          label: "济南路"
        },
        {
          value: "中转站1",
          label: "中转站1"
        },
        {
          value: "中转站2",
          label: "中转站2"
        }
      ],
      optionsJob23: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "东营区新区",
          label: "东营区新区"
        },
        {
          value: "文化街道办事处",
          label: "文化街道办事处"
        },
        {
          value: "新店街道办事处",
          label: "新店街道办事处"
        },
        {
          value: "黄河街道办事处",
          label: "黄河街道办事处"
        },
        {
          value: "胜利街道办事处",
          label: "胜利街道办事处"
        },
        {
          value: "六户镇",
          label: "六户镇"
        },
        {
          value: "牛庄镇",
          label: "牛庄镇"
        },
        {
          value: "史口镇",
          label: "史口镇"
        },
        {
          value: "龙居镇",
          label: "龙居镇"
        },
        {
          value: "庐山路",
          label: "庐山路"
        },
        {
          value: "宁阳路",
          label: "宁阳路"
        },
        {
          value: "新泰路",
          label: "新泰路"
        },
        {
          value: "北一路",
          label: "北一路"
        },
        {
          value: "北二路",
          label: "北二路"
        },
        {
          value: "黄河路",
          label: "黄河路"
        },
        {
          value: "龙居镇",
          label: "龙居镇"
        },
        {
          value: "淄博路",
          label: "淄博路"
        },
        {
          value: "济南路",
          label: "济南路"
        }
      ],
      optionsJob1: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "中转站1",
          label: "中转站1"
        },
        {
          value: "中转站2",
          label: "中转站2"
        }
      ],
      optionsWeb: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "环卫一部",
          label: "环卫一部"
        },
        {
          value: "环卫二部",
          label: "环卫二部"
        },
        {
          value: "环卫三部",
          label: "环卫三部"
        },
        {
          value: "环卫四部",
          label: "环卫四部"
        }
      ],
      // 路线异常
      route: {
        search: {
          busnumber: "",
          param4: ""
        },
        list: []
      },
      // 车况检测
      detection: {
        search: {
          busnumber: "",
          date: "",
          result: ""
        },
        list: [
          {
            number: 1,
            type: "垃圾运输车",
            carbrand: "鲁E-559F3",
            date: "2019-10-20",
            num: "环卫-A001",
            company: "发动机故障",
            driver: "张毅",
            phone: "15375669845",
            region: "东营南站",
            policeDate: "2019-10-21",
            policeTime: "08:00",
            service: "超出原定使用区域：东营区东营南站",
            troubleshooting: "未处理"
          },
          {
            number: 2,
            type: "垃圾运输车",
            carbrand: "鲁E-37588",
            date: "2019-10-15",
            num: "环卫-A001",
            company: "手刹故障",
            driver: "张毅",
            phone: "15375669845",
            region: "东营南站",
            policeDate: "2019-10-16",
            policeTime: "15:30",
            service: "超出原定使用区域：东营区东营南站",
            troubleshooting: "未处理"
          },
          {
            number: 3,
            type: "垃圾运输车",
            carbrand: "鲁E-A3250",
            date: "2019-10-18",
            num: "环卫-A001",
            company: "水温过高",
            driver: "张毅",
            phone: "15375669845",
            region: "东营南站",
            policeDate: "2019-10-19",
            policeTime: "18:55",
            service: "超出原定使用区域：东营区东营南站",
            troubleshooting: "未处理"
          },
          {
            number: 4,
            type: "垃圾运输车",
            carbrand: "鲁E-325AA",
            date: "2019-10-20",
            num: "环卫-A001",
            company: "机油报警",
            driver: "张毅",
            phone: "15375669845",
            region: "东营南站",
            policeDate: "2019-10-22",
            policeTime: "10:12",
            service: "超出原定使用区域：东营区东营南站",
            troubleshooting: "未处理"
          }
        ]
      },
      // 车况下拉框
      troublesHooting: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "已维修",
          label: "已维修"
        },
        {
          value: "未维修",
          label: "未维修"
        }
      ],
      // 油耗信息
      oil: {
        search: {
          busnumber: "",
          date: ""
        },
        list: []
      },
      // 保养预警
      maintenance: {
        search: {
          busnumber: "",
          date: "",
          complete: ""
        },
        list: [
          {
            id: 1,
            carbrand: "鲁E-859Q9",
            policeDate: "2019-10-07",
            maintenance: 27850,
            travel: 37980,
            excess: 130,
            driver: "李诞",
            fulfill: "未保养"
          },
          {
            id: 2,
            carbrand: "鲁E-B5277",
            policeDate: "2019-01-08",
            maintenance: 25800,
            travel: 36200,
            excess: 400,
            driver: "李诞",
            fulfill: "未保养"
          },
          {
            id: 3,
            carbrand: "鲁E-589A5",
            policeDate: "2011-10-09",
            maintenance: 25600,
            travel: 35900,
            excess: 300,
            driver: "李诞",
            fulfill: "未保养"
          }
        ]
      },
      // 保险到期
      insurance: {
        search: {
          busnumber: "",
          date: ""
        },
        list: [
          {
            id: 1,
            carbrand: "鲁E-594D3",
            expireday: 30,
            effectivedate: "2018-11-13",
            expiredate: "2019-11-12",
            driver: "李诞"
          },
          {
            id: 2,
            carbrand: "鲁E-668D5",
            expireday: 35,
            effectivedate: "2018-10-28",
            expiredate: "2019-10-27",
            driver: "李诞"
          },

          {
            id: 3,
            carbrand: "鲁E-294F3",
            expireday: 7,
            effectivedate: "2018-10-20",
            expiredate: "2019-10-19",
            driver: "李诞"
          }
        ]
      },
      // 车辆考勤
      attendance: {
        search: {
          busnumber: "",
          datetime: "",
          user: "",
          transferspoint: ""
        },
        list: [
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
        ]
      },
      // 车辆考勤下拉框
      station: [
        {
          value: "",
          label: "全部"
        }
      ],
      // 车辆考勤打卡时间
      detailtime: [],
      // 车辆考勤工作总量
      totalWork: {
        left: {},
        right: []
      },
      // 弹出层切换
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
      test: []
    };
  },
  created() {
    this.getpolyline();
    this.getDropDown();
  },
  mounted() {},
  methods: {
    // 考勤列表
    showmsgedate() {
      this.$http
        .post(
          "manage/transferAttendanceCriteriaQuery",
          this.$qs.stringify(this.attendance.search)
        )
        .then(res => {
          this.attendance.list = res.data;
        });
    },
    // 考勤打卡
    showtime(row) {
      this.time = !this.time;
      this.$http
        .post(
          "manage/getTransferAttendanceTime",
          this.$qs.stringify({
            busnumber: row.busnumber,
            datetime: row.datetime
          })
        )
        .then(res => {
          this.detailtime = res.data;
        });
    },
    // 显示车况检测
    showmsgeslint() {
      this.$http
        .post(
          "manage/carConditionCriteriaQuery",
          this.$qs.stringify(this.detection.search)
        )
        .then(res => {
          console.log(res.data);
          this.detection.list = res.data;
        });
    },
    // 车况检测切换
    showdialog(v, title) {
      this.show = v;
      this.dialog3 = title;
      switch (v) {
        case 1:
          this.$http.get("manage/carConditionCriteriaQuery").then(res => {
            console.log(res.data);
            this.detection.list = res.data;
          });
          break;
        case 2:
          this.$http
            .post(
              "manage/youHaoCriteriaQuery",
              this.$qs.stringify(this.oil.search)
            )
            .then(res => {
              console.log(res.data);
              this.oil.list = res.data;
            });
          break;
        case 3:
          this.$http.get("manage/baoYangCriteriaQuery").then(res => {
            console.log(res.data);
            this.maintenance.list = res.data;
          });
          break;
        case 4:
          this.$http
            .post(
              "manage/baoXianCriteriaQuery",
              this.$qs.stringify(this.insurance.search)
            )
            .then(res => {
              console.log(res.data);
              this.insurance.list = res.data;
            });
          break;
      }
    },
    // 历史轨迹获取
    getpolyline() {
      this.$http.get("xy/demo").then(res => {
        this.polylinePath = res.data;
        this.polylinePathMarker = res.data[0];
      });
    },
    // 回放
    huifang() {
      this.getpolyline();
      this.history.marker = false;
      this.history.play ? "不进行操作" : (this.history.play = true);
      this.msgserach = !this.msgserach;
    },
    // 渲染地图
    // draw({ el, BMap, map }) {
    //   let lng = this.polylinePath[0].lng;
    //   let lat = this.polylinePath[0].lat;
    //   const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
    //   el.style.left = pixel.x + "px";
    //   el.style.top = pixel.y + "px";
    // },
    // 历史轨迹显示
    msgse() {
      this.msgserach = !this.msgserach;
    },
    // 考勤切换
    work() {
      this.flow = true;
    },
    // 考勤工作量切换
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
      this.$http.get("manage/getTransfersPointNumberAndUser").then(res => {
        this.totalWork.left = res.data
      });
    },
    // 切换作业区域
    listSearch() {
      if (this.history.search.cartype === "") {
        return this.optionsJob;
      } else if (
        this.history.search.cartype === "清扫车" ||
        this.history.search.cartype === "洒水车"
      ) {
        return this.optionsJob23;
      } else if (this.history.search.cartype === "垃圾清运车") {
        return this.optionsJob1;
      }
    },
    // 查询按钮
    onSubmit() {},
    // 路线异常
    abnormalroute() {
      this.$http
        .post(
          "manage/roadExceptionWarmingCriteriaQuery",
          this.$qs.stringify(this.route.search)
        )
        .then(res => {
          this.route.list = res.data;
        });
    },
    // 路线异常查询
    searchroute() {
      this.$http
        .post(
          "manage/roadExceptionWarmingCriteriaQuery",
          this.$qs.stringify(this.route.search)
        )
        .then(res => {
          this.route.list = res.data;
        });
    },
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 下拉框获取
    getDropDown() {
      this.$http.get("manage/getTransfersPoints").then(res => {
        this.station = res.data;
        console.log(res);
      });
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

.msg {
  overflow: hidden;
  .pagination {
    margin-top: 10px;
    float: right;
  }
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
      height: 150px;
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
.red {
  color: red;
}
.hede {
  color: #000;
}
</style>

<template>
  <!-- 环卫日常监管 -->
  <div id="vehicle">
    <div class="menu">
      <div class="btn">
        <el-button @click="showClc">环卫三轮车</el-button>
        <el-button @click="showMap">道路监控</el-button>
        <el-button @click="serachend">历史轨迹追溯</el-button>
        <el-button @click="msgerr = true">越界报警</el-button>
        <el-button @click="msgeslint = true">停滞超限预警</el-button>
        <el-button @click="msgedate = true">日常考勤</el-button>
      </div>
      <!-- 道路监控弹框 -->
      <el-dialog title="道路监控" :visible.sync="monitoring" @close="msg = {}" width="70%">
        <video-player
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="videoOption"
        ></video-player>
      </el-dialog>
      <!-- 历史轨迹播放弹窗1 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgserach" @close="msgser = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msgser" label-width="auto" class="msg" v-if="mapview">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msgser.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="车辆类型" class="searchType">
              <el-select v-model="msgser.type" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in optionsCar"
                  :key="item.i"
                  :label="item.type"
                  :value="item.type"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="作业区域" class="searchJob">
              <el-select v-model="msgser.area" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in listSearch()"
                  :key="item.job"
                  :label="item.area"
                  :value="item.area"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="归属单位" class="searchWeb">
              <el-select v-model="msgser.depart" class="selectTop">
                <el-option label="全部" value></el-option>
                <el-option
                  v-for="item in optionsWeb"
                  :key="item.web"
                  :label="item.depart"
                  :value="item.depart"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onHistorical" class="button">查询</el-button>
              <el-button type="primary" @click="deilHistorical" class="button">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="Historical.slice((currpage - 1) * pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="depart" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="logtime" label="记录时间"></el-table-column>
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
          <el-pagination
            class="paginationList"
            background
            @prev-click="nextpage"
            @next-click="nextpage"
            @current-change="nextpage"
            :page-sizes="[10,20,30,40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="Historical.length"
          ></el-pagination>
        </el-form>
      </el-dialog>
      <!-- 弹窗2 -->
      <el-dialog title="越界报警" :visible.sync="msgerr" @close="searchTransboundary = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="searchTransboundary" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="searchTransboundary.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="searchTransboundary.logtime" type="date" value-format='yyyy-MM-dd' placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onTransboundary" class="button">查询</el-button>
              <el-button type="primary" @click="deilTransboundary" class="button">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="Transboundary.slice((currpage - 1) * pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="sid" label="序号"></el-table-column>
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="depart" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="logtime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="warninginfo" label="线路异常情况" width="436px"></el-table-column>
            </el-table>
          </div>
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
            :total="Transboundary.length"
          ></el-pagination>
        </el-form>
      </el-dialog>
      <!-- 弹框3 -->
      <el-dialog
        title="停滞超限预警"
        :visible.sync="msgeslint"
        @close="stagnation = {}"
        width="70%"
        class="elDialog"
      >
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="stagnation" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="stagnation.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker
                v-model="stagnation.logdate"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder
                class="msgDatePicker"
              ></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onStagnation" class="button">查询</el-button>
              <el-button type="primary" @click="deilStagnation" class="button">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="stagnationList.slice((currpage - 1) * pagesize, currpage * pagesize)"
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
              <el-table-column align="center" prop="logtime" label="报警时间" width="200px"></el-table-column>
            </el-table>
          </div>
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
            :total="stagnationList.length"
          ></el-pagination>
        </el-form>
      </el-dialog>
      <!-- 弹窗4 -->
      <el-dialog title="日常考勤" :visible.sync="msgedate" @close="daily = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="daily" label-width="auto" class="msg" v-if="flow">
          <div class="search">
            <el-form-item label="车牌号 鲁E- " class="searchInput">
              <el-input v-model="daily.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="使用人" class="Troubleshooting msgnumber">
              <el-input v-model="daily.user" class="TroubleshootingInput"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="daily.logtime" type="date" value-format='yyyy-MM-dd' placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onDaily" class="button">查询</el-button>
              <el-button type="primary" @click="deilDaily" class="button">清空</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="dailyList.slice((currpage - 1) * pagesize, currpage * pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="user" label="车辆使用人"></el-table-column>
              <el-table-column align="center" prop="depart" label="单位"></el-table-column>
              <el-table-column align="center" prop="tel" label="联系方式"></el-table-column>
              <el-table-column align="center" prop="logtime" label="日期"></el-table-column>
              <el-table-column align="center" prop="worktime1" label="上午打卡"></el-table-column>
              <el-table-column align="center" prop="worktime2" label="下午打卡"></el-table-column>
              <el-table-column align="center" prop="worktime3" label="晚上打卡"></el-table-column>
            </el-table>
          </div>
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
            :total="dailyList.length"
          ></el-pagination>
        </el-form>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-else-if="!flow">
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
              <div class="chart"></div>
            </div>
          </div>
        </el-form>
      </el-dialog>
      <!-- 百度地图搜索 -->
    </div>
    <div class="bdMap">
      <!-- 三轮车 -->
      <baidu-map
        class="map"
        :center="{lng: 118.542132,lat: 37.453942}"
        :dragging="true"
        :zoom="14"
        scroll-wheel-zoom
        v-if="showmap"
      >
        <!-- 控件 -->
        <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
        <el-input placeholder="请输入车牌号" v-model="input1" class="input-with-select">
          <el-button slot="append" @click="searchMap">搜索</el-button>
        </el-input>
        <bm-marker
          v-for="(item,index) in positionsCls"
          :key="index"
          :position="item"
          :icon="{url: 'http://118.31.245.183:10500/images000/三轮车.png', size: {width: 24, height: 24}}"
        ></bm-marker>
      </baidu-map>
      <!-- 点聚合 -->
      <baidu-map
        class="map"
        :center="{lng: 118.592815,lat: 37.457724}"
        dragging
        :zoom="17"
        scroll-wheel-zoom
        v-if="showmark"
      >
        <el-input placeholder="请输道路名称" v-model="input2" class="input-with-select">
          <el-button slot="append" @click="searchMap">搜索</el-button>
        </el-input>
        <bml-marker-clusterer
          :averageCenter="true"
          :opt_anchor="{lng: 118.592815,lat: 37.457724}"
          :styles="cssMap"
          @draw="draw"
        >
          <bm-marker
            v-for="(value,index) in positions"
            :key="index"
            :position="value"
            :icon="{url: 'http://118.31.245.183:10500/images000/监控.png', size: {width: 38, height: 30}}"
            clicking
            @click="monitoring = true"
          ></bm-marker>
        </bml-marker-clusterer>
      </baidu-map>

      <!-- <div id="allmap" v-if='showmark' ></div> -->
      <!-- 轨迹回放 -->
      <div class="mapbox">
        <baidu-map
          class="map"
          :center="{lng: 118.515183, lat:37.478661}"
          :zoom="15"
          :scroll-wheel-zoom="true"
          v-if="showline"
        >
          <bm-marker
            :icon="{url: 'http://118.31.245.183:10500/images000/垃圾运输车big.png', size: {width: 38, height: 30}}"
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
import "videojs-contrib-hls";
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  data() {
    return {
      //百度地图
      cssMap: [
        {
          url: "http://118.31.245.183:10500/images000/监控2.png",
          size: { width: 62, height: 32 },
          textColor: "#fff",
          padding: "10px"
        }
      ],
      // 监控
      videoOption: {
        live: false,
        preload: "auto",
        autoplay: true,
        language: "zh-CN",
        aspectRatio: "16:8",
        fluid: true,
        sources: [
          {
            src:
              "http://hls01open.ys7.com/openlive/f515aa55a63f429d8169f069a9ac9986.m3u8" //url地址
          }
        ],
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        },
        flash: {
          hls: {
            withCredentials: false
          }
        }
      },
      showmark: false,
      showline: false,
      showmap: true,
      monitoring: false,
      flow: true,
      mapview: true,
      msgserach: false,
      msgerr: false,
      msgeslint: false,
      msgedate: false,
      input1: "",
      input2: "",
      msgser: {
        number: "",
        type: "",
        area: "",
        depart: ""
      },
      searchTransboundary: {
        number: null,
        logtime: null
      },
      stagnation: {
        number: null,
        logtime: null
      },
      i: "0",
      optionsCar: [
        {
          i: "1",
          type: "垃圾清运车"
        },
        {
          i: "2",
          type: "清扫车"
        },
        {
          i: "3",
          type: "洒水车"
        },
        {
          i: "3",
          type: "三轮车"
        }
      ],
      job: "0",
      optionsJob: [
        {
          job: "1",
          area: "东营区新区"
        },
        {
          job: "2",
          area: "文化街道办事处"
        },
        {
          job: "3",
          area: "新店街道办事处"
        },
        {
          job: "4",
          area: "黄河街道办事处"
        },
        {
          job: "5",
          area: "胜利街道办事处"
        },
        {
          job: "6",
          area: "六户镇"
        },
        {
          job: "7",
          area: "牛庄镇"
        },
        {
          job: "8",
          area: "史口镇"
        },
        {
          job: "9",
          area: "龙居镇"
        },
        {
          job: "10",
          area: "庐山路"
        },
        {
          job: "11",
          area: "宁阳路"
        },
        {
          job: "12",
          area: "新泰路"
        },
        {
          job: "13",
          area: "北一路"
        },
        {
          job: "14",
          area: "北二路"
        },
        {
          job: "15",
          area: "黄河路"
        },
        {
          job: "16",
          area: "龙居镇"
        },
        {
          job: "17",
          area: "淄博路"
        },
        {
          job: "18",
          area: "济南路"
        },
        {
          job: "19",
          area: "中转站1"
        },
        {
          job: "20",
          area: "中转站2"
        }
      ],
      optionsJob23: [
        {
          job: "1",
          area: "东营区新区"
        },
        {
          job: "2",
          area: "文化街道办事处"
        },
        {
          job: "3",
          area: "新店街道办事处"
        },
        {
          job: "4",
          area: "黄河街道办事处"
        },
        {
          job: "5",
          area: "胜利街道办事处"
        },
        {
          job: "6",
          area: "六户镇"
        },
        {
          job: "7",
          area: "牛庄镇"
        },
        {
          job: "8",
          area: "史口镇"
        },
        {
          job: "9",
          area: "龙居镇"
        },
        {
          job: "10",
          area: "庐山路"
        },
        {
          job: "11",
          area: "宁阳路"
        },
        {
          job: "12",
          area: "新泰路"
        },
        {
          job: "13",
          area: "北一路"
        },
        {
          job: "14",
          area: "北二路"
        },
        {
          job: "15",
          area: "黄河路"
        },
        {
          job: "16",
          area: "龙居镇"
        },
        {
          job: "17",
          area: "淄博路"
        },
        {
          job: "18",
          area: "济南路"
        }
      ],
      optionsJob1: [
        {
          job: "1",
          area: "中转站1"
        },
        {
          job: "2",
          area: "中转站2"
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "1",
          depart: "环卫一部"
        },
        {
          web: "2",
          depart: "环卫二部"
        },
        {
          web: "3",
          depart: "环卫三部"
        },
        {
          web: "4",
          depart: "环卫四部"
        }
      ],
      pagesize: 10,
      currpage: 1,
      // 轨迹列表
      Historical: [],
      // 越界列表
      Transboundary: [],
      //停滞列表
      stagnationList: [],
      positions: [],
      positionsCls: [],
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
      ],
      polylinePath: [{ lng: "", lat: "", direction: 0 }],
      polylinePathMarker: [{ lng: "", lat: "", direction: 0 }],
      stagnationList: [
        {
          number: 1,
          carbrand: "鲁E-04DF",
          company: "环卫一部",
          driver: "李诞",
          phone: "15975669845",
          region: "西湖公园",
          policeTime: "2019-10-09 18:50",
          timeout: "1小时5分"
        },
        {
          number: 2,
          carbrand: "鲁E-12FA",
          company: "环卫二部",
          driver: "张园园",
          phone: "15975669866",
          region: "东营南站",
          policeTime: "2019-10-09 17:54",
          timeout: "56分"
        },
        {
          number: 3,
          carbrand: "鲁E-23SD",
          company: "环卫三部",
          driver: "刘波",
          phone: "13675696845",
          region: "红光渔港",
          policeTime: "2019-10-09 17:54",
          timeout: "1小时30分"
        }
      ],
      //考勤列表
      dailyList: [],
      daily: {
        number: null,
        user: null,
        logtime: null
      }
    };
  },
  created() {
    this.getHistoricalTrack();
    this.getPositions();
    // this.getTricycle();
    this.getpolyline();
    this.getTransboundary();
    this.getStagnationList();
    this.getDailyList();
  },

  components: {
    BmlMarkerClusterer
  },
  methods: {
    showClc() {
      this.showmap = true;
      this.showmark = false;
      this.showline = false;
      location.reload();
    },
    showMap() {
      this.showmap = false;
      this.showmark = true;
      this.showline = false;
    },
    serachend() {
      this.msgserach = true;
    },
    // 历史轨迹播放
    getpolyline() {
      this.$http.get("xy/demo").then(res => {
        this.polylinePath = res.data;
        this.polylinePathMarker = res.data;
      });
    },
    huifang() {
      this.showmap = false;
      this.showmark = false;
      this.showline = true;
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
    // 获取监控地址
    getPositions() {
      this.$http.post("xy/video").then(res => {
        // console.log(res.data);
        this.positions = res.data;
      });
    },
    // 获取三轮车的位置
    getTricycle() {
      setInterval(() => {
        this.$http.post("xy/get3wheelCarXY").then(res => {
          console.log(res.data);
          this.positionsCls = res.data;
        });
      }, 5000);
    },
    work() {
      this.flow = true;
    },
    total() {
      this.flow = false;
    },
    listSearch() {
      if (this.msgser.type === "全部" || this.msgser.type === "") {
        return this.optionsJob;
      } else if (
        this.msgser.type === "清扫车" ||
        this.msgser.type === "洒水车"
      ) {
        return this.optionsJob23;
      } else if (this.msgser.type === "垃圾清运车") {
        return this.optionsJob1;
      }
    },
    onSubmit() {},
    showadd() {},
    searchMap() {
      console.log("百度地图搜索");
    },
    // 切换页面
    nextpage(value) {
      this.currpage = value;
    },
    //获取历史轨迹列表
    getHistoricalTrack() {
      this.$http
        .post("sanitation/dailyMonitor/pedicabGpsHistory/search")
        .then(res => {
          console.log(res.data);
          this.Historical = res.data;
        });
    },
    //查询历史轨迹列表
    onHistorical() {
      console.log(this.msgser);
      this.$http
        .post(
          "sanitation/dailyMonitor/pedicabGpsHistory/search",
          this.$qs.stringify(this.msgser)
        )
        .then(res => {
          console.log(res.data);
          this.Historical = res.data;
        });
    },
    //清除
    deilHistorical() {
      this.msgser = {
        number: "",
        type: "",
        area: "",
        depart: ""
      };
      this.getHistoricalTrack();
    },
    //越界报警列表
    getTransboundary() {
      this.$http
        .post("sanitation/dailyMonitor/pedicabWarningOutArea/search")
        .then(res => {
          this.Transboundary = res.data;
          console.log(res.data);
        });
    },
    // 查询
    onTransboundary() {
      console.log(this.searchTransboundary);
      this.$http
        .post(
          "sanitation/dailyMonitor/pedicabWarningOutArea/search",
          this.$qs.stringify(this.searchTransboundary)
        )
        .then(res => {
          this.Transboundary = res.data;
          console.log(res.data);
        });
    },
    // 清空
    deilTransboundary() {
      this.searchTransboundary = {
        number: null,
        logtime: null
      };
      this.getTransboundary();
    },
    //获取停滞列表
    getStagnationList() {
      this.$http
        .post("sanitation/dailyMonitor/pedicabWarningFreeze/search")
        .then(res => {
          console.log(res.data);
          this.stagnationList = res.data;
        });
    },
    //查询
    onStagnation() {
      console.log(this.stagnation);
      this.$http
        .post(
          "sanitation/dailyMonitor/pedicabWarningFreeze/search",
          this.$qs.stringify(this.stagnation)
        )
        .then(res => {
          console.log(res.data);
          this.stagnationList = res.data;
        });
    },
    //清空
    deilStagnation() {
      this.stagnation = {
        number: null,
        logtime: null
      };
      this.getStagnationList();
    },
    //获取考勤列表
    getDailyList() {
      this.$http
        .post("sanitation/dailyMonitor/pedicabDailyAttendant/search")
        .then(res => {
          console.log(res.data);
          this.dailyList = res.data;
        });
    },
    //查询
    onDaily() {
      this.$http
        .post(
          "sanitation/dailyMonitor/pedicabDailyAttendant/search",
          this.$qs.stringify(this.daily)
        )
        .then(res => {
          console.log(res.data);
          this.dailyList = res.data;
        });
    },
    //清空
    deilDaily() {
      this.daily = {
        number: null,
        user: null,
        logtime: null
      };
      this.getDailyList();
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
    height: 746px;
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
  width: 460px;
  margin: 5px 0 5px 0;
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
}
.leftboder {
  display: inline-block;
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
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
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
</style>
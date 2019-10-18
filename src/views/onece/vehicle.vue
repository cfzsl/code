<template>
  <!-- 车辆监管 -->
  <div id="vehicle">
    <div class="menu">
      <div class="btn">
        <el-button @click="msgse">历史轨迹播放</el-button>
        <el-button @click="msgerr = true">路线异常报警</el-button>
        <el-button @click="msgeslint = true">车况检测和预警</el-button>
        <el-button @click="msgedate = true">车辆考勤和工作量</el-button>
      </div>

      <!-- 弹窗1 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgserach" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-if="mapview">
          <div class="search">
            <el-form-item label="车牌号鲁-" class="searchInput">
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
                    @click.stop="handleEdit(scope.$index, scope.row)"
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
      <el-dialog title="历史轨迹播放" :visible.sync="msgerr" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号号鲁-" class="searchInput">
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
      <el-dialog :visible.sync="msgeslint" @close="msg = {}" width="70%" class="elDialog">
        <div class="elDialogtitle">车况检测和预警</div>
        <div class="searchDialogBot">
          <el-button class="buttonBot">车辆故障代码</el-button>
          <el-button class="buttonBot">油耗超标报警</el-button>
          <el-button class="buttonBot">车辆保养预警</el-button>
          <el-button class="buttonBotLast">保险到期提醒</el-button>
        </div>
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁-" class="searchInput">
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
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="车辆故障代码"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="date" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="troubleshooting" label="故障维修结果" width="239px"></el-table-column>
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
      <!-- 弹窗4 -->
      <el-dialog :visible.sync="msgedate" @close="msg = {}" width="70%">
        <div class="elDialogtitle">车辆考勤和工作量</div>
        <div class="searchDialogBot">
          <el-button class="buttonBot" @click="work()">车辆考勤</el-button>
          <el-button class="buttonBot" @click="total()">车辆工作总量</el-button>
        </div>
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg" v-if="flow">
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
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="车辆故障代码"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="date" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="troubleshooting" label="故障维修结果" width="239px"></el-table-column>
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
      <div class="mapbox">
        <baidu-map
          class="map"
          :center="{lng: 114.366636, lat: 30.628765}"
          :zoom="20"
          :scroll-wheel-zoom="true"
        >
          <bm-marker class="icon" :position="polylinePath[0]" :dragging="false"></bm-marker>
          <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
            <el-button slot="append" @click="searchMap">搜索</el-button>
          </el-input>
          <bm-polyline
            :path="polylinePath"
            stroke-color="blue"
            :stroke-opacity="0.5"
            :stroke-weight="3"
            :editing="false"
            @lineupdate="updatePolylinePath"
          ></bm-polyline>
        </baidu-map>

        <button class="hf" @click="huifang">播放历史轨迹</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      radio: "0",
      flow: true,
      mapview: true,
      msgserach: false,
      msgerr: false,
      msgeslint: false,
      mapLine: false,
      msgedate: false,
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
      polylinePath: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 39.92 },
        { lng: 116.423493, lat: 39.907445 }
      ],
      polylinePath: [
        { lng: 114.366304, lat: 30.6292 },
        { lng: 114.366497, lat: 30.628963 },
        { lng: 114.366582, lat: 30.62885 },
        { lng: 114.366604, lat: 30.628811 },
        { lng: 114.366667, lat: 30.628768 },
        { lng: 114.366739, lat: 30.628796 },
        { lng: 114.366775, lat: 30.628815 },
        { lng: 114.366838, lat: 30.628862 },
        { lng: 114.366887, lat: 30.628893 },
        { lng: 114.366946, lat: 30.628928 },
        { lng: 114.366995, lat: 30.628959 },
        { lng: 114.367099, lat: 30.629033 },
        { lng: 114.367148, lat: 30.62906 },
        { lng: 114.367179, lat: 30.629056 },
        { lng: 114.367197, lat: 30.629021 },
        { lng: 114.367148, lat: 30.628974 },
        { lng: 114.367076, lat: 30.62892 },
        { lng: 114.367004, lat: 30.628873 },
        { lng: 114.366905, lat: 30.628819 },
        { lng: 114.36682, lat: 30.628772 },
        { lng: 114.366771, lat: 30.62878 },
        { lng: 114.366762, lat: 30.628815 },
        { lng: 114.36682, lat: 30.628854 },
        { lng: 114.366856, lat: 30.628877 },
        { lng: 114.366883, lat: 30.628885 }
      ],
      num: 0.001
    };
  },
  created() {
    this.date();
  },
  methods: {
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    huifang() {
      let timer = setInterval(() => {
        if (this.polylinePath.length != 0) {
          this.polylinePath.splice(0, 1);
        }
      }, 100);
    },
    draw({ el, BMap, map }) {
      try {
        let lng = this.polylinePath[0].lng;
        let lat = this.polylinePath[0].lat;
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
        el.style.left = pixel.x + "px";
        el.style.top = pixel.y + "px";
        var icon = new BMap.Icon(
          "../assets/img/e17.png",
          new BMap.Size(202, 202),
          {
            anchor: new BMap.Size(101, 101),
            imageOffset: new BMap.Size(0 - 10, 0 - 17)
          }
        );
      } catch (error) {}
    },
    msgse() {
      this.msgserach = true;
    },
    work() {
      this.flow = true;
    },
    total() {
      this.flow = false;
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
      for (let i = 1; i < 999; i++) {
        this.data.list.push({
          sid: i,
          number: i,
          type: "垃圾运输车",
          carbrand: "鄂A " + i + i + i + i,
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
    height: 556px;
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
    top:150px;
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
</style>

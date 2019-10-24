<template>
  <div class="bdMap">
    <baidu-map class="map" center="中国石油大学胜利学院" dragging :zoom="12" scroll-wheel-zoom>
      <!-- 控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
      <!-- 覆盖范围高亮 -->
      <bm-boundary name="东营区" :strokeWeight="2" strokeColor="#BDC5F3" fillColor="#BDC5F3"></bm-boundary>
      <!-- mark点 -->
      <bm-marker
        :position="{ lng: 118.651704, lat: 37.3801 }"
        :icon="{url: 'http://47.110.160.217:10071/images000/垃圾运输车.png', size: {width: 38, height: 30}}"
      >
      </bm-marker>
      <bm-marker
        :position="{ lng: 118.520048, lat: 37.399597 }"
        :icon="{url: 'http://47.110.160.217:10071/images000/清扫车.png', size: {width: 38, height: 30}}"
      >
      </bm-marker>
      <bm-marker
        :position="{ lng: 118.394716, lat: 37.404183 }"
        :icon="{url: 'http://47.110.160.217:10071/images000/洒水车.png', size: {width: 38, height: 30}}"
      >
      </bm-marker>
      <bm-marker
        :position="{ lng: 118.693672, lat: 37.408082 }"
        :icon="{url: 'http://47.110.160.217:10071/images000/三轮车.png', size: {width: 38, height: 30}}"
      >
      </bm-marker>
      <bm-marker
        :position="{ lng: 118.598237, lat: 37.463098 }"
        :icon="{url: 'http://47.110.160.217:10071/images000/对讲机.png', size: {width: 38, height: 30}}"
      >
      </bm-marker>
      <bm-marker
        v-for="item in position2"
        :key="item.code"
        :position="{ lng: item.lng, lat: item.lat }"
        :icon="{url: 'http://47.110.160.217:10071/images000/垃圾运输车.png', size: {width: 38, height: 30}}"
      ></bm-marker>
      <div class="mapList">
        <div class="list">
          <img src="../../assets/img/洒水车.png" width="18px" height="24px" alt />
          <span>洒水车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/清扫车.png" width="18px" height="24px" alt />
          <span>清扫车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/垃圾运输车.png" width="18px" height="24px" alt />
          <span>垃圾运输车</span>
        </div>
        <div class="list">
          <img src="../../assets/img/三轮车.png" width="18px" height="24px" alt />
          <span>三轮车</span>
        </div>
        <div class="list">
          <img class='duli' src="../../assets/img/对讲机.png" width="8px" height="24px" alt />
          <span>对讲机</span>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="button">
        <div @click="msgeslint = true" class="buttonrow">
          <div class="buttonrowL oneself">
            <span class="iconfont icon-huaban"></span>
            <span>车况异常</span>
          </div>
          <div class="buttonrowR oneselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="msgeslint2 = true" class="buttonrow">
          <div class="buttonrowL townself">
            <span class="iconfont icon-huaban"></span>
            <span>油耗超标</span>
          </div>
          <div class="buttonrowR townselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="msgeslint3 = true" class="buttonrow">
          <div class="buttonrowL threeself">
            <span class="iconfont icon-huaban"></span>
            <span>保养到期</span>
          </div>
          <div class="buttonrowR threeselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="msgeslint4 = true" class="buttonrow">
          <div class="buttonrowL fourself">
            <span class="iconfont icon-huaban"></span>
            <span>保险到期</span>
          </div>
          <div class="buttonrowR fourselfnew">
            <span>2</span>
          </div>
        </div>
        <div @click="msgeslint5 = true" class="buttonrow">
          <div class="buttonrowL fifself">
            <span class="iconfont icon-huaban"></span>
            <span>人员超龄</span>
          </div>
          <div class="buttonrowR fifselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="msgeslint6 = true" class="buttonrow">
          <div class="buttonrowL sixself">
            <span class="iconfont icon-huaban"></span>
            <span>越界</span>
          </div>
          <div class="buttonrowR sixselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="msgeslint7 = true" class="buttonrow">
          <div class="buttonrowL sevenself">
            <span class="iconfont icon-huaban"></span>
            <span>停滞超限</span>
          </div>
          <div class="buttonrowR sevenselfnew">
            <span>3</span>
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
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
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
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="warning" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="故障信息"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="维修日期"></el-table-column>
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
      </el-dialog>
      <!-- 弹框2 -->
      <el-dialog
        title="油耗超标报警"
        :visible.sync="msgeslint2"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
        <!-- <el-table :data="warningList" border style="width: 100%">
          <el-table-column  align="center" prop="carbrand" label="车牌号"></el-table-column>
          <el-table-column  align="center" prop="driver" label="司机"></el-table-column>
          <el-table-column  align="center" prop="remaining" label="液位高度"></el-table-column>
          <el-table-column  align="center" prop="consumption" label="百公里耗油量"></el-table-column>
          <el-table-column  align="center" prop="maximum" label="最大油量"></el-table-column>
          <el-table-column  align="center" prop="date" label="报警时间"></el-table-column>
        </el-table> -->
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit">查询</el-button>
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
              :total="oil.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
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
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
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
              <el-button type="primary" @click="onSubmit">查询</el-button>
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
              <el-table-column align="center" label="保养完成情况" width>
                <template slot-scope="scope">
                  <span>{{scope.row.fulfill}}</span>
                </template>
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
      <!-- 弹框4 -->
      <el-dialog
        title="保险到期报警"
        :visible.sync="msgeslint4"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <div class="sytime">系统时间：2019-10-13</div>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="insurance" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" label="到期剩余天数" width>
                <template slot-scope="scope">
                  <span :class="scope.row.expireday<10?'red':'hed'">{{scope.row.expireday}}</span>
                </template>
              </el-table-column>
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
      <!-- 弹框5 -->
      <el-dialog
        title="人员超龄报警"
        :visible.sync="msgeslint5"
        @close="msg = {}"
        width="70%"
        class="elDialog"
      >
      <el-form ref="form" border :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
             <el-table :data="overAge" border style="width: 100%" @row-click="showadd">
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="是否超龄"></el-table-column>
              <el-table-column align="center" prop="police" label="报警日期"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              layout="total, prev, pager, next"
              :total="overAge.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
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
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table
              :data="oilday"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="id" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="consumption" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="name" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="policeDate" label="报警日期"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="consumptionNo" label="线路异常情况" width="436px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <!-- 修改类名 margin-left: 45% -->
          <div class="pagination">
            <el-pagination
              layout="total, prev, pager, next"
              :total="oilday.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
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
          <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </div>  
          <div class="list">
            <el-table
              :data="stagnationList"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="driver" label="车辆使用人"></el-table-column>
              <el-table-column align="center" prop="company" label="单位"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
              <el-table-column align="center" prop="region" label="停滞点" width="200x"></el-table-column>
              <el-table-column align="center" prop="timeout" label="停滞时长" width="220px"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间" width="200px"></el-table-column>              
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              layout="total, prev, pager, next"
              :total="stagnationList.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
        <el-button slot="append" @click="searchMap">搜索</el-button>
      </el-input> -->
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      msg: "",
      showimgs:'',
      value1:'',
      datemsg: "",
      msgeslint: false,
      msgeslint2: false,
      msgeslint3: false,
      msgeslint4: false,
      msgeslint5: false,
      msgeslint6: false,
      msgeslint7: false,
      input3: "",
      url: "http://47.110.160.217:9071/images000/1.png",
      position2: [],
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
      // 故障代码
      warning: [
        {
          number: 1,
          type: "垃圾运输车",
          carbrand: "鲁E-559F3",
          date: "2019-10-18",
          num: "环卫-A001",
          company: "发动机故障",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2019-10-19",
          policeTime: "08:00",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "未处理"
        },
        {
          number: 2,
          type: "垃圾运输车",
          carbrand: "鲁E-37588",
          date: "2019-10-20",
          num: "环卫-A001",
          company: "手刹故障",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2019-10-21",
          policeTime: "15:30",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "未处理"
        },
        {
          number: 3,
          type: "垃圾运输车",
          carbrand: "鲁E-A3250",
          date: "2019-10-15",
          num: "环卫-A001",
          company: "水温过高",
          driver: "张毅",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2019-10-16",
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
      // 保险
      insurance: [
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
      ],
      // 保养
      maintenance: [
        {
          id: 1,
          carbrand: "鲁E-859Q9",
          policeDate: "2019-04-10",
          maintenance: 27850,
          travel: 37980,
          excess: 130,
          driver: "李诞",
          fulfill: "未保养"
        },
        {
          id: 2,
          carbrand: "鲁E-B5277",
          policeDate: "2019-04-15",
          maintenance: 25800,
          travel: 36200,
          excess: 400,
          driver: "李诞",
          fulfill: "未保养"
        },
        {
          id: 3,
          carbrand: "鲁E-589A5",
          policeDate: "2019-04-20",
          maintenance: 25600,
          travel: 35900,
          excess: 300,
          driver: "李诞",
          fulfill: "未保养"
        }
      ],
      oilday: [
        {
          id: 1,
          carbrand: "鲁E-12131",
          consumption: "东营区新区",
          name:'李诞',
          phone:'15975669745',
          consumptionNo: "超过原定使用区域：东营区东营南站",
          policeDate: "2011-10-09",
          policeTime: "08:00"
        },
        {
          id: 2,
          carbrand: "鲁E-65QQ3",
          consumption: "东营区新区",
          name:'张圆圆',
          phone:'15975659845',
          consumptionNo: "超过原定使用区域：东营区东营南站",
          policeDate: "2011-10-09",
          policeTime: "15:25"
        },
        {
          id: 3,
          carbrand: "鲁E-58965",
          consumption: "东营区新区",
          name:'刘波',
          phone:'13675667845',
          consumptionNo: "超过原定使用区域：东营区东营南站",
          policeDate: "2011-10-09",
          policeTime: "10:35"
        }
      ],
      warningList: [
        {
          remaining: 'MAX',
          consumption: "12L",
          maximum: "80L",
          date: "2019-10-18 18:20",
          carbrand: "鲁E-12345",
          driver: "李诞"
        }
      ],
      maintenanceMsg: {
        date: "",
        driver: "",
        img: "",
        content: ""
      },
      overAge:[
        {
          id: "1",
          carbrand: "鲁E-1A2G6",
          name:'李诞',
          policeDate: '是',
          police: '2019-10-6',
        },
        {
          id: "2",
          carbrand: "鲁E-2X5SF",
          name:'张圆圆',
          policeDate: '是',
          police: '2019-10-6',
        },
        {
          id: "3",
          carbrand: "鲁E-S126D",
          name:'刘波',
          policeDate: '是',
          police: '2019-10-6',
        },
      ],
      stagnationList:[
        {
          number: 1,
          carbrand: "鲁E-S112D",
          company: "环卫一部",
          driver: "李诞",
          phone: "15975669892",
          region: "西湖公园",
          policeTime: "2019-10-09 18:50",
          timeout:"1小时5分"
        },
        {
          number: 2,
          carbrand: "鲁E-12FA2",
          company: "环卫二部",
          driver: "张园园",
          phone: "15975669585",
          region: "东营南站",
          policeTime: "2019-10-09 17:54",
          timeout:"56分"
        },
        {
          number: 3,
          carbrand: "鲁E-23SD4",
          company: "环卫三部",
          driver: "刘波",
          phone: "13675879845",
          region: "红光渔港",
          policeTime: "2019-10-09 17:54",
          timeout:"1小时30分"
        },
      ],
       data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
    };
  },
  methods: {
    date() {
      for (let i = 1; i < 2; i++) {
        this.data.list.push({
          sid: i,
          number: i,
          type: "垃圾运输车",
          carbrand: "鲁E-04DF",
          date: "2019-10-10",
          num: "环卫-A001",
          company: "环卫",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeTime: "2019-10-10",
          policedate: "11:35:10",
          service: "超过原定使用区域：东营区东营南站",
          troubleshooting: "未维修",
          timeout:"1小时"
        });
      }
    },
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    showadd() {
      console.log("测试");
    },
    onSubmit() {},
    searchMap() {},
    nextpage() {},
    map_init() {
      var map = new BMap.Map("allmap");
    },
    getMapMark() {
      setInterval(() => {
        this.$http.get("xy/get").then(res => {
          this.position2 = res.data;
        });
      }, 1000);
    },
  },
  created() {
    this.getMapMark();
    this.date();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bdMap {
  .map {
    position: relative;
    width: 100%;
    height: 746px;
    .input-with-select {
      position: absolute;
      right: 10px;
      top: 100px;
      width: 309px;
    }
  }
}
.mapList {
  position: absolute;
  right: 10px;
  top: 68px;
  .list {
    // float: left;
    display: flex;
    width: 130px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    align-items: center;
   justify-content: left;
    img {
      margin-left: 10px;
    }
    .duli {
      margin: 0 10px 0 14px;
    }
    span {
      margin-left: 6px;
    }
  }
}
.button {
  position: absolute;
  display: flex;
  top: 10px;
  align-items: center;
  justify-content: center;
  font-size: 0;
  color: #fff;
  margin-left: 15px;
  margin-top: 10px;
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
      margin:0 auto;
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

  // buttonList:[
  //   {text:'车况异常',color: '#3b99f1'},
  //   {text:'油耗超标',color: '#4eb14e'},
  //   {text:'保养到期',color: '#ffb533'},
  //   {text:'保险到期',color: '#f66134'},
  //   {text:'人员超龄',color: '#439dc5'},
  //   {text:'越界',color: '#f29118'}
  //   {text:'停滞超限',color: '#31cab5'}
  // ]
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
.red {
  color:red;
}
.hede {
  color:#000;
}
</style>

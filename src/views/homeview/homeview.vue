<template>
  <div class="bdMap">
    <baidu-map class="map" center="中国石油大学胜利学院" dragging :zoom="12" scroll-wheel-zoom>
      <!-- GPS测试点 -->
      <bm-marker :position="{lng: 114.41166666666666, lat: 30.482222222222223}" :dragging="true"></bm-marker>
      <!-- 控件 -->
      <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
      <!-- 覆盖范围高亮 -->
      <bm-boundary name="东营区" :strokeWeight="2" strokeColor="#BDC5F3" fillColor="#BDC5F3"></bm-boundary>
      <!-- mark点 -->
      <bm-marker
        :position="{lng: markers.lng, lat: markers.lat}"
        :icon="{url: 'http://118.31.245.183:10500/images000/垃圾运输车.png', size: {width: 24, height: 18}}"
        @click="infoWindowOpen(markers)"
      >
        <bm-info-window
          class="infoWindow"
          :position="{lng: markers.lng, lat: markers.lat}"
          title="垃圾运输车"
          :show="markers.show"
          @close="infoWindowClose(markers)"
          @open="infoWindowOpen(markers)"
        >
          <div>
            ID:
            <span>156541484681</span>
          </div>
          <div>
            状态:
            <span>静止</span>
          </div>
          <div>
            ACE状态:
            <span>开</span>电量:
            <span>60%</span>信号:
            <span>强</span>
          </div>
          <div>
            定位时间:
            <span>2019-10-31 10:30</span>
          </div>
          <div>
            停留时间:
            <span>2小时43分12秒</span>
          </div>
          <div>
            定位方式:
            <span>GPS</span>
          </div>
          <div>
            <a>实时跟踪</a>
            <a>历史轨迹</a>
            <a>电子栅栏</a>
            <a>设备信息</a>
          </div>
          <div>
            <a>查询指令记录</a>
            <a>下载轨迹</a>
          </div>
        </bm-info-window>
      </bm-marker>
      <bm-marker
        :position="{ lng: 118.520048, lat: 37.399597 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/清扫车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.394716, lat: 37.404183 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/洒水车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.693672, lat: 37.408082 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/三轮车.png', size: {width: 24, height: 18}}"
      ></bm-marker>
      <bm-marker
        :position="{ lng: 118.598237, lat: 37.463098 }"
        :icon="{url: 'http://118.31.245.183:10500/images000/对讲机.png', size: {width: 18, height: 24}}"
      ></bm-marker>
      <bm-marker
        v-for="item in position2"
        :key="item.code"
        :position="{ lng: item.lng, lat: item.lat }"
        :icon="{url: 'http://118.31.245.183:10500/images000/垃圾运输车.png', size: {width: 38, height: 30}}"
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
          <img class="duli" src="../../assets/img/对讲机.png" width="8px" height="24px" alt />
          <span>对讲机</span>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="button">
        <div @click="getabnormal" class="buttonrow">
          <div class="buttonrowL oneself">
            <span class="iconfont icon-huaban"></span>
            <span>车况异常</span>
          </div>
          <div class="buttonrowR oneselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="getOli" class="buttonrow">
          <div class="buttonrowL townself">
            <span class="iconfont icon-huaban"></span>
            <span>油耗超标</span>
          </div>
          <div class="buttonrowR townselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="getMaintainList" class="buttonrow">
          <div class="buttonrowL threeself">
            <span class="iconfont icon-huaban"></span>
            <span>保养到期</span>
          </div>
          <div class="buttonrowR threeselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="getInsuranceList" class="buttonrow">
          <div class="buttonrowL fourself">
            <span class="iconfont icon-huaban"></span>
            <span>保险到期</span>
          </div>
          <div class="buttonrowR fourselfnew">
            <span>2</span>
          </div>
        </div>
        <div @click="getOverageList" class="buttonrow">
          <div class="buttonrowL fifself">
            <span class="iconfont icon-huaban"></span>
            <span>人员超龄</span>
          </div>
          <div class="buttonrowR fifselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="getTransboundaryList" class="buttonrow">
          <div class="buttonrowL sixself">
            <span class="iconfont icon-huaban"></span>
            <span>越界</span>
          </div>
          <div class="buttonrowR sixselfnew">
            <span>3</span>
          </div>
        </div>
        <div @click="getStagnationList" class="buttonrow">
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
      <!-- <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
        <el-button slot="append" @click="searchMap">搜索</el-button>
      </el-input>-->
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      markers: {
        lng: 118.651704,
        lat: 37.3801,
        show: false
      },
      msg: "",
      th: "",
      show: false,
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
      },
      warningList: [
        {
          remaining: "MAX",
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
      this.msgeslint = true;
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
      this.msgeslint2 = true;
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
      this.msgeslint3 = true;
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
      this.msgeslint4 = true;
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
      this.msgeslint5 = true;
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
      this.msgeslint6 = true;
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
      this.msgeslint7 = true;
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
    },
    searchMap() {},
    getMapMark() {
      setTimeout(() => {
        this.$http.get("/xy/get3wheelCarXY").then(res => {
          this.position2 = res.data;
        });
      }, 1000);
      setInterval(() => {
        this.$http.get("/xy/get3wheelCarXY").then(res => {
          this.position2 = res.data;
        });
      }, 1000);
    }
  },
  created() {
    // this.getMapMark();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bdMap {
  width: 100%;
  height: 746px;
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
.red {
  color: red;
}
.hede {
  color: #000;
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
</style>

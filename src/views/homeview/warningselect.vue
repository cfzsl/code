<template>
  <!-- 大数据展示平台 -->
  <div id="warningSelect">
    <div class="warning">
      <!-- 数据中控平台 -->
      <div class="header">
        <div class="bg-header">
          <div class="t-title">
            <img
              src="../../assets/img/huanweiLogo.png"
              style="width: 50px;height: 50px;margin-top: 10px;"
            />
            数&nbsp;&nbsp;&nbsp;据&nbsp;&nbsp;&nbsp;展&nbsp;&nbsp;&nbsp;示&nbsp;&nbsp;&nbsp;平&nbsp;&nbsp;&nbsp;台
          </div>
          <div class="blackgroundImgGds">
            <div class="warningTop">
              <div class="warningText1">当&nbsp;日&nbsp;工&nbsp;作&nbsp;明&nbsp;细&nbsp;：</div>
              <div class="warningDate">{{shuldData.logtime}}</div>
            </div>
            <div class="warningPlate">
              <div class="lineBox">
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/chuqin.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.shouldArrive}}</span>
                    <span>当日应出勤</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/gerenchuqin.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.actuallyArrive}}</span>
                    <span>当日实际出勤</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/chidao.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.late}}</span>
                    <span>迟到</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/zaotui.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.leaveEarly}}</span>
                    <span>早退</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/queka.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.lackCard}}</span>
                    <span>缺卡</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/kuanggong.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.lackWork}}</span>
                    <span>旷工</span>
                  </div>
                </div>
                <div class="plate">
                  <div class="plateLeft">
                    <img src="../../assets/img/qingjiashenhe.png" />
                  </div>
                  <div class="plateRight">
                    <span class="plateRightNumber">{{shuldData.holiday}}</span>
                    <span>请假</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 报警信息 -->
            <div class="lineBox2">
              <div
                class="warningText"
              >工&nbsp;&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;预&nbsp;&nbsp;&nbsp;警&nbsp;&nbsp;&nbsp;:</div>
              <div class="button">
                <div @click="msgeslint = true" class="buttonrow">
                  <div class="buttonrowL oneself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">车况异常</b>
                  </div>
                  <div class="buttonrowR oneselfnew">
                    <span>{{abnormalList.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint2 = true" class="buttonrow">
                  <div class="buttonrowL townself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">油耗超标</b>
                  </div>
                  <div class="buttonrowR townselfnew">
                    <span>{{oli.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint3 = true" class="buttonrow">
                  <div class="buttonrowL threeself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">保养到期</b>
                  </div>
                  <div class="buttonrowR threeselfnew">
                    <span>{{maintainList.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint4 = true" class="buttonrow">
                  <div class="buttonrowL fourself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">保险到期</b>
                  </div>
                  <div class="buttonrowR fourselfnew">
                    <span>{{insuranceList.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint5 = true" class="buttonrow">
                  <div class="buttonrowL fifself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">人员超龄</b>
                  </div>
                  <div class="buttonrowR fifselfnew">
                    <span>{{overageList.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint6 = true" class="buttonrow">
                  <div class="buttonrowL sixself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">越界</b>
                  </div>
                  <div class="buttonrowR sixselfnew">
                    <span>{{transboundaryList.length}}</span>
                  </div>
                </div>
                <div @click="msgeslint7 = true" class="buttonrow">
                  <div class="buttonrowL sevenself">
                    <span class="iconfont icon-huaban"></span>
                    <b style="font-size: 3px;">停滞超限</b>
                  </div>
                  <div class="buttonrowR sevenselfnew">
                    <span>{{stagnationList.length}}</span>
                  </div>
                </div>
              </div>
              <div style="margin-top: 60px">
                <div class="warningText1">详&nbsp;&nbsp;&nbsp;情&nbsp;&nbsp;&nbsp;分&nbsp;&nbsp;&nbsp;布&nbsp;&nbsp;&nbsp;:</div>
                <template>
                  <el-tabs v-model="activeName" style="margin-left: 3%;margin-right: 3%">
                    <el-tab-pane label="人员年龄分布" name="first">
                      <div ref="zhexian" :style="{width: '800px', height: '200px',display:'flex',alignItems:'center'}"></div>
                    </el-tab-pane>
                    <el-tab-pane label="部门分布" name="second">
                      <div ref="zhexian2" :style="{width: '800px', height: '200px',display:'flex',alignItems:'center'}"></div>
                    </el-tab-pane>
                  </el-tabs>
                </template>
              </div>

            </div>
          </div>
        </div>
        <!-- 饼图 -->
        <div class="lineBox3">
          <div class="carmsg">
            车&nbsp;&nbsp;&nbsp;辆&nbsp;&nbsp;&nbsp;考&nbsp;&nbsp;&nbsp;勤&nbsp;&nbsp;&nbsp;:
          </div>
          <div id="xxxd" style="width: 500px;height:260px;display:flex;align-items:center;margin-left:25%;"></div>
          <div>
            <div class="warningText2">报&nbsp;&nbsp;&nbsp;警&nbsp;&nbsp;&nbsp;次&nbsp;&nbsp;&nbsp;数&nbsp;&nbsp;&nbsp;:
            </div>
            <div ref="duibi" :style="{width: '700px', height: '200px',display:'flex',alignItems:'center'}"></div>
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
var echarts = require("echarts");
export default {
  data() {
    return {
      activeName: 'first',
      zhexian: null,
      zhexian2: null,
      duibi: null,
      msg: "",
      show: false,
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
      },
      // 展示数据
      shuldData: {}
    };
  },
  created() {
    this.getData();
    this.getabnormal();
    this.getOli();
    this.getMaintainList();
    this.getInsuranceList();
    this.getOverageList();
    this.getTransboundaryList();
    this.getStagnationList();
    this.$nextTick(() => {
      this.total();
      this.drawLine();
      this.drawZx();
      this.drawZxdpart();
    });
  },
  methods: {
    //部门分布折线图
    drawZxdpart(){
      this.zhexian2 = echarts.init(this.$refs.zhexian2, "");
      this.zhexian2.setOption({
        textStyle: {
          color: "#fff"
        },
        tooltip : {},
        grid: {
          left: '3%',
          right: '10%',
          bottom: '3%',
          containLabel: true
        },
        xAxis : [
          {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日'],
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis : [
          {
            type : 'value',
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series : [
          {
            name:'黄河一部',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'黄河二部',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'文汇一部',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'文汇二部',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
          },
          {
            name:'辛店一部',
            type:'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
      window.onresize = this.zhexian2.resize;
    },
    //人员年龄折线图
    drawZx() {
      this.zhexian = echarts.init(this.$refs.zhexian, "");
      this.zhexian.setOption({
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          textStyle: {
            color: "#fff"
          },
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          }
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {}
          }
        ]
      });
      window.onresize = this.zhexian.resize;
    },
    //对比图
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.duibi = echarts.init(this.$refs.duibi, "");
      // 绘制图表
      this.duibi.setOption({
        color: ["#3398DB"],
        textStyle: {
          color: "#fff"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [
          {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
      window.onresize = this.duibi.resize;
    },
    // 饼图
    total() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("xxxd"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        color: ["#56cc56", "#fa6134", "#44cbf3","#f29118", "#31cab5","#fff"],
        legend: {
          orient: "vertical",
          right:"81%",
          top: "20%",
          textStyle: {
            color: "#fff",
            fontSize: 14
          },
          data: ["10~20车", "20~30车", "30~40车","40~50车","50~60车","60~70车"]
        },
        series: [
          {
            name: "转运辆数/天",
            type: "pie",
            radius:  "65%",
            // center: ["50%", "50%"],
            data: [
              {value: 18, name: "10~20车"},
              {value: 59, name: "20~30车"},
              {value: 13, name: "30~40车"},
              {value: 12, name: "40~50车"},
              {value: 26, name: "50~60车"},
              {value: 33, name: "60~70车"}
            ],
            label: {
              normal: {
                show: false,
                position: "right"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "12",
                  fontWeight: "bold"
                }
              }
            },
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
      window.onresize = myChart.resize;
    },
    //车况异常
    getabnormal() {
      this.$http
        .post("hw/main/listCarError", this.$qs.stringify(this.abnormal))
        .then(res => {
          // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
          // console.log(res.data);
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
    // 数据统计
    getData() {
      this.$http.post("hr/kaoqin/navbar").then(res => {
        // console.log(res.data);
        this.shuldData = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .header {
    position: relative;
    width: 100%;
    height: 100%;
    font-weight: bold;
    /*padding: 0 20px;*/
    background: url(../../assets/img/truegds.png) no-repeat;

    .bg-header {
      width: 100%;
      height: 80px;
      background: url(../../assets/img/titlegds.png) no-repeat;
      background-size: 100% 100%;

      .t-title {
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 2em;
        line-height: 80px;
        color: #fff;
      }
    }
  }

  .blackgroundImgGds {
    background: url(../../assets/img/truegds.png) no-repeat;
  }

  .lineBox {
    border: 1px solid #2c58a6;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 20px;
    width: 100%;
    height: 150px;
    display: flex;
    box-shadow: 0 0 10px #2c58a6;
  }

  .lineBox2 {
    border: 1px solid #2c58a6;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 100px;
    width: 50%;
    height: 500px;
    display: inline-block;
    float: left;
    box-shadow: 0 0 10px #2c58a6;
  }



  .lineBox3 {
    border: 1px solid #2c58a6;
    border-radius: 5px;
    margin-right: 10px;
    margin-top: 100px;
    width: 45%;
    height: 500px;
    display: inline-block;
    float: right;
    box-shadow: 0 0 10px #2c58a6;
  }

  .carmsg {
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    color: #fff;
    margin-top: 20px;
    background: url(../../assets/img/biaoti.png) no-repeat;
  }

  #homeview {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .homeviewButton {
    position: absolute;
    left: 10px;
    top: 10px;
    z-index: 900;
  }

  .map {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 800;

    .input-with-select {
      position: absolute;
      right: 150px;
      top: 10px;
      width: 309px;
    }
  }

  .warning {
    width: 100%;
    height: 100%;
  }

  #player {
    width: 100%;
    height: 100%;
  }

  .mapList {
    position: absolute;
    right: 10px;
    top: 10px;

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

  .buttonrow {
    z-index: 800;
    font-size: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Medium;
    font-weight: 400;

    .buttonrowL {
      border-radius: 6px 0 0 6px;
      height: 40px;
      width: 25%;
      line-height: 40px;
      margin-left: 1%;

      span {
        display: inline-block;
        // margin-left: 10px !important;
        /*margin-right: 0 !important;*/
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

  .warningTop {
    /*width: 100%;*/
    /*height: 50px;*/
    /*padding-top: 80px;*/
    .warningText1 {
      float: left;
      font-size: 16px;
      font-weight: 700;
      margin-top: 10px;
      padding-left: 20px;
      color: #fff;
    }
  }

  .warningDate {
    float: right;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-right: 20px;
    color: #fff;
  }

  .warningText {
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    color: #fff;
    margin-top: 20px;
    background: url(../../assets/img/biaoti.png) no-repeat;
  }
  .warningText1 {
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    margin-top: 60px;
    color: #fff;
    background: url(../../assets/img/biaoti.png) no-repeat;
  }
  .warningText2 {
    font-size: 16px;
    font-weight: 700;
    margin-left: 20px;
    /*margin-top: 10px;*/
    color: #fff;
    background: url(../../assets/img/biaoti.png) no-repeat;
  }
  .button {
    display: flex;
    font-size: 5px;
    color: #fff;
    margin-left: 1%;
    margin-top: 50px;
  }

  .buttonrow {
    z-index: 800;
    font-size: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    margin-left: 10px;

    .buttonrowL {
      border-radius: 6px 0 0 6px;
      height: 40px;
      width: 70%;
      line-height: 40px;
      margin-left: 3%;

      span {
        display: inline-block;
        // margin-left: 10px !important;
        /*margin-right: 0 !important;*/
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
    justify-content: flex-start;
    width: 100%;
    height: 112px;
    margin-top: 50px;
    color: #fff;
  }

  .plate {
    height: 112px;
    width: 10%;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-left: 3.8%;
    display: flex;
    margin-top: 20px;

    img {
      width: 40px;
      height: 40px;
      margin-top: 32px;
      margin-left: 10px;
    }

    .plateRight {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: auto;

      .plateRightNumber {
        font-size: 36px !important;
        font-weight: 700;
        align-items: center;
      }
    }
  }

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .playerTop {
    float: right;
    font-size: 16px;
    font-weight: 700;
    margin-top: 10px;
    padding-right: 20px;
  }

  .playerVideo {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    align-items: stretch;
    position: absolute;
    top: 50px;

    .videoDiv {
      width: 240px;
      height: 200px;
      margin-left: 10px;
      margin-right: 12px;
    }
  }

  .userImage {
    position: absolute;
    bottom: 0px;
    width: 100%;
    overflow: hidden;

    .userImageAllWrapper {
      width: 100%;
      list-style: none;
      display: flex;

      li {
        width: 240px;
        margin-left: 10px;
        border: 1px solid #ececec;

        p {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        img {
          display: flex;
        }
      }
    }
  }
</style>

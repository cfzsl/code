<template>
    <div id="homeview">
        <div class="homeviewButton">
            <el-button type="primary" @click="addMap" v-show="mapSelect">地图</el-button>
            <el-button type="primary" @click="addWarning" v-show="warningSelect">数据中控台</el-button>
            <el-button type="primary" @click="addPlayer" v-show="playerSelect">巡检平台</el-button>
        </div>
        <!-- 地图 -->
        <baidu-map class="map" center="东营区" dragging :zoom="12" scroll-wheel-zoom v-show="!mapSelect">
            <!-- 控件 -->
            <bm-navigation anchor="BMAP_ANCHOR_BOTTOM_LEFT"></bm-navigation>
            <!-- 划区 -->
            <!-- 黄河路二部 -->
            <bm-polygon
                    :path="polygonPath1"
                    stroke-color="yellow"
                    fillColor="yellow"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="黄河路二部"
                    :position="{ lng: 118.498772, lat: 37.444201 }"
                    :labelStyle="labelStyle"
            />
            <!-- 黄河路一部 -->
            <bm-polygon
                    :path="polygonPath8"
                    stroke-color="#FFBB55"
                    fillColor="#FFBB55"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="黄河路一部"
                    :position="{ lng: 118.558065, lat: 37.429498 }"
                    :labelStyle="labelStyle"
            />
            <!-- 辛店项目一部 -->
            <bm-polygon
                    :path="polygonPath2"
                    stroke-color="#5555FF"
                    fillColor="#5555FF"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="辛店一部"
                    :position="{ lng: 118.414978, lat: 37.458754 }"
                    :labelStyle="labelStyle"
            />
            <!-- 辛店项目二部 -->
            <bm-polygon
                    :path="polygonPath3"
                    stroke-color="#FF22FF"
                    fillColor="#FF22FF"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="辛店二部"
                    :position="{ lng: 118.424109, lat: 37.507002 }"
                    :labelStyle="labelStyle"
            />
            <!-- 文汇二部 -->
            <bm-polygon
                    :path="polygonPath4"
                    stroke-color="#FFBBD6"
                    fillColor="#FFBBD6"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="文汇二部"
                    :position="{ lng: 118.507328, lat: 37.499559 }"
                    :labelStyle="labelStyle"
            />
            <!-- 文汇一部 -->
            <bm-polygon
                    :path="polygonPath5"
                    stroke-color="#55FF55"
                    fillColor="#55FF55"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="文汇一部"
                    :position="{ lng: 118.567551, lat: 37.489252 }"
                    :labelStyle="labelStyle"
            />
            <!-- 胜园项目部 -->
            <bm-polygon
                    :path="polygonPath6"
                    stroke-color="#55FFFF"
                    fillColor="#55FFFF"
                    :stroke-opacity="0.8"
                    :stroke-weight="1"
            />
            <bm-label
                    content="文汇一部"
                    :position="{ lng: 118.444519, lat: 37.422162 }"
                    :labelStyle="labelStyle"
            />
            <!-- mark点 -->
            <bm-marker
                    :position="{lng: 118.36, lat: 37.42}"
                    :icon="{url: 'http://118.31.245.183:10500/images000/对讲机.png', size: {width: 24, height: 18}}"
            ></bm-marker>
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
                    :zIndex="index"
                    :position="{ lng: 118.598237, lat: 37.463098 }"
                    :icon="{url: 'http://118.31.245.183:10500/images000/垃圾运输车.png', size: {width: 24, height: 24}}"
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
            <div class="mapList">
                <div class="list">
                    <img src="../../assets/img/洒水车.png" width="18px" height="24px" alt/>
                    <span>洒水车</span>
                </div>
                <div class="list">
                    <img src="../../assets/img/清扫车.png" width="18px" height="24px" alt/>
                    <span>清扫车</span>
                </div>
                <div class="list">
                    <img src="../../assets/img/垃圾运输车.png" width="18px" height="24px" alt/>
                    <span>垃圾运输车</span>
                </div>
                <div class="list">
                    <img src="../../assets/img/三轮车.png" width="18px" height="24px" alt/>
                    <span>三轮车</span>
                </div>
                <div class="list">
                    <img class="duli" src="../../assets/img/对讲机.png" width="8px" height="24px" alt/>
                    <span>对讲机</span>
                </div>
            </div>
            <el-input placeholder="请输入要搜索的车牌号" v-model="input3" class="input-with-select">
                <el-button slot="append" @click="searchMap">搜索</el-button>
            </el-input>
        </baidu-map>
        <!-- 大数据展示平台 -->
        <div class="warning" v-show="!warningSelect">
            <!-- 数据中控平台 -->
            <!-- 高大上界面 -->
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
                                        <img src="../../assets/img/chuqin.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.shouldArrive}}</span>
                                        <span>当日应出勤</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/gerenchuqin.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.actuallyArrive}}</span>
                                        <span>当日实际出勤</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/chidao.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.late}}</span>
                                        <span>迟到</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/zaotui.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.leaveEarly}}</span>
                                        <span>早退</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/queka.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.lackCard}}</span>
                                        <span>缺卡</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/kuanggong.png"/>
                                    </div>
                                    <div class="plateRight">
                                        <span class="plateRightNumber">{{shuldData.lackWork}}</span>
                                        <span>旷工</span>
                                    </div>
                                </div>
                                <div class="plate">
                                    <div class="plateLeft">
                                        <img src="../../assets/img/qingjiashenhe.png"/>
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
                            >工&nbsp;&nbsp;&nbsp;作&nbsp;&nbsp;&nbsp;预&nbsp;&nbsp;&nbsp;警&nbsp;&nbsp;&nbsp;:
                            </div>
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
                                <div class="warningText1">人&nbsp;&nbsp;&nbsp;员&nbsp;&nbsp;&nbsp;年&nbsp;&nbsp;&nbsp;龄&nbsp;&nbsp;&nbsp;分&nbsp;&nbsp;&nbsp;布&nbsp;&nbsp;&nbsp;:</div>
                                <div
                                        ref="zhexian"
                                        :style="{width: '800px', height: '280px',display:'flex',alignItems:'center'}"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 饼图 -->
                <div class="lineBox3">
                    <div
                            class="carmsg"
                    >车&nbsp;&nbsp;&nbsp;辆&nbsp;&nbsp;&nbsp;考&nbsp;&nbsp;&nbsp;勤&nbsp;&nbsp;&nbsp;:
                    </div>
                    <div
                            id="xxxd"
                            style="width: 500px;height:260px;display:flex;align-items:center;margin-left:25%;"
                    ></div>
                    <div>
                        <div class="warningText2">报&nbsp;&nbsp;&nbsp;警&nbsp;&nbsp;&nbsp;次&nbsp;&nbsp;&nbsp;数&nbsp;&nbsp;&nbsp;:</div>
                        <div
                                ref="duibi"
                                :style="{width: '700px', height: '200px',display:'flex',alignItems:'center'}"
                        ></div>
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
                            <el-table-column align="center" prop="fixstatus" label="故障维修结果"
                                             width="239px"></el-table-column>
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
                            <el-table-column align="center" prop="warningtext" label="线路异常情况"
                                             width="436px"></el-table-column>
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
                            <el-table-column align="center" prop="staytime" label="停滞时长"
                                             width="220px"></el-table-column>
                            <el-table-column align="center" prop="warningtime" label="报警时间"
                                             width="200px"></el-table-column>
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
        <!-- 播放视频 -->
        <div id="player" v-if="!playerSelect">
            <div class="playerTop">
                <div class="warningDate">{{shuldData.logtime}}</div>
                <el-button type="primary" @click="stringVideo">道路视频详情</el-button>
            </div>
            <div class="playerVideo">
                <div v-for="item in videoList" :key="item.sid" class="videoDiv" @click="videoPlayer(item)">
                    <el-image :src="item.videoimgurl"></el-image>
                    <p>{{item.logtime}}{{item.addr}}</p>
                </div>
            </div>
            <!-- 视频弹框 -->
            <el-dialog :title="videoObj.addr" :visible.sync="videos" width="70%">
                <video-player
                        class="video-player vjs-custom-skin"
                        :playsinline="true"
                        :options="videoOption"
                ></video-player>
            </el-dialog>
            <!-- 图片滚动播放 -->
            <div class="userImage">
                <div>巡查拍照</div>
                <vueSeamless :data="videoList" :class-option="optionCustomer">
                    <ul class="userImageAllWrapper">
                        <li v-for="item in videoList" :key="item.index">
                            <img :src="item.videoimgurl" width="240px"/>
                            <p>{{item.logtime}}{{item.addr}}</p>
                        </li>
                    </ul>
                </vueSeamless>
            </div>
        </div>
    </div>
</template>
<script>
    import vueSeamless from "vue-seamless-scroll";
    import "videojs-contrib-hls";

    var echarts = require("echarts");
    export default {
        data() {
            return {
                zhexian: null,
                duibi: null,
                labelStyle: {
                    color: "red",
                    fontSize: "14px",
                    border: "0px",
                    backgroundColor: "rgba(0,0,0,0)"
                },
                index: 8888,
                // 视频区域
                // 测试
                marker: {},
                // 区域划分
                polygonPath1: [
                    {lng: 118.498003, lat: 37.462778},
                    {lng: 118.525941, lat: 37.463812},
                    {lng: 118.524683, lat: 37.411427},
                    {lng: 118.489254, lat: 37.411563},
                    {lng: 118.489838, lat: 37.431277},
                    {lng: 118.497904, lat: 37.462871}
                ],
                polygonPath8: [
                    {lng: 118.525941, lat: 37.463812},
                    {lng: 118.558356, lat: 37.464415},
                    {lng: 118.605225, lat: 37.464039},
                    {lng: 118.602099, lat: 37.353996},
                    {lng: 118.555602, lat: 37.361397},
                    {lng: 118.524683, lat: 37.411427}
                ],
                polygonPath2: [
                    {lng: 118.489838, lat: 37.431277},
                    {lng: 118.4979, lat: 37.46287},
                    {lng: 118.501866, lat: 37.478343},
                    {lng: 118.401938, lat: 37.484535},
                    {lng: 118.389124, lat: 37.433032}
                ],
                polygonPath3: [
                    {lng: 118.501839, lat: 37.47834},
                    {lng: 118.503016, lat: 37.504512},
                    {lng: 118.519311, lat: 37.519568},
                    {lng: 118.425982, lat: 37.552083},
                    {lng: 118.402123, lat: 37.484878}
                ],
                polygonPath4: [
                    {lng: 118.497918, lat: 37.462869},
                    {lng: 118.501839, lat: 37.47834},
                    {lng: 118.503016, lat: 37.504512},
                    {lng: 118.519311, lat: 37.519568},
                    {lng: 118.5585, lat: 37.520406},
                    {lng: 118.558356, lat: 37.464415}
                ],
                polygonPath5: [
                    {lng: 118.5585, lat: 37.520406},
                    {lng: 118.558356, lat: 37.464415},
                    {lng: 118.605302, lat: 37.464029},
                    {lng: 118.604493, lat: 37.476516},
                    {lng: 118.597882, lat: 37.520091}
                ],
                polygonPath6: [
                    {lng: 118.489838, lat: 37.431277},
                    {lng: 118.444339, lat: 37.432946},
                    {lng: 118.443764, lat: 37.390646},
                    {lng: 118.488226, lat: 37.389854}
                ],
                videoObj: {},
                videos: false,
                videoList: [],
                mapSelect: false,
                warningSelect: true,
                playerSelect: true,
                markers: {
                    show: false,
                    lng: 118.598237,
                    lat: 37.463098
                },
                msg: "",
                // th: "",
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
        components: {
            vueSeamless
        },
        computed: {
            // 无缝滚动
            optionCustomer() {
                return {
                    step: 0.8, // 数值越大速度滚动越快
                    limitMoveNum: this.videoList.length, // 开始无缝滚动的数据量 this.dataList.length
                    hoverStop: true, // 是否开启鼠标悬停stop
                    direction: 2, // 0向下 1向上 2向左 3向右
                    openWatch: true, // 开启数据实时监控刷新dom
                    singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
                    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
                    waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
                };
            },
            // 监控
            videoOption() {
                return {
                    live: false,
                    autoplay: false,
                    language: "zh-CN",
                    aspectRatio: "16:8",
                    fluid: true,
                    sources: [
                        {
                            // src: this.videoObj.videourl //url地址
                            src:
                                "http://hls01open.ys7.com/openlive/e2fb2c1f49e949cfac59ba80baee7a12.hd.m3u8"
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
                };
            }
        },
        watch: {
            // 提示
            number: function (val) {
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
            this.getData();
            this.getMapMark();
            this.getabnormal();
            this.getOli();
            this.getMaintainList();
            this.getInsuranceList();
            this.getOverageList();
            this.getTransboundaryList();
            this.getStagnationList();
            this.$nextTick(() => {
                this.getVideoList();
                this.total();
                this.drawLine();
                this.drawZx();
            });
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.getVideoList();
                }, 500);
            });
        },
        methods: {
            //折线图
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
            stringVideo() {
                this.$router.push("/town/supervision");
            },
            // 视频播放
            videoPlayer(item) {
                this.videos = true;
                this.videoObj = item;
                console.log(this.videoObj);
            },
            //视频接口
            getVideoList() {
                this.$http.post("/hw/main/video/list").then(res => {
                    console.log(res.data);
                    this.videoList = res.data;
                });
            },
            //页面控制
            addMap() {
                this.mapSelect = false;
                this.warningSelect = true;
                this.playerSelect = true;
            },
            addWarning() {
                this.mapSelect = true;
                this.warningSelect = false;
                this.playerSelect = true;
            },
            addPlayer() {
                this.mapSelect = true;
                this.warningSelect = true;
                this.playerSelect = false;
            },
            // 信息窗体
            infoWindowClose(markers) {
                this.markers.show = false;
            },
            infoWindowOpen(markers) {
                this.markers.show = true;
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
            searchMap() {
            },
            // 数据统计
            getData() {
                this.$http.post("hr/kaoqin/navbar").then(res => {
                    // console.log(res.data);
                    this.shuldData = res.data;
                });
            },
            // 测试
            getMapMark() {
                this.$http.post("xy/gpsSensor").then(res => {
                    // console.log(res.data)
                    this.marker = res.data;
                });
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
            margin: auto 0;

            .plateRightNumber {
                font-size: 36px !important;
                font-weight: 700;
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

<template>
  <!-- 车辆信息管理 -->
  <div>
    <div class="search">
      <div class="searchbox">
        <span>车牌号鲁E-</span>
        <el-input v-model="input" placeholder="请输入车牌号" style="width: 130px"></el-input>
      </div>
      <div class="searchbox">
        <span>车辆类型</span>
        <el-select v-model="search.type">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
          <el-option label="洒水车" value="洒水车"></el-option>
          <el-option label="清扫车" value="清扫车"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>负责道路</span>
        <el-select v-model="search.road">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="庐山路" value="庐山路"></el-option>
          <el-option label="宁阳路" value="宁阳路"></el-option>
          <el-option label="新泰路" value="新泰路"></el-option>
          <el-option label="北一路" value="北一路"></el-option>
          <el-option label="北二路" value="北二路"></el-option>
          <el-option label="黄河路" value="黄河路"></el-option>
          <el-option label="济南路" value="济南路"></el-option>
          <el-option label="淄博路" value="淄博路"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>作业区域</span>
        <el-select v-model="search.work">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="东营区新区" value="东营区新区"></el-option>
          <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
          <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
          <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
          <el-option label="胜园街道办事处" value="胜园街道办事处"></el-option>
          <el-option label="六户镇" value="六户镇"></el-option>
          <el-option label="牛庄镇" value="牛庄镇"></el-option>
          <el-option label="史口镇" value="史口镇"></el-option>
          <el-option label="龙居镇" value="龙居镇"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>单位</span>
        <el-select v-model="search.company">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
          <el-option label="环卫四部" value="环卫四部"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="btn">查询</el-button>
    </div>

    <div class="menu">
      <div class="filter">
        <el-radio v-model="radio" label="0">全部</el-radio>
        <el-radio v-model="radio" label="1">垃圾运输车</el-radio>
        <el-radio v-model="radio" label="2">清扫车</el-radio>
        <el-radio v-model="radio" label="3">洒水车</el-radio>
      </div>

      <div class="btn">
        <el-button icon="el-icon-plus" @click="showedit = true">添加车辆信息</el-button>
        <el-button icon="el-icon-download" @click="msgimport = true">车辆信息导入</el-button>
        <el-button icon="el-icon-upload2" @click="msgexport = true">车辆信息导出</el-button>
      </div>

      <el-dialog title="车况报警" :visible.sync="msgadd">
        <!-- <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <el-form-item label="车辆信息">
            <el-select v-model="msg.type" placeholder="请选择车辆类型" style="width: 100%">
              <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
              <el-option label="洒水车" value="洒水车"></el-option>
              <el-option label="清扫车" value="清扫车"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input v-model="msg.carbrand" placeholder="请输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="购车时间">
            <el-input v-model="msg.date" placeholder="请输入购车时间"></el-input>
          </el-form-item>
          <el-form-item label="资产编号">
            <el-input v-model="msg.num" placeholder="请输入资产编号"></el-input>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="msg.company" placeholder="请选择归属单位" style="width: 100%">
              <el-option label="环卫一部" value="一部"></el-option>
              <el-option label="环卫二部" value="二部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定司机">
            <el-input v-model="msg.driver" placeholder="请输入司机"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="msg.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="使用区域">
            <el-select v-model="msg.region" placeholder="请选择使用区域" style="width: 100%">
              <el-option label="东营南站" value="东营南站"></el-option>
              <el-option label="西湖公园" value="西湖公园"></el-option>
              <el-option label="翠湖公园" value="翠湖公园"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆维修情况">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 2}"
              placeholder="请输入内容"
              v-model="msg.service"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>-->
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="list">
            <!-- 此处data应为
            data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
            <el-table :data="warning" border style="width: 100%">
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
        </el-form>
      </el-dialog>

      <el-dialog title="车辆信息" width="450px" :visible.sync="showdetail">
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <el-form-item label="车辆信息">
            <el-select disabled v-model="msg.type" placeholder="请选择车辆类型" style="width: 100%">
              <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
              <el-option label="洒水车" value="洒水车"></el-option>
              <el-option label="清扫车" value="清扫车"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input readonly v-model="msg.carbrand" placeholder="请输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="购车时间">
            <el-input readonly v-model="msg.date" placeholder="请输入购车时间"></el-input>
          </el-form-item>
          <el-form-item label="资产编号">
            <el-input readonly v-model="msg.num" placeholder="请输入资产编号"></el-input>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select disabled v-model="msg.company" placeholder="请选择归属单位" style="width: 100%">
              <el-option label="环卫一部" value="一部"></el-option>
              <el-option label="环卫二部" value="二部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定司机">
            <el-input readonly v-model="msg.driver" placeholder="请输入司机"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input readonly v-model="msg.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="使用区域">
            <el-select disabled v-model="msg.region" placeholder="请选择使用区域" style="width: 100%">
              <el-option label="东营南站" value="东营南站"></el-option>
              <el-option label="西湖公园" value="西湖公园"></el-option>
              <el-option label="翠湖公园" value="翠湖公园"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆维修情况">
            <el-input
              readonly
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 2}"
              placeholder="请输入内容"
              v-model="msg.service"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showedit = true;showdetail = false">编辑</el-button>
        </span>
      </el-dialog>

      <el-dialog title="车辆编辑" width="450px" :visible.sync="showedit" @close="msg = {}">
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <el-form-item label="车辆信息">
            <el-select v-model="msg.type" placeholder="请选择车辆类型" style="width: 100%">
              <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
              <el-option label="洒水车" value="洒水车"></el-option>
              <el-option label="清扫车" value="清扫车"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车牌号">
            <el-input v-model="msg.carbrand" placeholder="请输入车牌号"></el-input>
          </el-form-item>
          <el-form-item label="购车时间">
            <el-input v-model="msg.date" placeholder="请输入购车时间"></el-input>
          </el-form-item>
          <el-form-item label="资产编号">
            <el-input v-model="msg.num" placeholder="请输入资产编号"></el-input>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="msg.company" placeholder="请选择归属单位" style="width: 100%">
              <el-option label="环卫一部" value="一部"></el-option>
              <el-option label="环卫二部" value="二部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定司机">
            <el-input v-model="msg.driver" placeholder="请输入司机"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="msg.phone" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="使用区域">
            <el-select v-model="msg.region" placeholder="请选择使用区域" style="width: 100%">
              <el-option label="东营南站" value="东营南站"></el-option>
              <el-option label="西湖公园" value="西湖公园"></el-option>
              <el-option label="翠湖公园" value="翠湖公园"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="车辆维修情况">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 2}"
              placeholder="请输入内容"
              v-model="msg.service"
              resize="none"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="showedit = false">取消</el-button>
          <el-button type="primary" @click="showedit = false">提交</el-button>
        </span>
      </el-dialog>

      <el-dialog title="信息导入" :visible.sync="msgimport" width="15%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-button type="primary" size="mini">下载</el-button>
        </div>
        <div class="download">
          <div>垃圾运输车信息模版</div>
          <el-button type="primary" size="mini">下载</el-button>
        </div>
        <div class="download">
          <div>清扫车信息模版</div>
          <el-button type="primary" size="mini">下载</el-button>
        </div>
        <div class="download">
          <div>洒水车信息模版</div>
          <el-button type="primary" size="mini">下载</el-button>
        </div>
      </el-dialog>

      <el-dialog title="信息导出" :visible.sync="msgexport" width="15%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
        <div class="download">
          <div>垃圾运输车信息模版</div>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
        <div class="download">
          <div>清扫车信息模版</div>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
        <div class="download">
          <div>洒水车信息模版</div>
          <el-button type="primary" size="mini">导出</el-button>
        </div>
      </el-dialog>
    </div>

    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        stripe
        border
        style="width: 100%"
        @row-click="showadd"
      >
        <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
        <el-table-column align="center" prop="date" label="购车时间"></el-table-column>
        <el-table-column align="center" prop="num" label="资产编号"></el-table-column>
        <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
        <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
        <el-table-column align="center" prop="phone" label="联系方式"></el-table-column>
        <el-table-column align="center" label="车况报警">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="carwarning(scope.$index, scope.row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="油耗报警">
          <template>
            <el-button type="primary" size="mini" @click.stop="showWarning">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保养记录">
          <template>
            <el-button type="primary" size="mini" @click.stop="showmaintenance">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保险缴纳">
          <template>
            <el-button type="primary" size="mini" @click.stop="showinsurance">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              class="btn"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              type="danger"
              class="btn"
              @click.stop="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :pager-count="21"
        layout="total, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
      ></el-pagination>
    </div>

    <!-- 油耗 -->
    <el-dialog title="油耗报警" :visible.sync="showwarning">
      <div class="list">
        <!-- 此处data应为
        data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)-->
        <el-table :data="oil" border style="width: 100%">
          <el-table-column align="center" prop="id" label="序号"></el-table-column>
          <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
          <el-table-column align="center" prop="consumption" label="车辆耗油量（L/100KM）"></el-table-column>
          <el-table-column align="center" prop="policeDate" label="报警日期"></el-table-column>
          <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
        </el-table>
      </div>
    </el-dialog>

    <!-- 保养记录 -->
    <el-dialog title="保养记录" :visible.sync="maintenance">
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form label-position="right" label-width="80px" :model="maintenanceMsg">
              <el-form-item label="日期">
                <el-input v-model="maintenanceMsg.date"></el-input>
              </el-form-item>
              <el-form-item label="负责人">
                <el-input v-model="maintenanceMsg.driver"></el-input>
              </el-form-item>
              <el-form-item label="上传图片">
                <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  multiple
                  :limit="3"
                >
                  <el-button size="medium" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="13">
          <div class="grid-content">
            <el-form label-position="right" label-width="80px" :model="maintenanceMsg">
              <el-form-item label="保养内容">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="maintenanceMsg.content"
                  :autosize="{ minRows: 7, maxRows: 4}"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="5" :offset="1">
          <div class="grid-content bg-purple">
            <el-button type="primary" style="width: 90%">添加</el-button>
          </div>
        </el-col>
      </el-row>

      <el-table :data="maintenanceList">
        <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
        <el-table-column align="center" prop="driver" label="保养人"></el-table-column>
        <el-table-column align="center" prop="date" label="保养时间"></el-table-column>
        <el-table-column align="center" prop="content" label="保养描述"></el-table-column>
        <el-table-column align="center" label="保养图片">
          <el-image
            class="img"
            style="width: 50px; height: 50px"
            :src="url"
            fit="fill"
            @click="showimgs"
          ></el-image>
          <el-image
            class="img"
            style="width: 50px; height: 50px"
            :src="url"
            fit="fill"
            @click="showimgs"
          ></el-image>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!-- 保养记录图片 -->
    <el-dialog title="Camera Image" width="550px" :visible.sync="showimg">
      <el-image style="width: 511px; height: 592px" :src="url" fit="contain"></el-image>
      <el-row class="imgcontent">
        <el-col :span="20">
          <div class="grid-content bg-purple">上传于： 2019-10-20</div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">APP上传</div>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 保险 -->
    <el-dialog title="保险缴纳" :visible.sync="showinsurancea">
      <div class="sytime">系统时间：2019-10-22</div>
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
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      input: null,
      radio: "0",
      data: {
        pagesize: 14,
        currpage: 1,
        list: []
      },
      search: {
        type: "全部",
        road: "全部",
        work: "全部",
        company: "全部"
      },
      msg: {},
      msgadd: false,
      msgimport: false,
      msgexport: false,
      showwarning: false,
      maintenance: false,
      showimg: false,
      showinsurancea: false,
      showdetail: false,
      showedit: false,
      url: "http://47.110.160.217:9071/images000/1.png",
      insuranceList: [
        {
          carbrand: "鲁E-562E4",
          company: "太平洋保险",
          effectivedate: "2019-02-30",
          warningdate: "2020-10-15"
        },
        {
          carbrand: "鲁E-359Y5",
          company: "太平洋保险",
          effectivedate: "2018-05-10",
          warningdate: "2019-09-19"
        }
      ],
      maintenanceMsg: {
        date: "",
        driver: "",
        img: "",
        content: ""
      },
      maintenanceList: [
        {
          carbrand: "鲁E-675G3",
          date: "2019-01-20",
          driver: "李诞",
          content: "前胎轮胎漏气，换内胎一只",
          img: ""
        },
        {
          carbrand: "鲁E-675G3",
          date: "2018-05-20",
          driver: "刘波",
          content: "车刹片维保",
          img: ""
        }
      ],
      warningList: [
        {
          remaining: 0,
          consumption: 0,
          maximum: 0,
          date: "0",
          carbrand: "鲁E-432R9",
          driver: "李诞"
        }
      ],
      carmsg: [
        {
          carbrand: "鲁E-432R9",
          driver: "李诞",
          engine: true
        }
      ],
      // 故障代码
      warning: [
        {
          number: 1,
          type: "垃圾运输车",
          carbrand: "鲁E-675G3",
          date: "2010-05-05",
          num: "环卫-A001",
          company: "发动机故障",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2010-05-03",
          policeTime: "08:00",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 2,
          type: "垃圾运输车",
          carbrand: "鲁E-675G3",
          date: "2011-12-22",
          num: "环卫-A001",
          company: "手刹故障",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2011-12-20",
          policeTime: "15:30",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 3,
          type: "垃圾运输车",
          carbrand: "鲁E-675G3",
          date: "2012-10-10",
          num: "环卫-A001",
          company: "水温过高",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2012-10-09",
          policeTime: "18:55",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        },
        {
          number: 4,
          type: "垃圾运输车",
          carbrand: "鲁E-675G3",
          date: "2013-03-20",
          num: "环卫-A001",
          company: "机油报警",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeDate: "2013-03-19",
          policeTime: "10:12",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting: "已处理"
        }
      ],
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
      value1: "",
      value2: "",
      msg: {
        number: ""
      },
      th: "0",
      // 油耗
      oil: [
        {
          id: 1,
          carbrand: "鲁E-675G3",
          consumption: "35 (标准值 ≤ 25)",
          policeDate: "2019-07-15",
          policeTime: "08:00"
        },
        {
          id: 2,
          carbrand: "鲁E-675G3",
          consumption: "30 (标准值 ≤ 25)",
          policeDate: "2019-08-20",
          policeTime: "15:25"
        },
        {
          id: 3,
          carbrand: "鲁E-675G3",
          consumption: "26 (标准值 ≤ 25)",
          policeDate: "2019-10-11",
          policeTime: "10:35"
        }
      ],
      // 保险
      insurance: [
        {
          id: 1,
          carbrand: "鲁E-675G3",
          expireday: 2,
          effectivedate: "2018-10-20",
          expiredate: "2019-10-20",
          driver: "李诞"
        },
        {
          id: 2,
          carbrand: "鲁E-675G3",
          expireday: 0,
          effectivedate: "2017-10-20",
          expiredate: "2018-10-20",
          driver: "李诞"
        },

        {
          id: 3,
          carbrand: "鲁E-675G3",
          expireday: 0,
          effectivedate: "2016-10-20",
          expiredate: "2017-10-20",
          driver: "李诞"
        }
      ]
    };
  },
  methods: {
    onSubmit() {},
    showinsurance() {
      this.showinsurancea = !this.showinsurancea;
    },
    showimgs() {
      console.log(111);

      this.showimg = !this.showimg;
    },
    showmaintenance() {
      this.maintenance = !this.maintenance;
    },
    showWarning() {
      this.showwarning = !this.showwarning;
    },
    date() {
      for (let i = 0; i < 1; i++) {
        this.data.list.push({
          sid: i,
          type: "垃圾清运车",
          carbrand: "鲁E-675G3",
          date: "2011.10.20",
          num: "环卫-A001",
          company: "环卫一部",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          service: ""
        });
      }
    },
    nextpage(value) {
      this.data.currpage = value;
    },
    showadd(row) {
      console.log(row);
    },
    carwarning(index, row) {
      this.msg = row;
      this.msgadd = !this.msgadd;
    },
    handleEdit(index, row) {
      this.msg = row;
      this.showdetail = !this.showdetail;
    },
    handleDelete(index, row) {
      console.log("删除第" + row.sid + "个信息");
    }
  },
  created() {
    this.date();
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 20px 0;
  .searchbox {
    float: left;
    padding-left: 10px;
    span {
      padding-right: 10px;
    }
  }
  .btn {
    margin-left: 15px;
  }
}

.menu {
  .filter {
    float: left;
  }
  .btn {
    float: right;
    margin-bottom: 10px;
  }
}

.list {
  button {
    margin-left: 15px;
  }
  .btn {
    width: 50px;
    margin-left: 0;
    text-align: center;
  }
}

.download {
  height: 40px;
  div {
    float: left;
    line-height: 30px;
  }
  button {
    float: right;
  }
}

.pagination {
  position: fixed;
  bottom: 50px;
  right: 50px;
  padding-top: 40px;
}

.img {
  margin-right: 5px;
}
.imgcontent {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #d2d2d2;
}

.sytime {
  float: right;
  margin-right: 10px;
  padding-bottom: 10px;
  color: red;
}
</style>
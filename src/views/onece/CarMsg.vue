<template>
  <!-- 车辆信息管理 -->
  <div>
    <!-- 搜索 -->
    <div class="search">
      <div class="searchbox">
        <span>车牌号鲁E-</span>
        <el-input
          v-model="search.busnumber"
          placeholder="请输入车牌号"
          style="width: 130px"
          maxlength="5"
        ></el-input>
      </div>
      <div class="searchbox">
        <span>车辆类型</span>
        <el-select v-model="search.cartype">
          <el-option label="全部" value></el-option>
          <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
          <el-option label="洒水车" value="洒水车"></el-option>
          <el-option label="清扫车" value="清扫车"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>作业区域</span>
        <el-select v-model="search.area">
          <el-option label="全部" value></el-option>
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
        <span>所属单位</span>
        <el-select v-model="search.department">
          <el-option label="全部" value></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
          <el-option label="环卫四部" value="环卫四部"></el-option>
        </el-select>
      </div>
      <el-button type="primary" class="btn" @click="searchBtn">查询</el-button>
      <el-button type="primary" @click="empty">清空</el-button>
    </div>

    <!-- 导出按钮 -->
    <div class="menu">
      <div class="btn">
        <el-button
          icon="el-icon-plus"
          @click="showedit = true;type = 'add';addedittitle = '车辆信息新增';"
        >添加车辆信息</el-button>
        <el-button icon="el-icon-download" @click="msgexport = true">车辆信息导出</el-button>
        <el-button icon="el-icon-upload2" @click="msgimport = true">车辆信息导入</el-button>
      </div>

      <!-- 信息导出 -->
      <el-dialog title="信息导出" :visible.sync="msgexport" width="15%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-button type="primary" size="mini" @click="exportmsg">导出</el-button>
        </div>
        <div class="download">
          <div>垃圾清运车信息模版</div>
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

      <!-- 信息导入 -->
      <el-dialog title="信息导入" :visible.sync="msgimport" width="30%" center>
        <div class="download">
          <div>全部信息模版</div>
          <el-upload
            class="upload-demo"
            :action="$http.defaults.baseURL +  'MotorDetail/importExcel'"
            :on-success="success"
            :show-file-list="false"
            :limit="1"
            style="float: right;"
          >
            <el-button type="primary" size="mini">上传</el-button>
          </el-upload>
        </div>
        <div class="download">
          <div>垃圾清运车信息模版</div>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
        <div class="download">
          <div>清扫车信息模版</div>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
        <div class="download">
          <div>洒水车信息模版</div>
          <el-button type="primary" size="mini">上传</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 列表 -->
    <div class="list">
      <el-table
        :data="data.list.slice((data.currpage-1) * data.pagesize, data.currpage * data.pagesize)"
        stripe
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="busnumber" label="车牌号"></el-table-column>
        <el-table-column align="center" prop="cartype" label="车辆类型"></el-table-column>
        <el-table-column align="center" prop="shoppingtime" label="购车时间"></el-table-column>
        <el-table-column align="center" prop="member" label="资产编号"></el-table-column>
        <el-table-column align="center" prop="area" label="作业区域"></el-table-column>
        <el-table-column align="center" prop="department" label="归属单位"></el-table-column>
        <el-table-column align="center" prop="user" label="指定司机"></el-table-column>
        <el-table-column align="center" prop="param3" label="联系方式"></el-table-column>
        <el-table-column align="center" label="维修保养">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showmain(scope.row);">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保险缴纳">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showinsurance(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="历史行车轨迹">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click.stop="showWarning(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" width="160" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              class="btn"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              class="btn"
              @click.stop="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :current-page="data.currpage"
        :page-size="data.pagesize"
        :page-sizes="[15, 20, 25]"
        layout="total, sizes, prev, pager, next"
        :total="data.list.length"
        @prev-click="nextpage"
        @next-click="nextpage"
        @current-change="nextpage"
        @size-change="sizeChange"
      ></el-pagination>
    </div>

    <!-- 车辆信息 -->
    <el-dialog title="车辆信息" width="450px" :visible.sync="showdetail" @close="msg = {}">
      <el-form ref="form" :model="msg" label-width="auto" class="msg">
        <el-form-item label="车辆信息">
          <el-select disabled v-model="msg.cartype" placeholder="请选择车辆类型" style="width: 100%">
            <el-option label="垃圾运输车" value="垃圾运输车"></el-option>
            <el-option label="洒水车" value="洒水车"></el-option>
            <el-option label="清扫车" value="清扫车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input readonly v-model="msg.busnumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input readonly v-model="msg.shoppingtime" placeholder="请输入购车时间"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input readonly v-model="msg.member" placeholder="请输入资产编号"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select disabled v-model="msg.department" placeholder="请选择归属单位" style="width: 100%">
            <el-option label="环卫一部" value="一部"></el-option>
            <el-option label="环卫二部" value="二部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input readonly v-model="msg.user" placeholder="请输入司机"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input readonly v-model="msg.param3" placeholder="请输入联系方式"></el-input>
        </el-form-item>
        <el-form-item label="使用区域">
          <el-select disabled v-model="msg.area" placeholder="请选择使用区域" style="width: 100%">
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
            v-model="msg.repairdetail"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 车辆编辑 -->
    <el-dialog :title="addedittitle" width="450px" :visible.sync="showedit" @close="msg = {};">
      <el-form ref="ruleForm" :model="msg" :rules="rules" label-width="auto" class="msg">
        <el-form-item label="车辆信息" prop="cartype">
          <el-select v-model="msg.cartype" placeholder="请选择车辆类型" style="width: 100%">
            <el-option label="垃圾清运车" value="垃圾清运车"></el-option>
            <el-option label="洒水车" value="洒水车"></el-option>
            <el-option label="清扫车" value="清扫车"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号" prop="busnumber">
          <el-input v-model="msg.busnumber" placeholder="请输入车牌号"></el-input>
        </el-form-item>
        <el-form-item label="购车时间" prop="shoppingtime">
          <el-date-picker
            v-model="msg.shoppingtime"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            style="width: 332px;"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="资产编号" prop="member">
          <el-input v-model="msg.member" placeholder="请输入资产编号"></el-input>
        </el-form-item>
        <el-form-item label="归属单位" prop="department">
          <el-select v-model="msg.department" placeholder="请选择归属单位" style="width: 100%">
            <el-option label="环卫一部" value="环卫一部"></el-option>
            <el-option label="环卫二部" value="环卫二部"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用区域" prop="area">
          <el-select v-model="msg.area" placeholder="请选择使用区域" style="width: 100%">
            <el-option label="东营南站" value="东营南站"></el-option>
            <el-option label="西湖公园" value="西湖公园"></el-option>
            <el-option label="翠湖公园" value="翠湖公园"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机" prop="user">
          <el-input v-model="msg.user" placeholder="请输入司机"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="param3">
          <el-input v-model="msg.param3" placeholder="请输入联系方式"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showedit = false">取消</el-button>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>

    <!-- 历史行车轨迹 -->
    <el-dialog title="历史行车轨迹" :visible.sync="showwarning">
      <div class="abnormalsearch">
        <span style="margin-right: 10px">
          类型
          <el-select v-model="history.search.type" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="正常行驶" value="正常行驶"></el-option>
            <el-option label="越界行驶" value="越界行驶"></el-option>
          </el-select>
        </span>
        <span>
          记录时间段
          <el-date-picker
            v-model="history.search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
          <div class="btn">
            <el-button type="primary">搜索</el-button>
            <el-button type="primary">清空</el-button>
          </div>
        </span>
      </div>
      <div class="list">
        <el-table
          :data="history.list.slice((history.currpage - 1) * history.pagesize, history.currpage * history.pagesize)"
          border
          style="width: 100%"
        >
          <el-table-column align="center" prop="num" label="序号"></el-table-column>
          <el-table-column align="center" prop="checkgastime" label="记录时间"></el-table-column>
          <el-table-column align="center" prop="param1" label="类型"></el-table-column>
          <el-table-column align="center" label="行车轨迹">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click.stop="showhistory(scope.row)">播放行车轨迹</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            :current-page="history.currpage"
            :page-size="history.pagesize"
            layout="total, prev, pager, next"
            :total="history.list.length"
            @prev-click="historynextpage"
            @next-click="historynextpage"
            @current-change="historynextpage"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>

    <!-- 维修保养 -->
    <el-dialog title="维修保养" :visible.sync="maintenance" style="overflow: hidden;">
      <el-form
        ref="maintenanceForm"
        :rules="maintenanceRules"
        label-position="right"
        label-width="80px"
        :model="maintenanceList.addmsg"
      >
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="日期" prop="maintaintime">
                <el-date-picker
                  style="width:150px"
                  value-format="yyyy-MM-dd"
                  v-model="maintenanceList.addmsg.maintaintime"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="类型" prop="param1">
                <el-select v-model="maintenanceList.addmsg.param1" placeholder="请选择">
                  <el-option label="全部" value></el-option>
                  <el-option label="维修" value="维修"></el-option>
                  <el-option label="保养" value="保养"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上传图片" prop="img">
                <el-upload
                  ref="uploadimg"
                  class="upload-demo"
                  :action="$http.defaults.baseURL + 'MotorDetail/addBaoYangInformation'"
                  :file-list="maintenanceList.addmsg.fileList"
                  :on-change="onChange"
                  :on-remove="onRemove"
                  :on-success="uploadimgSuccess"
                  :data="maintenanceList.addmsg"
                  multiple
                  :auto-upload="false"
                  :limit="3"
                >
                  <el-button size="medium" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="12" :offset="1">
            <div class="grid-content">
              <el-form-item label="保养内容" prop="maintaindiscript">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="maintenanceList.addmsg.maintaindiscript"
                  :autosize="{ minRows: 7, maxRows: 4}"
                ></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="5" :offset="1">
            <div class="grid-content bg-purple">
              <el-button type="primary" style="width: 80%" @click="maintenanceSubmit">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <div class="abnormalsearch" style="margin: 10px 0">
        <span style="margin-right: 10px">
          类型
          <el-select v-model="maintenanceList.search.param1" placeholder="请选择">
            <el-option label="全部" value></el-option>
            <el-option label="维修" value="维修"></el-option>
            <el-option label="保养" value="保养"></el-option>
          </el-select>
        </span>
        <span>
          记录时间段
          <el-date-picker
            v-model="maintenanceList.search.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <div class="btn">
            <el-button type="primary" @click="showmaintenance">搜索</el-button>
            <el-button type="primary">清空</el-button>
          </div>
        </span>
      </div>

      <el-table
        :data="maintenanceList.list.slice((maintenanceList.currpage - 1) * maintenanceList.pagesize, maintenanceList.currpage * maintenanceList.pagesize)"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="maintaintime" label="维修/保养时间"></el-table-column>
        <el-table-column align="center" prop="param1" label="类型"></el-table-column>
        <el-table-column align="center" prop="maintaindiscript" label="保养详情"></el-table-column>
        <el-table-column align="center" label="保养图片">
          <template slot-scope="scope">
            <el-image
              v-for="(item, i) in scope.row.maintainfile"
              :key="i"
              class="img"
              style="width: 50px; height: 50px"
              :src="item"
              fit="fill"
              @click="showimgs(item)"
            ></el-image>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page="maintenanceList.currpage"
          :page-size="maintenanceList.pagesize"
          layout="total, prev, pager, next"
          :total="maintenanceList.list.length"
          @prev-click="maintenancenextpage"
          @next-click="maintenancenextpage"
          @current-change="maintenancenextpage"
        ></el-pagination>
      </div>
    </el-dialog>

    <!-- 保养记录图片 -->
    <el-dialog title="保养图片" width="550px" :visible.sync="showimg" :lock-scroll="false">
      <el-image style="width: 100%;" :src="url" fit="contain"></el-image>
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
      <el-form
        ref="insuranceaFrom"
        :inline="true"
        :rules="insurancearules"
        :model="insuranceList.addmsg"
        class="demo-form-inline"
      >
        <div class="abnormalsearch">
          <el-form-item label="保险公司：" prop="bxcompany">
            <el-input
              style="width:150px;margin-right: 10px;"
              v-model="insuranceList.addmsg.bxcompany"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="缴纳日期：" prop="bxtime">
            <el-date-picker
              style="width:150px;margin-right: 10px;"
              v-model="insuranceList.addmsg.bxtime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="到期日期：" prop="param1">
            <el-date-picker
              style="width:150px;"
              v-model="insuranceList.addmsg.param1"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click="abnormaladd">添加</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div class="sytime">系统时间：2019-10-22</div>
      <el-table
        :data="insuranceList.list.slice((insuranceList.currpage - 1) * insuranceList.pagesize, insuranceList.currpage * insuranceList.pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="num" label="序号"></el-table-column>
        <el-table-column align="center" prop="param2" label="记录时间"></el-table-column>
        <el-table-column align="center" prop="bxcompany" label="保险公司"></el-table-column>
        <el-table-column align="center" prop="bxtime" label="生效时间"></el-table-column>
        <el-table-column align="center" prop="param1" label="到期时间"></el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination">
        <el-pagination
          :current-page="insuranceList.currpage"
          :page-size="insuranceList.pagesize"
          layout="total, prev, pager, next"
          :total="insuranceList.list.length"
          @prev-click="insuranceListnextpage"
          @next-click="insuranceListnextpage"
          @current-change="insuranceListnextpage"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // 首屏搜索
      search: {
        busnumber: "",
        area: "",
        department: "",
        cartype: ""
      },
      // 首屏新增/详情/编辑
      msg: {
        cartype: "",
        busnumber: "",
        shoppingtime: "",
        member: "",
        department: "",
        user: "",
        area: "",
        repairdetail: "",
        param3: ""
      },
      // 分页效果
      data: {
        pagesize: 15,
        currpage: 1,
        list: []
      },
      // 车况异常
      condition: {
        search: {
          date: ""
        },
        list: []
      },
      // 历史行车轨迹
      history: {
        search: {
          date: "",
          type: ""
        },
        list: [
          {
            num: "1",
            checkgastime: "2019-11-02",
            param1: "正常行驶"
          }
        ],
        pagesize: 10,
        currpage: 1
      },
      // 保养记录
      maintenanceList: {
        addmsg: {
          busnumber: "",
          maintaintime: "",
          param1: "",
          maintaindiscript: "",
          fileList: []
        },
        search: {
          param1: "",
          date: "",
          busnumber: ""
        },
        pagesize: 5,
        currpage: 1,
        list: []
      },
      // 保养记录非空验证
      maintenanceRules: {
        maintaintime: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ],
        param1: [{ required: true, message: "请选择类型", trigger: "blur" }],
        maintaindiscript: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        img: [{ required: true, message: "请选择上传图片" }]
      },
      // 保养记录 点击后大图片
      url: "",
      // 保险
      insuranceList: {
        busnumber: "",
        addmsg: {
          busnumber: "",
          bxcompany: "",
          bxtime: "",
          param1: ""
        },
        list: [],
        pagesize: 10,
        currpage: 1
      },
      // 保险非空验证
      insurancearules: {
        bxcompany: [
          { required: true, message: "请输入保险公司", trigger: "blur" }
        ],
        bxtime: [
          { required: true, message: "请选择缴纳日期", trigger: "blur" }
        ],
        param1: [{ required: true, message: "请选择到期日期", trigger: "blur" }]
      },
      // 编辑和新增修改切换及标题
      type: "add",
      addedittitle: "",
      // 新增判断
      rules: {
        cartype: [
          { required: true, message: "请选择车辆信息", trigger: "blur" }
        ],
        busnumber: [
          { required: true, message: "请输入车牌号", trigger: "blur" }
        ],
        shoppingtime: [
          { required: true, message: "请输入购买时间", trigger: "blur" }
        ],
        member: [
          { required: true, message: "请输入资产编号", trigger: "blur" }
        ],
        department: [
          { required: true, message: "请输入归属单位", trigger: "blur" }
        ],
        user: [{ required: true, message: "请输入指定司机", trigger: "blur" }],
        param3: [
          { required: true, message: "请输入联系方式", trigger: "blur" }
        ],
        area: [{ required: true, message: "请选择使用区域", trigger: "blur" }]
      },
      // 图片上传列表
      fileList: [],
      // 图片上传判断
      imgupload: false,
      // 弹出层切换
      maintenance: false,
      msgimport: false,
      msgexport: false,
      showwarning: false,
      insurance: false,
      showimg: false,
      showinsurancea: false,
      showdetail: false,
      showedit: false
    };
  },
  methods: {
    // 保养记录显示具体图片
    showimgs(v) {
      this.url = v;
      this.showimg = !this.showimg;
    },
    // 显示保养记录
    showmain(row) {
      this.maintenance = !this.maintenance;
      this.maintenanceList.search.busnumber = row.busnumber;
      this.maintenanceList.addmsg.busnumber = row.busnumber;
      this.showmaintenance();
    },
    // 保养列表获取
    showmaintenance() {
      if (this.maintenanceList.search.date != null) {
        this.maintenanceList.search.startTime = this.maintenanceList.search.date[0];
        this.maintenanceList.search.endTime = this.maintenanceList.search.date[1];
      } else if (this.maintenanceList.search.date == null) {
        this.maintenanceList.search.startTime = "";
        this.maintenanceList.search.endTime = "";
      }
      this.data.currpage = 1;
      this.$http
        .post(
          "manage/baoYangCriteriaQuery",
          this.$qs.stringify(this.maintenanceList.search)
        )
        .then(res => {
          for (const key in res.data) {
            res.data[key].maintainfile = res.data[key].maintainfile.split(";");
          }
          this.maintenanceList.list = res.data;
          this.imgupload = false;
          this.maintenanceRules.img = [
            { required: true, message: "请选择上传图片" }
          ];
        });
    },
    // 保养记录上传
    maintenanceSubmit() {
      if (this.imgupload) {
        this.maintenanceRules.img = [];
        this.$refs["maintenanceForm"].validate(valid => {
          if (valid) {
            this.$refs.uploadimg.submit();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.$refs["maintenanceForm"].validate();
      }
      console.log(this.imgupload);
    },
    // 保养记录上传成功回调
    uploadimgSuccess(response, file, fileList) {
      this.$message({
        message: "添加记录成功",
        type: "success",
        offset: 165
      });
      this.maintenanceList.addmsg = {
        busnumber: "",
        maintaintime: "",
        param1: "",
        maintaindiscript: "",
        fileList: []
      };
      this.showmaintenance();
    },
    // 保养记录图片添加非空验证
    onChange(file, filelist) {
      if (filelist.length != 0) {
        this.$refs["maintenanceForm"].clearValidate("img");
        this.imgupload = true;
      }
    },
    // 保养记录图片删除非空验证
    onRemove(file, filelist) {
      if (filelist.length == 0) {
        this.maintenanceRules.img = [
          { required: true, message: "请选择上传图片" }
        ];
        this.$refs["maintenanceForm"].validateField("img");
        this.imgupload = false;
      }
    },
    // 保养记录下一页
    maintenancenextpage(value) {
      this.maintenanceList.currpage = value;
    },
    // 显示保险列表
    showinsurance(row) {
      this.showinsurancea = !this.showinsurancea;
      this.insuranceList.busnumber = row.busnumber;
      this.insuranceList.addmsg.busnumber = row.busnumber;
      this.getInsurance();
    },
    // 获取保险列表
    getInsurance() {
      this.$http
        .post(
          "MotorDetail/getBXByBusNumber",
          this.$qs.stringify(this.insuranceList.addmsg)
        )
        .then(res => {
          this.insuranceList.list = res.data;
        });
    },
    // 保险添加
    abnormaladd() {
      this.$refs["insuranceaFrom"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "MotorDetail/addBaoXianInformation",
              this.$qs.stringify(this.insuranceList.addmsg)
            )
            .then(res => {
              this.$message({
                type: "success",
                message: "新增成功！",
                offset: 150
              });
              this.getInsurance();
              this.insuranceList.addmsg = {
                busnumber: this.insuranceList.busnumber,
                bxcompany: "",
                bxtime: "",
                param1: ""
              };
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 保险下翻页
    insuranceListnextpage(value) {
      this.insuranceList.currpage = value;
    },
    // 历史行车轨迹
    showWarning(row) {
      this.showwarning = !this.showwarning;
    },
    // 历史轨迹翻页
    historynextpage(value) {
      this.history.currpage = value;
    },
    // 播放行车轨迹
    showhistory(row) {
      this.$router.push({ name: "vehicle" });
    },
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示条数切换
    sizeChange(total) {
      console.log(total);
      this.data.pagesize = total;
    },
    // 显示详情
    handleDetail(index, row) {
      this.msg = row;
      this.showdetail = !this.showdetail;
    },
    // 显示编辑
    handleEdit(index, row) {
      this.type = "edit";
      this.addedittitle = "车辆信息编辑";
      this.msg = JSON.parse(JSON.stringify(row));
      this.showedit = !this.showedit;
    },
    // 删除
    handleDelete(index, row) {
      console.log(row.sid);
      this.$confirm("此操作将删除此数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post(
              "MotorDetail/deleteMotorInformationBySid",
              this.$qs.stringify({ sid: row.sid })
            )
            .then(res => {
              console.log(res);
              this.getCarList();
            });
          this.$message({
            type: "success",
            message: "删除成功!",
            offset: 155
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            offset: 155
          });
        });
    },
    // 获取列表
    getCarList() {
      this.$http.get("MotorDetail/getAllMotorInformation").then(res => {
        this.data.list = res.data;
      });
    },
    // 搜索按钮
    searchBtn() {
      this.data.currpage = 1;
      this.$http
        .post(
          "MotorDetail/motorInformationCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          console.log(res);
          this.data.list = res.data;
        });
    },
    // 清空查询
    empty() {
      this.search = {
        busnumber: "",
        param2: "",
        area: "",
        department: "",
        cartype: ""
      };
      this.searchBtn();
    },
    // 编辑/新增提交
    onsubmit() {
      this.showedit = false;
      if (this.type == "edit") {
        console.log();
        if (this.msg.busnumber.indexOf(`鲁E-`) == -1) {
          this.msg.busnumber = "鲁E-" + this.msg.busnumber;
        }
        this.$http
          .post(
            "MotorDetail/updateMotorInformation",
            this.$qs.stringify(this.msg)
          )
          .then(res => {
            this.$options.methods.getCarList.call(this);
            this.$message({
              type: "success",
              showClose: true,
              message: "编辑成功",
              offset: 155
            });
          });
      } else if (this.type == "add") {
        if (this.msg.busnumber.indexOf(`鲁E-`) == -1) {
          this.msg.busnumber = "鲁E-" + this.msg.busnumber;
        }
        this.$http
          .post("MotorDetail/addMotorInformation", this.$qs.stringify(this.msg))
          .then(res => {
            this.$options.methods.getCarList.call(this);
            this.$message({
              type: "success",
              showClose: true,
              message: "新增成功",
              offset: 155
            });
          });
      }
    },
    // 表单验证
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.onsubmit();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 信息导出
    exportmsg() {
      location.href =
        this.$http.defaults.baseUR + "MotorDetail/exportMotorDetailExcel";
    },
    // 信息导入
    success(response, file) {
      console.log(response.status);
      if (response.status == "1") {
        this.$message({
          message: "导入成功",
          type: "success",
          offset: 155
        });
      } else if (response.status == "0") {
        this.$message({
          message: "导入失败，请重试",
          type: "error",
          offset: 155
        });
      }
      this.getCarList();
      this.msgimport = !this.msgimport;
    }
  },
  watch: {
    search() {
      this.search.busnumber = this.search.busnumber.replace(/[\W]/g, "");
    }
  },
  created() {
    this.getCarList();
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
  float: right;
  margin-right: 25px;
  padding-top: 20px;
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

.abnormalsearch {
  margin-bottom: 10px;
  .btn {
    float: right;
    border-radius: 5px;
    margin-left: 15px;
  }
}

.row-bg {
  border-bottom: 1px solid #d2d2d2;
}
</style>
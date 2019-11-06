<template>
  <!-- 系统通知 -->
  <div id="base">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="日期">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="标题">
            <el-input class="searchInput" v-model="search.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getAddBook">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- 按钮 -->
    <div class="searchBot" style="float: right;margin-bottom: 10px;">
      <el-button class="buttonBot" icon="el-icon-plus" @click="dialogVisible = true">新建通知</el-button>
      <el-button icon="el-icon-download" class="buttonBotLast" @click="excellist">导出数据</el-button>
    </div>

    <!-- 列表 -->
    <div id="table">
      <el-table
        :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
        border
        style="width: 100%"
      >
        <el-table-column align="center" prop="time" label="通知时间"></el-table-column>
        <el-table-column align="center" prop="title" label="通知标题"></el-table-column>
        <el-table-column align="center" prop="type" label="通知类型"></el-table-column>
        <el-table-column align="center" prop="users" label="通知用户"></el-table-column>
        <el-table-column align="center" prop="status" label="状态"></el-table-column>
        <el-table-column align="center" fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              class="tableButton1"
              type="button"
              size="small"
              @click="showdetail(scope.row, scope.$index)"
            >详情</el-button>
            <el-button
              class="tableButton2"
              type="button"
              size="small"
              @click="showrelease(scope.row, scope.$index)"
            >发布</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
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

    <!-- 新建通知 -->
    <el-dialog title="新建通知" :visible.sync="dialogVisible" width="705px" class="dialogText">
      <el-form
        ref="ruleForm"
        :inline="true"
        :rules="newrules"
        :model="newformInline"
        class="demo-form-inline"
      >
        <div class="newbox">
          <el-form-item label="通知标题" prop="title">
            <el-input
              style="width:548px"
              maxlength="20"
              show-word-limit
              v-model="newformInline.title"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知内容" prop="message">
            <el-input
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 7}"
              style="width: 548px"
              resize="none"
              maxlength="200"
              show-word-limit
              v-model="newformInline.message"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知类型" prop="type">
            <el-select v-model="newformInline.type" class="selectTop" @change="clearchange">
              <el-option label="部门通知" value="部门通知"></el-option>
              <el-option label="区域通知" value="区域通知"></el-option>
              <el-option label="岗位通知" value="岗位通知"></el-option>
              <el-option label="个人通知" value="个人通知"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item v-if="newformInline.type === '部门通知'" label="部门通知" prop="depart">
            <el-select v-model="newformInline.users" class="selectTop">
              <el-option label="所有部门" value></el-option>
              <el-option label="环卫一部" value="环卫一部"></el-option>
              <el-option label="环卫二部" value="环卫二部"></el-option>
              <el-option label="环卫三部" value="环卫三部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="newformInline.type === '区域通知'" label="区域通知" prop="area">
            <el-select v-model="newformInline.users" class="selectTop">
              <el-option label="所有区域" value></el-option>
              <el-option label="东营区新区" value="东营区新区"></el-option>
              <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
              <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="newformInline.type === '岗位通知'" label="岗位通知" prop="job">
            <el-select v-model="newformInline.users" class="selectTop">
              <el-option label="所有岗位" value></el-option>
              <el-option label="环卫工" value="环卫工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="newformInline.type === '个人通知'" label="个人通知" prop="users">
            <el-autocomplete
              style="width: 240px"
              v-model="newformInline.users"
              placeholder="请输入关键字搜索"
              :fetch-suggestions="querySearch"
            ></el-autocomplete>
            <div style="color: red"> * 多人通知请用 / 符号分割</div>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="onSubimt" class="formButon">保存</el-button>
      </span>
    </el-dialog>

    <!-- 通知详情 -->
    <el-dialog title="通知详情" :visible.sync="detail" width="705px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div class="newbox">
          <el-form-item label="通知日期">
            <el-date-picker readonly v-model="formInline.time" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="通知状态">
            <el-select style="width: 240px" v-model="formInline.status" disabled placeholder="请选择">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="未发布" value="未发布"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知标题">
            <el-input
              readonly
              style="width:558px"
              maxlength="20"
              show-word-limit
              v-model="formInline.title"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知内容">
            <el-input
              readonly
              type="textarea"
              :autosize="{ minRows: 7, maxRows: 7}"
              style="width: 558px"
              resize="none"
              maxlength="200"
              show-word-limit
              v-model="formInline.message"
            ></el-input>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item label="通知类型">
            <el-select v-model="formInline.type" disabled class="selectTop">
              <el-option label="部门通知" value="部门通知"></el-option>
              <el-option label="区域通知" value="区域通知"></el-option>
              <el-option label="岗位通知" value="岗位通知"></el-option>
              <el-option label="个人通知" value="个人通知"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="newbox">
          <el-form-item v-if="formInline.type === '部门通知'" label="部门通知">
            <el-select v-model="formInline.users" disabled class="selectTop">
              <el-option label="所有部门" value></el-option>
              <el-option label="环卫一部" value="环卫一部"></el-option>
              <el-option label="环卫二部" value="环卫二部"></el-option>
              <el-option label="环卫三部" value="环卫三部"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="formInline.type === '区域通知'" label="区域通知">
            <el-select v-model="formInline.users" disabled class="selectTop">
              <el-option label="所有区域" value></el-option>
              <el-option label="东营区新区" value="东营区新区"></el-option>
              <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
              <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="formInline.type === '岗位通知'" label="岗位通知">
            <el-select v-model="formInline.users" disabled class="selectTop">
              <el-option label="所有岗位" value></el-option>
              <el-option label="环卫工" value="环卫工"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else-if="formInline.type === '个人通知'" label="个人通知">
            <el-autocomplete
              disabled
              style="width: 240px"
              v-model="formInline.users"
              placeholder="请输入关键字搜索"
              :fetch-suggestions="querySearch"
            ></el-autocomplete>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>

    <!-- 通知发布 -->
    <el-dialog title="通知发布" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-date-picker style="width:390px" v-model="submitdate" type="datetime" placeholder="选择日期时间"></el-date-picker>
      <span slot="footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="adddate" class="formButon">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      // 新建通知
      newformInline: {
        title: "",
        type: "",
        users: "",
        message: ""
      },
      // 新建通知非空验证
      newrules: {
        title: [{ required: true, message: "请输入通知标题", trigger: "blur" }],

        message: [
          { required: true, message: "请输入通知内容", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择通知类型", trigger: "blur" }],
        users: [{ required: true, message: "请输入通知人员", trigger: "blur" }]
      },
      // 通知详情
      formInline: {
        time: "",
        title: "",
        type: "",
        users: "",
        status: "",
        message: ""
      },
      detail: false,
      dialogVisible: false,
      dialogFormVisible: false,
      // 搜索
      search: {
        title: "",
        time: "",
        date: "",
        startTime: "",
        endTime: ""
      },
      // 列表数据
      data: {
        pagesize: 13,
        currpage: 1,
        list: []
      },
      // 新建通知名字模糊搜索
      restaurants: [
        { value: "三全鲜食（北新泾店）" },
        { value: "Hot honey 首尔炸鸡（仙霞路）" },
        { value: "新旺角茶餐厅" },
        { value: "泷千家(天山西路店)" },
        { value: "胖仙女纸杯蛋糕（上海凌空店）" },
        { value: "贡茶" },
        { value: "豪大大香鸡排超级奶爸" },
        { value: "茶芝兰（奶茶，手抓饼）" },
        { value: "十二泷町" },
        { value: "星移浓缩咖啡" },
        { value: "阿姨奶茶/豪大大" },
        { value: "新麦甜四季甜品炸鸡" },
        { value: "Monica摩托主题咖啡店" },
        { value: "浮生若茶（凌空soho店）" },
        { value: "NONO JUICE  鲜榨果汁" },
        { value: "CoCo都可(北新泾店）" },
        { value: "快乐柠檬（神州智慧店）" },
        { value: "Merci Paul cafe" },
        { value: "猫山王（西郊百联店）" },
        { value: "枪会山" },
        { value: "纵食" },
        { value: "钱记" },
        { value: "壹杯加" },
        { value: "唦哇嘀咖" },
        { value: "爱茜茜里(西郊百联)" },
        { value: "爱茜茜里(近铁广场)" },
        { value: "鲜果榨汁（金沙江路和美广店）" },
        { value: "开心丽果（缤谷店）" },
        { value: "超级鸡车（丰庄路店）" },
        { value: "妙生活果园（北新泾店）" },
        { value: "香宜度麻辣香锅" },
        { value: "凡仔汉堡（老真北路店）" },
        { value: "港式小铺" },
        { value: "蜀香源麻辣香锅（剑河路店）" },
        { value: "北京饺子馆" },
        { value: "饭典*新简餐（凌空SOHO店）" },
        { value: "焦耳·川式快餐（金钟路店）" },
        { value: "动力鸡车" },
        { value: "浏阳蒸菜" },
        { value: "四海游龙（天山西路店）" },
        { value: "樱花食堂（凌空店）" },
        { value: "壹分米客家传统调制米粉(天山店)" },
        { value: "福荣祥烧腊（平溪路店）" },
        { value: "速记黄焖鸡米饭" },
        { value: "红辣椒麻辣烫" },
        { value: "(小杨生煎)西郊百联餐厅" },
        { value: "阳阳麻辣烫" },
        { value: "南拳妈妈龙虾盖浇饭" }
      ],
      // 发布时间
      submitdate: ""
    };
  },
  methods: {
    // 显示发布
    showrelease(row, _index) {
      console.log(row);
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
    },
    // 显示详情
    showdetail(row, _index) {
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.detail = !this.detail;
    },
    // 发布确认
    adddate() {
      this.dialogFormVisible = false;
    },
    // 获取列表/搜索
    getAddBook() {
      this.data.currpage = 1;
      if (this.search.date != null) {
        this.search.startTime = this.search.date[0];
        this.search.endTime = this.search.date[1];
      } else {
        this.search.startTime = "";
        this.search.endTime = "";
      }
      this.$http
        .post(
          "systemAdvice/systemAdviceCriteriaQuery",
          this.$qs.stringify(this.search)
        )
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 模糊搜索名字
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    // 清空下拉框所选值
    clearchange() {
      this.newformInline.users = "";
    },
    // 新建提交
    onSubimt() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$http
            .post(
              "systemAdvice/addSystemAdvice",
              this.$qs.stringify(this.newformInline)
            )
            .then(res => {
              this.dialogVisible = !this.dialogVisible;
              console.log(res);
              this.getAddBook();
            });
        } else {
          return false;
        }
      });
    },
    // 导出
    excellist() {
      location.href = this.$http.defaults.baseURL + "systemAdvice/exportExcel";
    }
  },
  created() {
    this.getAddBook();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 76px;
  margin-top: 15px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBot {
    .buttonBot {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
    }
    .buttonBotLast {
      width: 92px;
      height: 25px;
      font-size: 12px;
      padding: 0;
      margin: 0;
    }
  }
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
}
.pagination {
  float: right;
  margin-right: 16px;
}
.table {
  width: 100%;
}

.tableButton3 {
  color: #fff;
  background-color: #f56c6c;
  border-radius: 3px;
}
.tableButton2 {
  color: #fff;
  background-color: #4eb14e;
  border-radius: 3px;
}
.tableButton1 {
  color: #fff;
  background-color: #409eff;
  border-radius: 3px;
}
.textmsg {
  color: red;
}
.textcc {
  color: #000;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
}
.dialogText {
  .el-input {
    width: 240px;
    height: 32px;
  }
  .selectTop {
    width: 240px;
    height: 32px;
  }
  .selectBot {
    width: 240px;
    height: 32px;
  }
}
.formButon {
  width: 127px;
  height: 40px;
  text-align: center;
}

.pagination {
  float: right;
  margin-right: 25px;
  padding-top: 20px;
}
</style>

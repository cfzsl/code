<template>
  <!-- 公厕详情 -->
  <div id="toiltMsg">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="公厕名" class="msgWc">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="上报时间" class="msgDate">
            <el-date-picker v-model="search.date" type="date" placeholder class="msgDatePicker"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 按钮 -->
      <div class="searchBot">
        <el-button class="buttonBot" @click="dialogVisible = true">添加公厕信息</el-button>
        <el-button class="buttonBot">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast">导出全员信息</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加公厕信息" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公厕名">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="管养单位">
          <el-select v-model="web" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联络人">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone"></el-input>
        </el-form-item>
        <el-form-item label="氨气(ppm)">
          <el-input v-model="formInline.nh" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="硫化氢(ppm)">
          <el-input v-model="formInline.hs" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="温度(C)">
          <el-input v-model="formInline.cnumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="湿度(%)">
          <el-input v-model="formInline.snumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="formInline.update" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="报警次数">
          <el-input v-model="formInline.policeNode" class="inputText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">保存</el-button>
      </span>
    </el-dialog>
    <!-- 表格 -->
    <el-table
      :data="wcList.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="wcid" label="公厕名" width></el-table-column>
      <el-table-column align="center" prop="date" label="管养单位" width></el-table-column>
      <el-table-column align="center" prop="name" label="联络人" width></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width></el-table-column>
      <el-table-column align="center" prop="nh" label="氨气(PPM)" width></el-table-column>
      <el-table-column align="center" prop="hs" label="硫化氢(PPM)" width></el-table-column>
      <el-table-column align="center" prop="cnumber" label="温度(C)" width></el-table-column>
      <el-table-column align="center" prop="snumber" label="湿度(%)" width></el-table-column>
      <el-table-column align="center" prop="update" label="更新时间" width></el-table-column>
      <el-table-column align="center" prop="policeNode" label="报警次数" width></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currpage"
      :page-size="data.pagesize"
      class="paginationList"
      background
      @prev-click="nextpage"
      @next-click="nextpage"
      @current-change="nextpage"
      :page-sizes="[10,20,30,40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="wcList.length"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      search: {
        name: "",
        date: ""
      },
      // 分页
      data: {
        currpage: 1,
        pagesize: 10
      },
      // 显示添加
      dialogVisible: false,
      // 添加弹窗数据
      formInline: {},
      wcList: [
        {
          number: 1,
          wcid: "火车站公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          phone: "13361503999",
          nh: "5.2ppm",
          hs: "1.0ppm",
          cnumber: "25",
          snumber: "50",
          update: "2019/10/11 12:08:50",
          policeNode: "10"
        },
        {
          number: 2,
          wcid: "体育公园公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          phone: "13361503999",
          nh: "5.2ppm",
          hs: "1.0ppm",
          cnumber: "25",
          snumber: "50",
          update: "2019/10/11 12:08:50",
          policeNode: "11"
        },
        {
          number: 3,
          wcid: "北二路中石化公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          phone: "13361503999",
          nh: "5.2ppm",
          hs: "1.0ppm",
          cnumber: "25",
          snumber: "50",
          update: "2019/10/11 12:08:50",
          policeNode: "12"
        }
      ]
    };
  },
  created() {},
  methods: {
    // 下一页
    nextpage(value) {
      this.data.currpage = value;
    },
    onSubmit() {
      console.log("查啥?");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.search {
  position: relative;
  width: 100%;
  height: 76px;
  margin-top: 16px;
  .searchTop {
    float: left;
    margin-bottom: 16px;
  }
  .searchBot {
    position: absolute;
    bottom: 0;
    right: 0;
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
.dialogText {
  text-align: center;
}
.demo-form-inline {
  text-align: right;
  .selectTop {
    width: 240px;
  }
  .el-form-item {
    margin-bottom: 2px;
    .el-input {
      width: 240px;
      height: 32px;
    }
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
.delect-footer {
  float: left;
  margin-left: 10px;
}
.inputText {
  width: 240px;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
</style>

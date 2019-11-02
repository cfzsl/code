<template>
  <!-- LED电子屏幕管理 -->
  <div id="LED">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="记录时段" class="msgWc">
            <el-date-picker
              v-model="search.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="姓名" class="msgWc">
            <el-input v-model="search.name"></el-input>
          </el-form-item>
          <el-form-item label="管养单位">
            <el-select v-model="search.depart">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="(item, i) in options"
                :key="i"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 导出日志 -->
      <div class="searchBot">
        <el-button class="buttonBot" type="primary" @click="dialogVisible = true">导出日志</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <el-table
      :data="wcList.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column align="center" prop="wcid" label="时间" width></el-table-column>
      <el-table-column align="center" prop="date" label="姓名" width="282"></el-table-column>
      <el-table-column align="center" prop="state" label="归属单位" width></el-table-column>
      <el-table-column align="center" prop="name" label="岗位" width></el-table-column>
      <el-table-column align="center" prop="phone" label="操作模块" width></el-table-column>
      <el-table-column align="center" prop="text" label="操作内容" width="282"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="data.currpage"
      :page-size="data.pagesize"
      class="paginationList"
      background
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
        date: "",
        name: "",
        depart: ""
      },
      // 设置屏幕弹窗
      textarea: "",
      // 分页
      data: {
        pagesize: 10,
        currpage: 1
      },

      formInline: {},
      dialogVisible: false,
      options: [
        {
          label: "东营丛林绿化工程有限责任公司"
        },
        {
          label: "东营卓越环境工程有限责任公司"
        }
      ],
      wcList: [
        {
          number: 1,
          wcid: "火车站公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间",
          text: "美丽东营从我做起"
        },
        {
          number: 2,
          wcid: "体育公园公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间50",
          text: ".热烈庆祝中华人民共和国成立70周年"
        },
        {
          number: 3,
          wcid: "北二路中石化公厕",
          date: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间",
          text: "创建文明城市，人人受益，人人有责"
        }
      ]
    };
  },
  created() {},
  methods: {
    onSubmit() {
      console.log("查啥?");
    }
  }
};
</script>

<style lang="scss" scoped>
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
.pagination {
  float: right;
  margin-right: 16px;
}
.paginationList {
  text-align: center;
  margin-top: 32px;
  padding: 0;
}
</style>
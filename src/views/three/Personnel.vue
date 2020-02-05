<template>
  <!-- 公厕管理 -->
  <div id="WcSupervision">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="search">
          <el-form-item label="公厕名" class="msgWc">
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
          <el-form-item label="状态">
            <el-select v-model="search.state">
              <el-option label="全部" value></el-option>
              <el-option
                v-for="(item, i) in optionSe"
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
      <!-- 按钮 -->
      <div class="searchBot">
        <el-button class="buttonBot" @click="dialogVisible = true">添加公厕信息</el-button>
        <el-button class="buttonBot">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast">导出全员信息</el-button>
      </div>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog
      title="添加公厕信息"
      :visible.sync="dialogVisible"
      width="426px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公厕名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="管养单位">
          <el-select v-model="formInline.depart" class="selectTop">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放状态">
          <el-select v-model="formInline.state" class="selectTop">
            <el-option
              v-for="(item, i) in optionSe"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formInline.cnumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="服务">
          <el-input v-model="formInline.snumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="联络人">
          <el-input v-model="formInline.name" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone" class="inputText"></el-input>
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
      <el-table-column align="center" prop="depart" label="管养单位" width></el-table-column>
      <el-table-column align="center" prop="state" label="状态" width></el-table-column>
      <el-table-column align="center" prop="cnumber" label="地址" width></el-table-column>
      <el-table-column align="center" prop="snumber" label="服务" width></el-table-column>
      <el-table-column align="center" prop="name" label="联络人" width></el-table-column>
      <el-table-column align="center" prop="phone" label="电话" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="280px">
        <template slot-scope="scope">
          <el-button
            class="tableButton2"
            type="button"
            size="small"
            @click="detail(scope.row, scope.$index)"
          >详情</el-button>
          <el-button
            class="tableButton2"
            type="button"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >编辑</el-button>
          <el-button class="tableButton3" type="button" @click="deletList" size="small">删除</el-button>
        </template>
      </el-table-column>
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

    <!-- 详情弹框 -->
    <el-dialog
      title="公厕详情"
      :visible.sync="dialogFormdetail"
      width="426px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公厕名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="管养单位">
          <el-select v-model="formInline.depart" class="selectTop">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放状态">
          <el-select v-model="formInline.state" class="selectTop" disabled>
            <el-option
              v-for="(item, i) in optionSe"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formInline.cnumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="服务">
          <el-input v-model="formInline.snumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="联络人">
          <el-input v-model="formInline.name" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone" class="inputText"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑弹框 -->
    <el-dialog
      title="公厕编辑"
      :visible.sync="dialogFormVisible"
      width="426px"
      class="dialogText"
      @close="formInline = {}"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="公厕名">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="管养单位">
          <el-select v-model="formInline.depart" class="selectTop">
            <el-option
              v-for="(item, i) in options"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开放状态">
          <el-select v-model="formInline.state" class="selectTop">
            <el-option
              v-for="(item, i) in optionSe"
              :key="i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formInline.cnumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="服务">
          <el-input v-model="formInline.snumber" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="联络人">
          <el-input v-model="formInline.name" class="inputText"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formInline.phone" class="inputText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="formButon">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 搜索
      search: {
        name: "",
        depart: "",
        state: ""
      },
      // 分页
      data: {
        pagesize: 10,
        currpage: 1
      },
      // 公厕详情/编辑弹框
      ifshow: true,
      // 公厕添加弹框
      dialogVisible: false,
      // 管养单位下拉框
      options: [
        {
          value: "东营丛林绿化工程有限责任公司",
          label: "东营丛林绿化工程有限责任公司"
        },
        {
          value: "东营卓越环境工程有限责任公司",
          label: "东营卓越环境工程有限责任公司"
        }
      ],
      // 状态下拉框
      optionSe: [
        {
          state: "开放使用",
          label: "开放使用"
        },
        {
          state: "即将开放",
          label: "即将开放"
        },
        {
          state: "暂停使用",
          label: "暂停使用"
        }
      ],
      // 详情页数据
      formInline: {
        name: "",
        depart: "",
        state: "",
        cnumber: "",
        snumber: "",
        name: "",
        phone: ""
      },
      // 详情页弹框
      dialogFormdetail: false,
      // 编辑页弹框
      dialogFormVisible: false,
      wcList: [
        {
          number: 1,
          wcid: "火车站公厕",
          depart: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间"
        },
        {
          number: 2,
          wcid: "体育公园公厕",
          depart: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间50"
        },
        {
          number: 3,
          wcid: "北二路中石化公厕",
          depart: "东营丛林绿化工程有限责任公司",
          name: "毛文平",
          state: "开放使用",
          phone: "13361503999",
          cnumber: "裕华街与淄博路路口北80米路西",
          snumber: "生活垃圾收集点，残疾人，第三卫生间"
        }
      ]
    };
  },
  created() {},
  methods: {
    // 表格详情按钮
    detail(row) {
      console.log(row);
      //记录数据
      this.formInline = row;
      //显示详情弹窗
      this.dialogFormdetail = true;
    },
    // 表格编辑按钮
    pagination(row) {
      console.log(row);
      //记录数据
      this.formInline = row;
      //显示编辑弹窗
      this.dialogFormVisible = true;
    },
    // 表格删除按钮
    deletList() {
      console.log("删除这一项");
    },
    // 查询按钮
    onSubmit() {
      console.log("查啥?");
    }
  }
};
</script>

<style lang="scss"  scoped>
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

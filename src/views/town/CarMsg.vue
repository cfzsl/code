<template>
  <!-- 环卫车辆信息 -->
  <div id="carmsg">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="车牌号鲁E-">
            <el-input
              class="searchInput"
              v-model="formInline.user"
              placeholder="车牌号"
            ></el-input>
          </el-form-item>
          <el-form-item label="负责道路">
            <el-select v-model="lu">
              <el-option
                v-for="item in roadList"
                :key="item.lu"
                :label="item.label"
                :value="item.lu"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-select v-model="value">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="id">
              <el-option
                v-for="item in optionsList"
                :key="item.id"
                :label="item.label"
                :value="item.id"
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
        <el-button class="buttonBot" @click="dialogVisible = true"
          >添加车辆信息</el-button
        >
        <el-button class="buttonBot" @click="msgimport = true"
          >导入模板下载</el-button
        >
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast" @click="msgexport = true"
          >导出全员信息</el-button
        >
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      title="添加车辆信息"
      :visible.sync="dialogVisible"
      width="426px"
      class="dialogText"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="i" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="formInline.usg"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input v-model="formInline.id"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="lu" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆维修情况">
          <el-input v-model="formInline.text" class="inputText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
          class="formButon"
          >取消</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
          class="formButon"
          >保存</el-button
        >
      </span>
    </el-dialog>
    <!-- 弹框2 -->
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
    <!-- 弹框3 -->
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
    <!-- 表格 -->
    <el-table
      :data="tableData.slice((currpage - 1) * pagesize, currpage * pagesize)"
      border
      style="width: 100%"
    >
      <el-table-column
        align="center"
        prop="number"
        label="序号"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="carid"
        label="车牌号"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="date"
        label="购车时间"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="updata"
        label="资产编号"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="归属单位"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="使用人"
        width
      ></el-table-column>
      <el-table-column
        align="center"
        prop="zipiphone"
        label="联系方式"
        width
      ></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="button"
            size="small"
            @click="pagination(scope.row, scope.$index)"
            >详情</el-button
          >
          <el-button
            class="tableButton2"
            type="button"
            @click="deletList"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      layout="total, prev, pager, next"
      :total="tableData.length"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog
      :title="text"
      :visible.sync="dialogFormVisible"
      width="426px"
      class="dialogText"
    >
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        v-if="buttonIf"
      >
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="i" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="formInline.usg"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input v-model="formInline.id"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="lu" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆维修情况">
          <el-input v-model="formInline.text" class="inputText"></el-input>
        </el-form-item>
      </el-form>
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        v-if="!buttonIf"
      >
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="i" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.i"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="formInline.name"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="formInline.usg"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="formInline.msg"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="web" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.web"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input v-model="formInline.id"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="formInline.mobile"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="lu" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.lu"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车辆维修情况">
          <el-input v-model="formInline.text" class="inputText"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          class="formButon"
          >取消</el-button
        >
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          v-if="buttonIf"
          @click="addDo"
          class="formButon"
          >编辑</el-button
        >
        <el-button
          type="primary"
          v-else-if="!buttonIf"
          @click="adddate"
          class="formButon"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/table/table.vue";
export default {
  data() {
    return {
      text: "添加车辆信息",
      msgexport: false,
      msgimport: false,
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formInline: {},
      dialogVisible: false,
      i: "0",
      optionsCar: [
        {
          i: "0",
          label: "全部"
        },
        {
          i: "1",
          label: "垃圾清运车"
        },
        {
          i: "2",
          label: "清扫车"
        },
        {
          i: "3",
          label: "洒水车"
        }
      ],
      lu: "0",
      roadList: [
        {
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "庐山路"
        },
        {
          lu: "2",
          label: "宁阳路"
        },
        {
          lu: "3",
          label: "新泰路"
        },
        {
          lu: "4",
          label: "北一路"
        },
        {
          lu: "5",
          label: "北二路"
        },
        {
          lu: "6",
          label: "黄河路"
        }
      ],
      value: "0",
      options: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "东营区新区"
        },
        {
          value: "2",
          label: "文汇街道办事处"
        },
        {
          value: "3",
          label: "辛店街道办事处"
        },
        {
          value: "4",
          label: "黄河街道办事处"
        },
        {
          value: "5",
          label: "圣园街道办事处"
        },
        {
          value: "6",
          label: "六户镇"
        },
        {
          value: "7",
          label: "牛庄镇"
        },
        {
          value: "8",
          label: "史口镇"
        },
        {
          value: "9",
          label: "龙居镇"
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "0",
          label: "全部"
        },
        {
          web: "1",
          label: "环卫一部"
        },
        {
          web: "2",
          label: "环卫二部"
        },
        {
          web: "3",
          label: "环卫三部"
        },
        {
          web: "4",
          label: "环卫四部"
        }
      ],
      lu: "0",
      optionslu: [
        {
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "东营区新区"
        },
        {
          lu: "2",
          label: "文汇街道办事处"
        },
        {
          lu: "3",
          label: "辛店街道办事处"
        },
        {
          lu: "4",
          label: "黄河街道办事处"
        },
        {
          lu: "5",
          label: "圣园街道办事处"
        },
        {
          lu: "6",
          label: "六户镇"
        },
        {
          lu: "7",
          label: "牛庄镇"
        },
        {
          lu: "8",
          label: "史口镇"
        },
        {
          lu: "9",
          label: "龙居镇"
        }
      ],
      id: "0",
      optionsList: [
        {
          id: "0",
          label: "全部"
        },
        {
          id: "1",
          label: "环卫一部"
        },
        {
          id: "2",
          label: "环卫二部"
        },
        {
          id: "3",
          label: "环卫三部"
        },
        {
          id: "4",
          label: "环卫四部"
        }
      ],
      web: "0",
      optionsWeb: [
        {
          web: "0",
          label: "全部"
        },
        {
          web: "1",
          label: "环卫一部"
        },
        {
          web: "2",
          label: "环卫二部"
        },
        {
          web: "3",
          label: "环卫三部"
        },
        {
          web: "4",
          label: "环卫四部"
        }
      ],
      type: "0",
      optionsType: [
        {
          type: "0",
          label: "A1"
        },
        {
          type: "1",
          label: "A2"
        },
        {
          type: "2",
          label: "B1"
        },
        {
          type: "3",
          label: "B2"
        },
        {
          type: "4",
          label: "C1"
        },
        {
          type: "5",
          label: "C2"
        }
      ],
      state: "0",
      optionsStated: [
        {
          state: "0",
          label: "在职"
        },
        {
          state: "1",
          label: "离职"
        }
      ],
      buttonIf: false,
      formInline: {},
      dialogFormVisible: false
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    addDo() {
      // let _index = this.listIndex;
      //根据索引，赋值到list制定的数
      // this.list[_index] = this.formInline;
      //关闭弹窗
      console.log("关闭");
      this.buttonIf = false;
    },
    adddate() {
      this.dialogFormVisible = false;
    },
    pagination(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.formInline = row;
      //显示弹窗
      this.dialogFormVisible = true;
      this.buttonIf = true;
    },
    deletList() {
      console.log("删除这一项");
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    getlist() {
      for (let i = 1; i < 99; i++) {
        this.tableData.push({
          number: i,
          name: "李旦",
          carid: "e1323",
          province: "东营区",
          city: "环卫一部",
          address: "上海市普陀区金沙江路 1518 弄",
          date: "2016-05-02",
          updata: "在职",
          zipiphone: "15927227885",
          msg: "否"
        });
      }
    },
    onSubmit() {
      console.log("查啥?");
    }
  },
  components: {
    Table
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
.table {
  width: 1128px;
  height: 465px;
  margin-top: 16px;
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
.pagination {
  float: right;
  margin-right: 16px;
}
.table {
  width: 100%;
}
.delect-footer {
  float: left;
  margin-left: 10px;
}
.inputText {
  width: 240px;
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
</style>

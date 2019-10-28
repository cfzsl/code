<template>
  <!-- 环卫车辆信息 -->
  <div id="carmsg">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchTop">
        <el-form :inline="true" :model="formInline">
          <el-form-item label="车牌号鲁E-">
            <el-input class="searchInput" v-model="usernumber" placeholder="车牌号"></el-input>
          </el-form-item>
          <el-form-item label="负责道路">
            <el-select v-model="road">
              <el-option
                v-for="item in roadList"
                :key="item.lu"
                :label="item.label"
                :value="item.label"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作业区域">
            <el-select v-model="area">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属单位">
            <el-select v-model="unit">
              <el-option
                v-for="item in optionsList"
                :key="item.id"
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
        <el-button class="buttonBot" @click="dialogVisible = true">添加车辆信息</el-button>
        <el-button class="buttonBot" @click="msgimport = true">导入模板下载</el-button>
        <el-button class="buttonBot">人员信息导入</el-button>
        <el-button class="buttonBotLast" @click="msgexport = true">导出全员信息</el-button>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="添加车辆信息" :visible.sync="dialogVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="cartype" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="number"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="shoppingtime"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="department" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="指定司机">
          <el-input v-model="user"></el-input>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="area" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false" class="formButon">保存</el-button>
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
      <el-table-column align="center" prop="sid" label="序号" width></el-table-column>
      <el-table-column align="center" prop="member" label="车牌号" width></el-table-column>
      <el-table-column align="center" prop="shoppingtime" label="购车时间" width></el-table-column>
      <el-table-column align="center" prop="parm2" label="资产编号" width></el-table-column>
      <el-table-column align="center" prop="department" label="归属单位" width></el-table-column>
      <el-table-column align="center" prop="user" label="使用人" width></el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width>
        <template slot-scope="scope">
          <el-button
            class="tableButton1"
            type="button"
            size="small"
            @click="pagination(scope.row, scope.$index)"
          >详情</el-button>
          <el-button class="tableButton2" type="button" @click="deletList(scope.row, scope.$index)" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="paginationList"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10,20,30,40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog :title="text" :visible.sync="dialogFormVisible" width="426px" class="dialogText">
      <el-form :inline="true" :model="details" class="demo-form-inline" v-if="buttonIf">
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="details.cartype" class="selectTop" disabled>
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="details.member" disabled></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="details.shoppingtime" disabled></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="details.parm2" disabled></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="details.department" class="selectTop" disabled>
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="details.area" class="selectTop" disabled>
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人">
          <el-input v-model="details.user" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" :model="details" class="demo-form-inline" v-if="!buttonIf">
        <el-form-item label="车辆类型" class="searchType">
          <el-select v-model="details.cartype" class="selectTop">
            <el-option
              v-for="item in optionsCar"
              :key="item.i"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="车牌号">
          <el-input v-model="details.member"></el-input>
        </el-form-item>
        <el-form-item label="购车时间">
          <el-input v-model="details.shoppingtime"></el-input>
        </el-form-item>
        <el-form-item label="资产编号">
          <el-input v-model="details.parm2"></el-input>
        </el-form-item>
        <el-form-item label="归属单位">
          <el-select v-model="details.department" class="selectTop">
            <el-option
              v-for="item in optionsWeb"
              :key="item.web"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作业区域">
          <el-select v-model="details.area" class="selectTop">
            <el-option
              v-for="item in optionslu"
              :key="item.lu"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用人">
          <el-input v-model="details.user"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="delect-footer">
        <el-button type="primary" @click="dialogFormVisible = false" class="formButon">取消</el-button>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" v-if="buttonIf" @click="addDo" class="formButon">编辑</el-button>
        <el-button type="primary" v-else-if="!buttonIf" @click="adddate" class="formButon">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usernumber:"",
      cartype:"",
      number:"",
      shoppingtime:"",
      department:"",
      user:"",
      area:"",
      parm2:"",
      road: "",
      area: "",
      unit: "",
      text: "车辆信息",
      msgexport: false,
      msgimport: false,
      pagesize: 10,
      currpage: 1,
      tableData: [],
      formInline: {
        member: "",
        shoppingtime: "",
        parm2: "",
        department: "",
        user: ""
      },
      details: {},
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
        },
        {
          i: "3",
          label: "三轮车"
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
  methods: {
    addDo() {
      console.log("切换编辑");
      this.buttonIf = false;
    },
    adddate() {
      this.dialogFormVisible = false;
      console.log(this.details);
    },
    pagination(row, _index) {
      console.log(row);
      //记录索引
      this.listIndex = _index;
      //记录数据
      this.details = row;
      //显示弹窗
      this.dialogFormVisible = true;
      this.buttonIf = true;
    },
    deletList(row,_index) {
      let date={
        sid:row.sid
      }
      console.log(date)
      this.$http.post("sanitation/car/deleteBySid",this.$qs.stringify(date)).then(res=>{
        console.log(res.data)
      })
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    // 获取列表数据
    getlist() {
      this.$http.post("sanitation/car/formSearch").then(res => {
        console.log(res.data);
        this.tableData = res.data;
      });
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

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
        </el-select>
      </div>
      <div class="searchbox">
        <span>作业区域</span>
        <el-select v-model="search.work">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="东营区新区" value="东营区新区"></el-option>
          <el-option label="文辉街道办事处" value="文辉街道办事处"></el-option>
          <el-option label="新电路办事处" value="新电路办事处"></el-option>
        </el-select>
      </div>
      <div class="searchbox">
        <span>单位</span>
        <el-select v-model="search.company">
          <el-option label="全部" value="全部"></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
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
        <el-button icon="el-icon-plus" @click="msgadd = true">添加车辆信息</el-button>
        <el-button icon="el-icon-download" @click="msgimport = true">车辆信息导入</el-button>
        <el-button icon="el-icon-upload2" @click="msgexport = true">车辆信息导出</el-button>
      </div>

      <el-dialog title="车辆信息" :visible.sync="msgadd" @close="msg = {}" width="25%">
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
          <el-button type="primary" @click="dialogVisible = false">提交</el-button>
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
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="油耗报警">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保养记录">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="保险缴纳">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click.stop="handleEdit(scope.$index, scope.row)"
            >详情</el-button>
            <el-button
              size="mini"
              type="danger"
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
      msgexport: false
    };
  },
  methods: {
    onSubmit() {},
    date() {
      for (let i = 0; i < 300; i++) {
        this.data.list.push({
          sid: i,
          type: "垃圾运输车",
          carbrand: "鲁E" + i,
          date: "2011.10.20",
          num: "环卫-A00" + i,
          company: "环卫",
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
    handleEdit(index, row) {
      console.log(row);
      this.msg = row;
      this.msgadd = !this.msgadd;
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
</style>
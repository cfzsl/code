<template>
  <div id="vehicle">
    <div class="menu">
      <div class="filter">
        <el-radio v-model="radio" label="0">全部车辆</el-radio>
        <el-radio v-model="radio" label="1">垃圾运输车</el-radio>
        <el-radio v-model="radio" label="2">清扫车</el-radio>
        <el-radio v-model="radio" label="3">洒水车</el-radio>
      </div>

      <div class="btn">
        <el-button @click="msgserach = true">历史轨迹播放</el-button>
        <el-button @click="msgerr = true">路线异常报警</el-button>
        <el-button @click="msgeslint = true">车况检测和预警</el-button>
        <el-button @click="msgedate = true">车辆考勤和工作量</el-button>
      </div>

      <!-- 弹窗1 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgserach" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="date" label="记录时间"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    class="buttonSearch"
                    @click.stop="handleEdit(scope.$index, scope.row)"
                  >播放轨迹</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹窗2 -->
      <el-dialog title="历史轨迹播放" :visible.sync="msgerr" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="归属单位"></el-table-column>
              <el-table-column align="center" prop="driver" label="指定司机"></el-table-column>
              <el-table-column align="center" prop="phone" label="联系电话"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="service" label="线路异常情况" width="436px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
      <!-- 弹框3 -->
      <el-dialog title="车况检测和预警" :visible.sync="msgeslint" @close="msg = {}" width="70%">
        <el-divider class="divider"></el-divider>
        <el-form ref="form" :model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="日期" class="msgDate">
              <el-date-picker v-model="value1" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item label="故障维修结果" class="Troubleshooting">
              <el-input v-model="msg.number" class="TroubleshootingInput"></el-input>
            </el-form-item>
            <el-form-item class="msgButton">
              <el-button type="primary" @click="onSubmit" class="button">查询</el-button>
            </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="company" label="车辆故障代码"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="报警时间"></el-table-column>
              <el-table-column align="center" prop="driver" label="维修人员"></el-table-column>
              <el-table-column align="center" prop="date" label="维修日期"></el-table-column>
              <el-table-column align="center" prop="troubleshooting" label="故障维修结果" width="239px"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              :current-page="data.currpage"
              :page-size="data.pagesize"
              :pager-count="5"
              layout="total, prev, pager, next"
              :total="data.list.length"
              @prev-click="nextpage"
              @next-click="nextpage"
              @current-change="nextpage"
            ></el-pagination>
          </div>
        </el-form>
      </el-dialog>
    </div>
    <div class="bdMap">
      <baidu-map class="map" center="东营市">
        <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
          <el-button slot="append" @click="searchMap">搜索</el-button>
        </el-input>
      </baidu-map>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: "0",
      msgserach: false,
      msgerr: false,
      msgeslint: false,
      msgedate: false,
      input3: "",
      msg: {
        number: ""
      },
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: ""
    };
  },
  created() {
    this.date();
  },
  methods: {
    onSubmit() {},
    showadd() {},
    handleEdit(_index, row) {
      console.log("播放轨迹");
    },
    searchMap() {
      console.log("百度地图搜索");
    },
    nextpage() {},
    date() {
      for (let i = 0; i < 999; i++) {
        this.data.list.push({
          sid: i,
          type: "垃圾运输车",
          carbrand: "鄂A " + i + i + i + i,
          date: "2011.10.20",
          num: "环卫-A001",
          company: "环卫",
          driver: "李诞",
          phone: "15375669845",
          region: "东营南站",
          policeTime: "2011.10.20",
          service: "超出原定使用区域：东营区东营南站",
          troubleshooting:'未维修'
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.menu {
  padding: 16px 0;
  height: 60px;
  position: relative;
  .filter {
    position: absolute;
    top: 50%;
    float: left;
    transform: translateY(-50%);
  }
  .btn {
    float: right;
    height: 25px;
  }
}
.divider {
  margin: 0 0 16px 0;
}
.search {
  position: relative;
  width: 100%;
  height: 60px;
  .searchInput {
    position: absolute;
    left: 0;
    .searchInputNumber {
      width: 145px;
    }
  }
  .msgDate {
    position: absolute;
    left: 200px;
    .msgDatePicker {
      width: 145px;
    }
  }
  .Troubleshooting {
    position: absolute;
    left: 455px;
    .TroubleshootingInput {
      width: 145px;
    }
  }
  .msgButton {
    position: absolute;
    left: 620px;
    .button {
      width: 145px;
    }
  }
}
.buttonSearch {
  font-size: 13px;
  color: rgba(121, 121, 121, 1);
  width: 112px;
  height: 29px;
  background: inherit;
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(121, 121, 121, 1);
  border-radius: 5px;
}
.bdMap {
  .map {
    position: relative;
    width: 100%;
    height: 556px;
    .input-with-select {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 309px;
    }
  }
}
</style>
s
<template>
  <div class="bdMap">
    <baidu-map class="map" center="中国石油大学胜利学院" dragging :zoom="12" scroll-wheel-zoom>
      <bm-boundary name="东营区" :strokeWeight="2" strokeColor="#BDC5F3" fillColor='#BDC5F3'></bm-boundary>
      <bm-marker
         v-for="item in position2"
        :key='item.code'
        :position="{lng: item.lng, lat: item.lat}"
        :labelStyle="{color: 'orange', fontSize : '24px'}"
      ></bm-marker>
      <div class="mapList">
        <div class="list">
          <i style="background-color: blue"></i>
          <span>洒水车</span>
        </div>
        <div class="list">
          <i style="background-color: orange"></i>
          <span>清扫车</span>
        </div>
        <div class="list">
          <i style="background-color: green"></i>
          <span>垃圾运输车</span>
        </div>
        <div class="list">
          <i style="background-color: pink"></i>
          <span>三轮车</span>
        </div>
        <div class="list">
          <i style="background-color: #ccc"></i>
          <span>对讲机</span>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" round @click="msgeslint = true">
          车况异常报警
          <br />(20)
        </el-button>
        <el-button type="success" round @click="msgeslint2 = true">
          油耗超标报警
          <br />(20)
        </el-button>
        <el-button type="info" round @click="msgeslint3 = true">
          保养到期报警
          <br />(20)
        </el-button>
        <el-button type="warning" round @click="msgeslint4 = true">
          保险到期报警
          <br />(20)
        </el-button>
        <el-button type="danger" round @click="msgeslint5 = true">
          人员超龄报警
          <br />(20)
        </el-button>
        <el-button type="warning" round @click="msgeslint6 = true">
          越界报警
          <br />(20)
        </el-button>
        <el-button type="danger" round @click="msgeslint7 = true">
          停滞超限报警
          <br />(20)
        </el-button>
      </div>
      <!-- 弹框1 -->
      <el-dialog title="车况异常报警" :visible.sync="msgeslint" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
       <!-- 弹框2 -->
      <el-dialog title="油耗超标报警" :visible.sync="msgeslint2" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
      <el-dialog title="保养到期报警" :visible.sync="msgeslint3" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
       <!-- 弹框4 -->
      <el-dialog title="保险到期报警" :visible.sync="msgeslint4" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
       <!-- 弹框5 -->
      <el-dialog title="人员超龄报警" :visible.sync="msgeslint5" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
       <!-- 弹框6 -->
      <el-dialog title="越界报警" :visible.sync="msgeslint6" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
       <!-- 弹框7 -->
      <el-dialog title="停滞超限报警" :visible.sync="msgeslint7" @close="msg = {}" width="70%" class="elDialog">
        <el-form ref="form" v-model="msg" label-width="auto" class="msg">
          <div class="search">
            <el-form-item label="车牌号鲁E-" class="searchInput">
              <el-input v-model="msg.number" class="searchInputNumber"></el-input>
            </el-form-item>
            <el-form-item label="报警日期" class="msgDate">
              <el-date-picker v-model="datemsg" type="date" placeholder class="msgDatePicker"></el-date-picker>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          </div>
          <div class="list">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
              @row-click="showadd"
            >
              <el-table-column align="center" prop="number" label="序号"></el-table-column>
              <el-table-column align="center" prop="carbrand" label="车牌号"></el-table-column>
              <el-table-column align="center" prop="policeTime" label="车辆耗油量(L/100KM)"></el-table-column>
              <el-table-column align="center" prop="date" label="报警日期" width="237px"></el-table-column>
              <el-table-column align="center" prop="driver" label="报警时间" width="237px"></el-table-column>
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
      <el-input placeholder="请输入车牌号" v-model="input3" class="input-with-select">
        <el-button slot="append" @click="searchMap">搜索</el-button>
      </el-input>
    </baidu-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg:'',
      datemsg:'',
      msgeslint:false,
      msgeslint2:false,
      msgeslint3:false,
      msgeslint4:false,
      msgeslint5:false,
      msgeslint6:false,
      msgeslint7:false,
      input3: "",
      // positions: [
      //   { lng: 118.550734, lat: 37.469664 },
      //   { lng: 118.566096, lat: 37.469922 },
      //   { lng: 118.54123, lat: 37.452391 }
      // ],
      position2: [],
      data: {
        pagesize: 10,
        currpage: 1,
        list: []
      },
    };
  },
  methods: {
    showadd(){
      console.log("测试")
    },
    onSubmit(){},
    searchMap() {},
    nextpage() {},
    map_init() {
      var map = new BMap.Map("allmap");
    },
    getMapMark() {  
      setInterval(() => {
        this.$http.get('xy/get').then(res=>{
          this.position2=res.data
          console.log(this.position2)
        })
      }, 1000);
    },
    date() {
      for (let i = 1; i < 999; i++) {
        this.data.list.push({
          sid: i,
          number: i,
          type: "垃圾运输车",
          carbrand: "鲁E" + i + i + i + i,
          date: "2011.10.20",
          driver: "8:10",
          phone: "15375669845",
          region: "东营南站",
          policeTime: "35（标准值：≤25）",
        });
      }
    },
  },
  created() {
    this.getMapMark();
    this.date();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.bdMap {
  .map {
    position: relative;
    width: 100%;
    height: 746px;
    .input-with-select {
      position: absolute;
      right: 20px;
      top: 16px;
      width: 309px;
    }
  }
}
.mapList {
  position: absolute;
  left: 10px;
  top: 15px;
  width: 116px;
  height: 140px;
  background-color: #fff;
  text-align: center;
  div {
    position: relative;
    display: block;
    float: left;
    width: 100%;
    height: 28px;
    line-height: 28px;
    i {
      position: absolute;
      display: block;
      left: 9px;
      top: 9px;
      width: 12px;
      height: 12px;
      margin: 0 auto;
      border-radius: 15px;
    }
    span {
      display: inline;
    }
  }
}
.button {
  position: absolute;
  top: 10px;
  left: 194px;
  margin: 0 auto;
  width: 826px;
  height: 44px;
}
.search {
  width: 100%;
  height: 50px;
  .el-form-item {
    display: inline-block;
    .el-input {
      width: 180px;
      font-size: 13px;
    }
    .selectTop {
      width: 180px;
      font-size: 13px;
    }
  }
}
</style>

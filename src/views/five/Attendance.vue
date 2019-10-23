<template>
  <!-- 出勤统计 -->
  <div>
    <div class="search">
      <div class="searchbox">
        <span>区域</span>
        <el-select v-model="search.work">
          <el-option label="全部区域" value="全部区域"></el-option>
          <el-option label="东营区" value="东营区"></el-option>
          <el-option label="滨洲区" value="滨洲区"></el-option>
        </el-select>
      </div>

      <div class="searchbox">
        <span>部门</span>
        <el-select v-model="search.type">
          <el-option label="全部部门" value="全部部门"></el-option>
          <el-option label="环卫一部" value="环卫一部"></el-option>
          <el-option label="环卫二部" value="环卫二部"></el-option>
          <el-option label="环卫三部" value="环卫三部"></el-option>
        </el-select>
      </div>

      <el-button type="primary" class="btn">查看</el-button>
    </div>

    <div class="content">
      <div class="imgset">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <div class="grid-content">
              <img src="../../assets/img/微信截图_20191023142410.png" alt />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <img src="../../assets/img/微信截图_20191023142429.png" alt />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <img src="../../assets/img/微信截图_20191023142445.png" alt />
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <img src="../../assets/img/微信截图_20191023142459.png" alt />
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="echartscontent">
        <div style="float:left;">
          <div id="main" style="width: 1200px;height:500px;"></div>
        </div>
      </div>
      <div style="float: left;">
        <div class="item">
          <div class="title">请假</div>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <div class="grid-content total"><b style="font-size:35px">8</b>人</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">环卫部：2人</div>
              <div class="grid-content">人事部：1人</div>
              <div class="grid-content">后勤部：2人</div>
              <div class="grid-content">垃圾运输部： 1人</div>
              <div class="grid-content">道路保养部：2人</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <div class="title">迟到早退</div>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <div class="grid-content total"><b style="font-size:35px">4</b>人</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">环卫部：1人</div>
              <div class="grid-content">人事部：1人</div>
              <div class="grid-content">后勤部：2人</div>
            </el-col>
          </el-row>
        </div>
        <div class="item">
          <div class="title">公务外出</div>
          <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="12">
              <div class="grid-content total"><b style="font-size:35px">5</b>人</div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content">人事部：1人</div>
              <div class="grid-content">财务部：2人</div>
              <div class="grid-content">采购部：2人</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      search: {
        type: "全部部门",
        work: "全部区域",
        road: "全部",
        company: "全部"
      }
    };
  },
  methods: {
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("main"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "当月考勤统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["本月出勤率", "本月出勤人数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {},
        xAxis: {
          type: "category",
          data: [
            "综合部",
            "后勤部",
            "行政部",
            "人事部",
            "环卫部",
            "道路保养部",
            "财务部",
            "垃圾运输部",
            "公厕部",
            "监管部",
            "采购部"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "本月出勤率",
            type: "line",
            data: [86, 84, 84.6, 86.8, 90, 79, 85, 90, 86, 88, 89],
            itemStyle: {
              normal: {
                color: "#00CCFF",
                lineStyle: {
                  color: "#00CCFF" //改变折线颜色
                }
              }
            },
            areaStyle: {
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(159,216,253)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(206,233,224)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          {
            name: "本月出勤人数",
            type: "line",
            data: [40, 30, 35, 38, 34, 40, 35, 45, 43, 50, 46],
            itemStyle: {
              normal: {
                color: "#2ECC71",
                lineStyle: {
                  color: "#2ECC71" //改变折线颜色
                }
              }
            },
            areaStyle: {
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(86,221,189)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgb(218,235,232)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.drawPie();
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding: 20px 0;
  .searchbox {
    float: left;
    padding-left: 20px;
    margin-left: 20px;
    span {
      margin-right: 10px;
    }
  }
  .btn {
    margin-left: 15px;
  }
}

.content {
  .imgset {
    margin-bottom: 50px;
  }
  .item {
    width: 298px;
    height: 150px;
    border: 1px solid #d2d2d2;
    margin-bottom: 25px;
    .title {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 20px;
      font-size: 20px;
    }
    .total {
      margin-top: 25px;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
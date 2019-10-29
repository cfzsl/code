<template>
  <!-- 出勤统计 -->
  <div>
    <el-tabs value="form">
      <!-- 左侧表格统计 -->
      <el-tab-pane label="表格统计" name="form">
        <div id="base">
          <!-- 搜索 -->
          <div class="search">
            <div class="searchTop">
              <el-form :inline="true" :model="search">
                <el-form-item label="姓名">
                  <el-input class="searchInput" v-model="search.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="作业区域">
                  <el-select v-model="search.area">
                    <el-option label="全部区域" value></el-option>
                    <el-option label="东营区新区" value="东营区新区"></el-option>
                    <el-option label="文汇街道办事处" value="文汇街道办事处"></el-option>
                    <el-option label="辛店街道办事处" value="辛店街道办事处"></el-option>
                    <el-option label="黄河街道办事处" value="黄河街道办事处"></el-option>
                    <el-option label="圣园街道办事处" value="圣园街道办事处"></el-option>
                    <el-option label="六户镇" value="六户镇"></el-option>
                    <el-option label="史口镇" value="史口镇"></el-option>
                    <el-option label="牛庄镇" value="牛庄镇"></el-option>
                    <el-option label="龙居镇" value="龙居镇"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="岗位">
                  <el-select v-model="search.job">
                    <el-option label="全部岗位" value></el-option>
                    <el-option label="环卫工人" value="环卫工人"></el-option>
                    <el-option label="洒水车司机" value="洒水车司机"></el-option>
                    <el-option label="清运车司机" value="清运车司机"></el-option>
                    <el-option label="清扫车司机" value="清扫车司机"></el-option>
                    <el-option label="中队长" value="中队长"></el-option>
                    <el-option label="队员" value="队员"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="归属单位">
                  <el-select v-model="search.depart">
                    <el-option label="全部单位" value></el-option>
                    <el-option label="环卫一部" value="环卫一部"></el-option>
                    <el-option label="环卫二部" value="环卫二部"></el-option>
                    <el-option label="环卫三部" value="环卫三部"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getList">查询</el-button>
                  <el-button type="primary" @click="empty">清空</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 列表 -->
          <div id="table">
            <el-table
              :data="data.list.slice((data.currpage - 1) * data.pagesize, data.currpage * data.pagesize)"
              border
              style="width: 100%"
            >
              <el-table-column align="center" prop="num" label="序号"></el-table-column>
              <el-table-column align="center" prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" prop="tel" label="电话"></el-table-column>
              <el-table-column align="center" prop="depart" label="单位"></el-table-column>
              <el-table-column align="center" prop="area" label="区域"></el-table-column>
              <el-table-column align="center" prop="job" label="岗位"></el-table-column>
              <el-table-column align="center" prop="actuallyday" label="出勤天数"></el-table-column>
              <el-table-column align="center" prop="relaxday" label="休息天数"></el-table-column>
              <el-table-column align="center" prop="outworkday" label="请假天数"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button
                    class="tableButton1"
                    type="primary"
                    size="small"
                    @click="showdetail(scope.row, scope.$index)"
                  >详情</el-button>
                </template>
              </el-table-column>
            </el-table>

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

            <!-- 详情 -->
            <el-dialog
              :title="row.name + '-出勤详情'"
              :visible.sync="detail"
              class="dialog"
              @close="13"
            >
              <div class="title">
                出勤
                <span style="color: blue">{{ row.actuallyday }}</span>
                天，休息
                <span style="color: green">{{ row.relaxday }}</span>
                天，请假
                <span style="color: red">{{ row.outworkday }}</span>
                天
              </div>
              <div class="datepicker">
                <el-date-picker
                  v-model="dialogdate"
                  type="date"
                  placeholder="选择日期"
                  style="margin-right: 20px;"
                ></el-date-picker>
                <el-button type="primary">查询</el-button>
              </div>
              <div class="content">
                <img src="./month.png" />
              </div>
            </el-dialog>
          </div>
        </div>
      </el-tab-pane>

      <!-- 右侧图表 -->
      <el-tab-pane label="图表统计" name="chart">
        <!-- 查询 -->
        <div class="search">
          <div class="searchbox">
            <span>月份</span>
            <el-date-picker v-model="search.date" type="date" placeholder="选择日期"></el-date-picker>
          </div>

          <el-button type="primary" class="btn">查询</el-button>
        </div>

        <!-- 内容部分 -->
        <div class="content">
          <!-- 左侧图表 -->
          <div class="left">
            <div class="titleset">
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="title">
                      <i class="sbox"></i>
                      本月出勤占比
                    </div>
                    <div id="echarts1" style="width: 296px;height:180px;top: -15px"></div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="title">
                      <i class="sbox"></i>
                      本月出勤占比
                    </div>
                    <div id="echarts2" style="width: 296px;height:180px;top: -20px"></div>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content">
                    <div class="title">
                      <i class="sbox"></i>
                      本月出勤占比
                    </div>
                    <div id="echarts3" style="width: 296px;height:180px;top: -15px"></div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div style="float:left;">
              <div id="main" style="width: 1200px;height:500px;"></div>
            </div>
          </div>

          <!-- 右侧文本 -->
          <div style="float: left;">
            <div class="item">
              <!-- <div class="title">请假</div>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <div class="grid-content total">
                    <b style="font-size:35px">8</b>人
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">环卫部：2人</div>
                  <div class="grid-content">人事部：1人</div>
                  <div class="grid-content">后勤部：2人</div>
                  <div class="grid-content">垃圾运输部： 1人</div>
                  <div class="grid-content">道路保养部：2人</div>
                </el-col>
              </el-row>-->
              <img src="./leave.png" alt />
            </div>
            <div class="item">
              <!-- <div class="title">迟到早退</div>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <div class="grid-content total">
                    <b style="font-size:35px">4</b>人
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">环卫部：1人</div>
                  <div class="grid-content">人事部：1人</div>
                  <div class="grid-content">后勤部：2人</div>
                </el-col>
              </el-row>-->
              <img src="./late.png" alt />
            </div>
            <div class="item">
              <!-- <div class="title">公务外出</div>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="12">
                  <div class="grid-content total">
                    <b style="font-size:35px">5</b>人
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content">人事部：1人</div>
                  <div class="grid-content">财务部：2人</div>
                  <div class="grid-content">采购部：2人</div>
                </el-col>
              </el-row>-->
              <img src="./goout.png" alt />
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
export default {
  data() {
    return {
      search: {
        name: "",
        area: "",
        job: "",
        depart: ""
      },
      data: {
        pagesize: 13,
        currpage: 1,
        list: []
      },
      detail: false,
      row: {},
      dialogdate: ""
    };
  },
  methods: {
    // 图标渲染总函数
    drawecharts() {
      this.drawline();
      this.drawecharts1();
      this.drawecharts2();
      this.drawecharts3();
    },
    // 折线图
    drawline() {
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
    },
    // 饼状图
    drawecharts1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("echarts1"));
      // 绘制图表
      myChart.setOption({
        title: {},
        tooltip: {
          trigger: "item",
          formatter: "{b}：{c}%"
        },
        legend: {
          show: false
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "60%"],
            label: {
              normal: {
                formatter: "{b}{c}%"
              }
            },
            data: [
              {
                value: 69,
                name: "正常",
                itemStyle: {
                  color: "#3b99f1"
                }
              },
              {
                value: 18,
                name: "休息",
                itemStyle: {
                  color: "#4eb14e"
                }
              },
              {
                value: 13,
                name: "请假",
                itemStyle: {
                  color: "#f66134"
                }
              }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    // 横向柱状图
    drawecharts2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("echarts2"));
      // 绘制图表
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}：{c}%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            type: "category",
            data: ["请假", "休假", "正常"],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [
              {
                name: "请假",
                value: 8,
                itemStyle: {
                  color: "#f66134"
                }
              },
              {
                name: "休假",
                value: 10,
                itemStyle: {
                  color: "#4eb14e"
                }
              },
              {
                name: "正常",
                value: 82,
                itemStyle: {
                  color: "#3b99f1"
                }
              }
            ],
            label: {
              normal: {
                show: true,
                position: "right"
              }
            }
          }
        ]
      });
    },
    // 纵向柱状图
    drawecharts3() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$Echarts.init(document.getElementById("echarts3"));
      // 绘制图表
      myChart.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b}：{c}%"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["6月", "7月", "8月", "9月", "10月"],
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "60%",
            data: [86, 92, 74, 94, 90],
            label: {
              normal: {
                show: true,
                position: "top"
              }
            }
          }
        ]
      });
    },
    // 获取列表
    getList() {
      this.data.currpage = 1;
      this.$http
        .post("hr/attendent/search", this.$qs.stringify(this.search))
        .then(res => {
          this.data.list = res.data;
        });
    },
    // 清空查询
    empty() {
      this.search = {
        name: "",
        area: "",
        job: "",
        depart: ""
      };
      this.getList();
    },
    // 翻页
    nextpage(value) {
      this.data.currpage = value;
    },
    // 显示表格统计详情
    showdetail(row, index) {
      this.detail = !this.detail;
      this.row = row;
    }
  },
  mounted() {
    this.drawecharts();
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin-bottom: 10px;
  .searchbox {
    float: left;
    span {
      margin-right: 10px;
    }
  }
  .btn {
    margin-left: 15px;
  }
}

.content {
  .left {
    float: left;
    width: 75%;
  }
  .titleset {
    margin-bottom: 30px;
    .grid-content {
      border: 1px solid #d2d2d2;
    }
    .title {
      height: 45px;
      line-height: 45px;
      padding-left: 10px;
      background-color: #f0f0f0;
      .sbox {
        display: inline-block;
        width: 5px;
        height: 15px;
        vertical-align: text-bottom;
        background-color: #73aeff;
        margin-right: 5px;
      }
    }
  }
  .item {
    // width: 298px;
    // height: 150px;
    // border: 1px solid #d2d2d2;
    margin-bottom: 25px;
    // .title {
    //   margin-top: 10px;
    //   margin-bottom: 10px;
    //   margin-left: 20px;
    //   font-size: 20px;
    // }
    // .total {
    //   margin-top: 25px;
    //   font-size: 20px;
    //   text-align: center;
    // }
  }
}
.pagination {
  float: right;
  margin-right: 25px;
  padding-top: 20px;
}

.dialog {
  .title {
    float: right;
  }
  .content {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
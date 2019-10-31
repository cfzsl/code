<template>
  <div id="details">
    <div class="detailsHead">
      <div>个人详情信息</div>
      <el-button @click="gozero">返回</el-button>
    </div>
    <el-divider></el-divider>
    <div class="center">
      <div class="head">
        <div class="basic">基本信息</div>
        <div class="modify" @click="loderOne = true">
          <span class="iconfont icon-bianji"></span>修 改
        </div>
      </div>

      <!-- 基本信息弹框 -->
      <el-dialog title="基本信息" :visible.sync="loderOne" center width="400px">
        <el-form :inline="true" :model="detail" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="detail.sex"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="detail.age"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="detail.tel"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-select v-model="detail.depart2" class="selectTop">
              <el-option
                v-for="item in optionsWeb"
                :key="item.web"
                :label="item.depart2"
                :value="item.depart2"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="detail.area" class="selectTop">
              <el-option
                v-for="item in optionslu"
                :key="item.lu"
                :label="item.area"
                :value="item.area"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="detail.job" class="selectTop">
              <el-option
                v-for="item in postList"
                :key="item.lu"
                :label="item.job"
                :value="item.job"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="detail.study"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="detail.isretired" class="selectTop">
              <el-option
                v-for="item in optionsStated"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="detail.married" class="selectTop">
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急联系人">
            <el-input v-model="detail.contact1"></el-input>
          </el-form-item>
          <el-form-item label="身体状况">
            <el-input v-model="detail.body"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input v-model="detail.hiretime"></el-input>
          </el-form-item>
          <el-form-item label="离职时间">
            <el-input v-model="detail.firetime"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="detail.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="delect-footer">
          <el-button type="primary" @click="loderOne = false" class="formButon">取消</el-button>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDetail" class="formButon">保存</el-button>
        </span>
      </el-dialog>
      <div class="table">
        <table width="100%" height="209px">
          <tr>
            <td>姓名：{{detail.name}}</td>
            <td>性别：{{detail.sex}}</td>
            <td>年龄：{{detail.age}}</td>
            <td>岗位：{{detail.job}}</td>
          </tr>
          <tr>
            <td>单位：{{detail.depart2}}</td>
            <td>区域：{{detail.area}}</td>
            <td>学历：{{detail.study}}</td>
            <td>电话：{{detail.tel}}</td>
          </tr>
          <tr>
            <td>部门：{{detail.param2}}</td>
            <td>婚姻状况：{{detail.married}}</td>
            <td>紧急联系人: {{detail.contact1}}</td>
            <td>身体状态：{{detail.body}}</td>
          </tr>
          <tr>
            <td>入职时间：{{detail.hiretime}}</td>
            <td>状态：{{detail.isretired=="1"?"在职":"离职"}}</td>
            <td>离职时间：{{detail.firetime}}</td>
            <td>住址：{{detail.address}}</td>
          </tr>
        </table>
      </div>
      <div class="head">
        <div class="basic">薪资待遇</div>
        <div class="modify" @click="loderTown =true">
          <span class="iconfont icon-bianji"></span>修改
        </div>
      </div>

      <!-- 薪资待遇弹框 -->
      <el-dialog title="基本信息" :visible.sync="loderTown" center width="410px">
        <el-form :inline="true" :model="bonusList" class="demo-form-inline">
          <el-form-item label="基本工资/元">
            <el-input v-model="bonusList.basecash"></el-input>
          </el-form-item>
          <el-form-item label="用餐补助/元">
            <el-input v-model="bonusList.helpcash"></el-input>
          </el-form-item>
          <el-form-item label="交通补助/元">
            <el-input v-model="bonusList.trafficcash"></el-input>
          </el-form-item>
          <el-form-item label="通信补助/元">
            <el-input v-model="bonusList.callcash"></el-input>
          </el-form-item>
          <el-form-item label="是否缴纳社保">
            <el-select v-model="bonusList.hassafe" class="selectTop">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否缴纳公积金">
            <el-select v-model="bonusList.hasfund" class="selectTop">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每月休息(天)">
            <el-input v-model="bonusList.relaxdayinmonth"></el-input>
          </el-form-item>
          <el-form-item label="上班时间">
            <el-input v-model="bonusList.worktime"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="delect-footer">
          <el-button type="primary" @click="loderTown = false" class="formButon">取消</el-button>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="loderTown = false" class="formButon">保存</el-button>
        </span>
      </el-dialog>
      <div class="table">
        <table width="100%" height="104px">
          <tr>
            <td>基本工资：{{bonusList.basecash}}元/月</td>
            <td>用餐补助：{{bonusList.helpcash}}元/月</td>
            <td>交通补助: {{bonusList.trafficcash}}元/月</td>
            <td>通讯补助：{{bonusList.callcash}}元/月</td>
          </tr>
          <tr>
            <td>是否缴纳社保：{{bonusList.hassafe}}</td>
            <td>是否缴纳公积金：{{bonusList.hasfund}}</td>
            <td>每月休息：{{bonusList.relaxdayinmonth}}天</td>
            <td>上班时间：{{bonusList.worktime}}</td>
          </tr>
        </table>
      </div>
      <div class="contract">合同文件</div>
      <el-upload
        class="upload-demo"
        action="http://47.110.160.217:10071/xxxx"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-input class="upload" type="text" placeholder="请上传劳动合同.pdf" v-model="text"></el-input>
      </el-upload>
      <div class="head">
        <div class="basic">备注</div>
        <div class="modify" @click="remark = true">+添加备注</div>
      </div>

      <!-- 弹框 -->
      <el-dialog title="添加备注" :visible.sync="remark" center width="22%">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        <span slot="footer" class="delect-footer">
          <el-button type="primary" @click="remark = false" class="formButon">取消</el-button>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addRemark" class="formButon">保存</el-button>
        </span>
      </el-dialog>
      <div class="addRemark">
        <span v-for="(item,id) in remarks" :key="id">{{item.id}}.{{item.text}}</span>
      </div>
      <div class="head">
        <div class="basic">出勤记录</div>
      </div>
      <el-calendar v-model="value">
        <template slot="dateCell" slot-scope="{date, data}">
          <!--自定义内容-->
          <div class="calendar-flex">
            <div class="calendar-day">{{ data.day.split('-').slice(2).join('-') }}</div>
            <div v-for="(item,index) in calendarData" :key="index">
              <div v-if="(item.months).indexOf(data.day.split('-').slice(1)[0])!=-1">
                <div
                  class="is-button"
                  v-if="(item.days).indexOf(data.day.split('-').slice(2).join('-'))!=-1"
                >
                  <el-button
                    v-if="item.things==='出勤'"
                    class="is-selected"
                    type="primary"
                  >{{item.things}}</el-button>
                  <el-button
                    v-if="item.things==='病假'"
                    class="is-selected"
                    type="warning"
                  >{{item.things}}</el-button>
                  <el-button
                    v-if="item.things==='休息'"
                    class="is-selected"
                    type="success"
                  >{{item.things}}</el-button>
                </div>
                <div v-else></div>
              </div>
              <div v-else></div>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      date: "",
      // 日历
      calendarData: [],
      fileList: [],
      rest: "",
      jobtime: "",
      marriage: "",
      social: "",
      fund: "",
      loderTown: false,
      loderOne: false,
      remark: false,
      remarks: [{ id: 1, text: "2018年度被评为部门优秀员工" }],
      // 上传文件列表
      text: "",
      textarea: "",
      id: "",
      detail: {},
      bonusList: {},
      optionsWeb: [
        {
          web: "1",
          depart2: "环卫一部"
        },
        {
          web: "2",
          depart2: "环卫二部"
        },
        {
          web: "3",
          depart2: "环卫三部"
        },
        {
          web: "4",
          depart2: "环卫四部"
        }
      ],
      optionslu: [
        {
          lu: "1",
          area: "东营区新区"
        },
        {
          lu: "2",
          area: "文汇街道办事处"
        },
        {
          lu: "3",
          area: "辛店街道办事处"
        },
        {
          lu: "4",
          area: "黄河街道办事处"
        },
        {
          lu: "5",
          area: "圣园街道办事处"
        },
        {
          lu: "6",
          area: "六户镇"
        },
        {
          lu: "7",
          area: "牛庄镇"
        },
        {
          lu: "8",
          area: "史口镇"
        },
        {
          lu: "9",
          area: "龙居镇"
        }
      ],
      optionsStated: [
        {
          state: "0",
          label: "离职"
        },
        {
          state: "1",
          label: "在职"
        }
      ],
      postList: [
        {
          lu: "1",
          job: "环卫工"
        },
        {
          lu: "2",
          job: "洒水车司机"
        },
        {
          lu: "3",
          job: "垃圾运输车司机"
        },
        {
          lu: "4",
          job: "中队长"
        },
        {
          lu: "5",
          job: "队长"
        },
        {
          lu: "6",
          job: "大队长"
        },
        {
          lu: "7",
          job: "主管"
        }
      ]
    };
  },
  created() {
    this.getId();
    this.getDetail();
    this.getBonus();
    this.getCalendarData();
  },

  methods: {
    //获取考勤日期
    getCalendarData() {
      let year = this.value.getFullYear();
      let month = this.value.getMonth() + 1;
      let day = this.value.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      this.date = year + "-" + month + "-" + day;
      console.log(this.date)
      let _date={
        time: this.date
      }
      this.$http.post('hr/hrinfo/mkCalendar',this.$qs.stringify(_date)).then(res=>{
        console.log(res.data)
        this.calendarData=res.data
      })
    },
    //修改个人详情
    addDetail() {
      this.$http
        .post("hr/hrinfo/update", this.$qs.stringify(this.detail))
        .then(res => {
          console.log(res.data);
          this.loderOne = false;
        })
        .catch(err => {
          console.log("修改失败");
        });
    },
    //获取个人详情
    getDetail() {
      let _date = {
        sid: this.id
      };
      this.$http
        .post("hr/hrinfo/getBySid", this.$qs.stringify(_date))
        .then(res => {
          this.detail = res.data;
          console.log(res.data);
        });
    },
    //获取个人奖金详情
    getBonus() {
      let _date = {
        sid: this.id
      };
      this.$http
        .post("hr/bonus/getBySid", this.$qs.stringify(_date))
        .then(res => {
          this.bonusList = res.data;
          console.log(res.data);
        });
    },
    // 添加备注
    addRemark() {
      let i = 2;
      this.remarks.push({
        id: i++,
        text: this.textarea
      });
      this.remark = false;
    },
    //点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
    },
    //文件列表中移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //删除文件之前的钩子
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    gozero() {
      this.$router.push({
        path: "/matters/HRManagement"
      });
    },
    //   route传值
    getId() {
      this.id = this.$route.query.id;
      console.log(this.id);
    }
  }
};
</script>

<style  lang="scss" scoped>
.detailsHead {
  width: 100%;
  display: flex;
  padding: 0 23px;
  font-family: PingFangSC-Regular;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  div {
    font-size: 18px;
    color: #3b99f1;
  }
  .el-button {
    font-size: 12px;
    width: 70px;
    height: 30px;
    background-color: #3b99f1;
    border-radius: 4px;
    color: #fff;
  }
}
.center {
  margin: 20px;
  .head {
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    align-items: center;
    color: #3f3f3f;
    .basic {
      font-family: PingFangSC-Regular;
    }
    .modify {
      font-size: 14px;
    }
  }
  .table {
    margin-bottom: 50px;
    table {
      border-collapse: collapse;
      border: none;
    }
    td {
      width: 25%;
      border: solid #d2d2d2 1px;
      padding-left: 15px;
    }
  }
  .el-upload-dragger {
    width: 100% !important;
    height: 40 !important;
    background-color: #c4def8 !important;
  }
  .upload-demo {
    margin-bottom: 50px;
  }
  .addRemark {
    display: flex;
    margin-bottom: 50px;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    height: 53px;
    line-height: 53px;
    background-color: #efefef;
    .span {
      display: inline-block;
      margin-left: 10px !important;
    }
  }
}
.upload {
  width: 1560px !important;
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
.calendar-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  .calendar-day {
    text-align: center;
    margin-top: 15px;
  }
  .is-button {
    margin-top: 5px;
    margin-left: 10px;
  }
}
</style>

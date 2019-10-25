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
        <div class="modify" @click="loderOne = true">修 改</div>
      </div>

      <!-- 基本信息弹框 -->
      <el-dialog title="基本信息" :visible.sync="loderOne" center width="20%">
        <el-form :inline="true" :model="detail" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="detail.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="detail.gender"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="detail.msg"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="detail.phone"></el-input>
          </el-form-item>
          <el-form-item label="单位">
            <el-select v-model="detail.date" class="selectTop">
              <el-option
                v-for="item in optionsWeb"
                :key="item.web"
                :label="item.label"
                :value="item.web"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="detail.region" class="selectTop">
              <el-option
                v-for="item in optionslu"
                :key="item.lu"
                :label="item.label"
                :value="item.lu"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位">
            <el-select v-model="detail.job" class="selectTop">
              <el-option
                v-for="item in postList"
                :key="item.lu"
                :label="item.label"
                :value="item.lu"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="detail.education"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="detail.state" class="selectTop">
              <el-option
                v-for="item in optionsStated"
                :key="item.state"
                :label="item.label"
                :value="item.state"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="marriage" class="selectTop">
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="紧急联系人">
            <el-input v-model="detail.emergency"></el-input>
          </el-form-item>
          <el-form-item label="身体状况">
            <el-input v-model="detail.physical"></el-input>
          </el-form-item>
          <el-form-item label="入职时间">
            <el-input v-model="detail.time"></el-input>
          </el-form-item>
          <el-form-item label="离职时间">
            <el-input v-model="detail.deiltime"></el-input>
          </el-form-item>
          <el-form-item label="住址">
            <el-input v-model="detail.address"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="delect-footer">
          <el-button type="primary" @click="loderOne = false" class="formButon">取消</el-button>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="loderOne = false" class="formButon">保存</el-button>
        </span>
      </el-dialog>
      <div class="table">
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">姓名：{{detail.name}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">性别：男</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">年龄：{{detail.msg}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">岗位：{{detail.job}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">单位：{{detail.date}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">区域：{{detail.region}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">学历：{{detail.education}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">电话：{{detail.phone}}</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">部门：环卫部</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">婚姻状况：已婚</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">紧急联系人：刘月15087635633</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">身体状态：良</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">入职时间：2016-9-10</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">状态：{{detail.state}}</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">离职时间：——</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">住址：东营区滨湖大道花园社区1栋2单元302</div>
          </el-col>
        </el-row>
      </div>
      <div class="head">
        <div class="basic">薪资待遇</div>
        <div class="modify" @click="loderTown =true">修改</div>
      </div>

      <!-- 薪资待遇弹框 -->
      <el-dialog title="基本信息" :visible.sync="loderTown" center width="22%">
        <el-form :inline="true" :model="detail" class="demo-form-inline">
          <el-form-item label="基本工资">
            <el-input v-model="detail.basepay"></el-input>
          </el-form-item>
          <el-form-item label="用餐补助">
            <el-input v-model="detail.meals"></el-input>
          </el-form-item>
          <el-form-item label="交通补助">
            <el-input v-model="detail.traffic"></el-input>
          </el-form-item>
          <el-form-item label="通信补助">
            <el-input v-model="detail.signal"></el-input>
          </el-form-item>
          <el-form-item label="是否缴纳社保">
            <el-select v-model="social" class="selectTop">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否缴纳公积金">
            <el-select v-model="fund" class="selectTop">
              <el-option label="是" value="是"></el-option>
              <el-option label="否" value="否"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="每月休息">
            <el-input v-model="rest"></el-input>
          </el-form-item>
          <el-form-item label="上班时间">
            <el-input v-model="jobtime"></el-input>
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
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">基本工资：{{detail.basepay}}元/月</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">用餐补助：300元/月</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">交通补助: 200元/元</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">通讯补助：/</div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="grid-content bg-purple">是否缴纳保险：是</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">是否缴纳公积金：否</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">每月休息：4天</div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple-light">上班时间：6:00-12:00 13:00-15:00</div>
          </el-col>
        </el-row>
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
        <div class="modify" @click="remark = true">添加备注</div>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      marriage: "",
      social: "",
      fund: "",
      loderTown: false,
      loderOne: false,
      remark:false,
      remarks: [{ id: 1, text: "2018年度被评为部门优秀员工" }],
      // 上传文件列表
      fileList: [],
      text:"",
      textarea: "",
      id: "",
      detail: {},
      wcList: [
        {
          number: 1,
          name: "李诞",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "环卫工",
          education: "初中",
          state: "在职",
          basepay: "3000",
          subsidies: "300",
          msg: "36",
          policeNode: "10"
        },
        {
          number: 2,
          name: "张圆圆",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "洒水车司机",
          education: "大专",
          state: "在职",
          basepay: "3600",
          subsidies: "500",
          msg: "42",
          policeNode: "11"
        },
        {
          number: 3,
          name: "刘波",
          phone: "15375669845",
          date: "环卫1部",
          region: "东营区",
          job: "垃圾运输车司机",
          education: "高中",
          state: "离职",
          basepay: "3200",
          subsidies: "600",
          msg: "54",
          policeNode: "12"
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
      postList: [
        {
          lu: "0",
          label: "全部"
        },
        {
          lu: "1",
          label: "环卫工"
        },
        {
          lu: "2",
          label: "洒水车司机"
        },
        {
          lu: "3",
          label: "垃圾运输车司机"
        },
        {
          lu: "4",
          label: "中队长"
        },
        {
          lu: "5",
          label: "队长"
        },
        {
          lu: "6",
          label: "大队长"
        },
        {
          lu: "7",
          label: "主管"
        }
      ]
    };
  },
  created() {
    this.getId();
    this.getdetail();
  },

  methods: {
    
    // 添加备注
    addRemark() {
      let i=2
      this.remarks.push({
          id:i++,
          text: this.textarea
        })
      this.remark= false
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
    //遍历过滤
    getdetail() {
      this.detail = this.wcList.filter(item => item.number == this.id)[0];
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
.el-col {
  border: 1px solid #ccc;
  height: 50px;
  line-height: 50px;
  div {
    margin-left: 10px;
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
</style>

<template>
  <div id="addPersonnel">
    <el-form
      :inline="true"
      :model="formAdd"
      ref="ruleForm"
      :rules="rulesAdd"
      class="demo-form-inline"
    >
      <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/">
        <img v-if="photourl" :src="photourl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"><div>点击上传</div></i>
      </el-upload>
      <div style="font-size:16px;margin-left:14px; margin-bottom:14px">基本情况</div>
      <div>
        <div style="width:500px">
          <el-form-item label="姓名:" prop="name" style="margin-left:42px">
            <el-input v-model="formAdd.name" style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div style="width:500px">
          <el-form-item label="性别:" prop="sex" style="margin-left:42px">
            <el-select v-model="formAdd.applicantstatus" style="width:200px">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="年龄:" prop="age" style="margin-left:42px">
            <el-input v-model="formAdd.age"></el-input>
          </el-form-item>
          <el-form-item label="民族:" prop="nation" style="margin-left:238px">
            <el-input v-model="formAdd.nation" style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="籍贯:" prop="birthplace" style="margin-left:42px">
            <el-input v-model="formAdd.birthplace"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状况:" prop="ismarried" style="margin-left:210px">
            <el-select v-model="formAdd.ismarried" style="width:200px">
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="已婚" value="已婚"></el-option>
            </el-select>
          </el-form-item>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="身高:" prop="height" style="margin-left:42px">
            <el-input v-model="formAdd.height" style="width:200px"></el-input>
            <span>cm</span>
          </el-form-item>
          <el-form-item label="体重:" prop="weight" style="margin-left:220px">
            <el-input v-model="formAdd.weight" style="width:200px"></el-input>
            <span>kg</span>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="身体状况:" prop="healthy" style="margin-left:14px">
            <el-input v-model="formAdd.healthy" style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="现住址:" prop="liveaddress" style="margin-left:28px">
            <el-input v-model="formAdd.liveaddress" style="width:700px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="户口所在地:" prop="houseplace">
            <el-input v-model="formAdd.houseplace" style="width:700px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="身份证号:" prop="idcard" style="margin-left:14px">
            <el-input v-model="formAdd.idcard" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="岗位:" prop="job" style="margin-left:236px">
            <el-select v-model="formAdd.job" style="width:200px">
              <el-option label="局长" value="局长"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="薪资:" prop="cash" style="margin-left:42px">
            <el-input v-model="formAdd.cash" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="tel" style="margin-left:208px">
            <el-input v-model="formAdd.tel" style="width:200px"></el-input>
          </el-form-item>
        </div>
        <div style="font-size:16px;margin-left:14px; margin-top:10px; margin-bottom:14px">家庭情况</div>
        <div style="margin-left:42px">
          <el-form-item label="姓名:" prop="familyname1">
            <el-input v-model="formAdd.familyname1" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="关系:" prop="familytie1">
            <el-input v-model="formAdd.familytie1" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="工作单位:" prop="familywork1">
            <el-input v-model="formAdd.familywork1" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="familytel1">
            <el-input v-model="formAdd.familytel1" style="width:120px"></el-input>
          </el-form-item>
        </div>
        <div style="margin-left:42px">
          <el-form-item label="姓名:" prop="familyname2">
            <el-input v-model="formAdd.familyname2" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="关系:" prop="familytie2">
            <el-input v-model="formAdd.familytie2" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="工作单位:" prop="familywork2">
            <el-input v-model="formAdd.familywork2" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="familytel2">
            <el-input v-model="formAdd.familytel2" style="width:120px"></el-input>
          </el-form-item>
        </div>
        <div style="margin-left:42px">
          <el-form-item label="姓名:" prop="familyname3">
            <el-input v-model="formAdd.familyname3" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="关系:" prop="familytie3">
            <el-input v-model="formAdd.familytie3" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="工作单位:" prop="familywork3">
            <el-input v-model="formAdd.familywork3" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="familytel3">
            <el-input v-model="formAdd.familytel3" style="width:120px"></el-input>
          </el-form-item>
        </div>
        <div style="font-size:16px;margin-left:14px; margin-top:50px; margin-bottom:14px">教育背景</div>
        <div style="margin-left:14px">
          <el-form-item label="起止时间:" prop="studytime1">
            <el-date-picker
              v-model="formAdd.studytime1"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="width:210px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学校:" prop="studyschool1">
            <el-input v-model="formAdd.studyschool1" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="studymajor1">
            <el-input v-model="formAdd.studymajor1" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="学历:" prop="studylevel1">
            <el-input v-model="formAdd.studylevel1" style="width:80px"></el-input>
          </el-form-item>
        </div>
        <div style="margin-left:14px">
          <el-form-item label="起止时间:" prop="studytime2">
            <el-date-picker
              v-model="formAdd.studytime2"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="width:210px"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学校:" prop="studyschool2">
            <el-input v-model="formAdd.studyschool2" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="studymajor2">
            <el-input v-model="formAdd.studymajor2" style="width:120px"></el-input>
          </el-form-item>
          <el-form-item label="学历:" prop="studylevel2">
            <el-input v-model="formAdd.studylevel2" style="width:80px"></el-input>
          </el-form-item>
        </div>
        <div style="font-size:16px;margin-left:14px; margin-top:10px; margin-bottom:14px">工作经历</div>
        <div>
          <div style="margin-left:14px">
            <el-form-item label="起止时间:" prop="worktime1">
            <el-date-picker
              v-model="formAdd.worktime1"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="width:210px"
            >
            </el-date-picker>
            </el-form-item>
            <el-form-item label="工作单位:" prop="workplace1">
              <el-input v-model="formAdd.workplace1" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="部门:" prop="workdepart1">
              <el-input v-model="formAdd.workdepart1" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="职位:" prop="workjob1">
              <el-input v-model="formAdd.workjob1" style="width:70px"></el-input>
            </el-form-item>
            <el-form-item label="月薪:" prop="workcash1">
              <el-input v-model="formAdd.workcash1" style="width:70px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-left:14px">
            <el-form-item label="离职原因:" prop="leavetext1">
              <el-input v-model="formAdd.leavetext1" style="width:784px"></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <div style="margin-left:14px">
            <el-form-item label="起止时间:" prop="worktime2">
            <el-date-picker
              v-model="formAdd.worktime2"
              type="daterange"
              value-format="yyyy-MM-dd"
              style="width:210px"
            >
            </el-date-picker>
            </el-form-item>
            <el-form-item label="工作单位:" prop="workplace2">
              <el-input v-model="formAdd.workplace2" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="部门:" prop="workdepart2">
              <el-input v-model="formAdd.workdepart2" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="职位:" prop="workjob2">
              <el-input v-model="formAdd.workjob2" style="width:70px"></el-input>
            </el-form-item>
            <el-form-item label="月薪:" prop="workcash2">
              <el-input v-model="formAdd.workcash2" style="width:70px"></el-input>
            </el-form-item>
          </div>
          <div style="margin-left:14px">
            <el-form-item label="离职原因:" prop="leavetext2">
              <el-input v-model="formAdd.leavetext2" style="width:784px"></el-input>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <div class="buttonOff">
      <span slot="footer">
        <el-button type="primary" @click="resetForm('ruleForm')">取消</el-button>
      </span>
      <span slot="footer">
        <el-button type="primary" @click="addCar('ruleForm')">提交</el-button>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photourl: "",
      formAdd: {
        applicantperson: "",
        applicantdepart: "",
        param2: "",
        param3: "",
        materieltype: "",
        materielattr: "",
        materielonecost: "",
        materielcount: "",
        materielmoney: "",
        purpose: "",
        buydesc: ""
      },
      rulesAdd: {
        applicantperson: [
          { required: true, message: "请输入申请人", trigger: "blur" }
        ],
        applicantdepart: [
          { required: true, message: "请选择申请单位", trigger: "change" }
        ],
        param2: [
          { required: true, message: "请输入部门审批负责人", trigger: "change" }
        ],
        param3: [
          { required: true, message: "请输入部门采购负责人", trigger: "change" }
        ],
        materielname: [
          { required: true, message: "请输入材料名称", trigger: "blur" }
        ],
        materieltype: [
          { required: true, message: "请输入规格及型号", trigger: "blur" }
        ],
        materielattr: [
          { required: true, message: "请选择单位", trigger: "change" }
        ],
        materielonecost: [
          { required: true, message: "请输入单价", trigger: "blur" }
        ],
        materielcount: [
          { required: true, message: "请输入数量", trigger: "blur" }
        ],
        materielmoney: [
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        purpose: [{ required: true, message: "请输入项目", trigger: "blur" }],
        buydesc: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加物料申请
    addCar(formName) {
      // console.log(this.formAdd);
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log("添加成功");
        } else {
          console.log("添加失败");
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.demo-form-inline {
  position: relative ;
  text-align: left;
}
.buttonOff {
  text-align: center;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: absolute;
  top: 20px;
  right: 150px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  div {
      font-size: 14px;
      width: 100px;
      height: 14px;
      line-height: 14px;
  }
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>

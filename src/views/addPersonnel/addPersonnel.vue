<template>
  <div id="addPersonnel">
    <el-form
      :inline="true"
      hide-required-asterisk
      :model="formAdd"
      ref="ruleForm"
      :rules="rulesAdd"
      class="demo-form-inline"
    >
      <el-upload class="avatar-uploader" :limit='1' :action="$http.defaults.baseURL+'hr/memebers/uploadPhoto'" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :show-file-list="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
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
            <el-select v-model="formAdd.sex" style="width:200px">
              <el-option label value="男"></el-option>
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
              <el-option label value="全部"></el-option>
              <el-option v-for="item in dropJobList" :key='item' :label='item' :value='item'></el-option>
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
        <div>
          <el-form-item label="所在部门:" prop="organ" style="margin-left:14px">
            <el-select v-model="formAdd.organ" style="width:200px">
              <el-option label="全部" value></el-option>
              <el-option v-for="item in departList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间:" prop="hiretime" style="margin-left:208px">
              <el-date-picker
              v-model="formAdd.hiretime"
              type="date"
              placeholder="选择日期"
              style="width:200px"
              value-format="yyyy-MM-dd">
              </el-date-picker>
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
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="学校:" prop="studyschool1">
            <el-input v-model="formAdd.studyschool1" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="studymajro1">
            <el-input v-model="formAdd.studymajro1" style="width:120px"></el-input>
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
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          </el-form-item>
          <el-form-item label="学校:" prop="studyschool2">
            <el-input v-model="formAdd.studyschool2" style="width:160px"></el-input>
          </el-form-item>
          <el-form-item label="专业:" prop="studymajro2">
            <el-input v-model="formAdd.studymajro2" style="width:120px"></el-input>
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
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
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
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
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
      departList:[],
      flowForm:false,
      imageUrl:'',
      formAdd: {
        photourl: "",
        name:'',
        sex:'',
        age:'',
        cash:'',
        nation:'',
        birthplace:'',
        ismarried:'',
        height:'',
        weight:'',
        healthy:'',
        liveaddress:'',
        houseplace:'',
        idcard:'',
        job:'',
        tel:'',
        organ:'',
        hiretime:'',
        familyname1:'',
        familytie1:'',
        familywork1:'',
        familytel1:'',
        familyname2:'',
        familytie2:'',
        familywork2:'',
        familytel2:'',
        familyname3:'',
        familytie3:'',
        familywork3:'',
        familytel3:'',
        studytime1:'',
        studyschool1:'',
        studymajor1:'',
        studylevel1:'',
        studytime2:'',
        studyschool2:'',
        studymajor2:'',
        studylevel2:'',
        worktime1:'',
        workplace1:'',
        workdepart1:'',
        workjob1:'',
        workcash1:'',
        leavetext1:'',
        worktime2:'',
        workplace2:'',
        workdepart2:'',
        workjob2:'',
        workcash2:'',
        leavetext2:'',
      },
      rulesAdd: {
        name: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        age: [
          { pattern:/^\d{2}$/, required: true, message: "请填写两位数字", trigger: "blur" }
        ],
        tel: [
          { pattern:11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/, required: true, message: "请填写正确的手机号", trigger: "blur" }
        ],
        organ: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        hiretime: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        cash: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        nation: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        birthplace: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        ismarried: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        height: [
          { pattern:/^\d{2,3}$/, message: "请填写", trigger: "blur" }
        ],
        weight: [
          { pattern:/^\d{2,3}$/, message: "请填写", trigger: "blur" }
        ],
        healthy: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        liveaddress: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        houseplace: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        idcard: [
          { required: true, message: "请填写", trigger: "blur" },
          { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '请填写合法的身份证', trigger: 'blur' }
          
        ],
        job: [
          { required: true, message: "请选择", trigger: "blur" }
        ],
        familyname1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        familytie1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        familywork1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        familytel1: [
          {  pattern:11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/, required: true, message: "请填写正确的手机号", trigger: "blur" }
        ],
        studytime1:[
          { required: true, message: "请填写", trigger: "blur" }
        ],
        studyschool1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        studymajor1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        studylevel1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        worktime1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        workplace1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        workdepart1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        workjob1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        workcash1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
        leavetext1: [
          { required: true, message: "请填写", trigger: "blur" }
        ],
    },
    dropJobList:[]
  }
  },
  methods: {
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit('transform',this.flowForm)
    },
    // 人员添加申请
    addCar(formName) {
      this.formAdd.studytime1=this.formAdd.studytime1.join(' ')
      this.formAdd.studytime2?this.formAdd.studytime2=this.formAdd.studytime2.join(' '):this.formAdd.studytime2=''
      this.formAdd.worktime1=this.formAdd.worktime1.join(' ')
      this.formAdd.worktime2?this.formAdd.worktime2=this.formAdd.worktime2.join(' '):this.formAdd.worktime2=''
      // console.log(this.formAdd);
      // console.log(this.formAdd.studytime1)
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log("添加成功");
          this.$http.post('hr/memebers/add',this.$qs.stringify(this.formAdd)).then(res=>{
            this.$emit('addformpersonnel',this.flowForm)
            console.log('添加成功')
          })
        } else {
          console.log("添加失败");
          return false;
        }
      });
    },
    // 上传图片
    handleAvatarSuccess(response, file) {
      console.log(response)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.formAdd.photourl=response.url
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 岗位
      getDropJob(){
        this.$http.post('hr/memebers/dropJob').then(res=>{
          this.dropJobList=res.data
          // console.log(res.data)
        })
      },
      // 获取部门列表
    getDropDepart() {
      this.$http.post("hr/memebers/dropOrgan").then(res => {
        this.departList = res.data;
        // console.log(res.data)
      });
    },
    },
    created(){
      this.getDropJob();
      this.getDropDepart();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.demo-form-inline {
  text-align: left;
  position: relative;
}
.buttonOff {
  text-align: center;
}
.avatar-uploader .el-upload {
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    position: absolute;
    top: 20px;
    right: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    font-size: 16px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    div {
      width: 100px;
      height: 16px;
      line-height: 16px
    }
  }
  .avatar {
    position: absolute;
    top: 20px;
    right: 150px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    width: 100px;
    height: 100px;
    display: block;
  }
</style>

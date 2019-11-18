<template>
  <div class="bigbox">
    <div class="login">
      <div class="title">智慧环卫综合管理平台</div>
      <div class="content">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12" style="padding-top: 35px">
            <div class="grid-content" style="padding: 0 30px;">
              <el-input
                type="tel"
                prefix-icon="el-icon-mobile-phone"
                v-model="usermsg.username"
                placeholder="请输入手机号"
                maxlength="11"
                style="width: 321px"
              ></el-input>
              <div class="code">
                <el-input
                  prefix-icon="el-icon-chat-square"
                  v-model="usermsg.code"
                  placeholder="请输入验证码"
                  maxlength="6"
                  style="width: 217px; margin-top: 25px;"
                ></el-input>
                <el-button class="codebtn" @click="getCode" v-if="this.codebtn">{{ this.codemsg }}</el-button>
                <el-button class="codebtn" style="width: 100px" disabled v-else>{{ this.codeMit }}秒</el-button>
              </div>
              <el-button type="primary" style="width: 321px; margin-top: 25px" @click="login">登录</el-button>
              <div class="footer">
                <span
                  class="iconfont icon-shizhengdanwei"
                  style="margin-right: 5px;color:rgb(57, 153, 241)"
                ></span>东营区油城环卫有限公司
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <img src alt />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      codebtn: true,
      codemsg: "发送验证码",
      codeMit: 60,
      usermsg: {
        username: "",
        code: ""
      }
    };
  },
  methods: {
    getCode() {
      if (this.usermsg.username != "" && this.usermsg.username.length === 11) {
        this.$http
          .post("login/getLogonCode", this.$qs.stringify(this.usermsg))
          .then(res => {
            console.log(res.data);
            if (res.status === 1) {
              this.$message({
                type: "success",
                showClose: true,
                message: "发送验证码成功"
              });
              this.codeMit = 60;
              this.codebtn = !this.codebtn;
              clearInterval(interval);
              let interval = setInterval(() => {
                if (this.codeMit <= 1) {
                  this.codebtn = !this.codebtn;
                  clearInterval(interval);
                } else if (this.codeMit > 1) {
                  this.codeMit--;
                }
              }, 1000);
            } else if (res.status === 0) {
              this.$message({
                type: "error",
                showClose: true,
                message: "请核对手机号"
              });
            }
          });
      } else {
        this.$message({
          type: "error",
          showClose: true,
          message: "请输入正确手机号"
        });
      }
    },
    login() {
      this.$http
        .post("login/getLogonInformation", this.$qs.stringify(this.usermsg))
        .then(res => {
          if (res.status === 1) {
            localStorage.setItem("usermsg", JSON.stringify(res.data));
            this.$router.push({ name: "supervision" });
          } else {
            this.$message({
              type: "error",
              showClose: true,
              message: "验证码错误"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.bigbox {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: url("");
}

.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 725px;
  height: 450px;
  background-color: #fff;
  .title {
    font-size: 30px;
    font-weight: 700;
    margin: 30px 0;
    color: rgb(57, 153, 241);
    text-align: center;
    .search {
      padding: 0 15px;
    }
  }
}

.content {
  padding-bottom: 50px;
}
.code {
  position: relative;
  .codebtn {
    position: absolute;
    top: 25px;
    right: -27px;
    text-align: center;
  }
}
.footer {
  margin-top: 20px;
}
</style>
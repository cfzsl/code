<template>
  <div class="bigbox">
    <div class="login">
      <div class="title">智慧环卫综合管理平台</div>
      <div class="content">
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="12" style="padding-top: 35px">
            <div class="grid-content" style="padding: 0 30px;">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                v-model="input"
                placeholder="请输入手机号"
                style="width: 321px"
              ></el-input>
              <div class="code">
                <el-input
                  prefix-icon="el-icon-chat-square"
                  v-model="input"
                  placeholder="请输入验证码"
                  style="width: 217px; margin-top: 25px;"
                ></el-input>
                <el-button class="codebtn">发送验证码</el-button>
              </div>
              <div style="margin-top: 20px">
                <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>记住登录
              </div>
              <el-button type="primary" style="width: 100%; margin-top: 25px" @click="go">登录</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <img src="../../assets/img/登录图片.png" alt />
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- <div class="footer">系统开发：东营区油城环卫有限公司&nbsp;&nbsp;&nbsp;&nbsp;技术支持：0546-7773897</div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      value: true
    };
  },
  methods: {
    go() {
      this.$router.push({
        name: "homeview"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bigbox {
  width: 100%;
  height: 100%;
  background-size:cover;
  background-image: url('../../assets/img/背景.jpg');
}

.login {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  width: 725px;
  height: 500px;
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
  // border-bottom: 1px solid #d2d2d2;
}
.code {
  position: relative;
  .codebtn {
    position: absolute;
    top: 25px;
    right: -27px;
  }
}
.footer {
  text-align: center;
  line-height: 60px;
}
</style>
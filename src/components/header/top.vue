<template>
  <!-- 头部 -->
  <div id="Top">
    <div class="TopL">
      <span>智慧环卫综合管理平台</span>
    </div>
    <div class="TopR">
      <div class="TopRt">
        <span>管理员您好，欢迎登录！</span>
      </div>
      <div class="TopRb">
        <i class="el-icon-refresh"></i>
        <span>刷新</span>
        <i class="el-icon-thumb"></i>
        <span>幫助</span>
        <i class="el-icon-switch-button"></i>
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
#Top {
  position: fixed;
  width: 100%;
  height: 70px;
  background-color: rgba(204, 204, 204, 1);
  overflow: hidden;
  .TopL {
    float: left;
    height: 28px;
    width: 280px;
    margin-left: 20px;
    margin-top: 20px;
    span {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      text-align: center;
      font-family: "Arial-BoldMT", "Arial Bold", "Arial";
      font-weight: 700;
      font-style: normal;
      font-size: 28px;
    }
  }
  .TopR {
    float: right;
    margin-right: 12px;
    font-family: "ArialMT", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 12px;
    .TopRt {
      margin-top: 12px;
      span {
        display: inline-block;
        margin-left: 24px;
      }
    }
    .TopRb {
      margin-top: 12px;
      i {
        display: inline-block;
        margin-right: 6px;
      }
      span {
        display: inline-block;
        margin-right: 12px;
      }
    }
  }
}
</style>

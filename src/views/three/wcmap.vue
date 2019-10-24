<template>
  <div id="wcmap">
    <div class="mapWc">
      <baidu-map
        class="map"
        :center="{lng: 118.550734, lat: 37.469664}"
        dragging
        :zoom="14"
        scroll-wheel-zoom
      >
        <!-- 图标 -->
        <div class="mapIcon">
          <div class="mapcenter">
            <i class="mapimgone"></i>
            <span>&nbsp &nbsp &nbsp公厕数据未开启</span>
          </div>
          <div class="mapcenter">
            <i class="mapimgtown"></i>
            <span>&nbsp &nbsp &nbsp公厕数据正常</span>
          </div>
          <div class="mapcenter">
            <i class="mapimgthree"></i>
            <span>&nbsp &nbsp &nbsp公厕数据超标报警</span>
          </div>
        </div>
        <bm-marker
          :position="{ lng: 118.550303, lat: 37.465282}"
          :labelStyle="{color: 'orange', fontSize : '24px'}"
        ></bm-marker>
        <my-overlay
          v-for="(item,index) in positions"
          :key="index"
          v-text="item.text"
          :position="{lng:item.lng, lat:item.lat}"
          :active="active"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
          @click="infoWindow"
        >
          <!-- <bm-info-window
            title="智慧公厕详情"
            :position="item"
            :show="show"
            @close="infoWindowClose"
          >
            <el-divider></el-divider>
            <p>厕所名称:公厕详情</p>
            <p>管养单位:东营市卓越环境工程有限公司</p>
            <div>
              <span>负责人:毛文平</span>
              <span>负责人电话:13361503999</span>
            </div>
            <p>地址:蒙山路与黄河路路口的西北角</p>
            <div>
              <span>当前状态:</span>
              <span>开放使用</span>
            </div>
            <p>服务:生活垃圾收集点,第三卫生间</p>
            <p>最后接收数据时间:2019-10-19 11:19:06</p>
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="date" label="分类" width="60"></el-table-column>
              <el-table-column prop="name" label="男厕" width="140"></el-table-column>
              <el-table-column prop="address" label="女厕" width="140"></el-table-column>
            </el-table>
          </bm-info-window> -->
        </my-overlay>
        <!-- 信息弹窗 -->
      </baidu-map>
    </div>
  </div>
</template>

<script>
import MyOverlay from "@/components/MyOverlay/MyOverlay.vue";
export default {
  data() {
    return {
      show:false,
      tableData: [
        {
          date: "硫化氢",
          name: "0.0(标准值:<=0.5ppm)",
          address: "0.0(标准值:<=0.5ppm)"
        },
        {
          date: "氨气",
          name: "0.0(标准值:<=0.5ppm)",
          address: "0.0(标准值:<=0.5ppm)"
        },
        {
          date: "温度",
          name: "17.5",
          address: "17.5"
        },
        {
          date: "湿度",
          name: "17.5",
          address: "17.5"
        }
      ],
      active: false,
      positions: [
        { lng: 118.496593, lat: 37.474549, text:"裕华南公厕" },
        { lng: 118.496553, lat: 37.476699, text:"裕华北公厕"},
        { lng: 118.493386, lat: 37.464995, text:"胜利广场公厕"},
        { lng: 118.533078, lat: 37.464312, text:"体育公园公厕"},
        {lng: 118.550734, lat: 37.469664,  text:"新区公厕"}
      ]
    };
  },
  methods: {
    infoWindow() {
      this.show = true;
    },
    infoWindowClose() {
      this.show = false;
    },
    getwcList() {
      this.$http
    }
  },
  components: {
    MyOverlay
  }
};
</script>

<style lang="scss" scoped>
.mapWc {
  margin-top: 10px;
  position: relative;
  .map {
    width: 100%;
    height: 746px;
  }
  .mapIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 440px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    line-height: 30px;
    font-size: 14px;
    background-color: #fff;
    .mapcenter {
      display: inline-block;
      position: relative;
      margin-left: 20px;
      .mapimgone {
        display: inline-block;
        position: absolute;
        top: 5px;
        width: 20px;
        height: 20px;
        background: url("../../assets/img/grey.png") no-repeat;
        background-size: 20px 20px;
      }
      .mapimgtown {
        display: inline-block;
        position: absolute;
        top: 5px;
        width: 20px;
        height: 20px;
        background: url("../../assets/img/green.png") no-repeat;
        background-size: 20px 20px;
      }
      .mapimgthree {
        display: inline-block;
        position: absolute;
        top: 5px;
        width: 20px;
        height: 20px;
        background: url("../../assets/img/red.png") no-repeat;
        background-size: 20px 20px;
      }
    }
  }
}
</style>
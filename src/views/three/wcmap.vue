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
          :position="item"
          text="智慧公厕"
          :active="active"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        ></my-overlay>
        <!-- 信息弹窗 -->
        <bm-info-window
          :position="{lng: 118.550303, lat: 37.465282}"
          title="智慧公厕详情"
          :show="infoWindow.show"
          @close="infoWindowClose"
        >
          <p v-text="infoWindow.contents"></p>
          <button @click="clear">Clear</button>
        </bm-info-window>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import MyOverlay from "@/components/MyOverlay/MyOverlay.vue";
export default {
  data() {
    return {
      infoWindow: {
        show: true,
        contents: ''
      },
      active: false,
      positions: [
        { lng: 118.550303, lat: 37.465282 },
        { lng: 118.58408, lat: 37.496438 },
        { lng: 118.505029, lat: 37.496123 },
        { lng: 118.506322, lat: 37.455342 }
      ]
    };
  },
  methods:{
    infoWindowClose(){
      this.infoWindow.show=false
    },
    clear(){
      this.infoWindow.show=false
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
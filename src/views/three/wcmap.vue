<template>
  <div id="wcmap">
    <div class="mapWc">
      <baidu-map
        class="map"
        :center="{lng: 118.550734, lat: 37.469664}"
        dragging
        :zoom="12"
        scroll-wheel-zoom
      >
        <bm-marker
          :position="{lng: 118.550734, lat: 37.469664}"
          :labelStyle="{color: 'orange', fontSize : '24px'}"
        ></bm-marker>
        <my-overlay
          :position="{lng: 118.550734, lat: 37.469664}"
          text="点击我"
          :active="active"
          @mouseover.native="active = true"
          @mouseleave.native="active = false"
        ></my-overlay>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import MyOverlay from "@/components/MyOverlay/MyOverlay.vue";
export default {
  data() {
    return {
      active: false
    };
  },
  components: {
    MyOverlay
  }
};
</script>

<style lang="scss" scoped>
.mapWc {
  margin-top: 10px;
  .map {
    width: 100%;
    height: 746px;
  }
}
</style>
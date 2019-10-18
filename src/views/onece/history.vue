<template>
  <div class="mapbox">
    <baidu-map
      class="map"
      :center="{lng: 114.366636, lat: 30.628765}"
      :zoom="20"
      :scroll-wheel-zoom="true"
    >
      <bm-marker
        class="icon"
        :position="polylinePath[0]"
        :dragging="false"
        
      ></bm-marker>

      <bm-polyline
        :path="polylinePath"
        stroke-color="blue"
        :stroke-opacity="0.5"
        :stroke-weight="3"
        :editing="false"
        @lineupdate="updatePolylinePath"
      ></bm-polyline>
    </baidu-map>

    <button class="hf" @click="huifang">播放历史轨迹</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      polylinePath: [
        { lng: 114.366304, lat: 30.6292 },
        { lng: 114.366497, lat: 30.628963 },
        { lng: 114.366582, lat: 30.62885 },
        { lng: 114.366604, lat: 30.628811 },
        { lng: 114.366667, lat: 30.628768 },
        { lng: 114.366739, lat: 30.628796 },
        { lng: 114.366775, lat: 30.628815 },
        { lng: 114.366838, lat: 30.628862 },
        { lng: 114.366887, lat: 30.628893 },
        { lng: 114.366946, lat: 30.628928 },
        { lng: 114.366995, lat: 30.628959 },
        { lng: 114.367099, lat: 30.629033 },
        { lng: 114.367148, lat: 30.62906 },
        { lng: 114.367179, lat: 30.629056 },
        { lng: 114.367197, lat: 30.629021 },
        { lng: 114.367148, lat: 30.628974 },
        { lng: 114.367076, lat: 30.62892 },
        { lng: 114.367004, lat: 30.628873 },
        { lng: 114.366905, lat: 30.628819 },
        { lng: 114.36682, lat: 30.628772 },
        { lng: 114.366771, lat: 30.62878 },
        { lng: 114.366762, lat: 30.628815 },
        { lng: 114.36682, lat: 30.628854 },
        { lng: 114.366856, lat: 30.628877 },
        { lng: 114.366883, lat: 30.628885 }
      ],
      num: 0.001
    };
  },
  methods: {
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    huifang() {
      let timer = setInterval(() => {
        if (this.polylinePath.length != 0) {
          this.polylinePath.splice(0, 1);
        }
      }, 100);
    },
    draw({ el, BMap, map }) {
      try {
        let lng = this.polylinePath[0].lng;
        let lat = this.polylinePath[0].lat;
        const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
        el.style.left = pixel.x + "px";
        el.style.top = pixel.y + "px";
        var icon = new BMap.Icon(
          "../assets/img/e17.png",
          new BMap.Size(202, 202),
          {
            anchor: new BMap.Size(101, 101),
            imageOffset: new BMap.Size(0 - 10, 0 - 17)
          }
        );
      } catch (error) {}
    }
  }
};
</script>

<style lang="scss" scoped>
.mapbox {
  height: 100%;
  .bf,
  .hf {
    position: fixed;
    width: 150px;
    height: 50px;
    top: 100px;
    background-color: #fff;
  }
  .bf {
    right: 100px;
  }
  .hf {
    right: 160px;
  }
}
.map {
  position: relative;
  height: 100%;
  .BMap_cpyCtrl {
    display: none !important;
  }
  .anchorBL {
    display: none !important;
  }
}

.BMap_Marker {
  width: 20px;
  height: 20px;
}
</style>
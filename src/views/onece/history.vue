<template>
  <div class="mapbox">
    <baidu-map
      class="map"
      :center="{lng: 114.366636, lat: 30.628765}"
      :zoom="20"
      :scroll-wheel-zoom="true"
    >
      <bm-marker class="icon" :position="polylinePath[0]" :dragging="false"></bm-marker>

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
      polylinePath: [],
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
    getpolylinePath() {
      this.$http.get("xy/demo").then(res => {
        this.polylinePath = res.data
      });
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
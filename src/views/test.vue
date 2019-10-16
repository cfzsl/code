<template>
  <baidu-map class="map" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true">
    <bm-polyline
      :path="polylinePath"
      stroke-color="blue"
      :stroke-opacity="0.5"
      :stroke-weight="2"
      :editing="false"
      @lineupdate="updatePolylinePath"
    ></bm-polyline>
    <bm-polyline
      :path="polylinePat"
      stroke-color="blue"
      :stroke-opacity="0.5"
      :stroke-weight="2"
      :editing="false"
      @lineupdate="updatePolylinePath"
    ></bm-polyline>
  </baidu-map>
</template>

<script>
export default {
  data() {
    return {
      polylinePath: [
        { lng: 116.404, lat: 39.915 },
        { lng: 116.405, lat: 39.92 },
        { lng: 116.423493, lat: 39.907445 }
      ],
      polylinePat: [
         { lng: 116.404, lat: 39.915 },
        { lng: 116.4, lat: 39.92 },
        { lng: 116.423493, lat: 39.907445 }
      ]
    };
  },
  methods: {
    updatePolylinePath(e) {
      this.polylinePath = e.target.getPath();
    },
    addPolylinePoint() {
      this.polylinePath.push({ lng: 116.404, lat: 39.915 });
    },
    draw({ el, BMap, map }) {
      this.map = map;
      const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915));
      el.style.left = pixel.x - 10 + "px";
      el.style.top = pixel.y - 30 + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
.map {
  height: 100%;
}
</style>
<template>
    <bm-overlay
      ref="customOverlay"
      v-if="this.status == '2'"
      class="sample green"
      pane="labelPane"
      @draw="draw"
    >
      <div v-text="text" @click="handleClick"></div>
    </bm-overlay>
    <bm-overlay
      ref="customOverlay"
      v-else-if="this.status == '1'"
      class="sample red"
      pane="labelPane"
      @draw="draw"
    >
      <div v-text="text" @click="handleClick"></div>
    </bm-overlay>
    <bm-overlay
      ref="customOverlay"
      v-else-if="this.status == '0'"
      class="sample grey"
      pane="labelPane"
      @draw="draw"
    >
      <div v-text="text" @click="handleClick"></div>
    </bm-overlay>
</template>

<script>
export default {
  data() {
    return {
      showdetail: false,
      formInline: ""
    };
  },
  props: ["text", "position", "status"],
  watch: {
    // position: {
    //   handler() {
    //     this.$refs.customOverlay.reload();
    //   },
    //   deep: true
    // }
  },
  methods: {
    handleClick() {},
    draw({ el, BMap, map }) {
      this.BMap = BMap;
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 16 + "px";
      el.style.top = pixel.y - 36 + "px";
    }
  },
  created() {}
};
</script>

<style>
.sample {
  padding-left: 30px;
  width: 130px;
  height: 36px;
  line-height: 30px;
  color: #fff;
  position: absolute;
  overflow: hidden;
}
.green {
  background-image: url("../../assets/img/marker_background_green.png");
  background-repeat: no-repeat;
}
.grey {
  background-image: url("../../assets/img/marker_background_grey.png");
  background-repeat: no-repeat;
}
.red {
  background-image: url("../../assets/img/marker_background_red.png");
  background-repeat: no-repeat;
}

.text {
  height: 100%;
  padding-left: 30px;
  font-size: 15px;
}
</style>
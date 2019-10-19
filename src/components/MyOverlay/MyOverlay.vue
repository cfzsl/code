<template>
  <bm-overlay
    ref="customOverlay"
    :class="{sample: true, green: true, active}"
    pane="labelPane"
    @draw="draw">
    <div v-text="text" @click="handleClick"></div>
  </bm-overlay>
</template>

<script>
export default {
  props: ['text', 'position', 'active'],
  watch: {
    position: {
      handler () {
        this.$refs.customOverlay.reload()
      },
      deep: true,
      BMap:''
    }
  },
  methods: {
    handleClick () {
      this.$emit('mapPositions',this.position)
    },
    draw ({el, BMap, map}) {
      this.BMap=BMap
      const {lng, lat} = this.position
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
      el.style.left = pixel.x - 63 + 'px'
      el.style.top = pixel.y - 18 + 'px'
    },
    // 弹窗颜色
    bgimg () {
      if (this.status == 2) {
        this.green = true
      } else if (status == 0) {
        this.grey = true
      } else if (status == 1) {
        this.red = true
      }
    }
  },
  created(){
  }
}
</script>

<style>
.sample {
  margin-left: 48px;
  margin-top: -18px;
  width: 126px;
  height: 36px;
  line-height: 30px;
  color: #fff;
  position: absolute;
  overflow: hidden;
  text-align: center;
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
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
            <span>&nbsp; &nbsp; &nbsp;公厕数据未开启</span>
          </div>
          <div class="mapcenter">
            <i class="mapimgtown"></i>
            <span>&nbsp; &nbsp; &nbsp;公厕数据正常</span>
          </div>
          <div class="mapcenter">
            <i class="mapimgthree"></i>
            <span>&nbsp; &nbsp; &nbsp;公厕数据超标报警</span>
          </div>
        </div>
        <bm-marker :position="test" :labelStyle="{color: 'orange', fontSize : '24px'}"></bm-marker>
        <my-overlay
          v-for="(item,index) in positions"
          :key="index"
          :text="item.wcname"
          :status="item.wcStatus"
          :position="{lng:item.x, lat:item.y}"
          @click="click1"
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
      positions: [],
      test: {}
    };
  },
  methods: {
    click1() {
      console.log(1);
      
    },
    getwcList() {
      this.$http.get("map/getPosition").then(res => {
        this.positions = res.data;
        console.log(this.positions);
      });
    },
    /**
     * WGS84转GCj02
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    wgs84togcj02tobd09(lng, lat) {
      const xPI = (3.14159265358979324 * 3000.0) / 180.0;
      const PI = 3.1415926535897932384626;
      const a = 6378245.0;
      const ee = 0.00669342162296594323;
      // WGS84转GCj02
      let dlat = this.transformlat(lng - 105.0, lat - 35.0);
      let dlng = this.transformlng(lng - 105.0, lat - 35.0);
      let radlat = (lat / 180.0) * PI;
      let magic = Math.sin(radlat);
      magic = 1 - ee * magic * magic;
      let sqrtmagic = Math.sqrt(magic);
      dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * PI);
      dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * PI);
      let mglat = lat + dlat;
      let mglng = lng + dlng;
      // 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
      let z =
        Math.sqrt(mglng * mglng + mglat * mglat) +
        0.00002 * Math.sin(mglat * xPI);
      let theta = Math.atan2(mglat, mglng) + 0.000003 * Math.cos(mglng * xPI);
      let bdlng = z * Math.cos(theta) + 0.0065;
      let bdlat = z * Math.sin(theta) + 0.006;
      // return [bdlng, bdlat]
      return { lng: bdlng, lat: bdlat };
    },
    transformlat(lng, lat) {
      const PI = 3.1415926535897932384626;
      let ret =
        -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lat * PI) + 40.0 * Math.sin((lat / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((160.0 * Math.sin((lat / 12.0) * PI) +
          320 * Math.sin((lat * PI) / 30.0)) *
          2.0) /
        3.0;
      return ret;
    },
    transformlng(lng, lat) {
      const PI = 3.1415926535897932384626;
      let ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
      ret +=
        ((20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) *
          2.0) /
        3.0;
      ret +=
        ((20.0 * Math.sin(lng * PI) + 40.0 * Math.sin((lng / 3.0) * PI)) *
          2.0) /
        3.0;
      ret +=
        ((150.0 * Math.sin((lng / 12.0) * PI) +
          300.0 * Math.sin((lng / 30.0) * PI)) *
          2.0) /
        3.0;
      return ret;
    }
  },
  created() {
    this.getwcList();
    // this.test = this.wgs84togcj02tobd09(114.41166666666666, 30.482222222222223);
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
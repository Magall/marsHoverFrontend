<template>
  <div id="map-container">
    <div class=" column" v-for="(x, idy) in limitX" :key="x">
      <div class=" element" v-for="(y, idx) in limitY" :key="y">
        {{ idx }} , {{ idy }}
      </div>
    </div>
    <Hover v-for="(hover,i) in hoversResponse" :key="i" :path="hover.hoverHistory" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Hover from "@/components/Mars/Hover/Hover.vue";
import HoverOutputDto from "@/Dtos/HoverOutputDto";
export default Vue.extend({
  props: ["limitX", "limitY", "hoversResponse"],
  mounted() {
  
  },
  components: { Hover },
  data() {
    return {
      currentHover: [],
      currentInstruction: {},
      show: false,
    };
  },
  // methods: {
  //   walking(e:any){
  //    this.currentInstruction ={...e}
  //   },
  //   hoverWalk() {
  //     this.hoversResponse.forEach((el: any) => {
  //       this.currentHover = el.hoverHistory;
  //       console.log(this.currentHover)

  //     });
  //   },
  // },
});
</script>
<style lang="scss" scoped>
@import "/Map.scss";
</style>

<template>
  <div id="hover" :style="style"></div>
</template>

<script lang="ts">
import Cordinates from "@/types/Coordinates";
import Vue from "vue";
import "animate.css";
export default Vue.extend({
  props: ["path"],
  mounted() {
    setTimeout(() => {
      this.i += 1;
      console.log("hey");
    }, 1000);
  },
  data() {
    return {
      i: 0,
      pos: this.path[0],
      bottom:0
    };
  },
  computed: {
    currentPos(): Cordinates {
      return this.path[this.i];
    },
    proxPos(): Cordinates {
      return this.path[this.i];
    },

    style(): Object {
     
      return {
        left: this.path[this.i].x * 145 + "px",
        bottom: this.path[this.i].y * 145 + "px",
      };
    },
  },
  watch: {
    i(val) {
      console.log(this.i);
      let a = setTimeout(() => {
        this.i += 1;
      }, 2000);
      if (this.i >= this.path.length - 1) {
        clearTimeout(a);
      }
    },
  },
});
</script>
<style lang="scss" scoped>
#hover {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: green;
  position: absolute;
}
@keyframes animation {
  from {
  }
}
</style>

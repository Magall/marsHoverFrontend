<template>
  <div id="results" v-if="hovers">
    <h2>Results</h2>
    <div
      class="result"
      v-for="(res, i) in hovers"
      :key="res.x + res.y  + res.hoverHistory.length"
    >
      <span>Hover {{ i + 1 }}</span>
      <span>East: {{ res.finalPos.x }}</span>
      <span>North: {{ res.finalPos.y }}</span>
      <span>Heading:  {{res.finalPos.heading}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: ["hovers"],
});
</script>
<style lang="scss" scoped>
@import "./Results.scss";
</style>
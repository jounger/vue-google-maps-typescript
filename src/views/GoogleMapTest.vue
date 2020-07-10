<template>
  <div>
    <div class="container">
      <ul class="navigation">
        <h3 class="white-text">Google Map Test Component:</h3>
        <li><router-link to="/test/marker">Marker</router-link></li>
        <li><router-link to="/test/autocomplete">Autocomplete</router-link></li>
        <li><router-link to="/test/direction">Direction</router-link></li>
        <li>
          <router-link to="/test/distance-matrix">Distance Matrix</router-link>
        </li>
      </ul>
      <router-view class="content blue-background white-text"></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class GoogleMapTest extends Vue {}
</script>
<style lang="css">
.white-text {
  color: #fff;
}
.blue-background {
  background: #3399ff;
}
.container {
  display: flex;
  justify-content: space-around;
  align-content: start;
}
.navigation {
  max-width: 200px;
  background: #3399ff;
  margin: 0 auto;
  margin-right: 20px;
  order: 0;
  flex-grow: 0;
  text-align: left;
  padding: 20px 40px;
}
.navigation li {
  margin: 5px;
  color: #fff;
}
.navigation li a {
  color: #fff;
  font-size: 20px;
}
.content {
  order: 1;
  flex-grow: 1;
  max-width: 700px;
  margin: 0 auto;
}
</style>

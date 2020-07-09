<template>
  <div>
    <div class="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { Loader, LoaderOptions, google } from "google-maps";
import { apiKey } from "@/constants/mapSettings";

@Component
export default class GoogleMapLoader extends Vue {
  @Ref() googleMap!: HTMLDivElement;
  @Prop() mapConfig!: object;

  google = null as google | null;
  map = null as google.maps.Map<HTMLDivElement> | null;
  options: LoaderOptions = {
    language: "vi",
    region: "VI",
    libraries: ["places", "drawing", "visualization", "geometry"]
  };
  loader = new Loader(apiKey, this.options);

  initializeMap() {
    const mapContainer = this.googleMap;
    if (this.google != null) {
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    }
  }

  async mounted() {
    console.log("GoogleMapLoader");
    const googleMapLoader = await this.loader.load();
    this.google = googleMapLoader;
    this.initializeMap();
  }
}
</script>
<style lang="css">
.google-map {
  width: 700px;
  height: 500px;
  margin: 0 auto;
}
</style>

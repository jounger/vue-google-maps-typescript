<template>
  <div>
    <div class="google-map" ref="googleMap" :style="mapStyle"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref, Prop } from "vue-property-decorator";
import { Loader, google } from "google-maps";
import { GoogleMapConfig } from "@/models/map-config";

@Component
export default class GoogleMapLoader extends Vue {
  @Ref() readonly googleMap!: HTMLDivElement;
  @Prop() readonly options!: GoogleMapConfig;
  @Prop({ default: "" }) readonly apiKey!: string;
  @Prop({ default: { width: "400px", height: "300px" } })
  readonly mapStyle!: object;

  google = null as google | null;
  map = null as google.maps.Map<HTMLDivElement> | null;
  loader = new Loader(this.apiKey, this.options.loaderOptions);

  initializeMap() {
    if (this.google != null) {
      this.map = new this.google.maps.Map(
        this.googleMap,
        this.options.mapOptions
      );
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

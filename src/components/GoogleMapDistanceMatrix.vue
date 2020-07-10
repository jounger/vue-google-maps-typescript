<template>
  <div>
    <template v-if="Boolean(this.distanceLocal)">
      <slot :distance="distanceLocal" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { google } from "google-maps";

@Component
export default class GoogleMapDistanceMatrix extends Vue {
  @Prop() readonly google!: google;
  @Prop() readonly map!: google.maps.Map<HTMLDivElement>;
  @Prop() readonly routers!: google.maps.DistanceMatrixRequest;
  @Prop({ default: false }) readonly single!: boolean;
  // @PropSync("distance", { type: Object })
  // distanceSync!: google.maps.DistanceMatrixResponse;

  distanceLocal = null as google.maps.DistanceMatrixResponse | null;
  distanceMatrixService = new this.google.maps.DistanceMatrixService();

  @Watch("routers", { immediate: true })
  onRouterChange(val: google.maps.DistanceMatrixRequest) {
    console.log("routers change", val);
    if (typeof val !== "undefined") {
      const cloneVal = Object.assign({}, val);
      const valOriginsPlaces = cloneVal.origins as google.maps.LatLng[];
      const valDestinationsPlaces = cloneVal.destinations as google.maps.LatLng[];
      if (
        this.distanceMatrixService &&
        valOriginsPlaces.length > 0 &&
        valDestinationsPlaces.length > 0
      ) {
        if (this.single) {
          cloneVal.origins = [valOriginsPlaces[valOriginsPlaces.length - 1]];
          cloneVal.destinations = [
            valDestinationsPlaces[valDestinationsPlaces.length - 1]
          ];
        }
        this.distanceMatrixService.getDistanceMatrix(
          cloneVal,
          this.responseService
        );
      }
    }
  }

  responseService(
    response: google.maps.DistanceMatrixResponse,
    status: google.maps.DistanceMatrixStatus
  ) {
    if (status === "OK") {
      console.log("DistanceMatrix request success " + status);
      const distanceResult = Object.assign({}, response);
      // TODO: solve error trigger loop in @Watch("routers")
      // this.distanceSync = distanceResult;
      this.distanceLocal = distanceResult;
      console.log(response);
    } else {
      console.log("DistanceMatrix request failed due to " + status);
    }
  }
}
</script>

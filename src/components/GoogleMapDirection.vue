<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { google } from "google-maps";

@Component
export default class GoogleMapDirection extends Vue {
  @Prop() readonly google!: google;
  @Prop() readonly map!: google.maps.Map<HTMLDivElement>;
  @Prop() readonly router!: google.maps.DirectionsRequest;

  directionsService = null as google.maps.DirectionsService | null;
  directionsRenderer = null as google.maps.DirectionsRenderer | null;

  @Watch("router")
  onRouterChange(val: google.maps.DirectionsRequest) {
    // console.log("router change", val);
    if (typeof val != "undefined") {
      const valOriginPlace = val.origin as google.maps.LatLng;
      const valDestinationPlace = val.destination as google.maps.LatLng;
      if (this.directionsService && valOriginPlace && valDestinationPlace) {
        this.directionsService.route(val, this.rendererService);
      }
    }
  }

  rendererService(
    response: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) {
    if (status === "OK" && this.directionsRenderer) {
      console.log("Directions request success " + status);
      this.directionsRenderer.setDirections(response);
    } else {
      console.log("Directions request failed due to " + status);
    }
  }

  mounted() {
    // console.log("GoogleMapDirection", this.router);
    this.directionsService = new this.google.maps.DirectionsService();
    this.directionsRenderer = new this.google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(this.map);
    if (typeof this.router != "undefined") {
      const originPlace = this.router.origin as google.maps.LatLng;
      const destinationPlace = this.router.destination as google.maps.LatLng;
      if (originPlace && destinationPlace) {
        this.directionsService.route(this.router, this.rendererService);
      }
    }
  }
}
</script>

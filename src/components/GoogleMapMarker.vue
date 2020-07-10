<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { google } from "google-maps";

@Component
export default class GoogleMapMarker extends Vue {
  @Prop() google!: google;
  @Prop() map!: google.maps.Map<HTMLDivElement>;
  @Prop() marker!: google.maps.MarkerOptions;

  mapMarker = null as google.maps.Marker | null;

  @Watch("marker")
  onMarkerChange(
    val: google.maps.MarkerOptions,
    oldVal: google.maps.MarkerOptions
  ) {
    // console.log("marker change");
    const valPos = val.position as google.maps.LatLng;
    const oldValPos = oldVal.position as google.maps.LatLng;
    if (
      this.mapMarker &&
      (valPos.lat != oldValPos.lat || valPos.lng != oldValPos.lng)
    ) {
      this.mapMarker.setPosition(this.marker.position as google.maps.LatLng);
      this.mapMarker.setVisible(true);
    }
  }

  mounted() {
    // console.log("GoogleMapMarker", this.marker.position);
    this.mapMarker = new this.google.maps.Marker({
      position: this.marker.position,
      map: this.map,
      title: this.marker.title
    });
  }
}
</script>

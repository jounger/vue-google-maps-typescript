<template>
  <div>
    <template v-if="Boolean(this.placeLocal) && Boolean(this.address)">
      <slot :place="placeLocal" :address="address" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, PropSync } from "vue-property-decorator";
import { google } from "google-maps";

@Component
export default class GoogleMapAutocomplete extends Vue {
  @Prop() readonly google!: google;
  @Prop() readonly map!: google.maps.Map<HTMLDivElement>;
  @Prop() readonly countries!: Array<string>;
  @Prop() readonly input!: HTMLInputElement;
  @PropSync("place", { type: Object })
  placeSync!: google.maps.places.PlaceResult;

  placeLocal = null as google.maps.places.PlaceResult | null;
  address = "";

  getAddressFromPlace(placeResult: google.maps.places.PlaceResult) {
    if (placeResult.address_components) {
      return [
        (placeResult.address_components[0] &&
          placeResult.address_components[0].short_name) ||
          "",
        (placeResult.address_components[1] &&
          placeResult.address_components[1].short_name) ||
          "",
        (placeResult.address_components[2] &&
          placeResult.address_components[2].short_name) ||
          ""
      ].join(" ");
    }
    return "";
  }

  mounted() {
    // console.log("GoogleMapAutocomplete");
    const autocomplete = new this.google.maps.places.Autocomplete(this.input);
    if (this.countries && this.countries.length > 0) {
      autocomplete.setComponentRestrictions({ country: this.countries });
    }
    autocomplete.bindTo("bounds", this.map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    autocomplete.addListener("place_changed", () => {
      const placeResult = Object.assign({}, autocomplete.getPlace());
      this.placeSync = placeResult;
      this.placeLocal = placeResult;
      this.address = this.getAddressFromPlace(placeResult);
      if (!placeResult.geometry) {
        console.log(
          "No details available for input: '" + placeResult.name + "'"
        );
        return;
      }
      // If the place has a geometry, then present it on a map.
      if (placeResult.geometry.viewport) {
        this.map.fitBounds(placeResult.geometry.viewport);
      } else {
        this.map.setCenter(placeResult.geometry.location);
        this.map.setZoom(17); // Why 17? Because it looks good.
      }
    });
  }
}
</script>

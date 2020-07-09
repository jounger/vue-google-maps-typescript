<template>
  <div>
    <template v-if="Boolean(this.place) && Boolean(this.address)">
      <slot :place="place" :address="address" />
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { google } from "google-maps";

@Component
export default class GoogleMapAutocomplete extends Vue {
  @Prop() google!: google;
  @Prop() map!: google.maps.Map<HTMLDivElement>;
  @Prop() countries!: Array<string>;
  @Prop() input!: HTMLInputElement;

  place = null as google.maps.places.PlaceResult | null;
  address = "";

  mounted() {
    console.log("GoogleMapAutocomplete", this.input);
    const autocomplete = new this.google.maps.places.Autocomplete(this.input);
    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    if (this.countries && this.countries.length > 0) {
      autocomplete.setComponentRestrictions({ country: this.countries });
    }
    autocomplete.bindTo("bounds", this.map);
    // Set the data fields to return when the user selects a place.
    autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
    autocomplete.addListener("place_changed", () => {
      const placeResult = autocomplete.getPlace();
      if (!placeResult.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert(
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
      this.place = placeResult;

      if (placeResult.address_components) {
        this.address = [
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
      console.log("address", this.address);
    });
  }
}
</script>

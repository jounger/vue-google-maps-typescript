<template>
  <v-content>
    <v-card class="mx-auto my-5">
      <v-form action="#">
        <v-container>
          <input
            ref="inputAddress"
            id="place-input"
            type="text"
            placeholder="Enter a location"
          />
        </v-container>
      </v-form>
      <GoogleMapLoader :mapConfig="mapConfig">
        <template slot-scope="{ google, map }">
          <GoogleMapMarker
            v-for="(marker, index) in markers"
            :key="index"
            :marker="marker"
            :google="google"
            :map="map"
          />
          <GoogleMapAutocomplete
            :input="inputAddress"
            :countries="['vn']"
            :google="google"
            :map="map"
          >
            <template slot-scope="{ place, address }">
              <GoogleMapMarker
                :marker="getMarkerFromPlace(place, address)"
                :google="google"
                :map="map"
              />
            </template>
          </GoogleMapAutocomplete>
        </template>
      </GoogleMapLoader>
    </v-card>
  </v-content>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import { mapSettings } from "@/constants/mapSettings";
import GoogleMapMarker from "@/components/GoogleMapMarker.vue";
import FormValidate from "@/mixins/form-validate";
import GoogleMapAutocomplete from "@/components/GoogleMapAutocomplete.vue";

@Component({
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapAutocomplete
  },
  mixins: [FormValidate]
})
export default class Home extends Vue {
  @Ref() inputAddress!: HTMLInputElement;
  markers = [
    { position: { lat: 40.771, lng: -73.974 }, title: "SHit" },
    { position: { lat: 41.771, lng: -71.974 }, title: "SHit" }
  ];

  getMarkerFromPlace(place: google.maps.places.PlaceResult, adress: string) {
    console.log("getMarkerFromPlace");
    if (place && typeof place.geometry !== "undefined")
      return {
        position: place.geometry.location,
        title: adress,
        visible: true
      };
  }

  get mapConfig() {
    return {
      ...mapSettings,
      zoom: 5,
      center: this.markers[0].position
    };
  }
}
</script>

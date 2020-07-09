<template>
  <div>
    <div>
      <form action="#">
        <input
          ref="inputAddress1"
          class="place-input"
          type="text"
          placeholder="Enter a origin location"
        />
        <input
          ref="inputAddress2"
          class="place-input"
          type="text"
          placeholder="Enter a destination location"
        />
      </form>
      <!-- GOOGLE MAP WRAP -->
      <GoogleMapLoader :mapConfig="mapConfig">
        <template slot-scope="{ google, map }">
          <GoogleMapMarker
            v-for="(marker, index) in markers"
            :key="index"
            :marker="marker"
            :google="google"
            :map="map"
          />
          <!-- AUTOCOMPLETE ORIGIN GEOLOCATION -->
          <GoogleMapAutocomplete
            :place.sync="origin"
            :input="inputAddress1"
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
          <!-- AUTOCOMPLETE DESTINATION GEOLOCATION -->
          <GoogleMapAutocomplete
            :place.sync="destination"
            :input="inputAddress2"
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
          <!-- GENDER DIRECTION FROM 2 GEOLOCATIONS -->
          <GoogleMapDirection
            :router="getRouterFromTwoPlace(origin, destination)"
            :google="google"
            :map="map"
          />
        </template>
      </GoogleMapLoader>
      <small class="tag-module">#Map, #Autocomplete, #Marker, #Direction</small>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import { mapSettings } from "@/constants/mapSettings";
import GoogleMapMarker from "@/components/GoogleMapMarker.vue";
import FormValidate from "@/mixins/form-validate";
import GoogleMapAutocomplete from "@/components/GoogleMapAutocomplete.vue";
import GoogleMapDirection from "@/components/GoogleMapDirection.vue";

@Component({
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapAutocomplete,
    GoogleMapDirection
  },
  mixins: [FormValidate]
})
export default class Home extends Vue {
  @Ref() inputAddress1!: HTMLInputElement;
  @Ref() inputAddress2!: HTMLInputElement;
  origin = {} as google.maps.places.PlaceResult | null;
  destination = {} as google.maps.places.PlaceResult | null;
  travelMode: Array<string> = ["WALKING", "TRANSIT", "DRIVING"];
  markers = [
    {
      position: { lat: 21.039498, lng: 105.840441 },
      title: "Quan thanh, Ha Noi, Viet Nam"
    },
    {
      position: { lat: 21.028956, lng: 105.85137 },
      title: "Ho hoan kiem, Ha Noi, Viet Nam"
    }
  ];

  getMarkerFromPlace(place: google.maps.places.PlaceResult, adress: string) {
    if (place && typeof place.geometry !== "undefined")
      return {
        position: place.geometry.location,
        title: adress,
        visible: true
      } as google.maps.MarkerOptions;
  }

  getRouterFromTwoPlace(
    origin: google.maps.places.PlaceResult,
    destination: google.maps.places.PlaceResult
  ) {
    if (origin && destination) {
      const originGeo = origin.geometry as google.maps.places.PlaceGeometry;
      const destinationGeo = destination.geometry as google.maps.places.PlaceGeometry;
      if (
        originGeo &&
        destinationGeo &&
        originGeo.location &&
        destinationGeo.location
      ) {
        return {
          origin: originGeo.location,
          destination: destinationGeo.location,
          travelMode: this.travelMode[2] // DRIVING
        } as google.maps.DirectionsRequest;
      }
    }
  }

  get mapConfig() {
    return {
      ...mapSettings,
      zoom: 8,
      center: this.markers[0].position
    };
  }
}
</script>
<style lang="css">
.place-input {
  height: 30px;
  max-width: 330px;
  width: 100%;
  margin: 20px 10px;
}
.tag-module {
  color: blue;
  font-weight: bold;
  cursor: pointer;
  margin: 10px auto;
}
</style>

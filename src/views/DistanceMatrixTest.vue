<template>
  <div>
    <h2>Distance Matrix Test:</h2>
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
      <GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
        <template slot-scope="{ google, map }">
          <!-- AUTOCOMPLETE ORIGIN GEOLOCATION -->
          <GoogleMapAutocomplete
            :place.sync="origin"
            :input="inputAddress1"
            :countries="['vn']"
            :google="google"
            :map="map"
          >
          </GoogleMapAutocomplete>
          <!-- AUTOCOMPLETE DESTINATION GEOLOCATION -->
          <GoogleMapAutocomplete
            :place.sync="destination"
            :input="inputAddress2"
            :countries="['vn']"
            :google="google"
            :map="map"
          >
          </GoogleMapAutocomplete>
          <!-- GET DISTANCE MATRIX FROM MULTIPLE GEOLOCATIONS -->
          <GoogleMapDistanceMatrix
            :single="true"
            :routers="
              getRoutersFromMultiplePlaces([...origin], [...destination])
            "
            :google="google"
            :map="map"
          >
            <template slot-scope="{ distance }">
              {{ getValueFromResponse(distance, 0) }}
            </template>
          </GoogleMapDistanceMatrix>
        </template>
      </GoogleMapLoader>
      <small class="tag-module">#Map, #Autocomplete, #Marker, #Direction</small>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import { mapSettings, apiKey } from "@/constants/mapSettings";
import FormValidate from "@/mixins/form-validate";
import GoogleMapAutocomplete from "@/components/GoogleMapAutocomplete.vue";
import GoogleMapDistanceMatrix from "@/components/GoogleMapDistanceMatrix.vue";
import { isEmptyObject } from "@/utils/tool";
import { DistanceMatrix } from "@/models/distance-matrix";
import { GoogleMapConfig } from "@/models/map-config";

@Component({
  components: {
    GoogleMapLoader,
    GoogleMapAutocomplete,
    GoogleMapDistanceMatrix
  },
  mixins: [FormValidate]
})
export default class DistanceMatrixTest extends Vue {
  style = { width: "700px", height: "500px" };
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

  getLocationFromPlace(place: google.maps.places.PlaceResult) {
    const placeGeo = Object.assign({}, place)
      .geometry as google.maps.places.PlaceGeometry;
    if (placeGeo) return placeGeo.location;
  }

  getLocationFromPlaces(places: google.maps.places.PlaceResult[]) {
    return [...places]
      .filter((x: google.maps.places.PlaceResult) => !isEmptyObject(x))
      .map(place => this.getLocationFromPlace(place));
  }

  getRoutersFromMultiplePlaces(
    origins: google.maps.places.PlaceResult[],
    destinations: google.maps.places.PlaceResult[]
  ) {
    if (origins.length > 0 && destinations.length > 0) {
      const originsLocations = this.getLocationFromPlaces(origins);
      const destinationsLocations = this.getLocationFromPlaces(destinations);
      if (originsLocations.length > 0 && destinationsLocations.length > 0) {
        return {
          origins: originsLocations,
          destinations: destinationsLocations,
          travelMode: "DRIVING",
          unitSystem: 0,
          avoidHighways: false,
          avoidTolls: false
        } as google.maps.DistanceMatrixRequest;
      }
      return undefined;
    }
    return undefined;
  }

  getValueFromResponse(
    response: google.maps.DistanceMatrixResponse,
    index: number
  ) {
    return {
      originAddress: response.originAddresses[index],
      destinationAddress: response.destinationAddresses[index],
      distance: response.rows[index].elements[index].distance,
      duration: response.rows[index].elements[index].duration
    } as DistanceMatrix;
  }

  get mapConfig() {
    return {
      loaderOptions: {
        language: "vi",
        region: "VI",
        libraries: ["places", "drawing", "visualization", "geometry"]
      },
      mapOptions: {
        ...mapSettings,
        zoom: 8,
        center: this.markers[0].position
      }
    } as GoogleMapConfig;
  }
  get apiKey() {
    return apiKey;
  }
}
</script>
<style lang="css">
.place-input {
  height: 30px;
  max-width: 300px;
  width: 100%;
  margin: 10px;
}
.tag-module {
  color: blue;
  font-weight: bold;
  cursor: pointer;
  margin: 10px auto;
}
</style>

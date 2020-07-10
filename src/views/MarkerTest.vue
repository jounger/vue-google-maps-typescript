<template>
  <div>
    <h2>Marker Test:</h2>
    <div>
      <!-- GOOGLE MAP WRAP -->
      <GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
        <template slot-scope="{ google, map }">
          <!-- GOOGLE MAP MARKER -->
          <GoogleMapMarker
            v-for="(marker, index) in markers"
            :key="index"
            :marker="marker"
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
import { Component, Vue } from "vue-property-decorator";
import GoogleMapLoader from "@/components/GoogleMapLoader.vue";
import { mapSettings, apiKey } from "@/constants/mapSettings";
import GoogleMapMarker from "@/components/GoogleMapMarker.vue";
import FormValidate from "@/mixins/form-validate";
import { GoogleMapConfig } from "@/models/map-config";

@Component({
  components: {
    GoogleMapLoader,
    GoogleMapMarker
  },
  mixins: [FormValidate]
})
export default class MarkerTest extends Vue {
  style = { width: "700px", height: "500px" };
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

  get mapConfig() {
    return {
      loaderOptions: {
        language: "vi",
        region: "VI",
        libraries: ["places", "drawing", "visualization", "geometry"]
      },
      mapOptions: {
        ...mapSettings,
        zoom: 13,
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

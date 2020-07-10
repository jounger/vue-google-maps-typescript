# CONTRIBUTORS NEEDED!

My projects at work have also gradually migrated away from Google Maps (but still on Vue -- Vue's awesome!),
so there's less and less incentive to maintain.

If you have time to contribute to a rather frequently used library, feel free to make a PR!

What's urgently needed are:

1. Better automated tests
2. Better integration tests with the popular frameworks, especially Nuxt and Vue template
3. Better documentation (examples, recommendations)

The above three will go a long way to keeping the project maintainable and contributable, and will address many of the open issues.

# vue-google-maps-typescript

[![Build Status](https://travis-ci.org/xkjyeah/vue-google-maps-typescript.svg?branch=vue2)](https://travis-ci.org/xkjyeah/vue-google-maps-typescript)

## Installation

### With npm:
`
npm i vue-google-maps-typescript
`

### Manually

Just download `dist/vue-google-maps-typescript.js` file and include it from your HTML.

## Basic usage / Documentation

### Get an API key from Google

[Generating an Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Example:

#### Config GoogleMapLoader (Wrap):
- mapConfig: object -> example: { zoom: 0, center: { lat: 0, lng: 0 } };
- apiKey: string -> example: "AIzaSp...";
- style: object (optional) -> example: { width: "700px", height: "500px" };
```vue
<GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
</GoogleMapLoader>
```
#### Marker:
- markerOption: google.maps.MarkerOptions
- markers: google.maps.ReadonlyMarkerOptions[]
```vue
<GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
  <template slot-scope="{ google, map }">
    <!-- GOOGLE MAP MARKER -->
    <GoogleMapMarker
      v-for="(marker, index) in markers"
      :key="index"
      :marker="markerOption"
      :google="google"
      :map="map"
    />
  </template>
</GoogleMapLoader>
```
#### Autocomplete:
- inputAddress: @Ref (from input tag)
- origin: google.maps.places.PlaceResult (optional)
- markerOption: google.maps.MarkerOptions
```vue
<GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
  <template slot-scope="{ google, map }">
    <!-- AUTOCOMPLETE ORIGIN GEOLOCATION -->
    <GoogleMapAutocomplete
      :place.sync="origin"
      :input="inputAddress"
      :countries="['vn']"
      :google="google"
      :map="map"
    >
      <template slot-scope="{ place, address }">
        <GoogleMapMarker
          :marker="markerOption"
          :google="google"
          :map="map"
        />
      </template>
    </GoogleMapAutocomplete>
  </template>
</GoogleMapLoader>
```
#### Direction:
- directionsRequest: google.maps.DirectionsRequest ->
 example:{ origin: originLocation, destination: destinationLocation, travelMode: "DRIVING" }
 + originLocation: google.maps.places.PlaceGeometry
 + destinationLocation: google.maps.places.PlaceGeometry
```vue
<GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
  <template slot-scope="{ google, map }">
    <!-- GENDER DIRECTION FROM 2 GEOLOCATIONS -->
    <GoogleMapDirection
      :router="directionsRequest"
      :google="google"
      :map="map"
    />
  </template>
</GoogleMapLoader>

```
#### Distance Matrix:
- routersRequest: google.maps.DistanceMatrixRequest ->
 example:{ origins: originsLocations, destinations: destinationsLocations, travelMode: "DRIVING", unitSystem: 0, avoidHighways: false, avoidTolls: false }
 + originsLocations: google.maps.places.PlaceGeometry[]
 + destinationsLocations: google.maps.places.PlaceGeometry[]
```vue
<GoogleMapLoader :options="mapConfig" :apiKey="apiKey" :mapStyle="style">
  <template slot-scope="{ google, map }">
    <!-- GENDER DIRECTION FROM 2 GEOLOCATIONS -->
    <GoogleMapDistanceMatrix
      :single="true"
      :routers="routersRequest"
      :google="google"
      :map="map"
    >
      <template slot-scope="{ distance }">
        {{ distance }}
      </template>
    </GoogleMapDistanceMatrix>
  </template>
</GoogleMapLoader>

```

### Officially supported components:

The list of officially support components are:

- Marker
- Autocomplete
- Direction
- Distance Matrix

Improvements to the tests are welcome :)

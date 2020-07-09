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


### Manually

Just download `dist/vue-google-maps-typescript.js` file and include it from your HTML.

## Basic usage / Documentation

### Get an API key from Google

[Generating an Google Maps API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

### Example:


```
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
```

### Officially supported components:

The list of officially support components are:

- Marker
- Autocomplete
- Direction

Improvements to the tests are welcome :)

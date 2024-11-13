<template>
<div>
  <l-map
    ref="map"  
    :options="{scrollWheelZoom:true}"
    :zoom="zoom"  
    :maxZoom="maxZoom"
    :minZoom="minZoom"
    :center="mapCenter"
    :maxBounds="maxBounds"  
    id="map-container"
    style="width:100%;height:500px;border-radius:3px;z-index:1;" 
  >
      <l-tile-layer :url="tilesUrl" :attribution="tilesAttribution"></l-tile-layer>


      <v-marker-cluster ref="markerCluster" :options="clusterOptions">
        <template v-for="offer in $store.state.market.offers">
          <l-marker color="red" :icon="marker" 
                    v-if="offer.coordinates != null && offer.coordinates[0] != null"
                    :lat-lng="[offer.coordinates[1], offer.coordinates[0]]"
                    ref="marker" :key="offer._id">
              <l-popup :open="true" :width="300" :min-width="300" 
                        class="text-center" ref="popup" 
                        style="min-width:300px;">

                <v-carousel v-if="offer.gallery != null && offer.gallery[0] != null" :height="120" style="width:70%"
                            show-arrows-on-hover hide-delimiters class="mx-auto">
                  <v-carousel-item v-for="(image,i) in offer.gallery" :key="i">
                  <v-img class="col-offer-clickable"
                        :src="baseUrl() + image" :height="100" 
                        @click="showDialogOffer(offer)"></v-img>
                  </v-carousel-item>
                </v-carousel>
                

                <div style="font-weight:700; font-size:18px;" 
                    class=" font-main secondary--text">
                  <b>{{ offer.amountMony.toFixed(2) }} </b><small>{{ $store.state.app.monyUnity }}</small>
                  <span class="grey--text ml-2" style="font-weight:300;">
                    <small><i>~ {{ monyToEuro(offer.amountMony.toFixed(2)) }} {{ $store.state.app.deviseConversion }}</i></small>
                  </span>
                </div>

                <v-card-title class="px-0 pb-2 pt-0 font-main" 
                              style="font-size:18px; line-height:22px;">
                  {{ offer.title }}
                </v-card-title>

                <v-btn block color="primary"
                      elevation="0" @click="showDialogOffer(offer)"
                      class="mt-2">
                  Lire l'annonce
                </v-btn>
              </l-popup>
          </l-marker>
        </template>
      </v-marker-cluster>

      
      <template v-for="(city, ctKey) in cities">
        <l-marker color="red" :icon="markerCity" 
                  :lat-lng="[city.geo.latitude, city.geo.longitude]"
                  :draggable="false" 
                  :key="ctKey">
            <l-popup :open="true" :width="400" class="pa-4 text-center" ref="popup">
              <h1>{{ city.name }}</h1>
              <h3>{{ city.postalCodes[0].postalCode }}</h3>
              <v-btn block color="red darken-2" dark
                    elevation="0" @click="focusOnCity(city)"
                    class="mt-4">
                <v-icon small>mdi-magnify</v-icon> Rechercher ici
              </v-btn>
              <div class="text-left">
              <!-- LAT: {{ lat }}<br>LNG: {{ lng }} -->
              </div>
            </l-popup>
        </l-marker>
      </template>


      <l-marker color="red" :icon="markerMain" 
                :lat-lng="[lat, lng]"
                ref="rootMarker"
                draggable 
                @dragend="dragend"
                @drag="rootMarkerDrag" >
          <l-popup :open="true" :width="400" class="pa-4 text-center" ref="popup">
            <b>Déplacez l'icone<br>sur votre zone de recherche</b><br>
            {{ cityAddressPopup }}
            <v-btn block color="secondary"
                  elevation="0" @click="updateResults()"
                  class="mt-4">
              <v-icon small>mdi-refresh</v-icon> Actualiser les résultats
            </v-btn>
            <div class="text-left">
            <!-- LAT: {{ lat }}<br>LNG: {{ lng }} -->
            </div>
          </l-popup>
      </l-marker>


      <!-- MAIN CIRCLE TO SHOW ROOT RADIUS -->
      <l-circle :lat-lng="[lat, lng]" 
                :radius="rootCircle.radius"
                color="rgba(33, 150, 243, 0.5)"
                fill-color="rgba(33, 150, 243)"
                :fill-opacity=".15" ref="rootCircle">
      </l-circle>
      <!-- <l-rectangle :bounds="maxBounds" :lat-lng="[lat, lng]" 
                color="rgba(33, 150, 243, 0.5)"
                fill-color="rgba(33, 150, 243)"
                :fill-opacity=".35"></l-rectangle> -->

      <!-- <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-text-field dense outlined solo elevation="0" 
                        hide-details v-model="searchPlaceStr"
                        class="text-search-geo"
                        placeholder="Où recherchez-vous ?"
                        :loading="loadPlaces"
                        v-bind="attrs" v-on="on" 
                        @change="searchPlace()"
                        append-icon="mdi-magnify"
                        @click:append="searchPlace()"
                        style="z-index:1000; position:absolute; top:15px; right:70px;width: 230px;max-width:60%;">
          </v-text-field>
        </template>

        <ListNominatimResult :places="places" :loadPlaces="loadPlaces" :onclick="setNewCenter"/>
        
      </v-menu> -->

      <v-btn small class="d-md-none close-dialog-map" 
              fab style="z-index:1000;"
              @click="$root.$emit('closeDialogSearchGeo')">
        <v-icon small>mdi-close</v-icon>
      </v-btn>

      <v-btn color="secondary"
            elevation="0" @click="$root.$emit('fetchOffers')"
            class="mt-4 btn-tool-map tool-map2">
        <v-icon small>mdi-refresh</v-icon> Actualiser les résultats
      </v-btn>
      <v-btn elevation="0" @click="$root.$emit('closeDialogSearchGeo')"
            class="mt-4 btn-tool-map tool-map1">
        <v-icon small>mdi-format-list-checkbox</v-icon> Afficher les résultats
      </v-btn>

  </l-map>



  <v-slider v-model="rootRadius" 
            :min="1000" :max="100000" 
            @change="updateRadius"
            color="primary"
            inverse-label class="mt-5 slider-geo-block"
            :label="parseInt(rootRadius/1000)+' km'"
            :step="1000"
  >
      <template v-slot:prepend>
        <v-icon @click="decrement">mdi-minus</v-icon>
      </template>

      <template v-slot:append>
        <v-icon @click="increment">mdi-plus</v-icon>
      </template>
  </v-slider>

</div>
</template>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

.close-dialog-map{
  position: absolute;
  right:15px;
  top: 15px;
}
.btn-tool-map{
  display:none;
}
.dialogSearchGeo .btn-tool-map{
  display:unset;
  position:fixed; 
  z-index:1000; 
  left: 6%; 
  right:6%; 
  width:88%;
}
.dialogSearchGeo .btn-tool-map.tool-map1{
  bottom:85px;
}
.dialogSearchGeo .btn-tool-map.tool-map2{
  bottom:40px;
}

.dialogSearchGeo .slider-geo-block{
  position: fixed;
  bottom: 130px;
  z-index: 1000;
  background-color: #f5f5f5e3;
  color: black;
  height: 40px;
  left: 6%;
  right: 6%;
  border-radius: 4px;
  padding-top: 3px;
}

.theme--dark .dialogSearchGeo .slider-geo-block{
  background-color: #1f1e1ee3;
}

@media (min-width: 960px) {
  .text-search-geo{
    right:15px !important;
  }
}
</style>


<script>

//import axios from "axios"
import core from '../../plugins/core.js'
const config = require('../../config/' + process.env.NODE_ENV)

import L from 'leaflet';
import {LMap, LTileLayer, LMarker, LCircle, LRectangle, LPopup} from 'vue2-leaflet'
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
import ListNominatimResult from '@/components/offer/ListNominatimResult.vue'

import nominatim from '../../services/nominatim.js'

import citiesJson from '../../datas/cities_nc.json'



export default {
  name: 'home',
  components: {
    LMap, LTileLayer, LMarker, LCircle, LRectangle, LPopup, ListNominatimResult,
    'v-marker-cluster' : Vue2LeafletMarkerCluster,
  },
  props: [''],
  data: () => ({
    search: "",
    results: 0,
    showMap: false,

    city: "",
    address: "",
    lat: -22.268764039073968, 
    lng: 166.45385742187503,

    maxBounds: L.latLngBounds(config.mapMaxBounds),

    rootMarker: {
      lat: -22.268764039073968,
      lng: 166.45385742187503,
    },
    rootCircle: {
      radius: 10000
    },
    rootRadius: 10000,

    loadPlaces: false,
    places: null,
    cityAddressPopup: "",

    zoom:8,
    maxZoom: 14,
    minZoom: 8,
    mapCenter: L.latLng(-22.268764039073968, 166.45385742187503),

    tilesUrl : config.mapTilesUrl,
    tilesAttribution:'', //&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',

    tilesRoadUrl : config.mapTilesRoadUrl,

    popupContent: "ok",

    clusterOptions:  { showCoverageOnHover: false, maxClusterRadius: 30 },
    searchPlaceStr: ""
  }),
  mounted: async function(){
    //if(this.$store.state.auth.user != null)
    this.init(this.$store.state.auth.user)

    this.$root.$off('invalidateSizeSearchGeoBlock').$on('invalidateSizeSearchGeoBlock', () => { 
      //console.log("on invalidateSizeSearchGeoBlock")
      this.invalidateSize()
    })

    console.log("cities", this.cities)

  },
  methods: {
    async init(user){ //init est appelé par un watcher qui attend que le user soit chargé
      console.log("init SEARCHGEOBLOCK")
      if(user.city != null) this.city = user.city
      if(user.address != null ) this.address = user.address

      if(this.$store.state.market.requestParams.coordinates != null){
        //console.log("get coordinate from requestParams")
        this.lat = this.$store.state.market.requestParams.coordinates[0]
        this.lng = this.$store.state.market.requestParams.coordinates[1]
      }
      if(user.coordinates != null && user.coordinates != "") {
        //console.log("get coordinate from user")
        this.lat = user.coordinates[0]
        this.lng = user.coordinates[1]
      }
      this.mapCenter = L.latLng(this.lat, this.lng)
      this.showMap = true
      this.invalidateSize()

      this.saveAddress()
    },
    async saveAddress(){
      console.log("coors", this.lat, this.lng)
      this.$root.$emit("onChangeSearchGeo", { coordinates: [this.lat, this.lng], 
                                              radius: this.rootRadius, 
                                              fetch: true })
    },
    searchPlace: async function(){
      let query = this.searchPlaceStr + " FR"
      this.loadPlaces = true
      this.places = []
      this.showMap = true
      this.invalidateSize()
      nominatim.search(query, (res)=>{
        this.loadPlaces = false
        if(res.error == false){
          this.places = res.data
          this.setNewCenter(this.places[0].lat, this.places[0].lng)
        }
      })
    },
    focusOnCity(city){
      this.setNewCenter(city.geo.latitude, city.geo.longitude)
      this.$refs.rootMarker.mapObject.closePopup()
      this.$root.$emit('fetchOffers')
    },
    setNewCenter: function(lat, lng){
      //console.log("setNewCenter", lat, lng)
      this.$refs.map.mapObject.invalidateSize();

      lat = parseFloat(lat)
      lng = parseFloat(lng)
      this.mapCenter = [lat, lng]
      this.lat = lat
      this.lng = lng
      this.updateRadius()
      //this.zoom = 14
      
      setTimeout(() => {
        this.$refs.map.mapObject.invalidateSize()
      }, 100)
      setTimeout(() => {
        //this.$refs.marker.mapObject.openPopup()
        this.$refs.map.mapObject.invalidateSize()
      }, 500)
      
    },
    updateResults(){
      this.$root.$emit('fetchOffers')
      this.$refs.rootMarker.mapObject.closePopup()
    },
    dragend(e){ 
      e.target.openPopup()
      this.lat = e.target.getLatLng().lat
      this.lng = e.target.getLatLng().lng

      this.saveAddress()
    },
    rootMarkerDrag: function(){
      this.lat = this.$refs.rootMarker.mapObject._latlng.lat
      this.lng = this.$refs.rootMarker.mapObject._latlng.lng
    },
    invalidateSize(){ 
        setTimeout(() => { 
          this.$refs.map.mapObject.invalidateSize()
          this.$refs.rootMarker.mapObject.openPopup()
        }, 400) 
    },

    decrement: function(){
      if(this.rootRadius <= 1000) return
      this.rootRadius -= 1000
      this.updateRadius()
    },
    increment: function(){
      this.rootRadius += 1000
      this.updateRadius()
    },
    updateRadius: async function(){
      this.rootCircle.radius = this.rootRadius
      var tCircle = L.circle(L.latLng(this.lat, this.lng), { radius: this.rootCircle.radius })
      tCircle.addTo(this.$refs.map.mapObject)
      this.$refs.map.mapObject.fitBounds(tCircle.getBounds())
      tCircle.remove()
      this.$refs.rootMarker.mapObject.openPopup()
      this.$root.$emit("onChangeSearchGeo", { coordinates: [this.lat, this.lng], radius: this.rootRadius })
    },
    monyToEuro(amount){ return amount * config.monyToEuro },
    nl2br: function(str, is_xhtml){
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'
      let newStr = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
      let maxLength = 40
      let p = newStr.length > maxLength ? '...' : ''
      newStr = newStr.substr(0, maxLength) + p
      return newStr
    },
    showDialogOffer(offer) { 
      this.$root.$emit("openDialogOffer", offer)
    },
    baseUrl(){ return core.baseUrl() },
  },
  computed: {
    markerMain(){ 
      let color = "red"
      return L.icon({
        iconUrl: '/map/'+color+'_2.svg',
        shadowUrl: '/marker/marker-shadow.png',
        iconSize: [32, 52],
        iconAnchor: [16, 50],
        popupAnchor: [0, -43],
        shadowSize: [50, 50]
      });
    },
    markerCity(){ 
      let color = "red"
      return L.icon({
        iconUrl: '/map/'+color+'_3.svg',
        shadowUrl: '/marker/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [7, 35],
        shadowAnchor: [5, 41],
        popupAnchor: [1, -34],
        shadowSize: [0, 0]
      });
    },
    marker(){ 
      let color = "blue"
      return L.icon({
        iconUrl: '/map/'+color+'_4.svg',
        shadowUrl: '/marker/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        shadowAnchor: [5, 41],
        popupAnchor: [1, -35],
        shadowSize: [20, 41]
      });
    },
    cities(){ return citiesJson }
  },
  
  watch: {
    
      '$store.state.market.requestParams.coordinates': { immediate: true, 
          async handler () {
            // if(this.$store.state.market.requestParams.coordinates == null) return
            // let lat = this.$store.state.market.requestParams.coordinates[0]
            // let lng = this.$store.state.market.requestParams.coordinates[1]
            // this.setNewCenter(lat, lng)
          }
      },
      '$store.state.auth.user._id': { immediate: true, 
          async handler () {
              
            if(this.$store.state.auth.isLogin){
              console.log("user logged !", this.$store.state.auth.user)
              this.init(this.$store.state.auth.user)
            }
          }
      },
  }, 
}
</script>
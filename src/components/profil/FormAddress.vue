<template>
<v-row>

  <v-col cols="12" class="mt-0">
    <template v-for="(city, c) in cities">
      <v-btn :key="c" small color="red" class="ma-1" elevation="0" dark rounded
              @click="openMapOnCity(city)">
        <v-icon small>mdi-map-marker</v-icon> {{ city.name }}
      </v-btn>
    </template>
    
  </v-col>
  
  <v-col cols="12" class="pa-0 mt-0">

    <!-- <v-text-field outlined dense hide-details class="mb-3"
                  color="primary" label="Ville / Code postal"
                  v-model="city">
    </v-text-field>
    <v-text-field outlined dense @keyup.enter="searchPlace()" hide-details class="mb-3"
                  color="primary" label="Complément d'adresse"
                  v-model="address">
    </v-text-field> -->

    <v-menu offset-y v-if="false">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block color="primary" outlined elevation="0" :loading="loadPlaces"
              v-bind="attrs" v-on="on"  @click="searchPlace()">
          <v-icon>mdi-magnify</v-icon> Rechercher
        </v-btn>
      </template>
      <v-list style="margin:-5px; box-shadow:none;">
        <v-list-item-group  color="primary" > 

          <v-list-item color="primary"
              v-for="(place, i) in places"
              :key="i"
              @click="setNewCenter(place.lat, place.lng, place.text)"
          >
              <v-list-item-content>
                <v-list-item-title>
                  <v-icon>mdi-map-marker</v-icon> 
                  {{ place.text }}
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>

          <v-list-item v-if="places.length == 0">
            <v-list-item-content>
              <v-list-item-title v-if="loadPlaces">
                <v-icon>mdi-map-marker</v-icon>  Recherche en cours
              </v-list-item-title>
              <v-list-item-title v-else>
                <v-icon>mdi-ban</v-icon>  Aucun résultat
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-menu>

    <v-card v-show="showMap" 
            elevation="0" class="mt-3"  color="transparent"
            style="" id="form-map-container">
      <l-map
        ref="map"  
        :options="{scrollWheelZoom:true}"
        :zoom="zoom"  
        :maxZoom="11"
        :minZoom="8"
        :center="mapCenter"
        :maxBounds="maxBounds"
        id="map-container"
        style="width:100%;height:390px;" 
      >
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          
            <l-marker color="red" :icon="marker"
                      :lat-lng="mapCenter"
                      ref="marker"
                      draggable @dragend="dragend">
                <l-popup :open="true" :width="400" class="pa-4" ref="popup">
                  <b>Déplacez l'icone pour plus de précision</b><br>
                  {{ cityAddressPopup }}
                  <v-btn dark block color="green" v-if="!addressSaved"
                        elevation="0" @click="saveAddress()"
                        class="mt-4">
                    <v-icon>mdi-check</v-icon> Valider cette position
                  </v-btn>
                </l-popup>
            </l-marker>
      </l-map>

      <v-alert class="mt-3" dense type="success" v-if="addressSaved">Position validée</v-alert>
      <v-alert class="mt-3" dense type="info" v-if="!addressSaved">La position a changé</v-alert>

      <v-btn block dark color="green" outlined v-if="!addressSaved"
            elevation="0" @click="saveAddress()"
            class="mt-4">
        <v-icon>mdi-check</v-icon> Valider cette position
      </v-btn>
    </v-card>

    
  </v-col>
</v-row>
</template>

<style>
  @import "~leaflet/dist/leaflet.css";
  #map-container{
    z-index: 0;
  }
</style>

<script>

import axios from "axios"
// import core from '../../plugins/core.js'
const config = require('../../config/' + process.env.NODE_ENV)

import L from 'leaflet';
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet'

import nominatim from '../../services/nominatim.js'
import citiesJson from '../../datas/cities_nc.json'

export default {
  name: 'home',
  components: {
    LMap, LTileLayer, LMarker, LPopup
  },
  props: ['mustSaveAddress', 'changeAddress'],
  data: () => ({
    search: "",
    results: 0,
    showMap: false,

    city: "",
    address: "",
    lat: 0, 
    lng: 0,
    maxBounds: L.latLngBounds(config.mapMaxBounds),

    loadPlaces: false,
    places: [],
    cityAddressPopup: "",

    zoom:11,
    mapCenter: L.latLng(-22.268764039073968, 166.45385742187503),
    url : config.mapTilesUrl,
    attribution:'', //&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    popupContent: "ok",

    addressSaved: false
  }),
  mounted: async function(){
    
    this.$root.$off('setAddress').$on('setAddress', (address) => { 
      this.init(address)
    })

    this.init(this.$store.state.auth.user)

  },
  methods: {
    async init(address){ //init est appelé par un watcher qui attend que le user soit chargé
        
      if(address.city != null) this.city = address.city
      if(address.address != null ) this.address = address.address
      if(address.coordinates != null && address.coordinates != "") {
        this.lat = address.coordinates[0]
        this.lng = address.coordinates[1]
        this.mapCenter = L.latLng(this.lat, this.lng)
        this.showMap = true
        this.invalidateSize()
      }

      //envoi le signal vers le parent, pour donner les valeur initiales, sans validation de l'addresse onclick
      if(this.mustSaveAddress == false && this.lat != 0)
        this.changeAddress({  city: this.city,
                              address: this.address,
                              lat: this.lat,
                              lng: this.lng
                            })

      this.invalidateSize()
      this.addressSaved = true
    },
    async saveAddress(){
      let params = {
        city: this.city,
        address: this.address,
        lat: this.lat,
        lng: this.lng
      }

      if(this.mustSaveAddress == false){
        this.changeAddress(params)
        this.addressSaved = true
        return
      }

      this.addressSaved = false
      const { data } = await axios.post('user/set-addresse', params)
      if(!data.error){
        this.$store.dispatch('auth/refreshUserData')
        this.addressSaved = true
      }else{
        console.log("error creating offer", data)
      }
    },
    searchPlace: async function(){
      let query = this.city + " " + this.address
      this.loadPlaces = true
      this.places = []
      this.showMap = true
      this.invalidateSize()
      nominatim.search(query, (res)=>{
        this.loadPlaces = false
        if(res.error == false){
          this.places = res.data
          this.setNewCenter(this.places[0].lat, this.places[0].lng, this.places[0].text)
          this.addressSaved = false
        }
      })
    },
    setNewCenter: function(lat, lng, cityAddress){
        
      this.$refs.map.mapObject.invalidateSize();

      lat = parseFloat(lat)
      lng = parseFloat(lng)
      this.mapCenter = [lat, lng]
      this.lat = lat
      this.lng = lng
      this.cityAddressPopup = cityAddress
      //this.zoom = 14
      
      setTimeout(() => {
        this.$refs.map.mapObject.invalidateSize()
      }, 100)
      setTimeout(() => {
        this.$refs.marker.mapObject.openPopup()
        this.$refs.map.mapObject.invalidateSize()
      }, 500)
      
    },
    openMapOnCity(city){
      console.log("openMapOnCity", city)
      this.city = city.name
      this.lat = city.geo.latitude
      this.lng = city.geo.longitude
      this.mapCenter = L.latLng(this.lat, this.lng)
      this.showMap = true
      this.invalidateSize()

      //envoi le signal vers le parent, pour donner les valeur initiales, sans validation de l'addresse onclick
      if(this.mustSaveAddress == false && this.lat != 0)
        this.changeAddress({  city: this.city,
                              address: this.address,
                              lat: this.lat,
                              lng: this.lng
                            })

      this.addressSaved = false
      setTimeout(() => {
        this.$refs.marker.mapObject.openPopup()
        this.$refs.map.mapObject.invalidateSize()
      }, 500)
    },
    scrollToId: function(id){
      setTimeout(() => {
        this.$vuetify.goTo('#' + id)
      }, 500)
    },
    dragend(e){ 
      e.target.openPopup()
      this.lat = e.target.getLatLng().lat
      this.lng = e.target.getLatLng().lng

      this.addressSaved = false
      if(this.mustSaveAddress == false)
        this.emitChangeAddresse()

      this.$refs.marker.mapObject.openPopup()
      //console.log("dragend", e.target.getLatLng())
    },
    invalidateSize(){ 
        setTimeout(() => { this.$refs.map.mapObject.invalidateSize() }, 100) 
    },

    emitChangeAddresse(){
      this.changeAddress({
        city: this.city,
        address: this.address,
        lat: this.lat,
        lng: this.lng
      })
      this.addressSaved = true
    }
  },
  computed: {
    marker(){ 
      let color = "red"
      return L.icon({
        iconUrl: '/map/'+color+'_2.svg',
        shadowUrl: '/marker/marker-shadow.png',
        iconSize: [32, 50],
        iconAnchor: [16, 50],
        popupAnchor: [0, -50],
        shadowSize: [50, 50]
      });
    },
    cities(){ return citiesJson }
  },
  
  watch: {
    // '$store.state.auth.user._id': { immediate: true, 
    //     async handler () {
    //       if(this.$route.name != "edit-offer")
    //         this.init(this.$store.state.auth.user)
    //     }
    // },
  }, 
}
</script>
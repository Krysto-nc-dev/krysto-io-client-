<template>
<div>
  <v-col cols="12" sm="11" md="8" lg="6" class="mx-auto mt-5">

    <div class="mb-2 px-3"><b><v-icon>mdi-chevron-down</v-icon> Sélectionnez le type de votre annonce</b></div>

    <v-row class="mb-5">
      <v-col cols="6">
        <v-btn block :outlined="offerType != 'OFFER'" 
                @click="offerType = 'OFFER'" dark
                color="primary" elevation="0">Je vends</v-btn>
      </v-col>
      
      <v-col cols="6">
        <v-btn block :outlined="offerType != 'DEMANDE'"
                @click="offerType = 'DEMANDE'" dark
                color="teal" elevation="0">Je recherche</v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-col cols="12" class="mt-2">
      <div class="pt-5">
        <b><v-icon>mdi-chevron-down</v-icon> Sélectionnez une catégorie</b>
      </div>
    </v-col>
    <v-select outlined label="Sélectionnez une catégorie"
              :items="$store.state.app.data.offerCategory"
              item-text="name" item-value="_id"
              v-model="category" :error-messages="formError.category">
    </v-select>


    <div class="mt-5 mb-2 pt-5">
      <b>
      <v-icon>mdi-chevron-down</v-icon> 
      Rédigez votre annonce 
      (<template v-if="offerType == 'OFFER'">offre</template><template v-else>demande</template>)
      </b>
    </div>

    <v-text-field outlined label="Titre de l'annonce" v-model="title"
                  :error-messages="formError.title">
    </v-text-field>



    <v-textarea outlined label="Texte de l'annonce" 
                height="210" spellcheck="false"
                v-model="text" :error-messages="formError.text">
    </v-textarea>



    <v-col cols="12" class="mt-5">
      <div class="pt-5">
        <b>
          <v-icon>mdi-chevron-down</v-icon>  
          <v-icon>mdi-cash</v-icon> Indiquez le prix de votre annonce
        </b>
      </div>
    </v-col>

    <v-text-field outlined rounded :value="amountMony" 
                  :error-messages="formError.price"
                  class="textarea-amountMony mb-2"
                  :suffix="$store.state.app.monyUnity" color="secondary"
                  :label="'Prix en ' + $store.state.app.monyUnity"
                  @keydown="keydownAmount"
                  v-model="amountMony"
                  :prefix="monyToEuro()">
    </v-text-field>


    <v-row class="mb-4 mx-0">
      <template v-for="i in [1,2,3,4,5,6,7,8,9]">
        <v-col cols="4" :key="i" class="pa-1" @click="addNumToAmount(i)">
          <v-btn block outlined color="secondary" class="btn-keyboard">{{ i }}</v-btn>
        </v-col>
      </template>

      <v-col cols="4" class="pa-1" @click="addNumToAmount(0)">
        <v-btn block outlined color="secondary" class="btn-keyboard">0</v-btn>
      </v-col>
      <v-col cols="4" class="pa-1">
        <v-btn block outlined color="grey" @click="addNumToAmount('.')" class="btn-keyboard">.</v-btn>
      </v-col>
      <v-col cols="4" class="pa-1">
        <v-btn block outlined color="grey" @click="removeNumToAmount()" class="btn-keyboard">
          <v-icon>mdi-backspace-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>


    <v-col cols="12" class="mt-5">
      <div class="pt-5">
        <b><v-icon>mdi-chevron-down</v-icon> <v-icon>mdi-image</v-icon> Ajouter des photos</b>
      </div>
    </v-col>

    <UploaderImageMulti v-if="$route.name != 'edit-offer' || attr.value != undefined" 
                        :attr="attr" :entityId="entityId">
    </UploaderImageMulti>

    <v-col cols="12" class="mt-5">

      <div class="mb-2 pt-5 pb-4">
        <b><v-icon>mdi-chevron-down</v-icon> <v-icon>mdi-map-marker</v-icon> Localisez votre annonce</b>
      </div>

      <FormAddress :mustSaveAddress="false" :changeAddress="changeAddress"></FormAddress>

    </v-col>
    <br>
    <v-divider></v-divider>
    <br>


    <v-row>
    <v-toolbar elevation="0" color="transparent" class="mt-4">
      <v-spacer></v-spacer>
      <v-btn class="mr-2" text to="/market">
        <v-icon small>mdi-cancel</v-icon> Annuler
      </v-btn>
      <v-btn color="primary" outlined class="mr-2  d-none d-md-inline" elevation="0" @click="saveOffer('EDIT')">
        <v-icon small>mdi-content-save-edit-outline</v-icon> Enregistrer en brouillon
      </v-btn>
      <v-btn color="green" :dark="formCompleted" elevation="0" 
             :disabled="!formCompleted" @click="saveOffer('OPEN')">
        <v-icon small>mdi-send</v-icon> Publier maintenant
      </v-btn>
    </v-toolbar>
    </v-row>

    <br><br>
  </v-col>
</div>
</template>

<style>
  @import "~leaflet/dist/leaflet.css";
  
  .btn-keyboard{
    height:36px !important;
    font-size: 23px !important;
  }
  #map-container{
    z-index: 0;
  }
  
</style>

<script>

import axios from "axios"

// import { i18n } from 'vue-lang-router';
//import core from '../../plugins/core.js'
import FormAddress from '@/components/profil/FormAddress.vue'

import UploaderImageMulti from '@/components/offer/UploaderImageMulti.vue'
const config = require('../../config/' + process.env.NODE_ENV)

import L from 'leaflet';
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet'

export default {
  name: 'home',
  components: {
    UploaderImageMulti, LMap, LTileLayer, LMarker, LPopup, FormAddress
  },
  data: () => ({
    openDialogOffer: false,
    attr: { name: 'gallery',
            label: '+ Ajouter des photos' },

    formError: {
      'category': '',
      'title': '',
      'text': '',
      'price': '',
      'address': '',
    },

    oldAmount: "",

    zoom:8,
    mapCenter: L.latLng(47.413220, -1.219482),
    url : config.mapTilesUrl,
    attribution:'', //&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    popupContent: "ok",

    entityId: null,
    offerType: 'OFFER',
    title: "",
    category: null,
    text: "",
    amountMony: "",
    city: "",
    address: "",
    lat: 0, 
    lng: 0,

    offerCreatedId: null
  }),
  mounted: async function(){

      this.$store.dispatch('app/incStat', '/pusblish-offer')

      if(this.$store.state.auth.isLogin && (!this.$store.state.auth.user.isActive || !this.$store.state.auth.user.planPaid)) 
          this.$router.push("/market")

      this.$store.dispatch('app/fetchEntities', { entityType: 'offerCategory' })

      if(this.$route.name == 'edit-offer')
        await this.initEdit()

      this.$root.$off('onImgLoaded').$on('onImgLoaded', (params) => { 
        console.log("onImgLoaded", params)
        this.$store.dispatch('auth/refreshUserData')
        this.$router.push("/offer/" + this.offerCreatedId)
      })

  },
  methods: {
    async initEdit(){
      const query = { _id: this.$route.params.offerId }
      const { data } = await axios.post('/data/query-entities', { entityType: "offer", 
                                                                  limit: 1, 
                                                                  query: query })
      if(data.error == false){
        console.log("success", data)
        if(data.entities[0] != null){
          const e = data.entities[0]

          this.entityId = e._id
          this.offerType = e.type
          this.title = e.title
          this.category = e.category
          this.text = e.text
          this.amountMony = e.amountMony
          this.city = e.city
          this.address = e.address
          this.lat = e.coordinates[0]
          this.lng = e.coordinates[1]

          this.$root.$emit("setAddress", {
            city: e.city,
            address: e.address,
            coordinates: e.coordinates,
          })

          this.attr.value = e.gallery

        }
      }else{
        console.log("error", data)
      }
    },
    changeAddress(params){
        //console.log("onChangeAddress", params)
        this.city = params.city
        this.address = params.address
        this.lat = params.lat
        this.lng = params.lng
    },
    async saveOffer(status){
      let params = {
        type: this.offerType,
        title: this.title,
        category: this.category,
        text: this.text,
        amountMony: this.amountMony,
        city: this.city,
        address: this.address,
        lat: this.lat,
        lng: this.lng,
        status: status
      }
      console.log("saveOffer", params)

      if(this.title == '')      this.formError.title    = 'Titre obligatoire'
      if(this.text == '')       this.formError.text     = 'Text de l\'annonce obligatoire'
      if(this.category == null) this.formError.category = 'Merci de sélectionner une catégorie'
      if(this.amountMony == '') this.formError.price    = 'Merci d\'indiquer le prix de votre annonce'
      if(this.lat == 0)         this.formError.address  = 'Merci d\'indiquer une adresse'

      let url = 'market/create-offer'

      if(this.$route.name == 'edit-offer'){
        params.id = this.entityId
        url = 'market/edit-offer'
      }

      const { data } = await axios.post(url, params)
      if(!data.error){
        console.log("ok create offer", data)
        this.offerCreatedId = data.offer._id
        this.$root.$emit('startUploadFiles', data.offer._id)
      }else{
        console.log("error creating offer", data)
      }
    },

    addNumToAmount(num){
      if(num == "." && this.amountMony.indexOf(num) >= 0) return
      //si le montant tapé fait déjà 4 caractère 
      if(this.amountMony.length >= 4 &&  this.amountMony.indexOf(".") == -1) return
      //si le nombre de chiffre apres la virgule est déjà de 4
      if(this.amountMony.length >= 4 
      && this.amountMony.indexOf(".") > 0
      && this.amountMony.length >= parseFloat(this.amountMony).toFixed(4).length)  return
      
      this.amountMony = this.amountMony + "" + num
    },
    removeNumToAmount(){
      this.amountMony = this.amountMony.substr(0, this.amountMony.length-1)
    },
    keydownAmount(event){
      if(event.key.length > 1 || this.amountMony == null) return

      //transforme le "0" en chaine vide, sauf si on rajoute un point
      if(this.amountMony == "0" && event.key != ".") this.amountMony = ""
      
      //si le montant tapé fait déjà 4 caractère 
      if(this.amountMony.length >= 4 &&  this.amountMony.indexOf(".") == -1) 
        event.preventDefault()

      //si le nombre de chiffre apres la virgule est déjà de 4
      if(this.amountMony.length >= 4 
      && this.amountMony.indexOf(".") > 0
      && this.amountMony.length >= parseFloat(this.amountMony).toFixed(4).length) 
        event.preventDefault()

      let ascii = event.key.charCodeAt(0)
      if((ascii < 48 || ascii > 57) //si ce n'est pas un nombre
      && (event.key != "." || this.amountMony.indexOf(".") > -1) //et que ce n'est pas un point, ni un 2eme point
      ) {
          event.preventDefault() //annule la frappe au clavier
      }
    },
    monyToEuro(){ 
      if(this.amountMony == "") return
        return "~" + (parseFloat(this.amountMony) * config.monyToEuro).toFixed(2) + this.$store.state.app.deviseConversion
    },
  },
  
  computed: {
    formCompleted: function(){
      let completed = true 
      if(this.category == null) completed = false 
      if(this.title == "")      completed = false 
      if(this.text == "")       completed = false 
      if(this.amountMony == "") completed = false 
      if(this.lat == 0)    completed = false 

      return completed
    }
  },
  watch: {
      
  }, 
}
</script>

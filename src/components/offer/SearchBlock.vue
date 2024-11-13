<template>
<div>

  <!-- <v-btn text block color="orange" elevation="0" to="/publish-offer" class="d-md-none">
    <v-icon small>mdi-pencil</v-icon> Publier une annonce
  </v-btn> -->
  
  <div class="mt-3 d-none d-md-inline-block"><v-icon>mdi-chevron-down</v-icon> Recherche</div>

  <v-tabs fixed-tabs height="35" 
        class="mt-5 mb-3 d-md-none"
        color="secondary"
        show-arrows
        hide-slider
        align-with-title>
    <v-tab :class="$store.state.market.requestParams.offerType=='OFFER' ? 'light-blue--text' : 'grey--text'"
            title="Afficher les annonces à vendre" 
            @click="setTypeSearch('OFFER')">Les offres</v-tab>

    <v-tab :class="$store.state.market.requestParams.offerType=='DEMANDE' ? 'light-blue--text' : 'grey--text'" 
            title="Afficher les annonces de recherche"
            @click="setTypeSearch('DEMANDE')">Les demandes</v-tab>
  </v-tabs>
  
  <v-row class="mt-2">
    <v-col cols="6" class="pr-1">
      <v-text-field v-model.number="amountMin" dense outlined class="" type="number" @keydown="keydownAmountMin"
                  placeholder="Prix min" label="Prix min" :suffix="$store.state.app.monyUnity" clearable hide-details>
      </v-text-field>
    </v-col>
    <v-col cols="6" class="pl-1">
      <v-text-field v-model.number="amountMax" dense outlined class="" hide-details type="number" @keydown="keydownAmountMax"
                  :rules="[() => amountMax > amountMin  || 'Le prix max doit être suppérieur au prix min']"
                  placeholder="Prix max" label="Prix max" :suffix="$store.state.app.monyUnity" clearable>
      </v-text-field>
    </v-col>
  </v-row>

  <v-btn block text class="mt-5 d-md-none" outlined @click="showPopupCategory = true">
    <v-icon small>mdi-format-list-checkbox</v-icon> Sélectionner une catégorie
  </v-btn>

  <div class="mt-5 pa-0 d-none d-md-inline"   max-width="300"><br>
    <v-checkbox class="d-inline-flex ml-2" label="Catégories" color="indigo"
                @click="categoryId = null; fetchOffers()" :value="categoryId != null" 
                hide-details/>
    <v-card style="background-color:transparent" outlined class="overflow-y-auto px-3 mt-2" 
            :max-height="$vuetify.breakpoint.height - 300"  :max-width="300">
      <v-list class="" dense color="transparent" rounded>
        <v-list-item-group v-model="categoryId" @change="fetchOffers()">
          <v-list-item  v-for="(category, c) in $store.state.app.data.offerCategory" style="font-size:14px; min-height:30px;"
                        :color="categoryId == category._id ? 'indigo' : ''" :value="category._id" :key="c">
            {{ category.name }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>

  <template v-if="$vuetify.breakpoint.width < 960">
    <v-btn color="primary" text block @click="openDialogGeoSearch" outlined class="mt-3">
      <v-icon small>mdi-map-marker</v-icon> Zone de recherche
    </v-btn>
    <v-dialog v-model="showDialogGeoSearch" transition="dialog-bottom-transition"
        max-width="800" :fullscreen="$vuetify.breakpoint.width < 960"
        content-class="dialog-no-bordered dialogSearchGeo">
      <SearchGeoBlock></SearchGeoBlock>
    </v-dialog>
  </template>


  <v-dialog v-model="showPopupCategory" transition="dialog-bottom-transition" :overflowed="true"
            max-width="400" min-width="400" :fullscreen="$vuetify.breakpoint.width < 600"
            content-class="dialog-no-bordered">
    <v-card id="dialog-send-mony">
      <v-toolbar elevation="0">
        <b><v-icon small class="mr-1">mdi-chevron-down</v-icon> Sélectionnez une catégorie</b>
        <v-spacer/>
        <v-btn small outlined fab @click="showPopupCategory = false"><v-icon small>mdi-close</v-icon></v-btn>
      </v-toolbar>
      <v-divider/>
      <v-col cols="12" class="px-5">
        <v-btn small class="d-inline-flex mt-5" block outlined color=""
                @click="selectCategoryPopup(null)" 
                hide-details>
                <v-icon small>mdi-close</v-icon>
                Aucune catégorie
        </v-btn>

        <v-list class="mt-5" color="transparent" rounded>
          <v-list-item-group v-model="categoryId" @change="fetchOffers()">
            <v-list-item  v-for="(category, c) in $store.state.app.data.offerCategory" 
                          style="font-size:15px; min-height:40px;"
                          @click="selectCategoryPopup(category._id)"
                          :color="categoryId == category._id ? 'indigo' : ''" :value="category._id" :key="c">
              {{ category.name }}
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <!-- <v-list class="" dense rounded>
          <template v-for="(category, c) in $store.state.app.data.offerCategory">
            <v-list-item  :key="c" 
                          @click="selectCategoryPopup(category._id)"
                          :color="categoryId == category._id ? 'blue' : ''"
                          :value="category._id" :active="categoryId == category._id">
              <v-icon small :color="categoryId == category._id ? 'blue' : ''" class="mr-1">
                  mdi-chevron-right
              </v-icon> 
              {{ category.name }}
            </v-list-item>
          </template>
        </v-list> -->
      </v-col>
    </v-card>
  </v-dialog>
</div>
</template>


<script>

// import axios from "axios"
import OfferCard from '@/components/offer/OfferCard.vue'
import SearchBlock from '@/components/offer/SearchBlock.vue'
import SearchGeoBlock from '@/components/offer/SearchGeoBlock.vue'

// import { i18n } from 'vue-lang-router';
// import core from '../../plugins/core.js'

export default {
  name: 'home',
  components: {
    OfferCard, SearchBlock, SearchGeoBlock
  },
  data: () => ({
    offerType: "OFFER",
    search: "",
    amountMin: 0,
    amountMax: 50,
    categoryId: null,
    showPopupCategory: false,
    coordinates: [46.16685851396646, -1.1697435379028323],
    radius: 500000,
    showDialogGeoSearch: false
  }),
  mounted: async function(){

    //if(this.$store.state.auth.isLogin)
    this.coordinates = this.$store.state.auth.user.coordinates
      
    this.$root.$off('onChangeSearchGeo').$on('onChangeSearchGeo', async (geoParams) => { 
      //console.log("on onChangeSearchGeo", geoParams)
      this.coordinates = geoParams.coordinates
      this.radius = geoParams.radius

      let params = this.$store.state.market.requestParams 
      params.coordinates = this.coordinates 
      params.radius = this.radius

      await this.$store.dispatch("market/setRequestParams", params)

      //this.initData()
    })

    this.$root.$off('fetchOffers').$on('fetchOffers', (text, skip) => { 
      //console.log("searchBlock on fetchOffers", text)
      if(text != null) this.search = text 
      this.fetchOffers(skip)
    })

    this.$root.$off('setTypeSearch').$on('setTypeSearch', (type) => { 
      console.log("on setTypeSearch", type)
      this.setTypeSearch(type)
    })

    this.$root.$off('setNewCoordSearch').$on('setTypeSearch', (coords) => { 
      console.log("on setNewCoordSearch", coords)
      this.coordinates = coords
      this.fetchOffers()
    })

    this.$root.$off('closeDialogSearchGeo').$on('closeDialogSearchGeo', () => { 
      console.log("on closeDialogSearchGeo")
      this.showDialogGeoSearch = false
    })

    this.initData()
  },
  methods: {
    async initData(){

      this.offerType = this.$store.state.market.requestParams.offerType
      this.search = this.$store.state.market.requestParams.search
      this.amountMin = this.$store.state.market.requestParams.amountMin
      this.amountMax = this.$store.state.market.requestParams.amountMax
      this.coordinates = this.$store.state.market.requestParams.coordinates
      this.radius = this.$store.state.market.requestParams.radius
      this.categoryId = this.$store.state.market.requestParams.categoryId
      this.fetchLimit = this.$store.state.market.requestParams.fetchLimit
      this.skip = 0

      this.fetchOffers()
    },
    setTypeSearch(type){
      if(type != null) this.offerType = type 
      this.fetchOffers()
    },
    async fetchOffers(skip=0){
      //console.log("searchBlock fetchOffers", this.type, this.amountMin, this.amountMax)
      //this.showDialogGeoSearch = false
      this.$store.dispatch('market/fetchOffers', {  offerType: this.offerType,
                                                    search: this.search,
                                                    amountMin: this.amountMin,
                                                    amountMax: this.amountMax,
                                                    coordinates: this.coordinates,
                                                    radius: this.radius,
                                                    categoryId: this.categoryId,
                                                    fetchLimit:  100,
                                                    skip:  skip
      })
    },

    openDialogGeoSearch(){
      this.showDialogGeoSearch = true
      this.$root.$emit("invalidateSizeSearchGeoBlock")
    },

    selectCategoryPopup(categoryId){
      this.categoryId = categoryId
      this.fetchOffers()
      this.showPopupCategory = false
    },

    decrementMax(){ if(this.amountMax > 0) this.amountMax = this.amountMax - 1 },
    decrementMin(){ if(this.amountMax > 0) this.amountMin = this.amountMin - 1 },

    incrementMax(){ this.amountMax = this.amountMax + 1 },
    incrementMin(){ this.amountMin = this.amountMin + 1 },


    keydownAmountMax(event){
      if(event.key.length > 1 || this.amountMax == null) return

      let amount = this.amountMax + ""
      let ascii = event.key.charCodeAt(0)
      if((ascii < 48 || ascii > 57) //si ce n'est pas un nombre
      && (event.key != "." || amount.indexOf(".") > -1) //et que ce n'est pas un point, ni un 2eme point
      || amount.length >= parseFloat(amount).toFixed(4).length
      || amount.length >= 6) { //ou que le nombre de chiffre apres la virgule est de max 4
          event.preventDefault() //annule la frappe au clavier
      }
    },
    keydownAmountMin(event){
      if(event.key.length > 1 || this.amountMin == null) return

      let amount = this.amountMax + ""
      let ascii = event.key.charCodeAt(0)
      if((ascii < 48 || ascii > 57) //si ce n'est pas un nombre
      && (event.key != "." || amount.indexOf(".") > -1) //et que ce n'est pas un point, ni un 2eme point
      || amount.length >= parseFloat(amount).toFixed(4).length
      || amount.length >= 6) { //ou que le nombre de chiffre apres la virgule est de max 4
          event.preventDefault() //annule la frappe au clavier
      }
    },
  },
  computed: {
  },
  watch: {
      
  }, 
}
</script>

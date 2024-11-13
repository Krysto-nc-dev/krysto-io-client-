<template>
<div>
  <!-- <div class="primary--text text--darken-2 mb-5" style="font-size:22px; margin-top:-20px;">Petites-annonces en monnaie virtuelle</div> -->
  <v-card color="transparent" elevation="0" class="mt-5"  style="border: 0px solid #f0f0f0; margin-bottom:40px;" outlined>
    <v-col cols="12" class="pa-5">
      <v-row>
        <v-col cols="12" sm="4" class="px-1">
          <v-select rounded outlined flat hide-details  
                    :items="$store.state.app.data.offerCategory"
                    item-text="name" item-value="_id"
                    v-model="categoryId"
                    label="Catégorie"
                    >
          </v-select>
        </v-col>
        <v-col cols="12" sm="4" class="px-1">
          <v-text-field rounded outlined flat hide-details  
                        label="Que recherchez-vous ?" 
                        append-icon="mdi-magnify"
                        v-model="search"
                        >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="4" class="px-1">

          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-text-field rounded outlined flat hide-details  
                            label="Où cherchez-vous ?" 
                            append-icon="mdi-map-marker"
                            v-bind="attrs" v-on="on" 
                            v-model="searchPlaceStr"
                            @change="startGeoloc()"
                            >
              </v-text-field>
            </template>
            <ListNominatimResult :places="places" :loadPlaces="loadPlaces" :onclick="setCoordinates"/>
          </v-menu>
          
        </v-col>
      </v-row>

      <v-row style="margin-bottom:-50px;">
        <v-col class="text-center">
          <v-btn large rounded width="190" class="ma-1" color="secondary" dark elevation="0"
                 v-if="!$store.state.auth.isLogin"
                 to="/register">
            <v-icon>mdi-account-plus</v-icon> Créer mon compte
          </v-btn>
          <v-btn large rounded width="190" class="ma-1" color="primary" dark elevation="0" @click="searchOffers()">
            <v-icon>mdi-magnify</v-icon> Rechercher
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-card>

</div>
</template>

<script>

import ListNominatimResult from '@/components/offer/ListNominatimResult.vue'
import SearchGeoBlock from '@/components/offer/SearchGeoBlock.vue'

import nominatim from '../../services/nominatim.js'


export default {
  name: 'home',
  components: {
    SearchGeoBlock, ListNominatimResult
  },
  data: () => ({
    
    offerType: null,
    categoryId: null,
    search: "",
    searchPlaceStr: "",
    places: null,
    loadPlaces: true,
    coordinates: [-22.268764039073968, 166.45385742187503],
  }),
  mounted: async function(){
    //this.$store.dispatch('app/fetchEntities', { entityType: 'offerCategory' })
    this.initData()
  },
  methods: {
    async initData(){
      this.$store.dispatch('app/fetchEntities', { entityType: 'offerCategory' })
      this.fetchOffers()
    },
    async startGeoloc(){
      let query = this.searchPlaceStr + " FR"
      this.loadPlaces = true
      this.places = []
      nominatim.search(query, (res)=>{
        this.loadPlaces = false
        if(res.error == false){
          this.places = res.data
        }
      })
    },

    setCoordinates: function(lat, lng){
      lat = parseFloat(lat)
      lng = parseFloat(lng)
      this.coordinates = [lat, lng]
      //console.log("setCoordinates", this.coordinates)
    },
    async searchOffers(){
      //await this.fetchOffers()
      await this.$store.dispatch('market/setRequestParams', 
              {   offerType: this.offerType,
                  search: this.search,
                  categoryId: this.categoryId,
                  coordinates: this.coordinates,
                  radius: this.$store.state.market.requestParams.radius,
                  limit: this.$store.state.market.requestParams.fetchLimit,
                  amountMin: this.$store.state.market.requestParams.amountMin,
                  amountMax: this.$store.state.market.requestParams.amountMax,
                  fetchLimit: this.$store.state.market.requestParams.fetchLimit,
            })
      await this.$store.dispatch('market/clearResults')
      this.$router.push("/market")
    },

    async fetchOffers(){
      //console.log("searchBlock fetchOffers", this.type, this.search, this.categoryId)
      this.showDialogGeoSearch = false
      this.$store.dispatch('market/fetchOffers', 
        {   offerType: this.offerType,
            search: this.search,
            categoryId: this.categoryId,
            coordinates: this.coordinates,
            radius: this.$store.state.market.requestParams.radius,
            limit: this.$store.state.market.requestParams.fetchLimit,
            amountMin: this.$store.state.market.requestParams.amountMin,
            amountMax: this.$store.state.market.requestParams.amountMax,
            fetchLimit: this.$store.state.market.requestParams.fetchLimit,
      })
    },
  },
  computed: {
  },
  watch: {
      
  }, 
}

</script>
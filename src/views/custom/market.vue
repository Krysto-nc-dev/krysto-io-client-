<template>
<v-col id="stream">
  <v-row v-if="$store.state.market.offers != null">

    <v-col cols="12" sm="5" md="4" class="pl-5 d-none d-md-inline" v-if="$vuetify.breakpoint.width >= 960"
          id="offer-search" style="position:fixed; top:65px;">
      <SearchBlock></SearchBlock>
    </v-col>

    <v-col cols="12" sm="12" md="4" class="pb-0 pa-5" id="ref-col-search-width">
      <div class="d-md-none" v-if="$vuetify.breakpoint.width < 960">
        <SearchBlock></SearchBlock>
      </div>
    </v-col>

    <v-col cols="12" sm="12" md="7" lg="6" class="mr-auto mt-3">
      <SearchGeoBlock v-if="$vuetify.breakpoint.width >= 960"></SearchGeoBlock>
      
      <v-btn  block color="secondary" elevation="0" @click="fetchOffers()" class="mt-2" :loading="$store.state.market.streamLoading">
        <v-icon small>mdi-refresh</v-icon> Actualiser les résultats
      </v-btn>

      <v-col cols="12" class="mb-2 text-center">
        <!-- <v-icon color="grey">mdi-chevron-down</v-icon>  -->
        
        {{ $store.state.market.offers.length }}/{{ $store.state.market.totalOffers }}
        annonce{{ $store.state.market.offers.length > 1 ? 's' : '' }}
        trouvée{{ $store.state.market.offers.length > 1 ? 's' : '' }}
        
      </v-col>

      <template v-for="offer in $store.state.market.offers">
        <OfferCard :offer="offer" :key="offer._id"></OfferCard>
      </template>

      <div class="text-center" v-if="$store.state.market.isEndOfStream">
        <v-divider/><br>
        <b>- Fin des annonces -</b><br>
        Modifiez votre recherche pour plus de résultats
        <br><br>
        <v-btn  fab elevation="0" color="secondary" @click="$vuetify.goTo(0)"><v-icon>mdi-arrow-up</v-icon></v-btn>
        <br><br><br><br>
      </div>
      <div class="text-center" v-if="$store.state.market.streamLoading && $store.state.market.offers.length > 0">
        Chargement en cours<br>
        <v-btn elevation="0" color="transparent" :loading="true"></v-btn>
        <br><br><br>
      </div>
    </v-col>

    <OfferDialog></OfferDialog>
  </v-row> 
</v-col>
</template>

<style>
  .dialogSearchGeo #map-container{
    position: absolute;
    height:unset !important;
    bottom:0px;
    top:0px;
    right:0px;
    left:0px;
  }
</style>

<script>

// import axios from "axios"
import OfferCard from '@/components/offer/OfferCard.vue'
import OfferDialog from '@/components/offer/OfferDialog.vue'
import SearchBlock from '@/components/offer/SearchBlock.vue'
import SearchGeoBlock from '@/components/offer/SearchGeoBlock.vue'

// import { i18n } from 'vue-lang-router';
// import core from '../../plugins/core.js'

export default {
  name: 'home',
  components: {
    OfferCard, SearchBlock, OfferDialog, SearchGeoBlock
  },
  data: () => ({
    openDialogOffer: false,
    lastScrollOffset: window.screenTop
  }),
  mounted: async function(){
    this.$store.dispatch('app/incStat', '/market')
    this.initData()

    const onScroll = () => {
      //console.log('Scrolled', this.$store.state.market.streamLoading, this.$store.state.market.isEndOfStream);
      if( this.$store.state.market.streamLoading ||
          this.$store.state.market.isEndOfStream ||
          document.getElementById("stream") == null
      ) {
          //console.log("no scroll event")
          return;
      }

      const streamEndOffset = document.getElementById("stream").offsetHeight - window.innerHeight - 100;
      if (window.scrollY > streamEndOffset) {
          //console.log('Scrolled to end of stream, fetching next page...', this.$store.state.market.isEndOfStream)
          
          if(!this.$store.state.market.isEndOfStream){
            this.$store.dispatch('market/fetchNextOffers')
            //this.$root.$emit('fetchOffers')
          }

          //this.lastScrollOffset = streamEndOffset;
      }
    }

        window.addEventListener('scroll', onScroll, { passive: true });
  },
  methods: {
    async initData(){
      this.$store.dispatch('app/fetchEntities', { entityType: 'offerCategory' })
    },
     async fetchOffers(){
       console.log("market fetchOffers")
       this.$root.$emit('fetchOffers')
     },
    nl2br: function(str, is_xhtml){
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>';
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    },
    
    
  },
  computed: {
  },
  watch: {
      '$route.path': { immediate: true, 
          async handler () {
            this.initData()
          }
      },
  }, 
}
</script>

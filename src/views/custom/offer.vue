<template>
<div>
  <v-col cols="12" md="10" lg="10" class="mx-auto mt-md-5" v-if="offer">
    <OfferPage :offer="offer" :inDialog="false"></OfferPage>
  </v-col>
</div>
</template>


<script>

import axios from "axios"
import OfferPage from '@/components/offer/OfferPage.vue'

export default {
  name: 'home',
  components: {
    OfferPage
  },
  data: () => ({
    offer: null,
  }),
  mounted: async function(){
    this.$store.dispatch('app/incStat', '/offer')
    this.initData()
  },
  methods: {
    async initData(){
      const { data } = await axios.get('/market/get-offer/'+ this.$route.params.offerId)
      if(!data.error){
        this.offer = data.offer
      }else{
        console.log("error get-offer", data)
      }
    }
    
  },
  
  computed: {
    
  },
  watch: {
      
  }, 
}
</script>

<template>
  <v-card outlined elevation="0">
    <v-col cols="12" class="pt-0 px-0">
      
      <v-card-title class="pt-2 pb-1" style="font-size:14px;line-height:17px;">n° {{ wallet.uid }}<br class="d-sm-none">
        <span class="d-none d-sm-inline"> - </span>
        
        
        <small v-if="wallet.type=='MAIN'"  class="pb-2">Votre compte courant</small>
        <small v-if="wallet.type=='DEPOSIT'" class="pb-2">
          <template v-if="wallet.name == 'DEPOSIT'">Votre compte de dépot</template>
          <template v-else>{{ wallet.name }}</template>
        </small>
      </v-card-title>

      <v-card-text class="pl-2 pb-0"  v-if="wallet.type == 'MAIN'">
        <v-chip small color="secondary" class="font-righteous">
          <b>{{ convertUnityMony(wallet.amountUnity).toFixed(2) }} {{ $store.state.app.monyUnity }}</b>
        </v-chip>
        <small class="ml-1 d-inline-block">~{{ monyToEuro(convertUnityMony(wallet.amountUnity)).toFixed(2) }} {{ $store.state.app.deviseConversion }}</small>
      </v-card-text>
      <v-card-text class="pl-2 pb-0" v-if="wallet.type == 'DEPOSIT'">
        <v-chip small color="secondary" class="font-righteous"><b>{{ wallet.amountMony.toFixed(2) }} {{ $store.state.app.monyUnity }}</b></v-chip>
        <small class="ml-1 d-inline-block">~{{ monyToEuro(wallet.amountMony).toFixed(2) }} {{ $store.state.app.deviseConversion }}</small>
      </v-card-text>

    </v-col>
  </v-card>
</template>


<script>

// import axios from "axios"
// import { i18n } from 'vue-lang-router';
import core from '../../plugins/core.js'
const config = require('../../config/' + process.env.NODE_ENV)

export default {
  name: 'WalletCard',
  components: {
  },
  props:['wallet'],
  data: () => ({
    
  }),
  mounted: async function(){
    this.initData()
  },
  methods: {
    async initData(){
    },
    monyToEuro(amount){ return amount * config.monyToEuro },

    convertUnityMony(amountUnity){
      return core.convertUnityMony(amountUnity, this.$store.state.auth.monyConvertValue)
    },
    convertMonyUnity(amountMony){
      return core.convertMonyUnity(amountMony, this.$store.state.auth.monyConvertValue)
    },
    
  },
  computed: {
  },
  watch: {
      
  }, 
}
</script>
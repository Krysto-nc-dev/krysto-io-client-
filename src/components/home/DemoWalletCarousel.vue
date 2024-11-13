<template>
<v-row>
   <v-col cols="12" sm="11" md="6" lg="1" class="mx-auto text-center px-1">
    <v-btn @click="indexDiapoPrev()" fab outlined color="indigo" style="left:0px; top:200px; position:relative; display: block;">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
  </v-col>
  
  <v-col cols="12" sm="11" md="6" lg="5" class="mx-auto text-right px-1">
    <v-img :src="baseUrl() + '/img/wallet-diapo/wmain/wallet-diapo-'+(indexDiapo)+'.png'" 
            contain class="mt-5 d-inline-flex" max-width="470"
            style="border:5px solid white;"/>
  </v-col>
  <v-col cols="12" sm="11" md="6" lg="5" class="mx-auto text-left px-1">
    <v-img :src="baseUrl() + '/img/wallet-diapo/wdeposit/wallet-diapo-'+(indexDiapo)+'.png'" 
            contain class="mt-5 d-inline-flex" max-width="470"
            style="border:5px solid white;"/>
  </v-col>
  <v-col cols="12" sm="11" md="6" lg="1" class="mx-auto text-center px-1">
    <v-btn @click="indexDiapoNext()" fab outlined color="indigo" style="top:200px; position:relative; display: block;">
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
  </v-col>
  
</v-row>
</template>

<style></style>

<script>

//import axios from 'axios'
//import router from '../router/router'
import core from '../../plugins/core.js'

//import Post from '@/components/Post.vue'
const config = require('../../config/' + process.env.NODE_ENV)
import DemoChartWallet from '@/components/charts/DemoChartWallet.vue'

export default {
  name: 'DemoWallet',
  components: { DemoChartWallet },
  data: () => ({
    step: 1,
    amountWallet: 30.4375,
    indexDiapo: 1,
    nbDiapo: 17,
    timerLoader: null,
    demoStepTexts: [
      { txt: "Au premier jour, votre compte est crédité de 30.4565 òto" },
      { txt: "Tant que vous ne dépensez pas vos òto, votre solde reste à ~30 òto" },
      { txt: "Si vous dépensez des òto, et que votre solde descend en-dessous de la moyenne de 30 òto..." },
      { txt: "... les jours suivants, il remontera automatiquement vers la moyenne de 30 òto" },
      { txt: "Si vous vendez une ou plusieurs annonces, et que votre solde dépasse la moyenne..." },
      { txt: "... les jours suivants, il diminuera progressivement, vers la moyenne de 30 òto" },
      { txt: "Pour conserver la valeur de votre monnaie, vous pouvez alors en transférer une partie sur votre compte de dépot, ou tout simplement réaliser des achats au plus vite !" },
    ]
    
  }),
  async mounted(){
    this.timerLoader = setInterval(() => {
      if(this.indexDiapo < this.nbDiapo){
        this.indexDiapo++
      }else{
        clearInterval(this.timerLoader)
        this.timerLoader = null
        this.indexDiapo = 1
      }
    }, 300)
  },
  methods: {
    indexDiapoPrev(){ 
      if(this.indexDiapo <= 1) this.indexDiapo = this.nbDiapo+1
      this.indexDiapo--
    },
    indexDiapoNext(){ 
      if(this.indexDiapo >= this.nbDiapo) this.indexDiapo = 1
      this.indexDiapo++
    },
    baseUrl(){ return core.baseUrl() },
  },
  computed: {
    
    monyToEuro(){
      return config.monyToEuro
    }
    
  }
}
</script>

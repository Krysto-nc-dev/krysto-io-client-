<template>
<v-row>
  <v-col class="text-center">
    <v-card class="mx-auto py-4" color="" outlined elevation="0">
      <v-row>

        <v-col cols="8" sm="6" md="6" class="mx-auto text-center">
          
          <v-icon  class="mr-1">mdi-credit-card-clock</v-icon> 
          compte courant

          <div class="cursorpointer font-main bold" style="font-size:40px;" 
              title="cliquer pour actualiser les données"
              @click="refreshData">
              {{ amountWallet.toFixed(4) }} {{ $store.state.app.monyUnity }}
          </div>
          <b class="ml-2">~{{ (amountWallet * monyToEuro).toFixed(2) }} {{ $store.state.app.deviseConversion }}</b>
        </v-col>

      </v-row>

      <v-col cols="12">
        <DemoChartWallet :height="200"></DemoChartWallet> 
      </v-col>
      <v-col cols="12">
        <v-alert color="indigo" dark class="font-main" 
                 style="font-size:17px; font-weight:400!important; padding:40px;">
          {{ demoStepTexts[step-1].txt }}
        </v-alert> 
      </v-col>
    </v-card>
  </v-col>

      <v-col cols="12">
        <v-toolbar elevation="0" color="transparent">
          <v-spacer/>
        
        <v-btn v-if="step > 1"
                @click="restart" rounded x-large color="white" elevation="0" outlined dark 
                class="mx-1 indigo--text" > 
          <v-icon>mdi-refresh</v-icon> Recommencer
        </v-btn>
        <v-btn v-if="step == 1"
                @click="nextStep" rounded x-large color="white" elevation="0" outlined dark 
                class="mx-1 indigo--text" > 
          <v-icon>mdi-play</v-icon> Lancer la démo
        </v-btn>
        <v-btn v-if="step > 1" @click="nextStep" elevation="0" rounded x-large color="indigo" dark class="mx-1">
          Étape suivante <v-icon class="ml-1">mdi-chevron-right-circle</v-icon>
        </v-btn> 
        <v-spacer/>
        </v-toolbar>
      </v-col>
</v-row>
</template>

<style></style>

<script>

//import axios from 'axios'
//import router from '../router/router'
//import core from '../plugins/core.js'

//import Post from '@/components/Post.vue'
const config = require('../../config/' + process.env.NODE_ENV)
import DemoChartWallet from '@/components/charts/DemoChartWallet.vue'

export default {
  name: 'DemoWallet',
  components: { DemoChartWallet },
  data: () => ({
    step: 1,
    amountWallet: 30.4375,

    demoStepTexts: [
      { txt: "Au premier jour, votre compte est crédité de 30.4565 krp" },
      { txt: "Tant que vous ne dépensez pas vos krp, votre solde reste à ~30 krp" },
      { txt: "Si vous dépensez des krp, et que votre solde descend en-dessous de la moyenne de 30 krp..." },
      { txt: "... les jours suivants, il remontera automatiquement vers la moyenne de 30 krp" },
      { txt: "Si vous vendez une ou plusieurs annonces, et que votre solde dépasse la moyenne..." },
      { txt: "... les jours suivants, il diminuera progressivement, vers la moyenne de 30 krp" },
      { txt: "Pour conserver la valeur de votre monnaie, vous pouvez alors en transférer une partie sur votre compte de dépot, ou tout simplement réaliser des achats au plus vite !" },
    ]
    
  }),
  async mounted(){

  },
  methods: {
    
    async refreshData(){
      await this.$store.dispatch('auth/refreshUserData')
      this.$root.$emit('rerenderChartWallet')
    },

    restart(){
      this.step = 1
      this.$root.$emit('rebootDemoChartWallet')
    },
    nextStep(){
      if(this.step >= this.demoStepTexts.length) {
        this.$vuetify.goTo('#section-walletDeposit')
        return
      }
      
      this.step++

      if(this.step == 2){
        this.$root.$emit("addToDemoChartWallet", 30.4375, 'J+3')
        this.$root.$emit("addToDemoChartWallet", 30.4375, 'J+4')
      this.amountWallet = 30.4375
      }
      if(this.step == 3){
        this.$root.$emit("addToDemoChartWallet", 5.4375, 'J+5')
        this.amountWallet = 5.4375
      }
      if(this.step == 4){
        this.$root.$emit("addToDemoChartWallet", 6.3419, 'J+6')
        this.$root.$emit("addToDemoChartWallet", 7.2323, 'J+7')
        this.$root.$emit("addToDemoChartWallet", 8.1363, 'J+8')
        this.amountWallet = 8.1363
      }
      if(this.step == 5){
        this.$root.$emit("addToDemoChartWallet", 43.3419, 'J+9')
        this.amountWallet = 43.3419
      }
      if(this.step == 6){
        this.$root.$emit("addToDemoChartWallet", 42.4758, 'J+10')
        this.$root.$emit("addToDemoChartWallet", 41.6321, 'J+11')
        this.$root.$emit("addToDemoChartWallet", 40.5719, 'J+12')
        this.amountWallet = 40.5719
      }

      //if(this.amountWallet == 0) this.restart()
    }
  },
  computed: {
    
    monyToEuro(){
      return config.monyToEuro
    }
    
  }
}
</script>

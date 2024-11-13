<template>
<v-col cols="12" sm="11" md="10" lg="7" id="wallet-container" class="mx-auto px-0 mt-5">
  <v-card v-if="$store.state.auth.isLogin && $store.state.auth.walletFocus != null" 
          class="mx-auto" color="transparent" elevation="0">
    <v-row class="mx-0">

      <v-col cols="2" sm="3" md="3" class="text-right mt-5 pt-5">
        <!-- <v-btn class="mt-1" icon>
          <v-icon small color="grey darken-">mdi-information</v-icon>
        </v-btn> -->
      </v-col>
      <v-col cols="8" sm="6" md="6" class="text-center">
        
        <template v-if="$store.state.auth.walletFocus.type == 'MAIN'">
          <v-icon  class="mr-1">mdi-credit-card-clock</v-icon> 
          compte courant <small>- {{ nbDays }} jours</small>
        </template>
        <template v-if="$store.state.auth.walletFocus.type == 'DEPOSIT'">
          <v-icon  class="mr-1">mdi-credit-card-settings</v-icon>
          <template v-if="$store.state.auth.walletFocus.name == 'DEPOSIT'">
            Compte de dépot
          </template>
          <template v-else>
            {{ $store.state.auth.walletFocus.name }}
          </template>
        </template>

        <h1 class="cursorpointer" 
            title="cliquer pour actualiser les données"
            @click="refreshData">
            {{ $store.getters['auth/amountCurrent'].toFixed(4) }} 
            {{ $store.state.app.monyUnity }}
        </h1>
        N° {{ $store.state.auth.walletFocus.uid }}  
        <b class="ml-2">~{{ ($store.getters['auth/amountCurrent'] * monyToEuro).toLocaleString() }} {{ $store.state.app.deviseConversion }}</b>
      </v-col>

      <v-col cols="2" sm="3" md="3" class="text-left mt-5 pt-5">
        <v-btn class="mt-1" icon @click="refreshData" title="rafraîchir">
          <v-icon small color="grey darken-">mdi-refresh</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <v-col cols="12">
      <ChartWallet :height="130"></ChartWallet> 
    </v-col>

    <v-row class="my-5 mx-0">
      <v-col cols="6">
        <MoneySendButton :height="130"></MoneySendButton>
      </v-col>
      <v-col cols="6">
        <MoneyReceiveButton :height="130"></MoneyReceiveButton>
      </v-col>
    </v-row>

    <v-row class="my-5 mx-0" v-if="!$store.state.auth.user.planPaid">
      <v-col cols="12" md="12" lg="9" class="mx-auto">
        <v-alert outlined color="red" icon="mdi-credit-card-settings-outline">
          <b>Abonnement suspendu</b><br>
          Procéder au paiement de votre abonnement, pour accéder à l'ensemble des services.<br><br>
          <v-btn color="blue" elevation="0" dark 
                 @click="$store.dispatch('pay/startPaiement', { userId: $store.state.auth.user._id, 
                                                                stripePriceId: $store.state.auth.user.plan.stripeId })">
            <v-icon small>mdi-credit-card-settings-outline</v-icon>
            Payer maintenant
          </v-btn> 
        </v-alert>
      </v-col>
    </v-row>

    <v-col cols="12" class="text-right py-0">
      <b style="font-size:11px;" class="grey--text text--darken-2 pr-2">
        {{ dateToday }} · 1 {{ $store.state.app.monyUnity }} = {{ $store.state.auth.monyConvertValue.toFixed(11) }} ù
      </b>
    </v-col>

    <v-col cols="12">
      <v-toolbar dense elevation="0" outlined>
        <v-icon color="grey" class="mt-1">mdi-chevron-down</v-icon>
        
        <span class="d-none d-sm-flex">Vos dernières transactions</span>
        <span class="d-sm-none">Transactions</span>
        
        <v-spacer></v-spacer>

        <template v-if="$store.state.auth.walletFocus.type == 'MAIN'">
          <small class="secondary--text mr-2"><span class="d-none d-sm-inline">Afficher mes </span>revenus</small>
          <v-switch v-model="showDaily" class="mt-5" color="secondary"></v-switch>
        </template>
      </v-toolbar>
      <template v-for="transaction in $store.state.auth.walletFocus.transactions">
        <TransactionCard :key="transaction.id" :transaction="transaction" :showDaily="showDaily"></TransactionCard> 
      </template>
    </v-col>

  </v-card>

</v-col>
</template>

<script>

//import axios from 'axios'
//import router from '../router/router'

const config = require('../../config/' + process.env.NODE_ENV)

import ChartWallet from '@/components/charts/ChartWallet.vue'
import TransactionCard from '@/components/wallet/TransactionCard.vue'
import MoneySendButton from '@/components/wallet/MoneySendButton.vue'
import MoneyReceiveButton from '@/components/wallet/MoneyReceiveButton.vue'

import '@/assets/css/profile.css';

export default {
  name: 'auth',
  components: { ChartWallet, TransactionCard, MoneySendButton, MoneyReceiveButton },
  data: () => ({
    showDaily: false
  }),

  async mounted(){
      this.$store.dispatch('app/incStat', '/wallet')
  },

  methods: {
    async refreshData(){
      await this.$store.dispatch('auth/refreshUserData')
      this.$root.$emit('rerenderChartWallet')
    }
  },
  
  computed: {
    nbDays(){
      let total = 0
      this.$store.state.auth.user.walletMain.transactions.forEach((transaction) => {
        if(transaction.id.indexOf('DAILY') == 0) total++
      })
      return total
    },
    monyToEuro(){
      return config.monyToEuro
    },
    dateToday(){ 
      let date = new Date()
      let day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate() 
      let month = date.getMonth() < 9 ? '0'+(date.getMonth()+1) : (date.getMonth()+1)
      return day + "/" + 
             month + "/" + 
             date.getFullYear() //+ " " +
             //date.getHours() + "h" + 
             //date.getMinutes()
    },
  },
  watch: {
      '$route.params.walletUid': { immediate: true, 
          async handler (){  //oldVal, val) {
            //console.log("route changed !", this.$route.params.walletUid)

            if(this.$route.params.walletUid != null)
              this.$store.dispatch('auth/setFocusWalletUid', this.$route.params.walletUid)
            else
              this.$router.push('/wallet/' + this.$store.state.auth.user.walletMain.uid)

            this.refreshData()
          }
      },
  }, 
}
</script>

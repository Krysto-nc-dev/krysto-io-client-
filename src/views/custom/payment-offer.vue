<template>
  <v-col cols="12" md="8" lg="6" class="mx-auto" v-if="nego != null">
    <v-card class="mt-sm-5">
      <v-list three-line class="pb-0" color="transparent">
        <v-list-item class="mt-2">

          <v-list-item-avatar class=" d-none d-sm-inline">
            <v-img  :src="baseUrl() + offer.gallery[0]"
                    class="py-1" style="border-radius:4px;" />
          </v-list-item-avatar>

          <v-list-item-content>
            
            <router-link :to="'/offer/'+offer._id" style="color:unset">
              <b><i><v-icon x-small class="mb-1">mdi-circle</v-icon> {{ offer.title }}</i></b>
            </router-link>

            <v-list-item-title>
              Vous avez proposé
              <b class="ml-1 teal--text">{{ nego.amount }} {{ $store.state.app.monyUnity }}</b>
            </v-list-item-title>

            <v-list-item-subtitle>
              <b>
                <v-chip v-if="nego.status == 'OPEN'"
                        dark color="orange" class="mt-1">
                  En attente de réponse
                </v-chip>
                <v-chip v-if="nego.status == 'ACCEPTED'"
                        dark color="green" class="mt-1">
                  Votre proposition a été acceptée
                </v-chip>
                <v-chip v-if="nego.status == 'REFUSED'"
                        dark color="red" class="mt-1">
                  Votre proposition a été refusée
                </v-chip>
                <br>                
              </b>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="my-3"/>

      <v-card-title>
        Confirmez-vous l'envoi de 
        <b class="ml-1 teal--text">{{ nego.amount }} {{ $store.state.app.monyUnity }}</b> à 
        <b>{{ offer.creator.name }}</b> ?
      </v-card-title>

      <v-card-text>
        <v-icon small class="mb-1 mr-1">mdi-alert</v-icon> 
        <b>N'envoyez pas votre monnaie avant d'avoir rencontré le vendeur.</b>

        <br><br>
        Sauf arrangement préalable entre les 2 parties, 
        le paiement n'intérvient en principe que lorsque vous avez réceptionné l'objet de votre transaction,
        et que vous vous êtes assuré de son état.

        <br><br>
        En cas de problème, vous pouvez annuler la transaction avant d'avoir réalisé l'échange.
      </v-card-text>

      <v-divider/>

      <v-card-title class="">
        <v-icon>mdi-chevron-down</v-icon> Avec quel compte souhaitez-vous payer ?
      </v-card-title>

      <v-row class="mx-0 pb-5">

        <v-col cols="12" v-if="nbWalletEnabled == 0">
          <v-alert outlined color="red">
            <v-icon small color="red">mdi-alert</v-icon>
            <template v-if="$store.getters['auth/amountTotalCurrent'] >= nego.amount">
              Aucun de vos comptes ne dispose de la somme suffisante pour réaliser ce paiement.<br>
              Effectuer un (ou plusieurs) virement(s) entre vos comptes pour rassembler la somme suffisante.
            </template>
            <template v-else>
              Vous ne disposez pas des fonds suffisants pour réaliser cette transaction.
            </template>
          </v-alert>
        </v-col>

        <template v-for="wallet in wallets">
          <v-col cols="12" md="6" :key="wallet._id">
            
              <v-card outlined elevation="0">
                <v-col cols="12" class="">
                  
                  <v-card-title class="pt-0">n° {{ wallet.uid }}</v-card-title>
                
                  <v-card-subtitle v-if="wallet.type=='MAIN'" class="pb-2">Compte courant</v-card-subtitle>
                  <v-card-subtitle v-if="wallet.type=='DEPOSIT'" class="pb-2">
                    <template v-if="wallet.name == 'DEPOSIT'">Compte de dépot</template>
                    <template v-else>{{ wallet.name }}</template>
                  </v-card-subtitle>

                  <v-divider></v-divider>

                  <v-card-text class="pl-2 pb-0 pt-2" v-if="wallet.type == 'MAIN'">
                    <v-chip small color="secondary" class="mr-2 font-righteous"><b>{{ convertUnityMony(wallet.amountUnity).toFixed(4) }} {{ $store.state.app.monyUnity }}</b></v-chip>
                    ~{{ monyToEuro(convertUnityMony(wallet.amountUnity)).toFixed(2) }} {{ $store.state.app.deviseConversion }}
                  </v-card-text>
                  <v-card-text class="pl-2 pb-0 pt-2" v-if="wallet.type == 'DEPOSIT'">
                    <v-chip small color="secondary" class="mr-2 font-righteous"><b>{{ wallet.amountMony.toFixed(4) }} {{ $store.state.app.monyUnity }}</b></v-chip>
                    ~{{ monyToEuro(wallet.amountMony).toFixed(2) }} {{ $store.state.app.deviseConversion }}
                  </v-card-text>

                  <v-btn block color="green" class="mt-2" v-if="nbWalletEnabled > 0"
                          @click="payOffer(wallet)" dark elevation="0"
                          :disabled="!((wallet.type == 'MAIN' 
                                        && convertUnityMony(wallet.amountUnity) >= nego.amount) 
                                        || (wallet.type == 'DEPOSIT' && wallet.amountMony >= nego.amount))"
                  >
                    <v-icon small>mdi-check</v-icon> Envoyer {{ nego.amount }} {{ $store.state.app.monyUnity }}
                  </v-btn>
                </v-col>
              </v-card>
            
          </v-col>
        </template>
      </v-row>

      <v-toolbar elevation="0">
        <v-spacer/>
        <v-btn color="primary" class="mx-1" elevation="0" @click="goBack()">
          <v-icon small>mdi-arrow-left</v-icon> Retour
        </v-btn>
        <v-btn color="red" class="mx-1" dark elevation="0" @click="cancelProposition()">
          <v-icon small>mdi-cancel</v-icon> Annuler la transaction
        </v-btn>
      </v-toolbar>
      
    </v-card>
  </v-col>
</template>


<script>

import axios from "axios"
import Gravatar from 'vue-gravatar'
import WalletCard from '@/components/wallet/WalletCard.vue'

// import { i18n } from 'vue-lang-router';
import core from '../../plugins/core.js'
const config = require('../../config/' + process.env.NODE_ENV)

export default {
  name: 'home',
  components: {
    'v-gravatar' : Gravatar, WalletCard
  },
  data: () => ({
    offer: null,
    proposition: null,
    nego: null,
    nbWalletEnabled: 0,
    wallets: []
  }),
  mounted: async function(){
    this.initData()
  },
  methods: {
    async initData(){
      console.log("this.$route.params.offerId", this.$route.params.offerId)
      let res = await axios.get("/market/get-offer/" + this.$route.params.offerId)
      if(res.data.error == false){
        if(res.data.offer.status != 'RESERVED') 
          this.$router.push("/wallet") 

        this.offer = res.data.offer
        //récupère la proposition et la négociation acceptée par le vendeur
        this.offer.propositions.forEach((prop)=>{
          prop.negos.forEach((nego)=>{
            if(nego.status == 'ACCEPTED'){
              this.proposition = prop
              this.nego = nego
            }
          })
        })

        //regarde si le compte courant dispose des fonds nécessaires
        if(this.convertUnityMony(this.$store.state.auth.user.walletMain.amountUnity)  >= this.nego.amount)
          this.nbWalletEnabled++

        //regarde si les comptes de dépot disposent des fonds nécessaires
        this.$store.state.auth.user.walletsDeposit.forEach((wallet)=>{
          this.wallets.push(wallet)
          console.log("this.convertUnityMony(wallet.amountUnity) ", this.convertUnityMony(wallet.amountUnity) )
          if(wallet.amountMony >= this.nego.amount) 
            this.nbWalletEnabled++
        })

        this.wallets.push(this.$store.state.auth.user.walletMain)
      }else{
        console.log("error /market/get-offer/" + this.$route.params.offerId)
      }
    },
    async payOffer(wallet){
      let res = await axios.post("/market/pay-offer/" + this.$route.params.offerId,
                                { fromWalletUid: wallet.uid })

      if(res.data.error == false){
        this.$store.dispatch('auth/refreshUserData')
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'green', 
                                  title: "Le paiement a effectué avec succès",
                                  text: '', //data.newMsg.message,
                                  icon: 'thumb-up' })
        
      }else{
        console.log("error /market/pay-offer/", res.data)
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'red', 
                                  title: "Une erreur est survenue pendant le paiement",
                                  text: res.data.msg,
                                  icon: 'alert' })
      }
      this.$router.push('/wallet')
    },
    async cancelProposition(){
      
      let res = await axios.post("/market/cancel-proposition/" + this.proposition._id)

      if(res.data.error == false){
        this.$store.dispatch('auth/refreshUserData')
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'green', 
                                  title: "Votre proposition a été annulée",
                                  text: '', //data.newMsg.message,
                                  icon: 'thumb-up' })
        this.$router.push('/wallet')
      }else{
        console.log("error /market/pay-offer/", res.data)
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'red', 
                                  title: "Une erreur est survenue pendant l'annulation de votre proposition",
                                  text: res.data.msg,
                                  icon: 'alert' })
      }
    },
    goBack(){
      this.$router.back()
    },

    baseUrl(){ return core.baseUrl() },
    
    
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
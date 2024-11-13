<template>
<div>
  <v-btn v-if="$store.state.auth.user._id != offer.creator && $store.state.auth.user.isActive && !offer.fictif && canSendProposal && !hasSentProposal && $store.state.auth.user.planPaid && $store.getters['auth/accountReady']" 
        class="mt-2 mr-2" color="green" dark elevation="0" small outlined
        @click="showDialogProposal = true">
    <v-icon small color="" class="pr-1">mdi-basket</v-icon> Faire une offre
  </v-btn>
  <v-btn v-if="$store.state.auth.user._id != offer.creator && canSendProposal && hasSentProposal && !offer.fictif && $store.state.auth.user.isActive" 
          @click="showDialogProposal = true" small
          elevation="0" color="teal" outlined class="mt-2" dark>
          <v-icon x-small color="" class="pr-1">mdi-plus-circle</v-icon>  Nouvelle proposition
  </v-btn>
  <v-btn v-if="!$store.state.auth.isLogin" to="/register"
          elevation="0" color="orange" small outlined class="mt-2" dark>
          <v-icon x-small color="" class="pr-1">mdi-plus-circle</v-icon>  Créer mon compte
  </v-btn>
  <v-btn v-if="$store.state.auth.isLogin && !$store.state.auth.user.isActive"
           color="orange" outlined small class="mt-2" dark
           title="Votre compte sera validé dans les 24h qui suivent votre inscription">
          <v-icon color="orange" small class="pr-1">mdi-lock</v-icon>  En attente de validation
  </v-btn>

  
  <!-- DIALOG PROPOSITION -->
  <v-dialog v-model="showDialogProposal" transition="dialog-top-transition"
            max-width="640" :fullscreen="$vuetify.breakpoint.width < 600"
            v-if="offer != null && !offer.fictif" style="z-index:2000"
            content-class="dialog-large-bordered">
      <v-card elevation="0" style="border-radius:0;">

        <v-toolbar color="" elevation="1" dense>
          <v-icon small color="green" class="pr-1">mdi-basket</v-icon> 
          <b class="green--text">Faire une offre</b>
          <v-spacer></v-spacer>
          <v-btn x-small fab outlined elevation="0" @click="showDialogProposal = false">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-col cols="12">
          <v-card-title>
            <small>Le prix de cette annonce est de</small> 
            <span class="pl-1 d-inline-block teal--text">{{ offer.amountMony }} {{ $store.state.app.monyUnity }}</span>
          </v-card-title>

          <v-divider class="mt-2"></v-divider>

          <v-card-title class="pb-0">
            <v-icon small color="" class="pr-1">mdi-chevron-down</v-icon> Faire une offre
          </v-card-title>

          <v-card-text color="teal">
            Vous pouvez proposer au vendeur un montant inférieur ou suppérieur au prix annoncé.
            Le vendeur pourra accepter ou refuser votre proposition, en fonction des autres offres qu'il recevra.
          </v-card-text>

          <v-text-field v-model.number="amountProposal" type="number"
                        :color="amountCorrect ? 'green' : 'red'" class="mb-4 textarea-amountMony"
                        @keydown="keydownAmount" :prefix="monyToEuro() + $store.state.app.deviseConversion"
                        :label="'Montant de l\'offre en ' + $store.state.app.monyUnity"
                        hide-details outlined :suffix="$store.state.app.monyUnity" rounded>
          </v-text-field>

          <v-textarea v-model="message" color="green" rows="3" maxLength="500"
                      outlined label="Laisser un message...">
          </v-textarea>

          <v-btn block color="green" :disabled="!amountCorrect" elevation="0" :dark="amountCorrect" @click="sendProposition()">
            <v-icon small color="" class="pr-1">mdi-handshake</v-icon>
            Envoyer ma proposition
          </v-btn>

          <br>

          <v-alert :color="amountCorrect ? 'green' : 'red'" dark outlined dense>
            <template v-if="amountCorrect">Montant maximum autorisé par vos comptes : </template>
            <template v-if="!amountCorrect">Montant maximum autorisé par vos comptes : </template>
            <b>{{ convertUnityMony($store.state.auth.user.walletMain.amountUnity).toFixed(4) }} {{ $store.state.app.monyUnity }}</b>
          </v-alert>


          <v-row class="mx-0">
            <v-col cols="6" md="6" class="px-1">
              <WalletCardSM :wallet="$store.state.auth.user.walletMain"></WalletCardSM>
            </v-col>
            <v-col cols="6" md="6" class="px-1" v-for="wallet in $store.state.auth.user.walletsDeposit" :key="wallet._id">
              <WalletCardSM :wallet="wallet"></WalletCardSM>
            </v-col>
          </v-row>


        </v-col>
      </v-card>
  </v-dialog>
</div>
</template>


<script>

import axios from "axios"
import core from '../../plugins/core.js'
import WalletCardSM from '@/components/wallet/WalletCardSM.vue'

const config = require('../../config/' + process.env.NODE_ENV)

export default {
  name: 'home',
  props: ['offer', 'inDialog'],
  components: {
    WalletCardSM
  },
  data: () => ({
    showDialogProposal: false,
    amountProposal: 0,
    message: ""
  }),
  mounted: async function(){
    this.amountProposal = this.offer.amountMony
  },
  methods: {
    async sendProposition(){
      let params = { offerId: this.offer._id,
                     amount: this.amountProposal,
                     msgTxt: this.message
                   }
      let { data } = await axios.post('/market/send-proposition', params)
      if(data.error === true){
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'red', 
                                  title: "Une erreur est survenue.",
                                  text: data.msg })
      }else{
        this.showDialogProposal = false
        this.$store.dispatch('auth/refreshUserData')
        this.$store.dispatch('app/openSnackbar', 
                                { show: true, color:'green', 
                                  title: "Proposition envoyée.",
                                  text: "Votre proposition a bien été envoyée au vendeur." })

      }
    },

    keydownAmount(event){
      if(event.key.length > 1 || this.amountProposal == null) return

      let amountProposalStr = this.amountProposal + ""

      //transforme le "0" en chaine vide, sauf si on rajoute un point
      if(amountProposalStr == "0" && event.key != ".") this.amountProposal = ""
      
      //si le montant tapé fait déjà 4 caractère 
      if(amountProposalStr.length >= 4 && amountProposalStr.indexOf(".") == -1) 
        event.preventDefault()

      if(!this.amountCorrect) event.preventDefault()

      console.log("this.amountProposal", typeof amountProposalStr, amountProposalStr)
      //si le nombre de chiffre apres la virgule est déjà de 4
      if(amountProposalStr.length >= 4 
      && amountProposalStr.indexOf(".") > 0
      && amountProposalStr.length >= parseFloat(this.amountProposal).toFixed(4).length) 
        event.preventDefault()

      let ascii = event.key.charCodeAt(0)
      if((ascii < 48 || ascii > 57) //si ce n'est pas un nombre
      && (event.key != "." || amountProposalStr.indexOf(".") > -1) //et que ce n'est pas un point, ni un 2eme point
      ) {
          event.preventDefault() //annule la frappe au clavier
      }
    },
    convertUnityMony(amountUnity){
      return core.convertUnityMony(amountUnity, this.$store.state.auth.monyConvertValue)
    },
    convertMonyUnity(amountMony){
      return core.convertMonyUnity(amountMony, this.$store.state.auth.monyConvertValue)
    },
    monyToEuro(){ 
      if(this.amountProposal == "") return
        return "~" + (parseFloat(this.amountProposal) * config.monyToEuro).toFixed(2)
    },
  },
  computed: {
    canSendProposal(){
      if(!this.$store.state.auth.isLogin) return false

      let canSend = true
      let props = this.$store.state.auth.user.propositionsSent
      props.forEach((prop) => {
        if(prop.offer == this.offer._id){
          if(props.nego[props.nego.length - 1].status != "REFUSED") canSend = false
        }
      })
      return canSend && (this.$store.state.auth.user._id != this.offer.creator._id)
    },
    hasSentProposal(){
      let sent = false
      let props = this.$store.state.auth.user.propositionsSent
      props.forEach((prop) => {
        if(prop.offer._id == this.offer._id) sent = true
      })
      return sent
    },
    errorAmount(){
      let amountMax = this.offer.amountMony * 1.5
      let errorAmount = 'Proposition max autorisée : ' + amountMax
      //console.log("errorAmount", this.amountProposal, '>', amountMax, (this.amountProposal > amountMax))
      if(this.amountProposal > amountMax) return errorAmount
      else return false
    },
    amountCorrect(){
      let amountMax = this.$store.state.auth.user.walletMain.amountUnity
      //console.log("canSendProp ?1", amountMax)
      this.$store.state.auth.user.walletsDeposit.forEach((wallet)=>{
        if(wallet.amountMony > amountMax) amountMax = wallet.amountMony
      })
      let amountMaxMony = this.convertUnityMony(amountMax)
      //console.log("canSendProp ?", this.amountProposal, amountMaxMony)
      return (this.amountProposal <= amountMaxMony)
    },
  },
  watch: {
  }, 
}
</script>

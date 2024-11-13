<template>
<v-col cols="12" sm="11" md="10" lg="7" class="mx-auto" v-if="$store.state.auth.user._id">
  <v-card color="transparent" elevation="0">
    <v-col cols="12" class="text-center">
      
      <v-gravatar height="90" style="border-radius:50%;" class="mt-3"
                  :default-img="'retro'" :email="$store.state.auth.user.name"/>
                  
      <br>
      <v-card-title class="pa-2">{{ $store.state.auth.user.name }}</v-card-title>
      <br>
      <br>
      <v-card-title class="pa-2">
        <v-icon>mdi-cog</v-icon>
        Paramètres de votre compte
      </v-card-title>
      <br>

    </v-col>

    <v-divider class="mt-0 mb-3"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Position principale
    </v-card-title>

    <v-row>
       
      <v-col cols="12" class="py-0">
        <v-card-text class="pt-0">
          Accélérez vos prochaines recherches, en enregistrant votre position principale sur la carte.<br><br>
          <!-- - Localisez plus rapidement vos prochaines annonces.<br><br>
          - Vous communiquez vous-même votre adresse à vos acheteurs, via la messagerie privée à votre disposition, lorsque vous êtes sur le point de conclure une vente. -->
        </v-card-text>
        <FormAddress></FormAddress>
      </v-col>

      <v-col cols="12" md="6" class="px-5">
      </v-col>
    </v-row>


    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Activer les notifications par e-mail
    </v-card-title>

    <v-card-text class="pt-0">
      En désactivant les notifications par e-mail, 
      vous ne recevrez plus aucun e-mail concernant votre activité sur la plateforme.
    </v-card-text>

    <v-row>
      <v-col cols="12" class="py-1 mt-3">
        <v-toolbar color="transparent" elevation="0" dense>
          <v-spacer/>
          <v-switch v-model="enableMailNotif" 
                    @change="saveEnableMailNotif()" 
                    label="Activer/Désactiver">
          </v-switch>
        </v-toolbar>
      </v-col>
    </v-row>


    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Modifier votre e-mail
    </v-card-title>

    <v-row>
      <v-col cols="12" class="py-1">
        <v-toolbar color="transparent" elevation="0" dense>
          <v-spacer/>
          <v-btn color="" to="/change-email" outlined>
            <v-icon small class="mr-1">mdi-at</v-icon> 
            Modifier votre adresse e-mail
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Modifier votre mot de passe
    </v-card-title>

    <v-row>
      <v-col cols="12" class="py-1">
        <v-toolbar color="transparent" elevation="0" dense>
          <v-spacer/>
          <v-btn color="" to="/change-password" outlined>
            <v-icon small class="mr-1">mdi-lock</v-icon> 
            Modifier votre mot de passe
          </v-btn>
        </v-toolbar>
      </v-col>
    </v-row>

    <template v-if="$store.state.auth.user.planPaid">
      <v-divider class="mt-8 mb-5"></v-divider>

      <v-card-title class="pt-0">
        <v-icon>mdi-chevron-down</v-icon> Résilier votre abonnement
      </v-card-title>

      <v-card-text class="pt-0 red--text" v-if="$store.state.auth.user.paymentSubscriptionCanceled == true">
        Votre abonnement est actuellement résilié, et court jusqu'au {{ $store.state.auth.user.paymentExpireDate }}
      </v-card-text>

      <v-row v-if="$store.state.auth.user.paymentSubscriptionCanceled != true">
        <v-col cols="12" class="py-1 mb-5">
          <v-toolbar color="transparent" elevation="0" dense>
            <v-spacer/>
            <v-btn color="red" to="/cancel-subscription" outlined>
              <v-icon small class="mr-1">mdi-cancel</v-icon> 
              Résilier votre abonnement
            </v-btn>
          </v-toolbar>
        </v-col>
      </v-row>
    </template>

    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Supprimer votre compte
    </v-card-title>

    <v-row>
      <v-col cols="12" class="py-1 mb-5">
        <v-toolbar color="transparent" elevation="0" dense>
          <v-spacer/>
          <v-btn color="red" to="/delete-account" outlined>
            <v-icon small class="mr-1">mdi-delete</v-icon> 
            Supprimer votre compte
          </v-btn>
        </v-toolbar>
        <br><br><br><br><br><br><br>
      </v-col>
    </v-row>
  </v-card>

</v-col>
</template>


<script>

import axios from "axios"
import WalletCard from '@/components/wallet/WalletCard.vue'
import FormAddress from '@/components/profil/FormAddress.vue'
import ListPropositionsSeller from '@/components/offer/ListPropositionsSeller.vue'
import ListPropositionsBuyer from '@/components/offer/ListPropositionsBuyer.vue'

import Gravatar from 'vue-gravatar'
// import { i18n } from 'vue-lang-router';
import core from '../../plugins/core.js'

export default {
  name: 'home',
  components: {
    WalletCard, 'v-gravatar' : Gravatar, FormAddress, ListPropositionsSeller, ListPropositionsBuyer
  },
  data: () => ({
    search: "",
    amountMin: 0,
    amountMax: 30,
    categoryId: null,
    showPopupCategory: false,
    deleteOfferObj: false,
    showDeleteOffer: false,
    deleteOfferLoading: false,
    errorDeleteOffer: false,
    errorDeleteOfferMsg: '',
    enableMailNotif: true,
  }),
  mounted: async function(){
    this.$store.dispatch('app/incStat', '/profil')
    this.enableMailNotif = this.$store.state.auth.user.enableMailNotif
  },
  methods: {
    async initData(){
    },
    baseUrl(){ return core.baseUrl() },
    offerText(text){
      let txt = text.substr(0, 60)
      return txt + (text.length > 60 ? "..." : "")
    },
    nl2br: function(str){
      var breakTag = '<br>'
      let newStr = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
      let maxLength = 60
      let p = newStr.length > maxLength ? '...' : ''
      newStr = newStr.substr(0, maxLength) + p
      return newStr
    },
    showDeleteOfferObj: function(offer){
      this.deleteOfferObj = offer
      this.showDeleteOffer = true
    },
    hideDeleteOfferObj: function(){
      this.deleteOfferObj = null
      this.showDeleteOffer = false
    },
    deleteOffer: async function(offer){
      //console.log("deleteOffer")
      this.errorDeleteOfferMsg = ''
      this.errorDeleteOffer = false
      this.deleteOfferLoading = true 

      //console.log("try to delete offer", offer._id)
      axios.post('/market/delete-offer/'+offer._id)
            .then((res)=>{
              this.loading = false 
              //console.log("res /market/delete-offer/"+offer._id, res)
              if(res.data.error == false){
                console.log("OFFER DELETED WITH SUCCES", res.data)
                this.showDeleteOffer = false
                this.$store.dispatch('auth/refreshUserData')
                this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'green', 
                                title: "Votre annonce a bien été supprimée",
                                text: '',
                                icon: 'thumb-up' })
              }else{
                this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'green', 
                                title: "Une erreur est survenue pendant la suppression de l'annonce",
                                text: res.data.msg,
                                icon: 'thumb-up' })
              }    
            })

    },
    saveEnableMailNotif: async function(){
      axios.post('/user/set-enable-mail-notif', { enable: this.enableMailNotif })
            .then((res)=>{
              this.loading = false 
              //console.log("res /market/delete-offer/"+offer._id, res)
              if(res.data.error == false){
                console.log("ENABLE NOTIF WITH SUCCES", res.data)
                this.showDeleteOffer = false
                this.$store.dispatch('auth/refreshUserData')
                this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'green', 
                                title: this.enableMailNotif ? "Notifications par e-mail activées" : "Notifications par e-mail désactivées",
                                text: '',
                                icon: 'thumb-up' })
              }else{
                this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'green', 
                                title: "Une erreur est survenue pendant l'enregistrement'",
                                text: res.data.msg,
                                icon: 'thumb-up' })
              }    
            })
    }
  },
  computed: {
  },
  watch: {
      
  }, 
}
</script>
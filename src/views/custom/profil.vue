<template>
<v-col cols="12" sm="11" md="10" lg="7" class="mx-auto" v-if="$store.state.auth.user._id">
  <v-card color="transparent" elevation="0">
    <v-col cols="12" class="text-center">
      
      <v-gravatar height="90" style="border-radius:50%;" class="mt-3"
                  :default-img="'retro'" :email="$store.state.auth.user.name"/>
                  
      <br>

      <v-card-title class="pa-2">{{ $store.state.auth.user.name }}</v-card-title>
      <br>

      <v-chip v-if="$store.state.auth.isLogin" 
              class="mr-3 pa-4" color="secondary" style="font-size:20px; height:36px;">
        <small>Total de vos comptes :</small>
        <b class="ml-2 mr-1 font-righteous">
          {{ $store.getters['auth/amountTotalCurrent'].toFixed(2) }} 
          <small>{{ $store.state.app.monyUnity }}</small> 
        </b>
      </v-chip>

    </v-col>

    <v-divider class="mt-0 mb-3"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Liste de vos comptes
    </v-card-title>

    <v-row class="mx-0">
      <v-col cols="12" md="6" class="">
        <WalletCard :wallet="$store.state.auth.user.walletMain"></WalletCard>
      </v-col>
      <v-col cols="12" v-for="wallet in $store.state.auth.user.walletsDeposit" :key="wallet._id"
            :md="$store.state.auth.user.walletsDeposit.length <= 2 ? 6 : 4" class="">
        <WalletCard :wallet="wallet"></WalletCard>
      </v-col>
    </v-row>
    

    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Propositions envoyées
    </v-card-title>
    
    <v-row>
      <v-col cols="12" v-if="$store.state.auth.user.propositionsSent.length == 0">
        <v-card-subtitle class="pt-0">
          Vous n'avez répondu à aucune annonce
        </v-card-subtitle>
      </v-col>
      <v-col cols="12">
        <ListPropositionsBuyer></ListPropositionsBuyer>
      </v-col>
    </v-row>

    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Propositions reçues
    </v-card-title>
    
    <v-row>
      <v-col cols="12" v-if="$store.getters['auth/myPropositionsReceived'].length == 0">
        <v-card-subtitle class="pt-0">
          Vous n'avez reçu aucune proposition
        </v-card-subtitle>
      </v-col>
      <v-col cols="12">
        <ListPropositionsSeller></ListPropositionsSeller>
      </v-col>
    </v-row>

    <v-divider class="mt-8 mb-5"></v-divider>

    <v-card-title class="pt-0">
      <v-icon>mdi-chevron-down</v-icon> Vos annonces publiées ({{ $store.state.auth.user.offers.length }})
    </v-card-title>
    
      <v-col cols="12" class="py-1" v-if="$store.state.auth.user.offers.length == 0">
        <v-card-subtitle class="pt-0">
          Vous n'avez publié aucune annonce
        </v-card-subtitle>
      </v-col>

      <v-row>
        <v-col cols="12" md="6" class="py-1 px-5" 
                v-for="offer in $store.state.auth.user.offers" :key="offer._id">
          <v-card class="mt-2 mx-3" outlined
                  elevation="0">
            <v-col cols="12" class="d-flex">
              <router-link :to="'/offer/'+offer._id" v-if="offer.gallery && offer.gallery[0]">
                <v-img class="mr-2" :src="baseUrl() + offer.gallery[0]" :max-width="80"></v-img>
              </router-link>

              <router-link style="text-decoration:none; color:unset;font-weight:bold" :to="'/offer/'+offer._id" small text>
                  
                {{ offer.title.substr(0, 60) }}
                {{ offer.title.length > 60 ? "..." : "" }}
                <b class="teal--text font-main p1-2"> • 
                  {{ offer.amountMony }} 
                  {{ $store.state.app.monyUnity }}
                </b>

                <v-card-text class="px-0 py-0" v-html="nl2br(offer.text)"></v-card-text>
              </router-link>
              
            </v-col>

            <v-toolbar dense color="transparent" elevation="0">
              <template v-if="offer.propositions">
                <v-icon small class="mr-1" :color="offer.propositions.length > 0 ? 'orange' : ''">mdi-bell</v-icon> 
                <span :class="offer.propositions.length > 0 ? 'orange--text' : ''">
                  {{ offer.propositions.length }} proposition{{ offer.propositions.length > 1 ? 's' : '' }}
                </span>
              </template>
              <v-spacer></v-spacer>
              <v-btn small text color="orange" class="mr-3 d-none d-sm-flex" 
                    :to="'/edit-offer/' + offer._id">
                <v-icon x-small class="mr-1">mdi-pencil</v-icon> Modifier
              </v-btn>
              <v-btn x-small fab outlined color="" class="mr-3 d-sm-none" 
                    :to="'/edit-offer/' + offer._id">
                <v-icon small color="">mdi-pencil</v-icon>
              </v-btn>
              <v-btn x-small fab outlined color="red" class="mr-3"
                    @click="showDeleteOfferObj(offer)">
                <v-icon small color="">mdi-delete</v-icon>
              </v-btn>
              <v-btn x-small fab elevation="0" outlined title="afficher l'annonce" :to="'/offer/'+offer._id">
                <v-icon  color="">mdi-eye</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog v-model="showDeleteOffer" max-width="500">
        <v-card v-if="deleteOfferObj != null" style="border:3px solid #f44336">
          <v-toolbar color="transparent" elevation="0">
            <v-icon small class="pr-1">mdi-delete</v-icon> Voulez vous vraiment supprimer cette annonce ?
            <v-spacer/>
            <v-btn fab outlined small @click="hideDeleteOfferObj">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-col cols="12" class="py-0" v-if="deleteOfferObj != false">
            <b class="pl-5 ml-1">
              {{ deleteOfferObj.title.substr(0, 60) }}
              {{ deleteOfferObj.title.length > 60 ? "..." : "" }}
            </b>
            <b class="teal--text font-main"> • 
              {{ deleteOfferObj.amountMony }} 
              {{ $store.state.app.monyUnity }}
            </b>
          </v-col>
          <v-toolbar color="transparent" elevation="0">
            <v-spacer/>
            <v-btn elevation="0" @click="hideDeleteOfferObj" class="mr-3">Annuler</v-btn>
            <v-btn elevation="0" color="red" dark @click="deleteOffer(deleteOfferObj)">Oui, supprimer</v-btn>
          </v-toolbar>
        </v-card>
      </v-dialog>

      <v-col cols="12" class="py-1 pt-5 mb-5 pb-5">
        <v-toolbar color="transparent" elevation="0" dense>
          <v-spacer/>
          <v-btn color="orange" to="/publish-offer" outlined
                :disabled="!$store.state.auth.user.isActive || !$store.state.auth.user.planPaid">
            <v-icon small class="mr-1">mdi-pencil</v-icon> 
            Publier une annonce
          </v-btn>
        </v-toolbar>
      </v-col>

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
    
  }),
  mounted: async function(){
    this.$store.dispatch('app/incStat', '/profil')
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

    }
  },
  computed: {
  },
  watch: {
      
  }, 
}
</script>
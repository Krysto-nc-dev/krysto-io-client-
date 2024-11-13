<template>
<div class="bg-brilliant">
  <div style="min-height:800px;">
    <v-col cols="12" sm="9" md="6" lg="5" 
          class="mx-auto" style="padding-top:80px;padding-bottom:150px;max-width:500px;">

      <v-col cols="12" class="px-0">
        <v-btn outlined color="grey" small to="/profil">
          <v-icon small>mdi-arrow-left icon outlined</v-icon> Retour
        </v-btn>
      </v-col>

      <v-card elevation="0" outlined>

      <v-col cols="12">
        <v-card-title class="red--text">
          <v-icon class="mr-2" color="red">mdi-cancel</v-icon> Résilier votre abonnement ?
        </v-card-title> 

        <v-card-text>
          Vous conserverez l'accès à votre compte jusqu'au : {{ $store.state.auth.user.paymentExpireDate }}
          <br><br>
          Passé cette date, votre compte sera automatiquement effacé.
          <br><br>
          Plus aucun règlement ne sera prélevé sur votre carte.
          <br><br>
        </v-card-text>
        

          <v-alert v-if="$store.state.auth.login.error != null" 
                   dense dark color="red" class="mt-3 text-center">
                   <v-icon small>mdi-alert</v-icon>
            {{ errorMsg[$store.state.auth.login.error] }}
          </v-alert>

          <v-alert v-if="errorCancelSubscription != ''" 
                   dense dark color="red" class="mt-3 text-center">
            <v-icon small>mdi-alert</v-icon>
            <template v-if="errorCancelSubscription == 'ERROR'">
              Désolé, une erreur est survenue
            </template>
          </v-alert>

          <v-toolbar dense elevation="0" color="transparent">
            <v-spacer/>
            <v-btn elevation="0" to="/profil" class="mr-2" dark>
              Annuler
            </v-btn>

            <v-btn elevation="0" color="red" @click="cancelSubscription" :loading="loading" dark>
              <v-icon small>mdi-check</v-icon> Résilier mon abonnement
            </v-btn>
          </v-toolbar>

      </v-col>

    </v-card>
    </v-col>
  </div>
  <v-col cols="12" class="pa-0">
    <Footer/>
  </v-col>
</div>
</template>

<script>

import router from '../../router/router'
import Footer from '@/components/main-layout/Footer.vue'
import Login from '@/components/main-layout/Login.vue'
import axios from 'axios'

export default {
  name: 'change-password',
  components: {
    Login, Footer
  },
  data: () => ({
    errorCancelSubscription: '',
    loading: false,
    
  }),
  methods: {
    async cancelSubscription(){
        console.log("cancelSubscription")
        this.errorCancelSubscription = ''
       
        this.loading = true 

        axios.post('/pay/cancel-subscription')
              .then((res)=>{
                this.loading = false 
                console.log("res /pay/cancel-subscription", res)
                if(res.data.error == false){
                  console.log("SUBSCRIPTION CANCELED WITH SUCCES", res.data)
                  this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'green', 
                                title: "Votre abonnement a été résilié",
                                text: 'Votre compte sera supprimé dès la fin de la période en cours',
                                icon: 'thumb-up' })
                  router.push("/profil")
                }else{
                  this.errorCancelSubscription = res.data.errorMsg
                }    
              })

    }
  }
}
</script>

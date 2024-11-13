<template>
<v-row class="mt-5 px-5">

  <v-col cols="12" sm="12" md="6" lg="5" class="ml-auto my-5">
      <v-alert outlined color="red" icon="mdi-credit-card-settings-outline">
        <b>Abonnement suspendu</b><br>
        Procéder au paiement de votre abonnement, pour accéder à l'ensemble des services actuellement bloqués :
        <br><br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Gérer votre compte courant<br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Gérer votre compte de dépôts<br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Publier des annonces<br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Répondre aux annonces<br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Payer en òto<br>
        <v-icon small color="red lighten-2">mdi-lock</v-icon> Echanger des òto<br>
      </v-alert>
  </v-col>
  <v-col cols="12" sm="12" md="5" lg="4" class="mr-auto">
    <PlanCard :plan="$store.state.auth.user.plan" :selected="true"></PlanCard>
    <br>
    <v-btn block color="blue" elevation="0" dark 
          @click="$store.dispatch('pay/startPaiement', { userId: $store.state.auth.user._id, 
                                                        stripePriceId: $store.state.auth.user.plan.stripeId })">
      <v-icon small>mdi-credit-card-settings-outline</v-icon>
      Payer maintenant
    </v-btn> 
    <br>
    <v-btn block to="/market" outlined elevation="0">
      <v-icon>mdi-arrow-left</v-icon> Retour
    </v-btn>
    <br><br><br>
  </v-col>
  
</v-row>
</template>

<style></style>

<script>

//import axios from 'axios'
//import router from '../router/router'
//import core from '../plugins/core.js'

//import Post from '@/components/Post.vue'
import PlanCard from '@/components/main-layout/PlanCard.vue'

export default {
  name: 'payplan',
  components: { PlanCard },
  data: () => ({
    
    
  }),
  async mounted(){
    
  },
  methods: {
    

  },
  computed: {
    
    
  }
}
</script>

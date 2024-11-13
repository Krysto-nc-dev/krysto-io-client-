<template>
<v-col sm="10" md="7" lg="6" class="mx-auto my-5">
  <v-card elevation="0" outlined>
    <v-col>
      <h2 class="red--text text--darken-2">
        <v-icon color="red darken-2">mdi-plus-circle</v-icon> 
        Publier votre première annonce !
      </h2>
      <v-card-text>
        Vous bénéficiez d'un abonnement PREMIUM, gratuit à vie, vous donnant un accès illimité aux services {{ $store.state.app.siteName }}.
        <br><br>
        Comme précisé lors de votre inscription, la seule condition à remplir pour activer totalement votre compte PREMIUM,
        est de publier au minimum <b>une</b> annonce, afin de garantir un plus large choix d'annonces à tous ceux qui s'inscriront après vous.
        <br><br>
        Nous vous invitons donc à publier au plus vite votre première annonce, afin de pouvoir enfin profiter de l'ensemble des services de la plateforme.
        <br><br>
        <v-divider/>
        <br>
        Vous disposez d'un délais de 7 jours pour publier votre première annonce.<br><br class="d-sm-none">
        Passé ce délais, votre compte sera supprimé automatiquement.<br><br>
        <v-divider/>
        <br>
        Merci de votre compréhension.
        <br>
        <br>
      </v-card-text>
      <v-btn  to="/market" text>
        <v-icon small>mdi-arrow-left</v-icon>
        Retour
      </v-btn>
      <v-btn color="amber darken-2" class="ml-2" outlined to="/publish-offer">
        <v-icon>mdi-plus-circle</v-icon>
        Publier une annonce
      </v-btn>
    </v-col>
  </v-card>
</v-col>
</template>

<style></style>

<script>

//import axios from 'axios'
//import router from '../router/router'
//import core from '../plugins/core.js'

//import Post from '@/components/Post.vue'

export default {
  name: 'plan-fst-offer',
  components: {  },
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

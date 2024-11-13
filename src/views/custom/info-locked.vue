<template>
<v-col sm="10" md="7" lg="6" class="mx-auto my-5">
  <v-card elevation="0" outlined>
    <v-col>
      <h2 class="red--text text--darken-2">
        <v-icon color="red darken-2">mdi-lock</v-icon> 
        Votre compte n'a pas encore été activé.
      </h2>
      <v-card-text>
        L'activation de votre compte se fera de façon automatique, à 4h du matin, le jour suivant votre inscription.
        <br><br>
        Dès que votre compte sera activé, vous pourrez enfin utiliser l'ensemble des services de la plateforme, sans restriction.
        <br><br>
        <v-divider/><br>
        <b>Pourquoi votre compte n'est pas activé tout de suite ?</b><br><br>
        Pour des raisons mathématiques, l'activation de tous les comptes doit se faire en même temps, afin de conserver l'équilibre de la monnaie.
        <br><br>
        Pour faire simple : les òto créés pour les nouveaux inscrits doivent être pris en compte dans le calcul de la masse monétaire totale, qui détermine la valeur relative d'1 òto.
        <br><br>
        Les nouveaux comptes sont intégrés à ce calcul, chaque jour, au moment où le processus de création monétaire est executé.
      </v-card-text>
      <v-btn block elevation="0" color="primary" to="/market">
        <v-icon>mdi-arrow-left</v-icon>
        Retour
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
  name: 'locked',
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

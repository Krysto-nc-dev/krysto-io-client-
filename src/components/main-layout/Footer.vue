<template>
  <v-footer color="primary darken-2" dark min-height="300">
    <v-row
      justify="center"
      no-gutters
    >
    <v-col cols="12" md="8" class="text-center">
      <v-btn class="ma-1" text rounded to="/">Accueil</v-btn>
      <v-btn class="ma-1" text rounded to="/team">Qui sommes-nous ?</v-btn>
      <v-btn class="ma-1" text rounded to="/register">S'inscrire</v-btn>
      <v-btn class="ma-1" text rounded to="/login">Se connecter</v-btn>
      <br class="d-none d-sm-inline">
      <v-btn class="ma-1" text rounded to="/contact">Contact</v-btn>
      <v-btn class="ma-1" text rounded to="/faq">FAQ</v-btn>
      <v-btn class="ma-1" text rounded to="/cgu">CGU</v-btn>
      <v-btn class="ma-1" text rounded to="/cgv">CGV</v-btn>
    </v-col>
    
    <v-col cols="12" class="text-center" style="font-size:25px;">
      <br>
      <span class="font-main " style="font-size:50px;font-weight:800!important;">krup</span>.nc
    </v-col>

    </v-row>
  </v-footer>
</template>

<script>

//import router from '../../router/router'

export default {
  name: 'pix-footer',

  data: () => ({
  }),
  
  mounted: function(){
  },
  
  methods: {
  },

  computed:{
  }
    
};
</script>

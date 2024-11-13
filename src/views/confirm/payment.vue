<template>
  <v-col cols="12" sm="11" md="8" lg="6" class="mx-auto text-center mt-5 font-main">
    <v-card elevation="0" outlined>
      <v-col class="text-center" cols="12">
        
        <v-card-title class="green--text">
          <v-icon x-large style="border:1px solid #4CAF50; border-radius:100%; padding:14px;" color="green">mdi-check</v-icon>
          <br>Paiement effectué
        </v-card-title>

        <v-divider/><br>
        
        Le paiement s'est déroulé correctement.<br>
        Vous pouvez maintenant accéder à tous les services {{ $store.state.app.siteName }} !
        <br>
        <br>
        <v-toolbar dense elevation="0">
          <v-spacer/>
          <v-btn elevation="0" :to="$store.state.auth.user.name != null ? '/market' : '/login'" color="blue" dark>Continuer <v-icon>mdi-arrow-right</v-icon></v-btn>
        </v-toolbar>

      </v-col>
    </v-card>
  </v-col>
</template>

<script>

export default {
  name: "confirm-email",
  components: {
    
  },
  data: function () {
      return {
        user: null,
        loading: true
      };
  },
  mounted: async function(){
    
  },
  methods: {

     

  },
  computed:{
    
  }
};
</script>

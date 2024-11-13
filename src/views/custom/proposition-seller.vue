<template>
  <v-col cols="12" sm="11" md="10" lg="7" class="mx-auto" v-if="$store.state.auth.user._id">
    <v-card-title class="pt-0 mt-5">
      <v-icon>mdi-chevron-down</v-icon> 
      Propositions reçues ({{ $store.getters['auth/myPropositionsReceived'].length }})
    </v-card-title>
    
    <v-row>
      <v-col cols="12" v-if="$store.getters['auth/myPropositionsReceived'].length == 0">
        <v-card-subtitle class="pt-0">
          Aucune proposition en attente
        </v-card-subtitle>
      </v-col>
      <v-col cols="12">
        <ListPropositionsSeller></ListPropositionsSeller>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>

import ListPropositionsSeller from '@/components/offer/ListPropositionsSeller.vue'


export default {
  name: 'home',
  components: {
    ListPropositionsSeller
  },
  data: () => ({
  }),
  mounted: async function(){
  },
  methods: {
  },
  computed: {
  },
  watch: {
      
  }, 
}
</script>
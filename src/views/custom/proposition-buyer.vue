<template>
  <v-col cols="12" sm="11" md="10" lg="7" class="mx-auto" v-if="$store.state.auth.user._id">
    <v-card-title class="pt-0 mt-5">
      <v-icon>mdi-chevron-down</v-icon> Propositions envoyées ({{ $store.getters['auth/myPropositionsSent'].length }})
    </v-card-title>
    
    <v-row>
      <v-col cols="12">
        <v-card-subtitle class="pt-0" v-if="$store.getters['auth/myPropositionsSent'] == 0">
          Vous n'avez répondu à aucune annonce
        </v-card-subtitle>
      </v-col>
      <v-col cols="12">
        <ListPropositionsBuyer></ListPropositionsBuyer>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>

import ListPropositionsBuyer from '@/components/offer/ListPropositionsBuyer.vue'


export default {
  name: 'home',
  components: {
    ListPropositionsBuyer
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
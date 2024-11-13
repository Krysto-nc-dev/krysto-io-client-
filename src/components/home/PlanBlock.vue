<template>
<v-row style="" class="section bg-brilliant" v-if="!$store.state.auth.isLogin">
  <v-col cols="12" sm="12" md="8" style="max-width:900px;" class="px-0 text-center mx-auto">
    <div class="s-main-title font-main pb-5" id="section-tarif">
      Choisissez votre formule...
      <div class="s-main-text font-main pb-0 amber--text text--darken-2">
          <b>Inscription gratuite</b><br>
          pour les <b class="pr-1">{{($store.state.app.limitForFreePlan) }}</b> 
          <div class="d-inline-block">premiers utilisateurs !</div>
      </div>
      <div class="s-main-text font-main pb-0">
        Pour accéder à tous les services et recevoir vos {{ $store.state.app.siteName }} tous les jours,
        inscrivez-vous en choisissant parmis les formules suivantes :
      </div>
    </div>
  </v-col>

  <v-col cols="12" sm="12" md="12" lg="10" class=" mx-auto" style="padding-bottom:100px;">
    <v-row>
      <template v-for="plan in $store.state.app.data.plan">
        <v-col cols="12" md="4" lg="4" class="text-center mx-auto font-main px-5 px-md-3" :key="plan._id"
                v-if="plan.type != 'free' || ($store.state.app.nbUsersTotal < $store.state.app.limitForFreePlan)">
          <PlanCard :plan="plan"></PlanCard>
        </v-col>
      </template>
    </v-row>
  </v-col>
</v-row>
</template>

<script>
import PlanCard from '@/components/main-layout/PlanCard.vue'

export default {
  name: 'plancard',
  components: {
   PlanCard
  },
  data: () => ({
    
  })
}
</script>

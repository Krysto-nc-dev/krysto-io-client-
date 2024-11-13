<template>
<v-row class="mx-0">
  <!-- <template v-if="planKeyIsValid"> -->
    <v-col cols="12" sm="6" md="5" lg="3" class="mx-auto col-form-register text-center" style="">
      <Register></Register>
    <!-- </v-col> -->
    <!-- <v-col cols="12" sm="5" md="5" lg="4" class="mr-auto mt-5">
      <h2 class="mb-3"><v-icon>mdi-chevron-down</v-icon> Formule choisie</h2>
      <template v-for="plan in $store.state.app.data.plan">
        <template v-if="plan.key == $route.params.planKey">
          <PlanCard :key="plan._id" :plan="plan" :selected="true"></PlanCard>
        </template>
      </template>
    </v-col> -->
    <!-- <v-col cols="12" md="8" class="mt-5 mx-auto text-center" style="padding-bottom: 100px;"> -->
      <v-divider/><br>
      Vous avez déjà un compte ?<br>
      <v-btn class="mt-3" outlined color="secondary" to="/login">
        <v-icon>mdi-login</v-icon> Connectez-vous
      </v-btn>
      <br><br><br>
    </v-col>
  <!-- </template> -->
  <!-- <template v-else>
    <v-col cols="12" class="mx-auto">
      <PlanBlock/>
    </v-col>
  </template> -->

    <v-col cols="12" class="pa-0">
      <Footer/>
    </v-col>

</v-row>
</template>

<script>

import '@/assets/css/home.css';

import Footer from '@/components/main-layout/Footer.vue'
import router from '../router/router'
import axios from 'axios'

const config = require('../config/' + process.env.NODE_ENV)
import Register from '@/components/main-layout/Register.vue'
import PlanCard from '@/components/main-layout/PlanCard.vue'
import PlanBlock from '@/components/home/PlanBlock.vue'

export default {
  name: 'register',
  components: {
    Register, PlanCard, PlanBlock, Footer
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    showpwd: false,
    errorRegister: false,
    rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 caractères',
          minName: v => v.length >= 3 || 'Min 3 caractères',
        },
  }),
  mounted: async function(){

    this.$store.dispatch('app/incStat', '/register')

    //console.log("config.enableRegisterAdmin", config, config.enableRegisterAdmin)
    if(config.enableRegisterUser == false) 
      router.push('/login')
    
    this.$store.dispatch('app/fetchNbUsersTotal')

    await this.$store.dispatch('app/fetchEntities', { entityType: 'plan', 
                                                      query : { "isActive": true },
                                                      sort: { position: 1 } 
                                                    })


    let planExist = false
    this.$store.state.app.data.plan.forEach(plan => {
      if(this.$route.params.planKey == plan.key) planExist = true
    })
    //si le plan indiqué dans l'url n'existe pas, et qu'il n'est pas vide : retourne sur l'acueil
    if(!planExist && this.$route.params.planKey != null) 
      router.push('/register')
  },
  methods: {
    async register(){
      //console.log("try to register", this.name, this.email, this.password)
      const res = await axios.post('/auth/register', 
                                    { name: this.name,
                                      email: this.email,
                                      password: this.password
                                    })
      //console.log("res /auth/register", res)
      if(res.data.error == false){
        //console.log("USER SAVED WITH SUCCES", res.data)
        this.errorRegister = false
        router.push('/login');
      }else{
        this.errorRegister = res.data.msg
      }
    }
  },
  computed: {
    // planKeyIsValid: function(){ 
    //   if(this.$store.state.app.data.plan.length == 0) return true 

    //   let planExist = false
    //   this.$store.state.app.data.plan.forEach(plan => {
    //     if(this.$route.params.planKey == plan.key) planExist = true
    //   })
    //   return planExist
    // }
  }
}
</script>

<template>
<div class="bg-brilliant">
  <div style="min-height:800px;">
    <v-col cols="12" sm="7" md="5" lg="4" 
          class="mx-auto" style="padding-top:80px;">
      <Login></Login>
    </v-col>
  </div>
  <v-col cols="12" class="pa-0">
    <Footer/>
  </v-col>
</div>
</template>

<script>

//import router from '../router/router'
import Footer from '@/components/main-layout/Footer.vue'
import Login from '@/components/main-layout/Login.vue'

export default {
  name: 'login',
  components: {
    Login, Footer
  },
  data: () => ({
    email: '',
    password: '',
    resColor: '',
    resMsg: '',
    showpwd: false
  }),
  async mounted(){
    this.$store.dispatch('app/incStat', '/login')
  },
  methods: {
    async login(){
      try{
        console.log("login")
        await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })        
      } catch(err) {
          console.log('Cannot login user. Error:', err)       
      }

    }
  }
}
</script>

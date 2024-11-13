<template>
<div>
    <router-link to="/">
      <v-img src="../../assets/img/homepage/krup_logo2.png" class="mx-auto" width="250"/>
    </router-link>

    <v-card elevation="0" class="mt-5" outlined style="border:2px solid rgb(75, 179, 154);">

      <v-col cols="12" class="text-center">
        <v-card-title><v-icon class="mr-2">mdi-login</v-icon> Se connecter</v-card-title> 
        <!-- <v-card-subtitle></v-card-subtitle> -->
        <v-form @submit.prevent="login">

          <v-text-field outlined v-model="email" id="email" label="E-mail" @keyup.enter.exact="login()"></v-text-field>
          <v-text-field outlined v-model="password" id="password" label="Mot de passe"
                        :append-icon="showpwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showpwd ? 'text' : 'password'"
                        @click:append="showpwd = !showpwd"
                        @keyup.enter.exact="login()"
          ></v-text-field>
          <v-alert v-if="$store.state.auth.login.error != null" 
                   dense dark color="red" class="mt-3 text-center">
                   <v-icon small>mdi-alert</v-icon>
            {{ errorMsg[$store.state.auth.login.error] }}
          </v-alert>

          <v-btn class="my-2 mx-auto" elevation="0" block v-if="$store.state.auth.login.error == 'PLAN_ERROR' && user != null"
                 large color="blue" dark @click="$store.dispatch('pay/startPaiement', { userId: user._id, stripePriceId: user.plan.stripeId })">
            <v-icon class="mr-1">mdi-credit-card-fast-outline</v-icon> 
            <b>Payer mon abonnement</b>
          </v-btn>

          <v-btn class="white--text" color="secondary" @click="login" block elevation="0">
            <v-icon>mdi-login</v-icon> Se connecter
          </v-btn>

        </v-form>
      </v-col>

    </v-card>

    <br>
    <v-col cols="12" class="text-center">
      <v-btn to="/reset-password" style="text-transform:none;" text  class="mb-3" >
        Mot de passe oublié ?
      </v-btn>
      <v-divider class="mb-3"/>
      Vous n'êtes pas encore inscrit ?<br>
        <v-card-subtitle class="font-main primary--text">
          <v-icon color="primary">mdi-check</v-icon>
          Inscription 100% gratuite
        </v-card-subtitle>
      <v-btn class="" outlined color="secondary" rounded to="/register">
        <v-icon>mdi-account-plus</v-icon> Créer mon compte
      </v-btn>


    </v-col>

</div>
</template>

<script>

//import router from '../router/router'

export default {
  name: 'Login',
  components: {
  },
  data: () => ({
    email: '',
    password: '',
    user: null,
    resColor: '',
    resMsg: '',
    showpwd: false,
    errorMsg: {
      "PWD_FAILED"        : "Mot de passe incorrect",
      "EMAIL_NOT_FOUND"   : "Adresse e-mail inconnue",
      "PLAN_ERROR"        : "Merci de procéder au règlement de votre abonnement",
      "EMAIL_NOT_CHECKED" : "Adresse e-mail non vérifiée. Veuillez consulter votre boîte mail, et cliquer sur le lien de validation que nous vous avons envoyé. Merci",
      "LOGIN_ERROR"       : "Compte introuvable",
      "ACCOUNT_LOCKED"    : "Votre compte a été bloqué par les modérateurs pour non-respect des conditions d'utilisations",
      "ACCOUNT_DELETED"   : "Ce compte a été supprimé par son propriétaire. Il ne peut plus être utilisé."
    }
  }),
  methods: {
    async login(){
      try{
        console.log("login")
        let user = await this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password
        })
        console.log("user", user)
        if(user != null) this.user = user
      } catch(err) {
          console.log('Cannot login user. Error:', err)       
      }

    }
  },
}
</script>

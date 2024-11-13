<template>
<div>

    <router-link to="/">
      <v-img src="../../assets/img/homepage/krup_logo2.png" class="mx-auto" width="250"/>
    </router-link>

    <v-card elevation="0" class="mt-5" outlined style="border:2px solid rgb(75, 179, 154)">
        
      <v-col cols="12">
        <v-card-title class="font-main secondary--text">
          <v-icon color="secondary" class="mr-2">mdi-account-plus</v-icon> 
          S'inscrire
        </v-card-title> 

        <v-divider/>

        <v-card-subtitle class="font-main primary--text">
          <v-icon color="primary">mdi-check</v-icon>
          Inscription 100% gratuite
        </v-card-subtitle>

        <v-form @submit.prevent="register">

          <v-text-field outlined v-model="name" id="name" label="Nom d'utilisateur" 
                        :rules="[rules.required, rules.minName]" 
                        :error="errorRegister == 'USERNAME_EXISTS'"></v-text-field>

          <v-text-field outlined v-model="email" id="email" label="E-mail" 
                        :rules="[rules.required]"
                        :error="errorRegister == 'EMAIL_EXISTS'"></v-text-field>

          <v-text-field outlined v-model="password" id="password" label="Mot de passe" 
                        :append-icon="showpwd ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="showpwd ? 'text' : 'password'"
                        hint="Au moins 8 caractères"
                        counter
                        @click:append="showpwd = !showpwd"
                        @keyup.enter.exact="showDialogCaptcha()"
          ></v-text-field>

          <v-alert dense color="" outlined class="text-center">
            <small>
              <b>
                <v-icon small color="">mdi-alert</v-icon> version beta : {{ $store.state.app.siteName }} est encore en phase de test
                <!-- {{ $store.state.app.siteName }} est encore en phase de test -->
              </b>
              <v-btn color="" @click="showDialogBeta = true" outlined rounded small class="ml-4">
                  En savoir plus >
                </v-btn>
              <!-- <v-toolbar height="40" elevation="0" color="transparent">
                
                <v-spacer/>
                <v-btn color="" @click="showDialogBeta = true" outlined rounded small class="ml-4">
                  En savoir plus
                </v-btn>
                <v-spacer/> -->
              <!-- </v-toolbar> -->
              
            </small>
          </v-alert>

          <v-alert v-if="errorRegister != false" 
                   dense dark color="red" class="mt-3 mb-0 text-center">
            <v-icon small>mdi-alert</v-icon>
            <template v-if="errorRegister == 'ACCOUNT_DELETED'">Cette adresse e-mail a déjà été utilisée</template>
            <template v-if="errorRegister == 'EMAIL_EXISTS'">Cette adresse e-mail est déjà utilisée</template>
            <template v-if="errorRegister == 'USERNAME_EXISTS'">Ce nom d'utilisateur est déjà utilisé</template>
            <template v-if="errorRegister == 'CAPTCHA_FAILED'">Captcha invalide</template>
          </v-alert>

        </v-form>
      </v-col>
          
      <v-card-actions>
        <v-spacer/>
          <v-btn class="white--text" :loading="$store.state.auth.register.loading" 
                 color="secondary" @click="showDialogCaptcha()" block elevation="0">
            <v-icon>mdi-account-plus</v-icon> Créer mon compte
          </v-btn>
      </v-card-actions>
    </v-card>

    <div class="pa-3 mt-2 text-center">
      <!-- <v-checkbox dense v-model="chk" class="d-inline-block ml-2" color="indigo" style="margin-right:-10px;"></v-checkbox>  -->
      En créant votre compte,<br>vous acceptez les 
      <router-link to="/cgu" target="_blank">CGU</router-link> et <router-link to="/cgv" target="_blank">CGV</router-link>
    </div>

    <DialogCaptcha :actionSuccess="register"/>

    <!-- DIALOG PROPOSITION -->
      <v-dialog v-model="showDialogBeta" transition="dialog-top-transition"
                max-width="640" :fullscreen="$vuetify.breakpoint.width < 600"
                content-class="dialog-large-bordered">
          <v-card elevation="0" style="border-radius:0;">

            <v-toolbar color="" elevation="0" dense>
              <v-icon small color="red" class="pr-1">mdi-beta</v-icon> 
              <b class="red--text">Période de lancement = Version Beta</b>
              <v-spacer></v-spacer>
              <v-btn x-small fab outlined elevation="0" @click="showDialogBeta = false">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-col cols="12">
              <v-divider class=""></v-divider>
              <v-card-title class="red--text">
                <v-icon color="red">mdi-alert</v-icon> <small>Avertissement : </small> 
              </v-card-title>

              <v-divider class="mt-2"></v-divider>

              <v-card-text color="teal">
                La plateforme {{ $store.state.app.siteName }} est ouverte depuis le 8 mars 2023, et n'a encore jamais été testée en condition réelle, à grande échelle.
                C'est pourquoi nous considérons qu'elle est encore en phase de test, 
                et que nous ne pouvons garantir à 100% la stabilité du système à court terme.
                <br><br>
                Cependant, nous considérons que l'application a suffisament été testée et sécurisée pour pouvoir être mis en ligne, afin de recevoir ses premiers utilisateurs.
                <br><br>
                <b>A ce jour, la plateforme est stable, et tout semble fonctionner correctement.</b>
                Mais la seule façon d'en être totalement certains, est de passer maintenant à la phase d'utilisation.
                <br><br>
                
                <v-divider class="mt-2"></v-divider>

                <br>
                Durant toute la période de lancement, en cas de bug majeur, et si nous y sommes contraint,
                il est encore possible que l'ensemble des données soient remises à zéro, et que vos comptes soient effacés.
                <br><br>
                Bien sûr, nous espérons que cela n'arrivera pas, et nous mettrons tout en oeuvre pour ne rencontrer aucun problème majeur,
                mais il nous semblait important de vous en informer préalablement à votre inscription.
                <br><br>
                Cependant, l'intégralité des données sont bien évidemment enregistrées et sauvegardées 
                de façon sécurisée sur de multiples supports, 
                afin de pouvoir rétablir ces données en cas de problème grave.
                Dans ce cas, il est donc prévu en théorie que vos données soient rétablies rapidement et sans pertes, dans la mesure du possible.
                <br><br>
                Merci de votre compréhension.
              </v-card-text>

              <v-toolbar color="" elevation="0" dense>
                <v-spacer></v-spacer>
                <v-btn  outlined elevation="0" @click="showDialogBeta = false">
                  <v-icon small>mdi-close</v-icon> Fermer
                </v-btn>
              </v-toolbar>

            </v-col>
          </v-card>
      </v-dialog>
      
</div>
</template>

<script>

import router from '../../router/router'
import axios from 'axios'

import DialogCaptcha from '@/components/main-layout/DialogCaptcha.vue'

//const config = require('../../config/' + process.env.NODE_ENV)

export default {
  name: 'register',
  components: {
    DialogCaptcha
  },
  data: () => ({
    name: '',
    email: '',
    password: '',
    showpwd: false,
    errorRegister: false,
    chk: true,
    showDialogBeta: false,
    rules: {
          required: value => !!value || 'Champs obligatoire',
          min: v => v.length >= 8 || 'Min 8 caractères',
          minName: v => v.length >= 3 || 'Min 3 caractères',
        },
  }),
  mounted: function(){
    
  },
  methods: {
    showDialogCaptcha(){
      //if(this.$refs.formContact.validate())
      this.$store.dispatch('captcha/setShowDialog', true)
    },
    async register(answerCaptcha){
      //console.log("try to register", this.name, this.email, this.password)
      //if(!this.chk) return 

      const res = await axios.post('/auth/register', 
                                    { name: this.name,
                                      email: this.email,
                                      password: this.password,
                                      planKey: "premium",
                                      captcha: {
                                        answer: answerCaptcha,
                                        sessionid: this.$store.state.captcha.session.sessionid
                                      }
                                    })
      console.log("res /auth/register", res)
      if(res.data.error == false){
        console.log("USER SAVED WITH SUCCES", res.data)
        this.errorRegister = false
        this.$store.dispatch('app/openDialogMailDev', res.data.emailParams)
        router.push('/confirm-register');
      }else{
        this.errorRegister = res.data.msg
      }
    }
  }
}
</script>

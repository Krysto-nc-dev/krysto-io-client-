<template>
<div class="main-bg-rebel bg-brilliant">
  <v-col cols="12" sm="10" md="8" lg="6" class="mx-auto pa-5 pt-sm-5">
    <v-card elevation="0" color="" class="mt-sm-5 px-3" outlined>
      <v-col cols="12" class="pa-0 pa-sm-5">
        <v-card-title>Contact</v-card-title>
        <v-card-subtitle>Envoyer un message aux administrateurs de la plateforme</v-card-subtitle>

        <v-divider class="" v-if="false"/>
        
          <div class="d-flex" v-if="false">
            <span class="text-center mt-5">
              <v-img  height="80" width="80" 
                      style="border-radius:100%" 
                      src="../assets/img/homepage/tristan.png"></v-img>
              
              <b>Tristan</b>
            </span>
            <v-card-text style="font-size:16px!important;">
              Développeur indépendant depuis de nombreuses années, 
              j'ai créé {{ $store.state.app.siteName }} parce que je suis convaincu que ce système monétaire équitable
              peut être d'une grande utilité pour un grand nombre de personnes aujourd'hui.
              <br><br>
              Le pouvoir d'achat est l'un des problèmes majeurs de notre époque.
              {{ $store.state.app.siteName }} est une vraie solution pour compléter les revenus de tout le monde équitablement,
              tout en favorisant les échanges à l'échelle locale.
              
              <br><br>
              
              Je suis à ce jour le seul responsable de la plateforme. 
              Mais si vous êtes nombreux à l'utiliser dans les mois qui viennent, 
              il est possible que l'équipe s'agrandisse prochainement, pour faire vivre le projet !
              
            </v-card-text>
          </div>

        <v-divider class="mb-5"/>

        <template v-if="!emailSent">
          <!-- <v-card class="pa-5" color="" > -->
          <v-form ref="formContact">
            <v-text-field v-model="message.name"    :rules="[rules.requiredName]"     outlined label="Votre nom"></v-text-field>
            <v-text-field v-model="message.email"   :rules="[rules.requiredEmail]"    outlined label="Votre adresse e-mail"></v-text-field>
            <v-textarea   v-model="message.message" :rules="[rules.requiredMessage]"  outlined label="Votre message..." rows="10"></v-textarea>
          </v-form>

          <v-row class="pb-5">
            <v-toolbar dense color="transparent" elevation="0">
              <v-spacer/>
              <v-btn color="blue" elevation="0" dark @click="showDialogCaptcha()">
                <v-icon class="mr-1">mdi-mail</v-icon> Envoyer
              </v-btn>
            </v-toolbar>
          </v-row>
          <!-- </v-card> -->
        </template>
        <template v-else>
          <v-card class="text-center pa-5" elevation="0" outlined>
            <v-icon class="mr-1">mdi-check</v-icon> Votre message a bien été envoyé !<br>
            <v-btn class="my-2 mx-auto" large color="blue" elevation="0" dark to="/market">
              <b>Retourner vers la boutique</b>
              <v-icon class="mr-1">mdi-arrow-right</v-icon> 
            </v-btn>
          </v-card>
        </template>
      </v-col>
    </v-card>
    <span class="d-none d-sm-inline">
    <br><br><br><br><br>
    </span>
  </v-col>

  <v-col class="pa-0">
    <Footer/>
  </v-col>

  <DialogCaptcha :actionSuccess="sendMessage"/>
  
</div>
</template>


<script>
//import core from '../../plugins/core.js'
import axios from "axios"
//import router from "@/router/router"

import DialogCaptcha from '@/components/main-layout/DialogCaptcha.vue'
import Footer from '@/components/main-layout/Footer.vue'

export default {
    name: "dialog-product",
    components: {
      DialogCaptcha, Footer
    },
    props: ['product'],
    data: function () {
        return {
          emailSent: false,
          message : {
            name: '',
            email: '',
            message: ''
          },
          rules: {
            requiredName: value => !!value || "Merci d'indiquer votre nom",
            requiredEmail: value => !!value || "Merci d'indiquer votre adresse e-mail",
            requiredMessage: value => !!value || "Message vide",
          }
        };
    },
    mounted: function(){
    },
    methods: {
      showDialogCaptcha(){
        if(this.$refs.formContact.validate())
        this.$store.dispatch('captcha/setShowDialog', true)
      },
      async sendMessage(answerCaptcha){
        const { data } = await axios.post('/admin/send-mail-contact',
                                        { message: this.message,
                                          captcha: {
                                            answer: answerCaptcha,
                                            sessionid: this.$store.state.captcha.session.sessionid
                                          } })
        if(data.error == false){
          this.emailSent = true
        }else{
          this.emailSent = false

        this.$store.dispatch('app/openSnackbar', 
                              { show: true, color:'red', 
                                title: "Une erreur est survenue pendant l'envoi de votre message",
                                text: "Merci de réessayer ultérieurement",
                                icon: 'alert' })
        }
      },
    },
    computed:{
    }
};
</script>
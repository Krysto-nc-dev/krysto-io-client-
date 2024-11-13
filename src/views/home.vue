<template>
<v-col cols="12" class="py-0 bg-brilliant">
  
  <v-row v-if="showTopInfoBar && !$store.state.auth.isLogin" class="">
    <v-col v-if="false" cols="12" class="mx-auto text-center" style="background-color:rgb(63, 81, 181);">
      <v-toolbar elevation="0" color="transparent" class=" white--text">
        <v-spacer/>
        <v-chip class="mr-1" color="red" dark><b>Version beta : {{ $store.state.app.siteName }} est en phase de lancement</b> </v-chip>
        <v-spacer/>
        <v-btn outlined icon small color="white" @click="closeTopInfoBar()" class="ml-2"><v-icon small>mdi-close</v-icon></v-btn>
      </v-toolbar>
    </v-col>
    <v-col v-if="false" cols="12" class="mx-auto text-center" style="background-color:rgb(63, 81, 181);">
      <v-toolbar elevation="0" color="transparent" class=" white--text">
        <v-spacer/>
        <router-link  to="/register" style="text-decoration:none;color:white;">
        <span>Recevez <b class="px-1">30 {{ $store.state.app.monyUnity }}</b> en créant votre compte gratuit<span class=""> dès maintenant</span> !</span>
        </router-link>
        <v-btn class="ml-4 d-none d-md-flex" outlined rounded color="white" dark 
               v-if="!$store.state.auth.isLogin"
               to="/register">
          <v-icon>mdi-account-plus</v-icon> Créer mon compte
        </v-btn>
        <v-spacer/>
        <v-btn outlined icon small color="white" @click="closeTopInfoBar()" class="ml-2"><v-icon small>mdi-close</v-icon></v-btn>
      </v-toolbar>
    </v-col>
  </v-row>
  
  <v-row class="home-banner-img">
    <v-col cols="11" sm="11" md="9" lg="8" class="mx-auto search-col" style="">
      <SearchBlock></SearchBlock>
    </v-col>
  </v-row>


  <v-row>
    <v-col cols="12" sm="11" md="10" lg="9" class="mx-auto">

      <v-divider style="margin-bottom:10px;"/>
      <v-col class="text-center mt-5 mb-2">
          <v-icon small>mdi-chevron-down</v-icon> 
          <b>Les dernières annonces</b>
      </v-col>

      <v-row>
        <template v-for="(offer, o) in $store.state.market.offers">
          <v-col cols="6" sm="6" md="4" lg="3" class="px-1 py-1" :key="o">
              <OfferCardSM :offer="offer" :key="offer._id"></OfferCardSM>
          </v-col>
        </template>
      </v-row>
    </v-col>
  </v-row>


  <v-row>
    <v-col cols="12" sm="11" md="10" lg="9" class="mx-auto col-white">
      <!-- <v-divider style="margin:50px 0 0 0;"/> -->
    </v-col>
  </v-row>

  <!-- <v-row style="padding-bottom:70px;">
    <v-col cols="12" sm="12" md="12" lg="12" class="mx-auto section text-center mt-5">
        <h2 class="s-main-title font-main pb-1 pt-5 primary--text">
           Le marché de l'occasion fait sa révolution !
        </h2>
    </v-col>

    <v-col cols="12" class="mx-auto d-sm-none text-center mt-5 ">
      <iframe width="350" height="190" src="https://www.youtube.com/embed/xxEN1TzSpj0" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-col>
    <v-col cols="12" class="mx-auto d-none d-sm-inline d-md-none text-center mt-5 ">
      <iframe width="560" height="315" src="https://www.youtube.com/embed/xxEN1TzSpj0" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-col>
    <v-col cols="12" class="mx-auto d-none d-md-inline text-center mt-5 ">
      <iframe width="790" height="450" src="https://www.youtube.com/embed/xxEN1TzSpj0" 
              title="YouTube video player" frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
      </iframe>
    </v-col>
  </v-row> -->


  <v-row style="background-color:rgb(33, 150, 243);" class="section">
    <v-col cols="12" sm="12" md="7" lg="9" class=" text-center white--text mx-auto">
      <div class="s-main-title font-main">
        <span class="secondary--text">
        </span>
        <span class="">
           Le marché de l'occaz'<br>fait sa révolution !
        </span>
        <div class="s-main-text font-main pb-0">
            Grâce à notre monnaie virtuelle : le {{ $store.state.app.siteName.toUpperCase() }},<br>acheter et vendre devient plus simple pour tout le monde !
        </div>
      </div>
    </v-col>
  </v-row>



  <v-row style="background-color:#FFF;" class="section ">
    <v-col cols="12" sm="4" md="5" lg="4" class="px-0 ml-auto d-none d-sm-flex">
      <v-img src="../assets/img/homepage/flat-user-icon2.jpg" class="" contain />
    </v-col>
    <v-col cols="12" sm="8" md="7" lg="7" class="text-left primary--text">
      <h2 class="s-main-title font-main">
        Dès votre inscription,<br>vous gagnez des <span class="d-inline-block">{{ $store.state.app.siteName }} !</span>
        <div class="s-main-text font-main pb-0">
          Hé oui ! Il suffit de s'inscrire pour gagner du pouvoir d'achat :<br>
          1 Krp par jour, tous les jours de l'année !
          <br>
          <v-btn rounded large class="px-4 mt-5" color="secondary" to="/register" elevation="0">
            <v-icon class="mr-2">mdi-account-plus</v-icon>
            Je créé mon compte !
          </v-btn>
        </div>
      </h2>
    </v-col>
    <v-col cols="12" class="ml-auto s-image d-sm-none">
      <v-img src="../assets/img/homepage/flat-user-icon2.jpg" class="" contain />
    </v-col>
  </v-row>


  <v-row style="background-color:#4bb39a;" class="section ">
    <v-col cols="12" sm="8" md="7" lg="7" class="text-left white--text">
      <h2 class="s-main-title font-main">
      <v-img src="../assets/img/homepage/logo_krup_white_long.png" class="" width="300"/>
      <v-divider class="hrlg hrwhite"/>
        Une monnaie<br>équitable et solidaire,<br>pour une économie<br>plus circulaire !
        <div class="s-main-text font-main pb-0">
          Acheter d'occasion et consommer local, voilà de quoi le monde a besoin pour respirer un peu mieux !
          Avec {{ $store.state.app.siteName }}, rien n'est impossible !
        </div>
      </h2>
    </v-col>
    <v-col cols="12" sm="3" md="4" lg="3" class="px-0 mr-auto d-none d-sm-flex">
      <v-img src="../assets/img/homepage/circulareconomy.png" class="" contain />
    </v-col>
    
    <v-col cols="8" class="mx-auto mb-5 s-image d-sm-none">
      <v-img src="../assets/img/homepage/circulareconomy.png" class="" contain />
    </v-col>
  </v-row>

  <v-row style="background-color:#fff;" class="section ">
    <v-col cols="12" sm="4" md="5" lg="3" class="px-0 ml-auto d-none d-sm-block text-center">
      <!-- <v-img src="../assets/img/homepage/circulareconomy.png" class="" contain /> -->
      <v-btn color="amber" to="/mony" elevation="2" style="margin-top:100px;margin-bottom:50px;" fab height="250" width="250">
        <v-icon color="white" style="font-size:190px;">mdi-head-snowflake-outline</v-icon>
      </v-btn>
    </v-col>
    <v-col cols="12" class="ml-auto s-image d-sm-none text-center pb-5">
      <!-- <v-img src="../assets/img/homepage/flat-user-icon2.jpg" class="" contain /> -->
      <v-btn color="amber" to="/mony" elevation="2" class="mt-5" fab height="200" width="200">
        <v-icon style="font-size:140px;">mdi-head-snowflake-outline</v-icon>
      </v-btn>
    </v-col>

    <v-col cols="12" sm="8" md="7" lg="7" class="text-left amber--text">
      <h2 class="s-main-title font-main">
        Une monnaie en or !
        <div class="s-main-text font-main pb-0 secondary--text">
          {{ $store.state.app.siteName }} est basé sur un modèle mathématique complètement nouveau,
          qui permet de mettre en place un système monétaire adapté aux enjeux de demain...
          <br><br>
          <v-btn color="amber" to="/mony" large rounded elevation="0" class="white--text">
            Découvrir le modèle mathématique <v-icon class="ml-2">mdi-arrow-right-circle</v-icon>
          </v-btn>
        </div>
      </h2>
    </v-col>
  </v-row>

  <template v-if="false">
    <v-row style="background-color:#2e1d3b">
      <v-col cols="12" sm="8" md="8" lg="8" class="section text-left purple--text text--lighten-4">
        <div class="s-main-title font-main pb-5 mb-5">
          <span class="white--text">
            Votre compte se remplit 
            tout seul, tous les jours, et sans rien faire !
          </span>
          <br><br>
          Jusqu'à atteindre<br>le plafond de <span class="white--text">30.4375 {{ $store.state.app.monyUnity }}</span>
          <div class="s-main-text font-main pb-0 white--text">
              Soit, le nombre moyen de jours, dans chaque mois de l'année :
              <br>
              <b>365.25 / 12 = 30.4375</b>
          </div>
          
          <br>
          <v-btn large outlined dark style="font-size:16px !important;" to="/mony">
            Découvrir le modèle mathématique <v-icon class="ml-2">mdi-chevron-right-circle-outline</v-icon>
          </v-btn>

        </div>
      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" class="ml-auto text-center" style=" margin-top:50px;">
        <img src="../assets/img/homepage/univers.png" max-height="400"
              style="border-radius:50%;"  class="rotate"/>
      </v-col>
    </v-row>


    <v-row class="section mt-0" style="background-color: #2e1d3b;">
      <v-col cols="12" sm="11" md="10" lg="11" class="text-left mx-auto px-0 px-sm-5 py-0 my-0 py-sm-5 my-sm-5">
        <iframe src="https://slides.com/otomony/otomony/embed" style="box-shadow: 0px 0px 20px -8px;margin-bottom:-12px;"
                width="100%" height="600" title="Présentation du modèle mathématique de la monnaie" 
                scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      </v-col>
    </v-row>


    <v-row style="background-color:#FFF;">
      <v-col cols="12" sm="11" md="10" lg="6" class="section mr-auto text-left indigo--text">
        <div class="s-main-title font-main  pr-5">
          Quelle est<br>la valeur d'1 {{ $store.state.app.monyUnity }} ?<br><br>
          <small><b>1 {{ $store.state.app.monyUnity }} ≃ 1000 {{ $store.state.app.deviseConversion }}</b></small>
          <div class="s-main-text font-main pb-0">
              Pour fixer les prix des annonces, le taux de conversion est fixé à 
              <span class="d-inline-block">environ 1000 {{ $store.state.app.deviseConversion }} pour 1 {{ $store.state.app.monyUnity }}.</span>
              <br><br>
              <b>Ce qui signifie que :</b><br><br><br class="d-md-none">
              <v-icon x-small color="indigo">mdi-circle</v-icon> Vous recevez l'équivalent d'environ <b>{{ (30000).toLocaleString() }} {{ $store.state.app.deviseConversion }}</b> de pouvoir d'achat dès votre inscription.<br><br class="d-md-">
              <v-icon x-small color="indigo">mdi-circle</v-icon> Vous gagnez <b>entre 100 et 1000 {{ $store.state.app.deviseConversion }}</b> par jour, en fonction de la quantité de monnaie déjà présente sur votre compte,
              jusqu'à atteindre <b>la moyenne de 30.4375 {{ $store.state.app.monyUnity }}</b> sur votre compte courant - soit l'équivalent de 304.375 {{ $store.state.app.deviseConversion }}.
              <br>
              <br><br>
              <div class="text-right mr-5">
                <v-btn outlined color="indigo" to="/faq" class="mr-5" large>
                  En savoir plus
                  <v-icon class="ml-2">mdi-chevron-right-circle-outline</v-icon>
                </v-btn>
              </div>
          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12" lg="6" class="section mr-auto text-right text-lg-left red--text text--darken-3 px-1">
        <div class="s-main-title font-main pl-lg-0 pr-lg-5">
          <div class="s-main-text font-main pb-0 d-none d-sm-inline" style="font-size:16px;">
            <v-chip dark color="red lighten-1" large class="px-5 my-3">
              <v-icon color="white" large class="mr-5">mdi-white-balance-sunny</v-icon>
              krup n'est pas une monnaie spéculative.<br>
              Le taux de conversion est fixe.
            </v-chip>
            <br>
            <v-chip dark color="red lighten-2" large class="px-5 my-3 ml-4" >
              <v-icon color="white" large class="mr-3">mdi-currency-eur-off</v-icon>
              Il n'est pas possible d'acheter des {{ $store.state.app.monyUnity }}, ni de les revendre en ligne.<br>
              Les {{ $store.state.app.monyUnity }} ne sont pas convertibles en {{ $store.state.app.deviseConversion }}, ni aucune autre monnaie.
            </v-chip>
            <br>
            <v-chip dark color="green darken-1" large class="px-5 my-3" >
              <v-icon color="white" large class="mr-5">mdi-handshake</v-icon>
              Le but est d'échanger vos {{ $store.state.app.monyUnity }} contre des biens et des services réels. <br>
              Pas de les accumuler, ni de spéculer sur leur valeur.
            </v-chip>
          </div>
          <div class="s-main-text font-main pb-0 d-sm-none text-left" style="font-size:16px; border-top:1px solid grey;">
            <span class="">
              {{ $store.state.app.siteName }} n'est pas une monnaie spéculative.<br>
              Le taux de conversion est fixe.
            </span>
            <br><br>
            <span class="">
              Il n'est pas possible d'acheter des {{ $store.state.app.monyUnity }}, ni de les revendre en ligne. 
              Les {{ $store.state.app.monyUnity }} ne sont pas convertibles en {{ $store.state.app.deviseConversion }}, ni aucune autre monnaie.
            </span>
            <br><br>
            <span class="green--text" >
              Le but est d'échanger vos {{ $store.state.app.monyUnity }} contre des biens et des services réels. 
              Pas de les accumuler, ni de spéculer sur leur valeur.
            </span>
            <br><br>
            <div class="text-right mr-5">
              <v-btn outlined color="indigo" to="/faq" class="mr-5" large>
                En savoir plus
                <v-icon class="ml-2">mdi-chevron-right-circle-outline</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>


    <v-row style="padding-bottom:70px;" class="b">
      <v-col cols="12" sm="11" md="10" lg="8" class="mx-auto section text-center">
          <div class="s-main-title font-main pb-1 px-0 indigo--text">
            Prêt pour la démo ?
          </div>
          <div class="mb-5 pa-4">
            <span class="font-main">Pour mieux comprendre comment fonctionne la monnaie, suivez la démo !</span>
          </div>
          <DemoWallet/>
      </v-col>
    </v-row>


    <v-row style="background-color:rgb(58, 79, 180);" class="section">

      <v-col cols="12" sm="12" md="8" lg="8" class=" text-left white--text mx-auto">
        <div class="s-main-title font-main" id="section-walletDeposit">
          Les comptes de dépots permettent de stocker votre monnaie, sans perdre sa valeur.
          <div class="s-main-text font-main pb-0 mt-5">
              <b>Chaque utilisateur dispose de 2 types de compte :</b><br><br>
              <b><v-icon color="white">mdi-wallet</v-icon> Un compte courant</b><br>
              - Qui reçoit la monnaie créée par le système<br>
              - Pour tendre vers la moyenne de 30.4375 {{ $store.state.app.monyUnity }}<br>
              - Selon la règle suivante : plus on a, moins on reçoit
              <br><br>
              <b><v-icon color="white">mdi-wallet</v-icon> Un compte de dépot</b><br> 
              - Qui stock votre monnaie, à valeur fixe<br>
              - Dans la limite de 365.25 {{ $store.state.app.monyUnity }} (≃{{(365250).toLocaleString()}} {{ $store.state.app.deviseConversion }})<br>
              - Soit environ 1 {{ $store.state.app.monyUnity }} par jour pendant 1 an<br>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="4" lg="3" class="text-center mr-auto s-image">
        <v-img src="../assets/img/homepage/coffre.jpg" max-height="400" contain class=""/>
      </v-col>
    </v-row>

  </template>

  <!-- <PlanBlock/> -->


  <v-row style="background-color:rgb(225, 227, 227);" class="section">

    <v-col cols="12" sm="12" md="8" lg="8" class=" text-left primary--text mx-auto">
      <div class="s-main-title" id="section-walletDeposit">
        <span class=" font-main">
          <v-icon x-large color="primary">mdi-send</v-icon>
          Fais passer le message !
        </span>
        <!-- <span class="d-inline-block">de {{ $store.state.app.siteName }} !</span> -->
        <!-- <div class="s-main-text pb-0 mt-5">
            1 - Créez votre <router-link class="primary--text text--darken-2" to="/register">compte gratuit</router-link> dès maintenant ! (pas de CB)<br>
            2 - Publiez votre première annonce, pour activer votre compte<br>
            3 - Et partagez {{ $store.state.app.siteName }} sur les réseaux !<br>
        </div> -->


        <div class="s-main-text font-main pb-0 text-">
            <v-btn href="https://www.facebook.com/profile.php?id=100090092092395" target="_blank"
                   x-large color="primary" rounded outlined class="pl-2 ma-1">
              <v-icon x-large>mdi-facebook</v-icon> Facebook
            </v-btn>
            <v-btn href="https://discord.gg/wwNpnueP" target="_blank"
                   x-large color="primary" rounded outlined class="pl-2 ma-1">
              <v-icon class="ml-3" large>mdi-discord</v-icon> Discord
            </v-btn>
            <v-btn href="https://www.youtube.com/channel/UCX_aSn8Wn6We5NZMjEAWlKQ" target="_blank"
                   x-large color="primary" rounded outlined class="pl-2 ma-1">
              <v-icon class="ml-3" large>mdi-youtube</v-icon> Youtube
            </v-btn>
        </div>

        <div class="s-main-text py-0">
            <br>
            Plus il y aura de membres, 
            <b class="d-inline-block">plus nous serons riches de nos échanges</b> !

            <br>

            <br><br>
            <v-alert color="primary" outlined>
              <h2>Inscrivez-vous gratuitement, et sans risque !</h2><br>
              S'inscrire sur Krup, c'est réaliser <b class="d-inline-block">un investissement de 0 CFP</b>, 
              qui vous rapportera jusqu'à l'équivalent de <b>1000 CFP</b> de pouvoir d'achat, <b>tous les jours</b>,
              à dépenser librement parmis les annonces publiées sur la plateforme.

              <br>
              <br>
              <b>Même si le nombre d'annonces est encore faible pour l'instant,
              vous avez tout intérêt à vous inscrire le plus tôt possible,
              pour commencer à gagner des {{ $store.state.app.siteName }} tous les jours !</b> 
              <br><br>
              Ensuite, plus le nombre d'utilisateur sera important, plus il y aura d'annonces, 
              et plus les {{ $store.state.app.siteName }} que vous aurez accumulés pourront vous servir !

            </v-alert>
            
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4" lg="3" class="text-center mx-auto s-image">
      <v-img src="../assets/img/homepage/krup_logo2.png" max-height="130" contain class=""/>
      <br>
      <v-btn  color="primary" rounded x-large 
           elevation="0" :to="'/register/premium'" class="white--text">
           <v-icon class="mr-1">mdi-account-plus</v-icon>
            Je m'inscris maintenant !
      </v-btn>
      <br>
    </v-col>
  </v-row>


  <v-row>
    <v-col class="pa-0">
      <Footer v-if="showFooter"/>
    </v-col>
  </v-row>

  <OfferDialog></OfferDialog>
</v-col>
</template>

<style>
</style>

<script>

import '@/assets/css/home.css';

import Footer from '@/components/main-layout/Footer.vue'
import Login from '@/components/main-layout/Login.vue'

import SearchBlock from '@/components/home/SearchBlock.vue'
import DemoWallet from '@/components/home/DemoWallet.vue'
import DemoWalletCarousel from '@/components/home/DemoWalletCarousel.vue'
import PlanBlock from '@/components/home/PlanBlock.vue'
import OfferDialog from '@/components/offer/OfferDialog.vue'
import OfferCardSM from '@/components/offer/OfferCardSM.vue'

export default {
  name: 'home',
  components: {
    Footer, Login, SearchBlock, OfferCardSM, DemoWallet, 
    DemoWalletCarousel, 
    OfferDialog, PlanBlock
  },
  data: () => ({
    showTopInfoBar: true,
    showFooter: true,
    plans: []
  }),
  mounted: async function(){
    this.$store.dispatch('app/incStat', '/home')
    this.$store.dispatch('app/fetchNbUsersTotal')
    this.$store.dispatch('app/fetchEntities', { entityType: 'plan', 
                                                query : { "isActive": true },
                                                sort: { position: 1 } 
                                              })
  },
  methods: {
    closeTopInfoBar(){
      this.showTopInfoBar = false
    },
  },
}
</script>

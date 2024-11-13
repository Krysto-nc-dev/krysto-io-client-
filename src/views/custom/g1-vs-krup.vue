<template>
<v-col cols="12">

  <v-row style="background-color:#2e1d3b;" class="section">
    <v-col cols="12" sm="11" md="11" lg="10" class=" text-left white--text mx-auto">
      <div class="s-main-title font-main">
        Ğ1 VS {{ $store.state.app.siteName }} : 
        <span class="purple--text text--lighten-4">
          comparatif
        </span>
        <div class="s-main-text font-main pb-0">
          La ressemblance entre les deux monnaies étant évidentes pour ceux qui connaissent la Ğ1,
          <br class="d-none d-md-inline">
          ce comparatif vous aidera à mieux comprendre leurs différences.
        </div>
      </div>
    </v-col>

  </v-row>

  <v-row class="section">
    <v-col cols="12" sm="11" md="10" lg="8" class=" text-left mx-auto">
      <div class=" font- pa-1 pa-sm-5">
        
        <div class="font-main s-main-subtitle pl-0 pb-0">
          <v-icon large>mdi-not-equal-variant</v-icon>
          Modèle mathématique
        </div>

        <br>

        <div class="s-main-text font- pb-0">
          Les formules mathématiques utilisées par le système {{ $store.state.app.siteName }} ne sont pas tout à fait similaires à celles de la Ğ1.
          <br><br>
          Formule du dividende en òto : <br>
          <i class="pl-md-4">1 òto = (masse monétaire / nombre d'utilisateurs / 365.25) * 12</i>

          <br><br>
          365.25 / 12 = 30.4375 = la moyenne vers laquelle tendent tous les comptes courants.
         
        </div>

        <br><br>

        <div class="font-main s-main-subtitle pl-0 pb-0">
          <v-icon large >mdi-not-equal-variant</v-icon>
          Toile de confiance
        </div>

        <div class="s-main-text pb-0">
        Avec la Ğ1, la co-création de la monnaie (versemment du DU) est conditionnée à l'intégration de la toile de confiance.
        <br>
        Pour intégrer la toile de confiance, vous devez être certifié par 5 membres déjà certifiés eux-mêmes. 
        <br>
        L'objectif de cette toile de confiance est simple : garantir que chaque membre ne possède qu'un seul compte en Ğ1.
        <br><br>
        Cependant, sur {{ $store.state.app.siteName }}, nous avons fait le choix de ne pas mettre en place cette toile de confiance, afin de simplifier et accélérer l'accès à notre monnaie.
        <br><br>
        L'unicité des comptes est garantie d'une autre façon : via le paiement des abonnements.
        <br>
        En effet, il n'est pas possible de créer plusieurs compte {{ $store.state.app.siteName }} avec la même identité banquaire (carte bleue).
        <br><br>
        La création de plusieurs comptes par personne est donc limitée, pour éviter les abus et l'accumulation de monnaie par une petite minorité.
        <br><br>
        Toutesfois nous considérons que ce n'est pas réellement un problème en soi, et que les dérives possibles sont également limitées
        par les autres règles mises en place pour garantir un usage sain de notre monnaie :
        <br><br>
        - Plafonement des comptes de dépôts à 365.25 Òto.
        <br>
        - Vérification de votre adresse e-mail.
        <br>
        - Impossibilité de spéculer sur la valeur de l'òto (revendre ses òto contre des {{ $store.state.app.deviseConversion }})

        <br><br>
        La création de plusieurs compte pour une même personne n'est pas réellement un problème,
        parce que si une même personne possède beaucoup d'òto, la seule chose qu'elle peut en faire est de les dépenser en achetant des annonces sur la plateforme {{ $store.state.app.siteName }},
        ce qui engendrera simplement une redistribution de la masse monétaire.

        <br><br>
        L'accumulation abusive d'òto est inutile. Vos òto ne prennent de la valeur que lorsque vous les échangez contre un bien ou un service réel.
        </div>

        <br><br>

        <div class="font-main s-main-subtitle pl-0 pb-0">
          <v-icon large >mdi-not-equal-variant</v-icon>
          Taux de conversion en {{ $store.state.app.deviseConversion }}
        </div>

        <div class="s-main-text pb-0">
          Les créateurs de la Ğ1 ont fait le choix de ne pas définir de taux de conversion entre la Ğ1 et les autres monnaies comme les {{ $store.state.app.deviseConversion }},
          afin de laisser les utilisateurs entièrement libre de fixer leurs prix, et d'échanger leur monnaie le plus librement possible.
          <br><br>
          Pour {{ $store.state.app.siteName }}, nous avons fait le choix de fixer un taux de conversion indicatif (100 {{ $store.state.app.monyUnity }} ~ 1000 {{ $store.state.app.deviseConversion }})
          afin de faciliter la compréhension et la prise en main de cette nouvelle forme de monnaie, par le plus grand nombre.
          <br><br>
          Les monnaies relatives sont pour l'instant inconnues du grand public, et il n'est pas évident pour tout le monde d'en saisir toutes les subtilités.
          <br><br>
          Ce taux indicatif sert de base commune à tous nos membres pour fixer et évaluer les prix des annonces, ce qui n'est pas facil sans repert fixe.
          <br><br>
          Le rapport de 1 pour 10 reste accessible pour tout le monde, et il permet d'établir la moyenne des comptes à environ 30000 {{ $store.state.app.deviseConversion }} de pouvoir d'achat.
          <br>
          Pour le marché de l'occasion, ce montant est largement suffisant pour réaliser des petits achats réguliers, en fonction des annonces publiées près de chez-soi.
          <br>
          Et le plafond des comptes de dépôts, fixé à 365.25 òto, soit {{(365200).toLocaleString()}} {{ $store.state.app.deviseConversion }}, 
          permet d'accumuler une quantité de monnaie non-négligeable pour pouvoir aussi réaliser des achats plus importants de temps en temps.
          <br><br>
          Ce taux de conversion, à la fois simple et pratique, semble établir un juste équilibre entre l'offre et la demande : <br>
          On reçoit suffisamment de monnaie pour pouvoir en dépenser régulièrement sans peur d'en manquer,
          et on a aussi tout intérêt à devenir vendeur, pour accumuler un peu plus de monnaie, et pouvoir se permettre des achats plus importants.
          <br><br>
          Ni trop, ni pas assez.
          <br>
          C'est l'équilibre que nous espérons obtenir, à travers ce taux de conversion.
        </div>

      </div>
    </v-col>
  </v-row>

  
  <v-row style="color:#2e1d3b;" class="section">
    <v-col cols="12" sm="11" md="11" lg="10" class=" text-left mx-auto">
      <div class="s-main-subtitle font-main pa-1 pa-sm-5">
        
        <div class="s-main-text font-main pb-0">
          <v-divider/>
          <br>
          <v-btn to="/" dark color="blue" elevation="0"><v-icon>mdi-arrow-left</v-icon> Retour à l'accueil</v-btn>
          <br><br><br><br>
        </div>
      </div>
    </v-col>
  </v-row>


  <v-row>
    <v-col class="pa-0">
      <Footer/>
    </v-col>
  </v-row>


  
</v-col>
</template>

<style></style>

<script>

import Footer from '@/components/main-layout/Footer.vue'

import '@/assets/css/home.css'

export default {
  name: 'mony',
  components: { Footer },
  data: () => ({
    
    
  }),
  async mounted(){
    this.$store.dispatch('app/incStat', '/g1-vs-krup')
  },
  methods: {
    

  },
  computed: {
    
    
  }
}
</script>

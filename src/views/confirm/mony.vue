<template>
<v-col cols="12">

  <v-row style="background-color:#2e1d3b;" class="section">
    <v-col cols="12" sm="11" md="11" lg="10" class=" text-left white--text mx-auto">
      <div class="s-main-title font-main">
        {{ $store.state.app.siteName }} : 
        <span class="purple--text text--lighten-4">
          le modèle mathématique
        </span>
        <div class="s-main-text font-main pb-0">
          Une monnaie autonome, stable, et sans risque
        </div>
      </div>
    </v-col>

  </v-row>

  <v-row class="section">
    <v-col cols="12" sm="11" md="10" lg="8" class=" text-left mx-auto">
      <div class="s-main-subtitle font-main pa-3 pa-sm-5">
        
        <div class="s-main-text font-main pb-0">
          <b>Origines</b><br>
          <small>
          La monnaie virtuelle {{ $store.state.app.siteName }} est basée sur le modèle mathématique 
           <a href="https://otomony.fr/" target="_blank">d'{{ $store.state.app.siteName }}</a>, 
           lui-même inspiré du modèle de <a href="https://monnaie-libre.fr/" target="_blank">la monnaie libre</a> , 
          aussi appelée June, ou G1, et de <a href="http://trm.creationmonetaire.info/" tager="_blank">la théorie relative de la monnaie</a>.
          <br><br class="d-md-none">
          <br><br class="d-md-none">
          Pour en savoir plus sur les ressemblances, et différences entre le Krup et la monnaie libre, merci de consulter la section 
          <router-link to="/g1-vs-krup">g1-VS-krup</router-link>
          </small>

          <br>
          <br>
          <v-divider/>
          
        </div>
      </div>
    </v-col>
  </v-row>

  <v-row class="section">
    <v-col cols="12" sm="11" md="10" lg="8" class="text-left mx-auto">
      <iframe src="https://slides.com/otomony/otomony/embed" class=""
              width="100%" height="600" title="Présentation du modèle mathématique de la crypto-monnaie Krup" 
              scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </v-col>
  </v-row>

  <v-row class="section d-none">
    <v-col cols="12" sm="11" md="10" lg="8" class="text-left mx-auto">
      <div class="s-main-subtitle font-main pa-1 pa-sm-5">
        1) Une monnaie relative
        <div class="s-main-text font-main pb-0">
          Les monnaies que nous utilisons quotidiennement (€, $, etc), ainsi que toutes les cryptomonnaies les plus connues, sont des monnaies <i>unitaires</i>.
          Ce qui signifie que nous comptons la monnaie de façon unitaire, et non de façon relative. 
          <br><br class="d-md-">
          Avec une monnaie <i>relative</i> comme {{ $store.state.app.siteName }}, il y a 2 façons de compter la monnaie : 
          <span class="d-inline-block">en unités, ou en valeur relative.</span>
          <br><br class="d-md-">
          Òto est la valeur relative d'{{ $store.state.app.siteName }}, ce qui signifie que   
          la valeur d'1 òto est équivalente à un certain nombre d'unités (ù).
          <br><br>
          Par exemple : 1 òto = 0.00111486 ù 
          <br><br>
          <u>Avec {{ $store.state.app.siteName }}, les prix sont toujours exprimés en valeur relative, donc en <b>òto</b>.</u>
          <br><br>
          <b>C'est ce qui permet de créer de nouvelles unités chaque jour, sans provoquer aucune inflation sur les prix...</b>

          <br><br>
          <v-divider/>

          <br>
          Chaque jour, votre compte est crédité d'un certain nombre d'unités.
          <br><br class="d-md-none">
          Et, chaque jour, le taux de conversion, entre les unités et les òto, est recalculé.
          <br><br>
          <v-divider/>
          <br class="d-md-">
          <b>Comment est calculé le taux de conversion ?</b>
          <br><br>
          La formule mathémagique est la suivante :<br><br>
          <v-alert color="#2e1d3b" dark class="pl-md-4">1 òto = masse monétaire / nombre d'utilisateurs / (365.25 / 12)</v-alert>
          <br class="d-md-none">
          <span class="pl-md-4">Un òto est égal à la masse monétaire, divisée par le nombre d'utilisateur, divisé par 365.25 divisé par 12.</span>

          <br><br>
          365.25 / 12 = 30.4375 = la moyenne vers laquelle tendent tous les comptes courants.
          <br><br class="d-md-">
          <b>Masse monétaire :</b> le total de toutes les unités créées depuis le lancement de la monnaie.<br>
          <b>Mombre d'utilisateurs :</b> le nombre d'utilisateurs inscrits sur la plateforme.<br>
          <b>365.25 :</b> le nombre de jours dans l'année<br>
          <b>12 :</b> le nombre de mois dans l'année<br>
          <br><br>
          <v-divider/>
          <br>
          Chaque jour, l'équivalent d'1 òto est versé (en unité) sur chaque compte courant.
          <br>
          Donc, chaque jour, la masse monétaire augmente.
          <br><br class="d-md-none">
          Donc, chaque jour, le taux de conversion augmente aussi, proportionnellement à la masse monétaire.
          <br><br>
          La valeur relative d'1 òto augmente chaque jour, et vous recevez plus d'unités chaque jour.
          <br><br class="d-md-none">
          Mais comme le taux de conversion est recalculé chaque jour lui-aussi : l'inflation reste invisible.
          <br><br>
          Parce que TOUS les comptes se remplissent à la même vitesse.<br class="d-md-">
          Avec la même quantité d'unités tous les jours.
          <br><br class="d-md-">
          Ce mécanisme entraine naturellement la valeur relative de tous les comptes à tendre vers une même moyenne, déterminée par les constantes choisies pour calculer le taux de conversion.
          <br class="d-md-none">
          Ici, la moyenne équivaut à 30.4375, soit le nombre moyen de jours dans chaque mois de l'année : <b>365.25 / 12 = 30.4375</b>
          <br><br>
          - Si votre compte contient moins de 30.4375 òto, votre solde augmentera tous les jours.
          <br><br class="d-md-none">
          - Si votre compte contient plus de 30.4375 òto, votre solde diminuera tous les jours.
          <br><br><br><br><br>
          <v-divider/>
          <br>
        </div>

        2) Une monnaie équitable
        <div class="s-main-text font-main pb-0">
          {{ $store.state.app.siteName }} peut être considéré comme une monnaie équitable, 
          dans le sens où tous ses utilisateurs en profitent de la même façon, 
          puisqu'il reçoivent tous, chaque jour, exactement la même quantité de monnaie (symétrie de la création monétaire).
          <br><br>
          La création monétaire est équitablement répartie entre tous, de façon à ce que personne ne soit avantagé par rapport aux autres.
          <br><br>
          La quantité de monnaie créé pour vous ne dépend pas de qui vous êtes, ni de votre origine, de votre niveau de compétence, ou de votre capacité à inverstir ou non.
          Elle est simplement créée pour tous, sans distinction.
          <br><br><br><br><br>
          <v-divider/>
          <br>
        </div>

        3) Une monnaie basée sur le temps
        <div class="s-main-text font-main pb-0">
          Avec {{ $store.state.app.siteName }}, la création monétaire est constante, et automatique.
          <br><br class="d-md-none">
          Chaque jour, le système travaille pour vous, et verse automatiquement 1 òto à tous les membres inscrits. 
          <br><br>
          Et personne ne peut échapper à cette règle. 
          <br><br class="d-md-none">
          Personne ne peut acheter massivement des òto pour devenir plus riche que les autres, et faire grimper le court de l'òto.
          <br><br class="d-md-none">
          La seule façon d'obtenir beaucoup d'òto, c'est de vendre beaucoup d'annonce sur la plateforme.
          <br><br class="d-md-none">
          Avec {{ $store.state.app.siteName }}, ce sont les échanges qui donnent de la valeur à la monnaie. 
          <br><br class="d-md-none">
          Plus elle circulera rapidement, plus vous serez riches.
          <br><br>
          C'est aussi pour cette raison que les comptes de dépôts sont plafonés à 365.25 òto : de façon à limiter l'accumulation de la monnaie, et à encourager les échanges.
          <br><br>
          Personne ne peut devenir millionaire en òto !
          <br><br>
          Le but d'{{ $store.state.app.siteName }} est de vous être utile au quotidien, en augmentant votre pouvoir d'achat sur le marché de l'occasion.
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
          <br><br><br><br><br><br>
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

<style>
@media (max-width: 600px) {
  .s-main-text{
    font-size:14px!important;
    line-height:16px!important;
  }
}
</style>

<script>

import Footer from '@/components/main-layout/Footer.vue'

import '@/assets/css/home.css'

export default {
  name: 'mony',
  components: { Footer },
  data: () => ({
    
    
  }),
  async mounted(){
    this.$store.dispatch('app/incStat', '/mony')
  },
  methods: {
    

  },
  computed: {
    
    
  }
}
</script>

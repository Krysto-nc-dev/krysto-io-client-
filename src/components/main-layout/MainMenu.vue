<template>
  <div>
    <!-- MAIN MENU -->
    <v-navigation-drawer v-model="$store.state.app.drawerOpen" temporary
                        app disable-resize-watcher color="background">
      <v-list>

        <!-- <center><img alt="logo" class="mb-2" src="../../assets/logo-circle.png" height="150"></center> -->
        <router-link to="/"  class="primary--text font-main invisible-link" style="font-size:30px; font-weight:800 !important;">
          
          <v-img src="../../assets/img/logo_krup_long.png" width="210" contain class="ml-4"/>
          <v-divider class="mt-5"/>
          <!-- {{ $store.state.app.siteName }}.nc -->
        </router-link>

        <template v-if="showMenuComplete">
          <template v-for="item in itemsDrawer" >
            <v-list-item v-if="item.auth == false || $store.state.auth.isLogin" :key="item.to" link :to="item.to">

              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
              
            </v-list-item>
          </template>
        </template>

        <v-list-item>

          <v-list-item-action>
            <v-icon>mdi-brightness-6</v-icon>
          </v-list-item-action>

          <v-list-item-content style="z-index:2">
            <v-switch @change="newThemeDark()" v-model="$vuetify.theme.dark"></v-switch>
          </v-list-item-content>
          
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
  //import router from '../../router/router'

  export default {
    name: 'main-menu',
    props: [ 'showMenuComplete' ],
    data: () => ({
      drawer: null,
      itemsDrawer: [
        { name: 'Page d\'accueil',        to: '/',                      auth: false, icon: 'mdi-home' },
        { name: 'Rechercher',             to: '/market',                auth: false, icon: 'mdi-magnify' },
        { name: 'Mon profil',             to: '/profil',                auth: true,  icon: 'mdi-account-circle' },
        { name: 'Mes annonces',           to: '/my-offers',             auth: true,  icon: 'mdi-offer' },
        { name: 'Propositions envoyées',  to: '/propositions/buyer',    auth: true,  icon: 'mdi-chevron-double-right'},
        { name: 'Propositions reçues',    to: '/propositions/seller',   auth: true,  icon: 'mdi-chevron-double-left'},
        { name: 'La monnaie',             to: '/mony',                  auth: false, icon: 'mdi-wallet' },
        { name: 'FAQ',                    to: '/faq',                   auth: false, icon: 'mdi-cloud-question' },
      ]
    }),

    
    mounted: function(){
      //initialise le theme sur "sombre" ou "lumineux" (dark : true / false)
      setTimeout(()=>{
        let themeDark =  localStorage.getItem("themeDark")
        if(themeDark != null) this.$vuetify.theme.dark = (themeDark=="true")

        localStorage.setItem("themeDark", this.$vuetify.theme.dark)
      }, 100)
      
    },
    
    methods: {
      logout(){
        this.$store.dispatch('auth/logout')
      },
      newThemeDark(){
        localStorage.setItem("themeDark", this.$vuetify.theme.dark)
      }
    },
    computed:{
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    },
    watch: {
    }, 
    
    
  };
</script>

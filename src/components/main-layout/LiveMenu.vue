<template>
  <v-list three-line class="drawerRight" >
    
    <v-subheader class="bold blue--text"><v-icon color="blue" class="mr-3">mdi-comment</v-icon> Discussions privées</v-subheader>

    <v-divider/>
    <template v-if="$store.state.auth.conversations.length > 0">
      <template  v-for="(conv, p) in $store.state.auth.conversations" >
        <v-list-item class="px-2" :key="p" :to="'/private/'+(conv.user1._id != $store.state.auth.user._id ? conv.user1._id : conv.user2._id) + '/' + conv.offer._id">
          <v-list-item-icon class="mr-3">
            <v-badge color="blue" class="badge-nbMsg" small 
                    :content="nbMsgNotRead(conv._id)" 
                    :value="nbMsgNotRead(conv._id)">
              <v-img v-if="conv.offer.gallery[0] != null" :src="baseUrl() + conv.offer.gallery[0]" 
                    contain width="35" max-height="60" />
              <v-icon v-else class="ma-1">mdi-image-off-outline</v-icon>
            </v-badge>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title><b>{{ conv.offer.title }}</b></v-list-item-title>
            
            <template v-if="conv.user1._id != $store.state.auth.user._id">
              
              <v-list-item-title class="mt-1">
                <v-gravatar :height="17" :width="17" class="mr-0" 
                            style="border-radius:50%;margin-bottom:-3px;"
                            :default-img="'retro'"
                            :email="conv.user1.name"/>
                {{ conv.user1.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="" v-if="conv.user1.city != null">
                <v-icon small class="mb-1">mdi-map-marker</v-icon> {{ conv.user1.city }}
              </v-list-item-subtitle>
            </template>
            <template v-else>
              <v-list-item-title class="mt-1">
                <v-gravatar :height="17" :width="17" class="mr-0" 
                            style="border-radius:50%;margin-bottom:-3px;"
                            :default-img="'retro'"
                            :email="conv.user2.name"/>
                {{ conv.user2.name }}
              </v-list-item-title>
              <v-list-item-subtitle class="" v-if="conv.user2.city != null">
                <v-icon small class="mb-1">mdi-map-marker</v-icon> {{ conv.user2.city }}
              </v-list-item-subtitle>
            </template>

          </v-list-item-content>
        </v-list-item>
      </template>
    </template>
    <template v-else>
      <v-list-item class="px-2">
        <v-list-item-icon class="mx-2"><v-icon>mdi-cancel</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title><b>Vous n'avez aucun contact</b></v-list-item-title>
          <v-list-item-title></v-list-item-title>
          <v-list-item-title></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

  </v-list>
</template>

<style>
  .badge-nbMsg .v-badge__badge{
    inset: auto auto calc(82% - 4px) calc(82% - 4px) !important;
    font-weight: bold;
  }
</style>
<script>

//import axios from 'axios'
//import router from '../router/router'
import core from '../../plugins/core.js'
import Gravatar from 'vue-gravatar'

export default {
  name: 'drawer-right',
  props: [],
  components: { 'v-gravatar' : Gravatar },
  data:() => ({
   timer: null
  }),
  beforeDestroy () {
    if(this.timer != null){
      clearInterval(this.timer)
      this.timer = null
    } 
  },
  async mounted(){
    // if(this.timer != null){
    //   clearInterval(this.timer)
    //   this.timer = null
    // } 
    // this.timer = setInterval(()=>{
    //   this.$store.dispatch('live/whoIsOnline')
    // }, 120000)
  },

  methods: {

    nbMsgNotRead: function(convId){
      let nbMsgNotRead = 0
      this.$store.state.auth.conversations.forEach(conv => {
        if(convId == conv._id){
          let myLastDate = null
          conv.dateLastRead.forEach((date) => {
            if(date.userId == this.$store.state.auth.user._id) myLastDate = date.date
          })
          
          conv.messages.forEach(msg => {
            if(msg.created > myLastDate) nbMsgNotRead++
          });
        }
      })
      return nbMsgNotRead
    },
    baseUrl(){ return core.baseUrl() },

  }
}
</script>
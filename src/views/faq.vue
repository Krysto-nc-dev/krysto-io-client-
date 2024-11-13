<template>
<div>

  <v-col cols="12" md="9" lg="7" class="mx-auto text-center">
    <br>
    <v-icon x-large>mdi-cloud-question</v-icon>
    <br>
    <h1>Foire aux questions</h1>
  </v-col>

  <v-col cols="12" md="9" lg="7" class="mx-auto mb-5 pb-5" style="min-height:700px;">
    <v-expansion-panels flat>

      <template v-for="(question, q) in $store.state.app.data.question">
        <v-expansion-panel :key="q">
            <v-expansion-panel-header class="bold">
              <span><v-icon class="mb-1" x-small>mdi-circle</v-icon>  {{ question.title }}</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content class="pa-5 pt-0" v-html="nl2br(question.text)">
            </v-expansion-panel-content>
        </v-expansion-panel>
      </template>

    </v-expansion-panels>
  </v-col>
  
  <v-col class="pa-0">
    <Footer/>
  </v-col>
</div>
</template>

<style></style>

<script>

//import axios from 'axios'
//import router from '../router/router'
//import core from '../plugins/core.js'

//import Post from '@/components/Post.vue'
import Footer from '@/components/main-layout/Footer.vue'

export default {
  name: 'faq',
  components: { Footer },
  data: () => ({
    
    
  }),
  async mounted(){
    this.$store.dispatch('app/incStat', '/faq')
    await this.$store.dispatch('app/fetchEntities', { entityType: "question", sort: { created: 1 } })
  },
  methods: {
    
    nl2br: function(str, is_xhtml){
      var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'
      let newStr = (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
      return "<span class='d-inline-block'>"+newStr+"</span>"
    },

  },
  computed: {
    
    
  }
}
</script>

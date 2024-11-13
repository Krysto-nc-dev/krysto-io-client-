<template>
  <v-list style="margin:-5px; box-shadow:none;">
    <v-list-item-group  color="primary"> 

      <template v-if="places != null">
      <v-list-item color="primary"
          v-for="(place, i) in places" :key="i"
          @click="onclick(place.lat, place.lng, place.text)">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>mdi-map-marker</v-icon> 
              {{ place.text }}
            </v-list-item-title>
          </v-list-item-content>
      </v-list-item>
      </template>

      <v-list-item v-if="places != null && places.length == 0">
        <v-list-item-content>
          <v-list-item-title v-if="loadPlaces">
            <v-icon>mdi-map-marker</v-icon>  Recherche en cours
          </v-list-item-title>
          <v-list-item-title v-else>
            <v-icon>mdi-ban</v-icon>  Aucun résultat {{ places }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-else-if="places == null">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-ban</v-icon> Indiquez le nom d'une ville, un code postal, etc...
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list-item-group>
  </v-list>
</template>



<script>


export default {
  components: {
    
  },
  props: ['places', 'loadPlaces', 'onclick'],
  data: () => ({
    
  }),
  mounted: async function(){
    

  },
  methods: {
    
  },
  
}
</script>
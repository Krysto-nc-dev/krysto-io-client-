
import axios from "axios"
//import { io } from "socket.io-client";
//import { i18n } from 'vue-lang-router';

const state = () => ({
  
  offers: [],

  requestParams: {
    offerType: "OFFER",
    search: "",
    amountMin: 0,
    amountMax: 50,
    radius: 500000,
    coordinates: null,
    categoryId: null,
    fetchLimit: 100,
    skip: 0
  },

  langAvailables : [],

  streamLoading: false,
  isEndOfStream: false,

  totalOffers: 0
});

const actions = {
  async setRequestParams({ commit }, params) {
    commit("setRequestParams", params)
  },
  async clearResults({ commit }) {
    commit("clearResults")
  },
  async fetchOffers({ commit, state }, params) {

    if(params == null) params = state.requestParams
    if(params.coordinates == null)
      params.coordinates = [-22.268764039073968, 166.45385742187503]

    commit("setRequestParams", params)
    //console.log("fetchOffers", params)

    commit("setStreamLoading", true)
    axios.post('/market/search', params)
        .then((res) => {
          commit("setStreamLoading", false)
          if(!res.data.error) commit("setOffers", res.data)
          else console.log("error fetching offers", res.data)
        })
    
  },
  async fetchNextOffers({ commit, state }) {

    let params = state.requestParams
    if(params.coordinates == null)
      params.coordinates = [-22.268764039073968, 166.45385742187503]

    console.log("fetchNextOffers", state.requestParams)
    
    commit("nextOffer")
    commit("setStreamLoading", true)
    const { data } = await axios.post('/market/search', state.requestParams)
    commit("setStreamLoading", false)

    if(!data.error) commit("addOffers", data)
    else console.log("error fetching offers", data)
  },

};

const mutations = {
  setRequestParams(state, params) {
    state.requestParams = params
  },
  setStreamLoading(state, bool) {
    state.streamLoading = bool
  },
  setIsEndOfStream(state, bool) {
    state.isEndOfStream = bool
  },
  clearResults(state) {
    state.offers = [];
  },
  setOffers(state, data) {
    state.offers = data.offers
    state.totalOffers = data.countOffers

    if(data.offers.length < state.requestParams.fetchLimit)
          state.isEndOfStream = true
    else  state.isEndOfStream = false
  },
  addOffers(state, data) {
    state.offers = state.offers.concat(data.offers)
    state.totalOffers = data.countOffers

    if(data.offers.length < state.requestParams.fetchLimit)
         state.isEndOfStream = true
    else state.isEndOfStream = false
  },
  nextOffer(state){
    state.requestParams.skip = state.requestParams.skip + 1
  },
};

const getters = {
  
}

export default {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};

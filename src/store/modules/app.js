
import axios from "axios"
import { i18n } from 'vue-lang-router'

const config = require('../../config/' + process.env.NODE_ENV)

const state = () => ({
  isLoading: true,
  drawerOpen: false,
  liveMenuOpen: false,

  data: { 
    walletMain : [],
    offer : [],
    offerCategory : [],
    question: [],
    plan: []
  },

  langAvailables : [],

  snackbar: {
    show: false,
    title: "",
    text: "",
    color: "",
    icon: "",
    path: null
  },

  showDialogMailDev: false,
  dialogMailDev: null,

  currentPrivateConvUserName: null,
  siteName: "Krup",
  monyUnity: "krp",
  nbUsersTotal: 0,
  limitForFreePlan: 0,
  deviseConversion: "CFP",
});

const actions = {
  setDrawerOpen({ commit }, open) {
    commit("setDrawerState", open)
  },
  setLiveMenuOpen({ commit }, open) {
    commit("setLiveMenuOpen", open)
  },
  setAppLoading({ commit }, isLoading) {
    commit('setLoadingState', isLoading)
  },
  async initLang({ commit }) {
    const { data } = await axios.post('/data/get-lang-availables')
    commit('initLang', data.languages)
  },
  async fetchNbUsersTotal({ commit }) {
    const { data } = await axios.post('/data/get-nb-users-total')
    commit('setNbUsersTotal', data.nbUsers)
    commit('setLimitForFreePlan', data.limitForFreePlan)
  },
  openSnackbar({ commit }, params) {
    commit("openSnackbar", params)
  },

  async fetchEntities({ commit }, params){
    //console.log("fetchEntities", params.entityType, state.data[params.entityType].length, params.limit)
    //si on a déjà chargé un type, on ne recommence pas
    //if(state.data[entityType].length > 0) return
    //si on en a aucune, on les charge toutes
    const { data } = await axios.post('/data/query-entities', { entityType: params.entityType, 
                                                                lang: i18n.locale, 
                                                                limit: params.limit, 
                                                                query: params.query, 
                                                                sort: params.sort })

    if (data.error === false) {
      commit("setEntities", { 'entities' : data.entities, 'entityType' : params.entityType })
      return
    }
  },
  setCurrentPrivateConvUserName({ commit }, name){
    console.log("setCurrentPrivateConvUserName", name)
    commit("setCurrentPrivateConvUserName", name)
  },
  openDialogMailDev({ commit }, params) {
    //console.log("process.env.NODE_ENV", process.env.NODE_ENV)
    if(process.env.NODE_ENV != "production")
      commit("openDialogMailDev", params)
  },
  closeDialogMailDev({ commit }, params) {
    commit("closeDialogMailDev", params)
  },
  async incStat({ commit }, url){
    //console.log("incStat", config.domaineName, url)
    axios.post('/stat/inc-stat-url', { domaineName: config.domaineName, url: url })
    commit('statSent', false)
  },
};

const mutations = {
  setDrawerState(state, open) {
    state.drawerOpen = open;
  },
  setLiveMenuOpen(state, open) {
    state.liveMenuOpen = open;
  },
  setLoadingState(state, isLoading) {
    state.isLoading = isLoading;
  },
  setEntities(state, data){
    state.data[data.entityType] = data.entities
  },
  initLang(state, languages){
    state.langAvailables = languages
  },
  setNbUsersTotal(state, nbUsers){
    state.nbUsersTotal = nbUsers
  },
  setLimitForFreePlan(state, limitForFreePlan){
    state.limitForFreePlan = limitForFreePlan
  },
  openSnackbar(state, params) {
    console.log("openSnackbar", params)
    state.snackbar = params
    if(params.show == false){ 
      state.snackbar.text = ""
      state.snackbar.title = ""
      state.snackbar.path = null
      state.snackbar.icon = null
    }
  },
  setCurrentPrivateConvUserName(state, name){
    state.currentPrivateConvUserName = name
  },
  openDialogMailDev(state, params) {
    state.dialogMailDev = params
    state.showDialogMailDev = true
  },
  closeDialogMailDev(state) {
    state.showDialogMailDev = false
  },
  statSent(state) {
    state.isLoading = state.isLoading
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

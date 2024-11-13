
import axios from "axios"

const state = () => ({
  
  offers: [],
  langAvailables : [],
});

const actions = {
 
  async startPaiement({ state }, params) {
    console.log("startPaiement", state.offers, params) //, rootState.auth.user.plan.stripeId)
    //let stripePriceId = rootState.auth.user.plan.stripeId

    console.log("startPaiement", params.stripePriceId)

    const { data } = await axios.post('/pay/subscription', { stripePriceId : params.stripePriceId, userId: params.userId })
    if(!data.error){
      window.location.href = data.sessionUrl
      //return data
    }else{
      console.log("error startPaiement", data)
    }
  },

};

const mutations = {
  
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

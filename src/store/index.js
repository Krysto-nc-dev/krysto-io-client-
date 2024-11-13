import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app";
import pay from "./modules/pay";
import auth from "./modules/auth";
import market from "./modules/market";
import captcha from "./modules/captcha";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    auth,
    market,
    captcha,
    pay
  },
});

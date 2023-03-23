import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import cardItems from "./modules/card-items";
import savedComments from "./modules/saved-comments";

export default new Vuex.Store({
  modules: {
    cardItems,
    savedComments,
  },
  strict: process.env.NODE_ENV !== "production",
});

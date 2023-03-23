import axios from "axios";

export default {
  namespaced: true,
  state: {
    cardItems: null,
    stateLoading: false,
  },
  getters: {
    cardItems: (state) => state.cardItems,
    stateLoading: (state) => state.stateLoading,
  },
  mutations: {
    setCardItems(state, payload) {
      state.cardItems = payload;
    },
    setStateLoading(state, payload) {
      state.stateLoading = payload;
    },
  },
  actions: {
    async getCardItems(store, queryData) {
      if (queryData) {
        store.commit("setStateLoading", true);
        const response = await axios.get(`https://api.github.com/search/repositories`, {
          params: {
            q: queryData.queryText,
            per_page: queryData.limit,
            _page: queryData.page,
          },
        });
        let items = response.data.items;
        store.commit("setCardItems", items);
        store.commit("setStateLoading", false);
      }
    },
  },
};

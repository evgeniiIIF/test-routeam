import axios from "axios";

export default {
  namespaced: true,
  state: {
    cardItems: [],
    stateLoading: false,
    totalCount: null,
  },
  getters: {
    cardItems: (state) => state.cardItems,
    stateLoading: (state) => state.stateLoading,
    totalCount: (state) => state.totalCount,
  },
  mutations: {
    setCardItems(state, payload) {
      state.cardItems = payload;
    },
    setStateLoading(state, payload) {
      state.stateLoading = payload;
    },
    setTotalCount(state, payload) {
      state.totalCount = payload;
    },
  },
  actions: {
    async getCardItems(store, queryData) {
      if (queryData) {
        store.commit("setStateLoading", true);
        store.commit("setCardItems", []);
        const response = await axios.get(`https://api.github.com/search/repositories`, {
          params: {
            q: queryData.queryText,
            per_page: queryData.limit,
            _page: queryData.page,
          },
        });
        let items = response.data.items;
        store.commit("setCardItems", items);
        store.commit("setTotalCount", response.data.total_count);
        store.commit("setStateLoading", false);
      }
    },
  },
};

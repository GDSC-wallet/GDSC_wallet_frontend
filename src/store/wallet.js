import ajax from "../api"

const wallet = {
  namespaced: true,
  state: {
    wallet: null
  },
  mutations: {
    setWallet(state, wallet) {
      state.wallet = wallet;
    }
  },
  actions: {
    setWallet({ commit }, wallet) {
      commit("setWallet", wallet);
    },
    async getWallet({ commit, getters, rootGetters }) {
      ajax("/api/wallet", "get", {
        params: {
          wallet_id: getters.getWalletId,
          time_choosen: rootGetters["calendar/getDate"].toISOString().split('Z')[0]
        }
      }).then(res => {
        commit("setWallet", res.data.data)
      }).catch((err) => {
        console.log(err);
      })
    }
  },
  getters: {
    getRecords(state) {
      if (state.wallet) return state.wallet.records;
      return []
    },
    getWalletId(state) {
      if (state.wallet) return state.wallet.wallet_id;
      return ""
    },
    getWalletTags: (state) => (mode) => {
      // transform english to chinese
      if(mode == "income") mode = "收入";
      if(mode == "expense") mode = "支出";
      if (state.wallet) return state.wallet.tags.filter(tag => tag.tag_type == mode);
      return []
    }
  }
}

export default wallet;
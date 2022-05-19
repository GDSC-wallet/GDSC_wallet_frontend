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
    },
    async createWallet({ dispatch }, data) {
      ajax("/api/wallet/create", "post", {
        data: {
          ...data
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async deleteWallet({ getters, dispatch }) {
      ajax("/api/wallet/delete", "post", {
        data: {
          wallet_id: getters.getWalletId
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async switchWallet({ rootGetters, dispatch }, wallet_id) {
      ajax("/api/wallet", "get", {
        params: {
          wallet_id: wallet_id,
          time_choosen: rootGetters["calendar/getDate"].toISOString().split('Z')[0]
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
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
      if (state.wallet) return state.wallet.tags.filter(tag => tag.tag_type == mode);
      return []
    }
  }
}

export default wallet;
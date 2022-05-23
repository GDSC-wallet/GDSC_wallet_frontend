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
          wallet_name: data?.wallet_name,
          wallet_description: data?.wallet_descriptions
        }
      }).then(() => {
        dispatch("auth/getProfile", null, { root: true })
      }).catch((err) => {
        console.log(err);
      })
    },
    async editWallet({ dispatch }, data) {
      ajax("/api/wallet/edit", "post", {
        data: {
          wallet_name: data?.wallet_name,
          wallet_description: data?.wallet_description,
          wallet_id: data?.wallet_id
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
    getWalletInfo(state) {
      if (state.wallet) return {
        wallet_id: state.wallet.wallet_id,
        wallet_total: state.wallet.wallet_total,
        wallet_name: state.wallet.wallet_name,
        wallet_description: state.wallet.wallet_description,
      };
      return {}
    },
    getWalletTags: (state) => (mode) => {
      if (state.wallet) return state.wallet.tags.filter(tag => tag.tag_type == mode);
      return []
    }
  }
}

export default wallet;
import ajax from "../api"

const auth = {
    namespaced: true,
    state: {
        authToken: "",
        profile: null,
        isAuthenticated: false,
    },
    mutations: {
        setAuthToken(state, authToken) {
            state.authToken = authToken;
        },
        setProfile(state, profile) {
            state.profile = profile;
        },
        authenticateSuccess(state) {
            state.isAuthenticated = true;
        },
        authenticateFail(state) {
            state.isAuthenticated = false;
        },
        logout(state) {
            state.authToken = "";
            state.profile = {};
            state.isAuthenticated = false;
        }
    },
    actions: {
        login({ commit, dispatch }) {
            commit("logout");
            commit("setProfile", null);
            commit("setAuthToken", localStorage.getItem("authToken"));
            dispatch("getProfile")
        },
        async getProfile({ commit }) {
            ajax("/api/user/profile", "get").then(res => {
                if (!res.data?.success) throw new Error(res.data);
                commit("setProfile", res.data.data);
                commit("wallet/setWallet", res.data.data.wallets.find(wallet => wallet.wallet_id == res.data.data.selected_wallet_id), { root: true })
                commit("authenticateSuccess")
            }).catch((err) => {
                console.log(err);
                commit("logout");
            })
        },
        async signup({ commit, dispatch }, { jwt, nickname }) {
            localStorage.setItem("authToken", jwt);
            ajax("/api/user/signup", "post", { data: { nickname: nickname } }).then(res => {
                if (!res.data?.success) throw new Error(res.data);
                dispatch("login")
            }).catch((err) => {
                console.log(err);
                commit("logout");
            });
        },
        async logout({ commit }) {
            localStorage.clear("authToken");
            commit("logout");
            /*
            ajax("/api/user/logout", "post", {data: {nickname: nickname}}).then(() => {
                dispatch("login")
            })
            */
        }
    },
    getters: {
        isLoggedin(state) {
            return state.isAuthenticated;
        },
        isReady(state) {
            return state.profile != null;
        },
        basicInformation(state) {
            return {
                nickname: state.profile?.nickname,
                username: state.profile?.username
            }
        },
        getUserId(state) {
            if(state.profile) return state.profile.user_id;
            return "";
        }
    }
}

export default auth;
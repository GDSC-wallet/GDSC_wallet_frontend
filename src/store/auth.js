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
        login({ commit }) {
            commit("logout");
            commit("setProfile", null);
            commit("setAuthToken", localStorage.getItem("authToken"));
            ajax("/api/user/profile", "get").then(res => {
                if (!res.data?.success) throw new Error(res.data);
                commit("setProfile", res.data.data)
            }).catch((err) => {
                console.log(err);
                commit("logout");
            })
        },
        signup({ commit, dispatch }, { jwt, nickname }) {
            localStorage.setItem("authToken", jwt);
            ajax("/api/user/signup", "post", { data: { nickname: nickname } }).then(res => {
                if (!res.data?.success) throw new Error(res.data);
                dispatch("login")
            }).catch((err) => {
                console.log(err);
                commit("logout");
            });
        },
        logout({ commit }) {
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
        }
    }
}

export default auth;
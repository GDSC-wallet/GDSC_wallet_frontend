import ajax from "../api"

const auth = {
    namespaced: true,
    state: {
        authToken: "",
        profile: null,
    },
    mutations: {
        setAuthToken(state, authToken) {
            state.authToken = authToken;
        },
        setProfile(state, profile) {
            state.profile = profile;
        }
    },
    actions: {
        login() {
            ajax("/api/user/profile", "get").then(res => {
                console.log(res.data);
            })
        },
        signup({ commit }, { jwt, nickname }) {
            console.log(jwt, nickname)
            localStorage.setItem("authToken", jwt);
            commit("setAuthToken", jwt);
            ajax("/api/user/signup", "post", {data: {nickname: nickname}}).then(res => {
                console.log(res.data)
            })
        },
        logout() {

        }
    },
    getters: {
        isLoggedin(state) {
            return state.profile != null;
        }
    }
}

export default auth;
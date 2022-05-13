<template>
  <p>pending...</p>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CallbackLogin",
  data() {
    return {};
  },
  mounted() {
    if (!this.$route.query.token)
      return this.$router.push({ path: "/login", replace: true });
    else {
      localStorage.setItem("authToken", this.$route.query.token);
      this.login().then(() => {
        this.$router.replace("/");
      });
    }
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
  },
  computed: {},
};
</script>
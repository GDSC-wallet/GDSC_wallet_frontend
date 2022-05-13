<template>
  <v-sheet>
    <v-card>
      <v-card-title>剩下最後一步，填寫你的暱稱吧</v-card-title>
      <v-card-text>
        <v-text-field label="暱稱" placeholder="暱稱" v-model="nickname" />
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary" @click="signup({jwt: jwt, nickname: nickname})">註冊</v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      jwt: "",
      nickname: ""
    };
  },
  mounted() {
    this.jwt = this.$route.query.token;
    this.$router.replace("/signup");
  },
  methods: {
    ...mapActions({
      signup: "auth/signup",
    }),
  },
  computed: {},
};
</script>
<template>
  <v-sheet>
    <p>this is Home</p>
    {{ basicInformation }}
  </v-sheet>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
    }),
  },
};
</script>
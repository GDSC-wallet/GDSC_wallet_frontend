<template>
  <v-sheet>
    <v-card>
      <v-card-title>{{ basicInformation.nickname }}</v-card-title>
      <v-card-subtitle>{{ basicInformation.username }}</v-card-subtitle>
      <v-container>
        <v-row>
          <v-col>
            <v-btn @click="handleDialogChange(true)" block>Edit Tag</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="logout" color="error" block>logout</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <TagModal :open="tagDialogOpen" @handleChange="handleDialogChange" />
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TagModal from "../components/TagModal/Main.vue"

export default {
  name: "Setting",
  data() {
    return {
      tagDialogOpen: false
    };
  },
  components: {
    TagModal: TagModal,
  },
  mounted() {},
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
    handleDialogChange(value) {
      this.tagDialogOpen = value;
    }
  },
  computed: {
    ...mapGetters({
      basicInformation: "auth/basicInformation",
    }),
  },
};
</script>
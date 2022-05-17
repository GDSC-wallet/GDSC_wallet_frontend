<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden;" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯標籤</v-toolbar-title>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto;">
        <DraggableTag :list="tagList" @handleChange="handleChange" />
      </v-container>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="success" block>新增標籤</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" block>儲存</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DraggableTag from "./components/Draggable.vue";
import { mapGetters } from "vuex";

export default {
  name: "RecordDialog",
  props: {
    open: Boolean,
  },
  data() {
    return {
      tagList: []
    };
  },
  components: {
    DraggableTag: DraggableTag,
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.tagList = this.tags.map(tag => Object.assign({}, tag));
    },
    handleChange(value) {
      this.tagList = value
    }
  },
  computed: {
    ...mapGetters({
      tags: "wallet/getWalletTags",
    }),
    dialogOpen: {
      get() {
        if(this.open == true) this.initialize();
        return this.open;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
  },
};
</script>
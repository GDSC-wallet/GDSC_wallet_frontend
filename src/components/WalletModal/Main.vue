<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>新增錢包</v-toolbar-title>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto">
      </v-container>
      <v-card-actions>
        <v-row justify="end">
          <v-col>
            <v-btn color="primary" block @click="updateTag">新增</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import DraggableTag from "./components/Draggable.vue";
import CreateModal from "./components/CreateModal.vue"
import { mapGetters } from "vuex";

export default {
  name: "RecordDialog",
  props: {
    open: Boolean,
  },
  data() {
    return {
      incomeList: [],
      expenseList: [],
      type: "income",
      createModalOpen: false
    };
  },
  components: {
    DraggableTag: DraggableTag,
    CreateModal: CreateModal
  },
  mounted() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.incomeList = this.tags("income").map((tag) => Object.assign({}, tag));
      this.expenseList = this.tags("expense").map((tag) => Object.assign({}, tag));
    },
    handleIncomeChange(value) {
      this.incomeList = value;
    },
    handleExpenseChange(value) {
      this.expenseList = value;
    },
    handleDialogChange(value) {
      this.createModalOpen = value
    },
    updateTag() {
      console.log(this.tagList)
    }
  },
  computed: {
    ...mapGetters({
      tags: "wallet/getWalletTags",
    }),
    dialogOpen: {
      get() {
        if (this.open == true) this.initialize();
        return this.open;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
    tab: {
      get() {
        if (this.type == "income") return 0;
        if (this.type == "expense") return 1;
        return 0;
      },
      set(value) {
        //this.initialize();
        if (value == 0) {
          this.type = "income";
        } else if (value == 1) {
          this.type = "expense";
        }
      },
    },
    tagList() {
      return this.expenseList.concat(this.incomeList);
    }
  },
};
</script>
<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-toolbar dark flat color="primary">
        <v-toolbar-title>編輯標籤</v-toolbar-title>
        <template v-slot:extension>
          <v-tabs v-model="tab" grow>
            <v-tab>收入</v-tab>
            <v-tab>支出</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-container class="flex-grow-1" style="overflow: auto">
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <DraggableTag :list="incomeList" @handleChange="handleIncomeChange" />
          </v-tab-item>
          <v-tab-item>
            <DraggableTag :list="expenseList" @handleChange="handleExpenseChange" />
          </v-tab-item>
        </v-tabs-items>
      </v-container>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="success" block @click="handleDialogChange(true)">新增標籤</v-btn>
          </v-col>
          <v-col>
            <v-btn color="primary" block @click="updateTag">儲存</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
    <CreateModal :open="createModalOpen" @handleChange="handleDialogChange" />
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
        this.initialize();
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
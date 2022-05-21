<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn block color="primary" v-bind="attrs" v-on="on">新增錢包</v-btn>
      </template>
      <v-card style="overflow: hidden" class="d-flex flex-column">
        <v-toolbar dark flat color="primary">
          <v-toolbar-title>{{ mode == "edit" ? "新增" : "修改"}}錢包</v-toolbar-title>
        </v-toolbar>
        <v-form
          @submit.prevent="handleSubmit"
          ref="form"
          lazy-validation
          v-model="valid"
        >
          <v-container class="flex-grow-1" style="overflow: auto">
            <v-text-field
              label="標題"
              prepend-icon="mdi-format-title"
              v-model="data.wallet_name"
              required
              :rules="[(v) => !!v || '請填入標題']"
            />
            <v-text-field
              label="備註"
              prepend-icon="mdi-message-text"
              v-model="data.wallet_description"
            />
          </v-container>
          <v-card-actions>
            <v-row justify="end">
              <v-col cols="6">
                <v-btn type="submit" color="primary" block :disabled="!valid"
                  >新增</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    mode: String,
    editingWallet: Object
  },
  data() {
    return {
      valid: true,
      dialog: false,
      data: {
        wallet_name: "",
        wallet_description: "",
        wallet_id: "",
      },
    };
  },
  methods: {
    ...mapActions({
      createWallet: "wallet/createWallet",
    }),
    handleSubmit() {
      if (!this.valid) return;
      this.createWallet(this.data).then(() => {
        this.dialog = false;
      });
    },
  },
  watch: {
    dialog() {
      if (this.$refs.form) this.$refs.form.resetValidation();
      if (this.mode == "create") {
        this.data = {
          wallet_name: "",
          wallet_description: "",
          wallet_id: "",
        };
      } else if(this.mode == "edit") {
        this.data = {
          wallet_name: this.editingWallet.wallet_name,
          wallet_description: this.editingWallet.wallet_description,
          wallet_id: this.editingWallet.wallet_id
        }
      }
    },
  },
};
</script>
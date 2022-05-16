<template>
  <v-dialog v-model="open" max-width="290">
    <v-card>
      <v-toolbar dark flat color="primary">
        <v-toolbar-title
          >{{ mode == "create" ? "新增" : "修改" }}帳目</v-toolbar-title
        >
        <template v-slot:extension>
          <v-tabs v-model="tab" grow>
            <v-tab>收入</v-tab>
            <v-tab>支出</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-form @submit.prevent="sendRecord">
        <v-card-text>
          <v-text-field
            label="標題"
            v-model="data.record_name"
            prepend-icon="mdi-format-title"
          ></v-text-field>
          <v-menu
            ref="record_date_picker"
            v-model="record_date_picker"
            :close-on-content-click="false"
            :return-value.sync="data.record_date"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="data.record_date"
                label="時間"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="data.record_date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="record_date_picker = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.record_date_picker.save(data.record_date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
          <v-text-field
            label="金額"
            v-model="data.record_amount"
            type="number"
            prepend-icon="mdi-currency-usd"
          ></v-text-field>
          <v-text-field
            label="標籤(未完成)"
            v-model="data.wallet_record_tag_id"
            disabled
            prepend-icon="mdi-tag"
          ></v-text-field>
          <v-text-field
            label="備註"
            v-model="data.record_description"
            prepend-icon="mdi-message-text"
          ></v-text-field>
        </v-card-text>
        <v-card-actions style="justify-content: flex-end">
          <v-btn
            type="submit"
            color="error"
            @click="deleteRecord(data)"
            v-if="mode == 'edit'"
          >
            刪除
          </v-btn>
          <v-btn type="submit" text color="primary">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "RecordDialog",
  data() {
    return {
      data: {
        record_amount: null,
        record_created_time: "",
        record_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .split("T")[0],
        record_description: "",
        record_id: "",
        record_name: "",
        record_ordinary: 1,
        record_type: "income",
        record_updated_time: "",
        wallet_record_tag_id: "tag_3be2eea8-1b6c-4809-9bb3-1c6df9a0caea",
      },
      record_date_picker: false,
    };
  },
  methods: {
    ...mapActions({
      closeModal: "record/closeModal",
      createRecord: "record/createRecord",
      editRecord: "record/editRecord",
      deleteRecord: "record/deleteRecord",
      setData: "record/setData",
    }),
    sendRecord() {
      console.log(this.mode)
      if(this.mode == "create") {
        this.createRecord(this.data);
      }else if(this.mode == "edit") {
        this.editRecord(this.data);
      }
    }
  },
  computed: {
    ...mapGetters({
      mode: "record/getMode",
      editData: "record/getData",
    }),
    open: {
      get() {
        return this.$store.getters["record/getModal"];
      },
      set(value) {
        if (value == true) this.$store.dispatch("record/openModal");
        if (value == false) this.$store.dispatch("record/closeModal");
      },
    },
    tab: {
      get() {
        if (this.data.record_type == "income") return 0;
        if (this.data.record_type == "expense") return 1;
        return 0;
      },
      set(value) {
        if (value == 0) {
          this.data.record_type = "income";
        } else if (value == 1) {
          this.data.record_type = "expense";
        }
      },
    },
  },
  watch: {
    open(newVal) {
      if (newVal == true) {
        if (this.mode == "create") {
          this.data = {
            record_amount: null,
            record_created_time: "",
            record_date: new Date(
              Date.now() - new Date().getTimezoneOffset() * 60000
            )
              .toISOString()
              .split("T")[0],
            record_description: "",
            record_id: "",
            record_name: "",
            record_ordinary: 1,
            record_type: "income",
            record_updated_time: "",
            wallet_record_tag_id: "tag_3be2eea8-1b6c-4809-9bb3-1c6df9a0caea",
          };
        } else if (this.mode == "edit") {
          this.data = Object.assign({}, this.editData);
          this.data.record_date = new Date(
            new Date(this.data.record_date) -
              new Date(this.data.record_date).getTimezoneOffset() * 60000
          ).toISOString().split("T")[0];
        }
      } else {
        this.setData(new Object());
      }
    },
  },
};
</script>

<style>
</style>
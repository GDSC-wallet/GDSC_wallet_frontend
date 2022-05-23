<template>
  <v-dialog v-model="open" max-width="500" scrollable>
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
      <v-form
        @submit.prevent="sendRecord"
        ref="form"
        lazy-validation
        v-model="valid"
      >
        <v-card-text>
          <v-text-field
            label="標題"
            v-model="data.record_name"
            prepend-icon="mdi-format-title"
            required
            :rules="[(v) => (v && v.length > 0) || '請填入標題']"
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
                required
                :rules="[(v) => (v && v.length > 0) || '請填入時間']"
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
            v-model.number="data.record_amount"
            type="number"
            prepend-icon="mdi-currency-usd"
            required
            :rules="[(v) => (v && !isNaN(parseFloat(v))) || '請填入金額']"
          ></v-text-field>
          <v-dialog
            ref="selectTagModal"
            v-model="record_tag_selector"
            :return-value.sync="data.wallet_record_tag_id"
            scrollable
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="標籤"
                v-model="selectedTagDisplay"
                prepend-icon="mdi-tag"
                readonly
                required
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-card class="d-flex flex-column">
              <v-card-title>選擇標籤</v-card-title>
              <v-divider />
              <v-list-item-group v-model="selectedTag" color="primary" mandatory>
                <v-list-item v-for="tag in walletTags" :key="tag.tag_id">
                  <v-list-item-content>
                    <v-list-item-title>{{ tag.tag_name }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
              <v-card-actions class="justify-end">
                <v-btn
                  color="primary"
                  @click="$refs.selectTagModal.save(data.wallet_record_tag_id)"
                >
                  確定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-text-field
            label="備註"
            v-model="data.record_description"
            prepend-icon="mdi-message-text"
          ></v-text-field>
        </v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-btn color="error" @click="deleteRecord(data)" block  v-if="mode == 'edit'">
                刪除
              </v-btn>
            </v-col>
            <v-col>
              <v-btn type="submit" color="primary" block :disabled="!valid">Submit</v-btn>
            </v-col>
          </v-row>
        </v-container>
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
        wallet_record_tag_id: "",
      },
      valid: true,
      record_date_picker: false,
      record_tag_selector: false,
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
      if (!this.$refs.form.validate()) return;
      if (this.mode == "create") {
        this.createRecord(this.data);
      } else if (this.mode == "edit") {
        this.editRecord(this.data);
      }
    },
  },
  computed: {
    ...mapGetters({
      mode: "record/getMode",
      editData: "record/getData",
      _walletTags: "wallet/getWalletTags",
      calendarDate: "calendar/getDate"
    }),
    walletTags() {
      return this._walletTags(this.data.record_type);
    },
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
        this.data.wallet_record_tag_id = "";
        if (value == 0) {
          this.data.record_type = "income";
        } else if (value == 1) {
          this.data.record_type = "expense";
        }
      },
    },
    selectedTag: {
      get() {
        return this.walletTags.indexOf(this.data.wallet_record_tag_id);
      },
      set(value) {
        this.data.wallet_record_tag_id = this.walletTags[value]?.tag_id
          ? this.walletTags[value].tag_id
          : "";
      },
    },
    selectedTagDisplay: {
      get() {
        return this.walletTags.find(
          (tag) => tag.tag_id == this.data.wallet_record_tag_id
        )?.tag_name;
      },
      set() {},
    },
  },
  watch: {
    "data.record_type"() {
      this.data.wallet_record_tag_id = this.walletTags[0]?.tag_id
    },
    open(newVal) {
      if (newVal == true) {
        if(this.$refs.form) this.$refs.form.resetValidation()
        if (this.mode == "create") {
          this.data = {
            record_amount: null,
            record_created_time: "",
            record_date: new Date(
              this.calendarDate - this.calendarDate.getTimezoneOffset() * 60000
            )
              .toISOString()
              .split("T")[0],
            record_description: "",
            record_id: "",
            record_name: "",
            record_ordinary: 1,
            record_type: "income",
            record_updated_time: "",
            wallet_record_tag_id: this.walletTags[0]?.tag_id,
          };
        } else if (this.mode == "edit") {
          this.data = Object.assign({}, this.editData);
          this.data.record_date = new Date(
            new Date(this.data.record_date) -
              new Date(this.data.record_date).getTimezoneOffset() * 60000
          )
            .toISOString()
            .split("T")[0];
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
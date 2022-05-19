<template>
  <v-sheet>
    <Calendar class="pa-1" />
    <v-expansion-panels accordion class="pa-1">
      <v-expansion-panel
        v-for="record in getTodaysRecords"
        :key="record.record_id"
      >
        <v-expansion-panel-header>
          {{ record.record_name }}
          <template v-slot:actions>
            <span
              >{{ record.record_type == "expense" ? "-" : ""
              }}{{ record.record_amount }}</span
            >
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ul class="pb-3">
            <li v-for="attr in Object.keys(record)" :key="attr">
              {{ attr }}: {{ record[attr] }}
            </li>
          </ul>
          <v-row>
            <v-col>
              <v-btn color="primary" @click="openRecordModal(record)" block
                >修改</v-btn
              >
            </v-col>
            <v-col>
              <v-btn color="error" @click="deleteRecord(record)" block
                >刪除</v-btn
              >
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>

<script>
import Calendar from "../components/Calendar/Main.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Calendar: Calendar,
  },
  mounted() {},
  methods: {
    ...mapActions({
      deleteRecord: "record/deleteRecord",
      openModal: "record/openModal",
      switchEditMode: "record/editMode",
      setData: "record/setData",
    }),
    openRecordModal(record) {
      this.openModal();
      this.switchEditMode();
      this.setData(record);
    },
  },
  computed: {
    ...mapGetters({
      currentDate: "calendar/getDate",
      records: "wallet/getRecords",
    }),
    getTodaysRecords() {
      return this.records.filter((record) => {
        let record_date = new Date(record.record_date);
        let selected_date = new Date(this.currentDate);
        return (
          record_date.setHours(0, 0, 0, 0) == selected_date.setHours(0, 0, 0, 0)
        );
      });
    },
  },
};
</script>
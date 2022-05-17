<template>
  <v-dialog v-model="dialogOpen" scrollable max-width="500">
    <v-card style="overflow: hidden" class="d-flex flex-column">
      <v-container class="flex-grow-1" style="overflow: auto">
        <v-card>
          <v-card-title>
            <v-text-field
              label="標籤名稱"
              dense
              class="flex-grow-1"
              hide-details="auto"
              outlined
            ></v-text-field>
            <v-dialog
              ref="colorPicker"
              v-model="coloPicker"
              :return-value.sync="data.color"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon class="px-4" :color="data.color">mdi-circle</v-icon>
                </v-btn>
              </template>
              <v-color-picker
                dot-size="25"
                swatches-max-height="200"
                v-if="coloPicker"
                v-model="data.color"
                full-width
              ></v-color-picker>
              <v-btn text color="primary" @click="coloPicker = false">
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.colorPicker.save(data.color)"
              >
                OK
              </v-btn>
            </v-dialog>
          </v-card-title>
        </v-card>
      </v-container>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-btn color="primary" block>儲存</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "RecordDialog",
  props: {
    open: Boolean,
  },
  data() {
    return {
      data: {
        name: "",
        color: "#FFFFFF",
      },
      coloPicker: false,
    };
  },
  mounted() {},
  methods: {},
  computed: {
    dialogOpen: {
      get() {
        return this.open;
      },
      set(value) {
        this.$emit("handleChange", value);
      },
    },
  },
};
</script>
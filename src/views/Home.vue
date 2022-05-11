
<template>
  <v-expansion-panels
  v-model="panel"
  :disabled="disabled"
  multiple
  >


    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">
              {{ trip.name }}
            </v-col>
            <v-col
              cols="8"
              class="text--secondary"
            >
              <v-fade-transition leave-absolute>
                <span
                  v-if="open"
                  key="0"
                >
                  
                </span>
                <span
                  v-else
                  key="1"
                >
                  {{ trip.name }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          v-model="trip.name"
          placeholder="Caribbean Cruise"
        ></v-text-field>
      </v-expansion-panel-content>
      </v-expansion-panel>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4"
           v-if="open"
          >
          </v-col>
          <v-col cols="4"
           v-else
          >
            {{ trip.name }}
          </v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
              </span>
              <span
                v-else-if = "trip.location != null"
                key="1"
              >
              <v-chip
                class="ma-2"
                color="primary"
              >
                {{ trip.location }}
              </v-chip>
              </span>
            </v-fade-transition>



          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row no-gutters>

          <v-col cols="5">

            <v-expansion-panel-content>
            <v-text-field
                v-model="trip.name"
                placeholder="Caribbean Cruise"
              ></v-text-field>
            </v-expansion-panel-content>
            <v-select
              v-model="trip.location"
              :items="locations"
              label = '選擇項目類型'
              chips
              flat
              solo
            ></v-select>
          </v-col>




        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="secondary"
          >
            取消
          </v-btn>
          <v-btn
            text
            color="primary"
          >
            儲存
          </v-btn>
        </v-card-actions>
      </v-expansion-panel-content>
    </v-expansion-panel>

   
  </v-expansion-panels>
</template>
    


<script>
  export default {
    data: () => ({

      date: null,
      trip: {
        name: '新增項目',
        location: null,
        start: null,
        end: null,
      },
      locations: ['早餐', '午餐', '晚餐', '衣物', '車費', '日用品','其他'],


    }),
  }
</script>
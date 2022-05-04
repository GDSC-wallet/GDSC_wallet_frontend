<template>
  <div class="text-center">
    <p>
      User's Name: {{ message }}
      <v-dialog
      v-model="dialog"
      width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ma-2"
            outlined
            fab
            small
            color='indigo'
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        
        <v-card>
          <v-card-title class="text-h5 grey lighten-2">
            Change Users' Name
          </v-card-title>

          <input v-model="message" placeholder="Name"  />
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              OK
            </v-btn>
            
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-card>
        
      </v-dialog>
    </p>

    <p>
      <v-btn depressed>
        Logout
      </v-btn>
    </p>

    <v-bottom-navigation
    v-model="value"
    :background-color="color"
    dark
    shift
    app
    >
      <v-btn>
        <span>Video</span>

        <v-icon>mdi-television-play</v-icon>
      </v-btn>

      <v-btn>
        <span>Music</span>

        <v-icon>mdi-music-note</v-icon>
      </v-btn>

      <v-btn>
        <span>Book</span>

        <v-icon>mdi-book</v-icon>
      </v-btn>

      <v-btn>
        <span>Image</span>

        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
    name: "Setting",
    data() {
        return {
            title: 'Setting',
            value: 1,
            name: 'Well',
            dialog: false
        }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
        color () {
        switch (this.value) {
          case 0: return 'blue-grey'
          case 1: return 'teal'
          case 2: return 'brown'
          case 3: return 'indigo'
          default: return 'blue-grey'
        }
      },
    }
}

</script>
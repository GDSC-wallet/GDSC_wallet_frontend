<template>
  <draggable
    class="list-group"
    tag="div"
    v-model="renderList"
    v-bind="dragOptions"
    handle=".handle"
    @start="drag = true"
    @end="drag = false"
  >
    <transition-group type="transition" :name="!drag ? 'flip-list' : null">
      <v-sheet class="list-group-item pa-1" v-for="tag in renderList" :key="tag.tag_id">
        <v-card>
          <v-card-title class="d-flex justify-space-between align-content-center">
            <span>
              <v-icon class="handle">mdi-drag</v-icon>
              {{ tag.tag_name }}
            </span>
            <span>
              <v-icon :color="tag.tag_color" class="px-2">mdi-circle</v-icon>
              <v-btn icon >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon color="error" @click="deleteTag(tag)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </span>
          </v-card-title>
        </v-card>
      </v-sheet>
    </transition-group>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "transition-example-2",
  props: {
    list: Array
  },
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      },
      drag: false,
    };
  },
  components: {
    draggable,
  },
  methods: {
    deleteTag(tag) {
      this.renderList = this.renderList.filter(listTag => listTag.tag_id != tag.tag_id)
    }
  },
  computed: {
    renderList: {
      get() {
        return this.list
      },
      set(value) {
        this.$emit("handleChange", value)
      }
    }
  },
};
</script>

<style>
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.list-group {
  min-height: 20px;
}
.handle {
  cursor: move;
}
</style>
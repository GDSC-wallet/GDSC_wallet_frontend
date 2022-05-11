<template>
  <div>
    <p>date(store): {{ $store.state.date }}</p>
    <p>month(store): {{ $store.state.month }}</p>
    <vc-date-picker v-model="date" />
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      date: new Date(),
    }
  },
  mounted() {
    this.date = this.$store.state.date;
  },
  watch: {
    date(new_date) {
      console.log(new Date (new_date).toISOString());
      this.$store.commit("change",new_date)
    }
  },
  methods: {
    
  },
  computed: {

  },
};
</script>



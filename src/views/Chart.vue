<template>
  <vc-donut
    :sections="[{ value: 25, text:'a' }, { value: 25 }, { value: 25 }, { value: 25 }]"
    :thickness="30">
  </vc-donut>
</template>
<script>
  export default {
    data() {
      return {
        sections: [
          { value: 25, color: '#31c0d6'}, 
          { value: 25, color: '#e66e53'},
          { value: 25, color: '#b184d1'},
          { value: 25, color: '#f5b042'},
          ],
         
      };
    }
  };
</script>
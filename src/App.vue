<template>
  <div id="app">
    <WorkBook />
  </div>
</template>

<script>
import WorkBook from '@/components/Workbook.vue';

export default {
  name: 'App',
  components: {
    WorkBook,
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font: 600 16px/1 'Nunito', sans-serif;
}

a {
  text-decoration: none;
}

button {
  border: none;
  cursor: pointer;
  outline: none;
}
</style>

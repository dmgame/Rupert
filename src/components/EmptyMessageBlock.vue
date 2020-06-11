<template>
  <div class="empty-block">{{ msg }}</div>
</template>

<script>
export default {
  name: 'EmptyMessageBlock',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.empty-block {
  text-align: center;
  color: #333
}
</style>

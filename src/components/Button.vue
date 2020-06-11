<template>
  <button class="btn-default" v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
};
</script>

<style lang="scss" scoped>
.btn-default {
  background: #F5F6FF;
  border-radius: 4px;
  padding: 7px 18px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  color: #92B0FF;
  transition: all 0.2s ease-in;

  &:hover {
    background: #e7e9fa;
  }
}
</style>

<template>
  <a :href="href" class="link-button" target="_blank">{{ text }}</a>
</template>

<script>
export default {
  name: 'LinkButton',
  props: {
    text: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.link-button {
  background: #FFEDE5;
  border-radius: 4px;
  font-weight: bold;
  font-size: 10px;
  line-height: 14px;
  color: #F66F44;
  display: inline-block;
  cursor: pointer;
  padding: 5px 20px;
}
</style>

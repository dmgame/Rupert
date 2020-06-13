<template>
  <div class="preview-image">
    <template v-if="loader">
      <Loader />
    </template>
    <template v-else-if="url">
      <img :src="url" :alt="alt">
    </template>
    <template v-else>
      <span class="preview-image__text">No Image</span>
    </template>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';

export default {
  name: 'ImagePreview',
  components: {
    Loader,
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: 'Image Preview',
    },
    loader: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 3px;
  background-color: #D9DAFF;
  width: 100%;
  height: 100%;

  img {
    height: 100%;
  }

  &__text {
    font-size: 9px;
    line-height: 12px;
    letter-spacing: 0.05em;
    color: #828282;
    font-weight: 400;
    text-transform: uppercase;
  }
}
</style>

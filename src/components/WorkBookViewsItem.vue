<template>
  <div class="workbook-views-item">
    <div class="workbook-views-item__info">
      <img
        src="@/assets/images/view-icon.png"
        alt="View icon"
        class="workbook-views-item__image"
        @click="openImagePreview"
      >
      <span class="workbook-views-item__name">{{ view.name }}</span>
      <a :href="contentLink" class="workbook-views-item__content-link" target="_black">Open</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkBookViewsItem',
  props: {
    view: {
      type: Object,
      required: true,
    },
  },
  computed: {
    contentLink() {
      const [workbookName, , sheetName] = this.view.contentUrl.split('/');
      return `${process.env.VUE_APP_SERVER_NAME}/#/site/${process.env.VUE_APP_USER_CONTENT_URL}/views/${workbookName}/${sheetName}`;
    },
  },
  methods: {
    openImagePreview() {
      this.$emit('openImagePreview', this.view.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.workbook-views-item {
  background-color: #fff;
  padding: 12px 8px 12px 14px;
  border-bottom: 1px solid #E5E6FF;
  margin-bottom: 5px;

  &__info {
    display: flex;
    align-items: center;
  }

  &__name {
    font-weight: bold;
    font-size: 10px;
    line-height: 14px;
    color: #333333;
    margin-left: 10px;
  }

  &__content-link {
    font-weight: bold;
    font-size: 10px;
    line-height: 20px;
    color: #F66F44;
    margin-left: auto;
    text-transform: uppercase;
  }

  &__image {
    cursor: pointer;
  }
}
</style>

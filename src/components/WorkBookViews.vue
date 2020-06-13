<template>
  <div class="workbook-views">
    <template v-if="views.length">
      <template v-for="view in views">
        <WorkBookViewsItem
          :key="view.id"
          :view="view"
          @openImagePreview="onOpenImagePreview"
        />
      </template>
    </template>
    <template v-else>
      <EmptyMessageBlock msg="No views" />
    </template>

    <Modal
      :name="previewModalName"
      width="90%"
      height="90%"
      @closed="onModalClose"
    >
      <div class="workbook-views__image-preview">
        <ImagePreview
          :url="viewPreviewImg"
          alt="View preview"
          :loader="viewPreviewImgLoading"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import WorkBookViewsItem from '@/components/WorkBookViewsItem.vue';
import ImagePreview from '@/components/ImagePreview.vue';
import EmptyMessageBlock from '@/components/EmptyMessageBlock.vue';
import { getWorkbookViewImage } from '@/services/workbook.service';

export default {
  name: 'WorkBookViews',
  components: {
    WorkBookViewsItem,
    ImagePreview,
    EmptyMessageBlock,
  },
  data: () => ({
    viewPreviewImg: '',
    viewPreviewImgLoading: false,
    previewModalName: 'image-preview',
  }),
  props: {
    views: {
      type: Array,
      default: () => [],
    },
    siteId: {
      type: String,
      required: true,
    },
  },
  methods: {
    async onOpenImagePreview(viewId) {
      try {
        this.viewPreviewImgLoading = true;
        this.$modal.show(this.previewModalName);
        const url = await getWorkbookViewImage(this.siteId, viewId);
        this.viewPreviewImg = url;
      } catch (err) {
        console.log(err);
      } finally {
        this.viewPreviewImgLoading = false;
      }
    },
    onModalClose() {
      this.viewPreviewImg = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.workbook-views {
  &__image-preview {
    width: 100%;
    height: 100%;
  }
}
</style>

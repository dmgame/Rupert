<template>
  <div class="workbook-details">
    <template v-if="selectedWorkBook">
      <h6 class="workbook-details__title">WORKBOOK PREVIEW</h6>
      <div class="workbook-details__preview">
        <ImagePreview
          :url="workbookPreviewImg"
          alt="Workbook preview"
          :loader="workbookPreviewImgLoading"
        />
      </div>

      <div class="workbook-details__description-block">
        <h6 class="workbook-details__title">WORKBOOK DESCRIPTION</h6>
        <p class="workbook-details__description">
          {{ selectedWorkBook.description || 'No Description' }}
        </p>
      </div>
      <div class="workbook-details__description-block">
        <h6 class="workbook-details__title">PROJECT DESCRIPTION</h6>
        <p class="workbook-details__description">
          {{ selectedWorkBook.project.description || 'No Description' }}
        </p>
      </div>
      <div class="workbook-details__info">
        <div class="workbook-details__info-item">
          <span class="workbook-details__info-item-label">LAST USED</span>
          <span class="workbook-details__info-item-value">
            {{ selectedWorkBook.updatedAt | passedTime }}
          </span>
        </div>
        <div class="workbook-details__info-item">
          <span class="workbook-details__info-item-label">OWNER</span>
          <span class="workbook-details__info-item-value">
            {{ selectedWorkBook.owner.fullName }}
          </span>
        </div>
        <div class="workbook-details__info-item">
          <span class="workbook-details__info-item-label">CREATED</span>
          <span class="workbook-details__info-item-value">
            {{ selectedWorkBook.createdAt | date('dd/MM/yyyy HH:mm') }}
          </span>
        </div>
        <div class="workbook-details__info-item">
          <span class="workbook-details__info-item-label">View Count</span>
          <span class="workbook-details__info-item-value">
            {{ selectedWorkBook.sheetCount }}
          </span>
        </div>
      </div>

      <div class="workbook-details__views">
        <h6 class="workbook-details__views-title">Views</h6>
        <WorkBookViews
          :views="selectedWorkBookViews"
          :siteId="siteId"
        />
      </div>
    </template>
    <template v-else>
      <EmptyMessageBlock msg="Please select an workbook from the list." />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getWorkbookPreviewImage } from '@/services/workbook.service';
import EmptyMessageBlock from '@/components/EmptyMessageBlock.vue';
import ImagePreview from '@/components/ImagePreview.vue';
import WorkBookViews from '@/components/WorkBookViews.vue';

export default {
  name: 'WorkBookDetails',
  components: {
    EmptyMessageBlock,
    ImagePreview,
    WorkBookViews,
  },
  data: () => ({
    workbookPreviewImg: '',
    workbookPreviewImgLoading: false,
  }),
  computed: {
    ...mapGetters('workbooks', [
      'selectedWorkBook',
      'selectedWorkBookViews',
      'selectedWorkBookId']),
    ...mapGetters('auth', ['siteId']),
  },
  watch: {
    selectedWorkBookId: 'loadWorkbookPreviewImage',
  },
  methods: {
    async loadWorkbookPreviewImage(workbookId) {
      try {
        this.workbookPreviewImgLoading = true;
        const url = await getWorkbookPreviewImage(this.siteId, workbookId);
        this.workbookPreviewImg = url;
      } catch (err) {
        console.log(err);
      } finally {
        this.workbookPreviewImgLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.workbook-details {
  background: #F5F6FF;
  height: 100%;
  padding: 25px 20px;

  &__preview {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }

  &__title {
    font-weight: normal;
    font-size: 9px;
    line-height: 12px;
    text-align: right;
    letter-spacing: 0.05em;
    color: #828282;
    margin-bottom: 15px;
  }

  &__description-block {
    padding-bottom: 12px;
    border-bottom: 1px solid #E5E6FF;
    margin-bottom: 17px;
  }

  &__description {
    font-size: 11px;
    line-height: 17px;
    color: #333333;
  }

  &__info {
    display: flex;
    flex-wrap: wrap;

    &-item {
      display: flex;
      width: 50%;
      align-items: center;
      margin-bottom: 10px;

      &-label {
        font-size: 9px;
        line-height: 12px;
        letter-spacing: 0.05em;
        color: #828282;
        font-weight: 400;
        text-transform: uppercase;
      }

      &-value {
        font-size: 11px;
        line-height: 17px;
        color: #333333;
        margin-left: 10px;
      }
    }
  }

  &__views {
    margin-top: 40px;

    &-title {
      display: inline-block;
      font-weight: bold;
      font-size: 14px;
      line-height: 22px;
      color: #5F68AD;
      padding-bottom: 6px;
      padding-left: 12px;
      padding-right: 20px;
      border-bottom: 4px solid #5F68AD;
      margin-bottom: 15px;
    }
  }
}
</style>

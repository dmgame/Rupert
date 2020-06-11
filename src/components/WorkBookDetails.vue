<template>
  <div class="workbook-details">
    <template v-if="selectedWorkBook">
      <h6 class="workbook-details__title">TEMPLATE</h6>
      <p class="workbook-details__description">
        {{ selectedWorkBook.description || 'No Description' }}
      </p>
      <div class="workbook-details__info-item">
        <span class="workbook-details__info-item-label">LAST USED</span>
        <span class="workbook-details__info-item-value">
          {{ selectedWorkBook.updatedAt | passedTime }}
        </span>
      </div>
      <div class="workbook-details__info-item">
        <span class="workbook-details__info-item-label">CREATED</span>
        <span class="workbook-details__info-item-value">
          {{ selectedWorkBook.createdAt | date('dd/MM/yyyy HH:mm') }}
        </span>
      </div>
    </template>
    <template v-else>
      <EmptyMessageBlock msg="Please select an workbook from the list." />
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import EmptyMessageBlock from '@/components/EmptyMessageBlock.vue';

export default {
  name: 'WorkBookDetails',
  components: {
    EmptyMessageBlock,
  },
  computed: {
    ...mapGetters('workbooks', ['selectedWorkBook']),
  },
};
</script>

<style lang="scss" scoped>
.workbook-details{
  background: #F5F6FF;
  height: 100%;
  padding: 25px 20px;

  &__title {
    font-weight: normal;
    font-size: 9px;
    line-height: 12px;
    text-align: right;
    letter-spacing: 0.05em;
    color: #828282;
    margin-bottom: 15px;
  }

  &__description {
    font-size: 11px;
    line-height: 17px;
    color: #333333;
    padding-bottom: 12px;
    border-bottom: 1px solid #E5E6FF;
    margin-bottom: 17px;
  }

  &__info-item {
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
    }

    &-value {
      font-size: 11px;
      line-height: 17px;
      color: #333333;
      margin-left: 10px;
    }
  }
}
</style>

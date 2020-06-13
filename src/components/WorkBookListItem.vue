<template>
  <div
    class="workbook-list-item"
    :class="itemClasses"
    @mouseenter="onItemHover"
    @mouseleave="onMouseLeave"
    @click="selectItem"
  >
    <div class="workbook-list-item__info">
      <span class="workbook-list-item__name">{{ workbook.name }}</span>
      <div class="workbook-list-item__additional-info">
        <img src="@/assets/images/link-ic.png" alt="">
        <span class="workbook-list-item__date">{{ workbook.createdAt | passedTime }}</span>
      </div>
    </div>
    <div class="workbook-list-item__owner-name">
      {{ workbook.owner.fullName }}
    </div>
    <div class="workbook-list-item__views-count">
      <span class="workbook-list-item__views-count-text">{{ workbook.sheetCount }}</span>
    </div>
    <LinkButton
      :href="workbook.webpageUrl"
      text="Open Asset"
      class="asset-link"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash';
import LinkButton from '@/components/LinkButton.vue';

export default {
  name: 'WorkBookListItem',
  props: {
    workbook: {
      type: Object,
      required: true,
    },
    selectedWorkbookId: {
      type: String,
      default: '',
    },
  },
  components: {
    LinkButton,
  },
  data: () => ({
    $debounced: null,
  }),
  computed: {
    itemClasses() {
      return {
        selected: this.selectedWorkbookId === this.workbook.id,
      };
    },
  },
  methods: {
    onItemHover() {
      this.$debounced = debounce(() => {
        this.selectItem();
      }, 2000);
      return this.$debounced();
    },
    onMouseLeave() {
      if (this.$debounced) {
        this.$debounced.cancel();
      }
    },
    selectItem() {
      this.$emit('selectItem', this.workbook.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.asset-link {
  transition: all 0.2s ease-in;
  opacity: 0;
}
.workbook-list-item {
  padding: 20px 30px;
  border-bottom: 2px solid #E5E6FF;
  display: grid;
  grid-template-columns: 70% 10% 10% 10%;
  transition: all 0.2s ease-in;
  align-items: center;
  cursor: pointer;

  &:hover, &.selected {
    background: linear-gradient(90deg, #FFFFFF -5.88%, rgba(255, 255, 255, 0) 16.27%), #F5F6FF;

    & .asset-link {
      opacity: 1;
    }

  }

  &:hover &__owner-name,
  &:hover &__views-count {
    opacity: 0;
  }

  &__name {
    color: #333333;
    font-size: 13px;
    line-height: 18px;
    font-weight: bold;
  }

  &__additional-info {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  &__date {
    font-size: 10px;
    line-height: 14px;
    color: #828282;
    margin-left: 10px;
  }

  &__owner-name {
    font-weight: 300;
    font-size: 10px;
    line-height: 11px;
    color: #000000;
    text-align: center;
    transition: all 0.2s ease-in;
  }

  &__views-count {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in;

    &-text {
      font-weight: bold;
      font-size: 11px;
      line-height: 16px;
      color: #4F4F4F;
      width: 30px;
      height: 18px;
      padding: 2px 8px;
      background: rgba(137, 209, 171, 0.5);
      border-radius: 2px;
      display: block;
      text-align: center;
    }
  }
}
</style>

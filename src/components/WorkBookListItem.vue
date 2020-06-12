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
  display: none;
}
.workbook-list-item {
  padding: 20px 30px;
  border-bottom: 2px solid #E5E6FF;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in;
  justify-content: space-between;
  cursor: pointer;

  &:hover, &.selected {
    background: linear-gradient(90deg, #FFFFFF -5.88%, rgba(255, 255, 255, 0) 16.27%), #F5F6FF;

    & .asset-link {
      display: block;
    }
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
}
</style>

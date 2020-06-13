<template>
  <div class="filters-wrap">
    <div class="filters-info">
      <img src="@/assets/images/search-icon.png" alt="Search icon">
      <span class="filters-info__text">Filters</span>
      <div
        class="toggle-filters"
        @click="toggleFilters"
        :class="toggleButtonClasses"
      >
        <img src="@/assets/images/arrow-down.png" alt="Arrow icon">
      </div>
    </div>
    <div class="filters-controls" v-if="!filtersCollapsed">
      <div class="filters-controls__item">
        <span class="filters-controls__item-label">CREATED</span>
        <BaseDatePicker
          @change="setFilter('createdAt', $event)"
          @clear="deleteFilter('createdAt')"
          placeholder="Choose Date"
        />
      </div>
      <div class="filters-controls__item">
        <span class="filters-controls__item-label">UPDATED</span>
        <BaseDatePicker
          @change="setFilter('updatedAt', $event)"
          @clear="deleteFilter('updatedAt')"
          placeholder="Choose Date"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import BaseDatePicker from '@/components/BaseDatePicker.vue';

export default {
  name: 'WorkBookFilters',
  components: {
    BaseDatePicker,
  },
  data: () => ({
    filtersCollapsed: true,
  }),
  computed: {
    ...mapGetters('workbooks', ['workbookFilters']),
    toggleButtonClasses() {
      return {
        opened: !this.filtersCollapsed,
      };
    },
  },
  methods: {
    ...mapActions('workbooks', ['addWorkbookFilter', 'deleteWorkbookFilter']),
    toggleFilters() {
      this.filtersCollapsed = !this.filtersCollapsed;
    },
    setFilter(field, val) {
      if (!val) return;
      if (this.isFilterExist(field) !== -1) {
        this.deleteFilter(field);
      }
      this.addWorkbookFilter([field, val]);
    },
    deleteFilter(field) {
      const index = this.isFilterExist(field);
      if (index !== -1) {
        this.deleteWorkbookFilter(index);
      }
    },
    isFilterExist(field) {
      const index = this.workbookFilters.findIndex(([filterField]) => filterField === field);
      return index;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters-wrap {
  background: #FAFBFF;
  padding: 15px;
  border-bottom: 1px solid #E5E6FF;
}

.filters-info {
  display: flex;
  align-items: center;

  &__text {
    font-weight: normal;
    font-size: 12px;
    line-height: 17px;
    color: #BDBDBD;
    margin-left: 10px;
  }
}

.toggle-filters {
  line-height: 0;
  transform-origin: center;
  cursor: pointer;
  margin-left: 30px;
}

.toggle-filters.opened {
  transform: rotate(180deg);
}

.filters-controls {
  display: flex;
  align-items: center;
  padding-top: 20px;

  &__item {
    display: flex;
    align-items: center;

    & + & {
      margin-left: 16px;
    }

    &-label {
      font-weight: normal;
      font-size: 8px;
      line-height: 17px;
      letter-spacing: 0.1em;
      color: #828282;
      margin-right: 10px;
      text-transform: uppercase;
    }
  }
}
</style>

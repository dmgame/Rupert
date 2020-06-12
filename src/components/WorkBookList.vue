<template>
  <div class="workbook-list">
    <template v-if="!workbooksList.length">
      <EmptyMessageBlock msg="No workbooks" />
    </template>
    <template v-else>
      <template v-for="item in workbooksList">
        <WorkBookListItem
          :key="item.id"
          :workbook="item"
          :selectedWorkbookId="selectedWorkBookId"
          @selectItem="onItemSelected"
        />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { cloneDeep } from 'lodash';
import { isSameDay } from 'date-fns';
import WorkBookListItem from '@/components/WorkBookListItem.vue';
import EmptyMessageBlock from '@/components/EmptyMessageBlock.vue';

const filterFunctions = {
  createdAt(item, date) {
    const itemDate = new Date(item.createdAt);
    const selectedDate = new Date(date);
    return isSameDay(itemDate, selectedDate);
  },
  updatedAt() {
    return true;
  },
};

export default {
  name: 'WorkBookList',
  components: {
    WorkBookListItem,
    EmptyMessageBlock,
  },
  computed: {
    ...mapGetters('workbooks', ['workbooks', 'workbookFilters', 'selectedWorkBookId']),
    workbooksList() {
      if (!this.workbookFilters.length) return this.workbooks;

      const res = this.workbookFilters.reduce(
        (acc, [field, value]) => acc.filter((item) => filterFunctions[field](item, value)),
        cloneDeep(this.workbooks),
      );

      return res;
    },
  },
  methods: {
    ...mapActions('workbooks', ['selectWorkBook']),
    onItemSelected(id) {
      this.selectWorkBook(id);
    },
  },
};
</script>

<style lang="scss" scoped>
.workbook-list {
  padding-top: 10px;
  padding-left: 16px;
}
</style>

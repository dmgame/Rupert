import mutations from '@/store/mutations';
import { getWorkbooks } from '../../services/workbook.service';

const {
  WORKBOOKS,
  WORKBOOKS_LOADER,
  SELECT_WORKBOOK,
  ADD_WORKBOOK_FILTERS,
  DELETE_WORKBOOK_FILTERS,
} = mutations;

const workBooksStore = {
  namespaced: true,
  state: {
    workbooks: {},
    workbooksIsLoading: false,
    selectedWorkBookId: '',
    workbookFilters: [], // [[field, value]]
  },
  getters: {
    workbooks: ({ workbooks }) => Object.values(workbooks),
    workbooksLoading: ({ workbooksIsLoading }) => workbooksIsLoading,
    selectedWorkBookId: ({ selectedWorkBookId }) => selectedWorkBookId,
    selectedWorkBook: ({ workbooks, selectedWorkBookId }) => workbooks[selectedWorkBookId] || null,
    workbookFilters: ({ workbookFilters }) => workbookFilters,
  },
  mutations: {
    [WORKBOOKS](state, arr) {
      state.workbooks = arr;
    },
    [WORKBOOKS_LOADER](state, bool) {
      state.workbooksIsLoading = bool;
    },
    [SELECT_WORKBOOK](state, id) {
      state.selectedWorkBookId = id;
    },
    [ADD_WORKBOOK_FILTERS](state, arr) {
      state.workbookFilters.push(arr);
    },
    [DELETE_WORKBOOK_FILTERS](state, index) {
      state.workbookFilters.splice(index, 1);
    },
  },
  actions: {
    toggleWorkBookLoader({ commit }, bool) {
      commit(WORKBOOKS_LOADER, bool);
    },
    selectWorkBook({ commit }, id) {
      commit(SELECT_WORKBOOK, id);
    },
    addWorkbookFilter({ commit }, filter) {
      commit(ADD_WORKBOOK_FILTERS, filter);
    },
    deleteWorkbookFilter({ commit }, index) {
      commit(DELETE_WORKBOOK_FILTERS, index);
    },
    async fetchWorkbooks({ dispatch, commit }, siteId) {
      try {
        dispatch('toggleWorkBookLoader', true);
        const res = await getWorkbooks(siteId);
        commit(WORKBOOKS, res);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('toggleWorkBookLoader', false);
      }
    },
  },
};

export default workBooksStore;

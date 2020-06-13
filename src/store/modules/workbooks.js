import mutations from '@/store/mutations';
import { getWorkbooks, getWorkbookViews } from '@/services/workbook.service';

const {
  WORKBOOKS,
  WORKBOOKS_LOADER,
  SELECT_WORKBOOK,
  ADD_WORKBOOK_FILTERS,
  DELETE_WORKBOOK_FILTERS,
  WORKBOOK_VIEWS,
} = mutations;

const workBooksStore = {
  namespaced: true,
  state: {
    workbooks: {},
    workbooksIsLoading: false,
    selectedWorkBookId: '',
    selectedWorkBookViews: [],
    selectedWorkBookImage: null,
    workbookFilters: [],
  },
  getters: {
    workbooks: ({ workbooks }) => Object.values(workbooks),
    workbooksLoading: ({ workbooksIsLoading }) => workbooksIsLoading,
    selectedWorkBookId: ({ selectedWorkBookId }) => selectedWorkBookId,
    selectedWorkBook: ({ workbooks, selectedWorkBookId }) => workbooks[selectedWorkBookId] || null,
    selectedWorkBookViews: ({ selectedWorkBookViews }) => selectedWorkBookViews,
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
    [WORKBOOK_VIEWS](state, arr) {
      state.selectedWorkBookViews = arr;
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
    async selectWorkBook({ commit }, { workbookId, siteId }) {
      try {
        commit(SELECT_WORKBOOK, workbookId);
        const res = await getWorkbookViews(siteId, workbookId);
        commit(WORKBOOK_VIEWS, res);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
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

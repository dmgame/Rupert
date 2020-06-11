import singIn from '@/services/auth.service';
import mutations from '@/store/mutations';

const { AUTH_DATA, AUTH_LOADER } = mutations;

const authStore = {
  namespaced: true,
  state: {
    authData: {},
    loginInProgress: false,
  },
  getters: {
    siteId: ({ authData }) => authData.siteId,
    loginInProgress: ({ loginInProgress }) => loginInProgress,
  },
  mutations: {
    [AUTH_DATA](state, obj) {
      state.authData = obj;
    },
    [AUTH_LOADER](state, bool) {
      state.loginInProgress = bool;
    },
  },
  actions: {
    async singIn({ commit }, { name, password, contentUrl }) {
      try {
        commit(AUTH_LOADER, true);
        const res = await singIn(name, password, contentUrl);
        commit(AUTH_DATA, res);
      } catch (err) {
        console.log(err);
      } finally {
        commit(AUTH_LOADER, false);
      }
    },
  },
};

export default authStore;

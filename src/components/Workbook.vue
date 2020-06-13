<template>
  <div class="workbook-layout">
    <div class="workbook-layout__list-wrap">
      <div class="workbook-layout__filters">
        <WorkBookFilters />
      </div>
      <div class="workbook-layout__load-button">
        <Button @click="signInUser">
          Import assets
        </Button>
      </div>
      <template v-if="loading">
        <div class="workbook-layout__loader">
           <Loader />
        </div>
      </template>
      <template v-else>
        <WorkBookList />
      </template>
    </div>
    <div class="workbook-layout__details-wrap">
      <WorkBookDetails />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import WorkBookList from '@/components/WorkBookList.vue';
import WorkBookDetails from '@/components/WorkBookDetails.vue';
import Button from '@/components/Button.vue';
import WorkBookFilters from '@/components/WorkBookFilters.vue';
import Loader from '@/components/Loader.vue';

export default {
  name: 'WorkBook',
  components: {
    WorkBookList,
    WorkBookDetails,
    Button,
    WorkBookFilters,
    Loader,
  },
  computed: {
    ...mapGetters('auth', ['siteId', 'loginInProgress']),
    ...mapGetters('workbooks', ['workbooksLoading']),
    loading() {
      return this.loginInProgress || this.workbooksLoading;
    },
  },
  watch: {
    siteId: 'loadWorkbooks',
  },
  methods: {
    ...mapActions('auth', ['singIn']),
    ...mapActions('workbooks', ['fetchWorkbooks']),
    signInUser() {
      this.singIn({
        name: process.env.VUE_APP_USER_NAME,
        password: process.env.VUE_APP_USER_PASSWORD,
        contentUrl: process.env.VUE_APP_USER_CONTENT_URL,
      });
    },
    loadWorkbooks(siteId) {
      if (!siteId) return;
      this.fetchWorkbooks(siteId);
    },
  },
};
</script>

<style lang="scss" scoped>
.workbook-layout {
  display: grid;
  grid-template-columns: minmax(72%, 100%) minmax(380px, 380px);
  width: 100%;
  max-width: 1920px;
  height: 100vh;

  &__list-wrap {
    background-color: #fff;
    box-shadow: 0px 2px 12px rgba(95, 104, 173, 0.15);
    position: relative;
  }

  &__load-button {
    padding-left: 30px;
  }

  &__filters {
    margin-bottom: 22px;
  }

  &__loader {
    display: flex;
    justify-content: center;
  }
}
</style>

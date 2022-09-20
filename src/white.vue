<template>
</template>

<script>
import { getApp } from './util';
export default {
  created() {
    this.app = getApp();
    this.app.$on("refreshPage", (v) => {
      console.log('zsssf js refreshPage')
      this.refreshPage(v)
    });
  },

  methods: {
    refreshPage(entryPage) {
      const params = JSON.parse(entryPage)
      if (params.url) {
        if (params.query) {
          // setFirstEntryPath(params.query);
          console.log('params.url--query--', params.url)
          this.$router.replace({ path: params.url, query: params.query });
        } else {
          console.log('params.url--', params.url)
          this.$router.replace(params.url);
        }
      }
    },
  },
};
</script>

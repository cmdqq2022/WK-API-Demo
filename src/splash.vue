<template>
</template>

<script>
import { getApp } from './util';
export default {
  data() {
    return {
      isClicked: false,
      isPressing: false,
    };
  },
  created() {
    this.app = getApp();
    this.app.$on("refreshPage", (v) => {
      console.log('js refreshPage')
      this.refreshPage(v)
    });
  },
  mounted() {
    // const aa = {"query":{"assortId":115,"programId":831890009,"uuid":"jslygxinwenzh","playType":"live","actionType":"全部频道"},"url":"/play"}
    const entryPage = this.app.$options.$superProps.entryPage
    this.refreshPage(entryPage)
    // // const entryPage = JSON.stringify({ url: '/info', query: { id: 23287, title: '我的影子在奔跑', src: 'https://ft-oss.fangtangtv.com/ssp/license/video2.mp4' }})
  },
  methods: {
    clickView() {
      this.isClicked = !this.isClicked;
    },

    onTouchBtnStart(evt) {
      console.log('onBtnTouchDown', evt);
      evt.stopPropagation();
    },

    onTouchBtnMove(evt) {
      console.log('onBtnTouchMove', evt);
      evt.stopPropagation();
      console.log(evt);
    },

    onTouchBtnEnd(evt) {
      console.log('onBtnTouchEnd', evt);
      evt.stopPropagation();
      console.log(evt);
    },
    refreshPage(entryPage) {
      // const entryPage = JSON.stringify({ url: '/info', query: { id: 23287, title: '我的影子在奔跑', src: 'https://ft-oss.fangtangtv.com/ssp/license/video2.mp4' }})
      const params = JSON.parse(entryPage)
      if (params.url) {
        if (params.query) {
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

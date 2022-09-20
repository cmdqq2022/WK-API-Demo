<template>
  <div id="iframe-demo" :style="iframeStyle">
    <label>内嵌网址：</label>
    <iframe class="iframe" ref="iframe" :src="url" @load="onLoad" />
    <label>内嵌html：</label>
    <iframe class="iframe" ref="iframe2" :source="{ html: html }" />
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
export default {
  data() {
    return {
      url: 'http://www.ysten.com/',
      displayUrl: 'http://www.ysten.com/',
      iframeStyle: {
        'min-height': Vue.Native ? 100 : '100vh',
      },
      html: '<div>iframe内容</div>',
    };
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
  methods: {
    jumpWhite() {
      this.$router.replace('/white');
    },
    backPress() {
      atlas.backPress();
    },
    onLoad(evt) {
      let { url } = evt;
      if (url === undefined) {
        url = this.$refs.iframe.src;
      }
      if (url !== this.url) {
        this.displayUrl = url;
      }
    }
  },
};
</script>

<style>
#iframe-demo {
  display: flex;
  flex: 1;
  flex-direction: column;
}

#iframe-demo #address {
  height: 48px;
  border-color: #ccc;
  border-width: 1px;
}

#iframe-demo .iframe {
  flex: 1;
  flex-grow: 1;
}
</style>

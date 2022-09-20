<template>
  <div class="container"
    style="width:1920px; height:1080px; display:flex; flex-direction:row; justify-content:center; align-items:center">
    <!-- content: 二维码要显示的内容 -->
    <qr-view style="width:200px; height:200px;" content="http://www.xxxx.com/" />
    <div style="width:100px; " />
    <qr-view style="width:200px; height:200px;" content="http://www.xxxx.com/" :optimize=true />
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '@/util';

import atlas from '../../atlas';

export default {
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
  }
}
</script>

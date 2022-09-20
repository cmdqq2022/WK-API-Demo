<template>


  <div class="loadingView">
    <loading-view color="#40b883" style="width: 120px;height: 120px;" />
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '@/util';
import atlas from '../../atlas';
export default {
  methods: {
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
};
</script>
<style>
.loadingView {
  width: 1920px;
  height: 1080px;
  padding: 50px;
  justify-content: center;
  align-items: center;
}
</style>

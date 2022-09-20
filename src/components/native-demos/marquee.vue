<template>
  <div class="loadingView">
    <label>横向跑马灯</label>
    <marquee-view :content="contentList" tag="marquee1" :append="isAppend" scrollTimes="2" textColor="#40b883"
      textSize="30" style="width: 200px;height: 60px;background-color:#ccc" />
    <label>竖向跑马灯</label>
    <marquee-view :content="contentList" tag="marquee2" interval="1000" orientation="top" textSize="30"
      style="width: 200px;height: 60px;background-color:#ccc;color:#40b883" />
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '@/util';
import atlas  from '../../atlas';
export default {
  data() {
    return {
      isAppend:false,
      contentList:["你好好","他好好","大家好好","一起好好"]
    }
  },
  methods: {
    backPress() {
      atlas.backPress();
    },
  },
  mounted() {
    this.app = getApp();
    this.app.$on('scrollEnd', (tag) => {
      console.log(tag)
    });
    // setTimeout(() => {
    //   this.isAppend=true;
    //   this.contentList=["111","222","333","444"]
    // }, 1000);
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

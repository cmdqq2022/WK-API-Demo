<template>
  <div class="container">
    <p class="feature-title">基础组件</p>
    <div class="feature-item" :clipChildren=false>
      <div v-for="(feature, index) in featureList" :key="feature.id" :focusable=true :focusScale="1.1"
        :requestFocus="index === 0" @press="routeTo(`/demo/${feature.id}`)" class="button" :enableFocusBorder=true>
        <text-view class="text-view" duplicateParentState gravity="center">{{ feature.name }}</text-view>
      </div>
    </div>

    <p class="feature-title" v-if="nativeFeatureList.length">扩展组件</p>
    <div class="feature-item">
      <div v-for="feature in nativeFeatureList" :key="feature.id" :focusable=true :focusScale="1.1"
        @press="routeTo(`/demo/${feature.id}`)" class="button" :enableFocusBorder=true>
        <text-view class="text-view" duplicateParentState gravity="center">{{ feature.name }}</text-view>
      </div>
    </div>

    <p class="feature-title" v-if="tvFeatureList.length">终端能力</p>
    <div class="feature-item">
      <div v-for="feature in tvFeatureList" :key="feature.id" :focusable=true :focusScale="1.1"
        @press="routeTo(`/demo/${feature.id}`)" class="button" :enableFocusBorder=true>
        <text-view class="text-view" duplicateParentState gravity="center">{{ feature.name }}</text-view>
      </div>
    </div>

    <p class="feature-title" v-if="tvAppList.length">电视应用</p>
    <div class="feature-item">
      <div v-for="feature in tvAppList" :key="feature.id" :focusable=true :focusScale="1.1"
        @press="newApp(`${feature.zipUrl}`)" class="button" :enableFocusBorder=true>
        <text-view class="text-view" duplicateParentState gravity="center">{{ feature.name }}</text-view>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import demos from './components/demos';
import tvDemos from './components/tv-demos';
import tvApps from './components/tv-apps';
import nativeDemos from './components/native-demos';
import { getApp } from './util';
import atlas from './atlas';

export default {
  name: 'App',
  data() {
    return {
      featureList: Object.keys(demos).map(demoId => ({
        id: demoId,
        name: demos[demoId].name,
      })),
      nativeFeatureList: Object.keys(nativeDemos).map(demoId => ({
        id: demoId,
        name: nativeDemos[demoId].name,
      })),
      tvFeatureList: Object.keys(tvDemos).map(demoId => ({
        id: demoId,
        name: tvDemos[demoId].name,
      })),
      tvAppList: Object.keys(tvApps).map(demoId => ({
        name: tvApps[demoId].name,
        zipUrl: tvApps[demoId].zipUrl,
      })),
      Vue,
    };
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
    // this.app.$on('nativeOnKeyDown', (key) => {
    //   console.log('zsssf keyCode: ' + key.keyCode)
    // });

    // this.app.$on('nativeLifecycle', (lifecycle) => {
    //   console.log('zsssf lifecycle: ' + lifecycle)
    // });
  },

  methods: {
    routeTo(url) {
      console.log("routeTo url: " + url)
      atlas.forward(url, '')
    },

    jumpWhite() {
      this.$router.replace('/white');
    },

    newApp(zipUrl) {
      atlas.newApp(zipUrl, null, '', '')
    },

    backPress() {
      console.log("zsssf home back")
      const now = new Date().getTime() / 1000
      clearTimeout(this.exitTimer)
      if (now - this.exitTime < 1) {
        console.log("zsssf home back 1")
        atlas.backPress()
      } else {
        this.exitTime = now
        this.exitTimer = setTimeout(() => {
          console.log("zsssf home back 2")
          atlas.TOAST('双击返回键退出APP')
        }, 1000)
      }
    },
  }
};
</script>

<style scope>
.container {

  width: 1920px;
  height: 1080px;
  padding-top: 50px;
  padding-left: 50px;
  padding-right: 50px;
  background-color: white;
}

.feature-item {
  width: 1820px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.feature-item .button {
  width: 240px;
  height: 68px;
  background-color: transparent;
  border-width: 2px;
  border-radius: 8px;
  border-color: #40b883;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  focus-background-color: #40b883;
}

.feature-item .button .text-view {
  width: 236px;
  height: 64px;
  font-size: 24px;
  text-align: center;
  line-height: 68px;
  color: #40b883;
  focus-color: white;
}

/* p {
  width: 240px;
  height: 68px;
  font-size: 24px;
  text-align: center;
  line-height: 68px;
  color: #999;
  focus-color: white;
} */

.feature-title {
  font-size: 30px;
  color: #555;
  text-align: left;
  line-height: 70px;
}
</style>

<template>
  <div id="root">
    <keep-alive>
      <router-view class="feature-content"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'App',
  // watch: {
  //   $route(to) {
  //     if (to.name === undefined) {
  //       this.subtitle = DEBUG_SUBTITLE;
  //       return;
  //     }
  //     this.subtitle = to.name;
  //   },
  // },
  // data() {
  //   return {
  //     imgs: {
  //       backButtonImg,
  //     },
  //     subtitle: DEBUG_SUBTITLE,
  //     DEBUG_SUBTITLE,
  //   };
  // },
  // methods: {
  //   goToHome() {
  //     this.$router.back();
  //   },
  //   remoteDebug() {
  //     if (this.subtitle !== DEBUG_SUBTITLE || !Vue.Native) {
  //       return;
  //     }
  //     Vue.Native.callNative('TestModule', 'debug', this.$options.parent.$options.rootViewId);
  //   },
  // },
  mounted() {
    // Vue.Native.callNative('DeviceEventModule', 'setListenBackPress', true);
  }
};
</script>

<style scoped>
  #root {
    flex: 1;
    background-color: transparent;
  }
  #header {
    height: 60px;
    background-color: #40b883;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
  }
  #back-btn {
    height: 24px;
    width: 24px;
    margin: 18px;
  }
  .row {
    flex-direction: row;
  }
  .column {
    flex-direction: column;
  }
  .center {
    justify-content: center;
    align-content: center;
  }
  .fullscreen {
    flex: 1;
  }
 
  .row {
    flex-direction: row;
  }
  .column {
    flex-direction: column;
  }
  .center {
    justify-content: center;
    align-content: center;
  }
  .fullscreen {
    flex: 1;
  }
  .toolbar {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }
  .toolbar .toolbar-btn {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    margin: 3px;
    border-style: solid;
    border-color: blue;
    border-width: 1px;
  }
  .toolbar .toolbar-btn p,
  .toolbar .toolbar-btn span {
    justify-content: center;
    text-align: center;
  }
  .toolbar .toolbar-text {
    line-height: 40px;
  }
  .title {
    font-size: 20px;
    line-height: 60px;
    margin-left: 5px;
    margin-right: 10px;
    font-weight: bold;
    background-color: #40b883;
    color: #ffffff;
  }
  .feature-content {
    background-color: #fff;
  }
</style>

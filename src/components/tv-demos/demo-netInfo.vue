<template>
  <div id="demo-netInfo">
    <div>
      <div class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="netInfo-title">网络类型</label>
        <p :duplicateParentState="true">{{ netInfo.type || 'unknown' }}</p>
      </div>
      <div class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="netInfo-title">连接状态</label>
        <p :duplicateParentState="true">{{ netInfo.state || 'unknown' }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';

export default {
  async mounted() {
    this.app = getApp();
    this.app.$on('networkStatusDidChange', this.netInfoChange);
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
  beforeDestroy() {
    // 取消 mounted 里监听的自定义事件
    Vue.Native.callNative('NetInfo', 'removeListener', 'netInfoChange');
    delete this.app;
  },
  data() {
    return {
      app: this.app,
      Vue,
      netInfo: {},
    };
  },
  methods: {
    netInfoChange(info) {
      this.netInfo = info;
    },
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
  },
  created() {
    Vue.Native.callNative('NetInfo', 'addListener', 'netInfoChange');
    Vue.Native.callNative('NetInfo', 'getCurrentConnectivity', info => {
      console.log("zsssf netinfo " + JSON.stringify(info));
      this.netInfoChange(info);
    });
  },
};
</script>

<style scope>
#demo-netInfo {
  flex: 1;
  padding: 12px;
  overflow-y: scroll;
}

#demo-netInfo .native-block {
  margin-top: 10px;
  margin-bottom: 10px;
  focus-background-color: #40b883;
}

#demo-netInfo .native-block p {
  color: #aaa;
  focus-color: #fff;
  width: 1800px;
  padding-left: 30px;
  text-align: left;
}

#demo-netInfo .netInfo-title {
  color: #aaa;
  focus-color: #fff;
  width: 1800px;
  padding-left: 30px;
  text-align: left;
  text-decoration: underline;
  text-decoration-line: underline;
}
</style>

<template>
  <div id="demo-vue-native" ref="rect">
    <div>
      <div v-if="Vue.Native.Platform" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">能力串(ability)</label>
        <p :duplicateParentState="true">{{ device.ability || 'unknown' }}</p>
      </div>
      <div v-if="device.username" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">用户名(username)</label>
        <p :duplicateParentState="true">{{ device.username || 'unknown' }}</p>
      </div>
      <div v-if="Vue.Native.Platform" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">串号/设备Id(deviceId)</label>
        <p :duplicateParentState="true">{{ device.deviceId || 'unknown' }}</p>
      </div>
      <div v-if="Vue.Native.Platform" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">MAC</label>
        <p :duplicateParentState="true">{{ device.mac || 'unknown' }}</p>
      </div>
      <div v-if="devicefetch.uid" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">Uid</label>
        <p :duplicateParentState="true">{{ devicefetch.uid || 'unknown' }}</p>
      </div>
      <div v-if="device.userToken" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">用户token(userToken)</label>
        <p :duplicateParentState="true">{{ device.userToken || 'unknown' }}</p>
      </div>
      <div v-if="device.stbid" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">stbid</label>
        <p :duplicateParentState="true">{{ device.stbid || 'unknown' }}</p>
      </div>
      <div v-if="Vue.Native.Platform" class="native-block" :focusable=true :requestFocus=true>
        <label :duplicateParentState="true" class="vue-native-title">ystenId</label>
        <p :duplicateParentState="true">{{ device.ystenId || 'unknown' }}</p>
      </div>

      <div v-if="Vue.Native.Platform === 'android'" class="native-block" :focusable=true>
        <label :duplicateParentState="true" class="vue-native-title">Vue.Native.APILevel</label>
        <p :duplicateParentState="true">{{ Vue.Native.APILevel || 'unknown' }}</p>
      </div>

      <div v-if="Vue.Native.Dimensions.window.width" class="native-block" :focusable=true>
        <label :duplicateParentState="true" class="vue-native-title">盒子分辨率（宽）</label>
        <p :duplicateParentState="true">{{ Vue.Native.Dimensions.window.width }}</p>
      </div>
      <div v-if="Vue.Native.Dimensions.window.height" class="native-block" :focusable=true>
        <label :duplicateParentState="true" class="vue-native-title">盒子分辨率（高）</label>
        <p :duplicateParentState="true">{{ Vue.Native.Dimensions.window.height }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';

const TEST_EVENT_NAME = 'testEvent';

export default {
  async mounted() {
    this.app = getApp();
    // app.$on() 其实主要是用于监听来自终端的事件，因为终端事件其实是通过 app 进行分发的。
    // 因为官方 demo 没有什么来自终端的自定义事件，所以这里造了一个通过 app 中转的伪终端事件。
    // 注意该事件在 mounted 里监听，需要在 beforeDestroy 里用 $off 取消监听。
    this.app.$on(TEST_EVENT_NAME, () => {
      this.eventTriggeredTimes += 1;
    });
    // ref="rect" 可以移动到任一元素上测试尺寸，除了 measureInWindow 在 android 上拿不到，别的都可以正常获取。
    const rect = await this.$refs.rect.getBoundingClientRect();
    this.rect = `Container rect: ${JSON.stringify(rect)}`;
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
  beforeDestroy() {
    // 取消 mounted 里监听的自定义事件
    this.app.$off(TEST_EVENT_NAME);
    delete this.app;
  },
  data() {
    // 屏幕是否是竖屏
    const { screenIsVertical } = Vue.Native;
    return {
      app: this.app,
      eventTriggeredTimes: 0,
      rect: null,
      Vue,
      screenIsVertical,
      device: {},
      devicefetch: { uid: "" }
    };
  },
  methods: {
    // 通过界面，触发经过 app 中转的事件，其实就是个假的终端事件。
    triggerAppEvent() {
      this.app.$emit(TEST_EVENT_NAME);
    },
    refreshScreenStatus() {
      // 当界面重新渲染时，刷新屏幕横竖状态
      // 需要注意的是这里会触发整体刷新，所以 width 和 height 也会改变。
      this.screenIsVertical = Vue.Native.screenIsVertical;
    },
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
  },
  created() {
    atlas.getDeviceInfo().then(value => {
      Vue.Native.callNative('ConsoleModule', 'log', 'getDeviceInfo: ' + JSON.stringify(value));
      this.device = value;
    });
    atlas.fetchDataInfo('middleware', 'uid').then(value => {
      Vue.Native.callNative('ConsoleModule', 'log', 'fetchDataInfo: ' + value);
      this.devicefetch.uid = value;
    });
  }

};
</script>

<style scope>
#demo-vue-native {
  flex: 1;
  padding: 12px;
  overflow-y: scroll;
}

.native-block {
  margin-top: 10px;
  margin-bottom: 10px;
  focus-background-color: #40b883;
}

.native-block p {
  color: #aaa;
  focus-color: #fff;
  width: 1800px;
  padding-left: 30px;
  text-align: left;
}

.vue-native-title {
  color: #aaa;
  focus-color: #fff;
  width: 1800px;
  padding-left: 30px;
  text-align: left;
  text-decoration: underline;
  text-decoration-line: underline;
}
</style>

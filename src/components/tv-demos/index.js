import Vue from 'vue';
import demoVueNative from './demo-vue-native.vue';
import focusBasic from './focus-basic.vue';
import focusEvent from './focus-event.vue';
import focusNext from './focus-next.vue';
import demoJump from './demo-jump.vue';
import demoNetInfo from './demo-netInfo.vue';

const demos = {};

if (Vue.Native) {
  Object.assign(demos, {
    demoVueNative: {
      name: '机顶盒信息',
      component: demoVueNative,
    },
    demoJump: {
      name: '机顶盒跳转',
      component: demoJump,
    },
    demoNetInfo: {
      name: '网络信息',
      component: demoNetInfo,
    },
    focusBasic: {
      name: 'focus基础',
      component: focusBasic,
    },
    focusEvent: {
      name: 'focus事件',
      component: focusEvent,
    },
    focusNext: {
      name: 'nextFocusName',
      component: focusNext,
    },
  });
}

export default demos;

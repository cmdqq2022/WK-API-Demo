import Vue from 'vue';
import demoAnimation from './demo-animation.vue';
import demoDialog from './demo-dialog.vue';
import demoSwiper from './demo-swiper.vue';
import listView from './list.vue';
import demoGrid from './demo-grid.vue';
import textView from './text-view.vue';
import imageView from './image-view.vue';
import demoQr from './img-qr.vue';
import demoLoading from './loading.vue';
import demoSeekBar from './progress.vue';
import demoVideo from './video.vue';
import demoMarquee from './marquee.vue';
import demoScrollview from './demo-scrollview.vue';

const demos = {};

if (Vue.Native) {
  Object.assign(demos, {
  
    demoAnimation: {
      name: '动画组件',
      component: demoAnimation,
    },
    demoModal: {
      name: '弹窗组件',
      component: demoDialog,
    },
    demoSwiper: {
      name: 'swiper 组件',
      component: demoSwiper,
    },
    textView: {
      name: 'TextView 组件',
      component: textView,
    },
    imageView: {
      name: 'ImageView 组件',
      component: imageView,
    },
    listView: {
      name: 'ListView扩展',
      component: listView,
    },
    demoGrid: {
      name: 'Grid组件',
      component: demoGrid,
    },
    loading: {
      name: 'Loading组件',
      component: demoLoading,
    },
    progress: {
      name: 'Progress组件',
      component: demoSeekBar,
    },
    imgQr: {
      name: '二维码组件',
      component: demoQr,
    },
    videoView: {
      name: '视频组件',
      component: demoVideo,
    },
    marqueeView: {
      name: '跑马灯组件',
      component: demoMarquee,
    },
    demoScrollview: {
      name: '综合滚动组件',
      component: demoScrollview,
    },
  });
}

export default demos;

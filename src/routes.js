import Splash from './splash.vue';
import White from './white.vue';
import Menu from './menu.vue';
import demos from './components/demos';
import nativeDemos from './components/native-demos';
import tvDemos from './components/tv-demos';

export default {
  /**
   * 阻止 Android 上 Back 键触发页面返回
   * 默认值为 false，就是开启 Back 键返回。
   */
  disableAutoBack: false,

  /**
   * 定义路由
   * 这里偷了个懒直接做了个大数组，跟 splash.vue 里互相匹配动态加载。
   */
  routes: [
    {
      path: '/',
      component: Splash
    },
    {
      path: '/white',
      component: White,
      name:'White'
    },
    {
      path: '/home',
      component: Menu,
      name:'Menu'
    },
    ...Object.keys(demos).map(demoId => ({
      path: `/demo/${demoId}`,
      name: demos[demoId].name,
      component: demos[demoId].component,
    })),
    ...Object.keys(nativeDemos).map(demoId => ({
      path: `/demo/${demoId}`,
      name: nativeDemos[demoId].name,
      component: nativeDemos[demoId].component,
    })),
    ...Object.keys(tvDemos).map(demoId => ({
      path: `/demo/${demoId}`,
      name: tvDemos[demoId].name,
      component: tvDemos[demoId].component,
    })),
  ],
};

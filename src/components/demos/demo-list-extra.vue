<template>
  <div id="demo-list" :descendantFocusability='1'>
    <div class="toolbar">
      <button class="toolbar-btn focus-btn" @click="scrollToNextPage" :focusable='true'>
        <span>翻到下一页</span>
      </button>
      <button class="toolbar-btn focus-btn" @click="scrollToBottom" :focusable='true'>
        <span>翻动到底部</span>
      </button>
      <button class="toolbar-btn focus-btn" @click="requestChildFocus" :focusable='true'>
        <span>requestChildFocus 1</span>
      </button>
      <button class="toolbar-btn focus-btn" @click="setTargetFocusChildPosition" :focusable='true'>
        <span>setTargetFocusChildPosition 3</span>
      </button>
      <p class="toolbar-text">列表元素数量：{{ dataSource.length }}</p>
    </div>
    <!--
      *** numberOfRows 是 iOS 渲染列表的必备参数，它的值是 ul 中 li 的数量***

      iOS 上有个渲染上屏时机的优化，它不是发送一个 li 渲染一个 li，而是先更新 numberOfRows 告诉终端将有几个列表元素要
      渲染了，然后再去添加 li，达到那个数量再统一上屏。
      对于都是静态的 li，ystv-vue 会自动计算好 li 数量（这可以通过计算子节点数量获得），但是对于从数据中动态生成的 li 就没有办法了，
      因为 ystv-vue 作为 Vue 的一个终端渲染层，Vue 只是向它发送 createNode 的指令，而根本无法知道将有多少个数据会生成 li。
      所以这里就需要开发者手动填一下，值就是：静态的 li 数量 + 将生成 li 的数据数量。
    -->
    <ul id="list" ref="list" @loadMore="onEndReached" @scroll="onScroll" :numberOfRows="dataSource.length"
      :exposureEventEnabled="true" :preloadItemNumber='5'>
      <!--
        li 有两个参数是一定要加上的。
        1. :key 是用于标示数据唯一性的，数据不发生改动，key 就不能变，这牵扯到 Vue 的 diff 算法，加上 key 后能避免节点重新渲染，对业务性能会有帮助。
            这里用 index 做 key 是个坏例子，因为 demo 数据都是重复的，业务开发时不能用 index 做 key。
            详情：https://cn.vuejs.org/v2/guide/list.html#key
        2. :type 在终端层有特殊意义，用于表示所使用的 UI 样式类型，终端层会对之前用过的组件进行复用。
            定义 :type 之后可以从缓存池中将之前已经渲染的终端节点拿出来复用，以达到更高的性能
      -->
      <li v-for="(ui, index) in dataSource" :key="index" :type="ui.style" :preloadItemNumber="5" @layout="onItemLayout"
        @appear="onAppear(index)" @disappear="onDisappear(index)" @willAppear="onWillAppear(index)"
        @willDisappear="onWillDisappear(index)" :focusable='true'>
        <p class="list-box" :focusable='false' :duplicateParentState='true'>{{ ui.itemBean.title }}</p>
      </li>
    </ul>
    <p id="loading" :focusable='false' v-show="loadingState">{{ loadingState }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import mockData from '../list-items/mock';
import '../list-items';
import { getApp } from '../../util';
import atlas from '../../atlas';

const STYLE_LOADING = 100;
const MAX_FETCH_TIMES = 50;

const heightOfComponents = {};

export default {
  data() {
    return {
      loadingState: '',
      dataSource: [],
      scrollPos: {
        top: 0,
        left: 0,
      },
      Vue,
      STYLE_LOADING,
    };
  },

  mounted() {
    // *** isLoading 是加载锁，业务请照抄 ***
    // 因为 onEndReach 位于屏幕底部时会多次触发，
    // 所以需要加一个锁，当未加载完成时不进行二次加载
    this.isLoading = false;
    this.dataSource = [...mockData];

    // 启动时保存一下屏幕高度，一会儿算曝光时会用到
    if (Vue.Native) {
      this.$windowHeight = Vue.Native.Dimensions.window.height;
    } else {
      this.$windowHeight = window.innerHeight;
    }

    // 初始化时曝光，因为子元素加载需要时间，建议延迟 500 毫秒后执行
    setTimeout(() => this.exposureReport(0), 500);
  },

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

    // item完全曝光
    onAppear(index) {
      console.log('onAppear', index);
    },
    // item完全隐藏
    onDisappear(index) {
      console.log('onDisappear', index);
    },
    // item至少一个像素曝光
    onWillAppear(index) {
      console.log('onWillAppear', index);
    },
    // item至少一个像素隐藏
    onWillDisappear(index) {
      console.log('onWillDisappear', index);
    },
    mockFetchData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.fetchTimes += 1;
          if (this.fetchTimes >= MAX_FETCH_TIMES) {
            return resolve(null);
          }
          return resolve(mockData);
        }, 300);
      });
    },
    async onEndReached() {
      const { dataSource } = this;
      console.log("loadMore start");
      // 检查锁，如果在加载中，则直接返回，防止二次加载数据
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;
      this.loadingState = '正在加载...';

      const newData = await this.mockFetchData();
      if (!newData) {
        this.loadingState = '没有更多数据';
        this.isLoading = false;
        return;
      }

      this.loadingState = '';
      this.dataSource = [...dataSource, ...newData];
      this.isLoading = false;
    },
    // 需要说明的是，Web 端的 overflow: scroll，滚屏时并不会触发 scroll 消息，这个方法仅针对 Native.
    onScroll(evt) {
      evt.stopPropagation(); // 这个事件触发比较频繁，最好阻止一下冒泡。
      this.scrollPos = {
        top: evt.offsetY,
        left: evt.offsetX,
      };
      // 初始化时曝光上报
      this.exposureReport(evt.offsetY);
    },
    onItemLayout(evt) {
      // 保存一下 ListItemView 尺寸的高度
      heightOfComponents[evt.target.index] = evt.top;
    },
    /**
       * 曝光上报
       * @param {number} screenTop 屏幕高度
       */
    exposureReport(screenTop) {
      // 获取可视范围内的组件
      const componentsInWindow = Object.keys(heightOfComponents).filter((index) => {
        const height = heightOfComponents[index];
        return screenTop <= height && screenTop + this.$windowHeight >= height;
      });
      // 其实没有上报，只是把界面上正在曝光的组件列出来了。
      // 同时曝光锁还得业务自己做。
      console.log('Exposuring components:', componentsInWindow);
    },
    /**
       * 翻到下一页
       */
    scrollToNextPage() {
      // 因为布局问题，浏览器内 flex: 1 后也会超出窗口尺寸高度，所以这么滚是不行的。
      if (!Vue.Native) {
        /* eslint-disable-next-line no-alert */
        alert('This method is only supported in Native environment.');
        return;
      }
      const { list } = this.$refs;
      const { scrollPos } = this;
      const top = scrollPos.top + this.$windowHeight - 200; // 偷懒假定内容区域为屏幕高度 - 200
      // CSSOM View standard - ScrollToOptions
      // https://www.w3.org/TR/cssom-view-1/#extensions-to-the-window-interface
      list.scrollTo({
        left: scrollPos.left,
        top,
      }); // 其实 scrollPost.left 写 0 也可以。
    },
    /**
       * 滚动到底部
       */
    scrollToBottom() {
      if (!Vue.Native) {
        /* eslint-disable-next-line no-alert */
        alert('This method is only supported in Native environment.');
        return;
      }
      const { list } = this.$refs;
      list.scrollToIndex(0, list.childNodes.length - 1);
    },
    requestChildFocus(e) {
      const { list } = this.$refs;
      atlas.requestChildFocus(list, 1)
    },
    setTargetFocusChildPosition(e) {
      const { list } = this.$refs;
      atlas.setTargetFocusChildPosition(list, 3)
    },
  },
};
</script>

<style scoped>
#demo-list {
  flex: 1;
  padding: 12px;
}

#demo-list #loading {
  font-size: 11px;
  color: #aaa;
  align-self: center;
}

.focus-btn {
  focus-background-color: #8b17cc;
}

#demo-list .article-title {
  font-size: 17px;
  line-height: 24px;
  color: #242424;
}

#demo-list .normal-text {
  font-size: 11px;
  color: #aaa;
  align-self: center;
}



#demo-list .style-two-image-container {
  flex: 1;
}

#demo-list .style-two-image {
  height: 140px;
}

#demo-list .list-box {
  height: 140px;
  width: 300px;
  focus-background-color: #8b178b;
}
</style>

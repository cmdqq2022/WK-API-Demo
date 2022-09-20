<template>
  <div id="demo-grid">
    <div class="toolbar">
      <button class="toolbar-btn-1" @click="scrollToNextPage" :focusable="true" :requestFocus="true">
        <p duplicateParentState>翻到下一页</p>
      </button>
      <button class="toolbar-btn-1" @click="scrollToTop" :focusable="true">
        <p duplicateParentState>翻动到顶部</p>
      </button>
      <button class="toolbar-btn-1" @click="scrollToBottom" :focusable="true">
        <p :duplicateParentState="true">翻动到底部</p>
      </button>
    </div>
    <div class="toolbar">
      <p class="toolbar-text">列表元素数量：{{ dataSource.length }}</p>
    </div>
    <grid-view ref="gridview" name="gridview" @loadMore="onLoadMore" @endReached="endReached" :preloadItemNumber="2"
      @scroll="onScroll" :numberOfRows="dataSource.length" :numberOfColumns='4' :clipChildren="false"
      :exposureEventEnabled=true :onScrollEnable=true class="grid" :columnSpacing=8 :interItemSpacing=8
      :focusMemory=true setSelectChildPosition=8 makeChildVisibleType='normal'
      :contentInset="{ top: 24, left: 16, bottom: 24, right: 16 }">
      <!--
        li 有两个参数是一定要加上的。
        1. :key 是用于标示数据唯一性的，数据不发生改动，key 就不能变，这牵扯到 Vue 的 diff 算法，加上 key 后能避免节点重新渲染，对业务性能会有帮助。
            这里用 index 做 key 是个坏例子，因为 demo 数据都是重复的，业务开发时不能用 index 做 key。
            详情：https://cn.vuejs.org/v2/guide/list.html#key
        2. :type 在终端层有特殊意义，用于表示所使用的 UI 样式类型，终端层会对之前用过的组件进行复用。
            定义 :type 之后可以从缓存池中将之前已经渲染的终端节点拿出来复用，以达到更高的性能
      -->
      <grid-item v-for="(ui, index) in dataSource" :key="index" @layout="onItemLayout" :focusable=false
        :clipChildren="false" class="grid-item" :spanSize="1">
        <div class="li-item" :focusable=true :focusScale="1.05" :enableFocusBorder=true name='ui.itembean.title'>
          <p class="article-title">{{ index + ' : ' + ui.itemBean.title }}</p>
        </div>
      </grid-item>
    </grid-view>
    <p id="loading" v-show="loadingState">{{ loadingState }}</p>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import mockData from '../list-items/mock';
import '../list-items';

const STYLE_LOADING = 100;
const MAX_FETCH_TIMES = 50;

const heightOfComponents = {};

export default {
  data() {
    return {
      loadingState: '',
      dataSource: [],
      Vue,
      STYLE_LOADING,
    };
  },
  mounted() {
    // *** isLoading 是加载锁，业务请照抄 ***
    // 因为 onEndReach 位于屏幕底部时会多次触发，
    // 所以需要加一个锁，当未加载完成时不进行二次加载
    this.isLoading = false;
    this.dataSource = [...this.getSpanMockData(), ...this.getSpanMockData()];

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
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },
    getSpanMockData() {
      return mockData.map(q => {
        return Object.assign({}, q, { span: this.getRandomArbitrary(1, 3) })
      })
    },
    mockFetchData() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.fetchTimes += 1;
          if (this.fetchTimes >= MAX_FETCH_TIMES) {
            return resolve(null);
          }
          return resolve(this.getSpanMockData());
        }, 300);
      });
    },
    async onLoadMore() {
      console.log("onLoadMore load more ...")
      const { dataSource } = this;

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
      const { gridview } = this.$refs;
      console.log("scrollToNextPage ", this.dataSource.length - 1)
      console.log("scrollToNextPage ", gridview.scrollToIndex)
      gridview.scrollToIndex({ index: this.dataSource.length - 1, animated: false });
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
      const { gridview } = this.$refs;
      const end = gridview.$el.childNodes.length - 1
      console.log("scrollToBottom " + end)
      gridview.scrollToIndex({ index: end, animated: true });
    },
    scrollToTop() {
      if (!Vue.Native) {
        /* eslint-disable-next-line no-alert */
        alert('This method is only supported in Native environment.');
        return;
      }
      const { gridview } = this.$refs;
      gridview.scrollToIndex(0);
    },
    endReached() {
      console.log("endReached ")
    },
  },
};
</script>

<style scoped>
#demo-grid {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

#demo-grid #loading {
  font-size: 20px;
  color: #aaa;
  align-self: center;
}

#demo-grid .grid {
  flex: 1;
  width: 1680px;
}

#demo-grid #list {
  flex: 1;
  background-color: white;
}

#demo-grid .grid-item {
  padding: 20px;
  background-color: bisque;
}

#demo-grid .li-item {
  background-color: #f5f5f5;
  border-width: 3px;
  border-radius: 8px;
  border-color: transparent;
  width: 360px;
  height: 120px;
  padding: 20px;
  focus-border-width: 4px;
  focus-border-radius: 24px;
  focus-border-color: #40b883;
  select-background-color: #b8ac40;

}

#demo-grid .article-title {
  font-size: 17px;
  line-height: 24px;
  color: #242424;
  select-color: cyan;
}

#demo-grid .normal-text {
  font-size: 14px;
  color: #aaa;
  align-self: center;
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

.toolbar-btn-1 {
  width: 204px;
  height: 60px;
  border-width: 2px;
  border-radius: 6px;
  margin-right: 20px;
  border-color: #40b883;
  focus-background-color: #40b883;
}

.toolbar-btn-1 p {
  width: 200px;
  height: 56px;
  text-align: center;
  font-size: 24px;
  color: #40b883;
  focus-color: white;
}
</style>

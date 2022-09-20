<template>
  <div class="div-demo-scroll">
    <div class="div-demo-scroll-1" :focusable=false @keyRight="onKeyRight" nextFocusName="{right: 'self'}">
      <!-- div 带着 overflow 属性的，只能有一个子节点，否则终端会崩溃 -->
      <div class="display-flex flex-column" clipChildren=false>
        <div ref="div1" class="scroll-text-block" :focusable=true @focus="onListFocus(0)">
          <p duplicateParentState>搜索</p>
        </div>
        <div ref="div2" class="scroll-text-block" :focusable=true @focus="onListFocus(1)">
          <p duplicateParentState>手机看电视</p>
        </div>
        <div ref="div3" class="scroll-text-block" :focusable=true @focus="onListFocus(2)">
          <p duplicateParentState>频道足迹</p>
        </div>
        <div ref="div4" class="scroll-text-block" :focusable=true @focus="onListFocus(3)">
          <p duplicateParentState>收藏</p>
        </div>
      </div>
    </div>
    <p>--------------------------------------------------</p>
    <div class="div-demo-scroll-2" :focusable=false @keyRight="onKeyRight" nextFocusName="{right: 'self'}">
      <!-- div 带着 overflow 属性的，只能有一个子节点，否则终端会崩溃 -->
      <div class="display-flex flex-column" clipChildren=false>
        <div ref="div5" class="scroll-text-block" :focusable=true @focus="onListFocus(4)">
          <p duplicateParentState>最新 回看</p>
        </div>
        <div ref="div6" class="scroll-text-block" :focusable=true @focus="onListFocus(5)">
          <p duplicateParentState>电视剧 回看</p>
        </div>
        <div ref="div7" class="scroll-text-block" :focusable=true @focus="onListFocus(6)">
          <p duplicateParentState>电影 回看</p>
        </div>
        <div ref="div8" class="scroll-text-block" :focusable=true @focus="onListFocus(7)">
          <p duplicateParentState>新闻 回看</p>
        </div>
        <div ref="div9" class="scroll-text-block" :focusable=true @focus="onListFocus(8)">
          <p duplicateParentState>体育 回看</p>
        </div>
        <div ref="div10" class="scroll-text-block" :focusable=true @focus="onListFocus(9)">
          <p duplicateParentState>娱乐 回看</p>
        </div>
        <div ref="div11" class="scroll-text-block" :focusable=true @focus="onListFocus(10)">
          <p duplicateParentState>少儿 回看</p>
        </div>
        <div ref="div12" class="scroll-text-block" :focusable=true @focus="onListFocus(11)">
          <p duplicateParentState>综艺 回看</p>
        </div>
      </div>
    </div>
    <!-- nextFocusName="{left: 'self', up: 'self', down: 'self', right: 'self'}" 时会截获系统自动处理，并分别回调
      @keyLeft、@keyUp、@keyRight、@keyDown
    -->
    <grid-view @keyLeft="onKeyLeft" nextFocusName="{left: 'self', up: 'self', down: 'self', right: 'self'}"
      ref="gridview" name="gridview" @loadMore="onLoadMore" @endReached="endReached" :preloadItemNumber="2"
      :numberOfRows="dataSource.length" :numberOfColumns='4' :clipChildren="false" :exposureEventEnabled=true
      :onScrollEnable=true class="grid" :columnSpacing=8 :interItemSpacing=8 :focusMemory=true setSelectChildPosition=8
      makeChildVisibleType='normal' :contentInset="{ top: 24, left: 16, bottom: 24, right: 16 }">
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
        <div class="li-item" focusable=true enableFocusBorder=true name='ui.itembean.title' @focus="onGridFocus(index)">
          <p class="article-title">{{ index + ' : ' + ui.itemBean.title }}</p>
        </div>
      </grid-item>
    </grid-view>
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
      myRefs: [],
      curListPos: 0,
      curGridPos: 0,
      loadingState: '',
      dataSource: [],
      Vue,
      STYLE_LOADING,
    }
  },
  methods: {
    onKeyLeft() {
      atlas.requestFocus(this.myRefs[this.curListPos]);
    },
    onKeyRight() {
      // 切换选中状态
      Vue.Native.callUIFunction(this.myRefs[this.curListPos], 'changeSelect', [true]);
      // 因为截获了按键，此处调用系统自动找焦点方法 参数是按键值（和全局监听的上下左右键值保持一致）
      Vue.Native.callUIFunction(this.myRefs[this.curListPos], 'findNextFocus', [22]);
    },
    onListFocus(index) {
      Vue.Native.callUIFunction(this.myRefs[this.curListPos], 'changeSelect', [false]);
      this.curListPos = index;
    },
    onGridFocus(index) {
      this.curGridPos = index;
    },
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
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
    onScroll(evt) {
      evt.stopPropagation(); // 这个事件触发比较频繁，最好阻止一下冒泡
    },
    onItemLayout(evt) {
      // 保存一下 ListItemView 尺寸的高度
      heightOfComponents[evt.target.index] = evt.top;
    },
    endReached() {
      console.log("endReached ")
    },
  },

  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },

  mounted() {
    this.myRefs = [this.$refs.div1, this.$refs.div2, this.$refs.div3, this.$refs.div4,
    this.$refs.div5, this.$refs.div6, this.$refs.div7, this.$refs.div8,
    this.$refs.div9, this.$refs.div10, this.$refs.div11, this.$refs.div12];
    this.curListPos = 4;
    atlas.requestFocus(this.myRefs[this.curListPos])

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
  }
};
</script>

<style scope>
/* Common CSS Styles */

.display-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.div-demo-scroll-1 {
  margin-top: 30px;
  overflow-y: scroll;
  height: 400px;
}

.div-demo-scroll-2 {
  overflow-y: scroll;
  height: 600px;
}

.scroll-text-block {
  width: 360px;
  height: 100px;
  margin-left: 10px;
  margin-right: 10px;
  focus-shadow-mode: 1;
  focus-shadow-offset: -30px;
}

.scroll-text-block p {
  width: 360px;
  height: 70px;
  color: #40b883;
  focus-color: #fff;
  focus-background-color: #40b883;
  select-background-color: #61726b;
  text-align: center;
  font-size: 30px;
  line-height: 70px;
}

.div-demo-scroll .grid {
  position: absolute;
  left: 400px;
  top: 30px;
  flex: 1;
  width: 1440px;
}

.div-demo-scroll #list {
  flex: 1;
  background-color: white;
}

.div-demo-scroll .grid-item {
  padding: 20px;
}

.div-demo-scroll .li-item {
  background-color: #f5f5f5;
  border-width: 3px;
  border-radius: 8px;
  border-color: transparent;
  width: 310px;
  height: 120px;
  padding: 20px;
  focus-border-width: 4px;
  focus-border-radius: 24px;
  focus-border-color: #40b883;
}

.div-demo-scroll .article-title {
  font-size: 17px;
  line-height: 24px;
  color: #242424;
  select-color: cyan;
}
</style>

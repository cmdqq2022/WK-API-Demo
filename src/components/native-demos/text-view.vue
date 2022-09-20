<template>
  <div id="text-view">
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="centerVertical"
        :style="{ 'line-spacing': 80, 'height': 200 }" maxLines="5" ellipsizeMode="2">
        这是超出后可以自动换行的文本这是超出后可以滚动的文本这是超出后可以自动换行的文本这是超出后可以滚动的文本</text-view>
    </div>
    <div class="view-box" :requestFocus=true :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" maxLines="1" ellipsizeMode="2">
        这是超出后显示省略号的文本这是超出后显示省略号的文本</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" maxLines="1" ellipsizeMode="3">这是超出后可以滚动的文本这是超出后可以滚动的文本
      </text-view>
    </div>
    <div class="view-box" :focusable=false :select="true">
      <text-view :duplicateParentState="true" class="text-view font-view" gravity="center">居中(特殊字体)</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="start">居前</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="end">居后</text-view>
    </div>
    <!-- <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="centerHorizontal">横向居中</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="centerHorizontal|bottom">横向居中、纵向居下</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="centerVertical">纵向居中</text-view>
    </div>
    <div class="view-box" :focusable=true>
      <text-view :duplicateParentState="true" class="text-view" gravity="centerVertical|end">纵向居中、横向居右</text-view>
    </div> -->
    <div class="title">
      <text-view maxLines="1" ellipsizeMode="2" class="max_width">宽度自适应，超过css中设置的最大宽度显示省略号</text-view>
      <p>2022-6-24</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';

export default {
  methods: {
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
};
</script>
<style scope>
#text-view {
  justify-content: center;
  align-items: center;
  padding-top: 50px;
}

#text-view .view-box {
  width: 300px;
  padding: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: #40b883;
  focus-background-color: #40b883;
  margin-bottom: 40px;
  border-radius: 10px;
}

#text-view .view-box .text-view {
  height: 50px;
  color: green;
  focus-color: white;
  select-color: red;
  font-size: 20px;
}

#text-view .font-view {
  font-family: "assets/raw/TTTGB.otf";
}
        #text-view .title{
    width: 600px;
    height: 40px;
    flex-direction: row;
    margin-bottom: 100px;
  }
  #text-view .title .max_width{
    font-size: 24px;
    color: #fff;
    height: 40px;
    width: 400px;
    /* max-width: 400px; */
  }
  #text-view .title p {
    font-size: 24px;
  }
</style>

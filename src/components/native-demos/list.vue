<template>


  <div class="listView">
    <p class="rowHead">横向列表</p>
    <div class="row">
      <ul ref="list1" @endReached="onEndReached" :numberOfRows="dataCount" horizontal :initFocusPositionAfterLayout='0'
        :enableSelectOnFocus="false" name='list1'>
        <li v-for="index in dataCount" :key="index" :focusable='false'>
          <div class="divBox" :focusable="true" name='mark'>
            <p :duplicateParentState="true">{{ "item" + index }}</p>
            <div class="mark" :duplicateParentState="true" name='mark'></div>
            <div class="markNormal" showOnState="normal" name='markNormal'></div>
            <!--<div class="markNormal"  showOnState="focused"></div>-->
            <!--<div class="markNormal"  showOnState="normal"></div>-->
          </div>
        </li>
      </ul>
    </div>

    <div class="row">
      <ul ref="list2" @endReached="onEndReached" @scrollStateChanged="onScrollStateChanged" :numberOfRows="dataCount"
        horizontal :focusMemory="true" :makeChildVisibleClampForward="100" :makeChildVisibleClampBackward="200"
        @childFocus="onChildFocus" :enableSelectOnFocus="false" name='list2'>
        <li v-for="index in dataCount" :key="index" :name="index">
          <div class="divBox" :focusable="true" :name="index">
            <p :duplicateParentState="true">{{ "item" + index }}</p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import atlas from '../../atlas';
import { getApp } from '../../util';

export default {
  data() {
    return {
      blockDirections: ['left', 'right'],
      state: ['normal'],
      dataCount: 15,
      handler: -1,
    };
  },
  methods: {
    onScrollStateChanged(evt) {
      evt.stopPropagation(); // 这个事件触发比较频繁，最好阻止一下冒泡。
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
    backPress() {
      atlas.backPress();
    },
    onChildFocus(e) {
      const pos = e.child.position;
      console.log(`onChildFocus index:${pos}`);
      console.log(`onChildFocus name:${e.child.name}`);
      console.log(`onChildFocus name:${e.focused.name}`);
      this.$refs.list1.scrollToIndex(0, pos, false, 0, 0);
      clearTimeout(this.handler);
      this.handler = setTimeout(() => {
        atlas.setSelectChildPosition(this.$refs.list1, pos)
      }, 16);
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

<style>
.listView {
  width: 1920px;
  height: 1080px;
}

.listView .rowHead {

  height: 120px;
  font-size: 30px;
  color: #555;
  text-align: center;
}

.listView .row {
  width: 1920px;
  height: 100px;
  padding-left: 30px;
  padding-right: 30px;
}

.listView .row ul {
  flex-direction: row;
  justify-content: flex-start;
}

.listView .divBox {
  width: 200px;
  height: 60px;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-color: #40b883;
  border-width: 2px;
  border-radius: 10px;
  margin-left: 20px;
  margin-top: 2px;
  padding: 5px;
  focus-scale: 1.0;
  focus-background-color: #40b883;
  select-background-color: #4068b8;
}

.listView .divBox .text {}

.listView .divBox .mark {
  width: 30px;
  height: 5px;
  background-color: transparent;
  select-background-color: white;
}

.listView .divBox .markNormal {
  width: 30px;
  height: 5px;
  background-color: yellow;
}

.listView .divBox p {
  text-align: center;
  font-size: 16px;
  color: #42b983;
  focus-color: white;
  select-color: white;
}
</style>

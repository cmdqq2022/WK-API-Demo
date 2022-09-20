<template>
  <div class="focus-next">
    <div>
      <ul horizontal name="listA" nextFocusName="{down: 'listC', right: 'listB'}" ref="listA">
        <li>
          <div :focusable=true class="button" :requestFocus="true">
            <p duplicateParentState>A1</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>A2</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>A3</p>
          </div>
        </li>
      </ul>
      <ul horizontal name="listB" ref="listB">
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>B1</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button" nextFocusName="{up: 'btnE'}">
            <p duplicateParentState>B2</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>B3</p>
          </div>
        </li>
      </ul>
      <ul horizontal name="listC" @childFocus="onchange">
        <li>
          <div :focusable=true class="button" ref="listC">
            <p duplicateParentState>C1</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>C2</p>
          </div>
        </li>
        <li>
          <div :focusable=true class="button">
            <p duplicateParentState>C3</p>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <div class="btn-list">
        <div :focusable=true class="button" name="btnD" nextFocusName="{down: 'listB'}">
          <p class="text-view" duplicateParentState>DD</p>
        </div>
        <div :focusable=true class="button" name="btnE" nextFocusName="{left: 'listB', down: 'listC'}">
          <p class="text-view" duplicateParentState>EE</p>
        </div>
      </div>
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
    onchange() {
      console.log("zsssf onchange")
      Vue.Native.callUIFunction(this.$refs.listA, 'clearSelectState');
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
<style>
.focus-next {
  width: 1920px;
  height: 1080px;
  padding: 25px;
  flex-direction: row;
}

.focus-next>div {
  width: 900px;
}

.focus-next li {
  width: 220px;
}

.btn-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.focus-next .button {
  height: 60px;
  width: 200px;
  margin-left: 15px;
  margin-right: 15px;
  border-radius: 10px;
  border-color: #40b883;
  focus-background-color: #40b883;
}

.focus-next .button p {
  font-size: 24px;
  focus-color: #fff;
  color: #40b883;
  text-align: center;
  line-height: 60px;
}
</style>

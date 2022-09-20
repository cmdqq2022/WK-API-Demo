<template>
  <div id="div-demo">
    <div>
      <label>ysten背景图效果:</label>
      <div class="div-demo-1" :focusable=true
        :style="{ 'background-image': imgObj.f1, 'focus-background-image': imgObj.f2, 'select-background-image': imgObj.f3 }">
        <p class="div-demo-1-text">背景图展示</p>
      </div>
      <label>ysten背景图效果（选中）:</label>
      <div class="div-demo-1" :focusable=true :select=true
        :style="{ 'background-image': imgObj.f1, 'focus-background-image': imgObj.f2, 'select-background-image': imgObj.f3 }">
        <p class="div-demo-1-text">背景图选中展示</p>
      </div>
      <label>Transform</label>
      <div class="div-demo-transform">
        <p class="div-demo-transform-text">Transform</p>
      </div>
      <label>水平滚动:</label>
      <div class="div-demo-2" ref="scrolldiv" name="scrolldiv" :focusable=false>
        <!-- div 带着 overflow 属性的，只能有一个子节点，否则终端会崩溃 -->
        <div class="display-flex flex-row div-demo-2-container">
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>A</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>B</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>C</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>D</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>E</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>F</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>G</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>H</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>I</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>J</p>
          </div>
        </div>
      </div>
      <label>垂直滚动:</label>
      <div class="div-demo-3" :focusable=false>
        <!-- div 带着 overflow 属性的，只能有一个子节点，否则终端会崩溃 -->
        <div class="display-flex flex-column">
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>A</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>B</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>C</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>D</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>E</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>F</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>G</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>H</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>I</p>
          </div>
          <div class="text-block" :focusable=true :focusScale="1.1">
            <p duplicateParentState>J</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import f1 from "@/assets/f_1.png";
import f2 from "@/assets/f_2.png";
import f3 from "@/assets/f_3.png";
export default {
  data() {
    return {
      imgObj: {
        f1,
        f2,
        f3,
      }
    }
  },
  methods: {
    backPress() {
      console.log("zsssf demodiv back")
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
  }
};
</script>

<style scope>
/* Common CSS Styles */
label {
  font-size: 24px;
  padding-top: 10px;
  padding-bottom: 10px;
}

#div-demo {
  flex: 1;
  overflow-y: scroll;
  padding: 50px;
}

.display-flex {
  display: flex;
}

.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.text-block {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: #40b883;
  focus-background-color: #40b883;
  font-size: 80px;
  margin: 20px;
  color: #40b883;
  text-align: center;
}

.text-block p {
  width: 100px;
  height: 100px;
  color: #40b883;
  focus-color: #fff;
  text-align: center;
  font-size: 80px;
  line-height: 100px;

  /* .feature-title {
  font-size: 30px;
  color: #555;
  text-align: left;
  line-height: 70px;
} */
}

/* Specfic styles */
.div-demo-1 {
  width: 600px;
  height: 200px;
  background-color: transparent;
  background-repeat: no-repeat;
}

.div-demo-1-text {
  margin-left: 40px;
  color: #fff;
  font-size: 20px;
}

/* flex-direction is necessary for horizontal scrolling for Native */
.div-demo-2 {
  overflow-x: scroll;
  margin: 10px;
  flex-direction: row;
  width: 1000px;
}

.div-demo-3 {
  overflow-y: scroll;
  margin: 10px;
  height: 320px;
}

.div-demo-transform {
  background-color: #40b883;
  transform: rotate(30deg) scale(.5);
  width: 120px;
  height: 120px;
}

.div-demo-transform-text {
  line-height: 120px;
  height: 120px;
  width: 120px;
  text-align: center;
}
</style>

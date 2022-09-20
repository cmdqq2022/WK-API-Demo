<template>
  <div id="demo-img">
    <div id="demo-img-container" :clipChildren=false>
      <label>Contain(灰白):</label>
      <div id="zsssf" :focusable=true class="button shadow-button" :enableFocusBorder=true :select=true @focus="doFocus"
        @blur="doBlur">
        <img src="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg" class="image contain"
          :grayMode=true />
      </div>
      <label>Contain(低质量解码):</label>
      <div :focusable=true class="button shadow-button" :enableFocusBorder=true @focus="doFocus" @blur="doBlur">
        <img src="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg" class="image contain"
          :lowQuality=true />
      </div>
      <label>Contain:</label>
      <div :focusable=true :requestFocus=true class="button shadow-button" :enableFocusBorder=true>
        <img src="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg" class="image contain" />
      </div>
      <label>Cover:</label>
      <div :focusable=true class="button shadow-button" :enableFocusBorder=true>
        <img src="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg" class="image cover" />
      </div>
      <label>Center:</label>
      <div :focusable=true class="button shadow-button" :enableFocusBorder=true>
        <img src="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg" class="image center" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import shadow from "@/assets/shadow_bg.9.png";

export default {
  methods: {
    jumpWhite() {
      this.$router.replace('/white');
    },
    backPress() {
      atlas.backPress();
    },
    doFocus(evt) {
      /** 在不知道对象格式情况下，使用下面方法可以快速的打印出对象内容格式（chrome中调试非常nice */
      // for (let key in evt) {
      //   console.log("zzssff doFocus key: " + key);
      // }
      console.log("zzssff doFocus id: " + evt.currentTarget.id);

    },
    doBlur(evt) {
      console.log("zzssff doBlur id: " + evt.currentTarget.id);
    }
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },

  data() {
    return {
      imgObj: {
        shadow,
      },
    }
  },
};
</script>

<style scope>
#demo-img {
  overflow-y: scroll;
  flex: 1;
  padding: 50px;
}

#demo-img #demo-img-container {
  display: flex;
  flex-direction: column;
}

.button {
  width: 304px;
  height: 184px;
  margin: 30px;
  border-width: 2px;
  border-radius: 6px;
  border-color: transparent;
  focus-border-color: #40b883;
  select-border-color: yellow;
}

.shadow-button {
  focus-shadow-mode: 1;
}

#demo-img .image {
  width: 300px;
  height: 180px;
}

#demo-img .contain {
  resize-mode: contain;
}

#demo-img .cover {
  resize-mode: cover;
}

#demo-img .center {
  resize-mode: center;
}
</style>

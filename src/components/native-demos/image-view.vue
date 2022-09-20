<template>
  <div id="demo-image-view">
    <div id="demo-image-view-container" :clipChildren=false>
      <div :clipChildren=false>
        <label>Contain:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button" :enableFocusBorder=true :requestFocus=true
          @click="gifAction">
          <image-view ref="MyGif" src="assets/cs_4.gif" class="image contain" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>Cover:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button" :enableFocusBorder=true
          @click="getFullPath">
          <image-view
            src="http://images.center.bcs.ottcn.com:8080/images/ysten/picture/ncos/cmjs/2022/04/26/06569fa681004e258985fd9d9935acc8wwww.jpg?cache=3"
            src2="http://www.ysten.com/upload/img/2020/0311/1583912152633983.jpg?cache=2" class="image cover" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>Center:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button" :enableFocusBorder=true
          @loadError="doLoadError" @click="fetchLocalJson">
          <image-view src="http://images.center.bcs.ottcn.com:8080/images/xxx.jpg" class="image center" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>Start:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button start" :enableFocusBorder=true>
          <image-view
            src="http://images.center.bcs.ottcn.com:8080/images/ysten/picture/ncos/cmjs/2022/04/26/06569fa681004e258985fd9d9935acc8.jpg"
            class="image start" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>Middle:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button middle" :enableFocusBorder=true>
          <image-view
            src="http://images.center.bcs.ottcn.com:8080/images/ysten/picture/ncos/cmjs/2022/04/26/06569fa681004e258985fd9d9935acc8.jpg"
            class="image middle" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>End:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button end" :enableFocusBorder=true>
          <image-view
            src="http://images.center.bcs.ottcn.com:8080/images/ysten/picture/ncos/cmjs/2022/04/26/06569fa681004e258985fd9d9935acc8.jpg"
            class="image end" />
        </div>
      </div>
      <div :clipChildren=false>
        <label>FitXY:</label>
        <div :focusScale="1.05" :focusable=true class="button shadow-button" :enableFocusBorder=true>
          <image-view
            src="http://images.center.bcs.ottcn.com:8080/images/ysten/picture/ncos/cmjs/2022/04/26/06569fa681004e258985fd9d9935acc8.jpg"
            class="image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import shadow from "@/assets/shadow_bg.9.png";
import myGif from "@/assets/cs_4.gif";
import placeholder from "@/assets/v_default_img.png"

export default {
  methods: {
    gifAction() {
      if (this.isPlay) {
        this.isPlay = false;
        Vue.Native.callUIFunction(this.$refs.MyGif.$el, 'stopGif');
      } else {
        this.isPlay = true;
        Vue.Native.callUIFunction(this.$refs.MyGif.$el, 'playGif');
      }

    },
    getFullPath() {
      atlas.getFullPath("assets/cs_4.gif").then(res => {
        console.log("getFullPath res: " + JSON.stringify(res));
      });
    },
    fetchLocalJson() {
      atlas.readLocalFile("assets/raw/test.json").then(res => {
        console.log("readLocalFile res: " + JSON.stringify(res));
      });
    },
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
    },
    doLoadError(evt) {
      console.log("zzssff doLoadError");
    },
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },

  data() {
    return {
      isPlay: true,
      imgObj: {
        shadow,
      },
    }
  },
};
</script>

<style scope>
#demo-image-view {
  overflow-y: scroll;
  flex: 1;
  padding: 50px;
  background-color: antiquewhite;
}

#demo-image-view #demo-image-view-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.button {
  width: 304px;
  height: 348px;
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

#demo-image-view .image {
  width: 300px;
  height: 344px;
  radius: 8px;
  placeholder: "assets/v_default_img.png";
}

#demo-image-view .contain {
  resize-mode: contain;
  low-quality: true;
}

#demo-image-view .cover {
  resize-mode: cover;
  low-quality: true;

}

#demo-image-view .center {
  resize-mode: center;
}

#demo-image-view .start {
  resize-mode: start;
}

#demo-image-view .middle {
  resize-mode: middle;
}

#demo-image-view .end {
  resize-mode: end;
}
</style>

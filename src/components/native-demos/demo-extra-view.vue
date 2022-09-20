<template>
  <div class="container">
    <!-- <div>
      <button class="btn" @click="changeText('MyView')">
        <span>设置文本22</span>
      </button>
      <button class="btn" @click="changeColor('#00ff00')">
        <span>设置颜色@@</span>
      </button>
      <button class="btn" @click="jump">
        <span id="jump">启动跳转</span>
      </button>
    </div>
    <div>
      <my-view id="MyView" ref="MyView" @callBack="showFunc" src="this is src" text="De22" class="loading-icon" color="#ff0000"></my-view>
    </div> -->
    <div>
      <qr-view content="https://www.qq.com/" class="s-qr" />
    </div>
    <div>
      <loading-view text="正在加载.." color="#ff0000" textColor="#ff0000" class="s-loading" />
    </div>
    <div>
      <seek-bar class="s-seekbar" @seek-change="onProgressChanged" :thumbImg="defaultImage" thumbWidth="160"
        thumbHeight="160" />
    </div>
    <div>
      <video-view @onVideoPlay="onVideoPlay" class="s-video"
        src="http://m.icntvcdn.com/media/new/2013/icntv2/media/newmedia/1.8M/2019/03/01/511d0d760ab6f4dc184126d018e3eac0_1d8M.ts" />
    </div>

  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import defaultImage from '../../assets/logo.png';

function log_impl(val) {
  Vue.Native.callNative('TestModule', 'log', [val]);
}
export default {
  data() {
    return {
      defaultImage,
    };
  },
  methods: {
    changeColor(color) {
      Vue.Native.callUIFunction(this.$refs.MyView.$el, 'changeColor', [color]);
    },
    changeText(text) {
      Vue.Native.callUIFunction(this.$refs.MyView.$el, 'changeText', [text]);
    },
    onVideoPlay(val) {
      log_impl("onVideoPlay");
    },
    showFunc(val) {
      // var param=evt.value;
      var code = val.data.code;
      log_impl(code);
    },
    onProgressChanged(val) {
      // var param=evt.value;
      var progress = val.data.progress;
      log_impl(progress);
    },
    jump() {
      //Vue.Native.callNative('TestModule', 'debug', this.$options.parent.$options.parent.$options.parent.$options.rootViewId);
      //Vue.Native.callNative('TestModule', 'helloNative', {"hello":"aa"});
      // Vue.Native.callNative('TestModule', 'log', ["aaaa"]);

      Vue.Native.callNativeWithPromise('TestModule', 'helloNativeWithPromise', { hello: "aa" })
        .then(function (value) {
          log_impl(value['result']);
          // success
        }, function (value) {
          // failure
        });
    },
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

<style scoped>
.container {
  position: absolute;
  z-index: 2;
  display: flex;
  width: 1920px;
  height: 1080px;

  justify-content: left;
  align-items: left;
  background-color: grey;
}

.buttons {
  display: flex;
  width: 750px;
  height: 90px;
  justify-content: center;
  flex-direction: row;
}

.btn {
  border-color: blue;
  background-color: blueviolet;
  width: 150px;
  height: 45px;
  margin-right: 15px;
  color: white;
  border-width: 3px;
}

.view {
  display: flex;
  width: 750px;
  height: 300px;
  justify-content: center;
  align-items: center;
  color: burlywood;
}

.loading-icon {
  width: 180px;
  height: 90px;
}

.s-qr {
  width: 150px;
  height: 150px;
}

.s-loading {
  width: 300px;
  height: 90px;
}

.s-seekbar {
  width: 300px;
  height: 120px;
}

.s-video {
  width: 360px;
  height: 270px;
}
</style>

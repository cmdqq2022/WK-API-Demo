<template>
  <div class='video_container_j'>
    <!-- 视频组件 -->
    <div class="video-wrap">
      <video-view class='video' :src="videoUrl" ref="video" @video-load='onVideoLoaded'
        @video-buffer-start='onVideoBufferStart' @video-buffer-end="onVideoBufferEnd" @video-play="onVideoPlay"
        @video-pause="onVideoPause" @video-progress-change="onVideoProgressChange" />
      <div v-show="videoLoading" class="loading">
        <loading-view class="loading-icon" color="#ff6f2e"></loading-view>
      </div>
      <div class="controls" v-if="isShowControls">
        <div class="controler-box">
          <div class="line-box" name="progress_btn">
            <img :src="progressFouseImg" alt="" v-show="progressFouse" :style="{ 'left': progressBar - 15 + 'px' }">
            <div class="line" name="" :focusable="true" nextFocusName="{left: 'self', right: 'self'}">
              <div class="progressJ" :style="{ 'width': progressBar + 'px' }">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="video-btn" name="video_btn">
      <div class="button" @click="playFirst" :focusable=true :focusScale="1.1" :requestFocus=true>
        <p duplicateParentState>第一集</p>
      </div>
      <div class="button" @click="play" :focusable=true :focusScale="1.1" ref="testRef">
        <p duplicateParentState>{{ playPauseText }}</p>
      </div>
      <div class="button" @click="stop" :focusable=true :focusScale="1.1">
        <p duplicateParentState>停止</p>
      </div>
      <div class="button" @click="showController" :focusable=true :focusScale="1.1">
        <p duplicateParentState>显示进度条</p>
      </div>
      <div class="button" @click="forwardThenSeconds" :focusable=true :focusScale="1.1">
        <p duplicateParentState>快进20秒</p>
      </div>
    </div>
  </div>

</template>


<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';
import progressFouseImg from '../../assets/control_tip.png';
export default {
  data() {
    return {
      videoUrl: 'http://223.110.245.148/wh7f454c46tw1220129574_2057503559/ott.js.chinamobile.com/3/16/20200106/278009241/278009241.ts?icpid=3&RTS=1602492172&from=40&popid=40&hms_devid=168&prioritypopid=40&vqe=3?',
      playPauseText: '暂停',
      videoLoading: true,
      isShowControls: false,
      progressFouseImg,
      progressFouse: false,
      totalTime: 0,
      currentTime: 0,
      currentTime: 0,
      progressBar: 0,
    };
  },
  mounted() {
    this.app = getApp();
    this.app.$on('nativeOnKeyDown', this.listenerKey);
    this.$nextTick(() => {
      this.$refs.video.play()
    })
    // Vue.Native.callUIFunction(this.$refs.testRef, 'requestFocus');
    // Vue.Native.callUIFunction(this.$refs.progress_ref, 'requestFocus');
  },

  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },

  methods: {
    listenerKey(key) {
      // keyCode up: 19,down: 20,left: 21,right: 22,ok: 23,menu: 82,
      if (key.keyCode === 19) {
        if (!this.progressFouse) {
          this.progressFouse = true
        }
      } else if (key.keyCode === 22) {
        this.logJ("progressFouse" + this.progressFouse)
        if (this.progressFouse) {
          this.$refs.video.getCurrentPosition(1, position => {
            this.$refs.video.seek(position + 20 * 1000)
          })
        }
      } else if (key.keyCode === 21) {
        if (this.progressFouse) {
          this.$refs.video.getCurrentPosition(1, position => {
            this.$refs.video.seek(position - 20 * 1000)
          })
        }
      } else if (key.keyCode === 20) {
        if (this.progressFouse) {
          this.progressFouse = false
          this.isShowControls = false;
        }
      }
    },
    backPress() {
      atlas.backPress();
    },
    jumpWhite() {
      this.$router.replace('/white');
    },
    playFirst() {
      this.videoUrl = this.videoUrl
    },
    play() {
      this.$refs.video.playOrPause();
      this.updateStateText()
    },
    stop() {
      this.$refs.video.stop()
    },
    updateStateText() {
      setTimeout(() => {
        this.$refs.video.isPlay(1, play => {
          console.log('isplay', play)
          Vue.Native.callNative('ConsoleModule', 'log', [play]);
          this.playPauseText = play ? '暂停' : '播放';
        })
      }, 50)
    },

    onVideoLoaded() {
      this.hideLoading()
      console.log('加载成功...');
      this.isShowControls = false
      this.getDuration()
      Vue.Native.callNative('ConsoleModule', 'log', '加载成功...');
      // setTimeout(() => {
      //   this.isShowControls = false
      // }, 3000);
    },

    onVideoPlay() {
      this.hideLoading()
      Vue.Native.callNative('ConsoleModule', 'log', '播放...');
      console.log('播放...');
    },

    onVideoPause() {
      Vue.Native.callNative('ConsoleModule', 'log', '暂停...');
      console.log('暂停...');
    },

    onVideoProgressChange(e) {
      Vue.Native.callNative('ConsoleModule', 'log', ('onVideoProgressChange position:' + e.position + ', duration:' + e.duration));
      this.updatePlayTime(e.position, e.duration)
    },

    onVideoBufferStart() {
      this.showLoading()
      console.log('开始缓冲...');
    },

    onVideoBufferEnd() {
      this.hideLoading()
      console.log('结束缓冲...');
    },

    showLoading() {
      this.videoLoading = true;
    },

    hideLoading() {
      this.videoLoading = false;
    },

    showController() {
      // this.$refs.video.showController()
      this.isShowControls = true;
      // Vue.Native.callUIFunction(this.$refs.progress_ref, 'requestFocus');
    },

    forwardThenSeconds() {
      this.$refs.video.getCurrentPosition(1, position => {
        this.$refs.video.seek(position + 20 * 1000)
        // this.$refs.video.play()
      })
    },
    getDuration() {
      this.$refs.video.getDuration(1, position => {
        this.totalTime = position;
      })
    },
    updatePlayTime(position, duration) {
      // 更新播放时间
      this.progressBar = position / duration * 973;
      this.logJ("progressBar", this.progressBar)
    },
    logJ(type, data) {
      Vue.Native.callNative('ConsoleModule', 'log', (type + "----" + data));
    }
  },
};
</script>

<style scoped>
.video_container_j {
  width: 1920px;
  height: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video_container_j .video-wrap {
  width: 1080px;
  height: 720px;
  background-color: black;
  position: relative;


}

.video_container_j .video {
  width: 1080px;
  height: 720px;
}

.video_container_j .loading {
  position: absolute;
  width: 1080px;
  height: 720px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video_container_j .loading .loading-icon {
  position: absolute;
  width: 100px;
  height: 100px;
}

.video_container_j .video-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.video_container_j .state-info {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.video_container_j .state-info p {
  font-size: 15px;
  color: #fff;
}

.video_container_j .button {
  width: 230px;
  height: 60px;
  background-color: transparent;
  border-width: 2px;
  border-radius: 8px;
  border-color: #40b883;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  focus-background-color: #40b883;
}

.video_container_j .button p {
  width: 226px;
  height: 56px;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  color: #40b883;
  focus-color: white;
}

.video_container_j .controls {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1080px;
  height: 720px;
  background-color: rgba(0, 0, 0, 0.1);
}

.controls .controler-box {
  width: 1080px;
  height: 100px;
  position: absolute;
  left: 0px;
  bottom: 0px;
}

.controls .controler-box .line-box {
  width: 973px;
  alignSelf: center;
}

.controls .controler-box .line-box .line {
  width: 973px;
  height: 9px;
  background-color: rgba(0, 0, 0, 0.32);
  border-radius: 5px;
}

.controls .controler-box .line-box .line .progressJ {
  width: 100px;
  height: 9px;
  background-color: #3961e5;
  border-radius: 5px;
}

.controls .controler-box .line-box img {
  position: absolute;
  top: -15px;
  left: 90px;
  width: 24px;
  height: 40px;
  z-index: 99;
}
</style>

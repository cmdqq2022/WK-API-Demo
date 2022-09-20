<template>


  <div class="progress">

    <seek-bar class="column_player_progress" :barHeight="6" :thumbWidth="25" :thumbHeight="25"
      backgroundColor="#40ffffff" progressColor="#40b883" thumbColor="#40b883" :listenProgress="true"
      @seek-change="onSeekChange" :focusable="true" :requestFocus="true" name="progress" @focus="focusChange"
      :progress="50" :maxProgress="100" />
  </div>
</template>
<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';

export default {
  data() {
    return {
    };
  },
  methods: {
    focusChange(e) {
      Vue.Native.callNative('ConsoleModule', 'log', "seekBar focusChange isFocused: " + e.isFocused);
      // console.log(`seekBar focusChange isFocused: ${e.isFocused}`);
    },
    onSeekChange(e) {
      Vue.Native.callNative('ConsoleModule', 'log', "onSeekChange fromUser:" + e.fromUser + " progress:" + e.progress);
      // console.log(`seekBar onSeekChange fromUser:${e.fromUser},left:${e.pLeft},right:${e.pRight},state:${e.state}`);
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

<style>
.progress {
  width: 1920px;
  height: 1080px;
  background-color: black;
  padding: 50px;
  justify-content: center;
  align-items: center;
}

.progress .column_player_progress {
  margin-top: 34px;
  height: 80px;
  width: 300px;
  background-color: transparent;
}
</style>

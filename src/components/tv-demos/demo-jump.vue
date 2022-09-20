<template>
  <div class="focusJump" :clipChildren="false">
    <p class="rowHead">Launcher页面跳转</p>
    <div class="row">
      <div class="divBox" :focusable="true" @click="openPage(1)" :requestFocus=true>
        <p duplicateParentState>详情页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(2)">
        <p duplicateParentState>EPG列表页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(3)">
        <p duplicateParentState>筛选页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(4)">
        <p duplicateParentState>足迹页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(5)">
        <p duplicateParentState>收藏页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(6)">
        <p duplicateParentState>搜索页</p>
      </div>
      <div class="divBox" :focusable="true" @click="openPage(7)">
        <p duplicateParentState>H5页</p>
      </div>
    </div>
    <p class="rowHead">Apk跳转</p>
    <div class="row">
      <div class="divBox" :focusable="true" @click="openApk()">
        <p duplicateParentState>咪咕视频</p>
      </div>
      <div class="divBox" :focusable="true" @click="goPay()">
        <p duplicateParentState>支付页</p>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { getApp } from '../../util';
import atlas from '../../atlas';

export default {
  data() {
    return {
      blockRoot: false,
    };
  },
  mounted() {
    this.app = getApp();
    this.app.$on('dispatchKeyEvent', (e) => {
      console.log(`dispatchKeyEvent e is${e}`);
    });
    setTimeout(() => {
      this.blockRoot = false;
    }, 2000);
  },
  activated() {
    this.app = getApp();
    this.app.$off('hardwareBackPress');
    this.app.$on('hardwareBackPress', this.backPress);
    this.app.$on("jumpWhite", this.jumpWhite);
  },
  methods: {
    jumpWhite() {
      this.$router.replace('/white');
    },
    backPress() {
      atlas.backPress();
    },
    onChildFocus(e) {
      console.log(`onChildFocus index:${e.child.index}`);
    },
    openPage(index) {
      if (index === 1) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/CNTV/index.html?action=detail&object=1300000063", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 2) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/CNTV/index.html?action=EPGList&object=4220615", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 3) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/CNTV/index.html?action=markupsearch", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 4) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/CNTV/behavior/index.html?type=footprint", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 5) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/CNTV/behavior/index.html?type=collection", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 6) {
        const _url = { "p1": "OpenUrl", "p2": "http://sns.is.ysten.com/sosuo/index.html", "p3": "" };
        atlas.goCommonJump(_url);
      } else if (index === 7) {
        atlas.openGefo("http://tvlookbackpanel.taipan.jsa.bcs.ottcn.com/WEB_NEWTV/index.html?templateId=02523");
      }
    },

    openApk() {
      const _url = {
        "p1": "Android",
        "p2": {
          "pkg": "com.migu.aijia",
          "cls": "com.migu.aijia.MainActivity",
          "downloadUrl": "",
          "appId": "201708171829547",
          "appForceUpdate": "1",
          "appVersion": "0",
          "appAction": "",
          "uri": "",
          "appName": "咪咕极速",
          "params": [{
            "key": "media_code",
            "value": "309"
          }, {
            "key": "media_id",
            "value": "65433"
          }, {
            "key": "from",
            "value": "home"
          }, {
            "key": "cmd",
            "value": "show_game_back"
          }]
        },
        "p3": ""
      };
      atlas.goCommonJump(_url);
    },

    goPay() {
      const _url = { "p1": "OpenUrl", "p2": "action=pay?productId=0001112cp0028", "p3": "" };
      atlas.goCommonJump(_url);
    },
  },
};
</script>
<style>
/* Common CSS Styles */

.focusJump {
  width: 1920px;
  height: 1080px;
  padding: 25px;
}

.focusJump .rowHead {
  font-size: 30px;
  color: #555;
  text-align: left;
  line-height: 70px;
  padding-left: 25px;
  padding-right: 25px;
}

.focusJump .row {
  width: 1920px;
  height: 100px;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 20px;
}

.focusJump .divBox {
  width: 200px;
  height: 50px;
  background-color: transparent;
  focus-background-color: #40b883;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-color: #40b883;
  border-width: 2px;
  border-radius: 10px;
  margin-left: 20px;
}


.focusJump .divBox p {
  font-size: 20px;
  color: #42b983;
  focus-color: #fff;
}
</style>

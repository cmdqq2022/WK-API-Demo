<template>
  <div id="div-demo">
    <div :clipChildren="clipChildren" :ClipToPadding="clipToPadding">

      <div class="flex-row flex-wrap">
        <label @click="ulChange">disableAdvancedFocusSearch:{{ disableAdvancedFocusSearch }},</label>
        <label @click="ulChange">endHintEnabled:{{ endHintEnabled }},</label>
        <label @click="ulChange">focusMemory:{{ focusMemory }},</label>
        <label @click="ulChange">listenFocusSearchOnFail:{{ listenFocusSearchOnFail }},</label>
        <label @click="enableSelectOnFocusChange">enableSelectOnFocus:{{ enableSelectOnFocus }},</label>
        <label @click="scrollStateChange">scrollStateChangeEnabled:{{ scrollStateChangeEnabled }},</label>
        <label @click="addInitPos">initPos:{{ initPos }},</label>
        <label>focusPos:{{ focusPos }},</label>
        <label>selectPos:{{ selectPos }},</label>
        <label>childCount:{{ this.language.length }},</label>
        <label @click="scrolleTypeChange">makeChildVisibleType:{{ makeChildVisibleType }},</label>
        <label @click="changeClamp('clampForward', clampForward)">clampForward(makeChildVisibleType:normal):{{
            clampForward
        }},</label>
        <label @click="changeClamp('clampBackward', clampBackward)">clampBackward(makeChildVisibleType:normal):{{
            clampBackward
        }},</label>


      </div>
      <ul ref="list" style="height:100px" @childFocus="onChildFocus" @child:select="onChildSelect"
        @focusSearchFailed="focusSearchFailed" @scrollStateChanged="scrollStateChanged" @loadMore="loadMore"
        :dispatchChildFocusEvent="dispatchChildFocusEvent" :numberOfRows="language.length"
        :disableAdvancedFocusSearch="disableAdvancedFocusSearch" :endHintEnabled="endHintEnabled"
        :focusMemory="focusMemory" :enableSelectOnFocus="enableSelectOnFocus" :initFocusPositionAfterLayout="initPos"
        :makeChildVisibleType="makeChildVisibleType" :listenFocusSearchOnFail="listenFocusSearchOnFail"
        :makeChildVisibleClampForward="clampForward" :makeChildVisibleClampBackward="clampBackward"
        :scrollStateChangeEnabled="scrollStateChangeEnabled" :preloadItemNumber='5' :horizontal=true>
        <li style="width:222px;height:100px;padding:8px;" :collapsable="true" v-for="(l ) in language" :focusable=false
          :duplicateParentState="true" :key="l">
          <p class="text-block-extra2" :focusable="false" :descendantFocusability="2" :duplicateParentState="true">{{ l
          }}
          </p>
        </li>

      </ul>

      <label>clip:效果 </label>
      <label>clipChildren:{{ clipChildren }} </label>
      <label>duplicateParentState:{{ duplicateParentState }} </label>
      <label>clipToPadding:{{ clipToPadding }} </label>
      <label>focusableInTouchMode:{{ focusableInTouchMode }} </label>
      <label>descendantFocusability:{{ descendantFocusability }} </label>
      <label>bringFocusChildToFront:{{ bringFocusChildToFront }} </label>
      <label>dispatchChildFocusEvent:{{ dispatchChildFocusEvent }} </label>
      <label>blockFocusDirections:{{ blockFocusDirections }}</label>
      <label>gradientBackground:{{ gradientBackground }}</label>

      <div class="display-flex flex-row">
        <p :clipChildren="clipChildren" :ClipToPadding="clipToPadding" :duplicateParentState="duplicateParentState"
          :descendantFocusability="descendantFocusability" :bringFocusChildToFront="bringFocusChildToFront"
          :dispatchChildFocusEvent="dispatchChildFocusEvent" @click="change"> clickme, </p>

        <p @click="block('up')"> block up,</p>
        <p @click="block('down')"> block down,</p>
        <p @click="block('left')"> block left,</p>
        <p @click="block('right')"> block right,</p>
      </div>

      <div class="div-p" :focusable="true" :dispatchChildFocusEvent="dispatchChildFocusEvent" @childFocus="onChildFocus"
        :gradientBackground="gradientBackground" @click="changeGD">
        <p class="text-block-extra div-c" :focusable="true" name='extraA' @focus="onFocus">A</p>
        <p class="text-block-extra div-c2" :focusable="true" name='extraB' @focus="onFocus">B</p>
      </div>

      <label>水平滚动:</label>
      <div class="div-demo-2" :clipChildren="clipChildren" :ClipToPadding="clipToPadding">
        <!-- div 带着 overflow 属性的，只能有一个子节点，否则终端会崩溃 -->
        <div class="display-flex flex-row div-demo-2-container" :focusable=true
          :bringFocusChildToFront="bringFocusChildToFront" @childFocus="onChildFocus">
          <p class="text-block-extra" :focusable="true" name='block-text-a'>A</p>
          <p :blockFocusDirections="blockFocusDirections" class="text-block-extra" :focusable="true"
            name='block-text-b'>B</p>
          <p class="text-block-extra" :focusable="true" nmae='block-text-c'>C</p>
          <p class="text-block-extra" :focusable="true" nmae='block-text-d'>D</p>
          <p class="text-block-extra" :focusable="true" nmae='block-text-e'>E</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getApp } from '../../util';
import atlas from '../../atlas';

const gd = [
  {
    type: 0,
    shape: 0,
    colors: ['#40b883', '#4068b8'],
    cornerRadii4: [0, 5, 20, 0],
  },
  {
    type: 1,
    shape: 0,
    colors: ['#4068b8', '#40b883'],
    cornerRadii4: [80, 5, 80, 0],
  },
]

const scrollTypes = ["center", "normal"]

export default {
  data() {
    /**
     * demo1 needs to use variable base64 DefaultImage，so inline style mode is a must.
     * if image path is remote address, declaration style class .div-demo-1 can be used.
     */
    return {
      log: '',
      clipChildren: true,
      duplicateParentState: true,
      clipToPadding: true,
      focusableInTouchMode: true,
      descendantFocusability: 1,
      bringFocusChildToFront: false,
      dispatchChildFocusEvent: true,
      blockFocusDirections: [],
      gradientBackground: gd[0],

      setSelectChildPosition: 0,
      disableAdvancedFocusSearch: false,
      endHintEnabled: true,
      focusMemory: true,
      enableSelectOnFocus: true,
      listenFocusSearchOnFail: false,
      scrollStateChangeEnabled: true,
      initPos: 0,
      focusPos: 0,
      selectPos: 0,
      makeChildVisibleType: scrollTypes[0],
      clampForward: -120,
      clampBackward: -120,
      language: ["c", "java", "python", "c++", "c#", "Visual Basic", "JavaScript", "PHP", "Assemble language", "SQL",
        "classic VB", "R", "GO", "Fortan", "Groovy", "Swift", "Ruby", "Perl", "MATLAB", "Pascal"]

    };
  },
  methods: {
    onFocus() {

    },
    change() {
      this.clipChildren = !this.clipChildren;
      this.duplicateParentState = !this.duplicateParentState;
      this.clipToPadding = !this.clipToPadding;
      this.focusableInTouchMode = !this.focusableInTouchMode;
      this.bringFocusChildToFront = !this.bringFocusChildToFront;
      this.dispatchChildFocusEvent = !this.dispatchChildFocusEvent;
      this.descendantFocusability = (this.descendantFocusability + 1) % 3;


      console.log(`change success`)
    },
    ulChange() {
      this.disableAdvancedFocusSearch = !this.disableAdvancedFocusSearch;
      this.endHintEnabled = !this.endHintEnabled;
      this.focusMemory = !this.focusMemory;
      this.listenFocusSearchOnFail = !this.listenFocusSearchOnFail;
    },
    enableSelectOnFocusChange() {
      this.enableSelectOnFocus = !this.enableSelectOnFocus;
    },
    scrollStateChange() {
      this.scrollStateChangeEnabled = !this.scrollStateChangeEnabled;
    },
    scrolleTypeChange() {
      const index = scrollTypes.indexOf(this.makeChildVisibleType);
      this.makeChildVisibleType = scrollTypes[(index + 1) % 2];
    },
    focusSearchFailed(e) {
      console.log(`focusSearchFailed ${e} ${Object.keys(e)}`)
    },

    scrollStateChanged(e) {
      console.log(`scrollStateChanged ${e} ${Object.keys(e)}`)
      console.log(`scrollStateChanged ${e.newState}`)
    },
    loadMore() {
      console.log(`loadMore start`)

      this.language = [...this.language, 'more1', 'more2']
    },
    changeClamp(key, clamp) {
      console.log(`clamp value ${clamp}`)
      const s = Math.min(600, clamp + 40)
      if (s >= 600) {
        clamp = -120
      } else {
        clamp = s
      }
      this[key] = clamp
    },

    addInitPos() {
      this.initPos = (this.initPos + 1) % 5;
    },

    onChildFocus(e) {
      console.log(`onChildFocus ${e} ${Object.keys(e)}`)
      console.log(`onChildFocus ${e.child.index ?? e.child.position} `)
      console.log(`onChildFocus target ${e.currentTarget}`)
      if (this.$refs.list == e.target) {
        console.log(`onChildFocus pos ${e.child.position}`)
        this.focusPos = e.child.position
      }
    },

    onChildSelect(e) {
      console.log(`onChildSelect ${e} ${Object.keys(e)}`)
      console.log(`onChildSelect ${e.child.index ?? e.child.position} `)
      console.log(`onChildSelect target ${e.currentTarget}`)
      if (this.$refs.list == e.target) {
        console.log(`onChildSelect pos ${e.child.position}`)
        this.selectPos = e.child.position
      }
    },

    block(d) {
      const index = this.blockFocusDirections.indexOf(d);
      console.log(`change block ${d} , index ${index}`)
      if (index >= 0) {
        this.blockFocusDirections.splice(index, 1)
        this.blockFocusDirections = [...this.blockFocusDirections]
      } else {
        this.blockFocusDirections.push(d)
        this.blockFocusDirections = [...this.blockFocusDirections]
      }

    },
    changeGD() {
      this.gradientBackground = gd[(this.gradientBackground.type + 1) % 2];
    },

    jumpWhite() {
      this.$router.replace('/white');
    },

    backPress() {
      atlas.backPress();
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
.flex-row {
  flex-direction: row;
}

.flex-column {
  flex-direction: column;
}

.flex-wrap {
  flex-wrap: wrap;
}


.text-block-extra {
  width: 100px;
  height: 100px;
  line-height: 100px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(157, 164, 161);
  font-size: 80px;
  margin-left: -10px;
  color: #40b883;
  text-align: center;
  focus-background-color: #8b178b;
}

.text-block-extra2 {
  width: 180px;
  height: 80px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(157, 164, 161);
  font-size: 16px;
  color: #40b883;
  text-align: center;
  line-height: 30px;
  focus-background-color: #8b178b;
}

.div-p {
  width: 150px;
  height: 150px;
  margin: 30px;
  padding: 30px;
  border-style: solid;
  border-width: 1px;
  border-color: #40b883;
  position: relative;
}

.div-c {
  position: absolute;
  left: -20px;
  top: -2y0px;
}

.div-c2 {
  position: absolute;
  left: 10px;
  top: 10px;
}

.div-demo-2 {
  overflow-x: scroll;
  padding-left: 40px;
  flex-direction: row;
}

.div-demo-2-container {
  width: 1000px;
}
</style>

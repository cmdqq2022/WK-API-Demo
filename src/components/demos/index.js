import demoButton from './demo-button.vue';
import demoDiv from './demo-div.vue';
import demoImg from './demo-img.vue';
import demoInput from './demo-input.vue';
import demoP from './demo-p.vue';
import demoList from './demo-list.vue';
import demoIFrame from './demo-iframe.vue';

const demos = {
  demoDiv: {
    name: 'div 组件',
    component: demoDiv,
  },
  demoP: {
    name: 'p 组件',
    component: demoP,
  },
  demoButton: {
    name: 'button 组件',
    component: demoButton,
  },
  demoImg: {
    name: 'img 组件',
    component: demoImg,
  },
  demoUl: {
    name: 'ul/li 组件',
    component: demoList,
  },
  demoInput: {
    name: 'input 组件',
    component: demoInput,
  },
  demoIFrame: {
    name: 'iframe 组件',
    component: demoIFrame,
  },
};

export default demos;

/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import 'virtual:uno.css'
import { MotionPlugin } from '@vueuse/motion'
import Slide from '@/components/v-slide.vue'
import Step from '@/components/v-step.vue'
import CodePane from '@/components/v-code.vue'
import Tooltip from '@/components/v-tooltip.vue'
import Blog from './components/v-blog.vue'
import ResultPane from '@/components/result-pane.vue'

import './style/index.scss';

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(MotionPlugin)

app
  .component('blog', Blog)
  .component('slide', Slide)
  .component('step', Step)
  .component('code-pane', CodePane)
  .component('tooltip', Tooltip)
  .component('result-pane', ResultPane)

app.mount('#app')

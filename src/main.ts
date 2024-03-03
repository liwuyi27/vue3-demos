/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import 'virtual:uno.css'
import { MotionPlugin } from '@vueuse/motion'
import Slide from '@/components/slide.vue'
import Step from '@/components/step.vue'
import CodePane from '@/components/code-pane.vue'
import Tooltip from '@/components/tooltip.vue'
import Blog from './components/blog.vue'
import ResultPane from '@/components/result-pane.vue'

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

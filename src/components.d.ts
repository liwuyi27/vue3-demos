import Slide from '@/components/slide.vue'
import Step from '@/components/step.vue'
import CodePane from '@/components/code-pane.vue'
import Tooltip from '@/components/tooltip.vue'
import Blog from './components/blog.vue'
import ResultPane from '@/components/result-pane.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Slide: typeof Slide
    Step: typeof Step
    CodePane: typeof CodePane
    Tooltip: typeof Tooltip
    Blog: typeof Blog
    ResultPane: typeof ResultPane
  }
}
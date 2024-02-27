import type { InjectionKey, Ref } from "vue";

interface Step {
  stepTotal: Ref<number>,
}

interface Slide {
  slideTotal: Ref<number>,
  updateStepTotals: (slide: number, stepTotal: number) => void,
  stepTotals: Ref<number[]>
}

export const stepKey = Symbol() as InjectionKey<Step>;
export const slideKey = Symbol() as InjectionKey<Slide>;
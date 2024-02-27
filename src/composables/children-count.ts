import type { ComponentInternalInstance, VNode, VNodeArrayChildren} from "vue";

export const getChildrenCount = (vm: ComponentInternalInstance, name: string) => {
  return getChildren(vm, name).length;
}

export const getChildren = (vm: ComponentInternalInstance, name: string) => {
  const _children = vm.subTree!.children as VNodeArrayChildren;
  const vnode = _children[0] as VNode;
  const children = vnode.children as VNodeArrayChildren;
  const ret: VNode[] = []
  children.forEach((vn) => {
    const _name = (vn as any).type.__name;
    if (_name === name) {
      ret.push(vn as VNode)
    }
  })
  return ret;
}

export const getChildrenIndex = (vm: ComponentInternalInstance, name: string) => {
  const children = getChildren(vm.parent!, name);
  const index = children.findIndex(item => {
    return item.component!.uid === vm.uid;
  })
  return index;
}
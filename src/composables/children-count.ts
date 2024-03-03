import { isNil } from "lodash";
import { isVNode, type ComponentInternalInstance, type VNode, type VNodeArrayChildren} from "vue";

export const getChildrenCount = (vm: ComponentInternalInstance, name: string) => {
  return getChildren(vm, name).length;
}

export const getChildren = (vm: ComponentInternalInstance, name: string) => {
  let _children = vm.subTree.children as VNodeArrayChildren;
  if (isNil(_children[0])) {
    _children = vm.subTree!.component!.subTree!.children as VNodeArrayChildren
  }
  const vnode = _children[0] as VNode;
  const children = vnode.children as VNodeArrayChildren;
  const ret: ComponentInternalInstance[] = []
  children.forEach((vn) => {
    if (isVNode(vn)) {
      const comp = getComponent(vn.component!, name);
      if (comp) {
        ret.push(comp);
      }
    }
  })
  console.log(`components - ${name} : `, ret)
  return ret;
}

function getComponent(vm: ComponentInternalInstance, name: string) {
  let _name = vm?.type.__name;
  if (name === _name) {
    return vm;
  }
  _name = vm?.subTree.component?.type.__name;
  if (name === _name) {
    return vm.subTree.component;
  }
  return null;
}

export const getChildrenIndex = (vm: ComponentInternalInstance, name: string, parentName: string) => {
  let parent = vm.parent;
  while(parent) {
    if (parentName === parent.type.__name) {
      break;
    }
    parent = parent.parent;
  }
  if (isNil(parent)) {
    return -1;
  }
  const children = getChildren(parent, name);
  const index = children.findIndex(item => {
    return item.uid === vm.uid;
  })
  return index;
}

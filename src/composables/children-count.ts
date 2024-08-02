import { isArray, isObject, isString, isNil } from 'lodash'
import {
  type VNodeNormalizedChildren,
  type VNodeArrayChildren,
  isVNode,
  type VNode,
  type ComponentInternalInstance
} from 'vue'

export const getChildrenCount = (vm: ComponentInternalInstance, name: string) => {
  return getChildren(vm, name).length
}

export const getChildrenIndex = (
  vm: ComponentInternalInstance,
  name: string,
  parentName: string
) => {
  let parent = vm.parent
  while (parent) {
    if (parentName === parent.type.__name) {
      break
    }
    parent = parent.parent
  }
  if (isNil(parent)) {
    return -1
  }
  const children = getChildren(parent, name)
  const index = children.findIndex((item) => {
    return item.uid === vm.uid
  })
  return index
}


function getChildren(vm: ComponentInternalInstance, name: string) {
  const children = vm!.subTree.children as VNodeArrayChildren | string
  if (isString(children)) {
    return []
  }
  const components: ComponentInternalInstance[] = []
  children.forEach((child) => {
    if (isVNode(child)) {
      traverse(child)
    }
  })

  function traverse(root: VNode) {
    let children: VNodeNormalizedChildren
    // component
    if (isObject(root.type)) {
      const vm = root.component
      if (!vm) {
        return
      }
      if (name === vm.type.__name) {
        components.push(vm)
        return
      }
      traverse(vm.subTree);
      return;
    } 
    children = root.children
    if (isArray(children)) {
      children.forEach((child) => {
        if (isVNode(child)) {
          traverse(child)
        }
      })
    }
  }
  return components
}


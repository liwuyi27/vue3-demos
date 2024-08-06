import type { RouteRecordRaw } from "vue-router";

export const routes = createRoutes();

function createRoutes() {
  const pathRegx = /\/views\/((?<firstCategory>[\w-]+)\/)?((?<secondCategory>[\w-]+)\/)?(?<fileName>[\w-]+)\.vue/;
  const modules = import.meta.glob(['@/views/*.vue', '@/views/**/*.vue', '@/views/**/**/main.vue']);
  const routes: RouteRecordRaw[] = [];
  Object.entries(modules).forEach(([path, moduleFn]) => {
    let match = pathRegx.exec(path);
    let parentRoute: RouteRecordRaw | undefined;
    if (!match) return;
    const { firstCategory, secondCategory, fileName } = match.groups!;
    let parentName: string;
    let childName: string;
    if (!firstCategory && !secondCategory) {
      if (fileName === 'list') {
        routes.push({
          name: 'list',
          path: '/:category',
          component: moduleFn
        })
        return;
      } else if (fileName === 'self-introduction') {
        routes.push({
          name: 'self-introduction',
          path: '/',
          component: moduleFn
        });
        return;
      }
      return
    } else if (!secondCategory) {
      parentName = firstCategory;
      childName = fileName;
    } else {
      parentName = firstCategory;
      childName = secondCategory;
    }
    parentRoute = routes.find(item => item.path === `/${parentName}`);
    if (!parentRoute) {
      parentRoute = {
        // name: parentName,
        path: `/${parentName}`,
        children: []
      };
      routes.push(parentRoute);
    }
    const childRoute: RouteRecordRaw = {
      name: childName,
      path: childName,
      component: moduleFn
    }
    parentRoute.children!.push(childRoute)
  })
  return routes;
}
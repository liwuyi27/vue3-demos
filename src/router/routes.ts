import type { RouteRecordRaw } from "vue-router";

export const routes = createRoutes();

function createRoutes() {
  const fileRegx = /\/views\/([\w-]+)\.vue/;
  const dirRegx = /\/views\/([\w-]+)\/([\w-]+)\.vue/;
  const modules = import.meta.glob(['@/views/*.vue', '@/views/**/*.vue']);
  const routes: RouteRecordRaw[] = [];
  Object.entries(modules).forEach(([path, moduleFn]) => {
    let match = fileRegx.exec(path);
    if (match) {
      const name = match[1];
      const route: RouteRecordRaw = {
        name,
        path: `/${name}`,
        component: moduleFn
      };
      routes.push(route);
      return;
    }
    match = dirRegx.exec(path);
    if (match) {
      const dir = match[1];
      const name = match[2];
      let route = routes.find(item => item.name === dir);
      if (!route) {
        route = {
          name: dir,
          path: `/${dir}`,
          children: []
        };
        routes.push(route);
      }
      route.children?.push({
        name,
        path: `${name}`,
        component: moduleFn
      })
    }
  })
  return routes;
}
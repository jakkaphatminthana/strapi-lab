export function customRouter(innerRouter, extraRoutes = []) {
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      return innerRouter.routes.concat(extraRoutes);
    },
  };
}

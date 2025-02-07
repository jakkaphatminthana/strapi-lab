/**
 * blog router
 */

import { factories } from "@strapi/strapi";
import { customRouter } from "../../../utils/router";

const defaultRouter = factories.createCoreRouter("api::blog.blog");

const customRoutes = [
  {
    method: "GET",
    path: "/blog/random",
    handler: "blog.random",
    config: {
      policies: [],
      middlewares: [],
      auth: false,
    },
  },
];

export default customRouter(defaultRouter, customRoutes);

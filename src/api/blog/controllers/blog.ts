/**
 * blog controller
 */

import { factories } from "@strapi/strapi";
const { HttpError } = require("@strapi/utils").errors;

export default factories.createCoreController(
  "api::blog.blog",
  ({ strapi }) => ({
    async random(ctx, next) {
      await this.validateQuery(ctx);
      try {
        const sanitizedQueryParams = await this.sanitizeQuery(ctx);

        const results = await strapi
          .service("api::blog.blog")
          .random(sanitizedQueryParams);
        console.log(results);

        // no necessary to use it if you transfrom response by yourself
        // const sanitizedResults = await this.sanitizeOutput(results, ctx);

        return this.transformResponse(results);
      } catch (error) {
        throw new HttpError();
      }
    },
  })
);

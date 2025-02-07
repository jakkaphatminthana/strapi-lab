import { generateShortID, generateSlug } from "../../../../utils/generator";
import { errors } from "@strapi/utils";

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.title) {
      data.slug = generateSlug(data.title);

      try {
        const blogs = await strapi
          .service("api::blog.blog")
          .getBySlug(data.slug);

        if (blogs.length > 0) {
          data.slug += `-${generateShortID()}`;
        }
      } catch (error) {
        throw new errors.ApplicationError();
      }
    }
  },
};

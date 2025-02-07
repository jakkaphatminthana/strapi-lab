/**
 * blog service
 */

import { factories } from "@strapi/strapi";
const { HttpError } = require("@strapi/utils").errors;

export default factories.createCoreService("api::blog.blog", () => ({
  async random(query: Record<string, any>) {
    const limit = query.limit || 10;
    const dbType = strapi.db.connection.client.config.client;
    const randomFunction = dbType === "pg" ? "RANDOM()" : "RAND()"; //random (RAND for MySQL, RANDOM for Postgres)

    //// normal
    // const blogs = await strapi.db.connection
    //   .table("blogs")
    //   .whereNotNull("published_at")
    //   .orderByRaw(randomFunction)
    //   .limit(limit);

    try {
      const blogs = await strapi.db.connection
        .from("blogs AS b")
        .leftJoin("blogs_category_lnk AS bcl", "b.id", "bcl.blog_id")
        .leftJoin("categories AS c", "bcl.category_id", "c.id")
        .whereNotNull("b.published_at")
        .orderByRaw(randomFunction)
        .select(
          "b.id",
          "b.title",
          "b.description",
          "c.id AS category_id",
          "c.name AS category_name"
        )
        .limit(limit);
      console.log("🔴 blogs = ", blogs);

      const transformedBlogs = blogs.map((blog) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        category: {
          id: blog.category_id,
          name: blog.category_name,
        },
      }));

      return transformedBlogs;
    } catch (error) {
      console.error("Server Error: ", error);
      throw new HttpError();
    }
  },

  getBySlug(slugs: string[]) {
    return strapi.entityService.findMany("api::blog.blog", {
      filters: {
        slug: {
          $in: slugs,
        },
      },
    });
  },
}));

'use strict';

/**
 * Category.js controller
 *
 * @description: A set of functions called "actions" for managing `Category`.
 */

module.exports = {

  /**
   * Retrieve category records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.category.search(ctx.query);
    } else {
      // return strapi.services.category.fetchAll(ctx.query, populate);
      const collection = {};
      const catEntities = await strapi.services.category.fetchAll(ctx.query, populate);
      catEntities.map(entity => {
        collection[entity.id] = { id: entity.id, name: entity.name, subcategories: {} };
        return null;
      });
      const subEntities = await strapi.services.subcategory.fetchAll(ctx.query, populate);
      subEntities.map(entity => {
        const catId = entity.category.id;
        collection[catId].subcategories = {
          ...collection[catId].subcategories,
          [entity.id]: { id: entity.id, name: entity.name, documents: {} },
        };
        return null;
      });
      const documentEntities = await strapi.services.document.fetchAll(ctx.query, populate);
      documentEntities.map(entity => {
        const catId = entity.subcategory.category;
        const subId = entity.subcategory.id;
        collection[catId].subcategories[subId].documents = {
          ...collection[catId].subcategories[subId].documents,
          [entity.id]: { id: entity.id, name: entity.name },
        };
        return null;
      });
      return collection;
    }
  },

  /**
   * Retrieve a category record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.category.fetch(ctx.params);
  },

  /**
   * Count category records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.category.count(ctx.query);
  },

  /**
   * Create a/an category record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.category.add(ctx.request.body);
  },

  /**
   * Update a/an category record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.category.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an category record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.category.remove(ctx.params);
  }
};

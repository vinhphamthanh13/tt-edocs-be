'use strict';

/**
 * Subcategory.js controller
 *
 * @description: A set of functions called "actions" for managing `Subcategory`.
 */

module.exports = {

  /**
   * Retrieve subcategory records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    const collection = {};
    if (ctx.query._q) {
      return strapi.services.subcategory.search(ctx.query);
    } else {
      // return strapi.services.subcategory.fetchAll(ctx.query, populate);
      const subEntries = await strapi.services.subcategory.fetchAll(ctx.query, populate);
      subEntries.map(entry => {
        const catName = entry.category.name;
        collection[catName] = collection[catName] ? [...collection[catName]] : [];
        const docs = entry.documents.map(doc => ({ id: doc.id, name: doc.name }));
        collection[catName].push(...docs);
      });
    }

    return collection;
  },

  /**
   * Retrieve a subcategory record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.subcategory.fetch(ctx.params);
  },

  /**
   * Count subcategory records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.subcategory.count(ctx.query);
  },

  /**
   * Create a/an subcategory record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.subcategory.add(ctx.request.body);
  },

  /**
   * Update a/an subcategory record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.subcategory.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an subcategory record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.subcategory.remove(ctx.params);
  }
};

'use strict';

/**
 * Format.js controller
 *
 * @description: A set of functions called "actions" for managing `Format`.
 */

module.exports = {

  /**
   * Retrieve format records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.format.search(ctx.query);
    } else {
      return strapi.services.format.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a format record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.format.fetch(ctx.params);
  },

  /**
   * Count format records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.format.count(ctx.query);
  },

  /**
   * Create a/an format record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.format.add(ctx.request.body);
  },

  /**
   * Update a/an format record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.format.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an format record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.format.remove(ctx.params);
  }
};

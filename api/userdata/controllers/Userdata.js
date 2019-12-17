'use strict';

/**
 * Userdata.js controller
 *
 * @description: A set of functions called "actions" for managing `Userdata`.
 */

module.exports = {

  /**
   * Retrieve userdata records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.userdata.search(ctx.query);
    } else {
      return strapi.services.userdata.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a userdata record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.userdata.fetch(ctx.params);
  },

  /**
   * Count userdata records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.userdata.count(ctx.query);
  },

  /**
   * Create a/an userdata record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.userdata.add(ctx.request.body);
  },

  /**
   * Update a/an userdata record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.userdata.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an userdata record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.userdata.remove(ctx.params);
  }
};

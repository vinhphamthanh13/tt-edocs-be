'use strict';

const get = require('lodash/get');

/**
 * Statistics.js controller
 *
 * @description: A set of functions called "actions" for managing `Statistics`.
 */

module.exports = {

  /**
   * Retrieve statistics records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.statistics.search(ctx.query);
    } else {
      // return strapi.services.statistics.fetchAll(ctx.query, populate);
      const statistics = await strapi.services.statistics.fetchAll(ctx.query, populate);
      const queriedStats = statistics[0];
      const downloadCount = get(queriedStats, 'download_count');
      const downloadId = get(queriedStats, 'download_id');
      const downloadName = get(queriedStats, 'download_name');
      const id = get(queriedStats, 'id');

      return {
        id,
        downloadCount,
        downloadId,
        downloadName,
      };
    }
  },

  /**
   * Retrieve a statistics record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    return strapi.services.statistics.fetch(ctx.params);
  },

  /**
   * Count statistics records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    const count = await strapi.services.statistics.fetchAll(ctx.query);
    return count.reduce((acc, curr) => acc + curr.download_count, 0);
  },

  /**
   * Create a/an statistics record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.statistics.add(ctx.request.body);
  },

  /**
   * Update a/an statistics record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.statistics.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an statistics record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.statistics.remove(ctx.params);
  }
};

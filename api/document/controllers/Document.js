'use strict';
const _ = require('lodash');

/**
 * Documents.js controller
 *
 * @description: A set of functions called "actions" for managing `Documents`.
 */

module.exports = {

  /**
   * Retrieve documents records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.document.search(ctx.query);
    } else {
      return strapi.services.document.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a documents record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }
    const categoryEntities = await strapi.services.category.fetchAll(ctx.query);
    const documentEntity = await strapi.services.document.fetch(ctx.params);
    const categoryId = documentEntity.subcategory.category;
    const docCategory = _.find(categoryEntities, entity => entity.id == categoryId);
    return {
      id: documentEntity.id,
      name: documentEntity.name,
      rate: documentEntity.rate,
      pages: documentEntity.pages,
      format: documentEntity.format.name,
      pdfUrl: documentEntity.pdfUrl,
      wordUrl: documentEntity.wordUrl,
      updated: documentEntity.updatedAt,
      categoryName: docCategory.name,
      categoryId: docCategory.id,
      subcategoryName: documentEntity.subcategory.name,
      subcategoryId: documentEntity.subcategory.id,
    };
  },

  /**
   * Count documents records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.document.count(ctx.query);
  },

  /**
   * Create a/an documents record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.document.add(ctx.request.body);
  },

  /**
   * Update a/an documents record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.document.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an documents record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.document.remove(ctx.params);
  }
};

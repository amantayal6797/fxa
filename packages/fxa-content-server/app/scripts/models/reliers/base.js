/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * The base relier. It's the base of all other reliers, or a NullRelier,
 * depending on how you want to use it.
 */

define(function (require, exports, module) {
  'use strict';

  var Backbone = require('backbone');
  var p = require('lib/promise');

  var Relier = Backbone.Model.extend({
    defaults: {
      context: null,
    },

    fetch: function () {
      return p(true);
    },

    /**
     * Check if the user visits FxA directly, without
     * a relier.
     *
     * @returns {Boolean}
     * `true` if the user visits FxA without using
     * a relier
     */
    isDirectAccess: function () {
      return ! this.has('service');
    },

    /**
     * Check if the relier is using the oauth flow
     *
     * @returns {Boolean}
     */
    isOAuth: function () {
      return false;
    },

    /**
     * Check if the relier is Sync for Firefox Desktop
     *
     * @returns {Boolean}
     */
    isSync: function () {
      return false;
    },

    /**
     * Check if the relier forces the "customize sync" checkbox to be checked.
     *
     * @returns {Boolean}
     */
    isCustomizeSyncChecked: function () {
      return false;
    },

    /**
     * Check if the relier wants access to the account encryption keys.
     *
     * @returns {Boolean}
     */
    wantsKeys: function () {
      return false;
    },

    /**
     * Derive relier-specific keys from the account master keys.
     * By default no keys are available.
     *
     * @returns {Promise}
     */
    deriveRelierKeys: function (/* keys */) {
      return p({});
    },

    /**
     * Get the resume token info to be passed along in the email
     * verification links
     *
     * @returns {Object}
     */
    pickResumeTokenInfo: function () {
      return {};
    },

    /**
     * Indicates whether the relier allows cached credentials
     *
     * @returns {Boolean}
     */
    allowCachedCredentials: function () {
      return true;
    },

    /**
     * Indicates whether the relier is trusted
     *
     * @returns {Boolean}
     */
    isTrusted: function () {
      return true;
    },

    /**
     * Indicate whether the given accounts needs any additional permissions
     *
     * @returns {Boolean}
     */
    accountNeedsPermissions: function (/* account */) {
      return false;
    }
  });

  module.exports = Relier;
});

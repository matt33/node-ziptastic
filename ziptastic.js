'use strict';

var Promise = require('bluebird'),
    request = Promise.promisify(require('request')),
    _       = require('lodash');

var baseURL = 'http://zip.elevenbasetwo.com/v2';

var Ziptastic = {
	url: function(options) {
		return [baseURL, options.country, options.zip].join('/');
	},
	parse: Promise.method(function(options, callback) {
		options = _.defaults(options || {}, {
			country: 'US'
		});

		if (!options.zip) {
			throw new Error('A ZIP code must be supplied');
		}

		return request(this.url(options))
			.spread(function(response, body) {
				return body;
			})
			.nodeify(callback);
	})
};

module.exports = _.extend(Ziptastic.parse, Ziptastic);
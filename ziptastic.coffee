Q = require 'q'
request = require 'request'

exports.parse = (zip) ->
	deferred = Q.defer()
	request.get "http://zip.elevenbasetwo.com/v2/US/#{zip}", (err, res, body) ->
		if err
			deferred.reject new Error err
		else
			deferred.resolve JSON.parse body

	return deferred.promise
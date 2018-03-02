var Services = require("./Services");
var when = require('when');
const uuidv1 = require('uuid/v1');

function ServicesService() {
	var self = this;

	self.getByKey = function(key){
		var deferred = when.defer();

		Services.findOne({"key" : key}, function(err, service){
			deferred.resolve(service);
		});

		return deferred.promise;
	};


	self.create = function(key){
		var deferred = when.defer();
		var services = new Services();
		services.key = key;
		services.secret = uuidv1();

		services.save(function(err, created){
			deferred.resolve(created);
		});

		return deferred.promise;
	}

}
module.exports = new ServicesService();

var News = require("./News");
var when = require('when');
function NewsService() {
	var self = this;

	self.getnews = function(){
		var deferred = when.defer();


		News.find({})
		.sort({published: 'descending'})
		.exec(function(err, news) {
			deferred.resolve(news);
		});

		return deferred.promise;
	};

	self.create = function(in_news_data){
		var deferred = when.defer();
		var news = new News();

		news.heading = in_news_data.heading;
		news.text = in_news_data.text;
		news.image = in_news_data.image;
		news.published = in_news_data.published;
		news.publisherId = in_news_data.publisherId;
		news.publisher = in_news_data.publisher;

		news.save(function(err, createdNews){
			deferred.resolve(createdNews);
		});

		return deferred.promise;
	}



}
module.exports = new NewsService();

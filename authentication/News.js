var mongoose = require('mongoose');

var newsSchema = mongoose.Schema({
    heading: String,
    text: String,
    image: String,
    published: { type: Date },
    publisher: String,
    publisherId: String,
});

var News = mongoose.model('News', newsSchema);

module.exports = News;

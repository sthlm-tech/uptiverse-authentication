var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
    key: String,
    secret: String,
});

var Services = mongoose.model('Services', serviceSchema);

module.exports = Services;

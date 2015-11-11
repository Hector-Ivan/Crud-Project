var Backbone = require('backbone');


/****************************************
  App
*****************************************/

var App = require('../app');
var Book = require('../models/Book');

/****************************************
  Collection: Book
*****************************************/

var BookCollection = Backbone.Collection.extend({
  url: App.Settings.apiRoot + '/books',
  model: Book
});

App.Collections.book = new BookCollection;

module.exports = App.Collections.book;

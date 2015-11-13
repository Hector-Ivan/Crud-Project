var Backbone = require('backbone');

/****************************************
  App
*****************************************/

var App = require('../app');

/****************************************
  Model: Book
*****************************************/

App.Models.Book = Backbone.Model.extend({
  url: function() {
    var base = App.Settings.apiRoot + '/books';
    if (this.isNew()) return base;
    return base + '/' + this.id
  }
});

module.exports = App.Models.Book;
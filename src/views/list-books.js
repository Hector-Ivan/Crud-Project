var $ = require('jquery');
var Backbone = require('backbone');
var booksTemplate = require('../templates/list-books.hbs');

// App

var App = require('../app');

// View: List Books

var ListBooks = Backbone.View.extend({
	el: $('main'),

	collection: App.Collections.book,

	render: function () {
		var _this = this;
		var bookCollection = this.collection;

		// Fetch Collection from Server
		bookCollection.fetch()
			.then(function (books) {
				_this.$el.html(booksTemplate(books))
			})
			.fail(function (xhr) {
				console.log(xhr.status);
			})
	}
})

module.exports = ListBooks;
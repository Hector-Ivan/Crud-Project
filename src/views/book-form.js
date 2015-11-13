var $ = require('jquery');
var Backbone = require('backbone');
var formTemplate = require('../templates/books-form.hbs');


/****************************************
  App
*****************************************/

var App = require('../app');
var Product = require('../models/book.js')

/****************************************
  View: Product Form
*****************************************/

var BookFormView = Backbone.View.extend({
	el: 'main',
	editMode: false,

	render: function (BookId) {
		var _this = this;
		this.editMode = !!BookId;

		// Display form in Create Mode
		if (!this.editMode) {
			var output = formTemplate();
			this.$el.html(output)


		// Display form in Update Mode
		} else {
			var product = this.product = new Product({id: BookId});

			product.fetch()
				.then(function (book) {
					var output = formTemplate(product.toJSON());
					_this.$el.html(output);

				var form = _this.$el.find($('form.product'))

				form.find($('select[name="code"]')).val(book.code)
				form.find($('select[name="title"]')).val(book.title)

				})
		}
	},

	events: {
		"submit form.product": "submitForm" 
	},

	submitForm: function (event) {
		event.preventDefault()
		// Collect Form Data
		var formData = {
			code: $('form.product select[name=code]').val(),
			title: $('form.product select[name=title]').val(),
		};

		// Add Mode (Create User)
		if(!this.editMode) {

			// Only set the image on add mode
			switch (formData.title) {
				case "html":
					formData.img = '/images/html.png';
					break;
				case "css":
					formData.img = '/images/css.png';
					break;
				case "htmlcss":
					formData.img = '/images/html&css.png';
					break;
				case "javascript":
					formData.img = '/images/javascript.png';
					break;
				case "jquery":
					formData.img = '/images/jquery.png';
					break;
				case "ajax":
					formData.img = '/images/ajax.png';
				case "php":
					formData.img = '/images/php.png';
				case "gameing":
					formData.img = '/images/gaming-edition-two.png';
				case "game-coding":
					formData.img = '/images/gaming-edition-two.png';
				case "game-making":
					formData.img = '/images/game-maker.png';	
				default:
					// alert('Sorry, we do not have that product')
			}

			App.Collections.book.create(formData, {
				success: function (book) {
					App.router.navigate('/books', { trigger: true });
				}
			});

		// Edit Mode (Update product)
		} else {
			this.product.set(formData);
			this.product.save()
				.then(function () {
					App.router.navigate('/', { trigger: true});
				});
		}
	}
})

module.exports = BookFormView;
var Backbone = require('backbone');

// App
var App = require('./app');
var userCollection = require('./collections/user');
var bookCollection = require('./collections/book')

// View: User Form
var UserFormView = require('./views/user-form');
App.Views.UserForm = new UserFormView;

// View: List Users
var ListUsersView = require('./views/list-users');
App.Views.ListUsers  = new ListUsersView;

// View: List Books
var ListBooksView = require('./views/list-books');
App.Views.ListBooks = new ListBooksView;

// App Router
App.Router = Backbone.Router.extend({

  // Route definitions
  routes: {
    '': 'index',
    'user/add(/)': 'addUser',
    'user/:id/edit(/)': 'addUser',
    'user/:id/delete(/)': 'deleteUser',
    'books(/)': 'book',
    'books/add(/)': 'addBook',
    'books/:id/edit(/)': 'addBook',
    'books/:id/delete(/)': 'deleteBook',
    '*actions': 'defaultRoute'
  },

  // Route handlers

  index: function() {
    App.Views.ListUsers.render();
  },

  addUser: function(id) {
    App.Views.UserForm.render(id);
  },

  deleteUser: function(id) {
    var user = userCollection.get(id);

    user.destroy().done(function (user) {
      App.router.navigate('/', { trigger: true })
    });
  },

  defaultRoute: function(actions) {
    console.log('404');
  },

  book: function() {
    App.Views.ListBooks.render();
  }
});

// Initiate the router
App.router = new App.Router;

Backbone.history.start();

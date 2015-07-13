// GLOBAL IRON ROUTER CONFIG
Router.configure({
  layoutTemplate: 'layout'
});


// Home directory for initial load
Router.route('/', function(){
  this.render('signUp');
});
// GLOBAL IRON ROUTER CONFIG
Router.configure({
  layoutTemplate: 'layout'
});


// Home directory for initial load
Router.route('/signup', function(){
  this.render('signUp');
});



// Login Form
Router.route('/logmein', function(){
  this.render('login');
});

// Login Form
Router.route('/forgotmypassword', function(){
  this.render('forgotPassword');
});
// GLOBAL IRON ROUTER CONFIG
Router.configure({
  layoutTemplate: 'layout'
});


// Home directory for initial load
Router.route('/signMeUp', function(){
  this.render('signUp');
});



// Login Form
Router.route('/logMeIn', function(){
  this.render('login');
});

// Forgot password Form
Router.route('/forgotMyPassword', function(){
  this.render('forgotPassword');
});
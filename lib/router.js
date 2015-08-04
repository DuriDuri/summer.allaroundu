// GLOBAL IRON ROUTER CONFIG
Router.configure({
  layoutTemplate: 'layout'
});



// Is there a user logged in?
// Returns true if yes.
var isLoggedIn = function() {
  if(Meteor.user()){
    return true;
  }
};

Router.onBeforeAction(function() {
  if(isLoggedIn()){
    this.redirect('home');
  } else {
    this.next();
  }
},
  {except: ['home']}
);

Router.onBeforeAction(function() {
  if(!isLoggedIn()){
    this.redirect('logMeIn');
  } else {
    this.next();
  }
},
  {except: ['logMeIn', 'signMeUp', 'forgotMyPassword']}
);


//////////



// Home directory for initial load
Router.route('/', {
  name: 'home',
  template: 'home',
  data : function(){
    return Meteor.user()
  },
  waitOn: function () {
    return [
      Meteor.subscribe('Users')
    ]
  }
});


// Sign up form
Router.route('/signMeUp', {
  name: 'signMeUp',
  template: 'signMeUp'
});



// Login Form
Router.route('/logMeIn', {
  name: 'logMeIn',
  template: 'logMeIn'
});



// Forgot password Form
Router.route('/forgotMyPassword', {
  name: 'forgotMyPassword',
  template: 'forgotMyPassword'
});
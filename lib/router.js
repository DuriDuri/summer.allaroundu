// GLOBAL IRON ROUTER CONFIG
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading'
});



// Is there a user logged in?
// Returns true if yes.
var isLoggedIn = function() {
  if(Meteor.user() && Meteor.user().emails[0].verified === true){
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
  {except: ['home', 'loading' ,'updateLocation']}
);

Router.onBeforeAction(function() {
  if(!isLoggedIn()){
    this.redirect('logMeIn');
  } else {
    this.next();
  }
},
  {except: ['logMeIn', 'signMeUp', 'forgotMyPassword', 'updateLocation']}
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


// Update location form
Router.route('/update', {
  name: 'updateLocation',
  template: 'updateLocation',
  layoutTemplate: 'simpleFormLayout'
});


// Sign up form
Router.route('/signMeUp', {
  name: 'signMeUp',
  template: 'signMeUp',
  layoutTemplate: 'simpleFormLayout'
});




// Login Form
Router.route('/logMeIn', {
  name: 'logMeIn',
  template: 'logMeIn',
  layoutTemplate: 'simpleFormLayout'
});



// Forgot password Form
Router.route('/forgotMyPassword', {
  name: 'forgotMyPassword',
  template: 'forgotMyPassword',
  layoutTemplate: 'simpleFormLayout'
});
/*
  Client side accounts config file

  Place top-level code here

*/


var doneCallback;

Accounts.onResetPasswordLink(function(token, done) {
 // send back to /forgotPassword page
  Router.go("/forgotMyPassword");

  // Set a new session variable with the reset token from email
  Session.set('resetPassword', token);  
  
  // store the done callback
  doneCallback = done;  
  //console.log("onResetPasswordLink, and token is  " + token);
});





// Verification call back
Accounts.onEmailVerificationLink(function(token, done){
	//Marks verified as true
	Accounts.verifyEmail(token);
	Router.go("/");
});


// Accounts.ui.config({
//       passwordSignupFields: 'EMAIL_ONLY' });
//       
//       



if (Meteor.isClient) {
  Meteor.startup(function() {
    GoogleMaps.load();
  });

}





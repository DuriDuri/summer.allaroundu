Accounts.config({
    sendVerificationEmail: true, 
    
})


//  Store the user's profile when creating the user
Accounts.onCreateUser(function(options, user){
    if(options.profile) {
            user.profile = options.profile;
            console.log("New user created with the following profile: " + options.profile);
        }

    user.ModifiedOn = new Date();
    return user;
});


// // Only allow user's who have verified they're email address to login 
Accounts.validateLoginAttempt(function(attempt){
  

  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    console.log('Please verify your email address');
    return false; // the login is aborted as they havent validated their profile
  }
  return true;
}); 


// Overarching Email template
Accounts.emailTemplates.siteName = "summer.AllAroundU";
Accounts.emailTemplates.from = "AllAroundU Support <support@allaroundu.org>";


// Verify User Template
Accounts.emailTemplates.verifyEmail.from = function(){
	return "AllAroundU <support@allaroundu.org>";
}

Accounts.emailTemplates.verifyEmail.subject = function(){
	return "Are you human?";
}

Accounts.emailTemplates.verifyEmail.text = function(user, url){
	return "Hey " + user.profile.FirstName +"! \n \nHope you're ready to get started! Simply log into the following link to get your account verified. \n \n"
	 + url + "\n \n Cheers!";
}




// Reset Password Template
Accounts.emailTemplates.resetPassword.from = function(){
	return "AllAroundU Support <support@allaroundu.org>";
}

Accounts.emailTemplates.resetPassword.subject = function(){
	return "Let's get you back up!";
}

Accounts.emailTemplates.resetPassword.text = function(user, url){
	return "Hey " + user.profile.FirstName +"! \n \nHere to help! Simply log into the following link to get your password reset. \n \n"
	 + url + "\n \n Cheers!";
}



/*
	Meteor methods for user accounts
 */

Meteor.methods({

	getUsersFullName: function(userID){
			check(userID, String)

			var user = Meteor.users.findOne({_id: userID});
			var fullName = user.profile.FirstName + " " + user.profile.LastName;

			return fullName;	
		}

});
Template.forgotMyPassword.helpers({
 resetPassword: function(){
    return Session.get('resetPassword');
  }
});



Template.forgotMyPassword.events({
	
  // Send reset email button pressed
  'click #sendResetEmail' : function(event){
		event.preventDefault();
    var resetEmail = $("input[name='email']").val();
		
    // Ensure the form was properly entered
		if ( $('#requestPasswordResetForm').form('is valid') ) {
        // console.log("Entered if");
        Accounts.forgotPassword({email : resetEmail}, function(err){
                  if (err){
                    if (err.message === "User not found [403]"){
                        $('#requestPasswordResetForm').form('add prompt', 'email', "Let's be real..did you even signed up?");
                        return;
                    }
                    else{
                      console.log(err);
                      return;
                    }
                  }
                  else{
                    console.log(" The email has been sent");

                    alert("Password reset email has been sent")

                    // Analytics
                    analytics.track("Password Reset Requested", {
                      user: Meteor.userId(),
                      email: resetEmail,
                    });

                    
                    $('#requestPasswordResetForm').form('clear');
                  }
        });
    }
	},

  'click #logInLink': function(event) {
      Router.go('/logMeIn');
  }, 
  
  'click #signUpLink': function(event) {
      Router.go('/signMeUp');
    },


  // Reset with new password button pressed
	'click #resetPassword' : function(event) {
        event.preventDefault();
        
        var newPassword = $("input[name='passwordOne']").val();
        var confirmationPassword = $("input[name='passwordTwo']").val();

        // Valididate reset Password form
        if ($('#resetPasswordForm').form('is valid')) {
          Accounts.resetPassword(Session.get('resetPassword'), newPassword, function(err){
              if (err){
                console.log(err);
              }
              else {
                //Reset toggle
                Session.set('resetPassword', null);
                
                // Analytics
                analytics.track("Password Successfully Reset", {
                      user: Meteor.userId(),
                      email: resetEmail,
                    })

                // Send user back to login
                Router.go('/');
              }

            });
          
        return false; 
    }
  }
});





Template.forgotMyPassword.onRendered( function(){
  // Reset Password Form Validation rules
  // 
  $('#resetPasswordForm').form({

    inline : true,
    // on     : 'blur',
    fields: {
      passwordOne: {
        identifier  : 'passwordOne',
        rules: [
          {
            type  : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'length[6]',
            prompt : 'Your password must be at least 6 characters'
          }
        ]
      },
      passwordTwo: {
        identifier : 'passwordTwo',
        rules: [
          {
            type  : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'length[6]',
            prompt : 'If your first password was more than 6 characters, this should too..'
          },
          {
            type   : 'match[passwordOne]',
            prompt : "Your password doesn't match the previous one"
          }
        ]
      }
    }
  });
  $('#requestPasswordResetForm').form({
    inline : true,
    fields: {
      email: {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter your email address'
          },
          {
            type  : 'empty',
            prompt : 'Please enter an email address'
          },
          {
            type   : 'length[6]',
            prompt : 'Your password had to have been longer than that'
          }
        ]
      }
    }
  });
});



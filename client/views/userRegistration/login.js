Template.login.events({
	'click #submitForm': function () {
		// Pull information
		var email = $("input[name='email']").val();
		var password = $("input[name='password']").val();
		// console.log("email" + email + " password" + password);


		//Validate
		if( $('#loginForm').form('is valid') ) {
			//login user
			Meteor.loginWithPassword(email, password, function(err){
              if (err){
                
                // if error is incorrect password
                if (err.message === "Incorrect password [403]") {
                    // $('#loginForm').form('add prompt', 'loginPassword', 'Incorrect password.');
                    return;
                }
                else if (err.message === "User not found [403]"){
                    // $('#loginForm').form('add prompt', 'loginEmail', "We don't recognize that email address. Are you sure you've signed up?");
                    return;
                }
                else{
                  console.log(err);
                  return;
                }
           	  }
              else{
              	console.log(" The user has been logged in.");
            		// Router.go('');
            	}
            });
          
        }
	}
});








Template.login.onRendered( function(){
  //Validate that an actual password was entered
  // Form validation
  // 
  $('#loginForm').form({
    inline : true,
    // on     : 'blur',
    fields: {
      name: {
        identifier  : 'email',
        rules: [
          {
            type   : 'email',
            prompt : 'Please enter your email address'
          }
        ]
      },
      password: {
        identifier : 'password',
        rules: [
          {
            type  : 'empty',
            prompt : 'Please enter a password'
          },
          {
            type   : 'length[6]',
            prompt : 'Your password had to have been over 6 characters.'
          }
        ]
      }
    }
  });

});
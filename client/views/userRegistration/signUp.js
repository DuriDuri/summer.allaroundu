



Template.signMeUp.events({
  'click #submitForm': function(event, template) {
    	event.preventDefault();
    	console.log('Submit pressed');

    	if( $('#signUpForm').form('is valid') ) {
	        signUpUser();
    	}
    	else{
    		return false;
    	}
  	},

  	'click #forgotPasswordLink': function(event) {
        Router.go('/forgotMyPassword');
    }, 
  
    'click #logInLink': function(event) {
        Router.go('/logMeIn');
    }
});





Template.signMeUp.helpers({
	
	// Map options
	mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(42.3714947, -71.0864239),
                draggable: false/true,
                scrollwheel: false,
                zoom: 11,
                backgroundColor: 'rgb(27,28,29)',
                color: 'rgb(27,28,29)',
                styles : [
				  {
				    stylers: [
				      { hue: "#00ffe6" },
				      { saturation: -20 }
				    ]
				  },{
				    featureType: "road",
				    elementType: "geometry",
				    stylers: [
				      { lightness: 100 },
				      { visibility: "simplified" }
				    ]
				  },{
				    featureType: "road",
				    elementType: "labels",
				    stylers: [
				      { visibility: "off" }
				    ]
				  }
				]
            };
        }
    },
    userGravatar : function(){
		var gravatarURL = Meteor.user().profile.ImageURL;
		if (gravatarURL.indexOf('default=404') > 1) return false;
		else return gravatarURL;
	}
});








Template.signMeUp.onRendered( function(){
	console.log("Hey there! Like looking under the hood? - send me an email at durid@union.edu and let's talk about upcoming projects");


	// Get GPS Coordinates
	getUsersGeolocation();

	// Initialize dropdown
	$('select.dropdown').dropdown();
	
	// Mask protect input values
 	$("input[name='phoneNumber']").mask("(999) 999-9999");

 	// Form validation
 	$('#signUpForm').form({
 		keyboardShortcuts : false,
	  	inline : true,
	  	fields: 
	  		{
		  	    name: {
	  	        identifier  : 'email',
			  	  rules: [
		          {
			            type   : 'empty',
			            prompt : 'Please enter your email address'
			          },
			          {
			            type   : 'email',
			            prompt : 'Please enter an actual email address'
			          },
			          {
			            type   : 'contains[@union.edu]',
			            prompt : 'Sorry, we only like Union College affiliates'
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
		  	            prompt : 'Your password must be at least 6 characters'
		  	          }
		  	        ]
		  	      },
		  	      
		  	    firstName: {
		  	        identifier : 'firstName',
		  	        rules: [
		  	          {
		  	            type   : 'empty',
		  	            prompt : 'Please enter your first name'
		  	          },
			          {
			            type   : 'minLength[2]',
			            prompt : "C'Mon, we're both better than that"
			          }
			        ]
		  	      },
		  	    
		  	    lastName: {
		  	        identifier : 'lastName',
		  	        rules: [
		  	          {
		  	            type   : 'empty',
		  	            prompt : 'Please enter your last name'
		  	          }
		  	        ]
		  	      },
		  	      
		  	    phoneNumber: {
		  	        identifier : 'phoneNumber',
		  	        rules: [
		  	          {
		  	            type   : 'empty',
		  	            prompt : 'How else would a friend in town reach you?'
		  	          }
		  	        ]
		  	      },
		  	      
		  	    year: {
		  	        identifier : 'year',
		  	        rules: [
		  	          {
		  	            type   : 'empty',
		  	            prompt : "Don't you expect to graduate?"
		  	          }
	        		]
	     		}
	     	}
	});


	// Initiate the map
	GoogleMaps.load();

	// Initiate geocomplete autorun
	this.autorun(function () {
		// Wait for API to be loaded
		if (GoogleMaps.loaded()) {

        

	        // Example 2 - Autocomplete + map
	        $('#location').geocomplete({
	        	map: ".map-container",
	        	details: "ul",
	          	detailsAttribute: "data-geo"
	        });

      	}
    });




// End of onRendered
});



var signUpUser = function(){
	// Basic account details
    var email = $("input[name='email']").val().toLowerCase();
    var password =  $("input[name='password']").val();

    //Set up profile details
	var classYear = $("select[name='year']").val();
    var firstName = $("input[name='firstName']").val();
    var lastName = $("input[name='lastName']").val();
    var phoneNumber = $("input[name='phoneNumber']").val().replace(/\D/g,'');
    
    //Calculate the gps location
    //
  	if(Session.get("location")) var GPSlocation = Session.get("location");
    else var GPSlocation = $("#gps").text().replace(/^\(|\)$/,'').split(',');


    // Get Gravatar image
    var options = { 
	    secure: false,
	    size : 200,
	    default : 'mm'
	};  

    var url = Gravatar.imageUrl(email, options);
	// https://secure.gravatar.com/avatar/5658ffccee7f0ebfda2b226238b1eb6e
	


	// Make the profile object
    var profile = {
    	ImageURL : url,
        FirstName : firstName,
        LastName : lastName,
        PhoneNumber : phoneNumber,
        ClassYear : classYear,
        location : GPSlocation
    };



    console.log(profile);
    // Create user and check errors
    Accounts.createUser({email: email, password : password, profile: profile}, function(err){
        if (err) {
        	if (err.message === 'Email already exists. [403]') {
          		$('#signUpForm').form('add prompt', 'email', 'We both know that email address has already been registerd. Try reseting your password'); 
          		
          		// Analytics
		      	analytics.track( "User repeated sign up", {
		            name: firstName + " " + lastName,
		            firstName : firstName,
		            lastName : lastName,
		            email: email,
		            phone : phoneNumber,
		            location : GPSlocation
		        });



          		return console.log('We are sorry but this email is already used.');

        	}
        	else if(err.message == "Login forbidden [403]"){
        		// Inform the user to verify email
          		swal("Check your email!",   "You're all signed up! Make sure to check your email to verify your account",   'success' );
          		
          		// Analytics
		      	analytics.track( "User Signed Up", {
		            name: firstName + " " + lastName,
		            firstName : firstName,
		            lastName : lastName,
		            email: email,
		            phone : phoneNumber,
		            location : GPSlocation
		        });
		        
		        console.log("You need to verify your email before moving forward.")

        	}
         	else {
          		$('#signUpForm').form('add prompt', 'email', 'Something went wrong! Try refreshing the page'); 


          		// Analytics
		      	analytics.track( "Something went wrong during sign Up", {
		            name: firstName + " " + lastName,
		            firstName : firstName,
		            lastName : lastName,
		            email: email,
		            phone : phoneNumber,
		            location : GPSlocation
		        });

          		return console.log("Inform the user that account creation failed" + err);
          	}
        }

        // No errors! yay!
        else {
          console.log("Success. Account has been created and the user has logged in successfully.");
         
          
          // Inform the user with UI Kit to verify email
          swal("Check your email!",   "You're all signed up! Make sure to check your email to verify your account",   'success' );
          
          // Analytics
	      analytics.identify( Meteor.user()._id, {
	            name: firstName + " " + lastName,
	            firstName : firstName,
	            lastName : lastName,
	            email: email,
	            phone : phoneNumber,
	            location : GPSlocation
	        });
         
          
          // Then reset form
          //
          $('#signUpForm').form('clear')

          //Route the user to the main page
			// Router.go('/');
        }});
}





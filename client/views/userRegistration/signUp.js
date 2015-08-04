Template.signUp.events({
  'click #submitForm': function(event, template) {
    	event.preventDefault();
    	console.log('Submit pressed');

    	if( $('#signUpForm').form('is valid') ) {
	        // Basic account details
	        var email = $("input[name='email']").val();
	        var password =  $("input[name='password']").val();

	        //Set up profile details
			var classYear = $("select[name='year']").val();
	        var firstName = $("input[name='firstName']").val();
	        var lastName = $("input[name='lastName']").val();
	        var phoneNumber = $("input[name='phoneNumber']").val().replace(/\D/g,'');
	        
	    
	    	// Make the profile object
	        var profile = {
	            FirstName : firstName,
	            LastName : lastName,
	            PhoneNumber : phoneNumber,
	            ClassYear : classYear
	        };

	        // Create user and check errors
	        Accounts.createUser({email: email, password : password, profile: profile}, function(err){
	            if (err) {
	            	if (err.message === 'Email already exists. [403]') {
	              		return console.log('We are sorry but this email is already used.');
	            	}
	             	else {
	              		return console.log("Inform the user that account creation failed" + err);
	              	}
	            }

	            // No errors! yay!
	            else {
	              console.log("Success. Account has been created and the user has logged in successfully.");
	              // Inform the user with UI Kit to verify email
	              //
	              // Then reset form
	              //
	              $('#signUpForm').form('clear')

	              //Route the user to the main page
	              //Router.go();
	            }});
    	}
  	}
});





Template.signUp.helpers({
	
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
				    }
				});








Template.signUp.onRendered( function(){
	// Initialize dropdown
	$('select.dropdown').dropdown();
	
	// Mask protect input values
 	$("input[name='phoneNumber']").mask("(999) 999-9999");

 	// Form validation
 	$('#signUpForm').form({
	  	inline : true,
	  	fields: 
	  		{
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
		  	            prompt : 'Please enter your graduation year'
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

        var options = {
          map: ".map-container"
        };

        // Example 2 - Autocomplete + map
        $('#location').geocomplete(options)
          .bind("geocode:result", function(event, result){
            console.log("Result: " + result.geometry.location);
          })


      }
    });




// End of onRendered
});







 var menuOpen = false;
            var menuDiv = "";
            var pictureSource;   // picture source
            var destinationType; // sets the format of returned value 
            var encodingType; // sets the format of returned value 
        
	        document.addEventListener("deviceready",onDeviceReady,false);
	
	        // Cordova is ready to be used!
	        //
	        function onDeviceReady() {
	        	console.log("Device Ready");
	            pictureSource=navigator.camera.PictureSourceType;
	            destinationType=navigator.camera.DestinationType;
	            encodingType=navigator.camera.EncodingType;
	            //http://www.raymondcamden.com/index.cfm/2012/5/30/Example-of-adding-menu-support-to-a-PhoneGap-Application
	            document.addEventListener("menubutton", doMenu, false);
	        }
	        
	        function doMenu() {
	            console.log("The menu was clicked...");
	            menuDiv = document.querySelector("#menu");
	            if(menuOpen) {
	                console.log("close the menu");
	                menuDiv.style.display="none";
	                menuOpen = false;
	            } else {
	                console.log("open the menu");
	                menuDiv.style.display="block";
	                menuOpen = true;
	            }
	        }
        
	        function GetCurrentLocation() {
	        	var options = { enableHighAccuracy: true };
	            navigator.geolocation.getCurrentPosition(onGeolocation, onError, options);
	        }
	     // onSuccess Geolocation
	        //
	        function onGeolocation(position) {
	            var element = document.getElementById('geolocation');
	            element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
	                                'Longitude: '          + position.coords.longitude             + '<br />' +
	                                'Altitude: '           + position.coords.altitude              + '<br />' +
	                                'Accuracy: '           + position.coords.accuracy              + '<br />' +
	                                'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
	                                'Heading: '            + position.coords.heading               + '<br />' +
	                                'Speed: '              + position.coords.speed                 + '<br />' +
	                                'Timestamp: '          + new Date(position.timestamp)          + '<br />';
	        }
	     
	        var watchID = null;
	        
	        function WatchCurrentLocation() {
	        	var element = document.getElementById('geowatchlocation');
	        	//clear current content - button was pressed
	        	element.innerHTML = '';
	            // Update every 3 seconds
	            var options = { frequency: 3000, enableHighAccuracy: true };
	            watchID = navigator.geolocation.watchPosition(onWatchGeolocation, onError, options);
	        }

	        // onSuccess Geolocation
	        //
	        function onWatchGeolocation(position) {
	            var element = document.getElementById('geowatchlocation');
	            element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
	                                'Longitude: ' + position.coords.longitude     + '<br />' +
	                                'Altitude: '  + position.coords.altitude      + '<br />' +
                                    'Accuracy: '  + position.coords.accuracy      + '<br />' +
                                    'Heading: '   + position.coords.heading       + '<br />' +
                                    'Speed: '     + position.coords.speed         + '<br />' +
                                    'Timestamp: ' + new Date(position.timestamp)  + '<br />' +
	                                '<hr />'      + element.innerHTML;
	        }

	       
	        
	     // Called when a photo is successfully retrieved
	        //
	        function onPhotoDataSuccess(imageData) {
	          // Uncomment to view the base64 encoded image data
	          // console.log(imageData);
                //console.log(JSON.stringify(imageData));

	          // Get image handle
	          //
	          //var smallImage = document.getElementById('smallImage');
	          var largeImage = document.getElementById('largeImage');

	          // Unhide image elements
	          //
	          //smallImage.style.display = 'block';
	          largeImage.style.display = 'block';

	          // Show the captured photo
	          // The inline CSS rules are used to resize the image
	          //
	          //smallImage.src = "data:image/jpeg;base64," + imageData;
	          largeImage.src = "data:image/jpeg;base64," + imageData;
	          
	          
	        }
	     
	     // Called when a photo is successfully retrieved
            //
            function onPhotoFileSuccess(imageData) {
              // Uncomment to view the base64 encoded image data
              // console.log(imageData);
                console.log(JSON.stringify(imageData));

              // Get image handle
              //
             
              var largeImage = document.getElementById('largeImage');

              // Unhide image elements
              //
              
              largeImage.style.display = 'block';

              // Show the captured photo
              // The inline CSS rules are used to resize the image
              //
              //smallImage.src = "data:image/jpeg;base64," + imageData;
              largeImage.src = imageData;
              
              
            }

	        // Called when a photo is successfully retrieved
	        //
	        function onPhotoURISuccess(imageURI) {
	          // Uncomment to view the image file URI 
	          // console.log(imageURI);
	          
	          // Get image handle
	          //
	          var largeImage = document.getElementById('largeImage');

	          // Unhide image elements
	          //
	          largeImage.style.display = 'block';

	          // Show the captured photo
	          // The inline CSS rules are used to resize the image
	          //
	          largeImage.src = imageURI;
	        }

	        // A button will call this function
	        //
	        function capturePhoto() {
	          // Take picture using device camera and retrieve image as base64-encoded string
	         
	          navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
	        	
	        }
	        
	     // A button will call this function
            //
            function capturePhotoWithFile() {
	    	 
              // Take picture using device camera and retrieve image as base64-encoded string
              var options = {
                quality: 100,
                destinationType : navigator.camera.DestinationType.FILE_URI,
                sourceType: navigator.camera.PictureSourceType.CAMERA,
                encodingType: navigator.camera.EncodingType.JPEG,
              }
              //navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
                navigator.camera.getPicture(onPhotoFileSuccess, onFail, options);
            }

	        // A button will call this function
	        //
	        function capturePhotoEdit() {
	          // Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
	          navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	            destinationType: destinationType.DATA_URL });
	        }

	        // A button will call this function
	        //
	        function getPhoto(source) {
	          // Retrieve image file location from specified source
	          navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
	            destinationType: destinationType.FILE_URI,
	            sourceType: source });
	        }

	        // onError Callback receives a PositionError object
	        //
	        function onError(error) {
	            alert('code: '    + error.code    + '\n' +
	                  'message: ' + error.message + '\n');
	        }
	        function onFail(message) {
	            alert('Failed because: ' + message);
	        }
	        
	        function openWindow(url) {
	        	var ref = window.open(encodeURI(url), '_self', 'location=no');
	        }
	        
	     // Show a custom confirmation dialog
	        //
	        function showConfirm() {
	            navigator.notification.confirm(
	                'What Settings should we show?',  // message
	                onConfirm,              // callback to invoke with index of button pressed
	                'Settings',            // title
	                'Beep,Vibrate'          // buttonLabels
	            );
	        }
	     
	     // process the confirmation dialog result
	        function onConfirm(buttonIndex) {
	            alert('You selected button ' + buttonIndex);
	            switch(buttonIndex)
				{
				case 0:
					playBeep();
				  break;
				case 1:
					playBeep();
				  break;
				case 2:
                    vibrate();
                  break;
				default:
					vibrate();
				
				}
	        }
	     
	        // Show a custom alert
	        //
	        function showAlert() {
	            navigator.notification.alert(
	                'What to have here?',  // message
	                alertDismissed,         // callback
	                'Settings',            // title
	                'Beep me!'                  // buttonName
	            );
	        }
	     
	     // alert dialog dismissed
	        function alertDismissed() {
	            // do something
	        }
	     
	     // Beep three times
	        //
	        function playBeep() {
	            navigator.notification.beep(3);
	        }

	        // Vibrate for 2 seconds
	        //
	        function vibrate() {
	            navigator.notification.vibrate(2000);
	        }
	        
	        //contact stuff
	        function addContact(name) {
	        	checkIfContactExists(name);
	        	
	        }
	        
	        function checkIfContactExists(name) {
	        	//http://docs.phonegap.com/en/2.3.0/cordova_contacts_contacts.md.html#Contacts
	        }
	        
	        //barcode scanning
	        function scanBarcode() {
	        	window.plugins.barcodeScanner.scan( function(result) {
	                alert("We got a barcode\n" +
	                          "Result: " + result.text + "\n" +
	                          "Format: " + result.format + "\n" +
	                          "Cancelled: " + result.cancelled);
		            }, function(error) {
		                alert("Scanning failed: " + error);
		            }
	        	);
	        }
	        
	        function encodeBarcode(type, data) {
	        	window.plugins.barcodeScanner.encode(type, data, function(result) {
	                alert("encode success: " + result);
	            }, function(error) {
	                alert("encoding failed: " + error);
	            });
	        }
	        
	        
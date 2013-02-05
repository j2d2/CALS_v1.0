/*
 * UA CALS App Dev
 * PhoneGap / Cordova functions
 * 2013 feb 5 :v1
 */

var menuOpen = false;
var menuDiv = "";
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var encodingType; // sets the format of returned value 


document.addEventListener("deviceready",onDeviceReady,false);


function onDeviceReady() {
	// Cordova is ready to be used!
	console.log("Device Ready");
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    encodingType=navigator.camera.EncodingType;
    //http://www.raymondcamden.com/index.cfm/2012/5/30/Example-of-adding-menu-support-to-a-PhoneGap-Application
    document.addEventListener("menubutton", doMenu, false);
}

// handle menu button click
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

// button onclick: get Location snapshot
function GetCurrentLocation() {
	var options = { enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(onGeolocation, onError, options);
}

// onSuccess Geolocation
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

//button onclick: track Location over time
var watchID = null;
function WatchCurrentLocation() {
	var element = document.getElementById('geowatchlocation');
	//clear current content - button was pressed
	element.innerHTML = '';
    // Update every 3 seconds
    var options = { frequency: 3000, enableHighAccuracy: true };
    watchID = navigator.geolocation.watchPosition(onWatchGeolocation, onError, options);
}

// onSuccess Geolocation Watch
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



// Called when a photo is successfully retrieved - passing base64 encoded image data (memory hog)
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	// console.log(imageData);
	//console.log(JSON.stringify(imageData));
	
	// Get image handle
	var largeImage = document.getElementById('largeImage');
	
	// Unhide image elements
	largeImage.style.display = 'block';
	
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = "data:image/jpeg;base64," + imageData;
	}

// Called when a photo is successfully retrieved - JSON image data - retrieves URI of JPEG @ 100% quality
function onPhotoFileSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	// console.log(imageData);
	console.log(JSON.stringify(imageData));
	
	// Get image handle
	var largeImage = document.getElementById('largeImage');
	
	// Unhide image elements
	largeImage.style.display = 'block';
	
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageData;
}

// Called when a photo is successfully retrieved - using URI location - better memory management
function onPhotoURISuccess(imageURI) {
	// Uncomment to view the image file URI 
	// console.log(imageURI);
	
	// Get image handle
	var largeImage = document.getElementById('largeImage');
	
	// Unhide image elements
	largeImage.style.display = 'block';
	
	// Show the captured photo
	// The inline CSS rules are used to resize the image
	largeImage.src = imageURI;
}

// button onclick: take photo and retrieve base64-encoded string
function capturePhoto() {
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL });
}

// button onclick: take photo and retrieve URI of JPEG @ 100% quality
function capturePhotoWithFile() {
	// Take picture using device camera and retrieve image as base64-encoded string
	var options = {
		quality: 100,
		destinationType : navigator.camera.DestinationType.FILE_URI,
		sourceType: navigator.camera.PictureSourceType.CAMERA,
		encodingType: navigator.camera.EncodingType.JPEG,
	}
	navigator.camera.getPicture(onPhotoFileSuccess, onFail, options);
}

// button onclick: take photo, allow edit, and retrieve base64-encoded string
function capturePhotoEdit() {
	// Take picture using device camera, allow edit, and retrieve image as base64-encoded string  
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
	destinationType: destinationType.DATA_URL });
}

// button onclick: Retrieve image file location from specified source
function getPhoto(source) {
	// Retrieve image file location from specified source
	navigator.camera.getPicture(onPhotoURISuccess, onFail, { 
		quality: 50, 
		destinationType: destinationType.FILE_URI,
		sourceType: source });
}

// onError Callback receives a PositionError object (GeoLocation Functions)
function onError(error) {
	alert('Error code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
}
//onFail Callback receives a message from Photo functions
function onFail(message) {
    alert('Error message: ' + message);
}

// cordova open window = InAppBrowser
function openWindow(url) {
	var ref = window.open(encodeURI(url), '_self', 'location=no');
}

//Show a custom alert
function showAlert(title,message,buttonName) {
	navigator.notification.alert(
		message,		// 'What to have here?'
		alertDismissed,	// callback
		title,			// 'Settings'
		buttonName		// 'Beep me!'
	);
}

// alert dialog dismissed
function alertDismissed() {
	// do something
}

// Show a custom confirmation dialog
function showConfirm(title,message,buttonLabel1,buttonLabel2) {
	navigator.notification.confirm(
		message,  			// 'What Settings should we show?'
		onConfirm,			// callback to invoke with index of button pressed
		title,				// 'Settings'
		buttonLabel1+','+buttonLabel2		// 'Beep,Vibrate'
	);
}
	     
 // process the confirmation dialog result
function onConfirm(buttonIndex) {
	alert('You selected button ' + buttonIndex);
	switch(buttonIndex) {
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

// Beep three times
function playBeep() {
	navigator.notification.beep(3);
}

// Vibrate for 2 seconds
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

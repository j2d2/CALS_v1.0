/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var menuOpen = false;
var menuDiv = "";
            
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.addEventListener("menubutton", doMenu, false);
        app.displayDeviceInfo();
        checkConnection();
        navigator.splashscreen.hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        // jd : let's add nav once ready!
        var navElement = parentElement.querySelector('.navready');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        navElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // display Device info
    displayDeviceInfo: function() {
    	var element = document.getElementById('deviceProperties');

        element.innerHTML = 'Device Name: '     + device.name     + '<br />' + 
                            'Device Cordova: '  + device.cordova  + '<br />' + 
                            'Device Platform: ' + device.platform + '<br />' + 
                            'Device UUID: '     + device.uuid     + '<br />' + 
                            'Device Version: '  + device.version  + '<br />';
        console.log('displayed Device info');
    }
    
    
};

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

//check connection status
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    //alert('Connection type: ' + states[networkState]);
    var element = document.getElementById('deviceConnection');
    element.innerHTML = 'Connection type: ' + states[networkState];
    
    console.log('Connection checked');
}

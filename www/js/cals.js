/**
  * CALS.js - copyright @calsnetlab
  * version 1.0
  */

/*
 * appcache functions
 * ref: http://www.html5rocks.com/en/tutorials/appcache/beginner/
 */

// Check if a new cache is available on page load.
window.addEventListener('load', function (e) {

    window.applicationCache.addEventListener('updateready', function (e) {
        if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
            // Browser downloaded a new app cache.
            // Swap it in and reload the page to get the new version.
            window.applicationCache.swapCache();
            if (confirm('A new version of this site is available. Load it?')) {
                window.location.reload();
            }
        } else {
            // Manifest didn't change. Nothing new to server.
        }
    }, false);

}, false);


/* check the current state of the cache */
function getAppcacheStatus()
{
    var appCache = window.applicationCache;

    switch (appCache.status) {
        case appCache.UNCACHED: // UNCACHED == 0
            return 'UNCACHED';
            break;
        case appCache.IDLE: // IDLE == 1
            return 'IDLE';
            break;
        case appCache.CHECKING: // CHECKING == 2
            return 'CHECKING';
            break;
        case appCache.DOWNLOADING: // DOWNLOADING == 3
            return 'DOWNLOADING';
            break;
        case appCache.UPDATEREADY:  // UPDATEREADY == 4
            return 'UPDATEREADY';
            break;
        case appCache.OBSOLETE: // OBSOLETE == 5
            return 'OBSOLETE';
            break;
        default:
            return 'UKNOWN CACHE STATUS';
            break;
    };
}

function updateAppcache()
{
    var appCache = window.applicationCache;

    appCache.update(); // Attempt to update the user's cache.

    if (appCache.status == window.applicationCache.UPDATEREADY) {
        appCache.swapCache();  // The fetch was successful, swap in the new cache.
    }
    /* 
        Note: Using update() and swapCache() like this does not serve the updated resources to users. 
        This flow simply tells the browser to check for a new manifest, download the updated content it specifies, and repopulate the app cache. 
        Thus, it takes two page reloads to server new content to users, one to pull down a new app cache, and another to refresh the page content. 
    */
}
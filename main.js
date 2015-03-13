require(['breakpointer'], function(breakpointer) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".
    var bp = breakpointer();
    bp.init([320, 480, 640, 720, 960, 1024, 1280, 1400, 1600]);
});
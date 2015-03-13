define('breakpointer', function(){
  
  return function() {
    'use strict';
    var bp = {
      breakpoints: [],
      options: {},

      createEvents: function() {
        console.log(bp.breakpoints);
        bp.breakpoints.forEach(function(breakpoint){
          var enterEvent = document.createEvent('CustomEvent'),
              exitEvent = document.createEvent('CustomEvent');

          enterEvent.initEvent('enterbreakpoint' + breakpoint, true, true);
          exitEvent.initEvent('exitbreakpoint' + breakpoint, true, true);
        });
      },

      /**
       * @param array breakpoints
       *   array of integers that define breakpoint values
       */
      init: function(breakpoints) {
        // Provide some default values
        if (typeof breakpoints != 'object') {
          breakpoints = [320, 480, 640, 720, 960, 1024, 1280];
        }
        bp.breakpoints = breakpoints;
        bp.createEvents();
      },
    };

    return {
      init: bp.init,
    };

  };
});
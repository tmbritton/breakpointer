define('breakpointer', function(){
  
  return function() {
    'use strict';
    var bp = {
      breakpoints: [],
      options: {},
      lastbreakpoint: null,

      addEvent: function(elem, type, callback) {
        if (elem == null || typeof(elem) == 'undefined') return;
        if (elem.addEventListener) {
          elem.addEventListener(type, callback, false);
        } 
        else if ( elem.attachEvent ) {
          elem.attachEvent("on" + type, callback);
        } 
        else {
          elem["on"+type]=callback;
        }
      },

      emitEvent: function(type, breakpoint) {
        var event = document.createEvent('Event');
        event.initEvent(type + breakpoint);
        document.dispatchEvent(event);
      },

      findWhichBreakpoint: function(width) {
        var previousBreakpoint = null,
            found = false,
            currentBreakpoint = '';
        bp.breakpoints.filter(function(value, index){
          if (width >= previousBreakpoint && width < value && found == false) {
            found = true;
            return true;
          }
          if (!found) { 
            previousBreakpoint = value;
          }
        });
        return previousBreakpoint;
      },

      getWindowWidth: function() {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x;
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
        bp.addEvent(window, 'resize', bp.resizeCallback);
      },

      resizeCallback: function() {
        var lastsize = bp.lastsize,
            width = bp.getWindowWidth(),
            breakpoint = bp.findWhichBreakpoint(width);
        
        if (bp.lastbreakpoint !== breakpoint) {
          bp.emitEvent('exit', bp.lastbreakpoint);
          bp.emitEvent('enter', breakpoint);
          bp.lastbreakpoint = breakpoint;
        }
      },
    };

    return {
      init: bp.init,
    };

  };
});
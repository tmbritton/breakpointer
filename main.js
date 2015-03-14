require(['breakpointer'], function(breakpointer) {

  var bp = breakpointer(),
      breakpoints = [320, 480, 640, 720, 960, 1024, 1280, 1400, 1600];
  bp.init(breakpoints);

  breakpoints.forEach(function(bp){
    document.addEventListener('enter' + bp, function(){
      console.log('Entered ' + bp + 'px breakpoint.');
    });
    document.addEventListener('exit' + bp, function(){
      console.log('Exited ' + bp + 'px breakpoint.');
    });
  });
});
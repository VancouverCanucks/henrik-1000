(function($) {
  
  var Scroller;
  
  Scroller = (function() {
    
    function Scroller() {
      this.initUI();
    }
    
    Scroller.prototype.initUI = function() {
      $('.window').each(function(i) {
        asset = $(this).children('.asset')[0];
        $(this).css('background-image', 'url(' + asset.src + ')').css('height', asset.height + 'px');
      });
    }
    
    return Scroller;
    
  })();
  
  app = new Scroller();
  
}(jQuery));
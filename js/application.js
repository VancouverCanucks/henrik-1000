(function($) {
  
  var Scroller;
  
  Scroller = (function() {
    
    function Scroller() {
      window.scroller = this;
      this.initUI();
      this.initSSOR();
      this.scrollListener();
    }
    
    Scroller.prototype.initUI = function() {
      $('.window').each(function(i) {
        asset = $(this).children('.asset')[0];
        $(this).css('background-image', 'url(' + asset.src + ')').css('height', asset.height + 'px');
      });
    }
    
    Scroller.prototype.initSSOR = function() {
      this.ssor = $.superscrollorama();
    }
    
    Scroller.prototype.scrollListener = function() {
      $('.bookmark-marker').waypoint(function() {
        window.scroller[this.getAttribute('callback')]();
      });
    }
    
    Scroller.prototype.toggleBookmark = function() {
      if ($('.bookmark').hasClass('pin')) {
        $('.bookmark').removeClass('pin').addClass('move');
      } else {
        $('.bookmark').removeClass('move').addClass('pin');
      }
    }
    
    return Scroller;
    
  })();
  
  app = new Scroller();
  
}(jQuery));
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
        styles = {
          'background-image': 'url(' + asset.src + ')',
          'height': asset.height + 'px',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'background-position': 'top center'
        };
        $(this).css(styles);
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
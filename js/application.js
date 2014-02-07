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
      $('.trigger').each(function() {
        $(this).waypoint(function() {
          window.scroller[this.getAttribute('callback')]();
        });
      });
    }
    
    Scroller.prototype.toggleBookmark = function() {
      if ($('.bookmark').hasClass('pin')) {
        $('.bookmark').removeClass('pin').addClass('move');
      } else {
        $('.bookmark').removeClass('move').addClass('pin');
      }
    }
    
    Scroller.prototype.toggleNewsClipping = function() {
      $('#p01').fadeToggle();
    }
    
    Scroller.prototype.toggleXO = function() {
      $('#p02').fadeToggle();
    }
    
    Scroller.prototype.toggleSkateIn = function() {
      $('#p03').fadeToggle();
    }
    
    Scroller.prototype.toggleA = function() {
      $('#p04').fadeToggle();
    }
    
    Scroller.prototype.toggleHats = function() {
      $('#p05').fadeToggle();
    }
    
    return Scroller;
    
  })();
  
  app = new Scroller();
  
}(jQuery));
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
      el22 = $('.xo-22');
      el33 = $('.xo-33');
      console.log(el22.css('height'));
      if (el22.css('height') !== '525px') {
        el22.show().animate({height:525},400);
        el33.show().delay(400).animate({height:525},400);
      } else {
        el22.fadeOut(200).css('height', 0);
        el33.fadeOut(200).css('height', 0);
      }
    }
    
    Scroller.prototype.toggleSkateIn = function() {
      el = $('#p03');
      if (el.css('right') === '-686px') {
        el.show().animate({right: '20px'}, 500);
      } else {
        el.show().animate({right: '-686px'}, 500);
      }
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
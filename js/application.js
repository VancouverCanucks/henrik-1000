(function($) {
    
  var Scroller;
  
  Scroller = (function() {
    
    function Scroller() {
      window.scroller = this;
      this.loadData = 0;
      this.loaded = 0;
      this.preload();
    }
    
    Scroller.prototype.preload = function() {
      if (!this.checkForCrapBrowser()) {
        $.ajax({
          url: 'js/manifest.json',
          dataType: 'json'
        }).done(function(json) {
          window.scroller.loadData = json.images;
          bank = document.getElementById('imagebank');
          for (a in window.scroller.loadData) {
            i = document.createElement('img');
            i.src = window.scroller.loadData[a].src;
            i.setAttribute('onload', 'javascript:window.scroller.preloadProgress(\'' + window.scroller.loadData[a].src + '\', \'' + window.scroller.loadData[a].holder + '\', ' + i.height + ');');
            bank.appendChild(i);
          }
        });
      } else { this.initScroller(); }
    }
    
    Scroller.prototype.preloadProgress = function(image, holder, height) {
      styles = {
        'background-image': 'url(' + image + ')',
        'height': height + 'px',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'top center'
      };
      $(holder).css(styles);
      this.loaded++;
      $('.progressbar span').width(parseInt(this.loaded / this.loadData.length) * 100 + '%');
      if (this.loaded >= this.loadData.length) {
        this.initScroller();
      }
    }
    
    Scroller.prototype.initScroller = function() {
      $('.preloader').fadeOut();
      $('.container').fadeIn();
      $('.bookmark').fadeIn();
      this.initUI();
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
      
      this.fit();
      
      $(window).on('resize', function() {
        window.scroller.fit();
      });
    }
    
    Scroller.prototype.fit = function() {
      
    }
    
    Scroller.prototype.checkForCrapBrowser = function() {
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        ieversion = new Number(RegExp.$1);
        return (ieversion < 8) ? true : false;
      }
      return false;
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
      prop = $('#p02');
      el22 = $('.xo-22');
      el33 = $('.xo-33');
      if (el22.css('height') == '0px' || el22.css('height') == '0') {
        el22.show().animate( { height: prop.height() }, 400);
        el33.show().delay(400).animate( { height: prop.height() }, 400);
      } else {
        el22.fadeOut(200).delay(200).css('height', 0);
        el33.fadeOut(200).delay(200).css('height', 0);
      }
    }
    
    Scroller.prototype.toggleSkateIn = function() {
      el = $('#p03');
      if (el.css('right') === '-686px') {
        el.show().animate({ right: '20px' }, 500);
      } else {
        el.animate({ right: '-686px' }, 500).delay(500).fadeOut();
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
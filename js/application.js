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
            i.setAttribute('holder', window.scroller.loadData[a].holder);
            i.setAttribute('onload', 'javascript:window.scroller.preloadProgress(\'' + window.scroller.loadData[a].src + '\', \'' + window.scroller.loadData[a].holder + '\');');
            bank.appendChild(i);
          }
        });
      } else { this.initScroller(); }
    }
    
    Scroller.prototype.preloadProgress = function(image, holder) {
      styles = {
        'background-image': 'url(' + image + ')',
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
    
    Scroller.prototype.setWindowHeights = function() {
      $('#imagebank img').each(function(n) {
        i = $(this);
        $(i.attr('holder')).height(i.height());
      });
      $('#imagebank').hide();
    }
    
    Scroller.prototype.initScroller = function() {
      this.setWindowHeights();
      
      $('.preloader').fadeOut();
      $('.container').fadeIn();
      $('.bookmark').fadeIn();
      
      this.initUI();
      this.initVideos();
      this.scrollListener();
    }
    
    Scroller.prototype.initUI = function() {
      $('.window').each(function(i) {
        $(this).height();
      });
      
      this.fit();
      
      $(window).on('resize', function() {
        window.scroller.fit();
      });
    }
    
    Scroller.prototype.fit = function() {
      $('.vid-window').width($(window).width()).height($(window).width() * 0.56);
    }
    
    Scroller.prototype.checkForCrapBrowser = function() {
      if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
        ieversion = new Number(RegExp.$1);
        return (ieversion < 8) ? true : false;
      }
      return false;
    }
    
    Scroller.prototype.youtubeEmbed = function(key, holder) {
      player = document.createElement('iframe');
      player.src = 'http://www.youtube.com/embed/' + key + '?version=2&controls=1';
      player.className = 'vid-window';
      player.width = $(window).width();
      player.height = $(window).width() * 0.56;
      player.setAttribute('frameborder', 0);
      document.getElementById(holder).appendChild(player);
    }
    
    Scroller.prototype.initVideos = function() {
      this.youtubeEmbed('3-tXCaeH_WU', 'vid1');
      this.youtubeEmbed('3-tXCaeH_WU', 'vid2');
      this.youtubeEmbed('Bq-aOBsr3hc', 'vid3');
    }
    
    Scroller.prototype.scrollListener = function() {
      $('.trigger').each(function() {
        $(this).waypoint(function() {
          window.scroller[this.getAttribute('callback')]();
        });
      });
    }
    
    Scroller.prototype.toggleYoungBookmark = function() {
      if ($('.bookmark.young').hasClass('pin')) {
        $('.bookmark.young').removeClass('pin').addClass('move');
      } else {
        $('.bookmark.young').removeClass('move').addClass('pin');
      }
    }
    
    Scroller.prototype.parkYoungBookmark = function() {
      if ($('.bookmark.young').hasClass('park')) {
        $('.bookmark.young').removeClass('park').addClass('move');
      } else {
        $('.bookmark.young').removeClass('move').addClass('park');
      }
    }
    
    Scroller.prototype.toggleOldBookmark = function() {
      if ($('.bookmark.old').hasClass('pin')) {
        $('.bookmark.old').removeClass('pin').addClass('move');
      } else {
        $('.bookmark.old').removeClass('move').addClass('pin');
      }
    }
    
    Scroller.prototype.parkOldBookmark = function() {
      if ($('.bookmark.old').hasClass('park')) {
        $('.bookmark.old').removeClass('park').addClass('move');
      } else {
        $('.bookmark.old').removeClass('move').addClass('park');
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
    
    Scroller.prototype.firstGoal = function() {
      
    }
    
    Scroller.prototype.markus = function() {
      
    }
    
    Scroller.prototype.cutout = function() {
      
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
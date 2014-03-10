(function($) {
    
  var Scroller;
  
  Scroller = (function() {
    
    function Scroller() {
      window.scroller = this;
      this.loadData = 0;
      this.loaded = 0;
      this.progressbar = progressJs();
      this.skrollr = null;
      this.preload();
    }
    
    Scroller.prototype.preload = function() {
      if (!this.checkForCrapBrowser()) {
        this.progressbar.start();
        $.ajax({
          url: 'js/manifest.json',
          dataType: 'json'
        }).done(function(json) {
          
          window.scroller.bgs = json.bgs;
          window.scroller.props = json.props;
          window.scroller.triggers = json.triggers;
          
          bank = document.getElementById('imagebank');
          
          for (a in window.scroller.bgs) {
            i = document.createElement('img');
            i.src = window.scroller.bgs[a].src;
            i.setAttribute('holder', window.scroller.bgs[a].holder);
            i.setAttribute('onload', 'javascript:window.scroller.preloadBGProgress(\'' + window.scroller.bgs[a].src + '\', \'' + window.scroller.bgs[a].holder + '\');');
            bank.appendChild(i);
          }
          
          for (a in window.scroller.props) {
            i = document.createElement('img');
            i.src = window.scroller.props[a].src;
            i.setAttribute('holder', window.scroller.props[a].holder);
            i.setAttribute('onload', 'javascript:window.scroller.preloadPropProgress(\'' + window.scroller.props[a].src + '\', \'' + window.scroller.props[a].holder + '\');');
            bank.appendChild(i);
          }
          
          if ($(window).width() >= 1520) {
            triggerset = 1520;
          } else if ($(window).width() >= 980 && $(window).width() < 1520) {
            triggerset = 980;
          } else if ($(window).width() >= 768 && $(window).width() < 980) {
            triggerset = 768;
          } else if ($(window).width() >= 420 && $(window).width() < 768) {
            triggerset = 420;
          } else if ($(window).width() >= 0 && $(window).width() < 420) {
            triggerset = 0;
          } else {
            triggerset = 1520;
          }

          for (a in window.scroller.triggers[triggerset]) {
            item = window.scroller.triggers[triggerset][a];
            for (t in item.params) {
              $(item.target).attr(t, item.params[t]);
            }
          }
          
        });
      } else {
        this.initScroller();
      }
    }
    
    Scroller.prototype.preloadBGProgress = function(image, holder) {
      styles = {
        'background-image': 'url(' + image + ')',
        'background-repeat': 'no-repeat',
        'background-size': 'cover',
        'background-position': 'top center'
      };
      $(holder).css(styles);
      this.loaded++;
      this.progressbar.set(parseInt(this.loaded / (this.bgs.length + this.props.length)) * 100);
      if (this.loaded >= (this.bgs.length + this.props.length)) {
        this.initScroller();
      }
    }
    
    Scroller.prototype.preloadPropProgress = function(image, holder) {
      i = document.createElement('img');
      i.src = image;
      document.getElementById(holder).appendChild(i);
      this.loaded++;
      this.progressbar.set(parseInt(this.loaded / (this.bgs.length + this.props.length)) * 100);
      if (this.loaded >= (this.bgs.length + this.props.length)) {
        this.initScroller();
      }
    }
    
    Scroller.prototype.setWindowHeights = function() {
      /*
      $('#imagebank img').each(function(n) {
        i = $(this);
        $(i.attr('holder')).height(i.height());
      });*/
      bank = document.getElementById('imagebank');
      bank.parentNode.removeChild(bank);
    }
    
    Scroller.prototype.initScroller = function() {
      this.progressbar.end();
      this.setWindowHeights();
      
      $('.preloader').fadeOut();
      $('.container').fadeIn();
      $('.bookmark').fadeIn();
      
      this.initUI();
    }
    
    Scroller.prototype.initUI = function() {
      $('.window').each(function(i) {
        $(this).height();
      });
      
      $(window).on('resize', function() {
        
      });
      
      this.skrollr = skrollr.init();
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
      player.src = 'http://www.youtube.com/embed/' + key + '?version=2&controls=1&autoplay=1';
      player.className = 'vid-window';
      player.width = 853;
      player.height = 480;
      player.setAttribute('frameborder', 0);
      document.getElementById(holder).appendChild(player);
    }
    
    Scroller.prototype.modalVideo = function(video, headline) {
      this.youtubeEmbed(video, 'modal-content');
      $('.modal h2').html(headline);
      $('.closebtn').on('click', function() {
        window.scroller.modalClose();
      });
      $('.modal').fadeIn();
    }
    
    Scroller.prototype.modalClose = function() {
      $('.modal h2').html('');
      $('#modal-content').html('');
      $('.modal').fadeOut();
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
    
    Scroller.prototype.slideToggle = function(target) {
      el = $('#' + target);
      if (el.css('right') === '-686px') {
        el.show().animate({ right: '20px' }, 500);
      } else {
        el.animate({ right: '-686px' }, 500).delay(500).fadeOut();
      }
    }
    
    Scroller.prototype.fadeToggle = function(el) {
      $('#' + el).fadeToggle();
    }
    
    return Scroller;
    
  })();
  
  app = new Scroller();
  
}(jQuery));
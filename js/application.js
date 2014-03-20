(function($) {
    
  var Scroller;
  
  Scroller = (function() {
    
    function Scroller() {
      window.scroller = this;
      this.windowWidth = 0;
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
          
          window.scroller.videoTag('shift-blue', 'The Shift', '3-tXCaeH_WU', 'vid1');
          window.scroller.videoTag('april-blue', 'Record Breaker', 'Bq-aOBsr3hc', 'vid3');
          
          if (!window.scroller.mobileCheck() && $(window).width() > 767) {
            $('.bookmark').show();
            window.scroller.addSkrollrMatter();
          } else {
            window.scroller.loaded = window.scroller.props.length;
          }
          
        });
      } else {
        this.initScroller();
      }
    }
    
    Scroller.prototype.preloadBGProgress = function(image, holder) {
      styles = {
        'background': '#003c7c url(' + image + ')',
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
    
    Scroller.prototype.removeBank = function() {
      bank = document.getElementById('imagebank');
      bank.parentNode.removeChild(bank);
    }
    
    Scroller.prototype.setWindowHeights = function() { }
    
    Scroller.prototype.initScroller = function() {
      this.progressbar.end();
      this.removeBank();
      
      $('.preloader').fadeOut();
      $('.container').fadeIn();
      
      this.initUI();
    }
    
    Scroller.prototype.addSkrollrMatter = function() {
      
      if ($(window).width() >= 1520) {
        this.windowWidth = 1520;
      } else if ($(window).width() >= 980 && $(window).width() < 1520) {
        this.windowWidth = 980;
      } else if ($(window).width() >= 768 && $(window).width() < 980) {
        this.windowWidth = 768;
      } else if ($(window).width() < 768) {
        this.windowWidth = 0;
      } else {
        this.windowWidth = 1520;
      }

      for (a in this.triggers[this.windowWidth]) {
        item = this.triggers[this.windowWidth][a];
        target = $(item.target);
        
        if (target.attr('frontmatter')) {
          oldFM = target.attr('frontmatter').split('|');
        
          for (fm in oldFM) {
            target.removeAttr(oldFM[fm]);
          }
        }
        
        frontmatter = '';
        for (t in item.params) {
          target.attr(t, item.params[t]);
          frontmatter += '|' + t;
        }
        target.attr('frontmatter', frontmatter);
      }
      
      if (this.skrollr !== null) { this.skrollr.refresh(); }
    }
    
    Scroller.prototype.initUI = function() {
      $('.window').each(function(i) {
        $(this).height();
      });
      
      $(window).on('resize', function() {
        window.scroller.addSkrollrMatter();
      });
      
      $('.facebook-btn').on('click', function() {
        window.scroller.facebook();
      });
      
      $('.twitter-btn').on('click', function() {
        window.scroller.twitter();
      });
      
      if (!window.scroller.mobileCheck()) { this.skrollr = skrollr.init(); }
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
      player.width = $(window).width();
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
    
    Scroller.prototype.videoTag = function(name, title, ytkey, holder) {
      if (!window.scroller.mobileCheck()) {
        v = document.createElement('video');
        mp4 = document.createElement('source');
        webm = document.createElement('source');
        v.setAttribute('loop', true);
        v.setAttribute('autoplay', true);
        v.setAttribute('poster', 'img/videobgs/' + name + '.jpg');
        mp4.setAttribute('src', 'img/videobgs/' + name + '.mp4');
        mp4.setAttribute('type', 'video/mp4');
        webm.setAttribute('src', 'img/videobgs/' + name + '.webm');
        webm.setAttribute('type', 'video/webm');
        v.appendChild(mp4);
        v.appendChild(webm);
        document.getElementById(holder).appendChild(v);
      } else {
        v = document.createElement('div');
        v.className = 'window';
        v.setAttribute('style', 'background: #003c7c url(\'img/videobgs/' + name + '.jpg\'); background-repeat: no-repeat; background-size: cover; background-position: top center;');
      }
      a = document.createElement('a');
      a.href = 'javascript:scroller.modalVideo(\'' + ytkey + '\', \'' + title + '\');';
      btn = document.createElement('img');
      btn.src = 'img/ui/play-btn.png';
      a.appendChild(btn);
      document.getElementById(holder).appendChild(v);
      document.getElementById(holder).appendChild(a);
    }
    
    Scroller.prototype.mobileCheck = function() {
      return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    }
    
    Scroller.prototype.facebook = function() {
      this.sharePop('http://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Fhenrik1000.canucks.com');
    }
    
    Scroller.prototype.twitter = function() {
      this.sharePop('https://twitter.com/intent/tweet?text=A+look+back+at+%23henrik1000+-+Check+it+out+at+&url=http%3A%2F%2Fhenrik1000.canucks.com');
    }
    
    Scroller.prototype.sharePop = function(url) {
      this.popup = window.open(url, '#henrik1000', 'menubar=0,scrollbars=0,location=0,width=600,height=400');
    }
    
    return Scroller;
    
  })();
  
  app = new Scroller();
  
}(jQuery));
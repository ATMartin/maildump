$(function() {

  var SimpleTimer = function(start, end) {
    this.length = end - start;
    this.remaining = this.length;
    this.timerHandle = null;
    this.active = true;
    this.action = null;
  }

  SimpleTimer.prototype.start = function() {
    _this = this
    this.timerHandle = setInterval(function() {
      if (_this.remaining <= 0) { _this.stop(); }
      if (_this.action) {
        _this.action.call(_this, _this.remaining);
      }
      _this.remaining--;
    }, 1000);
  }

  SimpleTimer.prototype.stop = function() {
    window.clearInterval(this.timerHandle);
    this.active = false;
  }

  SimpleTimer.prototype.tick = function(fxn) {
    this.action = fxn;
  }

  SimpleTimer.prototype.toString = function() {
    var minutes = Math.floor(this.remaining / 60);
    var seconds = Math.floor(this.remaining % 60);
    minutes = minutes > 9 ? minutes : '0' + minutes;
    seconds = seconds > 9 ? seconds : '0' + seconds;
    return minutes + ":" + seconds;
  }

  var timeToDie = function() {
    // Look for our cookie token & return default if not found.
    var cookie = Date.now() + 120000;
    document.cookie.split(' ').forEach(function(kvp) {
      console.log(kvp);
      if (kvp.split('=')[0] == "maildump_dies_at") {
        console.log(kvp.split('=')[1].slice(0, -1));
        cookie = kvp.split('=')[1]; 
      }
    });
    // 2-minute default
    console.log(Date.now());
    console.log(cookie);
    return cookie;
  }  
  console.log(timeToDie());

  var timer = new SimpleTimer(Date.now().toString().slice(0, -3), timeToDie());

  timer.tick(function(remaining) {
    var $clock = $('.inbox-timer');
    $clock.text(this.toString());  
  });
  timer.start();
  
});

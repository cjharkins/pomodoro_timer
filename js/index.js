$(document).ready(function() {
  var start           = document.getElementById('start'),
      started         = false,
      stop            = document.getElementById('stop'),
      inc             = document.getElementById('inc'),
      dec             = document.getElementById('dec'),
      btn_work        = document.getElementById('work'),
      btn_break       = document.getElementById('break'),
      display_work    = document.getElementById('display_work'),
      display_break   = document.getElementById('display_break'),
      blocks_complete = document.getElementById('blocks_complete'),
      m               = parseInt(display_work.getAttribute('data-value')),
      breakm          = parseInt(display_break.getAttribute('data-value')),
      display_timer   = document.getElementById('display_time'),
      work            = true,
      selected        = true,
      timer           = null,
      break_timer     = null,
      isPaused        = false,
      divider         = document.getElementById('divider'),
      breakTime       = breakm,
      workTime        = m,
      rounds          = 3,
      blocks_to_do    = 0,
      timeOut         = 0,
      timeCount       = 0,
      duration        = 0, 
      minutes         = duration,
      seconds         = duration,
      elem            = document.getElementById("progress-line"),
      length          = Math.floor(elem.getTotalLength()),
      increment       = length / 60;
  
  function playChime() {
    //audio courtesy of soundbible.com
    const audioFile_chime = new Audio('http://soundbible.com/grab.php?id=1758&type=mp3');
    audioFile_chime.play();
  }
    //http://audiosoundclips.com/royalty-copyright-free-music-cc-3-volume-1/
    //“Certain Death” 
    //Music: Rock License : Commons 3.0 / Artist : “Brad Sucks“
  myAudio = new Audio('http://audiosoundclips.com/wp-content/uploads/2014/01/Certain-Death-by-Brad-Sucks.mp3'); 
myAudio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
  
  var paused = false;
  $('#music-on').hide();
  $(display_timer).val(m + ':00');
  $(stop).hide();
  $(divider).append('<div id="toggle"></div>');
  $(btn_work).css('color','#E8674D');
  $(display_work).css('color','#E8674D');
  
  $('#music-on').click(function(){
    $(this).hide();
    $('#music-off').show();
    myAudio.play();
  });
  $('#music-off').click(function(){
    $(this).hide();
    $('#music-on').show();
    myAudio.pause();
  });
  $(btn_work).click(function(){
      selected = true;
      $('#toggle').css('margin-left', '0px');
      $(btn_work).css('color','#E8674D');
      $(display_work).css('color','#E8674D');
      $(btn_break).css('color','gray');
      $(display_break).css('color','gray');
      console.log(selected);
  });
  
  $(btn_break).click(function(){
      selected = false;
      $('#toggle').css('margin-left','65px');
      $(btn_break).css('color','#E8674D');
      $(btn_work).css('color','gray');
      $(display_break).css('color','#E8674D');
      $(display_work).css('color','gray');
      console.log(selected);
  });
  
  $(inc).click(function(){
    if (!selected) {
      breakm = breakm + 1;
      display_time();
      return breakm;
    } else {
      m = m + 1;
      display_time();
      return m;
   }
  });
  
  $(dec).click(function(){
    if (!selected) {
      breakm = breakm - 1;
      display_time();
      return breakm;
    } else {
      m = m - 1;
      display_time();
      return m;
    }
  });
  
  function display_time() {
      $(display_timer).val(m + ':00');
      $(display_break).val(breakm + ':00'); 
      $(display_work).val(m + ':00'); 
  }
  
  $(start).click(function(){
    if (timer !== null) {
      return;
    }
    playChime();
    myAudio.play();
    $('#stars').css('animation','pulse 9s forwards infinite');
    $('#disc').css({'animation': 'rotation 180s backwards infinite', 'transform-origin':'50% 50%' });
    $('#cow').css({'transform': 'translateX(-950px)','animation': 'rotation 60s 4 reverse'});
    $('#rocket').css('animation','shake .5s linear infinite');
    $(start).hide();
    $(stop).show();  
    duration = m * 60;
    increment = length / (m*60);
    timeOut = (((m*60) + (breakm*60)) + 2)*rounds;
    timer = setInterval(function () {
      $(display_timer).css({'color':'white','font-size':'4.3em'});
      $(elem).css({ 'stroke-dashoffset': + length + 'px', 'stroke-dasharray':'628px'});
      minutes = parseInt(duration / 60,10);
      seconds = parseInt(duration % 60,10);
      length-=increment;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      $(display_timer).val(minutes + ':' + seconds);
      if (timeCount === timeOut) {
        clearInterval(timer);
      }
      if (--duration < 0) {
        if (work) {
          playChime();
          length = Math.floor(elem.getTotalLength());
          work = false;
          duration = breakm*60;
        } else {
          playChime();
          length = Math.floor(elem.getTotalLength());
          blocks_to_do = blocks_to_do + 1;
          display_blocks(blocks_to_do);
          work = true;
          duration = m*60;
        }
      }
    }, 1000);
  });
  
  $(stop).click(function(){
    duration = m*60;
    timeOut = 0;
    increment = Math.floor(length / 60 + 1);
    timeCount = 0;
    $(display_timer).val(m + ':00');
    clearInterval(timer);
    $(elem).css({ 'stroke-dashoffset': + 0 + 'px', 'stroke-dasharray':'0'});
    $(display_timer).css({'color':'gray','font-size':'4.3em'});
    $('#disc').css('animation-play-state','paused');
    $('#stars').css('animation-play-state','paused');
    $('#rocket').css('animation-play-state','paused');
    $('#cow').css('animation-play-state', 'paused');
    $(stop).hide();
    $(start).show();
    myAudio.pause();
    myAudio.currentTime = 0;
    timer = null;
    blocks_to_do = 0;
    display_blocks(blocks_to_do);
  });
  
  function display_blocks(n) {
    $(blocks_complete).text(n);
  }
  
  display_blocks(blocks_to_do);  
});
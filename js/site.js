/* Kaki:Dan — site interactions (unwrap scroll effect), extracted from the original single-file page */
(function(){
    var flap = document.getElementById('wrapFlap');
    var hero = document.querySelector('.hero');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced || !flap || !hero){
      if(flap){ flap.style.opacity = 0; flap.style.transform = 'translateX(60%)'; }
      return;
    }
    function onScroll(){
      var rect = hero.getBoundingClientRect();
      var total = hero.offsetHeight * 0.75;
      var scrolled = Math.min(Math.max(-rect.top, 0), total);
      var t = scrolled / total; // 0 -> 1
      flap.style.transform = 'translateX(' + (t*70) + '%) rotate(' + (t*4) + 'deg)';
      flap.style.opacity = String(1 - t*0.95);
      window.requestAnimationFrame_pending = false;
    }
    function requestTick(){
      if(!window.requestAnimationFrame_pending){
        window.requestAnimationFrame_pending = true;
        window.requestAnimationFrame(onScroll);
      }
    }
    window.addEventListener('scroll', requestTick, {passive:true});
    onScroll();
  })();

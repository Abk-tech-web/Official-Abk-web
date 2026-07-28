/* ==========================================================================
   ABK Tech NG — Circuit Background
   Animated node/line canvas echoing the brand's circuit motif.
   ========================================================================== */

(function(){
  const canvas = document.getElementById('circuit-bg');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, nodes = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function initNodes(){
    nodes = [];
    const count = Math.min(46, Math.floor((w*h)/38000));
    for(let i=0;i<count;i++){
      nodes.push({
        x: Math.random()*w, y: Math.random()*h,
        vx: (Math.random()-0.5)*0.15, vy: (Math.random()-0.5)*0.15,
        r: Math.random()*1.6+0.6
      });
    }
  }
  initNodes();
  window.addEventListener('resize', initNodes);

  function draw(){
    ctx.clearRect(0,0,w,h);
    // connections
    for(let i=0;i<nodes.length;i++){
      for(let j=i+1;j<nodes.length;j++){
        const a = nodes[i], b = nodes[j];
        const dx = a.x-b.x, dy = a.y-b.y;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 160){
          ctx.strokeStyle = `rgba(55,216,255,${(1-dist/160)*0.12})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(55,216,255,0.5)';
      ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
      ctx.fill();
      if(!reduceMotion){
        n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>w) n.vx*=-1;
        if(n.y<0||n.y>h) n.vy*=-1;
      }
    });

    if(!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
})();

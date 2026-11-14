import { gsap } from 'gsap';

// Generated village art stays fixed; GSAP animates the independent details.
export function createWinterScene(scene, effects, snow, enabled = true) {
  const root = document.documentElement;
  const backdrop = scene.getContext('2d'), detail = effects.getContext('2d'), snowfall = snow.getContext('2d');
  let width = 0, height = 0, flakes = [], moving = enabled, disposed = false;
  const flight = { progress: .78 }, warmth = { alpha: .65 };
  const stars = Array.from({ length: 14 }, () => ({ alpha: .5 }));
  const lights = Array.from({ length: 56 }, () => ({ alpha: .7 }));
  const smoke = Array.from({ length: 25 }, (_, i) => ({ progress: i % 5 / 5 }));
  const tweens = [], basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const art = { light: new Image(), dark: new Image() };
  const darkMode = () => root.dataset.theme === 'dark';
  const houses = [
    { window: [.15,.82], chimney: [.133,.694] }, { window: [.32,.82], chimney: [.346,.732] },
    { window: [.469,.753], chimney: [.438,.703] }, { window: [.732,.817], chimney: [.756,.719] },
    { window: [.919,.817], chimney: [.911,.702] },
  ];
  const trees = [[.04,.82],[.085,.80],[.216,.80],[.396,.80],[.546,.82],[.636,.84],[.813,.82],[.975,.81]];
  function stage() {
    const w = Math.max(width, 960), h = w / 2;
    return { x: (width-w)/2, y: height-(width<=900 ? 76 : 0)-h, w, h };
  }
  function point(x, y) { const box = stage(); return { x: box.x+box.w*x, y: box.y+box.h*y }; }
  function drawBackdrop() {
    if (disposed) return;
    const dark = darkMode(), image = art[dark ? 'dark' : 'light'];
    backdrop.clearRect(0,0,width,height);
    backdrop.fillStyle = dark ? '#191a1d' : '#eef1f4'; backdrop.fillRect(0,0,width,height);
    if (image.complete && image.naturalWidth) {
      const box = stage();
      // Remove the paper tone without introducing a sky gradient.
      backdrop.globalCompositeOperation = dark ? 'lighten' : 'darken';
      backdrop.drawImage(image,box.x,box.y,box.w,box.h);
      backdrop.globalCompositeOperation = 'source-over';
    }
    backdrop.fillStyle = dark ? '#e5bd62' : '#ba8a1e'; backdrop.font = '52px Georgia, serif';
    backdrop.fillText('☾',width<650 ? 20 : 55,width<650 ? 70 : 106);
  }
  Object.entries(art).forEach(([theme,image]) => {
    image.onload = () => { if (!disposed) { drawBackdrop(); drawDetails(); } };
    image.src = `${basePath}/images/christmas/village-${theme}.png`;
  });
  function resize() {
    const rect = scene.getBoundingClientRect(); width = rect.width; height = rect.height;
    const dpr = Math.min(devicePixelRatio || 1,2);
    [scene,effects,snow].forEach(canvas => {
      canvas.width = Math.round(width*dpr); canvas.height = Math.round(height*dpr);
      canvas.getContext('2d').setTransform(dpr,0,0,dpr,0,0);
    });
    flakes = Array.from({ length: width<650 ? 70 : 175 },(_,i) => ({
      x: Math.random()*width, y: Math.random()*height, size: .9+Math.random()*3.1,
      speed: 22+Math.random()*48, phase: Math.random()*Math.PI*2, alpha: .35+Math.random()*.5, crystal: i%9===0,
    }));
    drawBackdrop(); drawDetails(); drawSnow(0);
  }
  function drawSnow(delta) {
    snowfall.clearRect(0,0,width,height); const dark = darkMode();
    flakes.forEach(f => {
      if (delta) {
        f.y += f.speed*delta; f.x += Math.sin(f.phase+f.y*.009)*13*delta;
        if (f.y>height+10) { f.y=-10; f.x=Math.random()*width; }
        if (f.x< -10) f.x=width+10; if (f.x>width+10) f.x=-10;
      }
      snowfall.fillStyle = dark ? `rgba(247,250,255,${f.alpha*.8})` : `rgba(117,147,171,${f.alpha*.55})`;
      snowfall.strokeStyle = dark ? `rgba(255,255,255,${f.alpha*.9})` : `rgba(63,99,127,${f.alpha*.65})`;
      snowfall.lineWidth=.7;
      if (f.crystal) {
        for (let angle=0; angle<Math.PI; angle+=Math.PI/3) {
          const dx=Math.cos(angle)*f.size*1.5,dy=Math.sin(angle)*f.size*1.5;
          snowfall.beginPath(); snowfall.moveTo(f.x-dx,f.y-dy); snowfall.lineTo(f.x+dx,f.y+dy); snowfall.stroke();
        }
      } else { snowfall.beginPath(); snowfall.arc(f.x,f.y,f.size,0,Math.PI*2); snowfall.fill(); if (!dark) snowfall.stroke(); }
    });
  }
  function glow(x,y,r,color,alpha) {
    const halo=detail.createRadialGradient(x,y,0,x,y,r);
    halo.addColorStop(0,`rgba(${color},${alpha})`); halo.addColorStop(1,`rgba(${color},0)`);
    detail.fillStyle=halo; detail.fillRect(x-r,y-r,r*2,r*2);
  }
  function drawDetails() {
    detail.clearRect(0,0,width,height); const dark=darkMode(),box=stage();
    stars.forEach((star,i) => {
      const x=35+i*(width-70)/13,y=28+(i*79)%160;
      detail.globalAlpha=star.alpha; detail.strokeStyle=dark ? '#e7c56e' : '#b48b27'; detail.lineWidth=1;
      detail.beginPath(); detail.moveTo(x-3,y); detail.lineTo(x+3,y); detail.moveTo(x,y-3); detail.lineTo(x,y+3); detail.stroke();
    });
    detail.globalAlpha=1;
    trees.forEach(([tx,ty],i) => {
      for(let row=0;row<7;row++) {
        const p=point(tx+Math.sin(row*2.3)*.008,ty-row*.017),alpha=lights[i*7+row].alpha;
        glow(p.x,p.y,7,row%2 ? '236,75,77' : '240,190,76',alpha*(dark ? .7 : .4));
      }
    });
    houses.forEach((house,index) => {
      const window=point(...house.window),chimney=point(...house.chimney);
      glow(window.x,window.y,Math.max(10,box.w*.012),'255,179,49',warmth.alpha*(dark ? .27 : .16));
      for(let i=0;i<5;i++) {
        const p=smoke[index*5+i].progress,x=chimney.x+Math.sin(p*5+index)*11+p*22,y=chimney.y-p*Math.min(65,box.w*.055);
        detail.fillStyle=dark ? `rgba(204,211,217,${Math.sin(p*Math.PI)*.3})` : `rgba(89,107,119,${Math.sin(p*Math.PI)*.3})`;
        detail.font=`${9+p*8}px monospace`; detail.fillText(i%2 ? ')' : '(',x,y);
      }
    });
    const x=-300+flight.progress*(width+620),y=(width<650 ? 110 : 78)+Math.sin(flight.progress*Math.PI*2)*15;
    detail.save(); detail.translate(x,y); const scale=width<650 ? .65 : .9; detail.scale(scale,scale);
    detail.strokeStyle=dark ? '#ff7e82' : '#ce2437'; detail.lineWidth=1.8; detail.setLineDash([3,3]);
    detail.beginPath(); detail.moveTo(0,20); detail.lineTo(68,20); detail.lineTo(58,40); detail.lineTo(12,40); detail.closePath(); detail.stroke();
    detail.beginPath(); detail.moveTo(-5,46); detail.quadraticCurveTo(35,58,78,41); detail.stroke();
    detail.beginPath(); detail.arc(32,4,10,0,Math.PI*2); detail.stroke();
    detail.beginPath(); detail.moveTo(22,-2); detail.lineTo(34,-16); detail.lineTo(43,-2); detail.stroke();
    for(let i=0;i<3;i++) {
      const dx=100+i*57,dy=14-i*10;
      detail.beginPath(); detail.ellipse(dx,dy,15,7,-.2,0,Math.PI*2); detail.stroke();
      detail.beginPath(); detail.moveTo(dx+12,dy-1); detail.lineTo(dx+22,dy-16); detail.lineTo(dx+29,dy-14);
      detail.moveTo(dx+22,dy-16); detail.lineTo(dx+19,dy-27); detail.moveTo(dx+21,dy-21); detail.lineTo(dx+27,dy-25);
      detail.moveTo(dx-8,dy+5); detail.lineTo(dx-15,dy+18); detail.lineTo(dx-8,dy+18);
      detail.moveTo(dx+8,dy+5); detail.lineTo(dx+16,dy+14); detail.stroke();
    }
    detail.beginPath(); detail.moveTo(64,26); detail.bezierCurveTo(120,0,170,10,245,-6); detail.stroke(); detail.restore();
  }
  function render(_time,deltaTime=16) { drawDetails(); drawSnow(Math.min(deltaTime/1000,.05)); }
  tweens.push(gsap.to(flight,{progress:1.78,duration:30,repeat:-1,ease:'none',modifiers:{progress:v=>Number(v)%1}}));
  tweens.push(gsap.to(warmth,{alpha:1,duration:2.3,yoyo:true,repeat:-1,ease:'sine.inOut'}));
  stars.forEach((star,i)=>tweens.push(gsap.to(star,{alpha:.1,duration:1.3+i%4*.6,delay:-i*.2,yoyo:true,repeat:-1,ease:'sine.inOut'})));
  lights.forEach((light,i)=>tweens.push(gsap.to(light,{alpha:.08,duration:.8+i%7*.19,delay:-i*.17,yoyo:true,repeat:-1,ease:'sine.inOut'})));
  smoke.forEach((wisp,i)=>tweens.push(gsap.to(wisp,{progress:1+i%5/5,duration:4.8,repeat:-1,ease:'none',modifiers:{progress:v=>Number(v)%1}})));
  function setMoving(value) {
    moving=value; const running=moving&&!document.hidden;
    gsap.ticker.remove(render); tweens.forEach(tween=>tween.paused(!running));
    if(running) gsap.ticker.add(render); else { drawDetails(); drawSnow(0); }
  }
  const visibility=()=>setMoving(moving),themeChange=()=>{drawBackdrop();drawDetails();drawSnow(0);};
  const observer=new MutationObserver(themeChange); observer.observe(root,{attributes:true,attributeFilter:['data-theme']});
  window.addEventListener('resize',resize,{passive:true}); document.addEventListener('visibilitychange',visibility);
  resize(); setMoving(moving);
  return {setMoving,destroy(){
    disposed=true; gsap.ticker.remove(render); tweens.forEach(tween=>tween.kill()); observer.disconnect();
    Object.values(art).forEach(image=>{image.onload=null;}); window.removeEventListener('resize',resize); document.removeEventListener('visibilitychange',visibility);
  }};
}

/* Cursor Glow */
const glow = document.querySelector(".cursor-glow");
document.addEventListener("mousemove", e=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* Particle Background */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i=0;i<80;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*2,
    d:Math.random()*1
  });
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#7c5cff";
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.y+=p.d;
    if(p.y>canvas.height)p.y=0;
  });
  requestAnimationFrame(draw);
}
draw();

/* Tilt Cards */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove", e=>{
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height/2)/15;
    const rotateY = (x - rect.width/2)/15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", ()=>{
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});

/* Skill Bars */
window.addEventListener("scroll", ()=>{
  document.querySelectorAll(".progress").forEach(bar=>{
    if(bar.getBoundingClientRect().top < window.innerHeight - 100){
      bar.style.width = bar.getAttribute("data-width");
    }
  });
});

/* Counters */
document.querySelectorAll(".counter").forEach(counter=>{
  const update = ()=>{
    const target = +counter.dataset.target;
    const count = +counter.innerText;
    const inc = target/100;

    if(count < target){
      counter.innerText = Math.ceil(count + inc);
      setTimeout(update,20);
    } else {
      counter.innerText = target;
    }
  };

  window.addEventListener("scroll", ()=>{
    if(counter.getBoundingClientRect().top < window.innerHeight - 100){
      update();
    }
  },{once:true});
});

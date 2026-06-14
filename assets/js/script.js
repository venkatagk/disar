const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
if(hamburger&&mobileMenu){hamburger.addEventListener('click',()=>mobileMenu.classList.toggle('open'));}
function closeMenu(){if(mobileMenu)mobileMenu.classList.remove('open')}
window.closeMenu=closeMenu;
const slides=[...document.querySelectorAll('.hero-slide')];
const dots=[...document.querySelectorAll('.hero-dot')];
const caption=document.getElementById('heroCaption');
let current=0,timer;
function updateCaption(){
  if(!caption||!slides[current])return;
  const title=slides[current].dataset.title||'';
  const text=slides[current].dataset.text||'';
  caption.innerHTML=`<strong>${title}</strong><p>${text}</p>`;
}
function showSlide(n){
  if(!slides.length)return;
  slides[current].classList.remove('active');
  dots[current]?.classList.remove('active');
  current=n;
  slides[current].classList.add('active');
  dots[current]?.classList.add('active');
  updateCaption();
}
function nextSlide(){showSlide((current+1)%slides.length)}
function startSlides(){if(slides.length>1)timer=setInterval(nextSlide,4500)}
window.goHeroSlide=(n)=>{clearInterval(timer);showSlide(n);startSlides()};
updateCaption();
startSlides();
const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const scrollNav=document.getElementById('scrollNav');
window.addEventListener('scroll',()=>scrollNav?.classList.toggle('visible',window.scrollY>300),{passive:true});

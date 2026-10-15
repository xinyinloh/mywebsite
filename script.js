// Shared: nav, reveal, carousel, modal
document.querySelectorAll('.reveal').forEach(el=>{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});
  io.observe(el);
});

// Carousel (projects page + home preview uses same IDs if present)
(function(){
  const slidesEl=document.getElementById('slides');
  const dotsEl=document.getElementById('dots');
  if(!slidesEl) return;
  const total=slidesEl.children.length;
  let idx=0,timer;
  for(let i=0;i<total;i++){
    const d=document.createElement('button');
    d.className='dot'+(i===0?' active':'');
    d.setAttribute('aria-label','Go to slide '+(i+1));
    d.onclick=()=>go(i,true);
    dotsEl.appendChild(d);
  }
  const dots=[...dotsEl.children];
  function go(i,manual){
    idx=(i+total)%total;
    slidesEl.style.transform=`translateX(-${idx*100}%)`;
    dots.forEach((d,j)=>d.classList.toggle('active',j===idx));
    const cap=document.getElementById('slideCount');
    if(cap) cap.textContent=(idx+1)+' / '+total;
    if(manual) restart();
  }
  function restart(){clearInterval(timer);timer=setInterval(()=>go(idx+1),6000)}
  document.getElementById('prevBtn').onclick=()=>go(idx-1,true);
  document.getElementById('nextBtn').onclick=()=>go(idx+1,true);
  let sx=0;
  slidesEl.addEventListener('touchstart',e=>sx=e.touches[0].clientX,{passive:true});
  slidesEl.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-sx;
    if(Math.abs(dx)>40) go(idx+(dx<0?1:-1),true);
  });
  restart();
  // Deep-link: projects.html#slide-N opens that slide (used by resume links)
  function fromHash(){
    const m=location.hash.match(/slide-(\d+)/);
    if(m){ const n=parseInt(m[1],10); if(n>=1&&n<=total) go(n-1); }
  }
  window.addEventListener('hashchange',fromHash);
  fromHash();
})();

// Testimonials modal
const TESTIMONIALS={
  elissa:{
    title:"Ms Elissa Chia — Associate Director, Communications, NUS Office of Student Affairs",
    date:"21 November 2025",
    body:`<p>Dear Hiring Manager,</p>
    <p>I first interacted with Xin Yin in a Telegram group chat in November 2024, and I remember being struck by how her former NUSSU President Sean Pang had enthusiastically introduced her. He highlighted her stellar portfolio: Communications positions in Harvard Undergraduate in Asia Programme, Sheares Hall, video and photography committees and now, newly appointed as the lead in NUSSU Communications Cell.</p>
    <p>Her creativity shows up consistently in work that matters. When Xin Yin introduced the refreshed NUSSU mascot, <em>Sunny</em>, both online and in person, I watched how students responded. At the August 2025 Student Life Fair — with over 200 club booths competing for attention — a business school freshman asked where he could purchase a Sunny plush toy. She had made the Union mascot into something students actively wanted to connect with.</p>
    <p>This same instinct shaped her work on the NUS Yusof Ishak House Reopening in October 2025. Rather than generic institutional messaging, Xin Yin came in with ideas and saw them through from concept to execution. She crafted a clear story of NUSSU's legacy and aspirations that felt genuinely warm and real, keeping the student voice at the centre.</p>
    <p>As the person chiefly responsible for NUSSU's Instagram presence (@mynussu), she understands what engages students and translates that into posts they actually enjoy and share. She uses Sunny as a consistent thread. Many colleagues, myself included, have commended her for developing NUSSU x NUS120 merchandise that refreshed Sunny as a meaningful symbol of Union identity.</p>
    <p>Beyond creative execution, Xin Yin's communication skills make her invaluable in collaborative environments. She translates student-driven initiatives into messages aligned with NUS values, and she coordinates smoothly with various NUS departments. Her work is detail-oriented and remarkably dependable even under tight timelines.</p>
    <p><strong>"Whoever hires Xin Yin will find someone who shows up with ideas, follows through with care, and makes everyone around her better at their jobs."</strong></p>
    <p>Regards,<br>Ms Elissa Chia<br>Associate Director, Communications, NUS Office of Student Affairs</p>`
  },
  lawrence:{
    title:"Mr Lawrence Chai — Head, Digital Marketing, NUS Office of University Communications",
    date:"6 November 2025",
    body:`<p>To Whom It May Concern,</p>
    <p>I had the pleasure of working with Ms Loh Xin Yin during her term as Communications Secretary of the 46th NUS Students' Union Executive Committee.</p>
    <p>Throughout her term, Xin Yin served with great dedication, particularly as she led publicity efforts during NUS' 120th anniversary celebrations. Through Xin Yin's strong leadership, creativity, and resilience, many joint University–student projects achieved great success.</p>
    <p>One noteworthy achievement was her pivotal role in rallying support for the NUS120 Charity Hongbao Walk — nearly <strong>1,200 students, staff, and alumni</strong> in the 8km walk, raising over <strong>S$880,000</strong> for NUS students facing financial challenges. She also led publicity for the NUS120 Open House and NUSSU Rag & Flag, which raised over <strong>S$256,000</strong> for 16 social service agencies under Community Chest.</p>
    <p>Xin Yin is very well-liked by the NUS Digital Marketing team for her selfless dedication and pleasant disposition. She is a fast learner, both a team player and an effective leader — guiding her Communications Secretariat with integrity, clarity, and empathy. Even when faced with challenges, she remained composed and resourceful.</p>
    <p><strong>"I am confident that Xin Yin will be an invaluable asset to any organisation she interns with."</strong></p>
    <p>Sincerely,<br>Lawrence Chai<br>Head, Digital Marketing, NUS Office of University Communications</p>`
  }
};
function openTestimonial(key){
  const t=TESTIMONIALS[key]; if(!t) return;
  document.getElementById('modalTitle').textContent=t.title;
  document.getElementById('modalDate').textContent=t.date;
  document.getElementById('modalBody').innerHTML=t.body;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeTestimonial(){
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeTestimonial()});

// Topics array and loader with modal popup navigation
const topics = [
  "Introduction to Programming",
  "What is C Language",
  "Variables & Data Types",
  "Operators",
  "Conditional Statements",
  "Loops & Iterators",
  "Arrays & Memory Layout",
  "Functions & Modular Design",
  "Pointers & References",
  "Structures & Memory Models",
  "CPU Architecture & Pipelines",
  "GPU Fundamentals & Parallelism",
  "RAM, Caches & Virtual Memory",
  "ROM & Firmware",
  "Storage: HDD vs SSD",
  "Motherboards & Buses",
  "I/O Devices & Drivers",
  "Operating Systems Fundamentals",
  "Processes, Threads & Concurrency",
  "Memory Management Techniques",
  "File Systems & Storage Networks",
  "System vs Application Software",
  "Networking Basics & TCP/IP",
  "Internet Architecture & DNS",
  "IP Addressing & Routing",
  "Databases: SQL & NoSQL",
  "Web Technologies: HTML/CSS/JS",
  "APIs & Microservices",
  "AI & Machine Learning Overview",
  "Cloud Computing & DevOps"
];

const topicsList = document.getElementById('topicsList');
const search = document.getElementById('search');
const modalBg = document.getElementById('modalBg');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let current = 0;

function buildList(){
  topics.forEach((t,i)=>{
    const li = document.createElement('li');
    li.innerText = (i+1)+'. '+t;
    li.onclick = ()=> openTopic(i+1);
    topicsList.appendChild(li);
  });
}
buildList();

search.addEventListener('input', ()=>{
  const q = search.value.toLowerCase().trim();
  Array.from(topicsList.children).forEach(li=>{
    li.style.display = li.innerText.toLowerCase().includes(q) ? 'block' : 'none';
  });
});

function openTopic(n){
  current = n;
  fetch(`topics/topic${n}.html`).then(r=>{
    if(!r.ok) throw new Error('not found');
    return r.text();
  }).then(html=>{
    modalContent.innerHTML = html;
    modalBg.style.display = 'flex';
    modalBg.setAttribute('aria-hidden','false');
  }).catch(e=>{
    modalContent.innerHTML = '<h2>Content not found</h2><p>Make sure topics/topic'+n+'.html exists.</p>';
    modalBg.style.display = 'flex';
  });
}

closeBtn.onclick = ()=>{ modalBg.style.display='none'; modalBg.setAttribute('aria-hidden','true'); modalContent.innerHTML=''; }
prevBtn.onclick = ()=>{ if(current>1) openTopic(current-1); }
nextBtn.onclick = ()=>{ if(current<topics.length) openTopic(current+1); }

// close modal on bg click but not on inner content click
modalBg.addEventListener('click', (e)=>{ if(e.target===modalBg) closeBtn.click(); });

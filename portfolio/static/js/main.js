/* ──────────────────────────────────────────
   KEERTHIVASAN PORTFOLIO — main.js
   Three.js 3D background + cinematic scroll
────────────────────────────────────────── */

// ── CURSOR ──────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
});

(function animCursor() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a, button, .project-card, .cert-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
    cursor.style.background = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--accent)';
  });
});

// ── NAV SCROLL ───────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── THREE.JS BACKGROUND ──────────────────
const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(0, 0, 60);

// ── Particle field ──
const PARTICLE_COUNT = 1800;
const positions = new Float32Array(PARTICLE_COUNT * 3);
const pSizes = new Float32Array(PARTICLE_COUNT);
const pColors = new Float32Array(PARTICLE_COUNT * 3);

const palette = [
  new THREE.Color(0x3b82f6),
  new THREE.Color(0x06b6d4),
  new THREE.Color(0x8b5cf6),
  new THREE.Color(0x1e40af),
];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const r = 40 + Math.random() * 60;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
  positions[i * 3 + 2] = r * Math.cos(phi) - 20;
  pSizes[i] = 0.5 + Math.random() * 1.5;
  const c = palette[Math.floor(Math.random() * palette.length)];
  pColors[i * 3] = c.r;
  pColors[i * 3 + 1] = c.g;
  pColors[i * 3 + 2] = c.b;
}

const pGeo = new THREE.BufferGeometry();
pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));
pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));

const pMat = new THREE.PointsMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.55,
  sizeAttenuation: true,
  size: 0.6,
  depthWrite: false,
});

const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// ── Floating wireframe torus ──
const torusGeo = new THREE.TorusGeometry(14, 0.18, 8, 80);
const torusMat = new THREE.MeshBasicMaterial({
  color: 0x3b82f6,
  transparent: true,
  opacity: 0.08,
  wireframe: false,
});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.rotation.x = Math.PI / 3;
scene.add(torus);

// ── Icosahedron ──
const icoGeo = new THREE.IcosahedronGeometry(8, 1);
const icoMat = new THREE.MeshBasicMaterial({
  color: 0x06b6d4,
  transparent: true,
  opacity: 0.04,
  wireframe: true,
});
const ico = new THREE.Mesh(icoGeo, icoMat);
ico.position.set(25, 10, -30);
scene.add(ico);

// ── Second torus ──
const torus2Geo = new THREE.TorusGeometry(8, 0.12, 6, 60);
const torus2Mat = new THREE.MeshBasicMaterial({
  color: 0x8b5cf6,
  transparent: true,
  opacity: 0.07,
  wireframe: false,
});
const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
torus2.rotation.y = Math.PI / 4;
torus2.position.set(-20, -8, -20);
scene.add(torus2);

// ── Grid plane ──
const gridHelper = new THREE.GridHelper(200, 40, 0x3b82f6, 0x0a1628);
gridHelper.position.y = -35;
gridHelper.material.opacity = 0.08;
gridHelper.material.transparent = true;
scene.add(gridHelper);

// ── Mouse-responsive rotation ──
let targetRotX = 0, targetRotY = 0;
let curRotX = 0, curRotY = 0;

document.addEventListener('mousemove', e => {
  targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.3;
  targetRotX = (e.clientY / window.innerHeight - 0.5) * -0.2;
});

// ── Scroll-driven camera ──
let scrollY = 0;
window.addEventListener('scroll', () => { scrollY = window.scrollY; });

// ── Animation loop ──
let t = 0;
function animate() {
  requestAnimationFrame(animate);
  t += 0.005;

  // Smooth mouse follow
  curRotX += (targetRotX - curRotX) * 0.04;
  curRotY += (targetRotY - curRotY) * 0.04;

  // Scroll camera drift
  const scrollFrac = scrollY / (document.body.scrollHeight - window.innerHeight);
  camera.position.y = scrollFrac * -15;
  camera.position.z = 60 - scrollFrac * 10;

  // Scene rotation
  scene.rotation.x = curRotX;
  scene.rotation.y = curRotY + t * 0.05;

  // Particles gentle breathe
  particles.rotation.y = t * 0.02;
  particles.rotation.x = Math.sin(t * 0.3) * 0.05;

  // Torus spin
  torus.rotation.z = t * 0.15;
  torus2.rotation.x = t * 0.12;
  torus2.rotation.z = t * 0.08;

  // Ico
  ico.rotation.y = t * 0.3;
  ico.rotation.x = t * 0.15;

  // Grid pulse
  gridHelper.material.opacity = 0.05 + Math.sin(t * 0.8) * 0.02;

  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── SKILLS ORBIT CANVAS ──────────────────
const skillsCanvas = document.getElementById('skills-canvas');
if (skillsCanvas) {
  const skillRenderer = new THREE.WebGLRenderer({ canvas: skillsCanvas, antialias: true, alpha: true });
  skillRenderer.setClearColor(0x000000, 0);
  skillRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const W = skillsCanvas.offsetWidth || 400;
  skillRenderer.setSize(W, 400);

  const sScene = new THREE.Scene();
  const sCamera = new THREE.PerspectiveCamera(50, W / 400, 0.1, 100);
  sCamera.position.z = 18;

  const skills3D = [
    { name: 'Python', color: 0x3b82f6, r: 6, angle: 0 },
    { name: 'Flask', color: 0x06b6d4, r: 6, angle: Math.PI * 2 / 7 },
    { name: 'ML', color: 0x8b5cf6, r: 6, angle: Math.PI * 4 / 7 },
    { name: 'MongoDB', color: 0x059669, r: 6, angle: Math.PI * 6 / 7 },
    { name: 'JS', color: 0xf59e0b, r: 6, angle: Math.PI * 8 / 7 },
    { name: 'GitHub', color: 0x94a3b8, r: 6, angle: Math.PI * 10 / 7 },
    { name: 'Figma', color: 0xec4899, r: 6, angle: Math.PI * 12 / 7 },
  ];

  // Center sphere
  const centerGeo = new THREE.IcosahedronGeometry(1.8, 2);
  const centerMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.3 });
  const centerMesh = new THREE.Mesh(centerGeo, centerMat);
  sScene.add(centerMesh);

  // Inner glow sphere
  const glowGeo = new THREE.SphereGeometry(1.4, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.08 });
  sScene.add(new THREE.Mesh(glowGeo, glowMat));

  // Orbit ring
  const ringGeo = new THREE.TorusGeometry(6, 0.04, 6, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.15 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = 0.4;
  sScene.add(ring);

  // Skill nodes
  const nodes = skills3D.map(s => {
    const geo = new THREE.SphereGeometry(0.45, 12, 12);
    const mat = new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(geo, mat);
    sScene.add(mesh);
    return { ...s, mesh };
  });

  // Lines from center to nodes
  const lineGroup = new THREE.Group();
  sScene.add(lineGroup);

  function animateSkills() {
    requestAnimationFrame(animateSkills);
    const st = Date.now() * 0.001;

    centerMesh.rotation.y = st * 0.4;
    centerMesh.rotation.x = st * 0.2;
    ring.rotation.z = st * 0.15;

    nodes.forEach((n, i) => {
      const angle = n.angle + st * 0.35;
      n.mesh.position.x = Math.cos(angle) * n.r;
      n.mesh.position.y = Math.sin(angle) * 0.5 * n.r * 0.3;
      n.mesh.position.z = Math.sin(angle) * n.r * 0.3;
    });

    skillRenderer.render(sScene, sCamera);
  }
  animateSkills();
}

// ── SCROLL REVEAL ────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      observer.unobserve(el.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => observer.observe(el));

// ── PROJECT CARD MOUSE GLOW ──────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', x + '%');
    card.style.setProperty('--my', y + '%');
  });
});

// ── COUNTING ANIMATION ───────────────────
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const isFloat = String(target).includes('.');
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = isFloat ? start.toFixed(1) : Math.floor(start);
    if (start >= target) clearInterval(timer);
  }, 16);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const val = parseFloat(el.dataset.count);
      animateCount(el, val);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ── TYPING EFFECT FOR HERO ───────────────
const roles = ['Software Systems Engineer', 'Python Developer', 'ML Enthusiast', 'Full Stack Builder'];
let roleIdx = 0;
let charIdx = 0;
let deleting = false;
const roleEl = document.getElementById('typing-role');

if (roleEl) {
  function typeRole() {
    const current = roles[roleIdx];
    if (!deleting) {
      roleEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeRole, 2000);
        return;
      }
    } else {
      roleEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(typeRole, deleting ? 50 : 80);
  }
  setTimeout(typeRole, 1500);
}

// ── SMOOTH SCROLL for nav links ──────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ── PARALLAX for section orbs ─────────────
window.addEventListener('scroll', () => {
  document.querySelectorAll('.orb').forEach((orb, i) => {
    const speed = i === 0 ? 0.3 : 0.2;
    orb.style.transform = `translateY(${window.scrollY * speed}px)`;
  });
});

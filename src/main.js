import { setupMobileNav } from './responsive.js'
import * as THREE from 'three';

setupMobileNav();

// Scene Setup
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
// Fog for depth integration with background
scene.fog = new THREE.FogExp2(0x050505, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // Allow CSS background to show through if needed
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

// --- Objects ---

// --- Section Objects ---

// 1. Hero: Chromium Torus Knot (Existing)
const isAboutPage = window.location.pathname.includes('about.html');
const isProjectsPage = window.location.pathname.includes('projects.html');
const isSkillsPage = window.location.pathname.includes('skills.html');
const isValuesPage = window.location.pathname.includes('values.html');
const isContactPage = window.location.pathname.includes('contact.html');


// 1. Hero: Tech Pen Drive Group
const heroObj = new THREE.Group();

// Main Body (Sleek Metal/Plastic)
const driveBodyGeo = new THREE.BoxGeometry(1.5, 4.0, 0.8);
const driveBodyMat = new THREE.MeshPhysicalMaterial({
  color: 0x222222, // Dark
  metalness: 0.8,
  roughness: 0.2,
  clearcoat: 1.0
});
const driveBody = new THREE.Mesh(driveBodyGeo, driveBodyMat);
heroObj.add(driveBody);

// Connector (USB Type-A)
const connGeo = new THREE.BoxGeometry(1.2, 1.0, 0.6);
const connMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 1.0, roughness: 0.3 });
const conn = new THREE.Mesh(connGeo, connMat);
conn.position.y = 2.5; // Top of body
heroObj.add(conn);

// Internal Light/strip (Data indicator)
const LightGeo = new THREE.BoxGeometry(0.8, 0.2, 0.85);
const LightMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff }); // Neon Cyan
const lightStrip = new THREE.Mesh(LightGeo, LightMat);
lightStrip.position.y = 0.5;
heroObj.add(lightStrip);

// Cap (Floating slightly off)
const capGeo = new THREE.BoxGeometry(1.6, 1.2, 0.9);
const capMat = new THREE.MeshPhysicalMaterial({
  color: 0x222222,
  metalness: 0.8,
  roughness: 0.2,
  transparent: true,
  opacity: 0.9
});
const cap = new THREE.Mesh(capGeo, capMat);
cap.position.y = 3.5; // Floating above connector
heroObj.add(cap);

// Initial tilt
heroObj.rotation.z = 0.5;
heroObj.rotation.x = 0.5;

// 2. About: Floating Cyber Laptop
const aboutObj = new THREE.Group();

// Laptop Base
const baseGeo = new THREE.BoxGeometry(3.0, 0.2, 2.0);
const baseMat = new THREE.MeshPhysicalMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
const base = new THREE.Mesh(baseGeo, baseMat);
aboutObj.add(base);

// Laptop Screen (Lid)
const lidGeo = new THREE.BoxGeometry(3.0, 2.0, 0.1);
const lidMat = new THREE.MeshPhysicalMaterial({ color: 0x222222, metalness: 0.8, roughness: 0.2 });
const lid = new THREE.Mesh(lidGeo, lidMat);
lid.position.set(0, 1.0, -1.0);
aboutObj.add(lid);

// Screen Display (Glowing)
const screenGeo = new THREE.PlaneGeometry(2.8, 1.8);
const screenMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, side: THREE.DoubleSide });
const screen = new THREE.Mesh(screenGeo, screenMat);
screen.position.set(0, 1.0, -0.94);
aboutObj.add(screen);

// Keyboard keys (Simplified texture/dots)
for (let i = 0; i < 3; i++) {
  const keysGeo = new THREE.BoxGeometry(2.8, 0.05, 0.5);
  const keysMat = new THREE.MeshBasicMaterial({ color: 0x555555 });
  const keys = new THREE.Mesh(keysGeo, keysMat);
  keys.position.set(0, 0.15, -0.5 + (i * 0.6));
  aboutObj.add(keys);
}

aboutObj.rotation.x = 0.2; // Tilted view
aboutObj.position.set(4, -8, -5);

aboutObj.position.set(4, -8, -5);

// 3. Skills: High-Performance CPU Model
const skillsGroup = new THREE.Group();

// CPU Base Plate
const pcbGeo = new THREE.BoxGeometry(3.0, 0.2, 3.0);
const pcbMat = new THREE.MeshPhysicalMaterial({ color: 0x004400, roughness: 0.5 }); // Green PCB
const pcb = new THREE.Mesh(pcbGeo, pcbMat);
skillsGroup.add(pcb);

// Heat Spreader (Metal Top)
const ihsGeo = new THREE.BoxGeometry(2.2, 0.1, 2.2);
const ihsMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 1.0, roughness: 0.3 });
const ihs = new THREE.Mesh(ihsGeo, ihsMat);
ihs.position.y = 0.15;
skillsGroup.add(ihs);

// Gold Pins (Bottom Texture visualization)
const pinsGeo = new THREE.PlaneGeometry(2.8, 2.8);
const pinsMat = new THREE.MeshBasicMaterial({ color: 0xffd700, side: THREE.DoubleSide }); // Gold
const pins = new THREE.Mesh(pinsGeo, pinsMat);
pins.rotation.x = Math.PI / 2;
pins.position.y = -0.11;
skillsGroup.add(pins);

// Core Glow (Symbolic)
const coreGlowGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const coreGlowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, transparent: true, opacity: 0.8 });
const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
coreGlow.position.y = 0.5;
skillsGroup.add(coreGlow);

skillsGroup.position.set(-5, -16, -5);

// 4. Projects: Server Blade Unit
const projectsGroup = new THREE.Group();

// Rack Chassis
const rackGeo = new THREE.BoxGeometry(4.0, 1.5, 6.0);
const rackMat = new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: 0.5, roughness: 0.5 });
const rack = new THREE.Mesh(rackGeo, rackMat);
projectsGroup.add(rack);

// Front Panel Lights (Blinking Array)
for (let i = 0; i < 8; i++) {
  const ledGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const ledMat = new THREE.MeshBasicMaterial({ color: (i % 2 === 0 ? 0x00ff00 : 0xff0000) });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(-1.5 + (i * 0.4), 0.2, 3.05); // Front face
  projectsGroup.add(led);
}

// Ventilation Grills
const grillGeo = new THREE.PlaneGeometry(3.5, 1.0);
const grillMat = new THREE.MeshBasicMaterial({ color: 0x333333, wireframe: true });
const grill = new THREE.Mesh(grillGeo, grillMat);
grill.position.set(0, -0.2, 3.06);
projectsGroup.add(grill);

projectsGroup.position.set(0, -25, -10);


if (isAboutPage) {
  // --- ABOUT PAGE SETUP ---
  aboutObj.position.set(5, 2, -5);
  aboutObj.scale.set(1.5, 1.5, 1.5);
  scene.add(aboutObj);
  scene.add(skillsGroup);
  skillsGroup.position.set(-6, 0, -10);

} else if (isProjectsPage) {
  // --- PROJECTS PAGE SETUP ---
  projectsGroup.position.set(0, -2, -5);
  projectsGroup.rotation.x = -Math.PI / 3;
  scene.add(projectsGroup);
  // Add some cubes from skills for decoration?
  scene.add(skillsGroup);
  skillsGroup.position.set(5, 5, -15);

} else if (isSkillsPage) {
  // --- SKILLS PAGE SETUP ---
  skillsGroup.position.set(0, 0, -5); // Center stage
  // Spread them out more? 
  skillsGroup.scale.set(1.5, 1.5, 1.5);
  scene.add(skillsGroup);
  scene.add(aboutObj); // Background
  aboutObj.position.set(-6, 6, -15);

} else if (isValuesPage) {
  // --- VALUES PAGE SETUP ---
  // Maybe the Hero Object but very subtle/different angle?
  scene.add(heroObj);
  heroObj.position.set(-5, 0, -8);
  heroObj.scale.set(0.5, 0.5, 0.5);

} else if (isContactPage) {
  // --- CONTACT PAGE SETUP ---
  scene.add(aboutObj);
  aboutObj.position.set(0, 0, -10);
  aboutObj.scale.set(3, 3, 3);
  // Iterate to set opacity for group children
  aboutObj.children.forEach(child => {
    if (child.material) {
      child.material.transparent = true;
      child.material.opacity = 0.05;
    }
  });

} else {
  // --- INDEX PAGE SETUP ---
  // Default positions for scroll story
  scene.add(heroObj);
  scene.add(aboutObj);
  scene.add(skillsGroup);
  scene.add(projectsGroup);
}


// --- Particles (Global) ---
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 300;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 30; // Wider spread
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.03,
  color: 0x00f3ff,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);


// --- Lights ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0x00f3ff, 80);
spotLight.position.set(5, 10, 5);
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 1;
scene.add(spotLight);

const spotLight2 = new THREE.SpotLight(0xff00ff, 80);
spotLight2.position.set(-5, -10, 5);
spotLight2.angle = Math.PI / 4;
spotLight2.penumbra = 1;
scene.add(spotLight2);

// Neon Backlight for depth which moves with scroll
const depthLight = new THREE.PointLight(0x00f3ff, 20, 50);
depthLight.position.set(0, 0, -10);
scene.add(depthLight);


// --- Interaction ---
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
  mouseX = (event.clientX - windowHalfX);
  mouseY = (event.clientY - windowHalfY);
});

let scrollY = 0;
window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
});


// --- Animation Loop ---
const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  // 1. Hero Object Animation (Pen Drive)
  heroObj.rotation.y += 0.005;

  // Animate cap hovering
  if (heroObj.children.length >= 4) {
    heroObj.children[3].position.y = 3.5 + Math.sin(elapsedTime * 3) * 0.15;
  }

  heroObj.rotation.x = 0.5 + (0.05 * (targetY - 0.5)); // Slight tilt follow
  heroObj.rotation.y += 0.05 * (targetX);
  heroObj.position.y = Math.sin(elapsedTime * 0.5) * 0.2; // Float

  // 2. About Object Animation (Laptop)
  aboutObj.rotation.y = Math.sin(elapsedTime * 0.2) * 0.5; // Slow pan
  aboutObj.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1; // Float tilt

  // 3. Skills Object Animation (CPU)
  skillsGroup.rotation.y += 0.01; // Spin
  skillsGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.5; // Flip view

  // 4. Projects Animation (Server)
  projectsGroup.rotation.y = -elapsedTime * 0.1; // Slow rotate to show depth
  // Blinking lights logic (simple color swap simulation via scaling or opacity would be better, but movement works for now)
  projectsGroup.position.x = Math.sin(elapsedTime) * 0.5; // Hover left/right

  // particle flow
  particlesMesh.rotation.y = -elapsedTime * 0.05;
  particlesMesh.position.y = -scrollY * 0.01; // Particles move with scroll slightly

  // Camera Scroll Movement logic
  // Instead of moving camera down, we move it slightly and let objects stay fixed in "world space"
  // Mapping scrollY to camera Y position
  // 1px scroll = 0.01 unit? adjusted for visual finish

  camera.position.y = -scrollY * 0.01;

  // Add parallax lag to lights
  depthLight.position.y = -scrollY * 0.01 - 10;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// --- Resize ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// --- Loader ---
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  // Minimal delay to show the "future" loading
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1000); // 1s wait
});

// --- Theme Toggle Logic ---
const toggleBtn = document.getElementById('theme-toggle');
let isLightMode = false;

toggleBtn.addEventListener('click', () => {
  isLightMode = !isLightMode;
  document.body.classList.toggle('light-mode');

  if (isLightMode) {
    // Switch to Light Fog
    scene.fog.color.setHex(0xf7f7f7);
  } else {
    // Switch to Dark Fog
    scene.fog.color.setHex(0x050505);
  }
});

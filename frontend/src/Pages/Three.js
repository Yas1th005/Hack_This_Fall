import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Basic Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Add Earth
const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.set(-5, 0, 0);
scene.add(earth);

// Add Destination Planet
const planetGeometry = new THREE.SphereGeometry(0.6, 32, 32);
const planetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const destinationPlanet = new THREE.Mesh(planetGeometry, planetMaterial);
destinationPlanet.position.set(5, 0, 0);
scene.add(destinationPlanet);

// Add Stars (for interference effect)
const stars = [];
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700, emissive: 0xffff00 });
for (let i = 0; i < 10; i++) {
    const starGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(Math.random() * 10 - 5, Math.random() * 4 - 2, Math.random() * 4 - 2);
    stars.push(star);
    scene.add(star);
}

// Signal Object
const signalGeometry = new THREE.SphereGeometry(0.1, 16, 16);
const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, emissive: 0xffcc00 });
const signal = new THREE.Mesh(signalGeometry, signalMaterial);
scene.add(signal);

// Signal Path
const signalPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-5, 0, 0),  // Starting at Earth
    ...stars.map(star => star.position.clone().add(new THREE.Vector3(Math.random() * 0.5, Math.random() * 0.5, Math.random() * 0.5))),  // Passing by stars
    new THREE.Vector3(5, 0, 0)    // Destination Planet
]);

// Interference Effect
function applyInterference() {
    stars.forEach(star => {
        const distance = signal.position.distanceTo(star.position);
        if (distance < 1) {
            signalMaterial.color.setHex(0xff4500);  // Change color near star
            signal.scale.set(1.2, 1.2, 1.2);       // Increase size
        } else {
            signalMaterial.color.setHex(0xffff00);  // Reset color
            signal.scale.set(1, 1, 1);             // Reset size
        }
    });
}

// Animation Variables
let t = 0;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Move signal along path
    t += 0.001;  // Adjust speed here
    if (t > 1) t = 0;  // Loop back if needed
    const point = signalPath.getPointAt(t);
    signal.position.set(point.x, point.y, point.z);

    // Apply interference effects
    applyInterference();

    // Render and update controls
    controls.update();
    renderer.render(scene, camera);
}

camera.position.z = 10;
animate();

// Handle Resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

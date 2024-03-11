import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

// Get container
const container = document.getElementById('dContainer');
container.appendChild(renderer.domElement);

// Set renderer size to match container
const containerRect = container.getBoundingClientRect();
renderer.setSize(containerRect.width, containerRect.height);

// Create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Create camera
const camera = new THREE.PerspectiveCamera(45, containerRect.width / containerRect.height, 1, 1000);
camera.position.set(30, 0, 10);

// Create controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 15;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = true;
controls.target = new THREE.Vector3(0, 0, 0);

// Load 3D model
const loader = new GLTFLoader().setPath('./assets/3d/');
loader.load('scene.glb', (glb) => {
    const mesh = glb.scene;

    // Assuming the head is the first child of the scene
    const head = mesh.children[0]; // Change this accordingly based on your model's structure

    if (head instanceof THREE.Mesh) {
        // Adjusting the scale of the head to make it larger
        head.scale.set(13, 13, 13); // Adjust scale as needed

        // Adding some ambient light to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Increase light intensity
        scene.add(ambientLight);

        // Adding a directional light to make colors more visible
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Increase light intensity
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        scene.add(head);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    const containerRect = container.getBoundingClientRect();
    camera.aspect = containerRect.width / containerRect.height;
    camera.updateProjectionMatrix();
    renderer.setSize(containerRect.width, containerRect.height);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height);
camera.position.set(0, 0, 2);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load("logowild.jpg");
const material = new THREE.MeshPhongMaterial({ map: texture });

const light1 = new THREE.DirectionalLight(0xeeeeee);
light1.position.set(-2, 2, -4);
const light2 = new THREE.DirectionalLight(0xeeeeee);
light2.position.set(2, -2, 4);
const light3 = new THREE.AmbientLight(0x404040); // lumière ambiante

const mesh = new THREE.Mesh(geometry, material);

mesh.position.set(-4, 2, -6);

scene.add(mesh);
scene.add(light1);
scene.add(light2);
scene.add(light3);

let mbp = null;

// Variables pour le contrôle de la souris
let mouseX = 0,
  mouseY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

// Gestionnaire d'événements de souris
document.addEventListener("mousemove", onDocumentMouseMove, false);

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) / 200;
  mouseY = (event.clientY - windowHalfY) / 200;
}

const loader = new GLTFLoader();
loader.load(
  "mbp.glb",
  function (gltf) {
    gltf.scene.scale.set(2, 2, 2);
    scene.add(gltf.scene);
    mbp = gltf;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setClearColor(0x808080);

function loop() {
  requestAnimationFrame(loop);
  if (mbp) {
    // Contrôler la rotation de l'objet avec la souris
    mbp.scene.rotation.x += (mouseY - mbp.scene.rotation.x) * 0.05;
    mbp.scene.rotation.y += (mouseX - mbp.scene.rotation.y) * 0.05;
  }
  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;
  renderer.setSize(canvas.width, canvas.height);
  renderer.render(scene, camera);
}

loop();

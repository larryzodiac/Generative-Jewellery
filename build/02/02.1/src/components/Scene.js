// ------------------------------------------------- //
// Evan MacHale - N00150552
// 05.01.19
// Three.js
// React Environment Start
// ------------------------------------------------- //
// Setting up ground, shape, camera, controls in React
// ------------------------------------------------- //
// https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
// https://www.npmjs.com/package/three
// https://www.npmjs.com/package/three-orbit-controls
// ------------------------------------------------- //

import React, { Component } from 'react';
import * as THREE from 'three';
// import * as OrbitControls from 'three-orbit-controls'; // Research later, no time
const OrbitControls = require('three-orbit-controls')(THREE);

// ------------------------------------------------- //

class Scene extends Component {
  // If mounted successfully
  componentDidMount() { // Runtime
    let scene, camera, renderer, controls;

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffde03);
		// scene.fog = new THREE.FogExp2(0xffde03, 0.1);
		// scene.fog = new THREE.Fog(scene.background,1,5000);

    // THREE.CameraType(FOV,aspectRatio,nearClipPlane,farClipPlane);
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 3;
    camera.position.y = 1;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Lights
  	const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
  	// hemisphereLight.color.setHSL(0.6, 1, 0.6);
  	// hemisphereLight.groundColor.setHSL(0.095, 1, 0.75);
  	hemisphereLight.position.set(0, 100, 0);
  	scene.add(hemisphereLight);
    const hemiLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 10);
		scene.add(hemiLightHelper);

    // Create a DirectionalLight and turn on shadows for the light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    // directionalLight.color.setHSL(0.1, 1, 0.95);
    directionalLight.position.set(-0.5, 1.75, 0.5);
    directionalLight.position.multiplyScalar(50);
    directionalLight.castShadow = true; // default false
    scene.add(directionalLight);

    // Set up shadow properties for the light
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;

    const dirLightHeper = new THREE.DirectionalLightHelper(directionalLight, 10);
		scene.add(dirLightHeper);

    /*
    Create Geometry here
    */
    const octahedron = this.getOctahedron(1); // This will be our subdivide geometry call
    scene.add(octahedron);
    const plane = this.getPlane(1000,1000);
    scene.add(plane);

    // Magic - Create our WebGL render instance.
    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Orbit controls
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableKeys = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.1;
    controls.maxDistance = 5;
    controls.minDistance = 2;
    controls.maxPolarAngle = 1.8; // 103.132°

    // Scalable canvas.
    window.addEventListener('resize', this.handleResize);

    //
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.controls = controls;
    // this.material = material;
    this.octahedron = octahedron;

    //
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  // ------------------------------------------------- //

  componentWillUnmount() {
    window.removeEventListener('resize');
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.update);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  // ------------------------------------------------- //

  // Animation loop.
  update = () => {
    // We want to render the scene with the camera.
    this.renderer.render(
      this.scene,
      this.camera
    )

    this.controls.update();

    // Animation
    // this.octahedron.rotation.y +=0.01;

    // Without a render loop we wouldn't see anything.
    // Causes the renderer to draw the scene every time the screen is refreshed (60 fps).
    // requestAnimationFrame pauses when we switch tab.
    this.frameId = window.requestAnimationFrame(this.update);
  }

  // ------------------------------------------------- //

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  // Create a shape that cast shadows (but does not receive them)
  getOctahedron = (w,h) => {
    const geometry = new THREE.OctahedronGeometry(w, h);
    const material = new THREE.MeshPhongMaterial();
    material.color.setHex(0xff0266);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;
    return mesh;
  }

  // Create a plane that receives shadows (but does not cast them)
  getPlane = (w,h) => {
    const geometry = new THREE.PlaneBufferGeometry(w,h);
  	const material = new THREE.MeshPhongMaterial({side:THREE.DoubleSide});
    material.color.setHex(0xffde03);
  	const mesh = new THREE.Mesh(geometry,material);
    mesh.rotation.x = -1.5708;
    mesh.position.y = -2;
    mesh.receiveShadow = true;
  	return mesh;
  }

  // ------------------------------------------------- //

  render() {
    return (
      <div
        className="canvas"
        ref={mount => {
          this.mount = mount
        }}
      />
    )
  }
}

// ------------------------------------------------- //

export default Scene;

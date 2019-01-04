import React, { Component } from 'react';
import * as THREE from 'three';

/*
Source:
https://stackoverflow.com/questions/41248287/how-to-connect-threejs-to-react
*/

class ThreeScene extends Component {
  // If mounted successfully
  componentDidMount() { // Runtime
    let scene, camera, renderer;

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xefd1b5);
		// scene.fog = new THREE.FogExp2(0xefd1b5, 0.0025);
		scene.fog = new THREE.Fog(scene.background,1,5000);

    // THREE.CameraType(FOV,aspectRatio,nearClipPlane,farClipPlane);
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.z = 4;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    /*
    Create Geometry here
    */
    const plane = this.getPlane(1000,1000);
    scene.add(plane);
    const geometry = new THREE.DodecahedronGeometry(1, 1);
    const material = new THREE.MeshBasicMaterial({});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Magic - Create our WebGL render instance.
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);

    // Scalable canvas.
    window.addEventListener('resize', this.handleResize);

    //
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    //
    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

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

  // Animation loop.
  update = () => {
    // We want to render the scene with the camera.
    this.renderer.render(
      this.scene,
      this.camera
    )

    // Animation
    this.cube.rotation.y +=0.01;

    // Without a render loop we wouldn't see anything.
    // Causes the renderer to draw the scene every time the screen is refreshed (60 fps).
    // requestAnimationFrame pauses when we switch tab.
    this.frameId = window.requestAnimationFrame(this.update);
  }

  handleResize = () => {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  getPlane = (w,h) => {
    const geometry = new THREE.PlaneGeometry(w,h);
  	const material = new THREE.MeshBasicMaterial({color:'grey'});
  	const mesh = new THREE.Mesh(geometry,material);
    mesh.rotation.x = -1.5708;
    mesh.position.y = -1;
  	return mesh;
  }

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

export default ThreeScene;

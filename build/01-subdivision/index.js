// ------------------------------------------------- //
// Evan MacHale - N00150552
// Working Three.js
// Starting Template
// ------------------------------------------------- //

const init = () => {
  const scene = new THREE.Scene();

	const box = getBox(1, 1, 1);
	scene.add(box);

	const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,1000);
	camera.position.x = 1;
	camera.position.y = 2;
	camera.position.z = 5;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('webgl').appendChild(renderer.domElement);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  update(renderer, scene, camera, controls);

	return scene;
}

// ------------------------------------------------- //
// Update Fucntion
// ------------------------------------------------- //

const update = (renderer, scene, camera, controls) => {
  renderer.render(
		scene,
		camera
	);

	controls.update();

	requestAnimationFrame( function() {
		update(renderer, scene, camera, controls);
	});
}

// ------------------------------------------------- //
// Get Box Fucntion
// ------------------------------------------------- //

const getBox = (w,h,d) => {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
	const material = new THREE.MeshBasicMaterial({color:'red',wireframe:true});
	const mesh = new THREE.Mesh(geometry,material);
	return mesh;
}

const scene = init();
